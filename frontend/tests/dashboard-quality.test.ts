import test from 'node:test';
import assert from 'node:assert/strict';
import React, { act } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { JSDOM } from 'jsdom';
import { AdminWorkspaceProvider } from '../src/components/admin/workspace-provider';
import { AdminModuleMenu } from '../src/components/admin/module-menu';
import { AdminResourcePage } from '../src/components/admin/resource-page';
import { AdminEditorPage } from '../src/components/admin/editor-page';
import { adminModules } from '../src/data/admin/modules';
import { adminResourcePage, adminEditorHref, resolveAdminEditor } from '../src/lib/admin-routes';
import { templates } from '../src/lib/templates';
import { templateViews } from '../src/views';
import { collectFields } from '../src/features/admin/fields';
import { bindUi } from '../src/lib/alpine/ui';
import { normalizeAdminSearch } from '../src/lib/admin-search';
import type { PortalUser } from '../src/types/portal';

const window = new JSDOM('', { url: 'https://portal.test/admin/news', pretendToBeVisual: true })
  .window;
for (const name of [
  'window',
  'document',
  'HTMLElement',
  'HTMLInputElement',
  'HTMLSelectElement',
  'HTMLTextAreaElement',
  'Element',
  'Node',
  'Option',
  'sessionStorage',
  'localStorage',
  'AbortController',
  'AbortSignal',
] as const)
  Object.defineProperty(globalThis, name, {
    value: name === 'window' ? window : window[name],
    configurable: true,
  });
Object.defineProperty(globalThis, 'IS_REACT_ACT_ENVIRONMENT', { value: true, configurable: true });
const user: PortalUser = {
  id: 1,
  name: 'مدیر آزمایشی',
  person_type: 'staff',
  role: { name: 'super_admin', permissions: ['*'] },
  portal_context: {
    type: 'central',
    organization_id: 1,
    organization_name: 'استانداری مازندران',
    county: null,
    can_write: true,
    is_global: true,
    dashboard_path: '/panel/admin',
    login_path: '/panel/admin/login',
    public_path: '/',
  },
};
function markup(view: React.ReactElement) {
  const root = document.createElement('div');
  root.innerHTML = renderToStaticMarkup(
    React.createElement(AdminWorkspaceProvider, { user }, view),
  );
  return root;
}
function editor(path: string) {
  const route = resolveAdminEditor(path)!;
  return markup(React.createElement(AdminEditorPage, { path, route }));
}
const flush = async () => {
  for (let i = 0; i < 8; i++) await new Promise((resolve) => setTimeout(resolve, 0));
};
test('retained admin templates share the visible rail and omit AI and dummy chat', () => {
  for (const page of templates.filter((page) => page.group === 'admin')) {
    const View = templateViews[page.id as keyof typeof templateViews];
    const root = markup(React.createElement(View));
    const header = root.querySelector('.portal-admin-header');
    if (!header) continue;
    assert.equal(header.querySelector('a[href="/assistant"]'), null, page.path);
    assert.doesNotMatch(header.textContent!, /Lorem ipsum|کریمی|هوش مصنوعی/);
    assert.equal(root.querySelector('.sidebar')?.classList.contains('shrink'), false);
    assert.ok(header.querySelector('[aria-controls="admin-sidebar"]'));
  }
});
test('every creatable list has a real server-rendered destination and no hidden editor', () => {
  for (const module of adminModules.filter((module) => adminResourcePage(module.path))) {
    const root = markup(React.createElement(AdminResourcePage, { path: module.path, user }));
    assert.equal(root.querySelector('[role="dialog"],#cbnCreateMenuModalOverlay'), null);
    const plus = root.querySelector<HTMLAnchorElement>('#cbnOpenCreateMenuModalBtn');
    if (module.canCreate) {
      assert.equal(plus?.tagName, 'A');
      assert.equal(plus?.getAttribute('href'), adminEditorHref(module.path));
      assert.match(plus!.textContent!, /افزودن|بارگذاری/);
    } else if (module.resource !== 'settings') assert.equal(plus, null);
  }
});
test('native create links are not intercepted as modal triggers', () => {
  const root = markup(React.createElement(AdminResourcePage, { path: '/panel/admin/news', user }));
  const abort = new AbortController();
  const page = adminResourcePage('/panel/admin/news')!;
  bindUi({ root, page, path: page.path, preview: true, signal: abort.signal }, () =>
    assert.fail('native link'),
  );
  const event = new window.Event('click', { bubbles: true, cancelable: true });
  root.querySelector('#cbnOpenCreateMenuModalBtn')!.dispatchEvent(event);
  assert.equal(event.defaultPrevented, false);
  abort.abort();
});
test('mobile menu state, opening, Escape and focus return remain consistent', () => {
  const old = window.innerWidth;
  Object.defineProperty(window, 'innerWidth', { value: 390, configurable: true });
  const root = markup(React.createElement(AdminResourcePage, { path: '/panel/admin/news', user }));
  document.body.append(root);
  const abort = new AbortController();
  try {
    const page = adminResourcePage('/panel/admin/news')!;
    bindUi({ root, page, path: page.path, preview: true, signal: abort.signal }, () => {});
    const toggle = root.querySelector<HTMLButtonElement>('#clicksidebar')!;
    assert.equal(toggle.getAttribute('aria-expanded'), 'false');
    toggle.click();
    assert.ok(root.querySelector('.sidebar.open'));
    assert.equal(toggle.getAttribute('aria-expanded'), 'true');
    document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    assert.equal(root.querySelector('.sidebar.open'), null);
    assert.equal(toggle.getAttribute('aria-expanded'), 'false');
    assert.equal(document.activeElement, toggle);
  } finally {
    abort.abort();
    root.remove();
    Object.defineProperty(window, 'innerWidth', { value: old, configurable: true });
  }
});
test('expanded menu groups survive remount and authenticated permissions ignore stale events', async () => {
  const { createRoot } = await import('react-dom/client');
  sessionStorage.clear();
  const mount = async () => {
    const element = document.createElement('div');
    document.body.replaceChildren(element);
    const root = createRoot(element);
    await act(async () => {
      root.render(
        React.createElement(AdminWorkspaceProvider, { user }, React.createElement(AdminModuleMenu)),
      );
      await flush();
    });
    return { element, root };
  };
  let screen = await mount();
  const count = screen.element.querySelectorAll('nav a').length;
  const group = screen.element.querySelector<HTMLDetailsElement>('[data-menu-group="appearance"]')!;
  await act(async () => {
    group.querySelector('summary')!.click();
    await flush();
  });
  assert.ok(group.open);
  await act(async () => {
    document.dispatchEvent(
      new window.CustomEvent('portal:admin-user', { detail: { role: { permissions: [] } } }),
    );
    await flush();
  });
  assert.equal(screen.element.querySelectorAll('nav a').length, count);
  await act(async () => screen.root.unmount());
  screen = await mount();
  assert.ok(
    screen.element.querySelector<HTMLDetailsElement>('[data-menu-group="appearance"]')!.open,
  );
  assert.equal(screen.element.querySelector('a[href="/panel/admin/employee-list"]'), null);
  await act(async () => screen.root.unmount());
});
test('management search normalizes Persian and Arabic spelling and spaces', () => {
  assert.equal(
    normalizeAdminSearch('  مديريت\u200cكارمندان '),
    normalizeAdminSearch('مدیریت کارمندان'),
  );
});
test('fixed types remain in submitted data and advanced optional fields replace raw metadata', () => {
  const root = editor('/panel/admin/news/new');
  const type = root.querySelector<HTMLInputElement>('[data-field="type"]')!;
  assert.equal(type.type, 'hidden');
  assert.equal(collectFields(root).type, 'news');
  assert.equal(root.querySelector('[data-field="metadata"]'), null);
  const more = root.querySelector('.portal-form-additional')!;
  assert.ok(more);
  assert.equal(more.querySelector('[required]'), null);
});
test('contact editing cannot create a new organization and contains only contact fields', () => {
  const root = editor('/panel/admin/organization-contact/1/edit');
  const keys = Array.from(root.querySelectorAll('[data-field]')).map((x) =>
    x.getAttribute('data-field'),
  );
  assert.ok(keys.includes('phone'));
  assert.ok(
    keys.every((key) => ['name', 'email', 'phone', 'fax', 'sms_number', 'address'].includes(key!)),
  );
  assert.equal(resolveAdminEditor('/panel/admin/organization-contact/new'), undefined);
});
test('create requires a password while edit can keep the current password', () => {
  for (const [path, required] of [
    ['/panel/admin/internal-users/new', true],
    ['/panel/admin/internal-users/1/edit', false],
  ] as const) {
    const input = editor(path).querySelector<HTMLInputElement>('[data-field="password"]')!;
    assert.equal(input.required, required);
    assert.equal(input.minLength, 12);
  }
});
test('image and file libraries have the right restrictions and image-list filter', () => {
  assert.equal(adminResourcePage('/panel/admin/images')!.defaults.kind, 'image');
  assert.equal(adminResourcePage('/panel/admin/files')!.defaults.kind, undefined);
  const image =
    editor('/panel/admin/images/new').querySelector<HTMLInputElement>('input[type="file"]')!;
  assert.equal(image.accept, 'image/jpeg,image/png,image/webp');
  assert.ok(
    editor('/panel/admin/files/new')
      .querySelector<HTMLInputElement>('input[type="file"]')!
      .accept.includes('.pdf'),
  );
});
