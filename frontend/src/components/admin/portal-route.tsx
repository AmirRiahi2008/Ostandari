import { notFound, redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/auth/admin-access';
import {
  countyAdminRoute,
  workspaceCanCreate,
  workspaceModuleAllowed,
} from '@/lib/admin-workspace';
import { AdminWorkspaceProvider } from './workspace-provider';
import { CountyDashboard } from './county/dashboard';
import { CountyLogin } from './county/login';
import { AdminShell } from './shell';
import { resolveAdminEditor, resolveReportEditor } from '@/lib/admin-routes';
import { AdminEditorPage } from './editor-page';
import { AdminReportPage } from './reports/report-page';
import { adminModules } from '@/data/admin/modules';
import { adminExtraPages } from '@/data/admin/extra-pages';
import { adminUtilityTitles } from '@/data/admin/utility-pages';
import { AdminResourcePage } from './resource-page';
import { AdminUtilityPage } from './utility-page';
import { resolveTemplate, templates } from '@/lib/templates';
import { templateViews } from '@/views';
import { PageFrame } from '@/components/template/page-frame';
import { templatePreview } from '@/lib/config';
import { first } from '@/features/site/search-params';
import type { Search } from '@/features/site/public-pages';

export async function AdminPortalRoute({ path, search }: { path: string; search: Search }) {
  const county = countyAdminRoute(path);
  if (path.startsWith('/county-admin/') && !county) notFound();
  if (county?.login)
    return (
      <>
        <link rel="stylesheet" href="/styles/county-admin.css" precedence="workspace" />
        <CountyLogin slug={county.county.slug} name={county.county.name} />
      </>
    );
  const user = await requireAdmin(path);
  if (
    county &&
    (user?.portal_context?.type !== 'county' ||
      user.portal_context.county?.slug !== county.county.slug)
  )
    notFound();
  if (path === '/admin' && user?.portal_context?.type === 'county')
    redirect(user.portal_context.dashboard_path);
  const editor = resolveAdminEditor(path);
  const report = resolveReportEditor(path);
  const page = resolveTemplate(path);
  const module = adminModules.find(
    (module) =>
      module.path === (editor?.page.path ?? (report ? '/admin/reports' : (page?.path ?? path))),
  );
  if (module && !workspaceModuleAllowed(module, user)) notFound();
  if (editor && user?.portal_context?.can_write === false) redirect(editor.page.path);
  if (editor?.mode === 'create' && module && !workspaceCanCreate(module, user)) notFound();
  const base = {
    ...templates.find((page) => page.path === '/admin')!,
    id: 'CountyDashboard',
    path,
    resource: '',
  };
  const View = page ? templateViews[page.id as keyof typeof templateViews] : undefined;
  let content;
  if (county && user)
    content = (
      <>
        <link rel="stylesheet" href="/styles/county-admin.css" precedence="workspace" />
        <AdminShell page={base} path={path}>
          <CountyDashboard user={user} />
        </AdminShell>
      </>
    );
  else if (editor)
    content = <AdminEditorPage path={path} route={editor} returnTo={first(search.return)} />;
  else if (report)
    content = <AdminReportPage path={path} reference={report} returnTo={first(search.return)} />;
  else if (adminExtraPages[path]) content = <AdminResourcePage path={path} />;
  else if (adminUtilityTitles[path]) content = <AdminUtilityPage path={path} />;
  else if (page && View)
    content = (
      <>
        <link rel="stylesheet" href={page.css} precedence="design" />
        <PageFrame page={page} path={path} preview={templatePreview()}>
          <View />
        </PageFrame>
      </>
    );
  else notFound();
  return <AdminWorkspaceProvider user={user ?? null}>{content}</AdminWorkspaceProvider>;
}
