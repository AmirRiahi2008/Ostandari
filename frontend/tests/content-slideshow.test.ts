import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { JSDOM } from 'jsdom';
import { AdminResourceForm } from '../src/components/admin/resource-form';
import { collectFields, fillFields } from '../src/features/admin/fields';
import { mountRichText } from '../src/features/admin/rich-text';

const win = new JSDOM('', { url: 'https://portal.example/admin/news/new', pretendToBeVisual: true })
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
  'CustomEvent',
  'DOMParser',
  'AbortController',
  'AbortSignal',
] as const)
  Object.defineProperty(globalThis, name, {
    value: name === 'window' ? win : win[name],
    configurable: true,
  });

for (const type of ['news', 'announcement', 'resolution', 'event', 'document']) {
  test(
    type + ' editor exposes an opt-in slideshow checkbox and preserves both boolean values on edit',
    () => {
      document.body.innerHTML = renderToStaticMarkup(
        React.createElement(AdminResourceForm, { resource: 'contents', defaults: { type } }),
      );
      const form = document.querySelector('form')!;
      const flag = form.querySelector<HTMLInputElement>('[data-field="show_in_slideshow"]')!;
      assert.ok(flag);
      assert.equal(flag.type, 'checkbox');
      assert.equal(flag.checked, false);
      assert.equal(collectFields(form).show_in_slideshow, false);
      fillFields(form, { show_in_slideshow: true });
      assert.equal(flag.checked, true);
      assert.equal(collectFields(form).show_in_slideshow, true);
      fillFields(form, { show_in_slideshow: false });
      assert.equal(collectFields(form).show_in_slideshow, false);
      assert.match(flag.closest('label')?.textContent ?? '', /جزئیات همین مطلب/);
      assert.ok(form.querySelector('[data-image-upload="cover_media_id"]'));
      const abort = new win.AbortController();
      mountRichText(form, abort.signal, true);
      assert.ok(form.querySelector('.portal-cms-surface'));
      assert.ok(form.querySelector('textarea[data-rich-text][hidden]'));
      assert.ok(form.querySelector('.portal-cms-toolbar button'));
      abort.abort();
    },
  );
}
