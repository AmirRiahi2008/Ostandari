import { NextRequest, NextResponse } from 'next/server';

export const SESSION_COOKIE = 'ostandari_session';
const ALLOWED = new Set([
  'auth',
  'admin',
  'citizen',
  'health',
  'home',
  'news',
  'announcements',
  'resolutions',
  'contents',
  'categories',
  'counties',
  'organizations',
  'members',
  'menus',
  'services',
  'links',
  'faqs',
  'quotes',
  'galleries',
  'polls',
  'forms',
  'documents',
  'publications',
  'tenders',
  'contracts',
  'calls',
  'events',
  'duties',
  'pages',
  'portals',
  'contact',
  'assistant',
  'newsletter',
  'media',
  'search',
  'settings',
]);
const AUTH_PATHS = new Set(['auth/login', 'auth/otp/verify', 'auth/token/rotate']);

export function validPath(parts: string[]): boolean {
  return (
    parts.length > 0 &&
    parts.length <= 8 &&
    ALLOWED.has(parts[0]) &&
    parts.every((part) => /^[\p{L}\p{N}_-]+$/u.test(part) && part.length <= 255)
  );
}

export function hasValidOrigin(request: Request): boolean {
  if (['GET', 'HEAD', 'OPTIONS'].includes(request.method)) return true;
  const origin = request.headers.get('origin');
  const expected = new URL(request.url);
  const host = request.headers.get('host');
  if (host) {
    if (!/^[a-z0-9.\[\]:-]+$/i.test(host)) return false;
    expected.host = host;
  }
  return (
    (!origin || origin === expected.origin) &&
    !['cross-site'].includes(request.headers.get('sec-fetch-site') ?? '')
  );
}

export async function forward(request: NextRequest, parts: string[]): Promise<NextResponse> {
  if (!validPath(parts))
    return NextResponse.json({ success: false, message: 'مسیر پیدا نشد.' }, { status: 404 });
  if (!hasValidOrigin(request))
    return NextResponse.json(
      { success: false, message: 'مبدأ درخواست مجاز نیست.' },
      { status: 403 },
    );
  const base = process.env.BACKEND_URL ?? 'http://127.0.0.1:8000/api/v1';
  const url = new URL(
    parts.map(encodeURIComponent).join('/') + request.nextUrl.search,
    base.replace(/\/$/, '') + '/',
  );
  const headers = new Headers({ Accept: request.headers.get('accept') ?? 'application/json' });
  const contentType = request.headers.get('content-type');
  if (contentType) headers.set('Content-Type', contentType);
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (token) headers.set('Authorization', 'Bearer ' + token);
  try {
    const upstream = await fetch(url, {
      method: request.method,
      headers,
      body: ['GET', 'HEAD'].includes(request.method) ? undefined : await request.arrayBuffer(),
      cache: 'no-store',
      redirect: 'manual',
      signal: AbortSignal.timeout(20000),
    });
    const path = parts.join('/');
    let response: NextResponse;
    if (AUTH_PATHS.has(path) && upstream.ok) {
      const result = await upstream.json();
      const credential = result.data?.token;
      if (!credential)
        return NextResponse.json(
          { success: false, message: 'نشست معتبر دریافت نشد.' },
          { status: 502 },
        );
      delete result.data.token;
      response = NextResponse.json(result, { status: upstream.status });
      response.cookies.set(SESSION_COOKIE, credential, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.COOKIE_SECURE === 'true',
        path: '/',
        maxAge: Math.min(Number(result.data.expires_in) || 86400, 86400),
      });
    } else {
      response = new NextResponse(upstream.status === 204 ? null : await upstream.arrayBuffer(), {
        status: upstream.status,
      });
      for (const name of ['content-type', 'content-disposition', 'retry-after']) {
        const value = upstream.headers.get(name);
        if (value) response.headers.set(name, value);
      }
    }
    response.headers.set('Cache-Control', 'no-store');
    if (
      upstream.status === 401 ||
      (upstream.ok && ['auth/logout', 'auth/logout-all', 'auth/password'].includes(path))
    )
      response.cookies.delete(SESSION_COOKIE);
    return response;
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'اتصال به بک‌اند برقرار نشد. Laravel را روی آدرس BACKEND_URL اجرا کنید.',
      },
      { status: 503 },
    );
  }
}
