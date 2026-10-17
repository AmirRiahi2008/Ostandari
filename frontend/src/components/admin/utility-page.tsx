import AdminHeader from '@/components/template/parts/AdminHeader9ef4c';
import AdminRail from '@/components/template/parts/AdminRail3e246';
import { templates } from '@/lib/templates';
import { PageFrame } from '@/components/template/page-frame';
import { templatePreview } from '@/lib/config';
import { AdminAccount, LogoutButton } from './account';
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
        : 'گزارشات';
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
                  <>
                    <p>گزارش‌های محتوا، کاربران و درخواست‌ها از داشبورد قابل دسترسی‌اند.</p>
                    <div className="portal-link-grid">
                      <a href="/admin">نمای کلی</a>
                      <a href="/admin/contact/pending">پیام‌های دریافتی</a>
                      <a href="/admin/submissions">درخواست‌های فرم‌ها</a>
                      <a href="/admin/internal-users">کاربران داخلی</a>
                    </div>
                  </>
                )}
              </div>
            </main>
          </div>
        </div>
      </PageFrame>
    </>
  );
}
