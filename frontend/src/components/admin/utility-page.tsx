import AdminHeader from '@/components/template/parts/AdminHeader9ef4c';
import AdminRail from '@/components/template/parts/AdminRail3e246';
import { templates } from '@/lib/templates';
import { PageFrame } from '@/components/template/page-frame';
import { templatePreview } from '@/lib/config';
import { AdminAccount, LogoutButton } from './account';
import { ReportsPanel } from './reports/reports-panel';
export function AdminUtilityPage({ path }: { path: string }) {
  const page = {
    ...templates.find((page) => page.path === '/admin')!,
    id: 'AdminUtility',
    path,
    resource: '',
  };
  const title =
    path === '/admin/account'
      ? 'حساب کاربری'
      : path === '/admin/logout'
        ? 'خروج از مدیریت'
        : 'گزارش‌های مردمی';
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
                {path === '/admin/account' ? (
                  <AdminAccount preview={templatePreview()} />
                ) : path === '/admin/logout' ? (
                  <LogoutButton preview={templatePreview()} />
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
