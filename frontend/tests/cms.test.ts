import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { JSDOM } from 'jsdom';
import { AdminResourceForm } from '../src/components/admin/resource-form';
import { collectFields, fillFields } from '../src/features/admin/fields';
import {
  cleanEditorHtml,
  createEditorTable,
  mountRichText,
  validateRichText,
} from '../src/features/admin/rich-text';
import { mountFormBuilder, validateFormBuilder } from '../src/features/admin/form-builder';
import { mountPermissionFields } from '../src/features/admin/permission-fields';
import { prepareUpload } from '../src/features/admin/uploads';
import { contextualFilters, relatedAdminLinks } from '../src/features/admin/relations';
import { lookupRecords } from '../src/features/admin/resources';
import { adminPermissions } from '../src/data/admin/permissions';

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
] as const)
  Object.defineProperty(globalThis, name, {
    value: name === 'window' ? window : window[name],
    configurable: true,
  });

function screen(resource: string) {
  const root = document.createElement('div');
  root.innerHTML = renderToStaticMarkup(React.createElement(AdminResourceForm, { resource }));
  document.body.replaceChildren(root);
  const abort = new AbortController();
  return {
    root,
    abort,
    dispose: () => {
      abort.abort();
      root.remove();
    },
  };
}
function click(root: ParentNode, label: string) {
  const button = Array.from(root.querySelectorAll('button')).find(
    (button) => button.textContent === label,
  );
  assert.ok(button, label);
  button.click();
}
function change(
  input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
  value: string,
  event = 'input',
) {
  input.value = value;
  input.dispatchEvent(new window.Event(event, { bubbles: true }));
}

test('rich content preserves text, links, image captions and tables while stripping executable markup and controls', () => {
  const html = cleanEditorHtml(
    '<p x-data="alert(1)" data-command="deleteRecord">متن <strong>مهم</strong></p><img src="https://images.example/photo.webp" alt="شرح تصویر" onerror="alert(1)"><img src="data:image/svg+xml,bad"><table><caption>جدول</caption><tr><td>یک</td></tr></table><a href="javascript:alert(1)">لینک</a><script>alert(1)</script><iframe src="https://evil.example"></iframe>',
  );
  assert.match(html, /<strong>مهم<\/strong>/);
  assert.match(html, /alt="شرح تصویر"/);
  assert.match(html, /<table>/);
  assert.match(html, /<caption>جدول/);
  assert.doesNotMatch(html, /script|iframe|onerror|x-data|data-command|data:image|javascript:/);
});

test('CMS inserts a bounded table at the saved cursor, collects HTML, and supports undo and redo', () => {
  const s = screen('contents');
  try {
    mountRichText(s.root, s.abort.signal, false);
    fillFields(s.root, { body: '<p>متن اصلی</p>' });
    const source = s.root.querySelector<HTMLTextAreaElement>('[data-field="body"]')!;
    const wrapper = source.closest('.portal-cms')!;
    const surface = wrapper.querySelector<HTMLElement>('[data-cms-surface]')!;
    const range = document.createRange();
    range.selectNodeContents(surface);
    range.collapse(false);
    window.getSelection()!.removeAllRanges();
    window.getSelection()!.addRange(range);
    surface.dispatchEvent(new window.MouseEvent('mouseup'));
    click(wrapper, 'جدول');
    change(wrapper.querySelector('[aria-label="تعداد ردیف"]')!, '2');
    change(wrapper.querySelector('[aria-label="تعداد ستون"]')!, '3');
    click(wrapper, 'درج جدول');
    assert.equal(surface.querySelectorAll('tbody tr').length, 2);
    assert.equal(surface.querySelectorAll('th').length, 3);
    assert.match(String(collectFields(s.root).body), /<table>/);
    click(wrapper, 'واگرد');
    assert.equal(surface.querySelector('table'), null);
    assert.equal(source.value, '<p>متن اصلی</p>');
    click(wrapper, 'بازانجام');
    assert.ok(surface.querySelector('table'));
    assert.throws(() => createEditorTable(1000, 1000));
    assert.throws(() => createEditorTable(1.5, 2));
  } finally {
    s.dispose();
  }
});

test('HTML mode is sanitized before preview and blank required rich text blocks submission', () => {
  const s = screen('contents');
  try {
    mountRichText(s.root, s.abort.signal, false);
    fillFields(s.root, { body: '<p>متن</p>' });
    const source = s.root.querySelector<HTMLTextAreaElement>('[data-field="body"]')!;
    const wrapper = source.closest('.portal-cms')!;
    click(wrapper, 'کد HTML');
    assert.equal(source.hidden, false);
    source.value =
      '<p>متن جدید</p><img src="https://images.example/one.jpg" onerror="alert(1)"><script>alert(1)</script>';
    click(wrapper, 'پیش‌نمایش');
    assert.doesNotMatch(source.value, /script|onerror/);
    assert.ok(wrapper.querySelector('.portal-cms-surface img'));
    fillFields(s.root, { body: '<p><br></p>' });
    assert.throws(() => validateRichText(s.root), /متن کامل/);
  } finally {
    s.dispose();
  }
});

test('CMS uploads an image once and embeds the returned public URL in the existing text', async () => {
  const s = screen('contents');
  const original = fetch;
  const calls: string[] = [];
  try {
    globalThis.fetch = async (_url, options) => {
      calls.push(options?.method ?? 'GET');
      return Response.json({
        success: true,
        data:
          options?.method === 'POST' ? { id: 81, url: 'https://images.example/fixture.webp' } : [],
      });
    };
    mountRichText(s.root, s.abort.signal, false);
    fillFields(s.root, { body: '<p>متن خبر</p>' });
    const wrapper = s.root.querySelector('[data-field="body"]')!.closest('.portal-cms')!;
    click(wrapper, 'تصویر');
    Object.defineProperty(wrapper.querySelector('[data-cms-file]'), 'files', {
      value: [new File(['fixture'], 'photo.png', { type: 'image/png' })],
    });
    change(wrapper.querySelector('[aria-label="توضیح تصویر"]')!, 'شرح عکس');
    click(wrapper, 'درج تصویر');
    click(wrapper, 'درج تصویر');
    for (let i = 0; i < 25; i++) await new Promise((resolve) => setImmediate(resolve));
    assert.equal(calls.filter((method) => method === 'POST').length, 1);
    assert.match(String(collectFields(s.root).body), /https:\/\/images.example\/fixture.webp/);
    assert.match(String(collectFields(s.root).body), /alt="شرح عکس"/);
  } finally {
    globalThis.fetch = original;
    s.dispose();
  }
});

test('the form builder adds, edits, reorders and removes typed fields without requiring JSON entry', () => {
  const s = screen('forms');
  try {
    mountFormBuilder(s.root, s.abort.signal);
    fillFields(s.root, { fields: [] });
    click(s.root, 'افزودن فیلد');
    change(s.root.querySelector('[data-builder-control="label"]')!, 'نام متقاضی');
    change(s.root.querySelector('[data-builder-control="key"]')!, 'applicant_name');
    click(s.root, 'افزودن فیلد');
    const cards = s.root.querySelectorAll('.portal-form-builder fieldset');
    change(cards[1].querySelector('[data-builder-control="type"]')!, 'select', 'change');
    change(s.root.querySelector('[data-builder-control="options"]')!, 'اول\nدوم');
    assert.doesNotThrow(() => validateFormBuilder(s.root));
    const values = collectFields(s.root).fields as {
      key: string;
      type: string;
      options: string[];
    }[];
    assert.equal(values[0].key, 'applicant_name');
    assert.equal(values[1].type, 'select');
    assert.deepEqual(values[1].options, ['اول', 'دوم']);
    click(s.root.querySelectorAll('.portal-form-builder fieldset')[1], 'بالاتر');
    assert.equal((collectFields(s.root).fields as { type: string }[])[0].type, 'select');
    click(s.root.querySelectorAll('.portal-form-builder fieldset')[0], 'حذف فیلد');
    assert.equal((collectFields(s.root).fields as unknown[]).length, 1);
    const source = s.root.querySelector<HTMLTextAreaElement>('[data-form-builder]')!;
    source.value =
      '[{"key":"same","label":"یک","type":"text"},{"key":"same","label":"دو","type":"text"}]';
    assert.throws(() => validateFormBuilder(s.root), /یکتا/);
  } finally {
    s.dispose();
  }
});

test('permission checkboxes preserve real permission keys and service steps use one item per line', () => {
  const roles = screen('roles');
  try {
    mountPermissionFields(roles.root, roles.abort.signal);
    fillFields(roles.root, { permissions: ['content.manage'] });
    assert.equal(roles.root.querySelectorAll('.portal-permission-choices input:checked').length, 1);
    const input = roles.root.querySelector<HTMLInputElement>(
      '.portal-permission-choices input[value="media.manage"]',
    )!;
    input.checked = true;
    input.dispatchEvent(new window.Event('change'));
    assert.deepEqual(collectFields(roles.root).permissions, ['content.manage', 'media.manage']);
    assert.equal(
      roles.root.querySelectorAll('.portal-permission-choices input').length,
      Object.keys(adminPermissions).length,
    );
  } finally {
    roles.dispose();
  }
  const services = screen('services');
  try {
    fillFields(services.root, { steps: ['ثبت درخواست', 'بررسی'], requirements: ['کارت ملی'] });
    assert.equal(
      services.root.querySelector<HTMLTextAreaElement>('[data-field="steps"]')!.value,
      'ثبت درخواست\nبررسی',
    );
    assert.deepEqual(collectFields(services.root).steps, ['ثبت درخواست', 'بررسی']);
  } finally {
    services.dispose();
  }
});

test('multiple tags and attachments retain their values when editing existing content', () => {
  const s = screen('contents');
  try {
    for (const field of ['tag_ids', 'media_ids']) {
      const select = s.root.querySelector<HTMLSelectElement>('[data-field="' + field + '"]')!;
      select.append(new Option('یک', '1'), new Option('دو', '2'));
    }
    fillFields(s.root, { tags: [{ id: 2 }], media: [{ id: 1 }] });
    assert.deepEqual(collectFields(s.root).tag_ids, [2]);
    assert.deepEqual(collectFields(s.root).media_ids, [1]);
  } finally {
    s.dispose();
  }
});

test('group and child links preserve real IDs and only numeric contextual filters are accepted', () => {
  assert.deepEqual(relatedAdminLinks('galleries', { id: 31 }), [
    { label: 'تصاویر گالری', href: '/panel/admin/gallery-items?gallery_id=31' },
  ]);
  assert.equal(
    relatedAdminLinks('polls', { id: 72 })[0].href,
    '/panel/admin/poll-options?poll_id=72',
  );
  assert.deepEqual(
    contextualFilters('?category_id=5&organization_id=8&poll_id=../2&token=secret'),
    { category_id: '5', organization_id: '8' },
  );
});

test('read-only relation lookups recover from a management permission denial without retrying other failures', async () => {
  const original = fetch;
  const calls: string[] = [];
  try {
    globalThis.fetch = async (url) => {
      calls.push(String(url));
      return calls.length === 1
        ? Response.json({ message: 'denied' }, { status: 403 })
        : Response.json({ success: true, data: [{ id: 5, name: 'واحد مجاز' }] });
    };
    const rows = await lookupRecords('organizations', new AbortController().signal);
    assert.equal(rows[0].id, 5);
    assert.ok(calls[1].startsWith('/api/backend/admin/lookups/organizations?'));
  } finally {
    globalThis.fetch = original;
  }
});

test('uploads enforce a proxy-safe file limit before attempting a request', async () => {
  await assert.rejects(
    prepareUpload(new File([new Uint8Array(4_000_001)], 'large.pdf', { type: 'application/pdf' })),
    /۴ مگابایت/,
  );
  const file = new File(['fixture'], 'small.pdf', { type: 'application/pdf' });
  assert.equal(await prepareUpload(file), file);
});
