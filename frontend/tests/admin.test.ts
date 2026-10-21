import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { JSDOM } from 'jsdom';
import { templates } from '../src/lib/templates';
import { templateViews } from '../src/views';
import { adminController } from '../src/features/admin/controller';
import { collectFields, fillFields } from '../src/features/admin/fields';
import { AdminResourceForm } from '../src/components/admin/resource-form';
import schemas from '../src/data/admin/resource-schema.json';
import { adminExtraPages } from '../src/data/admin/extra-pages';
import { AdminEditorPage } from '../src/components/admin/editor-page';
import { adminModules } from '../src/data/admin/modules';
import { adminResourcePage, resolveAdminEditor } from '../src/lib/admin-routes';
import { AdminResourcePage } from '../src/components/admin/resource-page';

const window = new JSDOM('', { url: 'http://localhost:3000', pretendToBeVisual: true }).window;
for (const name of [
  'window',
  'document',
  'HTMLElement',
  'HTMLInputElement',
  'HTMLSelectElement',
  'HTMLTextAreaElement',
  'Option',
  'AbortController',
  'AbortSignal',
  'localStorage',
] as const) {
  Object.defineProperty(globalThis, name, {
    value: name === 'window' ? window : window[name],
    configurable: true,
  });
}

type Row = Record<string, unknown>;
type Call = { path: string; method: string; body?: Row; form?: FormData; query: URLSearchParams };
const sourceFetch = globalThis.fetch;
const schema = schemas as Record<string, { scope: Row }>;
const roles = [{ id: 31, name: 'editor', label: 'ویرایشگر', permissions: ['content.manage'] }];
const sample: Row = {
  id: 17,
  name: 'نام آزمایشی',
  title: 'عنوان آزمایشی',
  question: 'پرسش آزمایشی',
  answer: 'پاسخ آزمایشی',
  body: 'متن کامل آزمایشی',
  text: 'سخن آزمایشی',
  author: 'گویندهٔ آزمایشی',
  description: 'شرح آزمایشی',
  position: 'سمت آزمایشی',
  key: 'test-menu',
  url: 'https://example.test',
  label: 'نقش آزمایشی',
  username: 'test-editor',
  email: 'test@example.test',
  password: 'Local-Test-Password42!',
  locale: 'fa',
  priority: 0,
  is_active: true,
  role_id: 31,
  organization_id: 41,
  menu_id: 51,
  gallery_id: 61,
  poll_id: 71,
  media_id: 81,
  fields: [{ key: 'name', label: 'نام', type: 'text', required: true }],
};

function mount(
  path: string,
  initial?: Row[],
  handler?: (call: Call) => Response | Promise<Response> | undefined,
) {
  const page = templates.find((page) => page.path === path) ?? {
    ...templates.find((page) => page.path === '/admin/calls')!,
    ...adminExtraPages[path],
    path,
  };
  const root = window.document.createElement('div');
  root.innerHTML = renderToStaticMarkup(
    adminExtraPages[path]
      ? React.createElement(AdminResourcePage, { path })
      : React.createElement(templateViews[page.id as keyof typeof templateViews]),
  );
  window.document.body.replaceChildren(root);
  const calls: Call[] = [];
  let rows = initial ?? [{ ...sample, ...schema[page.resource]?.scope, ...page.defaults }];
  const endpoint = page.resource === 'media' ? 'media' : 'admin/' + page.resource;
  const json = (data: unknown, status = 200, meta?: unknown) =>
    Response.json({ success: true, data, ...(meta ? { meta } : {}) }, { status });
  globalThis.fetch = async (input, init) => {
    const url = new URL(String(input), 'http://localhost:3000');
    const path = url.pathname.replace('/api/backend/', '');
    const method = init?.method ?? 'GET';
    const body = typeof init?.body === 'string' ? (JSON.parse(init.body) as Row) : undefined;
    const call = {
      path,
      method,
      body,
      form: init?.body instanceof FormData ? init.body : undefined,
      query: url.searchParams,
    };
    calls.push(call);
    const overridden = handler?.(call);
    if (overridden) return overridden;
    if (path === 'auth/me') return json({ name: 'مدیر آزمایشی' });
    if (path === 'admin/roles' && method === 'GET')
      return json({ permissions: ['content.manage'], roles });
    if (path === endpoint && method === 'GET') return json(rows);
    if (path === endpoint + '/' + (rows[0]?.reference ?? rows[0]?.id) && method === 'GET')
      return json(rows[0]);
    if (path === endpoint && method === 'POST') {
      rows = [{ ...body, id: 17 }];
      return json(rows[0], 201);
    }
    if (path === endpoint + '/17' && method === 'PATCH') {
      rows[0] = { ...rows[0], ...body };
      return json(rows[0]);
    }
    if (path === endpoint + '/17' && method === 'DELETE') {
      rows = [];
      return new Response(null, { status: 204 });
    }
    if (method === 'GET' && path.startsWith('admin/')) {
      const resource = path.slice(6);
      if (resource.includes('_'))
        return Response.json({ message: 'مسیر پیدا نشد.' }, { status: 404 });
      const ids: Record<string, number> = {
        organizations: 41,
        menus: 51,
        galleries: 61,
        polls: 71,
      };
      return json([{ id: ids[resource] ?? 91, name: 'گزینهٔ آزمایشی', title: 'گزینهٔ آزمایشی' }]);
    }
    if (path === 'media' && method === 'GET') return json([{ id: 81, original_name: 'image.jpg' }]);
    return json(null);
  };
  let abort = new AbortController();
  let controller = adminController({ page, root, preview: false, signal: abort.signal, path });
  controller.init();
  function stage(id?: string | number, list = false) {
    abort.abort();
    abort = new AbortController();
    const pathForView = list ? path : path + (id === undefined ? '/new' : '/' + id + '/edit');
    const route = list ? undefined : resolveAdminEditor(pathForView)!;
    const next = list
      ? adminResourcePage(path)!
      : {
          ...route!.page,
          id: 'AdminRecordEditor',
          editor: { mode: route!.mode, id: route!.id, returnTo: path },
        };
    root.innerHTML = renderToStaticMarkup(
      list
        ? React.createElement(AdminResourcePage, { path })
        : React.createElement(AdminEditorPage, { path: pathForView, route: route! }),
    );
    root.dataset.adminView = list ? 'list' : 'editor';
    window.history.replaceState({}, '', pathForView);
    controller = adminController({
      page: next,
      root,
      preview: false,
      signal: abort.signal,
      path: pathForView,
      navigate: () => {},
    });
    controller.init();
  }
  return {
    page,
    root,
    calls,
    get controller() {
      return controller;
    },
    openEditor(id?: string | number) {
      stage(id);
    },
    openList() {
      stage(undefined, true);
    },
    async ready() {
      for (let i = 0; i < 15; i++) await new Promise((resolve) => setImmediate(resolve));
    },
    dispose() {
      abort.abort();
      globalThis.fetch = sourceFetch;
      root.remove();
    },
  };
}

test('roles returned in Laravel data.roles render and populate user role choices', async () => {
  const screen = mount('/admin/roles');
  try {
    await screen.ready();
    assert.equal(screen.root.querySelectorAll('tbody tr[data-record]').length, 1);
    assert.match(screen.root.querySelector('tbody')?.textContent ?? '', /ویرایشگر/);
  } finally {
    screen.dispose();
  }
  const users = mount('/admin/internal-users');
  try {
    await users.ready();
    assert.ok(users.root.querySelector('select[data-field="role_id"] option[value="31"]'));
  } finally {
    users.dispose();
  }
});

test('a submenu parent uses menu-items rather than the MySQL menu_items table as its API path', async () => {
  const screen = mount('/admin/menu-items');
  try {
    await screen.ready();
    assert.equal(
      screen.calls.some((call) => call.path === 'admin/menu_items'),
      false,
    );
    assert.ok(screen.root.querySelector('select[data-field="parent_id"] option[value="17"]'));
  } finally {
    screen.dispose();
  }
});

for (const [path, kind] of [
  ['/admin/calls', 'call'],
  ['/admin/publications', 'publication'],
] as const) {
  test(path + ' creates the correct scoped content type without choosing news', async () => {
    const screen = mount(path);
    try {
      await screen.ready();
      (screen.root.querySelector('#cbnOpenCreateMenuModalBtn') as HTMLElement).click();
      const modal = screen.root.querySelector<HTMLElement>('#cbnCreateMenuModalOverlay')!;
      assert.equal((modal.querySelector('[data-field="type"]') as HTMLSelectElement).value, kind);
      for (const key of ['title', 'body'])
        (modal.querySelector('[data-field="' + key + '"]') as HTMLInputElement).value = String(
          sample[key],
        );
      await screen.controller.dispatch('saveRecord', modal);
      assert.equal(screen.calls.find((call) => call.method === 'POST')?.body?.type, kind);
    } finally {
      screen.dispose();
    }
  });
}

test('employee and expert types can be edited, and the user scope choices match the backend', () => {
  const root = document.createElement('div');
  root.innerHTML = renderToStaticMarkup(
    React.createElement(AdminResourceForm, { resource: 'users' }),
  );
  for (const type of ['employee', 'expert']) {
    fillFields(root, { person_type: type });
    assert.equal(collectFields(root).person_type, type);
  }
  assert.equal(root.querySelector('[data-field="access_scope"] option[value="subtree"]'), null);
  assert.equal(
    (root.querySelector('[data-field="access_scope"]') as HTMLSelectElement).value,
    'organization',
  );
});

test('creating a staff user accepts the real roles response and does not stop at roles.find', async () => {
  const screen = mount('/admin/internal-users', []);
  try {
    await screen.ready();
    (screen.root.querySelector('#cbnOpenCreateMenuModalBtn') as HTMLElement).click();
    const modal = screen.root.querySelector<HTMLElement>('#cbnCreateMenuModalOverlay')!;
    fillFields(modal, { ...sample, person_type: 'staff', access_scope: 'organization' });
    await screen.controller.dispatch('saveRecord', modal);
    assert.equal(screen.calls.find((call) => call.method === 'POST')?.body?.role_id, 31);
    assert.equal(modal.querySelector('[data-form-error]'), null);
  } finally {
    screen.dispose();
  }
});

test('a failed active-status update restores the displayed checkbox and reports the error', async () => {
  const screen = mount('/admin/internal-users', undefined, (call) =>
    call.method === 'PATCH' ? Response.json({ message: 'ذخیره نشد.' }, { status: 409 }) : undefined,
  );
  try {
    await screen.ready();
    const input = screen.root.querySelector<HTMLInputElement>('tbody input[type="checkbox"]')!;
    assert.equal(input.checked, false);
    input.checked = true;
    input.dispatchEvent(new window.Event('change', { bubbles: true }));
    await screen.ready();
    assert.equal(input.checked, false);
    assert.match(screen.root.textContent ?? '', /ذخیره نشد/);
  } finally {
    screen.dispose();
  }
});

test('poll and quote lists display their actual fields, not empty title/body columns', async () => {
  for (const [path, expected] of [
    ['/admin/polls', 'پرسش آزمایشی'],
    ['/admin/quotes', 'سخن آزمایشی'],
  ] as const) {
    const screen = mount(path, [
      {
        id: 17,
        question: sample.question,
        text: sample.text,
        author: sample.author,
        status: 'draft',
      },
    ]);
    try {
      await screen.ready();
      assert.match(screen.root.querySelector('tbody')?.textContent ?? '', new RegExp(expected));
    } finally {
      screen.dispose();
    }
  }
});

test('lookups include records on subsequent API pages', async () => {
  const screen = mount('/admin/menu-items', [], (call) =>
    call.path === 'admin/menus'
      ? Response.json({
          success: true,
          data: [{ id: call.query.get('page') === '2' ? 52 : 51, name: 'منو' }],
          meta: {
            current_page: call.query.get('page') === '2' ? 2 : 1,
            last_page: 2,
            per_page: 100,
            total: 101,
          },
        })
      : undefined,
  );
  try {
    await screen.ready();
    assert.ok(screen.root.querySelector('[data-field="menu_id"] option[value="52"]'));
  } finally {
    screen.dispose();
  }
});

test('saving an empty required field performs no write and leaves the modal open for correction', async () => {
  const screen = mount('/admin/faqs');
  try {
    await screen.ready();
    (screen.root.querySelector('#cbnOpenCreateMenuModalBtn') as HTMLElement).click();
    const modal = screen.root.querySelector<HTMLElement>('#cbnCreateMenuModalOverlay')!;
    await screen.controller.dispatch('saveRecord', modal);
    assert.equal(
      screen.calls.some((call) => call.method !== 'GET'),
      false,
    );
  } finally {
    screen.dispose();
  }
});

for (const page of [
  ...templates.filter(
    (page) =>
      page.controller === 'admin' &&
      schema[page.resource] &&
      adminModules.find((module) => module.path === page.path)?.canCreate,
  ),
  ...Object.entries(adminExtraPages)
    .filter(
      ([path, config]) =>
        schema[config.resource] && adminModules.find((module) => module.path === path)?.canCreate,
    )
    .map(([path, config]) => ({ ...config, path })),
]) {
  test(
    page.path + ' creates, reloads, edits and deletes through its actual form and controller',
    async () => {
      const screen = mount(page.path, []);
      const confirm = window.confirm;
      window.confirm = () => true;
      try {
        await screen.ready();
        screen.openEditor();
        await screen.ready();
        let modal = screen.root.querySelector<HTMLElement>('[data-admin-record-editor]')!;
        assert.ok(modal, 'the administration page needs a working editor');
        fillFields(modal, {
          ...sample,
          type: page.resource === 'organizations' ? 'department' : 'news',
          status: 'draft',
          ...schema[page.resource].scope,
          ...page.defaults,
        });
        await screen.controller.dispatch('saveRecord', modal);
        const post = screen.calls.find((call) => call.method === 'POST');
        assert.ok(
          post,
          modal.querySelector('[data-form-error]')?.textContent ?? 'form failed to submit',
        );
        screen.openList();
        await screen.ready();
        assert.equal(screen.root.querySelectorAll('tbody tr[data-record]').length, 1);
        screen.openEditor(17);
        await screen.ready();
        modal = screen.root.querySelector<HTMLElement>('[data-admin-record-editor]')!;
        const input = modal.querySelector<HTMLInputElement>(
          '[data-field="name"],[data-field="title"],[data-field="question"],[data-field="text"]',
        )!;
        input.value = 'ویرایش واقعی فرم';
        await screen.controller.dispatch('saveRecord', modal);
        assert.equal(
          screen.calls.find((call) => call.method === 'PATCH')?.body?.[input.dataset.field!],
          input.value,
        );
        screen.openList();
        await screen.ready();
        const remove = screen.root.querySelector<HTMLElement>(
          'tbody [data-command="deleteRecord"]',
        )!;
        assert.ok(remove);
        await screen.controller.dispatch('deleteRecord', remove);
        assert.equal(screen.calls.filter((call) => call.method === 'DELETE').length, 1);
        assert.equal(screen.root.querySelectorAll('tbody tr[data-record]').length, 0);
        assert.match(
          screen.root.querySelector('tbody')?.textContent ?? '',
          /موردی برای نمایش وجود ندارد/,
        );
      } finally {
        window.confirm = confirm;
        screen.dispose();
      }
    },
  );
}

test('an API read failure clears the copied prototype data and reports the problem', async () => {
  const screen = mount('/admin/faqs', undefined, (call) =>
    call.path === 'admin/faqs'
      ? Response.json({ message: 'خطای پایگاه داده' }, { status: 503 })
      : undefined,
  );
  try {
    await screen.ready();
    assert.equal(screen.root.querySelectorAll('tbody tr[data-record]').length, 0);
    assert.match(screen.root.querySelector('tbody')?.textContent ?? '', /دریافت اطلاعات انجام نشد/);
    assert.match(screen.root.textContent ?? '', /خطای پایگاه داده/);
  } finally {
    screen.dispose();
  }
});

test('list pagination reaches the next page and keeps the current search query', async () => {
  const screen = mount('/admin/faqs', [], (call) =>
    call.path === 'admin/faqs' && call.method === 'GET'
      ? Response.json({
          success: true,
          data: [
            { id: call.query.get('page') === '2' ? 18 : 17, question: 'نتیجه', answer: 'پاسخ' },
          ],
          meta: {
            current_page: call.query.get('page') === '2' ? 2 : 1,
            last_page: 2,
            total: 101,
            per_page: 100,
          },
        })
      : undefined,
  );
  try {
    await screen.ready();
    (screen.root.querySelector('#searchInput') as HTMLInputElement).value = 'جستجوی اصلی';
    screen.root
      .querySelector('form.search-box-wrapper')!
      .dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
    await screen.ready();
    (screen.root.querySelector('[data-admin-page="2"]') as HTMLButtonElement).click();
    await screen.ready();
    assert.ok(
      screen.calls.some(
        (call) => call.query.get('page') === '2' && call.query.get('q') === 'جستجوی اصلی',
      ),
    );
    assert.ok(screen.root.querySelector('tr[data-record="18"]'));
  } finally {
    screen.dispose();
  }
});

test('the menu group keeps the link to its own items after real data replaces the template', async () => {
  const screen = mount('/admin/menu-groups');
  try {
    await screen.ready();
    assert.equal(
      screen.root.querySelector('tbody [data-related-resource]')?.getAttribute('href'),
      '/admin/menu-items?menu_id=17',
    );
  } finally {
    screen.dispose();
  }
});

test('media rows show their own image and authenticated download link without an unsupported edit action', async () => {
  for (const path of ['/admin/images', '/admin/files']) {
    const screen = mount(path, [
      { id: 17, original_name: 'sample.jpg', url: 'https://example.test/sample.jpg' },
    ]);
    try {
      await screen.ready();
      assert.equal(screen.root.querySelector('tbody [data-command="editRecord"]'), null);
      if (path.endsWith('images'))
        assert.equal(
          screen.root.querySelector('tbody img')?.getAttribute('src'),
          'https://example.test/sample.jpg',
        );
      else
        assert.equal(
          screen.root.querySelector('tbody a')?.getAttribute('href'),
          '/api/backend/media/17/download',
        );
    } finally {
      screen.dispose();
    }
  }
});

for (const page of [
  ...templates,
  ...Object.entries(adminExtraPages).map(([path, config]) => ({ ...config, path })),
].filter(
  (page) =>
    page.resource === 'tickets' ||
    page.resource === 'submissions' ||
    page.resource.startsWith('moderation/'),
)) {
  test(
    page.path + ' reviews the selected record using its real id or tracking reference',
    async () => {
      const initial = {
        ...sample,
        ...schema[page.resource]?.scope,
        ...page.defaults,
        reference: ['tickets', 'submissions'].includes(page.resource)
          ? 'FIXTURE-TRACKING'
          : undefined,
        status: 'pending',
      };
      const screen = mount(page.path, [initial]);
      try {
        await screen.ready();
        screen.openEditor(initial.reference ?? 17);
        await screen.ready();
        const modal = screen.root.querySelector<HTMLElement>('[data-admin-record-editor]')!;
        fillFields(modal, {
          organization_id: 41,
          status: page.resource.startsWith('moderation/')
            ? 'approved'
            : page.resource === 'submissions'
              ? 'accepted'
              : 'review',
          urgency: 'medium',
          reply: 'پاسخ آزمایشی',
        });
        await screen.controller.dispatch('saveRecord', modal);
        const patch = screen.calls.find((call) => call.method === 'PATCH');
        assert.equal(patch?.path, 'admin/' + page.resource + '/' + (initial.reference ?? 17));
        if (page.resource === 'tickets') {
          assert.equal(patch?.body?.reply, 'پاسخ آزمایشی');
          assert.equal(
            screen.calls.filter((call) => call.method !== 'GET').length,
            1,
            'reply and status are submitted together',
          );
        }
        assert.equal(
          screen.calls.some(
            (call) =>
              call.method === 'GET' &&
              call.path.includes('/moderation/') &&
              call.path.endsWith('/17'),
          ),
          page.resource.startsWith('moderation/'),
        );
      } finally {
        screen.dispose();
      }
    },
  );
}

test('settings submit one PUT containing the edited settings rather than POSTing a resource', async () => {
  const screen = mount('/admin/item-order', [
    { id: 17, key: 'site.name', value: 'نام فعلی', is_public: true },
  ]);
  try {
    await screen.ready();
    (screen.root.querySelector('#cbnOpenCreateMenuModalBtn') as HTMLElement).click();
    const modal = screen.root.querySelector<HTMLElement>('#cbnCreateMenuModalOverlay')!;
    fillFields(modal, { settings: [{ key: 'site.name', value: 'نام تازه', is_public: true }] });
    await screen.controller.dispatch('saveRecord', modal);
    assert.deepEqual(screen.calls.find((call) => call.method === 'PUT')?.body?.settings, [
      { key: 'site.name', value: 'نام تازه', is_public: true },
    ]);
    assert.equal(
      screen.calls.some((call) => call.method === 'POST'),
      false,
    );
  } finally {
    screen.dispose();
  }
});

test('newsletter subscriber review updates the existing subscription without creating an account', async () => {
  const screen = mount('/admin/subscribers');
  try {
    await screen.ready();
    const edit = screen.root.querySelector<HTMLElement>(
      'tbody [data-command="editRecord"],tbody [data-command="openEditCommitmentModal"]',
    )!;
    await screen.controller.dispatch(edit.dataset.command!, edit);
    const modal = screen.root.querySelector<HTMLElement>('#cbnCreateMenuModalOverlay')!;
    fillFields(modal, { is_active: false });
    await screen.controller.dispatch('saveRecord', modal);
    assert.equal(screen.calls.find((call) => call.method === 'PATCH')?.body?.is_active, false);
    assert.equal(
      screen.calls.some((call) => call.method === 'POST'),
      false,
    );
  } finally {
    screen.dispose();
  }
});

test('a content cover uploads as public media and its returned id is saved with the content', async () => {
  const screen = mount('/admin/news', [], (call) =>
    call.path === 'media' && call.method === 'POST'
      ? Response.json({ success: true, data: { id: 81 } }, { status: 201 })
      : undefined,
  );
  try {
    await screen.ready();
    screen.openEditor();
    await screen.ready();
    const modal = screen.root.querySelector<HTMLElement>('[data-admin-record-editor]')!;
    fillFields(modal, { ...sample, type: 'news', status: 'draft' });
    const file = new File(['fixture'], 'fixture.png', { type: 'image/png' });
    Object.defineProperty(modal.querySelector('input[type="file"]'), 'files', {
      value: [file],
      configurable: true,
    });
    await screen.controller.dispatch('saveRecord', modal);
    assert.equal(
      screen.calls
        .find((call) => call.path === 'media' && call.method === 'POST')
        ?.form?.get('visibility'),
      'public',
    );
    assert.equal(
      screen.calls.find((call) => call.path === 'admin/contents' && call.method === 'POST')?.body
        ?.cover_media_id,
      81,
    );
  } finally {
    screen.dispose();
  }
});

test('a denied deletion shows a visible error while the original row remains available', async () => {
  const screen = mount('/admin/faqs', undefined, (call) =>
    call.method === 'DELETE'
      ? Response.json({ message: 'رکورد وابسته وجود دارد.' }, { status: 409 })
      : undefined,
  );
  const confirm = window.confirm;
  window.confirm = () => true;
  try {
    await screen.ready();
    await screen.controller.dispatch(
      'deleteRecord',
      screen.root.querySelector<HTMLElement>('tbody [data-command="deleteRecord"]')!,
    );
    assert.equal(screen.root.querySelectorAll('tbody tr[data-record]').length, 1);
    assert.match(
      screen.root.querySelector('#toast-container [role="status"]')?.textContent ?? '',
      /رکورد وابسته/,
    );
  } finally {
    window.confirm = confirm;
    screen.dispose();
  }
});

test('a late editor response cannot replace the record selected more recently', async () => {
  const pending = new Map<string, (response: Response) => void>();
  const screen = mount(
    '/admin/faqs',
    [
      { ...sample, id: 17, question: 'اول' },
      { ...sample, id: 18, question: 'دوم' },
    ],
    (call) => {
      if (call.method === 'GET' && /^admin\/faqs\/(17|18)$/.test(call.path))
        return new Promise<Response>((resolve) => pending.set(call.path, resolve));
      return undefined;
    },
  );
  try {
    await screen.ready();
    const rows = screen.root.querySelectorAll<HTMLTableRowElement>('tbody tr[data-record]');
    const first = screen.controller.dispatch(
      'editRecord',
      rows[0].querySelector<HTMLElement>(
        '[data-command="editRecord"],[data-command="openEditCommitmentModal"]',
      )!,
    );
    const second = screen.controller.dispatch(
      'editRecord',
      rows[1].querySelector<HTMLElement>(
        '[data-command="editRecord"],[data-command="openEditCommitmentModal"]',
      )!,
    );
    await new Promise((resolve) => setImmediate(resolve));
    pending.get('admin/faqs/18')!(
      Response.json({ success: true, data: { ...sample, id: 18, question: 'دوم' } }),
    );
    await second;
    pending.get('admin/faqs/17')!(
      Response.json({ success: true, data: { ...sample, id: 17, question: 'اول' } }),
    );
    await first;
    const modal = screen.root.querySelector<HTMLElement>('#cbnCreateMenuModalOverlay')!;
    assert.equal(
      modal.querySelector<HTMLInputElement | HTMLTextAreaElement>('[data-field="question"]')!.value,
      'دوم',
    );
    await screen.controller.dispatch('saveRecord', modal);
    assert.equal(screen.calls.find((call) => call.method === 'PATCH')?.path, 'admin/faqs/18');
  } finally {
    screen.dispose();
  }
});
