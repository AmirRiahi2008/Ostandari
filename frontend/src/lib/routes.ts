import { adminExtraPages } from '@/data/admin/extra-pages';
import { publicTitles } from '@/data/public-navigation';
import { resolveTemplate } from '@/lib/templates';
import { countyAdminRoute } from '@/lib/admin-workspace';
import { adminUtilityTitles } from '@/data/admin/utility-pages';
import { resolveAdminEditor, resolveReportEditor } from '@/lib/admin-routes';
import { findCounty } from '@/data/counties';
import { countyPortalHref, resolveCountyPortal } from '@/lib/county-portal';

export function isPublicRoute(path: string): boolean {
  return Boolean(publicTitles[path] || /^\/(?:news|service|content)\/[^/]+$/.test(path));
}
export function routeAlias(path: string, search: URLSearchParams): string | undefined {
  const county = findCounty(search.get('name') ?? undefined);
  if (
    county &&
    (['/office', '/news', '/gallery', '/managers', '/contact-us'].includes(path) ||
      /^\/(section|news|content)\//.test(path))
  )
    return countyPortalHref(county, path + '?' + search);
  if (path === '/link') return '/links';
  if (path === '/manager')
    return '/managers?group=' + encodeURIComponent(search.get('member_group') ?? '1');
  if (path === '/blank' && search.get('id') === '57') return '/install';
  if (path === '/county') return '/counties';
  if (/^\/county\/[^/]+$/.test(path))
    return findCounty(path.split('/')[2])
      ? countyPortalHref(findCounty(path.split('/')[2])!)
      : '/counties';
  return undefined;
}
export function knownRoute(href: string): boolean {
  if (/^https?:|^mailto:|^tel:/i.test(href)) return true;
  const url = new URL(href, 'http://127.0.0.1:3000');
  const county = resolveCountyPortal(url.pathname);
  if (county)
    return (
      !resolveCountyPortal(county.path) &&
      (knownRoute(county.path + url.search) ||
        ['/forms', '/announcements', '/documents', '/resolutions'].includes(county.path))
    );
  return Boolean(
    countyAdminRoute(url.pathname) ||
    resolveAdminEditor(url.pathname) ||
    resolveReportEditor(url.pathname) ||
    adminExtraPages[url.pathname] ||
    adminUtilityTitles[url.pathname] ||
    isPublicRoute(url.pathname) ||
    /^\/section\/[a-z0-9-]+$/.test(url.pathname) ||
    [
      '/sitemap',
      '/districts',
      '/units',
      '/accessibility',
      '/rss',
      '/forum',
      '/performance',
      '/participation',
      '/about/general',
      '/service-agreement/statement',
      '/polls/site',
    ].includes(url.pathname) ||
    resolveTemplate(url.pathname) ||
    routeAlias(url.pathname, url.searchParams) ||
    url.pathname === '/admin/login',
  );
}
