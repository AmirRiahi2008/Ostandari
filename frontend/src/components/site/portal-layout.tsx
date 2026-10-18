import type { ReactNode } from 'react';
import { SiteHeader } from './site-header';
import { SiteFooter } from './site-footer';
import { PageFrame } from '@/components/template/page-frame';
import { templates } from '@/lib/templates';
import { templatePreview } from '@/lib/config';
import type { NavigationItem } from '@/data/official-navigation';

export function PortalLayout({
  children,
  title,
  path = '/',
  breadcrumbs = true,
  headerItems,
}: {
  children: ReactNode;
  title?: string;
  path?: string;
  breadcrumbs?: boolean;
  headerItems?: NavigationItem[];
}) {
  const page = {
    ...templates.find((page) => page.path === '/')!,
    id: 'PortalPage',
    path,
    resource: '',
  };
  return (
    <>
      <link rel="stylesheet" href={page.css} precedence="design" />
      <PageFrame page={page} preview={templatePreview()} path={path}>
        <div className="container-asli">
          <SiteHeader items={headerItems} />
          <main id="main-content" className="portal-main">
            {title && breadcrumbs && (
              <div className="portal-breadcrumb">
                <a href="/">صفحه اصلی</a>
                <span aria-hidden="true">/</span>
                <h1>{title}</h1>
              </div>
            )}
            {children}
          </main>
          <SiteFooter />
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
