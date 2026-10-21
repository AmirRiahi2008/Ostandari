import { findCounty } from '@/data/counties';
import type { PortalUser } from '@/types/portal';

export function countyAdminRoute(path: string) {
  const match = path.match(/^\/county-admin\/([a-z0-9-]+)(\/login)?$/);
  if (!match) return;
  const county = findCounty(match[1]);
  if (!county) return;
  return { county, login: Boolean(match[2]), dashboard: '/county-admin/' + county.slug };
}

export function workspaceModuleAllowed(
  module: { path: string; permission: string },
  user?: PortalUser | null,
): boolean {
  const permissions = user?.role?.permissions;
  if (permissions && !permissions.includes('*') && !permissions.includes(module.permission))
    return false;
  if (user?.portal_context?.type === 'county')
    return ![
      '/admin/governors',
      '/admin/counties',
      '/admin/settings',
      '/admin/item-order',
      '/admin/roles',
      '/admin/internal-users',
      '/admin/external-users',
      '/admin/subscribers',
    ].includes(module.path);
  return true;
}

export function workspaceCanCreate(
  module: { resource: string; canCreate: boolean },
  user?: PortalUser | null,
): boolean {
  return (
    module.canCreate &&
    user?.portal_context?.can_write !== false &&
    !(
      user?.portal_context?.is_global === false &&
      ['organizations', 'counties'].includes(module.resource)
    )
  );
}

export function workspaceModuleTitle(
  path: string,
  title: string,
  user?: PortalUser | null,
): string {
  if (user?.portal_context?.type !== 'county') return title;
  return (
    (
      {
        '/admin/county-governors': 'فرماندار شهرستان',
        '/admin/members': 'مدیران شهرستان',
        '/admin/advisors': 'مشاوران فرماندار',
        '/admin/organization-contact': 'اطلاعات تماس فرمانداری',
        '/admin/organizations': 'اطلاعات فرمانداری',
        '/admin/slides': 'اسلایدهای فرمانداری',
        '/admin/governor/pending': 'پیام‌های تازهٔ فرمانداری',
        '/admin/governor/replied': 'پیام‌های پاسخ‌داده‌شدهٔ فرمانداری',
      } as Record<string, string>
    )[path] ?? title
  );
}
