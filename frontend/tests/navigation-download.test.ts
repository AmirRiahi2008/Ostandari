import test from 'node:test';
import assert from 'node:assert/strict';
import React, { act, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { renderToStaticMarkup } from 'react-dom/server';
import { JSDOM } from 'jsdom';
import { counties } from '../src/data/counties';
import { SiteHeader } from '../src/components/site/site-header';
import { InstallGuide } from '../src/components/site/install-guide';
import { PublicPage } from '../src/features/site/public-pages';
import { knownRoute, isPublicRoute } from '../src/lib/routes';

const window = new JSDOM('', { url: 'https://ostandari.vercel.app', pretendToBeVisual: true })
  .window;
for (const name of ['window', 'document', 'HTMLElement', 'Element', 'Node'] as const) {
  Object.defineProperty(globalThis, name, {
    value: name === 'window' ? window : (window as unknown as Record<string, unknown>)[name],
    configurable: true,
  });
}
Object.defineProperty(globalThis, 'IS_REACT_ACT_ENVIRONMENT', { value: true, configurable: true });

async function mount(element: ReactNode) {
  const container = window.document.createElement('div');
  window.document.body.replaceChildren(container);
  const root = createRoot(container);
  await act(async () => root.render(element));
  return {
    container,
    unmount: async () => {
      await act(async () => root.unmount());
    },
  };
}

function key(element: HTMLElement, value: string) {
  element.dispatchEvent(new window.KeyboardEvent('keydown', { key: value, bubbles: true }));
}

test('the application navigation uses the existing phone icon and a Persian label without an App badge', () => {
  const document = new JSDOM(renderToStaticMarkup(React.createElement(SiteHeader))).window.document;
  const item = document.querySelector('.install-app-menu-item')!;
  assert.equal(item.textContent?.trim(), 'نصب اپلیکیشن');
  assert.equal(item.querySelector('a')?.getAttribute('href'), '/install');
  assert.ok(item.querySelector('svg'));
  assert.equal(item.querySelector('.app-badge'), null);
  assert.ok(document.querySelector('nav[aria-label="منوی اصلی"]'));
});

test('ArrowDown opens the attached navigation and enters its categories; Escape closes it and returns focus', async () => {
  const { container, unmount } = await mount(React.createElement(SiteHeader));
  try {
    const button = container.querySelector<HTMLButtonElement>('#khadmat')!;
    await act(async () => {
      button.focus();
      key(button, 'ArrowDown');
    });
    const panel = container.querySelector<HTMLElement>('#source-services-menu')!;
    const categories = [...panel.querySelectorAll<HTMLButtonElement>('.categories > li > button')];
    assert.equal(button.getAttribute('aria-expanded'), 'true');
    assert.equal(panel.hidden, false);
    assert.equal(window.document.activeElement, categories[0]);
    assert.equal(container.querySelector('.header-box')?.getAttribute('data-mega-open'), 'true');
    await act(async () => categories[1].click());
    assert.equal(
      panel.querySelector('.source-mega-heading h2')?.textContent,
      'بیانیه سطح توافق خدمات',
    );
    assert.equal(categories[1].getAttribute('aria-expanded'), 'true');
    assert.equal(
      panel.querySelector('.source-mega-heading > a')?.getAttribute('href'),
      '/service-agreement',
    );
    await act(async () => key(categories[1], 'Escape'));
    assert.equal(panel.hidden, true);
    assert.equal(button.getAttribute('aria-expanded'), 'false');
    assert.equal(window.document.activeElement, button);
    assert.equal(container.querySelector('.header-box')?.hasAttribute('data-mega-open'), false);
  } finally {
    await unmount();
  }
});

test('pointer travel into the mega panel cancels its close delay while leaving the whole region closes it', async () => {
  const { container, unmount } = await mount(React.createElement(SiteHeader));
  const pause = () => new Promise((resolve) => setTimeout(resolve, 180));
  try {
    const region = container.querySelector<HTMLElement>('.source-mega')!;
    const panel = container.querySelector<HTMLElement>('#source-services-menu')!;
    await act(async () =>
      region.dispatchEvent(new window.MouseEvent('mouseover', { bubbles: true })),
    );
    assert.equal(panel.hidden, false);
    await act(async () => {
      region.dispatchEvent(
        new window.MouseEvent('mouseout', { bubbles: true, relatedTarget: window.document.body }),
      );
      panel.dispatchEvent(
        new window.MouseEvent('mouseover', { bubbles: true, relatedTarget: window.document.body }),
      );
      await pause();
    });
    assert.equal(panel.hidden, false);
    await act(async () => {
      region.dispatchEvent(
        new window.MouseEvent('mouseout', { bubbles: true, relatedTarget: window.document.body }),
      );
      await pause();
    });
    assert.equal(panel.hidden, true);
  } finally {
    await unmount();
  }
});

test('the promoted about menu retains all counties and dismisses on an outside click', async () => {
  const { container, unmount } = await mount(React.createElement(SiteHeader));
  try {
    const about = container.querySelector<HTMLButtonElement>(
      '.source-direct-menu button[aria-label="زیرمنوی آشنایی با مازندران"]',
    )!;
    await act(async () => about.click());
    const panel = container.querySelector<HTMLElement>('#' + about.getAttribute('aria-controls'))!;
    assert.equal(panel.hidden, false);
    for (const county of counties)
      assert.ok(panel.querySelector('a[href="/' + county.slug + '"]'), county.slug);
    await act(async () =>
      document.body.dispatchEvent(new window.MouseEvent('pointerdown', { bubbles: true })),
    );
    assert.equal(panel.hidden, true);
    assert.equal(about.getAttribute('aria-expanded'), 'false');
  } finally {
    await unmount();
  }
});

async function resolve(node: ReactNode): Promise<ReactNode> {
  if (Array.isArray(node)) return Promise.all(React.Children.toArray(node).map(resolve));
  if (!isValidElement(node)) return node;
  const element = node as ReactElement<{ children?: ReactNode }>;
  if (typeof element.type === 'function' && element.type.constructor.name === 'AsyncFunction')
    return resolve(await (element.type as (props: unknown) => Promise<ReactNode>)(element.props));
  return element.props.children === undefined
    ? element
    : cloneElement(element, { children: await resolve(element.props.children) });
}

for (const path of ['/install', '/download']) {
  test(
    'the public download page has Ostandari content, existing assets and truthful download actions: ' +
      path,
    async () => {
      const preview = process.env.TEMPLATE_PREVIEW;
      process.env.TEMPLATE_PREVIEW = 'true';
      try {
        assert.equal(isPublicRoute(path), true);
        const document = new JSDOM(
          renderToStaticMarkup(await resolve(await PublicPage({ path, search: {} }))),
        ).window.document;
        const content = document.querySelector('.portal-download')!;
        assert.ok(content);
        assert.match(
          content.querySelector('#download-title')?.textContent ?? '',
          /استانداری مازندران/,
        );
        assert.equal(
          content.querySelector('.download-phone img')?.getAttribute('src'),
          '/design/site/assets/image/logo.png',
        );
        assert.equal(content.querySelectorAll('.download-option').length, 2);
        assert.equal(
          content.querySelector<HTMLButtonElement>('.download-option button')?.disabled,
          true,
        );
        assert.equal(content.querySelector('a[download], a[href$=".apk"]'), null);
        assert.equal(content.querySelectorAll('[role="tab"]').length, 3);
        assert.doesNotMatch(content.textContent ?? '', /کانون کارشناسان|kkrm|نسخهٔ آفلاین/);
        for (const link of content.querySelectorAll('a')) {
          const href = link.getAttribute('href')!;
          if (href.startsWith('#')) assert.ok(document.getElementById(href.slice(1)));
          else assert.equal(knownRoute(href), true, href);
        }
      } finally {
        if (preview === undefined) delete process.env.TEMPLATE_PREVIEW;
        else process.env.TEMPLATE_PREVIEW = preview;
      }
    },
  );
}

test('installation tabs show the correct three steps and support RTL arrows, Home and End with one tab stop', async () => {
  const { container, unmount } = await mount(React.createElement(InstallGuide));
  try {
    const tabs = [...container.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
    const panel = () => container.querySelector<HTMLElement>('[role="tabpanel"]:not([hidden])')!;
    assert.equal(tabs[0].getAttribute('aria-selected'), 'true');
    assert.equal(panel().querySelectorAll('li').length, 3);
    await act(async () => tabs[1].click());
    assert.match(panel().textContent ?? '', /Safari/);
    assert.equal(panel().getAttribute('aria-labelledby'), tabs[1].id);
    await act(async () => key(tabs[1], 'ArrowLeft'));
    assert.equal(window.document.activeElement, tabs[2]);
    assert.match(panel().textContent ?? '', /Bookmarks/);
    await act(async () => key(tabs[2], 'ArrowRight'));
    assert.equal(window.document.activeElement, tabs[1]);
    await act(async () => key(tabs[1], 'Home'));
    assert.equal(window.document.activeElement, tabs[0]);
    await act(async () => key(tabs[0], 'End'));
    assert.equal(window.document.activeElement, tabs[2]);
    assert.equal(tabs.filter((tab) => tab.tabIndex === 0).length, 1);
    assert.equal(container.querySelectorAll('[role="tabpanel"]:not([hidden])').length, 1);
  } finally {
    await unmount();
  }
});
