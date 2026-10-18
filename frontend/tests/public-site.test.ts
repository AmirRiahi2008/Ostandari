import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import React, { cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { JSDOM } from 'jsdom';
import { HomePage } from '../src/features/site/home-page';
import { OfficialSectionPage } from '../src/features/site/official-section-page';
import {
  officialSections,
  officialSite,
  resolveOfficialSection,
  sectionById,
  articleHref,
} from '../src/features/site/official-data';
import { officialNavigation, type NavigationItem } from '../src/data/official-navigation';
import { knownRoute } from '../src/lib/routes';
import { GET as rss } from '../src/app/rss/route';

async function resolve(node: ReactNode): Promise<ReactNode> {
  if (Array.isArray(node)) return Promise.all(React.Children.toArray(node).map(resolve));
  if (!isValidElement(node)) return node;
  const element = node as ReactElement<{ children?: ReactNode }>;
  if (typeof element.type === 'function' && element.type.constructor.name === 'AsyncFunction') {
    const result = await resolve(
      await (element.type as (props: unknown) => Promise<ReactNode>)(element.props),
    );
    return isValidElement(result) && element.key !== null
      ? cloneElement(result, { key: element.key })
      : result;
  }
  return element.props.children === undefined
    ? element
    : cloneElement(element, { children: await resolve(element.props.children) });
}

const render = async (node: ReactNode) => renderToStaticMarkup(await resolve(node));

test('all source menu children exist and resolve to real public destinations', () => {
  for (const section of officialSections) {
    assert.ok(knownRoute(section.href), section.href);
    assert.ok(!section.href.includes('#'), section.href);
    for (const child of section.children) assert.ok(sectionById.has(child), child);
    if (
      !['/', '/office', '/counties', '/register', '/contact', '/track', '/en'].includes(
        new URL(section.href, 'https://portal.invalid').pathname,
      )
    ) {
      const url = new URL(section.href, 'https://portal.invalid');
      assert.ok(
        resolveOfficialSection(url.pathname, Object.fromEntries(url.searchParams)),
        section.href,
      );
    }
  }
  function walk(items: NavigationItem[]): string[] {
    return items.flatMap((item) => [item.title, ...walk(item.children)]);
  }
  const titles = walk(officialNavigation.main);
  assert.ok(titles.includes('مدیران روابط عمومی استان'));
  assert.ok(titles.includes('مدیریت فناوری اطلاعات ، امنیت فضای مجازی و شبکه دولت'));
  assert.equal(titles.filter((title) => title === 'اداره کل شهری و شوراها').length, 1);
});

test('every menu destination renders its own heading with no unknown links or missing local images', async () => {
  process.env.TEMPLATE_PREVIEW = 'true';
  for (const section of officialSections.filter(
    (item) => !['home', 'county'].includes(item.kind),
  )) {
    const html = await render(await OfficialSectionPage({ section }));
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    assert.ok(doc.querySelector('h1')?.textContent?.includes(section.title), section.id);
    for (const anchor of doc.querySelectorAll('a[href]'))
      assert.ok(
        knownRoute(anchor.getAttribute('href')!),
        section.id + ': ' + anchor.getAttribute('href'),
      );
    for (const image of doc.querySelectorAll('img[src]')) {
      const src = image.getAttribute('src')!;
      if (src.startsWith('/design/')) assert.ok(fs.existsSync('public' + src), src);
    }
    dom.window.close();
  }
});

test('home renders real snapshot headlines, governor and existing full-size slide', async () => {
  process.env.TEMPLATE_PREVIEW = 'true';
  const html = await render(await HomePage());
  assert.match(html, /مهدی یونسی رستمی/);
  assert.match(html, /نیروگاه ۱۰۰ مگاواتی نوشهر/);
  assert.doesNotMatch(html, /کارآموزان جدیدالورود|عضو آزمایشی|Lorem ipsum|میثم یونسی/);
  const document = new JSDOM(html).window.document;
  assert.equal(
    document.querySelector('.public-slide-image img')?.getAttribute('src'),
    officialSite.slides[0].image,
  );
  assert.equal(document.querySelectorAll('svg.map a').length, 22);
  assert.equal(document.querySelector('.public-slide-image img')?.getAttribute('width'), '1280');
});

test('each service menu shows only its own database service and RSS is valid XML', async () => {
  process.env.TEMPLATE_PREVIEW = 'false';
  const previous = globalThis.fetch;
  globalThis.fetch = async (input) => {
    const endpoint = String(input);
    const data = endpoint.includes('services?')
      ? [
          { id: 12, slug: 'official-menu-1', name: 'خدمت اصلی' },
          { id: 13, slug: 'official-menu-8', name: 'خدمت دیگر' },
        ]
      : endpoint.includes('news?')
        ? [
            {
              id: 77,
              title: 'عنوان & متن <اصلی>',
              excerpt: 'متن خبر',
              published_at: '2026-10-18 00:00:00',
            },
          ]
        : [];
    return new Response(JSON.stringify({ success: true, data }));
  };
  try {
    const html = await render(await OfficialSectionPage({ section: sectionById.get('menu-1')! }));
    assert.match(html, /خدمت اصلی/);
    assert.doesNotMatch(html, /خدمت دیگر/);
    const feed = await rss(new Request('https://portal.example/rss'));
    assert.match(feed.headers.get('content-type')!, /application\/rss\+xml/);
    const xml = await feed.text();
    const doc = new JSDOM(xml, { contentType: 'application/xml' }).window.document;
    assert.equal(doc.querySelector('item title')?.textContent, 'عنوان & متن <اصلی>');
    assert.equal(doc.querySelector('item link')?.textContent, 'https://portal.example/content/77');
  } finally {
    globalThis.fetch = previous;
    process.env.TEMPLATE_PREVIEW = 'true';
  }
});

test('previous SQL document URLs resolve to the same source page', () => {
  assert.equal(
    articleHref({
      id: 9,
      type: 'document',
      metadata: { source_url: 'https://ostan-mz.ir/news/73836' },
    }),
    '/section/article-73836',
  );
});

test('published empty API collections and 404 articles do not restore archived data', async () => {
  process.env.TEMPLATE_PREVIEW = 'false';
  const previous = globalThis.fetch;
  globalThis.fetch = async (input) =>
    String(input).includes('by-slug/')
      ? new Response('{}', { status: 404 })
      : new Response(
          JSON.stringify({
            success: true,
            data: String(input).includes('/home?') ? { news: [], slides: [], governor: null } : [],
          }),
        );
  try {
    const home = await render(await HomePage());
    assert.doesNotMatch(home, /نیروگاه ۱۰۰ مگاواتی نوشهر|مهدی یونسی رستمی/);
    const section = sectionById.get('article-173526')!;
    const article = await render(await OfficialSectionPage({ section }));
    assert.doesNotMatch(article, /گامی مهم در مسیر تقویت زیرساخت‌های انرژی/);
  } finally {
    globalThis.fetch = previous;
    process.env.TEMPLATE_PREVIEW = 'true';
  }
});
