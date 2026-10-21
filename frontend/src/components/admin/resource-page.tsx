import { AdminShell } from './shell';
import { adminModules } from '@/data/admin/modules';
import { adminResourcePage, adminEditorHref } from '@/lib/admin-routes';
import { adminListColumns } from '@/data/admin/list-columns';
import { reviewResource } from '@/data/admin/sections';
import { workspaceCanCreate, workspaceModuleTitle } from '@/lib/admin-workspace';
import type { PortalUser } from '@/types/portal';
export function AdminResourcePage({ path, user }: { path: string; user?: PortalUser | null }) {
  const page = adminResourcePage(path)!;
  const module = adminModules.find((item) => item.path === path)!;
  const title = workspaceModuleTitle(path, module.title, user);
  const columns = adminListColumns(page.resource, page.defaults);
  const writable = user?.portal_context?.can_write !== false;
  const review = reviewResource(page.resource);
  return (
    <AdminShell page={page} path={path}>
      <div className="main-content-header">
        <h1>{title}</h1>
      </div>
      <section className="portal-admin-content portal-resource-list" aria-label={title}>
        <p className="portal-admin-help">{module.description}</p>
        {path === '/admin/governors' && (
          <p className="portal-admin-help">
            برای تغییر تصویر یا مشخصات استاندار فعلی، همان رکورد را ویرایش کنید. فقط یک استاندار
            فعلیِ فعال در صفحهٔ اصلی نمایش داده می‌شود.
          </p>
        )}
        <div className="portal-admin-toolbar">
          {workspaceCanCreate(module, user) && (
            <a
              href={adminEditorHref(path)}
              className="portal-button portal-create-button"
              id="cbnOpenCreateMenuModalBtn"
            >
              <span aria-hidden="true">＋</span>
              {page.resource === 'media' ? 'بارگذاری فایل جدید' : 'افزودن مورد جدید'}
            </a>
          )}
          {page.resource === 'settings' && writable && (
            <a
              href={adminEditorHref(path)}
              className="portal-button"
              id="cbnOpenCreateMenuModalBtn"
            >
              ویرایش تنظیمات موجود
            </a>
          )}
          <form className="search-box-wrapper" role="search">
            <label htmlFor="searchInput">جستجو در {title}</label>
            <div>
              <input
                id="searchInput"
                name="q"
                type="search"
                placeholder="نام یا عنوان مورد را بنویسید…"
              />
              <button type="submit" className="portal-button">
                جستجو
              </button>
            </div>
          </form>
          <a href={user?.portal_context?.dashboard_path ?? '/admin'}>بازگشت به داشبورد</a>
        </div>
        <div className="portal-admin-table">
          <table className="education-table">
            <caption className="portal-visually-hidden">فهرست {title}</caption>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.key} scope="col" data-column={column.key}>
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="portal-record-prototype">
                {columns.map((column) => (
                  <td key={column.key}>
                    {column.key === 'image' ? (
                      <img className="portal-image-preview" alt="تصویر مورد" hidden />
                    ) : column.key === '_actions' ? (
                      <>
                        {page.resource === 'media' && (
                          <a href="#" data-download-media="true">
                            دریافت فایل
                          </a>
                        )}
                        {writable && module.canEdit && (
                          <button
                            type="button"
                            className="portal-row-edit"
                            data-command="editRecord"
                          >
                            {review ? 'بررسی و پیگیری' : 'ویرایش'}
                          </button>
                        )}
                        {writable && !review && page.resource !== 'settings' && (
                          <button
                            type="button"
                            className="portal-row-delete"
                            data-command="deleteRecord"
                          >
                            حذف
                          </button>
                        )}
                      </>
                    ) : null}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <nav
          className="portal-admin-pagination"
          data-admin-pagination="true"
          aria-label="صفحه‌های فهرست"
        />
      </section>
    </AdminShell>
  );
}
