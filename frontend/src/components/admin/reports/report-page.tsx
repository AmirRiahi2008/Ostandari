import { AdminShell } from '../shell';
import { templates } from '@/lib/templates';
import { templatePreview } from '@/lib/config';
import { ReportEditor } from './report-editor';
import { safeAdminReturn } from '@/lib/admin-routes';

export function AdminReportPage({
  path,
  reference,
  returnTo,
}: {
  path: string;
  reference: string;
  returnTo?: string;
}) {
  const page = {
    ...templates.find((page) => page.path === '/admin')!,
    id: 'AdminReportEditor',
    path,
    resource: '',
  };
  const back = safeAdminReturn('/admin/reports', returnTo);
  return (
    <AdminShell page={page} path={path}>
      <div className="portal-editor-heading">
        <nav aria-label="مسیر صفحه">
          <a href="/admin">داشبورد</a>
          <span aria-hidden="true">/</span>
          <a href={back}>گزارش‌های مردمی</a>
        </nav>
        <h1>رسیدگی به گزارش مردمی</h1>
      </div>
      <div className="portal-admin-content">
        <ReportEditor reference={reference} preview={templatePreview()} returnTo={back} />
      </div>
    </AdminShell>
  );
}
