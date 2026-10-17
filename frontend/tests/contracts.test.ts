import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { templates, resolveTemplate } from '../src/lib/templates';
import { templateViews } from '../src/views';
import { validPath, hasValidOrigin, forward, SESSION_COOKIE } from '../src/lib/api/proxy';
import { NextRequest } from 'next/server';
import { safeReturn } from '../src/features/auth/controller';
import { templatePreview } from '../src/lib/config';

test('every original file in both supplied ZIPs is present with its original bytes', () => {
  const verified = JSON.parse(
    execFileSync(process.execPath, ['scripts/verify-designs.mjs'], { encoding: 'utf8' }),
  );
  assert.equal(verified.files, 664);
  assert.deepEqual(verified.archives, ['ostandari-website.zip', 'panel-admin-ostandari.zip']);
});

test('an unconfigured local checkout opens the designs without a Laravel dependency', () => {
  assert.equal(templatePreview(''), true);
  assert.equal(templatePreview('true'), true);
  assert.equal(templatePreview('false'), false);
  assert.equal(templatePreview(' FALSE '), false);
});

test('the two supplied archives map to 70 distinct routes', () => {
  assert.equal(templates.length, 70);
  assert.equal(new Set(templates.map((page) => page.path)).size, 70);
  assert.equal(resolveTemplate('/')?.source, 'asli.html');
  assert.equal(resolveTemplate('/pages/khadamatelectronic.htm')?.path, '/services');
  assert.equal(resolveTemplate('/admin/karbaran-daron.html')?.path, '/admin/internal-users');
  assert.equal(resolveTemplate('/news/23')?.path, '/news');
  assert.equal(resolveTemplate('/unprovided-page'), undefined);
});

test('the supplied embedded citizen, gallery and admin form styles survive conversion', () => {
  const tasks = JSON.parse(fs.readFileSync('scripts/design-css.json', 'utf8')) as {
    scope: string;
    inline: string;
  }[];
  const styles = (route: string) =>
    tasks.find((task) => task.scope === resolveTemplate(route)?.scope)?.inline ?? '';
  assert.ok(styles('/citizen').length > 35000);
  assert.match(styles('/citizen'), /\.poll-opt/);
  assert.match(styles('/citizen'), /\.screen/);
  assert.match(styles('/gallery'), /\.gal-/);
  assert.ok(styles('/admin/internal-users').length > 4000);
});

for (const page of templates) {
  test('renders original template: ' + page.source, () => {
    const View = templateViews[page.id as keyof typeof templateViews];
    const html = renderToStaticMarkup(React.createElement(View));
    assert.ok(html.length > 100);
    assert.ok(!/<script\b|\son(?:click|input|load|error)=/i.test(html));
    assert.ok(!/<iframe\b/i.test(html));
    assert.ok(fs.existsSync(path.join('public', page.css)));
    for (const match of html.matchAll(/(?:src|href)="(\/design\/[^"]+)"/g)) {
      const asset = decodeURIComponent(match[1].split('?')[0]);
      assert.ok(fs.existsSync(path.join('public', asset)), asset);
    }
  });
}

test('the backend proxy rejects traversal, unknown endpoints and cross-origin writes', () => {
  assert.equal(validPath(['admin', 'faqs']), true);
  assert.equal(validPath(['media', '20', 'download']), true);
  for (const segments of [
    ['..', 'secrets'],
    ['admin', '..'],
    ['anything', 'x'],
    ['auth', 'https://evil.invalid'],
    ['media', '%2e%2e'],
  ])
    assert.equal(validPath(segments), false);
  assert.equal(
    hasValidOrigin(
      new Request('http://localhost:3000/api/backend/contact', {
        method: 'POST',
        headers: { origin: 'https://evil.invalid' },
      }),
    ),
    false,
  );
  assert.equal(
    hasValidOrigin(
      new Request('http://localhost:3000/api/backend/contact', {
        method: 'POST',
        headers: { origin: 'http://localhost:3000' },
      }),
    ),
    true,
  );
  assert.equal(
    hasValidOrigin(
      new NextRequest('http://127.0.0.1:3000/api/backend/contact', {
        method: 'POST',
        headers: { origin: 'http://127.0.0.1:3000', host: '127.0.0.1:3000' },
      }),
    ),
    true,
  );
  assert.equal(safeReturn('//evil.invalid'), '/admin');
  assert.equal(safeReturn('/admin/faqs'), '/admin/faqs');
  assert.equal(safeReturn('/\\evil.invalid'), '/admin');
});

test('login stores a private session cookie and removes bearer tokens from the response', async () => {
  const saved = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        success: true,
        data: { token: '12|private-token', expires_in: 3600, user: { id: 1 } },
      }),
      { headers: { 'content-type': 'application/json' } },
    );
  try {
    const request = new NextRequest('http://localhost:3000/api/backend/auth/login', {
      method: 'POST',
      headers: { origin: 'http://localhost:3000', 'content-type': 'application/json' },
      body: '{}',
    });
    const response = await forward(request, ['auth', 'login']);
    const body = await response.json();
    assert.equal(body.data.token, undefined);
    assert.equal(body.data.user.id, 1);
    const cookie = response.headers.get('set-cookie') ?? '';
    assert.match(cookie, /HttpOnly/i);
    assert.match(cookie, /SameSite=lax/i);
    assert.match(cookie, new RegExp(SESSION_COOKIE));
    assert.equal(response.headers.get('cache-control'), 'no-store');
  } finally {
    globalThis.fetch = saved;
  }
});

test('authenticated proxy requests forward only the bearer and required headers', async () => {
  const saved = globalThis.fetch;
  let upstream: RequestInit | undefined;
  globalThis.fetch = async (_input, options) => {
    upstream = options;
    return new Response(JSON.stringify({ success: true, data: [] }));
  };
  try {
    const request = new NextRequest('http://localhost:3000/api/backend/admin/faqs', {
      headers: { cookie: SESSION_COOKIE + '=12%7Cprivate-token; unrelated=secret' },
    });
    await forward(request, ['admin', 'faqs']);
    const headers = new Headers(upstream?.headers);
    assert.equal(headers.get('authorization'), 'Bearer 12|private-token');
    assert.equal(headers.get('cookie'), null);
  } finally {
    globalThis.fetch = saved;
  }
});

test('logout and expired sessions clear the cookie; unavailable backends return a controlled 503', async () => {
  const saved = globalThis.fetch;
  try {
    globalThis.fetch = async () => new Response(null, { status: 204 });
    const logout = await forward(
      new NextRequest('http://localhost:3000/api/backend/auth/logout', { method: 'POST' }),
      ['auth', 'logout'],
    );
    assert.equal(logout.status, 204);
    assert.match(logout.headers.get('set-cookie') ?? '', /Max-Age=0|1970/i);
    globalThis.fetch = async () => new Response('{}', { status: 401 });
    const expired = await forward(new NextRequest('http://localhost:3000/api/backend/auth/me'), [
      'auth',
      'me',
    ]);
    assert.equal(expired.status, 401);
    assert.match(expired.headers.get('set-cookie') ?? '', /Max-Age=0|1970/i);
    globalThis.fetch = async () => {
      throw new Error('offline');
    };
    const offline = await forward(new NextRequest('http://localhost:3000/api/backend/home'), [
      'home',
    ]);
    assert.equal(offline.status, 503);
    assert.equal((await offline.json()).success, false);
  } finally {
    globalThis.fetch = saved;
  }
});
