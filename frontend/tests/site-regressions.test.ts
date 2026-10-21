import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import React, { isValidElement, cloneElement, type ReactNode, type ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { JSDOM } from 'jsdom';
import { NextRequest } from 'next/server';
import { templates } from '../src/lib/templates';
import { templateViews } from '../src/views';
import { knownRoute } from '../src/lib/routes';
import { counties, findCounty, officeHref } from '../src/data/counties';
import { publicTitles } from '../src/data/public-navigation';
import { CountyMap } from '../src/components/site/county-map';
import { PublicPage, type Search } from '../src/features/site/public-pages';
import { OfficePage, officeContent } from '../src/features/site/office-page';
import {
  LOCAL_ADMIN_COOKIE,
  createLocalSession,
  validLocalSession,
  localCredentials,
  localAdminEnabled,
  LOCAL_SESSION_SECONDS,
} from '../src/lib/auth/local-admin';
import { POST, GET, DELETE } from '../src/app/api/local-admin/route';
import { adminExtraPages } from '../src/data/admin/extra-pages';
import { AdminResourcePage } from '../src/components/admin/resource-page';
import { publicData } from '../src/lib/public-content';

// Resolve server components without starting a website preview server.
async function resolveAsync(node: ReactNode): Promise<ReactNode> {
  if (Array.isArray(node)) return Promise.all(React.Children.toArray(node).map(resolveAsync));
  if (!isValidElement(node)) return node;
  const element = node as ReactElement<{ children?: ReactNode }>;
  if (typeof element.type === 'function' && element.type.constructor.name === 'AsyncFunction')
    return resolveAsync(
      await (element.type as (props: unknown) => Promise<ReactNode>)(element.props),
    );
  if (element.props.children !== undefined)
    return cloneElement(element, { children: await resolveAsync(element.props.children) });
  return element;
}
async function renderPublic(route: string, search: Search = {}) {
  const tree = await resolveAsync(await PublicPage({ path: route, search }));
  return renderToStaticMarkup(tree);
}
function verifyDocument(html: string, route: string) {
  const document = new JSDOM(html).window.document;
  for (const anchor of document.querySelectorAll('a')) {
    const href = anchor.getAttribute('href');
    assert.ok(href && href !== '#', route + ': empty destination ' + anchor.textContent?.trim());
    assert.ok(knownRoute(href), route + ': unknown destination ' + href);
  }
  for (const image of document.querySelectorAll(
    'img[src],image[href],image[*|href],link[rel=stylesheet]',
  )) {
    const src =
      image.getAttribute('src') ?? image.getAttribute('href') ?? image.getAttribute('xlink:href');
    if (src?.startsWith('/design/'))
      assert.ok(
        fs.existsSync(path.join('public', decodeURIComponent(src.split('?')[0]))),
        route + ': missing asset ' + src,
      );
  }
  const ids = new Set<string>();
  for (const svg of document.querySelectorAll('svg')) {
    for (const definition of svg.querySelectorAll('defs [id]')) {
      assert.ok(!ids.has(definition.id), route + ': duplicate SVG paint ID ' + definition.id);
      ids.add(definition.id);
    }
    for (const shape of svg.querySelectorAll('[d]')) {
      assert.doesNotMatch(shape.getAttribute('d') ?? '', /\\[nrt]|\\\s/);
      assert.match(shape.getAttribute('d') ?? '', /^\s*[Mm]/);
    }
    for (const node of svg.querySelectorAll('*'))
      for (const attribute of node.attributes) {
        const reference = attribute.value.match(/^url\(#([^)]*)\)$|^#(.+)$/);
        if (reference && (reference[1] || ['href', 'xlink:href'].includes(attribute.name)))
          assert.ok(
            Array.from(svg.querySelectorAll('[id]')).some(
              (element) => element.id === (reference[1] ?? reference[2]),
            ),
            route + ': unresolved SVG reference ' + attribute.value,
          );
      }
  }
  return document;
}

test('every provided page has real destinations, existing assets and independent SVG definitions', () => {
  for (const page of templates) {
    const View = templateViews[page.id as keyof typeof templateViews];
    verifyDocument(renderToStaticMarkup(React.createElement(View)), page.path);
  }
});

test('the map contains 22 distinct keyboard-accessible county links, including Nur', () => {
  const document = verifyDocument(renderToStaticMarkup(React.createElement(CountyMap)), 'map');
  const links = [...document.querySelectorAll('svg.map a[data-county]')];
  assert.equal(links.length, 22);
  assert.equal(new Set(counties.map((county) => county.shape)).size, 22);
  for (const county of counties) {
    const link = links.find((link) => link.getAttribute('href') === officeHref(county));
    assert.ok(link, county.name);
    assert.ok(link.querySelector('path[d]'));
    assert.equal(link.getAttribute('tabindex'), '0');
    assert.equal(
      document.querySelector('[data-label-county="' + county.slug + '"] text')?.textContent,
      county.name,
    );
    assert.ok(link.getAttribute('aria-label')?.includes(county.name));
  }
  assert.ok(links.some((link) => link.getAttribute('href') === '/nur'));
  assert.equal(findCounty('noor')?.slug, 'nur');
  assert.equal(findCounty('gov_tonekabon')?.slug, 'tonekabon');
  assert.equal(findCounty('not-a-county'), undefined);
});

for (const county of counties) {
  test('shared office layout renders the selected county: ' + county.slug, async () => {
    const html = renderToStaticMarkup(await resolveAsync(await OfficePage({ slug: county.slug })));
    const document = verifyDocument(html, '/office?name=' + county.slug);
    assert.ok(document.querySelector('h1')?.textContent?.includes(county.name));
    for (const link of document.querySelectorAll('.portal-office-nav a')) {
      const href = link.getAttribute('href')!;
      if (href !== '/counties') assert.ok(href.includes('name=' + county.slug), href);
    }
    assert.ok(!html.includes('ابوذر قربانی'), 'another county governor must not be copied');
  });
}
for (const route of Object.keys(publicTitles).filter(
  (route) => !['/office', '/contact-us'].includes(route),
)) {
  test('renders public destination with the supplied theme: ' + route, async () => {
    const document = verifyDocument(await renderPublic(route), route);
    assert.ok(document.querySelector('main'));
    assert.ok(document.querySelector('.header-container'));
    assert.ok(document.querySelector('.footer'));
  });
}
test('county news, gallery and contact keep the office query', async () => {
  for (const route of ['/news', '/gallery', '/contact-us'])
    verifyDocument(await renderPublic(route, { name: 'nur' }), route);
  const html = await renderPublic('/contact-us', { name: 'nur' });
  assert.ok(html.includes('فرمانداری نور'));
});
test('all CMS lists use the administration design and keep editing on a separate page', () => {
  for (const route of Object.keys(adminExtraPages)) {
    const html = renderToStaticMarkup(React.createElement(AdminResourcePage, { path: route }));
    verifyDocument(html, route);
    assert.ok(html.includes('education-table'));
    assert.ok(!html.includes('cbnCreateMenuModalOverlay'));
    assert.ok(html.includes('portal-module-menu'));
  }
});
test('new article pages render source images and related links', async () => {
  for (const id of ['design-1', 'design-2', 'design-3']) {
    const document = verifyDocument(await renderPublic('/news/' + id), '/news/' + id);
    assert.ok(document.querySelector('.portal-article-layout article .portal-article-cover img'));
  }
});
test('an unknown county is a 404, not a fallback to another office', async () => {
  await assert.rejects(
    () => OfficePage({ slug: 'missing-office' }),
    (error) => String(error).includes('404'),
  );
});
test('live county news and galleries are scoped to its real organization', async () => {
  const before = process.env.TEMPLATE_PREVIEW,
    originalFetch = globalThis.fetch;
  process.env.TEMPLATE_PREVIEW = 'false';
  const requests: string[] = [];
  globalThis.fetch = async (input) => {
    const url = new URL(String(input));
    requests.push(url.pathname + url.search);
    return Response.json({
      success: true,
      data: url.pathname.endsWith('/counties/by-slug/nur')
        ? {
            county: { name: 'نور' },
            organizations: [{ id: 31, type: 'county' }],
            members: [
              { kind: 'manager', is_current: true, name: 'کارشناس' },
              { kind: 'county_governor', is_current: false, name: 'مسئول سابق' },
              { kind: 'county_governor', is_current: true, name: 'مسئول فعلی' },
            ],
          }
        : [],
    });
  };
  try {
    const office = await officeContent('nur');
    assert.equal(office.organization?.id, 31);
    assert.equal(office.governor?.name, 'مسئول فعلی');
    for (const endpoint of ['news', 'galleries'])
      assert.ok(
        requests.some(
          (request) =>
            request.includes('/' + endpoint + '?') &&
            new URL('http://local' + request).searchParams.get('organization_id') === '31',
        ),
      );
  } finally {
    globalThis.fetch = originalFetch;
    if (before === undefined) delete process.env.TEMPLATE_PREVIEW;
    else process.env.TEMPLATE_PREVIEW = before;
  }
});
test('public reads report backend failure without substituting unrelated sample content', async () => {
  const before = process.env.TEMPLATE_PREVIEW,
    originalFetch = globalThis.fetch;
  process.env.TEMPLATE_PREVIEW = 'false';
  globalThis.fetch = async () => {
    throw Error('offline');
  };
  try {
    const result = await publicData('news', [{ id: 'fake' }], []);
    assert.equal(result.unavailable, true);
    assert.deepEqual(result.data, []);
  } finally {
    globalThis.fetch = originalFetch;
    if (before === undefined) delete process.env.TEMPLATE_PREVIEW;
    else process.env.TEMPLATE_PREVIEW = before;
  }
});
test('local sessions reject bad passwords, tampering, expiration and public hosts', () => {
  const key = Buffer.alloc(32, 7),
    now = Date.now();
  const token = createLocalSession(now, key);
  assert.ok(localCredentials('admin', 'admin'));
  assert.ok(!localCredentials('admin', 'incorrect'));
  assert.ok(!localCredentials(null, 'admin'));
  assert.ok(validLocalSession(token, now, key));
  assert.ok(!validLocalSession(token + 'x', now, key));
  assert.ok(!validLocalSession(token, now + LOCAL_SESSION_SECONDS * 1000 + 1, key));
  assert.ok(!validLocalSession(token, now, Buffer.alloc(32, 9)));
  assert.ok(localAdminEnabled('127.0.0.1:3000'));
  assert.ok(localAdminEnabled('localhost:3000'));
  assert.ok(!localAdminEnabled('example.com'));
});
test('local admin login, protected me, cross-origin rejection and logout use HttpOnly cookies', async () => {
  const before = process.env.TEMPLATE_PREVIEW;
  process.env.TEMPLATE_PREVIEW = 'true';
  const request = (method: string, data?: unknown, extra: Record<string, string> = {}) =>
    new NextRequest('http://127.0.0.1:3000/api/local-admin', {
      method,
      headers: {
        host: '127.0.0.1:3000',
        origin: 'http://127.0.0.1:3000',
        'Content-Type': 'application/json',
        ...extra,
      },
      ...(data === undefined ? {} : { body: JSON.stringify(data) }),
    });
  try {
    assert.equal((await GET(request('GET'))).status, 401);
    assert.equal((await POST(request('POST', { login: 'admin', password: 'bad' }))).status, 422);
    assert.equal(
      (
        await POST(
          request(
            'POST',
            { login: 'admin', password: 'admin' },
            { origin: 'https://unrelated.example' },
          ),
        )
      ).status,
      403,
    );
    const response = await POST(request('POST', { login: 'admin', password: 'admin' }));
    assert.equal(response.status, 200);
    const cookie = response.headers.get('set-cookie')!;
    assert.match(cookie, /HttpOnly/i);
    assert.match(cookie, /SameSite=lax/i);
    assert.ok(!JSON.stringify(await response.json()).includes('token'));
    const token = cookie.match(new RegExp(LOCAL_ADMIN_COOKIE + '=([^;]+)'))![1];
    assert.equal(
      (await GET(request('GET', undefined, { cookie: LOCAL_ADMIN_COOKIE + '=' + token }))).status,
      200,
    );
    const logout = await DELETE(request('DELETE'));
    assert.match(logout.headers.get('set-cookie')!, /Max-Age=0/i);
    process.env.TEMPLATE_PREVIEW = 'false';
    assert.equal((await POST(request('POST', { login: 'admin', password: 'admin' }))).status, 403);
  } finally {
    if (before === undefined) delete process.env.TEMPLATE_PREVIEW;
    else process.env.TEMPLATE_PREVIEW = before;
  }
});

test('each provincial service row opens its own design record', async () => {
  const page = templates.find((page) => page.path === '/services/provincial')!;
  const View = templateViews[page.id as keyof typeof templateViews];
  const document = new JSDOM(renderToStaticMarkup(React.createElement(View))).window.document;
  const rows = [...document.querySelectorAll('table tbody tr')];
  assert.equal(rows.length, 9);
  for (const [index, row] of rows.entries()) {
    const href = row.querySelector('a')?.getAttribute('href');
    assert.equal(href, '/service/design-' + (index + 1));
    const detail = await renderPublic(href!);
    assert.ok(detail.includes(row.querySelectorAll('td')[1].textContent!.trim()));
  }
});
