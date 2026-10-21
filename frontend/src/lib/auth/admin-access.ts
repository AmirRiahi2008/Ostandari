import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_COOKIE } from '@/lib/api/proxy';
import { templatePreview } from '@/lib/config';
import { LOCAL_ADMIN_COOKIE, localAdminEnabled, validLocalSession } from './local-admin';
import { readAdminSession } from './admin-session';
import { countyAdminRoute } from '@/lib/admin-workspace';

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
      const user = await readAdminSession(token);
      if (user) return user;
    }
  }
  const county = countyAdminRoute(path);
  redirect(
    (county ? county.dashboard + '/login' : '/panel/admin/login') +
      '?error=auth_required&return=' +
      encodeURIComponent(path),
  );
}
