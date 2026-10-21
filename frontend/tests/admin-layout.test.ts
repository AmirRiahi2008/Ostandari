import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { JSDOM } from 'jsdom';
import { AdminEditorPage } from '../src/components/admin/editor-page';
import { resolveAdminEditor } from '../src/lib/admin-routes';

test('the original fixed-height design gives long editor pages their own scroll area and readable navigation', () => {
  const path = '/panel/admin/news/new';
  const route = resolveAdminEditor(path)!;
  const window = new JSDOM(
    renderToStaticMarkup(React.createElement(AdminEditorPage, { path, route })),
  ).window;
  try {
    for (const file of [
      'public' + route.page.css,
      'src/styles/admin-cms.css',
      'src/styles/admin-pages.css',
    ]) {
      const style = window.document.createElement('style');
      style.textContent = fs.readFileSync(file, 'utf8');
      window.document.head.append(style);
    }
    const main = window.document.querySelector<HTMLElement>('main')!;
    const headerLink = window.document.querySelector<HTMLElement>('.portal-menu-home')!;
    assert.equal(window.getComputedStyle(main).overflow, 'auto');
    assert.equal(window.getComputedStyle(headerLink).color, 'rgb(255, 255, 255)');
    assert.equal(
      Number.parseFloat(
        window.getComputedStyle(window.document.querySelector('.sadyar-content')!).minHeight,
      ),
      0,
    );
    assert.ok(window.document.querySelector('#admin-record-form'));
    assert.ok(window.document.querySelector('[data-editor-save][form="admin-record-form"]'));
  } finally {
    window.close();
  }
});
