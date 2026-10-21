import { findCounty, type County } from '@/data/counties';
import { officialNavigation, type NavigationItem } from '@/data/official-navigation';
import { quickLinks } from '@/data/public-navigation';

export function countyPortalHref(county: Pick<County, 'slug'>, destination = '/'): string {
  if (!destination.startsWith('/') || destination.startsWith('//')) return destination;
  const url = new URL(destination, 'https://portal.invalid');
  const current = findCounty(url.pathname.split('/')[1]);
  if (current) return destination;
  if (
    /^\/(?:admin|county-admin|citizen|login|register|forgot-password|password)(?:\/|$)/.test(
      url.pathname,
    )
  )
    return destination;
  if (url.pathname === '/counties') return destination;
  if (findCounty(url.searchParams.get('name') ?? undefined) || url.pathname === '/office')
    url.searchParams.delete('name');
  let path = url.pathname;
  if (path === '/office') path = url.searchParams.get('section') === 'about' ? '/about' : '/';
  url.searchParams.delete('section');
  return '/' + county.slug + (path === '/' ? '' : path) + url.search + url.hash;
}

export function resolveCountyPortal(path: string) {
  const [, slug, ...parts] = path.replace(/\/$/, '').split('/');
  const county = findCounty(slug);
  if (!county || !/^[a-z0-9-]+$/.test(slug)) return undefined;
  return {
    county,
    path: '/' + parts.join('/'),
    canonical: '/' + county.slug + (parts.length ? '/' + parts.join('/') : ''),
  };
}

export function countyTitle(title: string, county: County): string {
  return title
    .replace(/آشنایی با مازندران/g, 'آشنایی با ' + county.name)
    .replace(/مدیران استان/g, 'مدیران شهرستان')
    .replace(/استانداری مازندران/g, 'فرمانداری ' + county.name)
    .replace(/استاندار(?:ان)?(?: ادوار)?/g, 'فرماندار')
    .replace(/معاونین فرماندار مازندران/g, 'معاونین فرماندار')
    .replace(/فرمانداران مازندران/g, 'بخشداران و دهیاران')
    .replace(/مدیران روابط عمومی استان/g, 'مدیران روابط عمومی شهرستان')
    .replace(/دستگاه‌های استان/g, 'دستگاه‌های شهرستان')
    .replace(/دستگاه های اجرایی استان/g, 'دستگاه‌های اجرایی شهرستان')
    .replace(/مازندران/g, county.name);
}

export function countyNavigation(
  county: County,
  source = officialNavigation.main,
): NavigationItem[] {
  return source
    .filter((item) => !item.href.startsWith('/office?'))
    .map((item) =>
      item.href === '/counties'
        ? {
            id: 'county-districts',
            title: 'بخش‌ها و دهستان‌ها',
            href: countyPortalHref(county, '/districts'),
            children: [],
          }
        : {
            ...item,
            title: countyTitle(item.title, county),
            href: countyPortalHref(county, item.href),
            children: countyNavigation(county, item.children),
          },
    );
}

export function canonicalNavigation(items: NavigationItem[]): NavigationItem[] {
  return items.map((item) => {
    const url = item.href.startsWith('/')
      ? new URL(item.href, 'https://portal.invalid')
      : undefined;
    const county =
      url?.pathname === '/office'
        ? findCounty(url.searchParams.get('name') ?? undefined)
        : undefined;
    return {
      ...item,
      href: county ? countyPortalHref(county, item.href) : item.href,
      children: canonicalNavigation(item.children),
    };
  });
}

export function countyQuickLinks(county: County) {
  return quickLinks
    .filter(([, href]) => href !== '/counties' && href !== '/admin')
    .map(([label, href]) => ({
      title: countyTitle(label, county),
      href: countyPortalHref(county, href),
    }));
}

export const countyBannerAssets: Partial<Record<County['slug'], string>> = {
  sari: '/design/site/assets/image/sari.png',
  amol: '/design/site/assets/image/amol.png',
  babolsar: '/design/site/assets/image/babolsar.png',
};
