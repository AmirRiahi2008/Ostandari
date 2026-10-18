import { cache, type ReactNode } from 'react';
import { SiteHeader, type SiteBranding } from './site-header';
import { SiteFooter } from './site-footer';
import { PageFrame } from '@/components/template/page-frame';
import { templates } from '@/lib/templates';
import { templatePreview } from '@/lib/config';
import type { NavigationItem } from '@/data/official-navigation';
import { navigationFromMenus, officialRead } from '@/features/site/official-data';
import { recordImage, type PublicRecord } from '@/lib/public-content';

export const loadPortalChrome = cache(async (): Promise<PublicRecord> => {
  const [settings, menus] = await Promise.all([
    officialRead('settings'),
    officialRead('menus?key=official-main'),
  ]);
  return { settings: settings.data ?? {}, menus: menus.data };
});

export async function PortalLayout({
  children,
  title,
  path = '/',
  breadcrumbs = true,
  headerItems,
  designPath = '/',
  home = false,
  branding,
  headlines,
  chrome,
}: {
  children: ReactNode;
  title?: string;
  path?: string;
  breadcrumbs?: boolean;
  headerItems?: NavigationItem[];
  designPath?: string;
  home?: boolean;
  branding?: SiteBranding;
  headlines?: { title: string; href: string }[];
  chrome?: PublicRecord | Promise<PublicRecord>;
}) {
  const resolvedChrome = await (chrome ?? loadPortalChrome());
  const settings = (resolvedChrome.settings ?? {}) as PublicRecord;
  const page = {
    ...(templates.find((page) => page.path === designPath) ??
      templates.find((page) => page.path === '/')!),
    id: 'PortalPage',
    path,
    resource: '',
  };
  const configuredBranding = {
    banner: recordImage(settings['site.banner']),
    logo: recordImage(settings['site.logo']),
    sloganImage: recordImage(settings['site.slogan']),
    name: typeof settings['site.name'] === 'string' ? settings['site.name'] : undefined,
    ...branding,
  };
  return (
    <>
      <link rel="stylesheet" href={page.css} precedence="design" />
      <PageFrame page={page} preview={templatePreview()} path={path}>
        <div className="container-asli source-portal">
          <SiteHeader
            items={headerItems ?? navigationFromMenus(resolvedChrome.menus)}
            branding={configuredBranding}
            headlines={headlines}
          />
          <main
            id="main-content"
            className={home ? 'source-main source-home' : 'source-main source-content'}
          >
            {title && breadcrumbs && (
              <nav className="source-breadcrumb" aria-label="مسیر صفحه">
                <a href="/">صفحه اصلی</a>
                <span aria-hidden="true">/</span>
                <h1>{title}</h1>
              </nav>
            )}
            {children}
          </main>
          <SiteFooter contact={settings['site.contact'] as PublicRecord | undefined} />
        </div>
      </PageFrame>
    </>
  );
}
export function EmptyState({
  children = 'اطلاعاتی در این بخش ثبت نشده است.',
  unavailable = false,
}: {
  children?: ReactNode;
  unavailable?: boolean;
}) {
  return (
    <div className="portal-empty" role="status">
      <span className="portal-empty-mark" aria-hidden="true">
        {unavailable ? '!' : '—'}
      </span>
      <p>
        {unavailable ? 'ارتباط با سرویس اطلاعات برقرار نشد. لطفاً دوباره تلاش کنید.' : children}
      </p>
      {unavailable && (
        <button type="button" data-command="reloadPage">
          تلاش دوباره
        </button>
      )}
    </div>
  );
}
export function Panel({
  title,
  href,
  children,
  className = '',
}: {
  title: string;
  href?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={'portal-panel ' + className}>
      <div className="portal-panel-head">
        <h2>{title}</h2>
        {href && (
          <a href={href}>
            مشاهده همه <span aria-hidden="true">←</span>
          </a>
        )}
      </div>
      {children}
    </section>
  );
}
