import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { PageFrame } from '@/components/template/page-frame';
import { resolveTemplate } from '@/lib/templates';
import { templateViews } from '@/views';
import { templatePreview } from '@/lib/config';
import { requireAdmin } from '@/lib/auth/admin-access';
import { isPublicRoute, routeAlias } from '@/lib/routes';
import { PublicPage, type Search } from '@/features/site/public-pages';
import { AdminUtilityPage } from '@/components/admin/utility-page';
import { findCounty } from '@/data/counties';
import { first } from '@/features/site/search-params';
import { publicTitles } from '@/data/public-navigation';
import { adminExtraPages } from '@/data/admin/extra-pages';
import { AdminResourcePage } from '@/components/admin/resource-page';
import { HomePage } from '@/features/site/home-page';
import { OfficialSectionPage } from '@/features/site/official-section-page';
import { resolveOfficialSection } from '@/features/site/official-data';

export const dynamic = 'force-dynamic';
type Props = { params: Promise<{ path?: string[] }>; searchParams: Promise<Search> };

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const path = '/' + ((await params).path ?? []).join('/');
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
  if (adminExtraPages[path]) {
    await requireAdmin(path);
    return <AdminResourcePage path={path} />;
  }
  if (['/admin/account', '/admin/reports', '/admin/logout'].includes(path)) {
    await requireAdmin(path);
    return <AdminUtilityPage path={path} />;
  }
  const page =
    path === '/admin/login'
      ? { ...resolveTemplate('/login')!, path: '/admin/login', title: 'ورود مدیریت' }
      : resolveTemplate(path);
  if (!page) notFound();
  const preview = templatePreview();
  if (page.group === 'admin') await requireAdmin(path);
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
