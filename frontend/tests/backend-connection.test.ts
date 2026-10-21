import test from 'node:test';
import assert from 'node:assert/strict';
import { NextRequest } from 'next/server';
import {
  BackendError,
  backendRequest,
  backendUrl,
  type BackendPolicy,
} from '../src/lib/api/backend';
import { forward, SESSION_COOKIE } from '../src/lib/api/proxy';
import { validAdminSession } from '../src/lib/auth/admin-session';
import { api, ApiError } from '../src/lib/api/client';

const fast: BackendPolicy = { totalMs: 100, attemptMs: 25, attempts: 3, delayMs: 1 };
const json = (data: unknown, status = 200) => Response.json(data, { status });
const staff = {
  success: true,
  data: { id: 1, person_type: 'staff', is_active: true, role: { permissions: ['content.manage'] } },
};

async function mockFetch(action: typeof fetch, check: () => Promise<void>) {
  const original = globalThis.fetch;
  const warn = console.warn;
  globalThis.fetch = action;
  console.warn = () => {};
  try {
    await check();
  } finally {
    globalThis.fetch = original;
    console.warn = warn;
  }
}

test('backend URLs trim environment whitespace and preserve the API prefix and filters', () => {
  const original = process.env.BACKEND_URL;
  const vercel = process.env.VERCEL;
  try {
    process.env.BACKEND_URL = ' https://backend.example/api/v1/// ';
    assert.equal(
      backendUrl('admin/contents?q=%D8%AE%D8%A8%D8%B1&page=2').href,
      'https://backend.example/api/v1/admin/contents?q=%D8%AE%D8%A8%D8%B1&page=2',
    );
    for (const value of [
      'https://user:password@backend.example/api/v1',
      'ftp://backend.example',
      'https://backend.example/api/v1?key=value',
      'not-a-url',
    ]) {
      process.env.BACKEND_URL = value;
      assert.throws(
        () => backendUrl('auth/me'),
        (e: unknown) => e instanceof BackendError && e.code === 'BACKEND_CONFIG_ERROR',
      );
    }
    delete process.env.BACKEND_URL;
    process.env.VERCEL = '1';
    assert.throws(() => backendUrl('auth/me'), BackendError);
    delete process.env.VERCEL;
    assert.equal(backendUrl('auth/me').href, 'http://127.0.0.1:8000/api/v1/auth/me');
    for (const endpoint of [
      '../secret',
      '/panel/admin',
      'https://evil.example/',
      '//evil.example/',
      'admin\\path',
    ])
      assert.throws(() => backendUrl(endpoint), BackendError);
  } finally {
    if (original === undefined) delete process.env.BACKEND_URL;
    else process.env.BACKEND_URL = original;
    if (vercel === undefined) delete process.env.VERCEL;
    else process.env.VERCEL = vercel;
  }
});

test('a safe read recovers from a dropped connection and temporary upstream unavailability', async () => {
  let calls = 0;
  await mockFetch(
    async (_url, options) => {
      calls++;
      assert.equal(options?.cache, 'no-store');
      assert.equal(options?.redirect, 'manual');
      if (calls === 1)
        throw Object.assign(new TypeError('fetch failed'), { cause: { code: 'ECONNRESET' } });
      return calls === 2 ? json({ message: 'unavailable' }, 503) : json(staff);
    },
    async () => {
      const { response } = await backendRequest('auth/me', {}, fast);
      assert.deepEqual(await response.json(), staff);
      assert.equal(calls, 3);
    },
  );
});

test('body read failures are covered by the same bounded read retry', async () => {
  let calls = 0;
  await mockFetch(
    async () => {
      calls++;
      const response = json(staff);
      if (calls === 1)
        response.arrayBuffer = async () => {
          throw new TypeError('connection reset while reading');
        };
      return response;
    },
    async () => {
      assert.equal((await backendRequest('auth/me', {}, fast)).response.status, 200);
      assert.equal(calls, 2);
    },
  );
});

test('login, OTP, uploads, replies and other writes are never automatically replayed', async () => {
  for (const [method, endpoint] of [
    ['POST', 'auth/login'],
    ['POST', 'auth/otp/verify'],
    ['POST', 'media'],
    ['POST', 'admin/reports/REF/messages'],
    ['PATCH', 'admin/contents/2'],
    ['PUT', 'admin/settings'],
    ['DELETE', 'admin/contents/2'],
  ]) {
    let calls = 0;
    await mockFetch(
      async (_url, options) => {
        calls++;
        assert.equal(options?.body, 'original body');
        throw new TypeError('fetch failed');
      },
      async () => {
        await assert.rejects(
          backendRequest(endpoint, { method, body: 'original body' }, fast),
          BackendError,
        );
        assert.equal(calls, 1, method + ' ' + endpoint);
      },
    );
    calls = 0;
    await mockFetch(
      async () => {
        calls++;
        return json({ message: 'temporarily unavailable' }, 503);
      },
      async () => {
        assert.equal((await backendRequest(endpoint, { method }, fast)).response.status, 503);
        assert.equal(calls, 1);
      },
    );
  }
});

test('credential, permission, validation, rate limit and certificate failures are not retried', async () => {
  for (const status of [401, 403, 404, 409, 422, 429, 500]) {
    let calls = 0;
    await mockFetch(
      async () => {
        calls++;
        return json({ message: 'fixture' }, status);
      },
      async () => {
        assert.equal((await backendRequest('auth/me', {}, fast)).response.status, status);
        assert.equal(calls, 1);
      },
    );
  }
  let calls = 0;
  await mockFetch(
    async () => {
      calls++;
      throw Object.assign(new Error('fixture'), { cause: { code: 'CERT_HAS_EXPIRED' } });
    },
    async () => {
      await assert.rejects(backendRequest('auth/me', {}, fast));
      assert.equal(calls, 1);
    },
  );
});

test('timeout covers waiting for a response body and has a finite total budget', async () => {
  let calls = 0;
  await mockFetch(
    async () => {
      calls++;
      const response = json(staff);
      response.arrayBuffer = () => new Promise(() => {});
      return response;
    },
    async () => {
      await assert.rejects(
        backendRequest('auth/me', {}, { ...fast, totalMs: 45, attemptMs: 15 }),
        (e: unknown) =>
          e instanceof BackendError && e.code === 'BACKEND_TIMEOUT' && e.status === 504,
      );
      assert.ok(calls >= 1 && calls <= 3);
    },
  );
});

test('a disconnected client cancels upstream work without retries', async () => {
  const abort = new AbortController();
  let calls = 0;
  await mockFetch(
    async () => {
      calls++;
      abort.abort();
      return json(staff);
    },
    async () => {
      await assert.rejects(
        backendRequest('auth/me', { signal: abort.signal }, fast),
        (e: unknown) => e instanceof BackendError && e.status === 499,
      );
      assert.equal(calls, 1);
    },
  );
});

test('temporary session checks recover; exhausted failures never redirect or grant access', async () => {
  let calls = 0;
  await mockFetch(
    async () => {
      calls++;
      return calls === 1 ? json({}, 503) : json(staff);
    },
    async () => {
      assert.equal(await validAdminSession('fixture-token', fast), true);
      assert.equal(calls, 2);
    },
  );
  for (const status of [503, 429])
    await mockFetch(
      async () => json({}, status),
      async () => {
        await assert.rejects(validAdminSession('fixture-token', fast), BackendError);
      },
    );
  for (const status of [401, 403])
    await mockFetch(
      async () => json({ message: 'unauthenticated' }, status),
      async () => {
        assert.equal(await validAdminSession('fixture-token', fast), false);
      },
    );
  await mockFetch(
    async () => json({ success: true, data: { ...staff.data, person_type: 'citizen' } }),
    async () => {
      assert.equal(await validAdminSession('fixture-token', fast), false);
    },
  );
});

test('HTML errors and malformed login responses preserve the current session and return a request ID', async () => {
  for (const upstream of [
    () => new Response('<html>gateway error</html>', { status: 401 }),
    () => json({ success: true, data: {} }),
  ]) {
    await mockFetch(
      async () => upstream(),
      async () => {
        const response = await forward(
          new NextRequest('https://portal.example/api/backend/auth/login', {
            method: 'POST',
            headers: { origin: 'https://portal.example', cookie: SESSION_COOKIE + '=existing' },
            body: '{}',
          }),
          ['auth', 'login'],
        );
        assert.equal(response.status, 502);
        assert.equal(response.headers.get('set-cookie'), null);
        assert.equal(response.headers.get('cache-control'), 'no-store');
        const data = await response.json();
        assert.equal(data.code, 'BACKEND_INVALID_RESPONSE');
        assert.equal(data.request_id, response.headers.get('x-request-id'));
      },
    );
  }
});

test('downloads retain their bytes and disposition while JSON validation remains readable', async () => {
  await mockFetch(
    async () =>
      new Response(new Uint8Array([0, 255, 1, 2]), {
        headers: {
          'content-type': 'application/pdf',
          'content-disposition': 'attachment; filename="fixture.pdf"',
        },
      }),
    async () => {
      const response = await forward(
        new NextRequest('https://portal.example/api/backend/media/2/download'),
        ['media', '2', 'download'],
      );
      assert.equal(response.headers.get('content-type'), 'application/pdf');
      assert.match(response.headers.get('content-disposition')!, /fixture.pdf/);
      assert.deepEqual([...new Uint8Array(await response.arrayBuffer())], [0, 255, 1, 2]);
    },
  );
  await mockFetch(
    async () => json({ message: 'validation', errors: { title: ['عنوان را وارد کنید'] } }, 422),
    async () => {
      const response = await forward(
        new NextRequest('https://portal.example/api/backend/admin/news', {
          method: 'POST',
          body: '{}',
        }),
        ['admin', 'news'],
      );
      assert.equal(response.status, 422);
      assert.equal((await response.json()).errors.title[0], 'عنوان را وارد کنید');
    },
  );
});

test('transport diagnostics omit passwords, credentials, raw exception text and search data', async () => {
  const logs: string[] = [];
  await mockFetch(
    async () => {
      throw new Error('secret-token private-password personal-search');
    },
    async () => {
      console.warn = (line: string) => logs.push(line);
      await assert.rejects(
        backendRequest(
          'admin/users?q=personal-search',
          {
            method: 'POST',
            headers: { Authorization: 'Bearer secret-token' },
            body: 'private-password',
          },
          fast,
        ),
      );
      assert.equal(logs.length, 1);
      assert.doesNotMatch(logs.join(''), /secret-token|private-password|personal-search|Bearer/);
      assert.match(logs[0], /request_id/);
    },
  );
});

test('browser fetch failure is classified without replaying writes or swallowing cancellation', async () => {
  let calls = 0;
  await mockFetch(
    async () => {
      calls++;
      throw new TypeError('Failed to fetch');
    },
    async () => {
      await assert.rejects(
        api('auth/login', { method: 'POST', body: '{}' }),
        (e: unknown) => e instanceof ApiError && e.code === 'NETWORK_ERROR' && e.status === 0,
      );
      assert.equal(calls, 1);
      const abort = new AbortController();
      abort.abort();
      await assert.rejects(
        api('auth/me', { signal: abort.signal }),
        (e: unknown) => !(e instanceof ApiError),
      );
    },
  );
});
