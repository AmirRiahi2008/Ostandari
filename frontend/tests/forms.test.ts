import test from 'node:test';
import assert from 'node:assert/strict';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { SiteHeader } from '../src/components/site/site-header';
import { CountyMap } from '../src/components/site/county-map';
import { OriginalTabs } from '../src/components/site/original-tabs';
import { counties, countyPreviewTemplate, officeHref } from '../src/data/counties';
import { managerGroups } from '../src/data/manager-groups';
import { renderToStaticMarkup } from 'react-dom/server';
import { JSDOM } from 'jsdom';
import { templates } from '../src/lib/templates';
import { templateViews } from '../src/views';
import { collectFields, fillFields } from '../src/features/admin/fields';
import { bindUi } from '../src/lib/alpine/ui';
import { siteController } from '../src/features/site/controller';
import { commandArgs, digits, setSafeHtml } from '../src/lib/dom';
import { bindAttachments } from '../src/features/citizen/attachments';
import { renderCitizenCatalog, renderPoll } from '../src/features/citizen/data';

const window = new JSDOM('', { url: 'http://localhost:3000', pretendToBeVisual: true }).window;
for (const name of [
  'window',
  'document',
  'HTMLElement',
  'HTMLInputElement',
  'HTMLSelectElement',
  'HTMLTextAreaElement',
  'DOMParser',
  'CustomEvent',
  'CSS',
  'MutationObserver',
  'Element',
  'Node',
  'ShadowRoot',
  'AbortController',
  'AbortSignal',
  'Option',
] as const) {
  Object.defineProperty(globalThis, name, {
    value: name === 'window' ? window : (window as unknown as Record<string, unknown>)[name],
    configurable: true,
  });
}

function pageRoot(route: string) {
  const page = templates.find((page) => page.path === route)!;
  const root = window.document.createElement('div');
  root.innerHTML = renderToStaticMarkup(
    React.createElement(templateViews[page.id as keyof typeof templateViews]),
  );
  window.document.body.replaceChildren(root);
  return { page, root: root as unknown as HTMLElement };
}

test('the supplied FAQ modal produces the Laravel request without duplicated input ID collisions', () => {
  const { root } = pageRoot('/panel/admin/faqs');
  const modal = root.querySelector('#cbnCreateMenuModalOverlay')!;
  fillFields(modal, { locale: 'fa', priority: 2, question: 'پرسش اصلی', answer: 'پاسخ صحیح' });
  const fields = collectFields(modal);
  assert.equal(fields.question, 'پرسش اصلی');
  assert.equal(fields.answer, 'پاسخ صحیح');
  assert.equal(fields.priority, 2);
  assert.equal(fields.locale, 'fa');
});

test('the slide form keeps title and numeric priority independent and omits the unused subtitle', () => {
  const { root } = pageRoot('/panel/admin/slides');
  const modal = root.querySelector('#cbnCreateMenuModalOverlay')!;
  fillFields(modal, { title: 'عنوان اصلی', subtitle: 'عنوان فرعی', priority: 3, locale: 'en' });
  const fields = collectFields(modal);
  assert.equal(fields.title, 'عنوان اصلی');
  assert.equal(fields.subtitle, undefined);
  assert.equal(fields.priority, 3);
});

test('existing modal controls open, cancel and dispatch save through the same source markup', () => {
  const { root, page } = pageRoot('/panel/admin/faqs');
  const abort = new AbortController();
  let action = '';
  bindUi({ root, page, preview: true, signal: abort.signal, path: page.path }, (command) => {
    action = command;
  });
  (root.querySelector('#cbnOpenCreateMenuModalBtn') as HTMLElement).click();
  assert.equal(
    root.querySelector('#cbnCreateMenuModalOverlay')?.classList.contains('active'),
    true,
  );
  (root.querySelector('#cbnSubmitCreateMenuBtn') as HTMLElement).click();
  assert.equal(action, 'saveRecord');
  abort.abort();
});

test('public header supports mobile open, Escape, focus return and desktop submenu state', async () => {
  const container = window.document.createElement('div');
  window.document.body.replaceChildren(container);
  Object.defineProperty(globalThis, 'IS_REACT_ACT_ENVIRONMENT', {
    value: true,
    configurable: true,
  });
  const root = createRoot(container);
  await act(async () => root.render(React.createElement(SiteHeader)));
  const toggle = container.querySelector<HTMLButtonElement>('#hamburgerBtn')!;
  await act(async () => toggle.click());
  assert.equal(toggle.getAttribute('aria-expanded'), 'true');
  const drawer = container.querySelector<HTMLElement>('[role=dialog]')!;
  assert.ok(drawer.textContent?.includes('مدیران روابط عمومی استان'));
  assert.ok(drawer.textContent?.includes('مدیریت فناوری اطلاعات'));
  assert.equal(window.document.body.style.overflow, 'hidden');
  assert.equal(window.document.activeElement?.getAttribute('aria-label'), 'بستن منو');
  await act(async () =>
    drawer.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true })),
  );
  assert.equal(container.querySelector('[role=dialog]'), null);
  assert.equal(window.document.body.style.overflow, '');
  assert.equal(window.document.activeElement, toggle);
  const submenu = container.querySelector<HTMLButtonElement>('#khadmat')!;
  await act(async () => submenu.click());
  assert.equal(submenu.getAttribute('aria-expanded'), 'true');
  assert.equal(
    container.querySelector<HTMLElement>('#' + submenu.getAttribute('aria-controls'))?.hidden,
    false,
  );
  await act(async () =>
    submenu.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true })),
  );
  assert.equal(submenu.getAttribute('aria-expanded'), 'false');
  await act(async () => submenu.click());
  const firstLink = container.querySelector<HTMLElement>(
    '#' + submenu.getAttribute('aria-controls') + ' a',
  )!;
  firstLink.focus();
  await act(async () =>
    firstLink.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true })),
  );
  assert.equal(window.document.activeElement, submenu);
  await act(async () => root.unmount());
});

test('UI data handlers normalize Persian digits and never execute copied inline JavaScript', () => {
  assert.equal(digits('۱۲۳٤٥۶'), '123456');
  assert.deepEqual(commandArgs("this,'track',2"), ['track', '2']);
  const container = window.document.createElement('div');
  setSafeHtml(
    container as unknown as HTMLElement,
    '<script>alert(1)</script><p onclick="bad()">متن<img src="javascript:bad()"></p>',
  );
  assert.equal(container.querySelector('script'), null);
  assert.equal(container.querySelector('p')?.getAttribute('onclick'), null);
  assert.equal(container.querySelector('img')?.hasAttribute('src'), false);
  setSafeHtml(
    container as unknown as HTMLElement,
    '<p x-init="bad()" data-command="saveRecord"><a href="java&#10;script:bad()">متن</a></p>',
  );
  assert.equal(container.querySelector('p')?.hasAttribute('x-init'), false);
  assert.equal(container.querySelector('p')?.hasAttribute('data-command'), false);
  assert.equal(container.querySelector('a')?.hasAttribute('href'), false);
});

test('the existing upload box accepts private report images and clears its native input on disposal', () => {
  const { root } = pageRoot('/citizen');
  const abort = new AbortController();
  const attachment = bindAttachments(root, abort.signal);
  const box = root.querySelector('.upload-box')!;
  const image = new window.File(['image'], 'original.png', { type: 'image/png' });
  const transfer = { files: [image] };
  const event = new window.Event('drop', { bubbles: true, cancelable: true });
  Object.defineProperty(event, 'dataTransfer', { value: transfer });
  box.dispatchEvent(event);
  assert.equal(attachment.files()[0].name, 'original.png');
  assert.equal(box.querySelector('b')?.textContent, 'original.png');
  attachment.clear();
  assert.equal(attachment.files().length, 0);
  abort.abort();
  assert.equal(box.querySelector('input[type=file]'), null);
});

test('citizen API content replaces sample records while preserving FAQ icons and emergency links', () => {
  const { root } = pageRoot('/citizen');
  renderCitizenCatalog(
    root,
    [{ title: 'خبر پایگاه داده', excerpt: 'متن خبر' }],
    [{ question: 'پرسش واقعی', answer: '<b>پاسخ واقعی</b>' }],
    [{ name: 'سازمان واقعی', phone: '011-12345678' }],
  );
  assert.equal(root.querySelectorAll('#view-news .news-card').length, 1);
  assert.equal(root.querySelector('#view-news h4')?.textContent, 'خبر پایگاه داده');
  assert.equal(root.querySelector('.faq-q')?.textContent, 'پرسش واقعی');
  assert.ok(root.querySelector('.faq-q svg'));
  assert.equal(root.querySelector('.faq-a')?.textContent, 'پاسخ واقعی');
  assert.equal(root.querySelectorAll('#view-directory .dir-card.util').length, 1);
  assert.ok(root.querySelector('#view-directory a[href="tel:110"]'));
});

test('poll percentages are taken from the API result instead of the prototype data', () => {
  const { root } = pageRoot('/citizen');
  const poll = {
    question: 'سؤال اصلی',
    options: [
      { id: 71, title: 'گزینه اول', percentage: 80 },
      { id: 72, title: 'گزینه دوم', percentage: 20 },
    ],
  };
  renderPoll(root, poll);
  assert.equal(root.querySelector('.poll-opt .pct')?.textContent, '80%');
  assert.equal(root.querySelectorAll('.poll-opt').length, 2);
  assert.equal((root.querySelector('#poll-note') as HTMLElement).hidden, true);
  renderPoll(root, poll, true, 72);
  assert.equal(root.querySelector('.poll-opt.chosen')?.getAttribute('data-option'), '72');
  assert.equal((root.querySelector('.poll-fill') as HTMLElement).style.width, '80%');
  assert.equal((root.querySelector('#poll-note') as HTMLElement).hidden, false);
});

test('the provided gallery opens SVG media and its next/close controls work', () => {
  const { root, page } = pageRoot('/gallery');
  const abort = new AbortController();
  const controller = siteController({
    root,
    page,
    preview: true,
    signal: abort.signal,
    path: page.path,
  });
  controller.init();
  const items = root.querySelectorAll<HTMLElement>('.gal-item');
  assert.ok(items.length > 1);
  items[0].click();
  assert.equal(root.querySelector('#lightboxOverlay')?.classList.contains('active'), true);
  assert.ok(root.querySelector('#lightboxMedia img,#lightboxMedia svg,#lightboxMedia video'));
  (root.querySelector('#lightboxNext') as HTMLElement).click();
  assert.equal(
    root.querySelector('#lightboxCaption')?.textContent,
    items[1].querySelector('.gal-caption')?.textContent ?? items[1].textContent?.trim(),
  );
  (root.querySelector('#lightboxClose') as HTMLElement).click();
  assert.equal(root.querySelector('#lightboxOverlay')?.classList.contains('active'), false);
  abort.abort();
});

test('Alpine initializes the page once and disposes listeners when React unmounts the scope', async () => {
  const { mountPortal } = await import('../src/lib/alpine/runtime');
  const { root, page } = pageRoot('/panel/admin/faqs');
  const dispose = mountPortal(root, { page, preview: true, path: page.path });
  await new Promise((resolve) => setTimeout(resolve, 100));
  assert.equal(root.getAttribute('x-data'), 'portalPage');
  assert.equal((root as unknown as { _x_dataStack: unknown[] })._x_dataStack.length, 1);
  (root.querySelector('#cbnOpenCreateMenuModalBtn') as HTMLElement).click();
  assert.equal(
    root.querySelector('#cbnCreateMenuModalOverlay')?.classList.contains('active'),
    true,
  );
  dispose();
  root.querySelector('#cbnCreateMenuModalOverlay')?.classList.remove('active');
  (root.querySelector('#cbnOpenCreateMenuModalBtn') as HTMLElement).click();
  assert.equal(
    root.querySelector('#cbnCreateMenuModalOverlay')?.classList.contains('active'),
    false,
  );
});

test('all 22 county hovers synchronize the photo, nameplate, selection and destination', async () => {
  const container = window.document.createElement('div');
  window.document.body.replaceChildren(container);
  const root = createRoot(container);
  await act(async () => root.render(React.createElement(CountyMap)));
  try {
    for (const county of counties) {
      const region = container.querySelector('svg a[data-county="' + county.slug + '"]')!;
      await act(async () =>
        region.dispatchEvent(new window.MouseEvent('mouseover', { bubbles: true })),
      );
      const image = container.querySelector('img#cityImage')!;
      assert.equal(image.getAttribute('src'), county.previewImage, county.slug);
      assert.equal(image.getAttribute('alt'), 'طرح فرمانداری شهرستان ' + county.name);
      assert.equal(
        container.querySelector('.portal-county-caption')?.textContent?.trim(),
        'فرمانداری ' + county.name,
      );
      assert.equal(container.querySelector('.left-ksks')?.getAttribute('href'), officeHref(county));
      assert.equal(
        container.querySelector('svg.map .is-selected')?.getAttribute('data-county'),
        county.slug,
      );
      assert.equal(container.querySelector('select')?.value, county.slug);
      const nameplate = container.querySelector('.portal-county-nameplate');
      if (county.usesPreviewTemplate) {
        assert.equal(image.getAttribute('src'), countyPreviewTemplate);
        assert.equal(nameplate?.textContent?.trim(), 'فرمانداری ' + county.name);
      } else assert.equal(nameplate, null);
    }
  } finally {
    await act(async () => root.unmount());
  }
});

test('county keyboard focus, list hover and select share the same preview; a broken photo preserves the selected city', async () => {
  const container = window.document.createElement('div');
  window.document.body.replaceChildren(container);
  const root = createRoot(container);
  await act(async () => root.render(React.createElement(CountyMap)));
  try {
    for (const county of counties) {
      const region = container.querySelector('svg a[data-county="' + county.slug + '"]')!;
      await act(async () =>
        region.dispatchEvent(new window.FocusEvent('focusin', { bubbles: true })),
      );
      assert.equal(
        container.querySelector('[data-preview-county]')?.getAttribute('data-preview-county'),
        county.slug,
      );
      const directory = container.querySelector(
        '.portal-county-list a[href="' + officeHref(county) + '"]',
      )!;
      await act(async () =>
        directory.dispatchEvent(new window.MouseEvent('mouseover', { bubbles: true })),
      );
      assert.equal(container.querySelector('.left-ksks')?.getAttribute('href'), officeHref(county));
    }
    const select = container.querySelector('select')!;
    await act(async () => {
      select.value = 'amol';
      select.dispatchEvent(new window.Event('change', { bubbles: true }));
    });
    assert.match(container.querySelector('#cityImage')!.getAttribute('src')!, /101\.png$/);
    await act(async () =>
      container.querySelector('#cityImage')!.dispatchEvent(new window.Event('error')),
    );
    assert.equal(container.querySelector('#cityImage')?.getAttribute('src'), countyPreviewTemplate);
    assert.equal(
      container.querySelector('.portal-county-nameplate')?.textContent?.trim(),
      'فرمانداری آمل',
    );
    assert.equal(container.querySelector('.left-ksks')?.getAttribute('href'), '/amol');
    await act(async () => {
      select.value = 'nur';
      select.dispatchEvent(new window.Event('change', { bubbles: true }));
    });
    assert.equal(
      container.querySelector('.portal-county-nameplate')?.textContent?.trim(),
      'فرمانداری نور',
    );
    assert.equal(container.querySelector('.left-ksks')?.getAttribute('href'), '/nur');
  } finally {
    await act(async () => root.unmount());
  }
});

test('six manager tabs switch by click and RTL keyboard navigation and expose their own directory', async () => {
  const container = window.document.createElement('div');
  window.document.body.replaceChildren(container);
  const root = createRoot(container);
  const tabs = managerGroups.map((item) => ({
    title: item.title,
    href: '/managers?group=' + item.group,
  }));
  await act(async () =>
    root.render(React.createElement(OriginalTabs, { tabs, children: tabs.map(() => null) })),
  );
  try {
    const buttons = [...container.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
    assert.equal(buttons.length, 6);
    for (let i = 0; i < tabs.length; i++) {
      await act(async () => buttons[i].click());
      assert.equal(buttons[i].getAttribute('aria-selected'), 'true');
      const panel = container.querySelector<HTMLElement>('[role="tabpanel"]:not([hidden])')!;
      assert.equal(panel.getAttribute('aria-labelledby'), buttons[i].id);
      assert.equal(panel.querySelector('a.more-card')?.getAttribute('href'), tabs[i].href);
      assert.equal(panel.querySelector('.more-card p')?.textContent, 'لیست کامل ' + tabs[i].title);
    }
    await act(async () =>
      buttons
        .at(-1)!
        .dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Home', bubbles: true })),
    );
    assert.equal(window.document.activeElement, buttons[0]);
    await act(async () =>
      buttons[0].dispatchEvent(
        new window.KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }),
      ),
    );
    assert.equal(window.document.activeElement, buttons[1]);
    await act(async () =>
      buttons[1].dispatchEvent(new window.KeyboardEvent('keydown', { key: 'End', bubbles: true })),
    );
    assert.equal(window.document.activeElement, buttons[5]);
    assert.equal(container.querySelectorAll('[role="tab"][tabindex="0"]').length, 1);
  } finally {
    await act(async () => root.unmount());
  }
});
