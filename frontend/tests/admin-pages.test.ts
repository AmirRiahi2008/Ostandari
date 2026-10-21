import test from 'node:test';
import assert from 'node:assert/strict';
import React, { act } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { JSDOM } from 'jsdom';
import { templates, resolveTemplate } from '../src/lib/templates';
import { templateViews } from '../src/views';
import { adminExtraPages } from '../src/data/admin/extra-pages';
import { adminUtilityTitles } from '../src/data/admin/utility-pages';
import { adminModules } from '../src/data/admin/modules';
import { SiteSettings } from '../src/components/admin/site-settings';
import { AuditLog } from '../src/components/admin/audit-log';
import { AdminDashboard } from '../src/components/admin/dashboard';
import { resolveAdminEditor, resolveReportEditor } from '../src/lib/admin-routes';
import { AdminModuleMenu } from '../src/components/admin/module-menu';
import { adminSections } from '../src/data/admin/sections';

const window = new JSDOM('', {
  url: 'https://portal.example/admin/settings',
  pretendToBeVisual: true,
}).window;
for (const name of [
  'window',
  'document',
  'HTMLElement',
  'HTMLInputElement',
  'HTMLSelectElement',
  'HTMLTextAreaElement',
  'Element',
  'Node',
  'FormData',
] as const)
  Object.defineProperty(globalThis, name, {
    value: name === 'window' ? window : window[name],
    configurable: true,
  });
Object.defineProperty(globalThis, 'IS_REACT_ACT_ENVIRONMENT', { value: true, configurable: true });

const flush = async () => {
  for (let i = 0; i < 8; i++) await new Promise((resolve) => setImmediate(resolve));
};
async function mount(view: React.ReactElement) {
  const { createRoot } = await import('react-dom/client');
  const element = document.createElement('div');
  document.body.replaceChildren(element);
  const root = createRoot(element);
  await act(async () => {
    root.render(view);
    await flush();
  });
  return {
    element,
    dispose: async () => {
      await act(async () => root.unmount());
      element.remove();
    },
  };
}

test('every admin module and every navigation link in the original admin templates resolves to an implemented page', () => {
  const implemented = (path: string) =>
    Boolean(
      resolveAdminEditor(path) ||
      resolveReportEditor(path) ||
      resolveTemplate(path) ||
      adminExtraPages[path] ||
      adminUtilityTitles[path] ||
      path === '/panel/admin/login',
    );
  assert.equal(new Set(adminModules.map((page) => page.path)).size, adminModules.length);
  for (const module of adminModules) {
    assert.ok(implemented(module.path), module.path);
    assert.notEqual(module.title, 'صدیار');
    assert.ok(module.permission);
  }
  for (const page of templates.filter((page) => page.group === 'admin')) {
    const View = templateViews[page.id as keyof typeof templateViews];
    const root = document.createElement('div');
    root.innerHTML = renderToStaticMarkup(React.createElement(View));
    for (const link of root.querySelectorAll<HTMLAnchorElement>('a[href]')) {
      const url = new URL(link.getAttribute('href')!, 'https://portal.example');
      if (url.pathname.startsWith('/panel/admin'))
        assert.ok(implemented(url.pathname), page.path + ' → ' + url.pathname);
      assert.ok(
        !(url.pathname === '/unit' && /مدیریت/.test(url.searchParams.get('name') ?? '')),
        'management links must remain in the administration',
      );
    }
  }
});

test('site settings submit one PUT, retain unrelated contact fields and do not overwrite unedited advanced settings', async () => {
  const original = fetch;
  let written: { settings: { key: string; value: unknown }[] } | undefined;
  const records = [
    { key: 'site.name', value: 'نام قبلی', is_public: true },
    {
      key: 'site.contact',
      value: { phone: '011', address: 'ساری', emergency: 'kept' },
      is_public: true,
    },
    { key: 'home.sections', value: { news: true }, is_public: true },
    { key: 'site.logo', value: { url: 'https://images.example/logo.webp' }, is_public: true },
  ];
  globalThis.fetch = async (_url, options) => {
    if (options?.method === 'PUT') written = JSON.parse(String(options.body));
    return Response.json({ success: true, data: records });
  };
  const screen = await mount(React.createElement(SiteSettings, { preview: false }));
  try {
    screen.element.querySelector<HTMLInputElement>('input[name="site.name"]')!.value = 'نام جدید';
    await act(async () => {
      screen.element
        .querySelector('form')!
        .dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
      await flush();
    });
    assert.equal(written?.settings.find((row) => row.key === 'site.name')?.value, 'نام جدید');
    assert.equal(
      (
        written?.settings.find((row) => row.key === 'site.contact')?.value as Record<
          string,
          unknown
        >
      ).emergency,
      'kept',
    );
    assert.equal(
      written?.settings.find((row) => row.key === 'site.logo')?.value,
      'https://images.example/logo.webp',
    );
    assert.equal(
      written?.settings.some((row) => row.key === 'home.sections'),
      false,
    );
    assert.match(screen.element.textContent!, /تنظیمات ذخیره شد/);
  } finally {
    await screen.dispose();
    globalThis.fetch = original;
  }
});

test('audit history loads real rows and forwards filter and pagination values', async () => {
  const original = fetch;
  const calls: URLSearchParams[] = [];
  globalThis.fetch = async (input) => {
    const query = new URL(String(input), 'https://portal.example').searchParams;
    calls.push(query);
    return Response.json({
      success: true,
      data: [
        {
          id: 1,
          action: 'contents.updated',
          created_at: '2026-10-19T10:00:00Z',
          user_id: 3,
          subject_id: 4,
          changes: { title: 'عنوان واقعی' },
        },
      ],
      meta: { current_page: Number(query.get('page')), last_page: 2, total: 45, per_page: 30 },
    });
  };
  const screen = await mount(React.createElement(AuditLog, { preview: false }));
  try {
    assert.match(screen.element.textContent!, /contents.updated/);
    screen.element.querySelector<HTMLInputElement>('input[name="action"]')!.value =
      'contents.updated';
    await act(async () => {
      screen.element
        .querySelector('form')!
        .dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
      await flush();
    });
    assert.equal(calls.at(-1)?.get('action'), 'contents.updated');
    const next = Array.from(screen.element.querySelectorAll('button')).find(
      (button) => button.textContent === 'صفحهٔ بعد',
    )!;
    await act(async () => {
      next.click();
      await flush();
    });
    assert.equal(calls.at(-1)?.get('page'), '2');
    assert.equal(calls.at(-1)?.get('action'), 'contents.updated');
  } finally {
    await screen.dispose();
    globalThis.fetch = original;
  }
});

test('the dashboard shows named modules within the users permissions and includes the governor editor for a full administrator', async () => {
  const original = fetch;
  for (const permissions of [['members.manage'], ['*']]) {
    globalThis.fetch = async () =>
      Response.json({
        success: true,
        data: { permissions, users: 1, members: 2, contents_by_type: {} },
      });
    const screen = await mount(React.createElement(AdminDashboard, { preview: false }));
    try {
      assert.ok(screen.element.querySelector('a[href="/panel/admin/governors"]'));
      assert.equal(
        Boolean(screen.element.querySelector('a[href="/panel/admin/settings"]')),
        permissions.includes('*'),
      );
      assert.equal(
        Boolean(screen.element.querySelector('a[href="/panel/admin/internal-users"]')),
        permissions.includes('*'),
      );
    } finally {
      await screen.dispose();
    }
  }
  globalThis.fetch = original;
});

test('the dashboard contains every module in a named section and every add shortcut has an editor page', async () => {
  const original = fetch;
  globalThis.fetch = async () =>
    Response.json({ success: true, data: { permissions: ['*'], users: 1, members: 1 } });
  const screen = await mount(React.createElement(AdminDashboard, { preview: false }));
  try {
    assert.equal(
      screen.element.querySelectorAll('.portal-module-card').length,
      adminModules.filter((module) => module.showInNavigation).length,
    );
    assert.equal(
      screen.element.querySelectorAll('.portal-dashboard-section').length,
      adminSections.length,
    );
    for (const module of adminModules.filter((module) => module.showInNavigation))
      assert.ok(
        screen.element.querySelector(`.portal-module-card a[href="${module.path}"]`),
        module.path,
      );
    for (const link of screen.element.querySelectorAll<HTMLAnchorElement>('.portal-module-create'))
      assert.ok(resolveAdminEditor(new URL(link.href).pathname));
    const group = screen.element.querySelector<HTMLSelectElement>(
      '.portal-dashboard-filters select',
    )!;
    await act(async () => {
      group.value = 'forms';
      group.dispatchEvent(new window.Event('change', { bubbles: true }));
    });
    assert.equal(
      screen.element.querySelectorAll('.portal-module-card').length,
      adminModules.filter((module) => module.showInNavigation && module.section === 'forms').length,
    );
    assert.ok(screen.element.querySelector('a[href="/panel/admin/forms"]'));
    assert.equal(
      screen.element.querySelector('.portal-module-card a[href="/panel/admin/news"]'),
      null,
    );
  } finally {
    await screen.dispose();
    globalThis.fetch = original;
  }
});

test('the shared sidebar exposes all modules and updates to the authenticated users permissions', async () => {
  const screen = await mount(React.createElement(AdminModuleMenu));
  try {
    for (const module of adminModules.filter((module) => module.showInNavigation))
      assert.ok(screen.element.querySelector(`a[href="${module.path}"]`), module.path);
    await act(async () =>
      document.dispatchEvent(
        new window.CustomEvent('portal:admin-user', {
          detail: { role: { permissions: ['members.manage'] } },
        }),
      ),
    );
    assert.ok(screen.element.querySelector('a[href="/panel/admin/governors"]'));
    assert.equal(screen.element.querySelector('a[href="/panel/admin/internal-users"]'), null);
    assert.equal(screen.element.querySelector('a[href="/panel/admin/news"]'), null);
  } finally {
    await screen.dispose();
  }
});
