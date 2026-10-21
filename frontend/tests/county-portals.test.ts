import test from 'node:test';
import assert from 'node:assert/strict';
import React, { act } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { JSDOM, VirtualConsole } from 'jsdom';
import { counties } from '../src/data/counties';
import { adminModules } from '../src/data/admin/modules';
import {
  countyAdminRoute,
  workspaceCanCreate,
  workspaceModuleAllowed,
} from '../src/lib/admin-workspace';
import { knownRoute } from '../src/lib/routes';
import { AdminWorkspaceProvider } from '../src/components/admin/workspace-provider';
import { AdminDashboard } from '../src/components/admin/dashboard';
import { AdminModuleMenu } from '../src/components/admin/module-menu';
import { CountyDashboard } from '../src/components/admin/county/dashboard';
import { CountyLogin } from '../src/components/admin/county/login';
import { ReportDetail } from '../src/components/admin/reports/report-detail';
import { AdminResourcePage } from '../src/components/admin/resource-page';
import { AdminEditorPage } from '../src/components/admin/editor-page';
import { adminResourcePage, resolveAdminEditor } from '../src/lib/admin-routes';
import { fillFields } from '../src/features/admin/fields';
import { mountPortal } from '../src/lib/alpine/runtime';
import type { PortalUser } from '../src/types/portal';
import type { CitizenReport } from '../src/features/admin/reports';

const window = new JSDOM('', {
  url: 'https://portal.example/county-admin/amol/login',
  pretendToBeVisual: true,
  virtualConsole: new VirtualConsole(),
}).window;
for (const name of [
  'window',
  'document',
  'Element',
  'Node',
  'HTMLElement',
  'HTMLInputElement',
  'HTMLSelectElement',
  'HTMLTextAreaElement',
  'HTMLFormElement',
  'HTMLButtonElement',
  'Option',
  'FormData',
  'CustomEvent',
  'MutationObserver',
  'ShadowRoot',
  'AbortController',
  'AbortSignal',
  'localStorage',
] as const)
  Object.defineProperty(globalThis, name, {
    value: name === 'window' ? window : window[name],
    configurable: true,
  });
Object.defineProperty(globalThis, 'IS_REACT_ACT_ENVIRONMENT', { value: true, configurable: true });
const originalFetch = globalThis.fetch;
const json = (data: unknown, status = 200) =>
  Response.json({ success: status < 400, data }, { status });
const countyUser: PortalUser = {
  id: 21,
  name: 'روابط عمومی آمل',
  person_type: 'staff',
  role: {
    name: 'county_public_relations',
    permissions: [
      'dashboard.view',
      'content.manage',
      'media.manage',
      'members.manage',
      'navigation.manage',
      'categories.manage',
      'organizations.manage',
      'tickets.manage',
      'forms.manage',
      'services.manage',
      'polls.manage',
      'comments.manage',
      'forum.manage',
      'audit.view',
    ],
  },
  portal_context: {
    type: 'county',
    organization_id: 41,
    organization_name: 'فرمانداری آمل',
    county: { id: 7, name: 'آمل', slug: 'amol' },
    can_write: true,
    is_global: false,
    dashboard_path: '/county-admin/amol',
    login_path: '/county-admin/amol/login',
    public_path: '/office?name=amol',
  },
};
const provinceUser: PortalUser = {
  ...countyUser,
  name: 'روابط عمومی استانداری',
  role: { ...countyUser.role!, name: 'province_public_relations' },
  portal_context: {
    ...countyUser.portal_context!,
    type: 'province',
    organization_id: 1,
    organization_name: 'استانداری مازندران',
    county: null,
    can_write: false,
    dashboard_path: '/panel/admin',
    login_path: '/panel/admin/login',
    public_path: '/',
  },
};
const stats = () => ({
  workspace: countyUser.portal_context,
  permissions: countyUser.role!.permissions,
  contents_by_type: { news: 12 },
  contents_by_status: { draft: 2, published: 10 },
  tickets_by_status: { pending: 3, resolved: 2 },
  overdue_tickets: 1,
  recent_contents: [
    {
      id: 17,
      type: 'news',
      title: 'خبر فرمانداری آمل',
      status: 'draft',
      updated_at: '2026-10-21T10:00:00Z',
    },
  ],
  recent_reports: [{ reference: 'RPT-AMOL-17', subject: 'گزارش پسماند آمل', status: 'pending' }],
  daily_activity: [{ date: '2026-10-21', contents: 2, tickets: 1 }],
});
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
const withUser = (user: PortalUser, child: React.ReactElement) =>
  React.createElement(AdminWorkspaceProvider, { user, children: child });
async function until(check: () => boolean) {
  for (let i = 0; i < 300; i++) {
    if (check()) return;
    await new Promise((resolve) => setTimeout(resolve, 5));
  }
  assert.ok(check(), 'The actual UI must finish its operation');
}

test('all 22 counties have known independent login and dashboard routes, while unknown and nested workspaces are rejected', () => {
  assert.equal(counties.length, 22);
  for (const county of counties)
    for (const suffix of ['', '/login']) {
      const path = '/county-admin/' + county.slug + suffix;
      assert.equal(countyAdminRoute(path)?.county.slug, county.slug);
      assert.ok(knownRoute(path));
    }
  assert.equal(countyAdminRoute('/county-admin/noor/login')?.dashboard, '/county-admin/nur');
  for (const path of [
    '/county-admin/unknown',
    '/county-admin/amol/news',
    '/county-admin/amol/login/extra',
    '/county-admin/..',
    '/county-admin/%2f',
  ])
    assert.equal(countyAdminRoute(path), undefined);
});

test('county tools exclude global administration and organizational creation while central admin retains its tools', () => {
  const central: PortalUser = {
    ...countyUser,
    role: { name: 'super_admin', permissions: ['*'] },
    portal_context: {
      ...countyUser.portal_context!,
      type: 'central',
      county: null,
      is_global: true,
    },
  };
  for (const path of [
    '/panel/admin/governors',
    '/panel/admin/settings',
    '/panel/admin/counties',
    '/panel/admin/roles',
    '/panel/admin/internal-users',
    '/panel/admin/external-users',
    '/panel/admin/subscribers',
  ]) {
    const module = adminModules.find((module) => module.path === path)!;
    assert.equal(workspaceModuleAllowed(module, countyUser), false);
    assert.ok(workspaceModuleAllowed(module, central));
  }
  for (const path of [
    '/panel/admin/news',
    '/panel/admin/county-governors',
    '/panel/admin/reports',
    '/panel/admin/forms',
  ])
    assert.ok(
      workspaceModuleAllowed(
        adminModules.find((module) => module.path === path)!,
        countyUser,
      ),
    );
  assert.equal(
    workspaceCanCreate(
      adminModules.find((module) => module.path === '/panel/admin/organizations')!,
      countyUser,
    ),
    false,
  );
  assert.ok(adminModules.every((module) => !workspaceCanCreate(module, provinceUser)));
});

test('SSR provincial PR dashboard has no create controls and county navigation identifies its own workspace', () => {
  const root = document.createElement('div');
  root.innerHTML = renderToStaticMarkup(
    withUser(provinceUser, React.createElement(AdminDashboard, { preview: true })),
  );
  assert.match(root.textContent!, /فقط امکان مشاهده/);
  assert.equal(root.querySelectorAll('.portal-module-create').length, 0);
  root.innerHTML = renderToStaticMarkup(withUser(countyUser, React.createElement(AdminModuleMenu)));
  assert.equal(root.querySelector('.portal-menu-home')?.getAttribute('href'), '/county-admin/amol');
  assert.match(root.textContent!, /فرماندار شهرستان/);
  assert.equal(root.querySelector('a[href="/panel/admin/governors"]'), null);
});

test('county dashboard renders actual scoped statistics, content editors and report links without global tools', async () => {
  const requests: string[] = [];
  globalThis.fetch = async (input) => {
    requests.push(String(input));
    return json(stats());
  };
  const screen = await mount(React.createElement(CountyDashboard, { user: countyUser }));
  try {
    assert.deepEqual(requests, ['/api/backend/admin/dashboard']);
    assert.match(screen.element.textContent!, /خبر فرمانداری آمل/);
    assert.equal(screen.element.querySelector('.county-metrics strong')?.textContent, '۱۲');
    assert.equal(
      screen.element.querySelector('.county-inbox-item')?.getAttribute('href'),
      '/panel/admin/reports/RPT-AMOL-17/edit',
    );
    assert.ok(screen.element.querySelector('a[href^="/panel/admin/news/17/edit"]'));
    assert.ok(screen.element.querySelector('a[href="/office?name=amol"]'));
    assert.equal(screen.element.querySelector('a[href="/panel/admin/settings"]'), null);
    assert.equal(screen.element.querySelector('a[href^="/panel/admin/organizations/new"]'), null);
    for (const link of screen.element.querySelectorAll<HTMLAnchorElement>('a[href]'))
      assert.ok(knownRoute(link.getAttribute('href')!), link.href);
  } finally {
    await screen.dispose();
    globalThis.fetch = originalFetch;
  }
});

test('county dashboard refuses a mismatched response and retries without displaying other county records', async () => {
  let attempt = 0;
  globalThis.fetch = async () => {
    attempt++;
    return json(
      attempt === 1
        ? {
            ...stats(),
            workspace: {
              ...countyUser.portal_context,
              organization_id: 99,
              county: { slug: 'nur' },
            },
            recent_contents: [{ id: 99, title: 'FOREIGN SECRET' }],
          }
        : stats(),
    );
  };
  const screen = await mount(React.createElement(CountyDashboard, { user: countyUser }));
  try {
    assert.match(screen.element.querySelector('[role="alert"]')?.textContent!, /یکسان نیست/);
    assert.ok(!screen.element.textContent!.includes('FOREIGN SECRET'));
    assert.equal(screen.element.querySelector('.county-metrics strong')?.textContent, '—');
    await act(async () => {
      screen.element.querySelector<HTMLButtonElement>('[role="alert"] button')!.click();
      await flush();
    });
    assert.equal(attempt, 2);
    assert.equal(screen.element.querySelector('[role="alert"]'), null);
    assert.match(screen.element.textContent!, /خبر فرمانداری آمل/);
  } finally {
    await screen.dispose();
    globalThis.fetch = originalFetch;
  }
});

test('county login sends its county through the same-origin session endpoint and displays invalid credential errors', async () => {
  const bodies: unknown[] = [];
  globalThis.fetch = async (input, init) => {
    assert.equal(String(input), '/api/backend/auth/login');
    assert.equal(init?.credentials, 'same-origin');
    bodies.push(JSON.parse(String(init?.body)));
    return Response.json(
      { success: false, message: 'نام کاربری یا رمز عبور صحیح نیست.' },
      { status: 422 },
    );
  };
  const screen = await mount(React.createElement(CountyLogin, { slug: 'amol', name: 'آمل' }));
  try {
    screen.element.querySelector<HTMLInputElement>('[name="login"]')!.value = ' amol_pr ';
    screen.element.querySelector<HTMLInputElement>('[name="password"]')!.value =
      'Fixture-Password42!';
    await act(async () => {
      screen.element
        .querySelector('form')!
        .dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
      await flush();
    });
    assert.deepEqual(bodies, [
      { login: 'amol_pr', password: 'Fixture-Password42!', audience: 'staff', county_slug: 'amol' },
    ]);
    assert.match(screen.element.querySelector('[role="alert"]')?.textContent!, /صحیح نیست/);
    assert.equal(screen.element.querySelector('fieldset')?.disabled, false);
  } finally {
    await screen.dispose();
    globalThis.fetch = originalFetch;
  }
});

test('county login suppresses duplicate submits and rejects a success response belonging to another county', async () => {
  let calls = 0;
  let complete!: (response: Response) => void;
  globalThis.fetch = async () => {
    calls++;
    return new Promise<Response>((resolve) => {
      complete = resolve;
    });
  };
  const screen = await mount(React.createElement(CountyLogin, { slug: 'amol', name: 'آمل' }));
  try {
    screen.element.querySelector<HTMLInputElement>('[name="login"]')!.value = 'fixture';
    screen.element.querySelector<HTMLInputElement>('[name="password"]')!.value =
      'Fixture-Password42!';
    await act(async () => {
      const form = screen.element.querySelector('form')!;
      form.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
      form.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
      await flush();
    });
    assert.equal(calls, 1);
    assert.equal(screen.element.querySelector('fieldset')?.disabled, true);
    await act(async () => {
      complete(
        json({
          user: {
            ...countyUser,
            portal_context: { ...countyUser.portal_context!, county: { slug: 'nur' } },
          },
        }),
      );
      await flush();
    });
    assert.match(screen.element.querySelector('[role="alert"]')?.textContent!, /تعلق ندارد/);
  } finally {
    await screen.dispose();
    globalThis.fetch = originalFetch;
  }
});

test('provincial PR can read report details but cannot submit a status change or reply through a synthetic submit', async () => {
  const writes: string[] = [];
  const record: CitizenReport = {
    id: 17,
    reference: 'RPT-17',
    subject: 'گزارش استان',
    body: 'متن گزارش',
    type: 'report',
    category: 'waste',
    status: 'pending',
    urgency: 'medium',
    organization_id: 1,
    assigned_to: null,
    owner: { id: 2, name: 'شهروند' },
    organization: { id: 1, name: 'استانداری' },
    county: null,
    assignee: null,
    due_at: null,
    created_at: '2026-10-21T09:00:00Z',
    updated_at: '2026-10-21T09:00:00Z',
    messages: [],
    events: [],
  };
  globalThis.fetch = async (_input, init) => {
    if (init?.method && init.method !== 'GET') writes.push(init.method);
    return json(record);
  };
  const screen = await mount(
    withUser(
      provinceUser,
      React.createElement(ReportDetail, {
        reference: 'RPT-17',
        options: { organizations: [record.organization!], counties: [], assignees: [] },
        onClose: () => {},
        onChanged: () => {},
        onBusy: () => {},
      }),
    ),
  );
  try {
    assert.match(screen.element.textContent!, /متن گزارش/);
    assert.ok(
      Array.from(screen.element.querySelectorAll('fieldset')).every((field) => field.disabled),
    );
    await act(async () => {
      for (const form of screen.element.querySelectorAll('form'))
        form.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
      await flush();
    });
    assert.deepEqual(writes, []);
  } finally {
    await screen.dispose();
    globalThis.fetch = originalFetch;
  }
});

test('actual Alpine list removes provincial PR mutations and rejects a forged delete action', async () => {
  const writes: string[] = [];
  globalThis.fetch = async (input, init) => {
    if (init?.method && init.method !== 'GET') writes.push(init.method);
    if (String(input).endsWith('auth/me')) return json(provinceUser);
    return json([
      { id: 17, title: 'خبر استانداری', body: 'خبر', status: 'published', is_active: true },
    ]);
  };
  const page = adminResourcePage('/panel/admin/news')!;
  const container = document.createElement('div');
  container.innerHTML = renderToStaticMarkup(
    withUser(provinceUser, React.createElement(AdminResourcePage, { path: page.path })),
  );
  const root = container.querySelector<HTMLElement>('[data-design]')!;
  document.body.replaceChildren(root);
  const cleanup = mountPortal(root, { page, path: page.path, preview: false });
  try {
    await until(() => root.dataset.ready === 'true');
    assert.equal(root.dataset.canWrite, 'false');
    assert.match(root.querySelector('.portal-workspace-bar')?.textContent!, /فقط مشاهده/);
    assert.equal(root.querySelector('#cbnOpenCreateMenuModalBtn'), null);
    assert.equal(root.querySelector('tbody [data-command="deleteRecord"]'), null);
    const forged = document.createElement('button');
    forged.dataset.command = 'deleteRecord';
    root.querySelector('tbody tr[data-record="17"]')!.append(forged);
    forged.click();
    await flush();
    assert.deepEqual(writes, []);
    assert.match(root.textContent!, /فقط امکان مشاهده/);
  } finally {
    cleanup();
    root.remove();
    globalThis.fetch = originalFetch;
  }
});

test('actual county CMS editor pins new content to the authenticated organization and keeps the separate editor flow', async () => {
  const writes: Record<string, unknown>[] = [];
  const navigations: string[] = [];
  globalThis.fetch = async (input, init) => {
    if (String(input).endsWith('auth/me')) return json(countyUser);
    if (init?.method === 'POST') {
      const data = JSON.parse(String(init.body));
      writes.push(data);
      return json({ id: 17, ...data }, 201);
    }
    return json([{ id: 41, name: 'فرمانداری آمل' }]);
  };
  const path = '/panel/admin/faqs/new';
  const route = resolveAdminEditor(path)!;
  const page = {
    ...route.page,
    id: 'AdminRecordEditor',
    editor: { mode: route.mode, returnTo: route.page.path },
  };
  const container = document.createElement('div');
  container.innerHTML = renderToStaticMarkup(
    withUser(countyUser, React.createElement(AdminEditorPage, { path, route })),
  );
  const root = container.querySelector<HTMLElement>('[data-design]')!;
  document.body.replaceChildren(root);
  const cleanup = mountPortal(root, {
    page,
    path,
    preview: false,
    navigate: (href) => navigations.push(href),
  });
  try {
    await until(() => root.dataset.ready === 'true');
    root
      .querySelector<HTMLSelectElement>('[data-field="organization_id"]')!
      .append(new Option('Forged county', '99'));
    fillFields(root, {
      question: 'پرسش فرمانداری',
      answer: '<p>پاسخ فرمانداری</p>',
      organization_id: 99,
    });
    root.querySelector<HTMLButtonElement>('[data-editor-save]')!.click();
    await until(() => navigations.length > 0);
    assert.equal(writes.length, 1);
    assert.equal(writes[0].organization_id, 41);
    assert.equal(writes[0].question, 'پرسش فرمانداری');
    assert.match(navigations[0], /^\/panel\/admin\/faqs\?saved=create$/);
    assert.equal(
      root.querySelector('.portal-workspace-bar a')?.getAttribute('href'),
      '/county-admin/amol',
    );
  } finally {
    cleanup();
    root.remove();
    globalThis.fetch = originalFetch;
  }
});
