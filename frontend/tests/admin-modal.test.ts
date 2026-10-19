import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { JSDOM } from 'jsdom';
import postcss from 'postcss';
import { templates } from '../src/lib/templates';
import { templateViews } from '../src/views';
import { adminExtraPages } from '../src/data/admin/extra-pages';
import { AdminResourcePage } from '../src/components/admin/resource-page';
import { mountPortal } from '../src/lib/alpine/runtime';
import type { TemplatePage } from '../src/types/portal';

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
] as const) {
  Object.defineProperty(globalThis, name, {
    value: name === 'window' ? window : window[name],
    configurable: true,
  });
}

const originalFetch = globalThis.fetch;
const calls: { path: string; method: string; body: Record<string, unknown> }[] = [];
const response = (data: unknown, status = 200) =>
  Response.json({ success: true, data }, { status });
let failReads = false;
const record = {
  id: 17,
  name: 'گزینهٔ آزمایشی',
  title: 'عنوان آزمایشی',
  question: 'پرسش آزمایشی',
  answer: '<p>پاسخ آزمایشی</p>',
  locale: 'fa',
  is_active: true,
};
globalThis.fetch = async (input, init) => {
  const url = new URL(String(input), 'http://localhost:3000');
  const path = url.pathname.replace('/api/backend/', '');
  const method = init?.method ?? 'GET';
  const body = typeof init?.body === 'string' ? JSON.parse(init.body) : {};
  calls.push({ path, method, body });
  if (failReads && method === 'GET') return response(null, 503);
  if (path === 'auth/me') return response({ name: 'مدیر آزمایشی' });
  if (path === 'admin/roles') return response({ roles: [], permissions: [] });
  if (method === 'POST' || method === 'PATCH')
    return response({ id: 17, ...body }, method === 'POST' ? 201 : 200);
  if (/\/17$/.test(path)) return response(record);
  return response([{ ...record, original_name: 'test.jpg' }]);
};

async function until(check: () => boolean) {
  for (let attempt = 0; attempt < 500; attempt++) {
    if (check()) return;
    await new Promise((resolve) => setTimeout(resolve, 5));
  }
  assert.ok(check(), 'Alpine must finish mounting the real page');
}

function isVisible(element: HTMLElement): boolean {
  const style = window.getComputedStyle(element);
  return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
}

const extraBase = templates.find((page) => page.path === '/admin/calls')!;
const resourcePages = [
  ...templates.filter((page) => page.controller === 'admin' && page.resource),
  ...Object.entries(adminExtraPages).map(([path, config]) => ({ ...extraBase, ...config, path })),
];
const reviewOnly = (page: TemplatePage) =>
  ['tickets', 'submissions', 'subscribers'].includes(page.resource) ||
  page.resource.startsWith('moderation/');

async function mount(page: TemplatePage) {
  calls.length = 0;
  const wrapper = document.createElement('div');
  wrapper.innerHTML = renderToStaticMarkup(
    adminExtraPages[page.path]
      ? React.createElement(AdminResourcePage, { path: page.path })
      : React.createElement(templateViews[page.id as keyof typeof templateViews]),
  );
  const root = wrapper.querySelector<HTMLElement>('[data-design]') ?? wrapper;
  root.dataset.design = page.scope;
  root.dataset.section = 'admin';
  // Read the real scoped overlay rules: an added class alone is not evidence of visibility.
  const style = document.createElement('style');
  postcss.parse(fs.readFileSync('public' + page.css, 'utf8')).walkRules((rule) => {
    if (/\.(cbn|top)-modal-overlay/.test(rule.selector)) style.textContent += rule.toString();
  });
  document.head.replaceChildren(style);
  document.body.replaceChildren(root);
  const cleanup = mountPortal(root, { page, preview: false, path: page.path });
  await until(() => root.dataset.ready === 'true' && root.hasAttribute('x-bind:aria-busy'));
  const modal = root.querySelector<HTMLElement>('#cbnCreateMenuModalOverlay')!;
  assert.ok(modal, page.path + ' must contain its editor');
  return { root, modal, cleanup };
}

test('the real Alpine + click opens a form using its original design CSS', async () => {
  const page = templates.find((page) => page.path === '/admin/faqs')!;
  const { root, modal, cleanup } = await mount(page);
  try {
    assert.equal(isVisible(modal), false);
    root.querySelector<HTMLElement>('#cbnOpenCreateMenuModalBtn')!.click();
    assert.equal(isVisible(modal), true);
  } finally {
    cleanup();
  }
});

for (const page of resourcePages.filter((page) => !reviewOnly(page))) {
  test('create form opens and closes through actual UI events: ' + page.path, async () => {
    const { root, modal, cleanup } = await mount(page);
    const plus = root.querySelector<HTMLElement>('#cbnOpenCreateMenuModalBtn');
    try {
      assert.ok(plus, 'The section needs a working create button');
      assert.equal(isVisible(modal), false);
      // Exercise clicks on the icon inside the + control as well as on the control itself.
      (plus.querySelector('svg') ?? plus).dispatchEvent(
        new window.MouseEvent('click', { bubbles: true }),
      );
      assert.equal(isVisible(modal), true);
      const field = Array.from(modal.querySelectorAll<HTMLInputElement>('[data-field]')).find(
        (field) => !field.disabled && field.type !== 'hidden' && !field.closest('[hidden]'),
      );
      assert.ok(field, 'The visible editor must contain its real resource fields');
      field.focus();
      assert.equal(document.activeElement, field);
      // Clicking in the form must not dismiss it through the backdrop handler.
      field.click();
      assert.equal(isVisible(modal), true);
      const cancel = modal.querySelector<HTMLElement>(
        '[data-command="closeModal"],.top-modal-footer [data-command="closeEditCommitmentModal"]',
      );
      assert.ok(cancel, 'The supplied editor must have a cancel control');
      cancel.click();
      assert.equal(isVisible(modal), false);
      assert.equal(modal.classList.contains('active'), false);
      plus.click();
      assert.equal(isVisible(modal), true);
      modal.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      assert.equal(isVisible(modal), false);
      plus.click();
      modal.click();
      assert.equal(isVisible(modal), false);
      plus.click();
      const close = modal.querySelector<HTMLElement>(
        '#cbnCloseCreateMenuModalBtn,.cbn-modal-close,.top-modal-close',
      );
      assert.ok(close, 'The supplied editor must have its close control');
      close.click();
      assert.equal(isVisible(modal), false);
      assert.equal(
        calls.filter((call) => !['GET', 'HEAD'].includes(call.method)).length,
        0,
        'Opening or dismissing a form must not create or delete anything',
      );
    } finally {
      cleanup();
    }
  });
}

test('a failed backend read still allows the local create form to open and close', async () => {
  failReads = true;
  const { root, modal, cleanup } = await mount(
    templates.find((page) => page.path === '/admin/faqs')!,
  );
  try {
    assert.ok(root.querySelector('.portal-status'));
    root.querySelector<HTMLElement>('#cbnOpenCreateMenuModalBtn')!.click();
    assert.equal(window.getComputedStyle(modal).display, 'flex');
    modal.querySelector<HTMLElement>('[data-command="closeModal"]')!.click();
    assert.equal(window.getComputedStyle(modal).display, 'none');
  } finally {
    cleanup();
    failReads = false;
  }
});

test('actual save and edit clicks send one write, keep CMS content and dismiss the visible editor', async () => {
  const { root, modal, cleanup } = await mount(
    templates.find((page) => page.path === '/admin/faqs')!,
  );
  try {
    const plus = root.querySelector<HTMLElement>('#cbnOpenCreateMenuModalBtn')!;
    plus.click();
    modal.querySelector<HTMLInputElement>('[data-field="question"]')!.value = 'پرسش تازهٔ آزمایشی';
    const editor = modal.querySelector<HTMLElement>('[data-cms-surface="answer"]')!;
    editor.innerHTML = '<p>پاسخ تازه</p><table><tbody><tr><td>دادهٔ جدول</td></tr></tbody></table>';
    editor.dispatchEvent(new window.InputEvent('input', { bubbles: true }));
    modal.querySelector<HTMLElement>('[data-command="saveRecord"]')!.click();
    await until(
      () =>
        calls.some((call) => call.method === 'POST') &&
        window.getComputedStyle(modal).display === 'none',
    );
    const writes = calls.filter((call) => call.method === 'POST');
    assert.equal(writes.length, 1);
    assert.equal(writes[0].path, 'admin/faqs');
    assert.equal(writes[0].body.question, 'پرسش تازهٔ آزمایشی');
    assert.match(String(writes[0].body.answer), /<table>/);

    await until(() => !!root.querySelector('tr[data-record="17"]'));
    const row = root.querySelector<HTMLElement>('tr[data-record="17"]')!;
    row.querySelector<HTMLElement>('[data-command="cbnToggleActionsMenu"]')!.click();
    row.querySelector<HTMLElement>('[data-command="editRecord"]')!.click();
    await until(() => window.getComputedStyle(modal).display === 'flex');
    assert.equal(
      modal.querySelector<HTMLInputElement>('[data-field="question"]')!.value,
      record.question,
    );
    modal.querySelector<HTMLInputElement>('[data-field="question"]')!.value = 'پرسش ویرایش‌شده';
    modal.querySelector<HTMLElement>('[data-command="saveRecord"]')!.click();
    await until(
      () =>
        calls.some((call) => call.method === 'PATCH') &&
        window.getComputedStyle(modal).display === 'none',
    );
    const edits = calls.filter((call) => call.method === 'PATCH');
    assert.equal(edits.length, 1);
    assert.equal(edits[0].path, 'admin/faqs/17');
    assert.equal(edits[0].body.question, 'پرسش ویرایش‌شده');
    plus.click();
    assert.equal(window.getComputedStyle(modal).display, 'flex');
    assert.equal(modal.querySelector<HTMLInputElement>('[data-field="question"]')!.value, '');
    assert.equal(editor.textContent, '', 'A new item must not retain the previous record body');
  } finally {
    cleanup();
  }
});

for (const [path, editorSelector] of [
  ['/admin/faqs', '.portal-cms'],
  ['/admin/forms', '.portal-form-builder'],
  ['/admin/roles', '.portal-permission-choices'],
]) {
  test('remounting the same page keeps one working editor: ' + path, async () => {
    const page = templates.find((page) => page.path === path)!;
    const { root, modal, cleanup } = await mount(page);
    assert.equal(root.querySelectorAll(editorSelector).length, 1);
    cleanup();
    // React may cancel an effect and immediately mount it again on the existing DOM.
    const input = { page, preview: false, path };
    const cancelled = mountPortal(root, input);
    cancelled();
    calls.length = 0;
    const dispose = mountPortal(root, input);
    try {
      await until(() => calls.some((call) => call.path === 'auth/me'));
      assert.equal(root.querySelectorAll(editorSelector).length, 1);
      root.querySelector<HTMLElement>('#cbnOpenCreateMenuModalBtn')!.click();
      assert.equal(isVisible(modal), true);
      modal.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      assert.equal(isVisible(modal), false);
    } finally {
      dispose();
    }
  });
}

test.after(() => {
  globalThis.fetch = originalFetch;
  window.close();
});
