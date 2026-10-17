import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { JSDOM } from 'jsdom';
import { templates } from '../src/lib/templates';
import { templateViews } from '../src/views';
import { collectFields, fillFields } from '../src/features/admin/fields';
import { bindUi } from '../src/lib/alpine/ui';
import { siteController } from '../src/features/site/controller';
import { commandArgs, digits, setSafeHtml } from '../src/lib/dom';
import { bindAttachments } from '../src/features/citizen/attachments';
import { renderCitizenCatalog, renderPoll } from '../src/features/citizen/data';

const window = new JSDOM('', { url: 'http://localhost:3000', pretendToBeVisual: true }).window;
for (const name of [
  'window',
  'document',
  'HTMLElement',
  'HTMLInputElement',
  'HTMLSelectElement',
  'HTMLTextAreaElement',
  'DOMParser',
  'CustomEvent',
  'CSS',
  'MutationObserver',
  'Element',
  'Node',
  'ShadowRoot',
  'AbortController',
  'AbortSignal',
  'Option',
] as const) {
  Object.defineProperty(globalThis, name, {
    value: name === 'window' ? window : (window as unknown as Record<string, unknown>)[name],
    configurable: true,
  });
}

function pageRoot(route: string) {
  const page = templates.find((page) => page.path === route)!;
  const root = window.document.createElement('div');
  root.innerHTML = renderToStaticMarkup(
    React.createElement(templateViews[page.id as keyof typeof templateViews]),
  );
  window.document.body.replaceChildren(root);
  return { page, root: root as unknown as HTMLElement };
}

test('the supplied FAQ modal produces the Laravel request without duplicated input ID collisions', () => {
  const { root } = pageRoot('/admin/faqs');
  const modal = root.querySelector('#cbnCreateMenuModalOverlay')!;
  fillFields(modal, { locale: 'fa', priority: 2, question: 'پرسش اصلی', answer: 'پاسخ صحیح' });
  const fields = collectFields(modal);
  assert.equal(fields.question, 'پرسش اصلی');
  assert.equal(fields.answer, 'پاسخ صحیح');
  assert.equal(fields.priority, 2);
  assert.equal(fields.locale, 'fa');
});

test('the original slide modal keeps the title, subtitle and numeric priority independent', () => {
  const { root } = pageRoot('/admin/slides');
  const modal = root.querySelector('#cbnCreateMenuModalOverlay')!;
  fillFields(modal, { title: 'عنوان اصلی', subtitle: 'عنوان فرعی', priority: 3, locale: 'en' });
  const fields = collectFields(modal);
  assert.equal(fields.title, 'عنوان اصلی');
  assert.equal(fields.subtitle, 'عنوان فرعی');
  assert.equal(fields.priority, 3);
});

test('existing modal controls open, cancel and dispatch save through the same source markup', () => {
  const { root, page } = pageRoot('/admin/faqs');
  const abort = new AbortController();
  let action = '';
  bindUi({ root, page, preview: true, signal: abort.signal, path: page.path }, (command) => {
    action = command;
  });
  (root.querySelector('#cbnOpenCreateMenuModalBtn') as HTMLElement).click();
  assert.equal(
    root.querySelector('#cbnCreateMenuModalOverlay')?.classList.contains('active'),
    true,
  );
  (root.querySelector('#cbnSubmitCreateMenuBtn') as HTMLElement).click();
  assert.equal(action, 'saveRecord');
  abort.abort();
});

test('provided mobile accordion, app overlay and language dropdown preserve their original CSS states', () => {
  const { root, page } = pageRoot('/');
  const abort = new AbortController();
  const controller = siteController({ root, page, preview: true, signal: abort.signal, path: '/' });
  const button = root.querySelector<HTMLElement>('[data-command=mmToggle]')!;
  controller.dispatch('mmToggle', button, []);
  assert.equal(button.closest('.mm-item')?.classList.contains('is-open'), true);
  controller.init();
  (root.querySelector('#installAppBtn') as HTMLElement).click();
  assert.equal(root.querySelector('#installAppOverlay')?.classList.contains('open'), true);
  (root.querySelector('#flagSwitcher') as HTMLElement).click();
  assert.equal(root.querySelector('#flagDropdown')?.classList.contains('active'), true);
  abort.abort();
});

test('UI data handlers normalize Persian digits and never execute copied inline JavaScript', () => {
  assert.equal(digits('۱۲۳٤٥۶'), '123456');
  assert.deepEqual(commandArgs("this,'track',2"), ['track', '2']);
  const container = window.document.createElement('div');
  setSafeHtml(
    container as unknown as HTMLElement,
    '<script>alert(1)</script><p onclick="bad()">متن<img src="javascript:bad()"></p>',
  );
  assert.equal(container.querySelector('script'), null);
  assert.equal(container.querySelector('p')?.getAttribute('onclick'), null);
  assert.equal(container.querySelector('img')?.hasAttribute('src'), false);
  setSafeHtml(
    container as unknown as HTMLElement,
    '<p x-init="bad()" data-command="saveRecord"><a href="java&#10;script:bad()">متن</a></p>',
  );
  assert.equal(container.querySelector('p')?.hasAttribute('x-init'), false);
  assert.equal(container.querySelector('p')?.hasAttribute('data-command'), false);
  assert.equal(container.querySelector('a')?.hasAttribute('href'), false);
});

test('the existing upload box accepts private report images and clears its native input on disposal', () => {
  const { root } = pageRoot('/citizen');
  const abort = new AbortController();
  const attachment = bindAttachments(root, abort.signal);
  const box = root.querySelector('.upload-box')!;
  const image = new window.File(['image'], 'original.png', { type: 'image/png' });
  const transfer = { files: [image] };
  const event = new window.Event('drop', { bubbles: true, cancelable: true });
  Object.defineProperty(event, 'dataTransfer', { value: transfer });
  box.dispatchEvent(event);
  assert.equal(attachment.files()[0].name, 'original.png');
  assert.equal(box.querySelector('b')?.textContent, 'original.png');
  attachment.clear();
  assert.equal(attachment.files().length, 0);
  abort.abort();
  assert.equal(box.querySelector('input[type=file]'), null);
});

test('citizen API content replaces sample records while preserving FAQ icons and emergency links', () => {
  const { root } = pageRoot('/citizen');
  renderCitizenCatalog(
    root,
    [{ title: 'خبر پایگاه داده', excerpt: 'متن خبر' }],
    [{ question: 'پرسش واقعی', answer: '<b>پاسخ واقعی</b>' }],
    [{ name: 'سازمان واقعی', phone: '011-12345678' }],
  );
  assert.equal(root.querySelectorAll('#view-news .news-card').length, 1);
  assert.equal(root.querySelector('#view-news h4')?.textContent, 'خبر پایگاه داده');
  assert.equal(root.querySelector('.faq-q')?.textContent, 'پرسش واقعی');
  assert.ok(root.querySelector('.faq-q svg'));
  assert.equal(root.querySelector('.faq-a')?.textContent, 'پاسخ واقعی');
  assert.equal(root.querySelectorAll('#view-directory .dir-card.util').length, 1);
  assert.ok(root.querySelector('#view-directory a[href="tel:110"]'));
});

test('poll percentages are taken from the API result instead of the prototype data', () => {
  const { root } = pageRoot('/citizen');
  const poll = {
    question: 'سؤال اصلی',
    options: [
      { id: 71, title: 'گزینه اول', percentage: 80 },
      { id: 72, title: 'گزینه دوم', percentage: 20 },
    ],
  };
  renderPoll(root, poll);
  assert.equal(root.querySelector('.poll-opt .pct')?.textContent, '80%');
  assert.equal(root.querySelectorAll('.poll-opt').length, 2);
  assert.equal((root.querySelector('#poll-note') as HTMLElement).hidden, true);
  renderPoll(root, poll, true, 72);
  assert.equal(root.querySelector('.poll-opt.chosen')?.getAttribute('data-option'), '72');
  assert.equal((root.querySelector('.poll-fill') as HTMLElement).style.width, '80%');
  assert.equal((root.querySelector('#poll-note') as HTMLElement).hidden, false);
});

test('the provided gallery opens SVG media and its next/close controls work', () => {
  const { root, page } = pageRoot('/gallery');
  const abort = new AbortController();
  const controller = siteController({
    root,
    page,
    preview: true,
    signal: abort.signal,
    path: page.path,
  });
  controller.init();
  const items = root.querySelectorAll<HTMLElement>('.gal-item');
  assert.ok(items.length > 1);
  items[0].click();
  assert.equal(root.querySelector('#lightboxOverlay')?.classList.contains('active'), true);
  assert.ok(root.querySelector('#lightboxMedia img,#lightboxMedia svg,#lightboxMedia video'));
  (root.querySelector('#lightboxNext') as HTMLElement).click();
  assert.equal(
    root.querySelector('#lightboxCaption')?.textContent,
    items[1].querySelector('.gal-caption')?.textContent ?? items[1].textContent?.trim(),
  );
  (root.querySelector('#lightboxClose') as HTMLElement).click();
  assert.equal(root.querySelector('#lightboxOverlay')?.classList.contains('active'), false);
  abort.abort();
});

test('Alpine initializes the page once and disposes listeners when React unmounts the scope', async () => {
  const { mountPortal } = await import('../src/lib/alpine/runtime');
  const { root, page } = pageRoot('/admin/faqs');
  const dispose = mountPortal(root, { page, preview: true, path: page.path });
  await new Promise((resolve) => setTimeout(resolve, 100));
  assert.equal(root.getAttribute('x-data'), 'portalPage');
  assert.equal((root as unknown as { _x_dataStack: unknown[] })._x_dataStack.length, 1);
  (root.querySelector('#cbnOpenCreateMenuModalBtn') as HTMLElement).click();
  assert.equal(
    root.querySelector('#cbnCreateMenuModalOverlay')?.classList.contains('active'),
    true,
  );
  dispose();
  root.querySelector('#cbnCreateMenuModalOverlay')?.classList.remove('active');
  (root.querySelector('#cbnOpenCreateMenuModalBtn') as HTMLElement).click();
  assert.equal(
    root.querySelector('#cbnCreateMenuModalOverlay')?.classList.contains('active'),
    false,
  );
});
