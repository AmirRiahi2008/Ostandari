import { NextRequest, NextResponse } from 'next/server';
import { hasValidOrigin } from '@/lib/api/proxy';
import {
  LOCAL_ADMIN_COOKIE,
  LOCAL_SESSION_SECONDS,
  localAdminEnabled,
  localCredentials,
  createLocalSession,
  validLocalSession,
} from '@/lib/auth/local-admin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const attempts = new Map<string, { count: number; until: number }>();
function enabled(request: NextRequest) {
  return localAdminEnabled(request.headers.get('host')) && hasValidOrigin(request);
}
function denied() {
  return NextResponse.json(
    { success: false, message: 'این مسیر برای نمایش محلی در دسترس است.' },
    { status: 403 },
  );
}
export async function POST(request: NextRequest) {
  if (!enabled(request)) return denied();
  const host = request.headers.get('host')!;
  const now = Date.now();
  const previous = attempts.get(host);
  if (previous && previous.until > now && previous.count >= 10)
    return NextResponse.json(
      { success: false, message: 'تعداد تلاش‌ها زیاد است. کمی بعد دوباره تلاش کنید.' },
      { status: 429 },
    );
  let data;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: 'درخواست نامعتبر است.' }, { status: 400 });
  }
  if (!localCredentials(data?.login, data?.password)) {
    attempts.set(host, {
      count: previous && previous.until > now ? previous.count + 1 : 1,
      until: previous && previous.until > now ? previous.until : now + 5 * 60 * 1000,
    });
    return NextResponse.json(
      { success: false, message: 'نام کاربری یا رمز عبور نادرست است.' },
      { status: 422 },
    );
  }
  attempts.delete(host);
  const response = NextResponse.json(
    {
      success: true,
      data: {
        user: {
          name: 'مدیر محلی',
          username: 'admin',
          person_type: 'staff',
          role: { name: 'local_admin', permissions: ['*'] },
        },
      },
    },
    { headers: { 'Cache-Control': 'no-store' } },
  );
  response.cookies.set(LOCAL_ADMIN_COOKIE, createLocalSession(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: request.nextUrl.protocol === 'https:',
    path: '/',
    maxAge: LOCAL_SESSION_SECONDS,
  });
  return response;
}
export async function GET(request: NextRequest) {
  if (!enabled(request)) return denied();
  if (!validLocalSession(request.cookies.get(LOCAL_ADMIN_COOKIE)?.value))
    return NextResponse.json({ success: false, message: 'ابتدا وارد شوید.' }, { status: 401 });
  return NextResponse.json(
    { success: true, data: { name: 'مدیر محلی', username: 'admin', role: 'local_admin' } },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
export async function DELETE(request: NextRequest) {
  if (!enabled(request)) return denied();
  const response = NextResponse.json({ success: true, data: null });
  response.cookies.set(LOCAL_ADMIN_COOKIE, '', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
  return response;
}
