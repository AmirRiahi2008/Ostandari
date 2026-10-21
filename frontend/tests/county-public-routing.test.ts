import test from 'node:test';
import assert from 'node:assert/strict';
import React, { cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { JSDOM } from 'jsdom';
import { CountyPortalPage } from '../src/features/site/county-portal-page';
import { SiteHeader } from '../src/components/site/site-header';
import { counties, findCounty, officeHref } from '../src/data/counties';
import { countyNavigation, countyPortalHref, resolveCountyPortal } from '../src/lib/county-portal';
import { knownRoute, routeAlias } from '../src/lib/routes';
import type { NavigationItem } from '../src/data/official-navigation';

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
async function render(path: string, search: Record<string, string> = {}) {
  return new JSDOM(
    renderToStaticMarkup(
      await resolve(await CountyPortalPage({ route: resolveCountyPortal(path)!, search })),
    ),
  ).window.document;
}
test('province navigation promotes about and managers and moves transparency and duties into the utility bar', () => {
  const doc = new JSDOM(renderToStaticMarkup(React.createElement(SiteHeader))).window.document;
  for (const href of ['/about', '/managers']) {
    assert.ok(doc.querySelector('.desktop-menu .source-direct-menu a[href="' + href + '"]'));
    assert.equal(doc.querySelector('#source-services-menu a[href="' + href + '"]'), null);
  }
  for (const href of ['/transparency', '/duties']) {
    assert.ok(doc.querySelector('.nav-bala-right a[href="' + href + '"]'));
    assert.equal(doc.querySelector('.desktop-menu a[href="' + href + '"]'), null);
  }
});
test('all county identities have separate canonical roots and every derived navigation destination resolves', () => {
  const walk = (items: NavigationItem[]): NavigationItem[] =>
    items.flatMap((item) => [item, ...walk(item.children)]);
  for (const county of counties) {
    assert.equal(officeHref(county), '/' + county.slug);
    assert.equal(officeHref(county, 'about'), '/' + county.slug + '/about');
    assert.equal(resolveCountyPortal('/' + county.slug + '/news')?.county.slug, county.slug);
    for (const item of walk(countyNavigation(county)))
      assert.ok(knownRoute(item.href), county.slug + ': ' + item.href);
    const doc = new JSDOM(
      renderToStaticMarkup(
        React.createElement(SiteHeader, { county, items: countyNavigation(county) }),
      ),
    ).window.document;
    assert.ok(
      doc
        .querySelector('.menu-left a[href="/' + county.slug + '/about"]')
        ?.textContent?.includes(county.name),
    );
    assert.equal(doc.querySelector('.logo-wrapper a')?.getAttribute('href'), '/' + county.slug);
    assert.equal(doc.querySelector('.menu-left a[href="/about"]'), null);
    assert.equal(
      doc.querySelector('#source-services-menu a[href="/' + county.slug + '/managers"]'),
      null,
    );
  }
});
test('legacy office and query-scoped links preserve filters while redirecting into the same county', () => {
  assert.equal(routeAlias('/office', new URLSearchParams('name=sari')), '/sari');
  assert.equal(routeAlias('/office', new URLSearchParams('name=nur&section=about')), '/nur/about');
  assert.equal(
    routeAlias('/news', new URLSearchParams('name=sari&q=report&page=2')),
    '/sari/news?q=report&page=2',
  );
  assert.equal(routeAlias('/county/noor', new URLSearchParams()), '/nur');
  assert.equal(resolveCountyPortal('/ghaemshahr')?.canonical, '/qaemshahr');
  assert.equal(resolveCountyPortal('/not-a-county'), undefined);
  assert.equal(countyPortalHref(findCounty('sari')!, '/login'), '/login');
  assert.equal(
    countyPortalHref(findCounty('sari')!, '/unit?name=department'),
    '/sari/unit?name=department',
  );
});

function fixtures() {
  const calls: string[] = [];
  globalThis.fetch = async (input) => {
    const url = new URL(String(input));
    const endpoint = url.pathname.split('/api/v1/')[1];
    calls.push(endpoint + '?' + url.searchParams);
    let data: unknown = [];
    if (endpoint === 'settings')
      data = {
        'site.banner': { url: 'https://assets.test/province.webp' },
        'site.contact': { address: 'PROVINCE ADDRESS' },
      };
    if (endpoint === 'counties/by-slug/sari')
      data = {
        county: { id: 20, name: 'ساری', description: 'معرفی شهرستان ساری' },
        organizations: [
          {
            id: 42,
            slug: 'sari',
            type: 'county',
            name: 'فرمانداری ساری',
            address: 'SARI ADDRESS',
            banner: { url: 'https://assets.test/sari-banner.webp' },
            aerial: { url: 'https://assets.test/sari-aerial.webp' },
          },
        ],
        members: [],
      };
    if (endpoint === 'portals/sari')
      data = {
        slides: [
          {
            id: 'content-5',
            title: 'خبر اختصاصی ساری',
            content_id: 5,
            url: '/content/5',
            image: { url: 'https://assets.test/slide.webp' },
          },
        ],
      };
    if (['news', 'announcements', 'contents'].includes(endpoint))
      data = [
        {
          id: 5,
          title: 'خبر اختصاصی ساری',
          organization_id: 42,
          type: 'news',
          body: 'متن خبر',
          status: 'published',
        },
      ];
    if (endpoint === 'members')
      data = [
        {
          id: 3,
          name: 'مدیر ساری',
          organization_id: 42,
          kind: 'manager',
          position: 'مدیر شهرستان',
        },
      ];
    if (endpoint === 'services') data = [{ id: 7, name: 'خدمت ساری', organization_id: 42 }];
    if (endpoint === 'contents/5')
      data = {
        content: { id: 5, title: 'خبر اختصاصی ساری', organization_id: 42, body: 'متن خبر' },
        related: [
          { id: 6, title: 'خبر شهر دیگر', organization_id: 77 },
          { id: 8, title: 'خبر مرتبط ساری', organization_id: 42 },
        ],
      };
    if (endpoint === 'contents/99')
      data = {
        content: {
          id: 99,
          title: 'خبر شهر دیگر',
          organization_id: 77,
          body: 'نباید نمایش داده شود',
        },
      };
    if (endpoint === 'services/99') data = { id: 99, name: 'خدمت شهر دیگر', organization_id: 77 };
    return Response.json({ success: true, data });
  };
  return calls;
}
test('county home uses its own full header, banner, aerial image and contact details without a second navigation', async () => {
  const original = fetch;
  const preview = process.env.TEMPLATE_PREVIEW;
  process.env.TEMPLATE_PREVIEW = 'false';
  try {
    const calls = fixtures();
    const doc = await render('/sari');
    assert.ok(doc.querySelector('[data-county-header="sari"]'));
    assert.equal(doc.querySelector('.portal-county-navigation'), null);
    assert.equal(doc.querySelector('[data-county-header] .nav-bala'), null);
    assert.equal(
      doc.querySelector('.county-portal-banner>.icx-responsive-img')?.getAttribute('src'),
      'https://assets.test/sari-banner.webp',
    );
    assert.equal(
      doc.querySelector('.county-aerial-panel img')?.getAttribute('src'),
      'https://assets.test/sari-aerial.webp',
    );
    assert.match(doc.querySelector('.footer')?.textContent ?? '', /SARI ADDRESS/);
    assert.doesNotMatch(doc.body.textContent ?? '', /PROVINCE ADDRESS/);
    assert.ok(calls.some((x) => x.startsWith('news?') && x.includes('organization_id=42')));
    assert.equal(doc.querySelector('.portal-office-news a')?.getAttribute('href'), '/sari/news');
    assert.equal(
      doc.querySelector('.county-home-slideshow a')?.getAttribute('href'),
      '/sari/content/5',
    );
    assert.equal(
      doc.querySelector('.county-home-slideshow img')?.getAttribute('src'),
      'https://assets.test/slide.webp',
    );
  } finally {
    globalThis.fetch = original;
    if (preview === undefined) delete process.env.TEMPLATE_PREVIEW;
    else process.env.TEMPLATE_PREVIEW = preview;
  }
});
test('county list, manager and service pages remain scoped even when a different county is forged in the query', async () => {
  const original = fetch;
  const preview = process.env.TEMPLATE_PREVIEW;
  process.env.TEMPLATE_PREVIEW = 'false';
  try {
    const calls = fixtures();
    for (const path of ['/sari/news', '/sari/managers', '/sari/services']) {
      const doc = await render(path, { name: 'babol' });
      assert.ok(doc.querySelector('[data-county-header="sari"]'));
      assert.equal(doc.querySelector('.portal-county-navigation'), null);
    }
    for (const endpoint of ['news', 'members', 'services'])
      assert.ok(
        calls.some((x) => x.startsWith(endpoint + '?') && x.includes('organization_id=42')),
      );
    const doc = await render('/sari/news');
    assert.equal(doc.querySelector('.portal-news-card a')?.getAttribute('href'), '/sari/news/5');
  } finally {
    globalThis.fetch = original;
    if (preview === undefined) delete process.env.TEMPLATE_PREVIEW;
    else process.env.TEMPLATE_PREVIEW = preview;
  }
});
test('county details reject another organization and filter unrelated article links', async () => {
  const original = fetch;
  const preview = process.env.TEMPLATE_PREVIEW;
  process.env.TEMPLATE_PREVIEW = 'false';
  try {
    fixtures();
    const doc = await render('/sari/news/5');
    assert.doesNotMatch(doc.body.textContent ?? '', /خبر شهر دیگر/);
    assert.ok(doc.querySelector('a[href="/sari/news/8"]'));
    await assert.rejects(() => render('/sari/news/99'), /NEXT_HTTP_ERROR_FALLBACK;404/);
    await assert.rejects(() => render('/sari/service/99'), /NEXT_HTTP_ERROR_FALLBACK;404/);
    await assert.rejects(() => render('/sari/not-a-page'), /NEXT_HTTP_ERROR_FALLBACK;404/);
  } finally {
    globalThis.fetch = original;
    if (preview === undefined) delete process.env.TEMPLATE_PREVIEW;
    else process.env.TEMPLATE_PREVIEW = preview;
  }
});
test('a county with no organization never fetches province content as a fallback', async () => {
  const original = fetch;
  const preview = process.env.TEMPLATE_PREVIEW;
  process.env.TEMPLATE_PREVIEW = 'false';
  const calls: string[] = [];
  try {
    globalThis.fetch = async (input) => {
      const endpoint = new URL(String(input)).pathname.split('/api/v1/')[1];
      calls.push(endpoint);
      return Response.json({
        success: true,
        data: endpoint?.startsWith('counties/') ? { county: { id: 20 }, organizations: [] } : [],
      });
    };
    const doc = await render('/sari/news');
    assert.equal(calls.includes('news'), false);
    assert.ok(doc.querySelector('.portal-empty'));
    assert.ok(doc.querySelector('[data-county-header="sari"]'));
    assert.equal(
      doc.querySelector('.county-banner-template')?.getAttribute('aria-label'),
      'فرمانداری شهرستان ساری',
    );
  } finally {
    globalThis.fetch = original;
    if (preview === undefined) delete process.env.TEMPLATE_PREVIEW;
    else process.env.TEMPLATE_PREVIEW = preview;
  }
});

test('every county uses the Amol banner artwork with its own accessible city name and no top utility header', () => {
  for (const county of counties) {
    const doc = new JSDOM(
      renderToStaticMarkup(
        React.createElement(SiteHeader, { county, items: countyNavigation(county) }),
      ),
    ).window.document;
    assert.equal(doc.querySelector('.nav-bala'), null);
    assert.equal(doc.querySelector('.county-banner-name strong')?.textContent, county.name);
    assert.equal(
      doc.querySelector('.county-banner-template image')?.getAttribute('href'),
      '/design/site/assets/image/amol.png',
    );
    assert.ok(doc.querySelector('.desktop-menu'));
    assert.ok(doc.querySelector('#hamburgerBtn'));
  }
});
