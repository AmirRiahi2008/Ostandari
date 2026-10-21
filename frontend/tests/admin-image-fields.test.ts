import { adminController } from '../src/features/admin/controller';
import { resolveAdminEditor } from '../src/lib/admin-routes';
import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { JSDOM } from 'jsdom';
import { AdminResourceForm } from '../src/components/admin/resource-form';
import { mountImageFields } from '../src/features/admin/image-fields';
import { collectFields, fillFields } from '../src/features/admin/fields';
import { fieldError } from '../src/lib/dom';
import { ApiError } from '../src/lib/api/client';
import { HomeSlider } from '../src/components/site/home-slider';
import { adminModules } from '../src/data/admin/modules';

const browser = new JSDOM('', {
  url: 'https://portal.test/admin/slides/new',
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
  'Option',
  'AbortController',
  'AbortSignal',
] as const)
  Object.defineProperty(globalThis, name, {
    value: name === 'window' ? browser : browser[name],
    configurable: true,
  });
const originalFetch = globalThis.fetch;
function fixture(resource = 'slides', preview = false) {
  const root = document.createElement('div');
  root.innerHTML = renderToStaticMarkup(React.createElement(AdminResourceForm, { resource }));
  document.body.replaceChildren(root);
  const abort = new AbortController();
  const fields = mountImageFields(root, abort.signal, preview);
  return {
    root,
    fields,
    abort,
    close() {
      abort.abort();
      root.remove();
      globalThis.fetch = originalFetch;
    },
  };
}
const file = (name = 'photo.png', type = 'image/png') => new File(['fixture'], name, { type });
function pick(root: HTMLElement, field: string, selected: File) {
  const input = root.querySelector<HTMLInputElement>('[data-image-upload="' + field + '"]')!;
  Object.defineProperty(input, 'files', { value: [selected], configurable: true });
  input.dispatchEvent(new window.Event('change', { bubbles: true }));
  return input;
}
const response = (id: number) =>
  Response.json({
    success: true,
    data: { id, url: '/uploads/' + id + '.webp', original_name: id + '.webp' },
  });

test('each image relation has a direct picker and the existing library is optional', () => {
  for (const [resource, relations] of [
    ['slides', ['media_id']],
    ['contents', ['cover_media_id']],
    ['organizations', ['banner_media_id', 'aerial_media_id']],
    ['gallery-items', ['media_id']],
  ] as const) {
    const f = fixture(resource);
    try {
      for (const field of relations) {
        assert.ok(f.root.querySelector('[data-image-upload="' + field + '"]'));
        assert.equal(
          f.root.querySelector<HTMLSelectElement>('[data-field="' + field + '"]')!.required,
          false,
        );
      }
      assert.equal(
        f.root.querySelectorAll('input[data-media-field]:not([data-image-upload])').length,
        0,
      );
    } finally {
      f.close();
    }
  }
});
test('selecting an image immediately uploads public media and save readiness reuses it', async () => {
  const f = fixture();
  let count = 0;
  globalThis.fetch = async (url, options) => {
    count++;
    assert.equal(url, '/api/backend/media');
    assert.equal((options?.body as FormData).get('visibility'), 'public');
    return response(81);
  };
  try {
    pick(f.root, 'media_id', file());
    await f.fields.ready();
    assert.equal(count, 1);
    assert.equal(collectFields(f.root).media_id, 81);
    assert.equal(f.root.querySelector<HTMLElement>('[data-image-preview]')!.hidden, false);
    await f.fields.ready();
    assert.equal(count, 1);
  } finally {
    f.close();
  }
});
test('simultaneous county banner and aerial uploads retain their own relation in reverse completion order', async () => {
  const f = fixture('organizations');
  const pending: Array<(response: Response) => void> = [];
  globalThis.fetch = () => new Promise((resolve) => pending.push(resolve));
  try {
    pick(f.root, 'banner_media_id', file('banner.png'));
    pick(f.root, 'aerial_media_id', file('aerial.png'));
    await Promise.resolve();
    await Promise.resolve();
    assert.equal(pending.length, 2);
    pending[1](response(92));
    pending[0](response(91));
    await f.fields.ready();
    const data = collectFields(f.root);
    assert.equal(data.banner_media_id, 91);
    assert.equal(data.aerial_media_id, 92);
  } finally {
    f.close();
  }
});
test('upload failure retains the existing image, prevents saving, and explicit retry succeeds', async () => {
  const f = fixture();
  let attempts = 0;
  globalThis.fetch = async () =>
    ++attempts === 1 ? Response.json({ message: 'خطای بارگذاری' }, { status: 503 }) : response(82);
  try {
    fillFields(f.root, { media_id: 10, image: { id: 10, url: '/uploads/10.webp' } });
    pick(f.root, 'media_id', file());
    await assert.rejects(f.fields.ready(), /خطای بارگذاری/);
    assert.equal(collectFields(f.root).media_id, 10);
    await assert.rejects(f.fields.ready());
    assert.equal(attempts, 1);
    f.root.querySelector<HTMLButtonElement>('[data-image-retry]')!.click();
    await f.fields.ready();
    assert.equal(attempts, 2);
    assert.equal(collectFields(f.root).media_id, 82);
  } finally {
    f.close();
  }
});
test('choosing an existing library image during upload ignores the old result', async () => {
  const f = fixture();
  let finish!: (response: Response) => void;
  globalThis.fetch = () =>
    new Promise((resolve) => {
      finish = resolve;
    });
  try {
    pick(f.root, 'media_id', file());
    await Promise.resolve();
    await Promise.resolve();
    const select = f.root.querySelector<HTMLSelectElement>('[data-image-value]')!;
    select.add(new Option('قبلی', '7'));
    select.value = '7';
    select.dispatchEvent(new window.Event('change'));
    finish(response(83));
    await Promise.resolve();
    await Promise.resolve();
    assert.equal(collectFields(f.root).media_id, 7);
  } finally {
    f.close();
  }
});
test('unsupported files and preview mode never upload and do not leave readiness pending', async () => {
  for (const preview of [false, true]) {
    const f = fixture('slides', preview);
    let writes = 0;
    globalThis.fetch = async () => {
      writes++;
      return response(8);
    };
    try {
      pick(f.root, 'media_id', preview ? file() : file('bad.svg', 'image/svg+xml'));
      await assert.rejects(f.fields.ready());
      assert.equal(writes, 0);
      assert.equal(f.root.querySelector('[aria-busy]'), null);
    } finally {
      f.close();
    }
  }
});
test('required gallery images focus their visible picker and removal only unlinks the image', async () => {
  const f = fixture('gallery-items');
  try {
    assert.throws(() => f.fields.validate(), /تصویر/);
    assert.equal(document.activeElement, f.root.querySelector('[data-image-upload]'));
    fillFields(f.root, { media_id: 9 });
    f.fields.validate();
    f.root.querySelector<HTMLButtonElement>('[data-image-remove]')!.click();
    assert.equal(collectFields(f.root).media_id, null);
    assert.throws(() => f.fields.validate());
  } finally {
    f.close();
  }
});
test('aborting a form ignores a late upload result and rejects saving a closed form', async () => {
  const f = fixture();
  let finish!: (response: Response) => void;
  globalThis.fetch = () =>
    new Promise((resolve) => {
      finish = resolve;
    });
  try {
    pick(f.root, 'media_id', file());
    await Promise.resolve();
    await Promise.resolve();
    f.abort.abort();
    finish(response(84));
    await assert.rejects(f.fields.ready(), /بسته/);
    assert.equal(collectFields(f.root).media_id, null);
  } finally {
    f.close();
  }
});
test('image-only slides render the image without an invented link and the unused subtitle is absent', () => {
  const html = renderToStaticMarkup(
    React.createElement(HomeSlider, { slides: [{ id: '1', title: '', image: '/slides/a.webp' }] }),
  );
  const node = document.createElement('div');
  node.innerHTML = html;
  assert.ok(node.querySelector('img[src="/slides/a.webp"]'));
  assert.equal(node.querySelector('.source-slide-link')?.tagName, 'DIV');
  const f = fixture();
  try {
    assert.equal(f.root.querySelector('[data-field="subtitle"]'), null);
    assert.equal(f.root.querySelector<HTMLInputElement>('[data-field="title"]')!.required, false);
  } finally {
    f.close();
  }
});
test('modules explain their purpose and field errors open optional fields and focus the input', () => {
  for (const module of adminModules) {
    assert.ok(module.itemName);
    assert.ok(module.description.length > 20);
    assert.ok(!module.description.startsWith('فهرست، افزودن'));
  }
  const f = fixture();
  try {
    const title = f.root.querySelector<HTMLInputElement>('[data-field="title"]')!;
    fieldError(
      f.root,
      new ApiError('عنوان نیاز به اصلاح دارد', 422, { title: ['عنوان طولانی است'] }),
    );
    assert.equal(title.closest('details')?.open, true);
    assert.equal(document.activeElement, title);
    assert.equal(title.getAttribute('aria-invalid'), 'true');
    fieldError(f.root, new Error('خطای بعدی'));
    assert.equal(title.getAttribute('aria-invalid'), null);
  } finally {
    f.close();
  }
});

test('saving an incomplete editor validates required fields before disabling its fieldset', async () => {
  const f = fixture('contents');
  let writes = 0;
  globalThis.fetch = async () => {
    writes++;
    return response(90);
  };
  try {
    const form = f.root.querySelector('form')!;
    const section = document.createElement('section');
    section.dataset.adminRecordEditor = 'true';
    const fieldset = document.createElement('fieldset');
    fieldset.dataset.editorFields = 'true';
    fieldset.append(form);
    section.append(fieldset);
    f.root.append(section);
    fillFields(section, { type: 'news', body: 'متن خبر' });
    const route = resolveAdminEditor('/panel/admin/news/new')!;
    const page = {
      ...route.page,
      editor: { mode: 'create' as const, returnTo: '/panel/admin/news' },
    };
    const controller = adminController({
      root: f.root,
      page,
      path: '/panel/admin/news/new',
      preview: false,
      signal: f.abort.signal,
    });
    await controller.dispatch('saveRecord', document.createElement('button'));
    assert.equal(writes, 0);
    assert.equal(fieldset.disabled, false);
    assert.equal(
      f.root.querySelector<HTMLInputElement>('[data-field="title"]')!.validity.valueMissing,
      true,
    );
  } finally {
    f.close();
  }
});
