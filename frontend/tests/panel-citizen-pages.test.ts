import test from 'node:test';
import assert from 'node:assert/strict';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { renderToStaticMarkup } from 'react-dom/server';
import { JSDOM, VirtualConsole } from 'jsdom';
import { AuthenticationPage } from '../src/components/auth/authentication-page';
import { SiteHeader } from '../src/components/site/site-header';
import { ContentArticle } from '../src/components/site/content-article';
import {
  adminDestination,
  citizenDestination,
  ADMIN_HOME,
  ADMIN_LOGIN,
} from '../src/lib/auth/destinations';
import { adminModules } from '../src/data/admin/modules';
import { knownRoute } from '../src/lib/routes';
import { adminEditorHref, resolveAdminEditor, safeAdminReturn } from '../src/lib/admin-routes';
import { countyPortalHref } from '../src/lib/county-portal';
import type { PortalUser } from '../src/types/portal';

const window = new JSDOM('', {
  url: 'https://portal.example/register',
  pretendToBeVisual: true,
  virtualConsole: new VirtualConsole(),
}).window;
for (const name of [
  'window',
  'document',
  'HTMLElement',
  'HTMLInputElement',
  'HTMLSelectElement',
  'HTMLTextAreaElement',
  'HTMLFormElement',
  'FormData',
  'AbortController',
  'AbortSignal',
] as const)
  Object.defineProperty(globalThis, name, {
    value: name === 'window' ? window : window[name],
    configurable: true,
  });
Object.defineProperty(globalThis, 'IS_REACT_ACT_ENVIRONMENT', { value: true, configurable: true });
const staff: PortalUser = {
  id: 1,
  name: 'مدیر',
  person_type: 'staff',
  role: { name: 'super_admin', permissions: ['*'] },
};
const citizen: PortalUser = {
  id: 2,
  name: 'شهروند',
  person_type: 'citizen',
  role: { name: 'citizen', permissions: [] },
};
const tick = () => new Promise<void>((resolve) => setImmediate(resolve));

test('every admin module and create/edit/return link uses the new panel prefix', () => {
  assert.equal(ADMIN_HOME, '/panel/admin');
  assert.equal(ADMIN_LOGIN, '/panel/admin/login');
  assert.equal(knownRoute(ADMIN_HOME), true);
  assert.equal(knownRoute(ADMIN_LOGIN), true);
  for (const path of ['/admin', '/admin/login', '/admin/news/new'])
    assert.equal(knownRoute(path), false, path);
  for (const module of adminModules) {
    assert.ok(module.path.startsWith('/panel/admin/'));
    assert.ok(knownRoute(module.path), module.path);
    if (module.canCreate && module.resource) {
      const href = adminEditorHref(module.path);
      assert.ok(href.startsWith('/panel/admin/'));
      assert.ok(knownRoute(href));
    }
  }
  const path = '/panel/admin/news';
  assert.equal(resolveAdminEditor(path + '/new')?.page.path, path);
  assert.equal(safeAdminReturn(path, '/admin/news'), path);
  assert.equal(countyPortalHref({ slug: 'amol' }, ADMIN_LOGIN), ADMIN_LOGIN);
});

test('login destinations enforce the account type, safe panel return and own county workspace', () => {
  assert.equal(adminDestination(staff), ADMIN_HOME);
  assert.equal(
    adminDestination(staff, '/panel/admin/news/new?return=%2Fpanel%2Fadmin%2Fnews'),
    '/panel/admin/news/new?return=%2Fpanel%2Fadmin%2Fnews',
  );
  for (const unsafe of [
    'https://evil.example/panel/admin',
    '//evil.example',
    '/citizen',
    '/admin',
    '/panel/admin/login',
    '/panel/admin/logout',
    '/panel/admin\\evil',
    '/panel/administrator',
  ])
    assert.equal(adminDestination(staff, unsafe), ADMIN_HOME);
  assert.throws(() => adminDestination(citizen));
  assert.throws(() => adminDestination({ ...staff, is_active: false }));
  assert.equal(citizenDestination(citizen), '/citizen');
  assert.throws(() => citizenDestination(staff));
  const county = {
    ...staff,
    portal_context: { type: 'county', county: { slug: 'amol' } },
  } as PortalUser;
  assert.equal(adminDestination(county, '/county-admin/sari'), '/county-admin/amol');
});

test('public header entry points describe citizens and never link to administration login', () => {
  const html = renderToStaticMarkup(React.createElement(SiteHeader));
  assert.match(html, /href="\/login"[^>]*>ورود شهروندان/);
  assert.match(html, /href="\/register"[^>]*>ثبت‌نام شهروندان/);
  assert.doesNotMatch(html, /href="\/panel\/admin/);
});

test('citizen registration, citizen login and management login have distinct fields and denial message', () => {
  const registration = new JSDOM(
    renderToStaticMarkup(React.createElement(AuthenticationPage, { mode: 'register' })),
  ).window.document;
  assert.ok(registration.querySelector('[name="national_code"]'));
  assert.ok(registration.querySelector('[name="mobile"]'));
  assert.equal(registration.querySelector('[name="password"]'), null);
  const login = new JSDOM(
    renderToStaticMarkup(React.createElement(AuthenticationPage, { mode: 'login' })),
  ).window.document;
  assert.equal(login.querySelector('[name="national_code"]'), null);
  assert.ok(login.querySelector('[name="mobile"]'));
  const management = new JSDOM(
    renderToStaticMarkup(React.createElement(AuthenticationPage, { mode: 'staff', denied: true })),
  ).window.document;
  assert.ok(management.querySelector('[name="password"]'));
  assert.equal(management.querySelector('[href="/register"]'), null);
  assert.match(management.querySelector('[role="alert"]')!.textContent!, /حساب مدیریتی/);
});

test('OTP registration sends normalized identity once and invalid codes keep the verification form usable', async () => {
  const previous = fetch;
  const node = document.createElement('div');
  document.body.replaceChildren(node);
  const root = createRoot(node);
  const calls: { path: string; body: any }[] = [];
  try {
    globalThis.fetch = async (path, options) => {
      calls.push({ path: String(path), body: JSON.parse(String(options!.body)) });
      return String(path).endsWith('/register')
        ? Response.json({ success: true, data: { challenge_id: 'fixture-challenge' } })
        : Response.json(
            { message: 'کد صحیح نیست.', errors: { code: ['کد صحیح نیست.'] } },
            { status: 422 },
          );
    };
    await act(async () =>
      root.render(React.createElement(AuthenticationPage, { mode: 'register' })),
    );
    await act(async () => {
      for (const [name, value] of [
        ['name', 'شهروند آزمایشی'],
        ['mobile', '۰۹۱۲۰۰۰۵۵۱۱'],
        ['national_code', '۰۰۸۴۵۷۵۹۴۸'],
      ]) {
        const input = node.querySelector<HTMLInputElement>('[name="' + name + '"]')!;
        input.value = value;
        input.dispatchEvent(new window.Event('input', { bubbles: true }));
      }
      const form = node.querySelector('form')!;
      form.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
      form.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
      await tick();
    });
    assert.equal(calls.length, 1);
    assert.deepEqual(calls[0], {
      path: '/api/backend/auth/register',
      body: { name: 'شهروند آزمایشی', mobile: '09120005511', national_code: '0084575948' },
    });
    assert.ok(node.querySelector('[name="code"]'));
    assert.equal(node.querySelector('[name="password"]'), null);
    await act(async () => {
      node.querySelector<HTMLInputElement>('[name="code"]')!.value = '000000';
      node
        .querySelector('form')!
        .dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
      await tick();
    });
    assert.equal(calls[1].path, '/api/backend/auth/otp/verify');
    assert.match(node.querySelector('[role="alert"]')!.textContent!, /کد صحیح نیست/);
    assert.equal(node.querySelector('fieldset')!.disabled, false);
  } finally {
    await act(async () => root.unmount());
    globalThis.fetch = previous;
    node.remove();
  }
});

test('staff form sends staff audience and presents rejected credentials without navigation', async () => {
  const previous = fetch;
  const node = document.createElement('div');
  document.body.replaceChildren(node);
  const root = createRoot(node);
  let payload: any;
  try {
    globalThis.fetch = async (_path, options) => {
      payload = JSON.parse(String(options!.body));
      return Response.json({ message: 'ورود مجاز نیست.' }, { status: 422 });
    };
    await act(async () => root.render(React.createElement(AuthenticationPage, { mode: 'staff' })));
    await act(async () => {
      node.querySelector<HTMLInputElement>('[name="login"]')!.value = 'fixture';
      node.querySelector<HTMLInputElement>('[name="password"]')!.value = 'Fixture-Password42!';
      node
        .querySelector('form')!
        .dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
      await tick();
    });
    assert.equal(payload.audience, 'staff');
    assert.match(node.querySelector('[role="alert"]')!.textContent!, /ورود مجاز نیست/);
  } finally {
    await act(async () => root.unmount());
    globalThis.fetch = previous;
    node.remove();
  }
});

test('shared article presents one heading, correct content type, valid date and optional cover without fabricated images', () => {
  for (const [type, label] of [
    ['news', 'خبر'],
    ['resolution', 'مصوبه'],
    ['announcement', 'اطلاعیه'],
  ]) {
    const html = renderToStaticMarkup(
      React.createElement(ContentArticle, {
        article: {
          title: 'عنوان مطلب',
          type,
          published_at: '2026-10-21T07:00:00Z',
          excerpt: 'خلاصه',
        },
        text: 'متن کامل',
      }),
    );
    const doc = new JSDOM(html).window.document;
    assert.equal(doc.querySelectorAll('h1').length, 1);
    assert.equal(doc.querySelector('.portal-article-type')!.textContent, label);
    assert.equal(doc.querySelector('.portal-article-cover'), null);
    assert.ok(doc.querySelector('time[datetime]'));
    assert.equal(doc.querySelector('.portal-rich-text')!.textContent, 'متن کامل');
  }
  const html = renderToStaticMarkup(
    React.createElement(ContentArticle, {
      article: { title: 'با تصویر', type: 'news', published_at: 'bad' },
      text: 'متن',
      image: '/storage/fixture.webp',
    }),
  );
  const doc = new JSDOM(html).window.document;
  assert.equal(doc.querySelector('time'), null);
  assert.equal(
    doc.querySelector('.portal-article-cover img')!.getAttribute('src'),
    '/storage/fixture.webp',
  );
});
