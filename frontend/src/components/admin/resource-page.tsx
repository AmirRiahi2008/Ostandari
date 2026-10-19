import AdminHeader from '@/components/template/parts/AdminHeader9ef4c';
import AdminRail from '@/components/template/parts/AdminRail3e246';
import { templates } from '@/lib/templates';
import { PageFrame } from '@/components/template/page-frame';
import { templatePreview } from '@/lib/config';
import { AdminResourceForm } from './resource-form';
import { adminExtraPages } from '@/data/admin/extra-pages';
export function AdminResourcePage({ path }: { path: string }) {
  const config = adminExtraPages[path];
  const page = {
    ...templates.find((page) => page.path === '/admin/calls')!,
    path,
    title: config.title,
    resource: config.resource,
    defaults: config.defaults,
  };
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
                <h1>{config.title}</h1>
              </div>
              <div className="portal-admin-content">
                <div className="portal-admin-toolbar">
                  <button className="portal-button" id="cbnOpenCreateMenuModalBtn">
                    افزودن مورد جدید
                  </button>
                  <form className="search-box-wrapper">
                    <label htmlFor="searchInput">جستجو</label>
                    <input id="searchInput" type="search" placeholder="جستجو…" />
                    <button className="portal-button">جستجو</button>
                  </form>
                  <a href="/admin">بازگشت به داشبورد</a>
                </div>
                <div className="portal-admin-table">
                  <table className="education-table">
                    <thead>
                      <tr>
                        <th>ردیف</th>
                        <th>
                          {config.resource === 'counties' || config.resource === 'services'
                            ? 'نام'
                            : 'عنوان'}
                        </th>
                        <th>
                          {['counties', 'services'].includes(config.resource)
                            ? 'فعال'
                            : ['gallery-items', 'poll-options'].includes(config.resource)
                              ? 'ترتیب نمایش'
                              : 'وضعیت'}
                        </th>
                        <th>عملیات</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="portal-record-prototype">
                        <td>۱</td>
                        <td></td>
                        <td></td>
                        <td>
                          <button type="button" data-command="editRecord">
                            ویرایش
                          </button>
                          <button type="button" data-command="deleteRecord">
                            حذف
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div id="cbnCreateMenuModalOverlay" className="cbn-modal-overlay">
                <div
                  className="cbn-modal portal-admin-editor"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="resource-editor-title"
                >
                  <div className="cbn-modal-header">
                    <h2 id="resource-editor-title">{config.title}</h2>
                    <button
                      type="button"
                      id="cbnCloseCreateMenuModalBtn"
                      className="cbn-modal-close"
                      aria-label="بستن فرم"
                    >
                      ×
                    </button>
                  </div>
                  <div className="cbn-modal-body">
                    <AdminResourceForm resource={config.resource} defaults={config.defaults} />
                  </div>
                  <div className="cbn-modal-footer">
                    <button className="portal-button" data-command="saveRecord">
                      ذخیره
                    </button>
                    <button type="button" data-command="closeModal">
                      انصراف
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </PageFrame>
    </>
  );
}
