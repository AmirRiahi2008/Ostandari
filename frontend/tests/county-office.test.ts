import test from 'node:test';
import assert from 'node:assert/strict';
import React, { cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { JSDOM } from 'jsdom';
import { counties, countyPreviewTemplate, findCounty, officeHref } from '../src/data/counties';
import { countyNavigation } from '../src/lib/county-portal';
import { CountyArtwork } from '../src/components/site/county-artwork';
import { OfficePage } from '../src/features/site/office-page';

async function resolve(node: ReactNode): Promise<ReactNode> {
  if (Array.isArray(node)) return Promise.all(React.Children.toArray(node).map(resolve));
  if (!isValidElement(node)) return node;
  const element = node as ReactElement<{ children?: ReactNode }>;
  if (typeof element.type === 'function' && element.type.constructor.name === 'AsyncFunction') {
    return resolve(await (element.type as (props: unknown) => Promise<ReactNode>)(element.props));
  }
  return element.props.children === undefined
    ? element
    : cloneElement(element, { children: await resolve(element.props.children) });
}

async function office(slug: string, section?: string) {
  return new JSDOM(renderToStaticMarkup(await resolve(await OfficePage({ slug, section })))).window
    .document;
}

test('Abbasabad uses the supplied county artwork and its own nameplate instead of the Babol building photo', () => {
  const county = findCounty('abbasabad')!;
  assert.equal(county.usesPreviewTemplate, true);
  assert.equal(county.previewImage, countyPreviewTemplate);
  assert.notEqual(county.image, '/design/site/assets/image/172074023.jpg');
  const document = new JSDOM(renderToStaticMarkup(React.createElement(CountyArtwork, { county })))
    .window.document;
  assert.equal(document.querySelector('img')?.getAttribute('src'), countyPreviewTemplate);
  assert.equal(
    document.querySelector('.portal-county-nameplate')?.textContent,
    'فرمانداری عباس‌آباد',
  );
  assert.equal(
    document.querySelector('img')?.getAttribute('alt'),
    'طرح فرمانداری شهرستان عباس‌آباد',
  );
});

for (const county of counties) {
  test(
    'county office keeps its own artwork, current navigation and highlighted map: ' + county.slug,
    async () => {
      const preview = process.env.TEMPLATE_PREVIEW;
      process.env.TEMPLATE_PREVIEW = 'true';
      try {
        const document = await office(county.slug);
        assert.equal(
          document.querySelector('[data-county-office]')?.getAttribute('data-county-office'),
          county.slug,
        );
        assert.equal(
          document.querySelector('.portal-office-hero-art img')?.getAttribute('src'),
          county.previewImage,
        );
        assert.equal(document.querySelector('.portal-county-navigation'), null);
        assert.equal(
          document.querySelector('.logo-wrapper a')?.getAttribute('href'),
          officeHref(county),
        );
        assert.equal(
          document.querySelector('.portal-office-location-map svg')?.getAttribute('aria-label'),
          'موقعیت شهرستان ' + county.name + ' در استان مازندران',
        );
        assert.equal(
          document.querySelectorAll('.portal-office-location-map [data-selected="true"]').length,
          1,
        );
        assert.equal(
          document
            .querySelector('.portal-office-location-map [data-selected="true"]')
            ?.getAttribute('d'),
          county.shape,
        );
        assert.ok(document.querySelector('.portal-office-sidebar'));
        assert.ok(document.querySelector('.portal-office-main-column'));
        assert.equal(
          document.querySelector('.source-slider'),
          null,
          'a provincial slideshow must not replace the county identity',
        );
        if (county.usesPreviewTemplate)
          assert.equal(
            document.querySelector('.portal-county-nameplate')?.textContent,
            'فرمانداری ' + county.name,
          );
      } finally {
        if (preview === undefined) delete process.env.TEMPLATE_PREVIEW;
        else process.env.TEMPLATE_PREVIEW = preview;
      }
    },
  );
}

test('county navigation lives in the main header and uses the county route for its sections', () => {
  const county = findCounty('abbasabad')!;
  const items = countyNavigation(county);
  assert.ok(items.some((item) => item.href === '/abbasabad/about'));
  assert.ok(items.some((item) => item.href === '/abbasabad/managers'));
  assert.equal(
    items.some((item) => item.href === '/counties'),
    false,
  );
});

test('live county content renders its own governor, gallery, about text and scoped news links', async () => {
  const fetch = globalThis.fetch;
  const preview = process.env.TEMPLATE_PREVIEW;
  process.env.TEMPLATE_PREVIEW = 'false';
  globalThis.fetch = async (input) => {
    const url = new URL(String(input));
    const endpoint = url.pathname.split('/api/v1/')[1];
    let data: unknown = [];
    if (endpoint === 'counties/by-slug/abbasabad')
      data = {
        county: { id: 42, description: '<p>معرفی واقعی عباس‌آباد</p>' },
        organizations: [{ id: 31, type: 'county' }],
        members: [
          {
            id: 51,
            name: 'فرماندار ثبت‌شده',
            kind: 'county_governor',
            is_current: true,
            image: { url: '/design/site/assets/image/logo.png' },
          },
        ],
      };
    if (url.searchParams.get('organization_id') === '31' && endpoint === 'news')
      data = [
        {
          id: 71,
          title: 'خبر شهرستان',
          excerpt: 'شرح خبر',
          published_at: '2026-10-19',
          cover: { url: '/design/site/assets/Img/100.png' },
        },
      ];
    if (url.searchParams.get('organization_id') === '31' && endpoint === 'galleries')
      data = [
        {
          id: 81,
          title: 'گالری شهرستان',
          items: [{ image: { url: '/design/site/assets/Img/100.png' } }],
        },
      ];
    if (endpoint === 'announcements')
      return Response.json({ message: 'Unavailable' }, { status: 503 });
    if (endpoint === 'settings') data = {};
    return Response.json({ success: true, data });
  };
  try {
    const document = await office('abbasabad');
    assert.match(
      document.querySelector('.portal-office-governor')?.textContent ?? '',
      /فرماندار ثبت‌شده/,
    );
    assert.ok(document.querySelector('.portal-office-news a[href^="/abbasabad/news"]'));
    assert.equal(
      document.querySelector('.portal-office-gallery a')?.getAttribute('href'),
      '/abbasabad/gallery?album=81',
    );
    const about = await office('abbasabad', 'about');
    assert.match(
      about.querySelector('.portal-office-about')?.textContent ?? '',
      /معرفی واقعی عباس‌آباد/,
    );
    assert.equal(
      about.querySelector('.desktop-menu a[href="/abbasabad/about"]')?.getAttribute('href'),
      '/abbasabad/about',
    );
  } finally {
    globalThis.fetch = fetch;
    if (preview === undefined) delete process.env.TEMPLATE_PREVIEW;
    else process.env.TEMPLATE_PREVIEW = preview;
  }
});

test('an unavailable county service shows an error state while keeping the selected county artwork and routes', async () => {
  const fetch = globalThis.fetch;
  const preview = process.env.TEMPLATE_PREVIEW;
  process.env.TEMPLATE_PREVIEW = 'false';
  globalThis.fetch = async () => Response.json({ message: 'Unavailable' }, { status: 503 });
  try {
    const document = await office('abbasabad');
    assert.match(
      document.querySelector('.portal-office-news')?.textContent ?? '',
      /ارتباط با سرویس اطلاعات برقرار نشد/,
    );
    assert.equal(
      document.querySelector('[data-county-artwork]')?.getAttribute('data-county-artwork'),
      'abbasabad',
    );
    assert.equal(
      document.querySelector('.portal-county-nameplate')?.textContent,
      'فرمانداری عباس‌آباد',
    );
    assert.ok(document.querySelector('a[href="/abbasabad/contact?type=normal"]'));
  } finally {
    globalThis.fetch = fetch;
    if (preview === undefined) delete process.env.TEMPLATE_PREVIEW;
    else process.env.TEMPLATE_PREVIEW = preview;
  }
});
