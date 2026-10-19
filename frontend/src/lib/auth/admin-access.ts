import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_COOKIE } from '@/lib/api/proxy';
import { templatePreview } from '@/lib/config';
import { LOCAL_ADMIN_COOKIE, localAdminEnabled, validLocalSession } from './local-admin';
import { validAdminSession } from './admin-session';

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
    if (token && (await validAdminSession(token))) return;
  }
  redirect('/admin/login?return=' + encodeURIComponent(path));
}
