import AdminHeader from '@/components/template/parts/AdminHeader9ef4c';
import AdminRail from '@/components/template/parts/AdminRail3e246';
import { templates } from '@/lib/templates';
import { PageFrame } from '@/components/template/page-frame';
import { templatePreview } from '@/lib/config';
import { AdminAccount, LogoutButton } from './account';
import { ReportsPanel } from './reports/reports-panel';
import { SiteSettings } from './site-settings';
import { AnnualSlogan } from './annual-slogan';
import { AuditLog } from './audit-log';
import { adminUtilityTitles } from '@/data/admin/utility-pages';
export function AdminUtilityPage({ path }: { path: string }) {
  const page = {
    ...templates.find((page) => page.path === '/panel/admin')!,
    id: 'AdminUtility',
    path,
    resource: '',
  };
  const title = adminUtilityTitles[path];
  return (
    <>
      <link rel="stylesheet" href={page.css} precedence="design" />
      <PageFrame page={page} preview={templatePreview()} path={path}>
        <div className="all-website">
          <AdminHeader />
          <div className="sadyar-content">
            <AdminRail />
            <main className="main-content">
              <div className="main-content-header">
                <h1>{title}</h1>
              </div>
              <div className="portal-admin-content">
                {path === '/panel/admin/account' ? (
                  <AdminAccount preview={templatePreview()} />
                ) : path === '/panel/admin/logout' ? (
                  <LogoutButton preview={templatePreview()} />
                ) : path === '/panel/admin/annual-slogan' ? (
                  <AnnualSlogan preview={templatePreview()} />
                ) : path === '/panel/admin/settings' ? (
                  <SiteSettings preview={templatePreview()} />
                ) : path === '/panel/admin/audit-logs' ? (
                  <AuditLog preview={templatePreview()} />
                ) : (
                  <ReportsPanel preview={templatePreview()} />
                )}
              </div>
            </main>
          </div>
        </div>
      </PageFrame>
    </>
  );
}
