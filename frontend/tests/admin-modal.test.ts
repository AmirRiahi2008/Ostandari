import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { JSDOM } from 'jsdom';
import { templates } from '../src/lib/templates';
import { templateViews } from '../src/views';
import { adminModules } from '../src/data/admin/modules';
import { adminSections } from '../src/data/admin/sections';
import { adminExtraPages } from '../src/data/admin/extra-pages';
import { AdminResourcePage } from '../src/components/admin/resource-page';
import { AdminEditorPage } from '../src/components/admin/editor-page';
import {
  adminEditorHref,
  adminResourcePage,
  resolveAdminEditor,
  resolveReportEditor,
  safeAdminReturn,
} from '../src/lib/admin-routes';
import { mountPortal } from '../src/lib/alpine/runtime';
import { fillFields } from '../src/features/admin/fields';
import { resourceScope } from '../src/features/admin/resources';
import type { TemplatePage, RecordData } from '../src/types/portal';

const window = new JSDOM('', { url: 'http://localhost:3000', pretendToBeVisual: true }).window;
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
  'CustomEvent',
  'ShadowRoot',
  'MutationObserver',
  'AbortController',
  'AbortSignal',
  'localStorage',
] as const)
  Object.defineProperty(globalThis, name, {
    value: name === 'window' ? window : window[name],
    configurable: true,
  });

const originalFetch = globalThis.fetch;
type Call = { path: string; method: string; body: RecordData };
const calls: Call[] = [];
let override: ((call: Call) => Response | Promise<Response> | undefined) | undefined;
let activePage: TemplatePage;
const json = (data: unknown, status = 200) => Response.json({ success: true, data }, { status });
function sample(page = activePage): RecordData {
  return {
    id: 17,
    name: 'نام آزمایشی',
    title: 'عنوان آزمایشی',
    label: 'نقش آزمایشی',
    question: 'پرسش آزمایشی',
    body: '<p>متن کامل آزمایشی</p>',
    bio: '<p>معرفی مسئول</p>',
    description: '<p>شرح آزمایشی</p>',
    answer: '<p>پاسخ آزمایشی</p>',
    text: 'سخن آزمایشی',
    author: 'گوینده',
    username: 'fixture_editor',
    email: 'fixture@example.test',
    password: 'Fixture-Password42!',
    position: 'سمت آزمایشی',
    key: 'fixture-key',
    url: 'https://example.test/',
    locale: 'fa',
    priority: 0,
    is_active: true,
    is_current: false,
    role_id: 31,
    organization_id: 41,
    county_id: 21,
    menu_id: 51,
    gallery_id: 61,
    poll_id: 71,
    media_id: 81,
    cover_media_id: 81,
    category_id: 91,
    permissions: ['content.manage'],
    fields: [{ key: 'name', label: 'نام', type: 'text', required: true }],
    status: 'pending',
    subject: 'درخواست آزمایشی',
    reply: 'پاسخ آزمایشی',
    urgency: 'medium',
    ...(['tickets', 'submissions'].includes(page.resource) ? { reference: 'REF-17' } : {}),
    ...resourceScope(page.resource),
    ...page.defaults,
  };
}
globalThis.fetch = async (input, init) => {
  const path = new URL(String(input), window.location.origin).pathname.replace('/api/backend/', '');
  const method = init?.method ?? 'GET';
  const body = typeof init?.body === 'string' ? JSON.parse(init.body) : {};
  const call = { path, method, body };
  calls.push(call);
  const result = override?.(call);
  if (result) return result;
  if (path === 'auth/me')
    return json({
      id: 1,
      name: 'مدیر آزمایشی',
      person_type: 'staff',
      role: { permissions: ['*'] },
    });
  if (path === 'media' && method === 'POST') return json({ id: 81 }, 201);
  if (method === 'POST' || method === 'PATCH' || method === 'PUT')
    return json({ id: 17, ...body }, method === 'POST' ? 201 : 200);
  const endpoint = activePage.resource === 'media' ? 'media' : 'admin/' + activePage.resource;
  if (path === endpoint + '/17' || path === endpoint + '/REF-17') return json(sample());
  if (path === 'admin/roles')
    return json({
      roles: [{ id: 31, name: 'editor', label: 'ویرایشگر' }],
      permissions: ['content.manage'],
    });
  if (path === 'admin/settings')
    return json([{ key: 'site.name', value: 'استانداری', is_public: true }]);
  if (path === endpoint) return json([sample()]);
  const ids: Record<string, number> = {
    organizations: 41,
    counties: 21,
    menus: 51,
    galleries: 61,
    polls: 71,
    media: 81,
    categories: 91,
    roles: 31,
  };
  return json([
    {
      id: ids[path.split('/').at(-1)!] ?? 91,
      name: 'گزینهٔ آزمایشی',
      title: 'گزینهٔ آزمایشی',
      original_name: 'fixture.jpg',
    },
  ]);
};
async function until(check: () => boolean) {
  for (let attempt = 0; attempt < 500; attempt++) {
    if (check()) return;
    await new Promise((resolve) => setTimeout(resolve, 5));
  }
  assert.ok(check(), 'The actual Alpine page must finish its operation');
}
async function mount(path: string, editor = false) {
  calls.length = 0;
  const url = new URL(path, window.location.origin);
  window.history.replaceState({}, '', url);
  const route = editor ? resolveAdminEditor(url.pathname)! : undefined;
  activePage = route
    ? {
        ...route.page,
        id: 'AdminRecordEditor',
        editor: {
          mode: route.mode,
          id: route.id,
          returnTo: safeAdminReturn(route.page.path, url.searchParams.get('return')),
        },
      }
    : adminResourcePage(url.pathname)!;
  const wrapper = document.createElement('div');
  wrapper.innerHTML = renderToStaticMarkup(
    route
      ? React.createElement(AdminEditorPage, {
          path: url.pathname,
          route,
          returnTo: url.searchParams.get('return') ?? undefined,
        })
      : adminExtraPages[url.pathname]
        ? React.createElement(AdminResourcePage, { path: url.pathname })
        : React.createElement(templateViews[activePage.id as keyof typeof templateViews]),
  );
  const root = wrapper.querySelector<HTMLElement>('[data-design]') ?? wrapper;
  root.dataset.adminView = editor ? 'editor' : 'list';
  root.dataset.section = 'admin';
  document.body.replaceChildren(root);
  const navigations: string[] = [];
  const cleanup = mountPortal(root, {
    page: activePage,
    path: url.pathname,
    preview: false,
    navigate: (href) => navigations.push(href),
  });
  await until(() => root.hasAttribute('x-bind:aria-busy') && root.dataset.ready === 'true');
  for (let i = 0; i < 3; i++) await new Promise((resolve) => setImmediate(resolve));
  return { root, cleanup, navigations, page: activePage };
}

const modules = adminModules.filter((module) => Boolean(adminResourcePage(module.path)));
test('all dashboard modules have a group and only supported actions resolve to editor pages', () => {
  assert.equal(new Set(adminModules.map((module) => module.path)).size, adminModules.length);
  for (const module of adminModules) {
    assert.ok(adminSections.some((section) => section.id === module.section));
    assert.ok(module.title && module.description && module.permission);
    const page = adminResourcePage(module.path);
    if (!page) continue;
    assert.equal(Boolean(resolveAdminEditor(module.path + '/new')), module.canCreate, module.path);
    const target =
      page.resource === 'settings'
        ? module.path + '/edit'
        : module.path +
          (['tickets', 'submissions'].includes(page.resource) ? '/REF-17/edit' : '/17/edit');
    assert.equal(Boolean(resolveAdminEditor(target)), module.canEdit, target);
  }
  for (const path of [
    '/admin/news/0/edit',
    '/admin/news/-1/edit',
    '/admin/news/abc/edit',
    '/admin/news/%2F/edit',
    '/admin/unknown/new',
    '/admin/reports/new',
    '/admin/settings/new',
    '/admin/subscribers/new',
    '/admin/forum-topics/new',
    '/admin/files/17/edit',
  ])
    assert.equal(resolveAdminEditor(path), undefined, path);
  assert.equal(resolveReportEditor('/admin/reports/RPT-17/edit'), 'RPT-17');
  assert.equal(resolveReportEditor('/admin/reports/%2F/edit'), undefined);
});
test('editor return targets keep list filters and reject external, sibling and malformed destinations', () => {
  assert.equal(
    safeAdminReturn('/admin/news', '/admin/news?category_id=4&q=hello&page=2'),
    '/admin/news?category_id=4&q=hello&page=2',
  );
  for (const path of [
    'https://evil.test',
    '//evil.test',
    '/admin/newsletter',
    '/admin/news/17/edit',
    '/admin/news\\evil',
    '/admin/news\n',
  ])
    assert.equal(safeAdminReturn('/admin/news', path), '/admin/news');
  const target = new URL(
    adminEditorHref('/admin/news', undefined, '?category_id=4&q=hello&page=2'),
    window.location.origin,
  );
  assert.equal(target.pathname, '/admin/news/new');
  assert.equal(target.searchParams.get('category_id'), '4');
  assert.equal(target.searchParams.get('return'), '/admin/news?category_id=4&q=hello&page=2');
});

for (const module of modules) {
  test(
    'list actions lead to independent pages without mounting a hidden CMS: ' + module.path,
    async () => {
      const { root, cleanup, navigations, page } = await mount(module.path);
      try {
        assert.equal(root.querySelector('.portal-cms'), null);
        const plus = root.querySelector<HTMLElement>('#cbnOpenCreateMenuModalBtn');
        if (module.canCreate || page.resource === 'settings') {
          assert.equal(plus?.tagName, 'A');
          assert.ok(
            resolveAdminEditor(
              new URL(plus!.getAttribute('href')!, window.location.origin).pathname,
            ),
          );
          (plus!.querySelector('svg') ?? plus!).dispatchEvent(
            new window.MouseEvent('click', { bubbles: true, cancelable: true }),
          );
          assert.ok(
            resolveAdminEditor(new URL(navigations.at(-1)!, window.location.origin).pathname),
          );
          assert.equal(root.querySelector('.cbn-modal-overlay-open'), null);
        } else assert.ok(!plus || plus.hidden);
        if (module.canEdit && page.resource !== 'settings') {
          const row = root.querySelector('tr[data-record]')!;
          const edit = row.querySelector<HTMLAnchorElement>('a[data-navigate]');
          assert.ok(edit, 'Every editable row needs a real record URL');
          assert.equal(
            resolveAdminEditor(new URL(edit.href).pathname)?.id,
            row.getAttribute('data-record'),
          );
        }
        assert.equal(
          calls.some((call) => call.method !== 'GET'),
          false,
        );
      } finally {
        cleanup();
      }
    },
  );
}

for (const module of modules.filter((module) => module.canCreate)) {
  test('create page saves once and returns to its own list: ' + module.path, async () => {
    const { root, cleanup, navigations, page } = await mount(adminEditorHref(module.path), true);
    try {
      assert.ok(
        root.querySelector('h1')?.textContent?.includes('افزودن') || page.resource === 'media',
      );
      assert.equal(root.querySelector('.cbn-modal-overlay'), null);
      const editor = root.querySelector<HTMLElement>('[data-admin-record-editor]')!;
      fillFields(editor, sample());
      if (page.resource === 'media') {
        const input = editor.querySelector<HTMLInputElement>('input[type="file"]')!;
        Object.defineProperty(input, 'files', {
          value: [new File(['fixture'], 'fixture.pdf', { type: 'application/pdf' })],
          configurable: true,
        });
        assert.equal(input.required, true);
        // jsdom has no native file picker; the controller still checks the assigned file.
        input.required = false;
      }
      const save = editor.querySelector<HTMLElement>('[data-editor-save]')!;
      save.click();
      save.click();
      await until(() => navigations.length === 1);
      const writes = calls.filter((call) => call.method === 'POST');
      assert.equal(
        writes.length,
        1,
        editor.querySelector('[data-form-error]')?.textContent ?? module.path,
      );
      assert.equal(writes[0].path, page.resource === 'media' ? 'media' : 'admin/' + page.resource);
      assert.equal(new URL(navigations[0], window.location.origin).pathname, module.path);
      assert.equal(
        new URL(navigations[0], window.location.origin).searchParams.get('saved'),
        'create',
      );
    } finally {
      cleanup();
    }
  });
}

for (const module of modules.filter((module) => module.canEdit)) {
  test(
    'edit URL loads its own record and updates rather than creating: ' + module.path,
    async () => {
      const base = adminResourcePage(module.path)!;
      const { root, cleanup, navigations, page } = await mount(
        adminEditorHref(
          module.path,
          ['tickets', 'submissions'].includes(base.resource) ? 'REF-17' : '17',
        ),
        true,
      );
      try {
        const fields = root.querySelector<HTMLFieldSetElement>('[data-editor-fields]')!;
        assert.equal(fields.disabled, false);
        const editor = root.querySelector<HTMLElement>('[data-admin-record-editor]')!;
        fillFields(
          editor,
          page.resource === 'settings'
            ? { settings: [{ key: 'site.name', value: 'ویرایش شده', is_public: true }] }
            : sample(),
        );
        editor.querySelector<HTMLElement>('[data-editor-save]')!.click();
        await until(() => navigations.length === 1);
        const updates = calls.filter((call) => call.method === 'PATCH' || call.method === 'PUT');
        assert.equal(
          updates.length,
          1,
          editor.querySelector('[data-form-error]')?.textContent ?? module.path,
        );
        assert.equal(
          calls.some((call) => call.method === 'POST'),
          false,
        );
        assert.equal(
          updates[0].path,
          'admin/' + page.resource + (page.resource === 'settings' ? '' : '/' + page.editor!.id),
        );
        assert.equal(new URL(navigations[0], window.location.origin).pathname, module.path);
      } finally {
        cleanup();
      }
    },
  );
}

test('failed edit loads cannot write, retry reloads the record, and validation errors retain entered values', async () => {
  let failed = true;
  override = (call) =>
    call.path === 'admin/faqs/17' && call.method === 'GET' && failed ? json(null, 503) : undefined;
  const { root, cleanup, navigations } = await mount('/admin/faqs/17/edit', true);
  try {
    assert.equal(root.querySelector<HTMLButtonElement>('[data-editor-save]')!.disabled, true);
    assert.match(root.querySelector('[data-editor-status]')!.textContent!, /دریافت|اطلاعات/);
    assert.equal(
      calls.some((call) => call.method !== 'GET'),
      false,
    );
    failed = false;
    root.querySelector<HTMLElement>('[data-editor-retry]')!.click();
    await until(() => !root.querySelector<HTMLButtonElement>('[data-editor-save]')!.disabled);
    const question = root.querySelector<HTMLTextAreaElement>('[data-field="question"]')!;
    question.value = 'متن حفظ شود';
    override = (call) =>
      call.method === 'PATCH'
        ? Response.json(
            { message: 'خطای اعتبارسنجی', errors: { question: ['خطای آزمایشی'] } },
            { status: 422 },
          )
        : undefined;
    root.querySelector<HTMLElement>('[data-editor-save]')!.click();
    await until(() => !!root.querySelector('[data-form-error]'));
    assert.equal(question.value, 'متن حفظ شود');
    assert.equal(navigations.length, 0);
    assert.equal(root.querySelector<HTMLButtonElement>('[data-editor-save]')!.disabled, false);
  } finally {
    cleanup();
    override = undefined;
  }
});
test('a mismatched record type cannot be converted into a different content section', async () => {
  override = (call) =>
    call.path === 'admin/contents/17' ? json({ ...sample(), type: 'announcement' }) : undefined;
  const { root, cleanup } = await mount('/admin/news/17/edit', true);
  try {
    assert.equal(root.querySelector<HTMLButtonElement>('[data-editor-save]')!.disabled, true);
    assert.match(root.querySelector('[data-editor-status]')!.textContent!, /متعلق/);
  } finally {
    cleanup();
    override = undefined;
  }
});

test('system roles stay read-only on their direct edit page and cannot submit an update', async () => {
  override = (call) =>
    call.path === 'admin/roles/17' && call.method === 'GET'
      ? json({ ...sample(), is_system: true })
      : undefined;
  const { root, cleanup, navigations } = await mount('/admin/roles/17/edit', true);
  try {
    const save = root.querySelector<HTMLButtonElement>('[data-editor-save]')!;
    assert.equal(save.disabled, true);
    assert.equal(root.querySelector<HTMLFieldSetElement>('[data-editor-fields]')!.disabled, true);
    assert.match(root.querySelector('[data-editor-status]')!.textContent!, /نقش سیستمی/);
    save.click();
    assert.equal(
      calls.some((call) => call.method !== 'GET'),
      false,
    );
    assert.equal(navigations.length, 0);
  } finally {
    cleanup();
    override = undefined;
  }
});

test('list search changes are carried by both create and edit links and restored after saving', async () => {
  const { root, cleanup } = await mount('/admin/news?category_id=91');
  try {
    const input = root.querySelector<HTMLInputElement>('#searchInput')!;
    input.value = 'خبر انتخاب‌شده';
    input
      .closest('form')!
      .dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
    await until(() =>
      root.querySelector<HTMLAnchorElement>('a#cbnOpenCreateMenuModalBtn')!.href.includes('q%3D'),
    );
    for (const link of [
      root.querySelector<HTMLAnchorElement>('a#cbnOpenCreateMenuModalBtn')!,
      root.querySelector<HTMLAnchorElement>('tr[data-record] a[data-navigate]')!,
    ]) {
      const target = new URL(link.href);
      assert.equal(
        new URL(target.searchParams.get('return')!, window.location.origin).searchParams.get('q'),
        'خبر انتخاب‌شده',
      );
      assert.equal(target.searchParams.get('category_id'), '91');
    }
  } finally {
    cleanup();
  }
});

test('the full page CMS keeps images and tables and reuses a cover upload after a validation failure', async () => {
  const { root, cleanup, navigations } = await mount(
    '/admin/news/new?return=' + encodeURIComponent('/admin/news?category_id=91&q=selected&page=2'),
    true,
  );
  let attempts = 0;
  override = (call) =>
    call.path === 'admin/contents' && call.method === 'POST' && ++attempts === 1
      ? Response.json({ errors: { title: ['عنوان نیاز به اصلاح دارد.'] } }, { status: 422 })
      : undefined;
  try {
    const editor = root.querySelector<HTMLElement>('[data-admin-record-editor]')!;
    const body =
      '<p>متن خبر</p><img src="https://example.test/photo.webp" alt="تصویر"><table><tbody><tr><td>داده</td></tr></tbody></table>';
    fillFields(editor, { ...sample(), body });
    const file = editor.querySelector<HTMLInputElement>('input[type="file"][data-media-field]')!;
    Object.defineProperty(file, 'files', {
      value: [new File(['fixture'], 'fixture.png', { type: 'image/png' })],
      configurable: true,
    });
    editor.querySelector<HTMLElement>('[data-editor-save]')!.click();
    await until(() => !!editor.querySelector('[data-form-error]'));
    assert.equal(navigations.length, 0);
    assert.match(
      editor.querySelector<HTMLTextAreaElement>('[data-field="body"]')!.value,
      /<table>/,
    );
    editor.querySelector<HTMLElement>('[data-editor-save]')!.click();
    await until(() => navigations.length === 1);
    assert.equal(calls.filter((call) => call.path === 'media' && call.method === 'POST').length, 1);
    const writes = calls.filter((call) => call.path === 'admin/contents' && call.method === 'POST');
    assert.equal(writes.length, 2);
    assert.match(String(writes[1].body.body), /<img/);
    assert.match(String(writes[1].body.body), /<table>/);
    assert.equal(writes[1].body.cover_media_id, 81);
    const back = new URL(navigations[0], window.location.origin);
    assert.equal(back.searchParams.get('q'), 'selected');
    assert.equal(back.searchParams.get('page'), '2');
    assert.equal(back.searchParams.get('category_id'), '91');
  } finally {
    cleanup();
    override = undefined;
  }
});
for (const [path, selector] of [
  ['/admin/faqs/new', '.portal-cms'],
  ['/admin/forms/new', '.portal-form-builder'],
  ['/admin/roles/new', '.portal-permission-choices'],
]) {
  test('editor lifecycle remains safe when React remounts a form: ' + path, async () => {
    const { root, cleanup, page } = await mount(path, true);
    cleanup();
    const cancelled = mountPortal(root, { page, path, preview: false });
    cancelled();
    const dispose = mountPortal(root, { page, path, preview: false });
    try {
      await until(() => root.querySelectorAll(selector).length > 0);
      assert.equal(root.querySelectorAll(selector).length, 1);
    } finally {
      dispose();
    }
  });
}
test.after(() => {
  globalThis.fetch = originalFetch;
  window.close();
});
