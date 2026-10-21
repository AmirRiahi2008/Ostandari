import { AdminPortalRoute } from '@/components/admin/portal-route';
import { countyAdminRoute } from '@/lib/admin-workspace';
import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { PageFrame } from '@/components/template/page-frame';
import { resolveTemplate } from '@/lib/templates';
import { templateViews } from '@/views';
import { templatePreview } from '@/lib/config';
import { isPublicRoute, routeAlias } from '@/lib/routes';
import { PublicPage, type Search } from '@/features/site/public-pages';
import { findCounty } from '@/data/counties';
import { first } from '@/features/site/search-params';
import { publicTitles } from '@/data/public-navigation';
import { adminExtraPages } from '@/data/admin/extra-pages';
import { HomePage } from '@/features/site/home-page';
import { OfficialSectionPage } from '@/features/site/official-section-page';
import { resolveOfficialSection } from '@/features/site/official-data';
import { adminUtilityTitles } from '@/data/admin/utility-pages';
import { resolveAdminEditor, resolveReportEditor } from '@/lib/admin-routes';
import { resolveCountyPortal, countyTitle } from '@/lib/county-portal';
import { CountyPortalPage } from '@/features/site/county-portal-page';
import { AuthenticationPage } from '@/components/auth/authentication-page';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;
type Props = { params: Promise<{ path?: string[] }>; searchParams: Promise<Search> };

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const path = '/' + ((await params).path ?? []).join('/');
  if (path === '/panel/admin/login') return { title: 'ورود به پنل مدیریت | استانداری مازندران' };
  if (path === '/login' || path === '/register')
    return {
      title: (path === '/login' ? 'ورود شهروندان' : 'ثبت‌نام شهروندان') + ' | استانداری مازندران',
    };
  const countyPortal = resolveCountyPortal(path);
  if (countyPortal)
    return {
      title:
        countyPortal.path === '/'
          ? 'فرمانداری شهرستان ' + countyPortal.county.name
          : countyTitle(
              publicTitles[countyPortal.path] ??
                resolveOfficialSection(countyPortal.path, await searchParams)?.title ??
                'پرتال فرمانداری',
              countyPortal.county,
            ) +
            ' | فرمانداری ' +
            countyPortal.county.name,
    };
  const countyAdmin = countyAdminRoute(path);
  if (countyAdmin)
    return {
      title:
        (countyAdmin.login ? 'ورود به فرمانداری ' : 'داشبورد فرمانداری ') + countyAdmin.county.name,
    };
  const editor = resolveAdminEditor(path);
  if (editor)
    return {
      title:
        (editor.mode === 'create' ? 'افزودن — ' : 'ویرایش — ') +
        editor.page.title +
        ' | استانداری مازندران',
    };
  if (resolveReportEditor(path)) return { title: 'رسیدگی به گزارش مردمی | استانداری مازندران' };
  if (adminUtilityTitles[path])
    return { title: adminUtilityTitles[path] + ' | استانداری مازندران' };
  const page = resolveTemplate(path);
  const officialSection = resolveOfficialSection(path, await searchParams);
  if (officialSection) return { title: officialSection.title };
  const county = path === '/office' ? findCounty(first((await searchParams).name)) : undefined;
  if (county) return { title: 'فرمانداری شهرستان ' + county.name };
  return {
    title:
      publicTitles[path] ?? adminExtraPages[path]?.title ?? page?.title ?? 'استانداری مازندران',
  };
}

export default async function TemplateRoute({ params, searchParams }: Props) {
  const path = '/' + ((await params).path ?? []).join('/');
  const search = await searchParams;
  if (path === '/admin' || path.startsWith('/admin/')) notFound();
  if (['/login', '/register', '/panel/admin/login'].includes(path))
    return (
      <AuthenticationPage
        key={path}
        mode={path === '/panel/admin/login' ? 'staff' : path === '/register' ? 'register' : 'login'}
        preview={templatePreview()}
        returnTo={first(search.return)}
        denied={first(search.error) === 'auth_required'}
      />
    );
  const countyPortal = resolveCountyPortal(path);
  if (countyPortal) {
    if (countyPortal.canonical !== path)
      redirect(
        countyPortal.canonical +
          (new URLSearchParams(
            Object.entries(search).flatMap(([key, value]) =>
              value === undefined ? [] : [[key, Array.isArray(value) ? value[0] : value]],
            ),
          ).size
            ? '?' +
              new URLSearchParams(
                Object.entries(search).flatMap(([key, value]) =>
                  value === undefined ? [] : [[key, Array.isArray(value) ? value[0] : value]],
                ),
              )
            : ''),
      );
    return <CountyPortalPage route={countyPortal} search={search} />;
  }
  if (
    ((path === '/panel/admin' || path.startsWith('/panel/admin/')) &&
      path !== '/panel/admin/login') ||
    path.startsWith('/county-admin/')
  )
    return <AdminPortalRoute path={path} search={search} />;
  const alias = routeAlias(
    path,
    new URLSearchParams(
      Object.entries(search).flatMap(([key, value]) =>
        value === undefined ? [] : [[key, Array.isArray(value) ? value[0] : value]],
      ),
    ),
  );
  if (alias) redirect(alias);
  if (path === '/') return <HomePage />;
  const officialSection = resolveOfficialSection(path, search);
  if (officialSection) return <OfficialSectionPage section={officialSection} search={search} />;
  if (path === '/password' && (!search.email || !search.token)) redirect('/forgot-password');
  if (isPublicRoute(path) || (path === '/gallery' && search.name))
    return <PublicPage path={path} search={search} />;
  const page =
    path === '/panel/admin/login'
      ? { ...resolveTemplate('/login')!, path: '/panel/admin/login', title: 'ورود مدیریت' }
      : resolveTemplate(path);
  if (!page) notFound();
  if (page.controller === 'auth' && ['/login', '/register'].includes(page.path))
    redirect(page.path);
  const preview = templatePreview();
  if (page.group === 'admin') return <AdminPortalRoute path={page.path} search={search} />;
  const View = templateViews[page.id as keyof typeof templateViews];
  return (
    <>
      <link rel="stylesheet" href={page.css} precedence="design" />
      <PageFrame key={page.id} page={page} preview={preview} path={path}>
        <View />
      </PageFrame>
    </>
  );
}
