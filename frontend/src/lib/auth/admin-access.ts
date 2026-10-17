import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_COOKIE } from '@/lib/api/proxy';
import { templatePreview } from '@/lib/config';
import { LOCAL_ADMIN_COOKIE, localAdminEnabled, validLocalSession } from './local-admin';

export async function requireAdmin(path: string) {
  const jar = await cookies();
  if (templatePreview()) {
    if (
      localAdminEnabled((await headers()).get('host')) &&
      validLocalSession(jar.get(LOCAL_ADMIN_COOKIE)?.value)
    )
      return;
  } else {
    const token = jar.get(SESSION_COOKIE)?.value;
    if (token) {
      try {
        const base = process.env.BACKEND_URL ?? 'http://127.0.0.1:8000/api/v1';
        const response = await fetch(base.replace(/\/$/, '') + '/auth/me', {
          headers: { Accept: 'application/json', Authorization: 'Bearer ' + token },
          cache: 'no-store',
          signal: AbortSignal.timeout(6000),
        });
        const result = await response.json();
        if (
          response.ok &&
          result.data?.person_type !== 'citizen' &&
          result.data?.role?.permissions?.length > 0
        )
          return;
      } catch {}
    }
  }
  redirect('/admin/login?return=' + encodeURIComponent(path));
}
