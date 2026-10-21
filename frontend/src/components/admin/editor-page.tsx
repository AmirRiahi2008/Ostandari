import { AdminShell } from './shell';
import { AdminResourceForm } from './resource-form';
import { safeAdminReturn, resolveAdminEditor } from '@/lib/admin-routes';
import { adminModules } from '@/data/admin/modules';
import { reviewResource } from '@/data/admin/sections';

export function AdminEditorPage({
  path,
  route,
  returnTo,
}: {
  path: string;
  route: NonNullable<ReturnType<typeof resolveAdminEditor>>;
  returnTo?: string;
}) {
  const { page: resource, mode, id } = route;
  const module = adminModules.find((module) => module.path === resource.path)!;
  const back = safeAdminReturn(resource.path, returnTo);
  const title =
    (mode === 'create'
      ? resource.resource === 'media'
        ? 'بارگذاری — '
        : 'افزودن — '
      : reviewResource(resource.resource)
        ? 'بررسی و پیگیری — '
        : 'ویرایش — ') + module.itemName;
  const page = { ...resource, id: 'AdminRecordEditor', editor: { mode, id, returnTo: back } };
  return (
    <AdminShell page={page} path={path}>
      <div className="portal-editor-heading">
        <nav aria-label="مسیر صفحه">
          <a href="/panel/admin">داشبورد</a>
          <span aria-hidden="true">/</span>
          <a href={back}>{resource.title}</a>
          <span aria-hidden="true">/</span>
          <span>{mode === 'create' ? 'افزودن' : 'ویرایش و بررسی'}</span>
        </nav>
        <h1>{title}</h1>
        <p>{module.description}</p>
        <p className="portal-editor-guide">
          فیلدهای «الزامی» را تکمیل کنید. گزینه‌های اختیاری را می‌توانید خالی بگذارید. عکس را در
          همین فرم بارگذاری کنید و در پایان ذخیره را بزنید.
        </p>
      </div>
      <section className="portal-editor-page" data-admin-record-editor="true" aria-label={title}>
        {resource.path === '/panel/admin/governors' && (
          <p className="portal-admin-help">
            فقط یک استاندار فعلیِ فعال مجاز است. برای نمایش در صفحهٔ اصلی، تصویر و مشخصات را تکمیل
            کنید و گزینه‌های «مسئول فعلی» و «فعال» را انتخاب کنید.
          </p>
        )}
        <div className="portal-editor-status" data-editor-status="true" role="status">
          {mode === 'edit' ? 'در حال دریافت اطلاعات…' : 'فرم افزودن مورد جدید'}
        </div>
        <button
          type="button"
          className="portal-button"
          data-command="reloadEditor"
          data-editor-retry="true"
          hidden
        >
          تلاش دوباره
        </button>
        <img
          className="portal-editor-current-image"
          data-editor-current-image="true"
          alt="تصویر فعلی"
          hidden
        />
        <div data-record-detail="true" className="portal-record-detail" />
        <fieldset
          className="portal-editor-fields"
          data-editor-fields="true"
          disabled={mode === 'edit'}
          inert={mode === 'edit'}
        >
          <AdminResourceForm
            resource={resource.resource}
            defaults={resource.defaults}
            formId="admin-record-form"
            path={resource.path}
            mode={mode}
          />
        </fieldset>
        <div className="portal-editor-actions">
          <button
            type="submit"
            form="admin-record-form"
            className="portal-button"
            data-command="saveRecord"
            data-editor-save="true"
            disabled={mode === 'edit'}
          >
            ذخیره و بازگشت به فهرست
          </button>
          <a href={back}>انصراف و بازگشت</a>
        </div>
      </section>
    </AdminShell>
  );
}
