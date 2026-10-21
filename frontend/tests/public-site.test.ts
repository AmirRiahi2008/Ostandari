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
import { knownRoute, routeAlias } from '../src/lib/routes';
import { managerGroups } from '../src/data/manager-groups';
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
    document.querySelector('.source-slider .swiper-slide img')?.getAttribute('src'),
    officialSite.slides[0].image,
  );
  assert.equal(document.querySelectorAll('svg.map a[data-county][tabindex="0"]').length, 22);
  assert.equal(document.querySelectorAll('svg.map a[data-label-county]').length, 22);
  assert.equal(
    document.querySelector('.source-slider .swiper-slide img')?.getAttribute('width'),
    '1280',
  );
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

test('home preserves the supplied header, section order, ornaments and footer instead of a new page design', async () => {
  process.env.TEMPLATE_PREVIEW = 'true';
  const original = new JSDOM(fs.readFileSync('originals/site/ostandari-website/asli.html', 'utf8'))
    .window.document;
  const page = new JSDOM(await render(await HomePage())).window.document;
  const selector = '.nav-bala, .imageeee, .top-header';
  assert.deepEqual(
    [...page.querySelector('.header-container')!.querySelectorAll(selector)].map(
      (item) => item.className,
    ),
    [...original.querySelector('.header-container')!.querySelectorAll(selector)].map(
      (item) => item.className,
    ),
  );
  assert.equal(
    page.querySelector('.imageeee > img')?.getAttribute('src'),
    '/design/site/assets/image/baner.png',
  );
  assert.equal(
    page.querySelector('.shoar-sal img')?.getAttribute('src'),
    '/design/site/assets/image/شعار پ.png',
  );
  assert.ok(page.querySelector('.desktop-menu > .logo-wrapper img'));
  const sections = (doc: Document) =>
    [...doc.querySelectorAll('.sections-container > section')]
      .map((section) => section.firstElementChild?.classList[0])
      .filter((name) => name !== 'footer');
  assert.deepEqual(sections(page), sections(original));
  assert.ok(page.querySelector('.footer .top-footer .iconostandari svg'));
  assert.ok(page.querySelector('.icx-footer-wrap .icx-footer-contact'));
  assert.equal(page.querySelector('.public-home, .public-header, .public-footer'), null);
  const sourcePaths = [
    ...original.querySelectorAll('.menu-right > .menu-item:first-child svg path'),
  ].map((path) => path.getAttribute('d'));
  assert.deepEqual(
    [...page.querySelectorAll('.menu-right > .menu-item:first-child svg path')].map((path) =>
      path.getAttribute('d'),
    ),
    sourcePaths,
  );
});

test('original menu destinations remain reachable after promoting main items and moving utility links', async () => {
  process.env.TEMPLATE_PREVIEW = 'true';
  const page = new JSDOM(await render(await HomePage())).window.document;
  const links = new Set(
    [...page.querySelectorAll('.header-container a[href]')].map((link) =>
      link.getAttribute('href'),
    ),
  );
  function check(items: NavigationItem[]) {
    for (const item of items) {
      const url = new URL(item.href, 'https://portal.invalid');
      const destination = routeAlias(url.pathname, url.searchParams) ?? item.href;
      assert.ok(links.has(destination), destination);
      if (item.href !== '/duties') check(item.children);
      else for (const child of item.children) assert.ok(knownRoute(child.href));
    }
  }
  check(officialNavigation.main);
});

test('live backend branding fills the original banner, slogan and central logo without extra home requests', async () => {
  process.env.TEMPLATE_PREVIEW = 'false';
  const previous = globalThis.fetch;
  const requests: string[] = [];
  globalThis.fetch = async (input) => {
    const endpoint = String(input);
    requests.push(endpoint);
    return new Response(
      JSON.stringify({
        data: endpoint.includes('/home?')
          ? {
              settings: {
                'site.banner': '/branding/banner.png',
                'site.logo': '/branding/logo.svg',
                'site.slogan': '/branding/slogan.png',
              },
              news: [],
              slides: [],
              members: {},
            }
          : [],
      }),
    );
  };
  try {
    const page = new JSDOM(await render(await HomePage())).window.document;
    assert.equal(
      page.querySelector('.imageeee > img')?.getAttribute('src'),
      '/branding/banner.png',
    );
    assert.equal(
      page.querySelector('.logo-wrapper img')?.getAttribute('src'),
      '/branding/logo.svg',
    );
    assert.equal(page.querySelector('.shoar-sal img')?.getAttribute('src'), '/branding/slogan.png');
    assert.equal(requests.length, 2);
  } finally {
    globalThis.fetch = previous;
    process.env.TEMPLATE_PREVIEW = 'true';
  }
});

test('county managers and their profile and contact links keep the selected county', async () => {
  process.env.TEMPLATE_PREVIEW = 'false';
  const previous = globalThis.fetch;
  const requests: string[] = [];
  globalThis.fetch = async (input) => {
    const endpoint = String(input);
    requests.push(endpoint);
    const data = endpoint.includes('counties/by-slug/nur')
      ? { county: { id: 42 }, organizations: [], members: [] }
      : endpoint.includes('members?')
        ? endpoint.includes('county_id=42')
          ? [{ id: 93, name: 'مدیر شهرستان منتخب', position: 'مدیر شهرستان', kind: 'manager' }]
          : [{ id: 94, name: 'مدیر استان نامرتبط', kind: 'manager' }]
        : [];
    return new Response(JSON.stringify({ data }));
  };
  try {
    const section = resolveOfficialSection('/managers', { name: 'nur' })!;
    const page = new JSDOM(
      await render(await OfficialSectionPage({ section, search: { name: 'nur' } })),
    ).window.document;
    assert.match(page.body.textContent!, /مدیر شهرستان منتخب/);
    assert.doesNotMatch(page.body.textContent!, /مدیر استان نامرتبط/);
    assert.ok(
      requests.some(
        (endpoint) => endpoint.includes('members?') && endpoint.includes('county_id=42'),
      ),
    );
    assert.ok(page.querySelector('a[href="/managers?name=nur&person=93"]'));
    assert.ok(page.querySelector('a[href="/contact-us?name=nur"]'));
  } finally {
    globalThis.fetch = previous;
    process.env.TEMPLATE_PREVIEW = 'true';
  }
});

test('provincial services and governors use the table and cards from their supplied design pages', async () => {
  process.env.TEMPLATE_PREVIEW = 'true';
  const services = new JSDOM(
    await render(await OfficialSectionPage({ section: sectionById.get('menu-1')! })),
  ).window.document;
  assert.equal(services.querySelectorAll('table thead th').length, 9);
  assert.equal(
    services.querySelector('link[rel=stylesheet]')?.getAttribute('href'),
    '/design/pages/design-site-8db07974849a25.css',
  );
  const governors = new JSDOM(
    await render(await OfficialSectionPage({ section: sectionById.get('governors')! })),
  ).window.document;
  assert.ok(governors.querySelector('.advar-wrap .advar-grid .advar-card .advar-name'));
  assert.match(governors.querySelector('.advar-name')?.textContent ?? '', /مهدی یونسی رستمی/);
  assert.equal(resolveOfficialSection('/managers', { kind: 'village_head' })?.title, 'دهیاران');
});

test('transparency retains its supplied sixteen image tiles and every tile has a real local destination', async () => {
  process.env.TEMPLATE_PREVIEW = 'true';
  const page = new JSDOM(
    await render(await OfficialSectionPage({ section: sectionById.get('menu-195')! })),
  ).window.document;
  const original = new JSDOM(
    fs.readFileSync('originals/site/ostandari-website/pages/samane.html', 'utf8'),
  ).window.document;
  assert.equal(
    page.querySelectorAll('.x9z-portal-card').length,
    original.querySelectorAll('.x9z-portal-card').length,
  );
  assert.deepEqual(
    [...page.querySelectorAll('.x9z-portal-title')].map((item) => item.textContent),
    [...original.querySelectorAll('.x9z-portal-title')].map((item) => item.textContent),
  );
  for (const card of page.querySelectorAll('.x9z-portal-card')) {
    const src = card.querySelector('img')?.getAttribute('src');
    assert.ok(src && fs.existsSync('public' + src));
    assert.ok(knownRoute(card.getAttribute('href')!));
  }
});

test('the footer spans outside the content wrapper and retains the reference columns, contact details and credit', async () => {
  process.env.TEMPLATE_PREVIEW = 'true';
  const dom = new JSDOM(await render(await HomePage()));
  try {
    const doc = dom.window.document;
    const footer = doc.querySelector('[data-source-footer]')!;
    assert.equal(footer.closest('.source-portal'), null);
    assert.deepEqual(
      [...footer.querySelectorAll('h4')].map((el) => el.textContent),
      ['سایت', 'صفحات', 'سرویس‌ها', 'اطلاعات تماس'],
    );
    assert.deepEqual(
      [...footer.querySelectorAll('nav:nth-child(1) a')].map((el) => el.getAttribute('href')),
      ['/polls', '/transparency', '/about'],
    );
    assert.deepEqual(
      [...footer.querySelectorAll('nav:nth-child(2) a')].map((el) => el.getAttribute('href')),
      ['/', '/contact'],
    );
    assert.deepEqual(
      [...footer.querySelectorAll('nav:nth-child(3) a')].map((el) => el.getAttribute('href')),
      ['/performance', '/privacy', '/participation', '/service-agreement/statement'],
    );
    assert.equal(
      footer.querySelector('.source-footer-credit')?.getAttribute('href'),
      'https://sadrasoft.ir',
    );
    assert.equal(
      footer.querySelector('a[href^="mailto:"]')?.textContent,
      officialSite.contact.email,
    );
    assert.ok(footer.querySelector('address')?.textContent?.includes(officialSite.contact.phone));
    assert.equal(footer.querySelectorAll('address .icx-footer-icon').length, 4);
  } finally {
    dom.window.close();
  }
});

const groupedManagers = [
  { id: 801, name: 'مدیر ستادی ثبت‌شده', kind: 'manager', position: 'مدیر کل حوزه استاندار' },
  { id: 802, name: 'معاون ثبت‌شده', kind: 'manager', position: 'معاون هماهنگی امور اقتصادی' },
  { id: 803, name: 'مدیر اجرایی ثبت‌شده', kind: 'manager', position: 'مدیر دستگاه اجرایی' },
  { id: 804, name: 'فرماندار ثبت‌شده', kind: 'county_governor', position: 'فرماندار شهرستان' },
  {
    id: 805,
    name: 'مدیر روابط عمومی ثبت‌شده',
    kind: 'manager',
    position: 'مدیر روابط عمومی استان',
  },
  { id: 806, name: 'مشاور ثبت‌شده', kind: 'advisor', position: 'مشاور استاندار' },
];

test('home always displays the requested motto and six reference manager groups with independent people and links', async () => {
  const before = process.env.TEMPLATE_PREVIEW,
    originalFetch = globalThis.fetch;
  process.env.TEMPLATE_PREVIEW = 'false';
  const members = Object.groupBy(groupedManagers, (person) => person.kind);
  globalThis.fetch = async (input) =>
    Response.json({
      success: true,
      data: String(input).includes('/home?') ? { members, news: [], slides: [] } : [],
    });
  try {
    const dom = new JSDOM(await render(await HomePage()));
    const doc = dom.window.document;
    assert.equal(
      doc.querySelector('.header-paen .marquee-content')?.textContent?.trim(),
      'اقتصاد مقاومتی در سایه وحدت ملی و امنیت ملی',
    );
    const tabs = [...doc.querySelectorAll('.source-managers [role="tab"]')];
    const panels = [...doc.querySelectorAll('.source-managers [role="tabpanel"]')];
    assert.deepEqual(
      tabs.map((el) => el.textContent),
      managerGroups.map((item) => item.title),
    );
    for (let i = 0; i < managerGroups.length; i++) {
      assert.deepEqual(
        [...panels[i].querySelectorAll('.card1 h3')].map((el) => el.textContent),
        [groupedManagers[i].name],
      );
      assert.equal(
        panels[i].querySelector('.more-card')?.getAttribute('href'),
        '/managers?group=' + managerGroups[i].group,
      );
    }
    dom.window.close();
  } finally {
    globalThis.fetch = originalFetch;
    process.env.TEMPLATE_PREVIEW = before;
  }
});

test('the six manager directory pages use the same grouping as the homepage, including category-based classification', async () => {
  const before = process.env.TEMPLATE_PREVIEW,
    originalFetch = globalThis.fetch;
  process.env.TEMPLATE_PREVIEW = 'false';
  globalThis.fetch = async (input) => {
    const url = new URL(String(input));
    const kind = url.searchParams.get('kind');
    return Response.json({
      success: true,
      data: url.pathname.endsWith('/members')
        ? groupedManagers
            .filter((person) => person.kind === kind)
            .map((person) =>
              person.id === 803
                ? { ...person, position: 'مدیر کل', category: { slug: 'official-menu-62' } }
                : person,
            )
        : [],
    });
  };
  try {
    for (let i = 0; i < managerGroups.length; i++) {
      const section = resolveOfficialSection('/managers', { group: managerGroups[i].group })!;
      const dom = new JSDOM(await render(await OfficialSectionPage({ section })));
      const names = [...dom.window.document.querySelectorAll('.card1 h3')].map(
        (el) => el.textContent,
      );
      assert.deepEqual(names, [groupedManagers[i].name], managerGroups[i].title);
      dom.window.close();
    }
  } finally {
    globalThis.fetch = originalFetch;
    process.env.TEMPLATE_PREVIEW = before;
  }
});
