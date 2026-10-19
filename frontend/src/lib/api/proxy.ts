import { NextRequest, NextResponse } from 'next/server';
import { BackendError, backendJson, backendRequest } from './backend';

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
  'forum',
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
  const headers = new Headers({ Accept: request.headers.get('accept') ?? 'application/json' });
  const contentType = request.headers.get('content-type');
  if (contentType) headers.set('Content-Type', contentType);
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (token) headers.set('Authorization', 'Bearer ' + token);
  try {
    const { response: upstream, requestId } = await backendRequest(
      parts.map(encodeURIComponent).join('/') + request.nextUrl.search,
      {
        method: request.method,
        headers,
        body: ['GET', 'HEAD'].includes(request.method) ? undefined : await request.arrayBuffer(),
        signal: request.signal,
      },
    );
    const path = parts.join('/');
    if (upstream.status >= 300 && upstream.status < 400)
      throw new BackendError('BACKEND_INVALID_RESPONSE', 502, requestId);
    const download =
      (parts[0] === 'media' && parts[2] === 'download') ||
      (parts[0] === 'admin' && parts[1] === 'exports');
    const empty = request.method === 'HEAD' || [204, 205].includes(upstream.status);
    let result = empty || (download && upstream.ok) ? null : await backendJson(upstream, requestId);
    if (upstream.status >= 500)
      result = {
        success: false,
        message: new BackendError('BACKEND_UPSTREAM_ERROR', upstream.status).message,
        code: 'BACKEND_UPSTREAM_ERROR',
        request_id: requestId,
      };
    let response: NextResponse;
    if (AUTH_PATHS.has(path) && upstream.ok) {
      const data = result?.data as Record<string, unknown> | undefined;
      const credential = data?.token;
      if (typeof credential !== 'string' || !credential.trim())
        throw new BackendError('BACKEND_INVALID_RESPONSE', 502, requestId);
      delete data!.token;
      response = NextResponse.json(result, { status: upstream.status });
      const expires = Number(data!.expires_in);
      response.cookies.set(SESSION_COOKIE, credential, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.COOKIE_SECURE === 'true',
        path: '/',
        maxAge:
          Number.isFinite(expires) && expires > 0 ? Math.min(Math.floor(expires), 86400) : 86400,
      });
    } else {
      response = result
        ? NextResponse.json(result, { status: upstream.status })
        : new NextResponse(empty ? null : await upstream.arrayBuffer(), {
            status: upstream.status,
          });
      for (const name of [
        'content-disposition',
        'retry-after',
        ...(download ? ['content-type'] : []),
      ]) {
        const value = upstream.headers.get(name);
        if (value) response.headers.set(name, value);
      }
    }
    response.headers.set('Cache-Control', 'no-store');
    response.headers.set('X-Request-ID', requestId);
    response.headers.set('X-Content-Type-Options', 'nosniff');
    if (
      upstream.status === 401 ||
      (upstream.ok && ['auth/logout', 'auth/logout-all', 'auth/password'].includes(path))
    )
      response.cookies.delete(SESSION_COOKIE);
    return response;
  } catch (cause) {
    const error =
      cause instanceof BackendError ? cause : new BackendError('BACKEND_UNREACHABLE', 503);
    console.warn(
      JSON.stringify({
        event: 'backend.proxy_error',
        method: request.method,
        path: parts.join('/'),
        code: error.code,
        request_id: error.requestId,
      }),
    );
    return NextResponse.json(
      {
        success: false,
        message: error.message,
        code: error.code,
        request_id: error.requestId,
      },
      {
        status: error.status,
        headers: { 'Cache-Control': 'no-store', 'X-Request-ID': error.requestId },
      },
    );
  }
}
