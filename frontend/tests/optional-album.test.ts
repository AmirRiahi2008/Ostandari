import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { collectFields, fillFields } from '../src/features/admin/fields';
import { setOptions } from '../src/lib/dom';
import { createImageAlbum } from '../src/features/admin/image-album';
import { cleanEditorHtml, mountRichText, validateRichText } from '../src/features/admin/rich-text';

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
const tick = () => new Promise<void>((resolve) => setImmediate(resolve));
async function done(root: HTMLElement) {
  for (let i = 0; i < 60 && root.querySelector('[data-uploading="true"]'); i++) await tick();
  assert.equal(root.querySelector('[data-uploading="true"]'), null);
}
function click(root: ParentNode, label: string) {
  const button = Array.from(root.querySelectorAll('button')).find(
    (node) => node.textContent === label,
  );
  assert.ok(button, label);
  button.click();
}
function editor(preview = false) {
  const root = document.createElement('div');
  root.innerHTML = '<textarea data-field="body" data-rich-text required></textarea>';
  document.body.replaceChildren(root);
  const abort = new AbortController();
  mountRichText(root, abort.signal, preview);
  fillFields(root, {
    body: '<p>قبل <strong>بعد</strong></p><table><tr><td>جدول</td></tr></table>',
  });
  const source = root.querySelector<HTMLTextAreaElement>('textarea')!;
  const surface = root.querySelector<HTMLElement>('.portal-cms-surface')!;
  const range = document.createRange();
  range.setStart(surface.querySelector('p')!.firstChild!, 4);
  range.collapse(true);
  window.getSelection()!.removeAllRanges();
  window.getSelection()!.addRange(range);
  surface.dispatchEvent(new window.MouseEvent('mouseup'));
  return {
    root,
    source,
    surface,
    abort,
    dispose: () => {
      abort.abort();
      root.remove();
    },
  };
}
function choose(root: HTMLElement, files: File[]) {
  click(root, 'آلبوم تصاویر');
  const input = root.querySelector<HTMLInputElement>('[data-cms-album-file]')!;
  assert.equal(input.multiple, true);
  Object.defineProperty(input, 'files', { value: files, configurable: true });
  input.dispatchEvent(new window.Event('change'));
}
const images = () =>
  ['wide', 'portrait', 'seal'].map(
    (name) => new File(['fixture'], name + '.webp', { type: 'image/webp' }),
  );

test('empty optional multiselect placeholders stay empty and real selections keep their IDs', () => {
  const root = document.createElement('div');
  root.innerHTML =
    '<select data-field="tag_ids" multiple><option value="" selected>یک گزینه</option><option value="7">خبر</option></select><select data-field="media_ids" multiple><option value="" selected disabled>بدون مورد</option></select>';
  assert.deepEqual(collectFields(root), { tag_ids: [], media_ids: [] });
  root.querySelectorAll('option')[1].selected = true;
  assert.deepEqual(collectFields(root), { tag_ids: [7], media_ids: [] });
});

test('lookup refresh preserves all selections without auto-selecting a placeholder or first result', () => {
  const select = document.createElement('select');
  select.multiple = true;
  setOptions(select, [
    { id: 1, name: 'یک' },
    { id: 2, name: 'دو' },
  ]);
  assert.equal(select.selectedOptions.length, 0);
  for (const option of select.options) option.selected = true;
  setOptions(select, [
    { id: 2, name: 'دو تازه' },
    { id: 3, name: 'سه' },
  ]);
  assert.deepEqual(Array.from(select.selectedOptions, (option) => option.value).sort(), ['1', '2']);
  setOptions(select, []);
  assert.deepEqual(Array.from(select.selectedOptions, (option) => option.value).sort(), ['1', '2']);
  for (const option of select.options) option.selected = false;
  setOptions(select, []);
  assert.equal(select.selectedOptions.length, 0);
  assert.equal(select.options[0].disabled, true);
  const single = document.createElement('select');
  setOptions(single, [{ id: 2, name: 'دو' }]);
  assert.equal(single.value, '');
  single.value = '2';
  setOptions(single, [{ id: 2, name: 'دو تازه' }]);
  assert.equal(single.value, '2');
});

test('editing inline album images never turns them into public attachments', () => {
  const root = document.createElement('div');
  root.innerHTML =
    '<select multiple data-field="media_ids" data-lookup="media"></select><select multiple data-field="tag_ids" data-lookup="tags"></select>';
  fillFields(root, {
    media: [
      { id: 1, pivot: { purpose: 'inline' } },
      { id: 2, pivot: { purpose: 'attachment' } },
    ],
    tags: [{ id: 9 }],
  });
  assert.deepEqual(collectFields(root), { media_ids: [2], tag_ids: [9] });
  fillFields(root, { media_ids: [], tag_ids: [] });
  assert.deepEqual(collectFields(root), { media_ids: [], tag_ids: [] });
});

test('album layout and caption round-trip safely through editor sanitization', () => {
  const album = createImageAlbum(
    [{ url: '/storage/a.webp', alt: 'یک' }, { url: 'https://example.test/b.webp' }],
    2,
    '<script>شرح</script>',
  );
  const html = cleanEditorHtml(
    album.outerHTML.replace(
      'portal-image-album-item',
      'portal-image-album-item evil" onclick="alert(1)',
    ),
  );
  assert.match(html, /portal-image-album-columns-2/);
  assert.equal((html.match(/<img/g) ?? []).length, 2);
  assert.match(html, /&lt;script&gt;شرح/);
  assert.doesNotMatch(html, /onclick|class="[^"]*evil/);
  assert.equal(cleanEditorHtml(html), html);
  assert.throws(() => createImageAlbum([{ url: 'javascript:alert(1)' }]));
  assert.throws(() => createImageAlbum([]));
  assert.match(createImageAlbum([{ url: '/a.webp' }]).className, /columns-1/);
});

test('multiple uploads insert one ordered block album, preserve surrounding text/table and support undo/source/preview', async () => {
  const s = editor();
  const original = fetch;
  const calls: string[] = [];
  try {
    globalThis.fetch = async (_url, options) => {
      calls.push(
        (options!.body as FormData).get('file') instanceof File
          ? ((options!.body as FormData).get('file') as File).name
          : 'file',
      );
      assert.equal((options!.body as FormData).get('visibility'), 'public');
      return Response.json({
        success: true,
        data: { id: calls.length, url: '/storage/' + calls.length + '.webp' },
      });
    };
    choose(s.root, images());
    click(s.root, 'بارگذاری و درج آلبوم');
    click(s.root, 'بارگذاری و درج آلبوم');
    assert.throws(() => validateRichText(s.root), /بارگذاری/);
    await done(s.root);
    assert.deepEqual(calls, ['wide.webp', 'portrait.webp', 'seal.webp']);
    const album = s.surface.querySelector('.portal-image-album')!;
    assert.ok(album);
    assert.equal(album.parentElement, s.surface);
    assert.equal(s.surface.querySelector('table')!.textContent, 'جدول');
    assert.match(s.source.value, /قبل/);
    assert.match(s.source.value, /<strong>بعد/);
    assert.deepEqual(
      Array.from(album.querySelectorAll('img'), (node) => node.getAttribute('src')),
      ['/storage/1.webp', '/storage/2.webp', '/storage/3.webp'],
    );
    click(s.root, 'واگرد');
    assert.equal(s.surface.querySelector('.portal-image-album'), null);
    click(s.root, 'بازانجام');
    assert.ok(s.surface.querySelector('.portal-image-album'));
    click(s.root, 'کد HTML');
    click(s.root, 'پیش‌نمایش');
    assert.ok(s.surface.querySelector('.portal-image-album'));
    assert.doesNotThrow(() => validateRichText(s.root));
  } finally {
    globalThis.fetch = original;
    s.dispose();
  }
});

test('partial upload failure leaves content untouched and retry reuses completed uploads', async () => {
  const s = editor();
  const original = fetch;
  let calls = 0;
  let failure = true;
  try {
    globalThis.fetch = async () => {
      calls++;
      if (calls === 2 && failure) return Response.json({ message: 'قطع آزمایشی' }, { status: 503 });
      return Response.json({ success: true, data: { url: '/storage/' + calls + '.webp' } });
    };
    const before = s.source.value;
    choose(s.root, images());
    click(s.root, 'بارگذاری و درج آلبوم');
    await done(s.root);
    assert.equal(s.source.value, before);
    assert.match(s.root.querySelector('.portal-cms-status')!.textContent!, /ناقص درج نشد/);
    failure = false;
    click(s.root, 'بارگذاری و درج آلبوم');
    await done(s.root);
    assert.equal(calls, 4);
    assert.equal(s.surface.querySelectorAll('.portal-image-album img').length, 3);
  } finally {
    globalThis.fetch = original;
    s.dispose();
  }
});

test('late upload results cannot modify another record or an unmounted editor', async () => {
  const original = fetch;
  try {
    for (const abort of [false, true]) {
      const s = editor();
      let respond!: (response: Response) => void;
      globalThis.fetch = () =>
        new Promise<Response>((resolve) => {
          respond = resolve;
        });
      choose(s.root, [images()[0]]);
      click(s.root, 'بارگذاری و درج آلبوم');
      await tick();
      if (abort) s.abort.abort();
      else fillFields(s.root, { body: '<p>رکورد دیگر</p>' });
      respond(Response.json({ success: true, data: { url: '/storage/late.webp' } }));
      await tick();
      await tick();
      assert.equal(s.source.value.includes('late.webp'), false);
      s.dispose();
    }
  } finally {
    globalThis.fetch = original;
  }
});

test('invalid album inputs and preview mode never insert or send files', async () => {
  const original = fetch;
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    throw new Error('unexpected');
  };
  try {
    for (const [preview, files] of [
      [true, images()],
      [false, []],
      [false, Array.from({ length: 21 }, () => images()[0])],
      [false, [new File(['bad'], 'bad.svg', { type: 'image/svg+xml' })]],
      [false, [new File([new Uint8Array(4_000_001)], 'large.webp', { type: 'image/webp' })]],
    ] as [boolean, File[]][]) {
      const s = editor(preview);
      choose(s.root, files);
      click(s.root, 'بارگذاری و درج آلبوم');
      await done(s.root);
      assert.equal(s.surface.querySelector('.portal-image-album'), null);
      s.dispose();
    }
    assert.equal(calls, 0);
  } finally {
    globalThis.fetch = original;
  }
});
