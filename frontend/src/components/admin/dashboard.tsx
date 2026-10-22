'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api/client';
import { adminModules } from '@/data/admin/modules';
import type { RecordData } from '@/types/portal';
import { normalizeAdminSearch } from '@/lib/admin-search';
import { adminSections } from '@/data/admin/sections';
import { adminEditorHref } from '@/lib/admin-routes';
import { useAdminWorkspace } from './workspace-provider';
import { workspaceCanCreate, workspaceModuleAllowed } from '@/lib/admin-workspace';
export function AdminDashboard({ preview }: { preview: boolean }) {
  const user = useAdminWorkspace();
  const canWrite = user?.portal_context?.can_write !== false;
  const [stats, setStats] = useState<RecordData | null>(null);
  const [error, setError] = useState('');
  const [revision, setRevision] = useState(0);
  const [query, setQuery] = useState('');
  const [sectionId, setSectionId] = useState('');
  useEffect(() => {
    if (preview) return;
    const abort = new AbortController();
    setError('');
    void api<RecordData>('admin/dashboard', { signal: abort.signal })
      .then((result) => {
        if (!abort.signal.aborted) setStats(result.data);
      })
      .catch((e) => {
        if (!abort.signal.aborted) setError(e.message);
      });
    return () => abort.abort();
  }, [preview, revision]);
  const permissions = Array.isArray(stats?.permissions) ? (stats.permissions as string[]) : null;
  const links = adminModules.filter(
    (page) =>
      page.showInNavigation &&
      workspaceModuleAllowed(page, user) &&
      (!permissions || permissions.includes('*') || permissions.includes(page.permission)),
  );
  const visible = links.filter(
    (page) =>
      (!sectionId || page.section === sectionId) &&
      normalizeAdminSearch(page.title + ' ' + page.description).includes(
        normalizeAdminSearch(query),
      ),
  );
  return (
    <div className="portal-dashboard">
      <div className="portal-dashboard-heading">
        <h2>مدیریت پرتال استانداری مازندران</h2>
        <a href="/">مشاهدهٔ سایت</a>
        <a href="/panel/admin/account">حساب کاربری</a>
      </div>
      <p className="portal-dashboard-intro">
        {canWrite
          ? 'همهٔ بخش‌های مدیریت در دسترس شما، به تفکیک موضوع. برای ثبت مورد تازه «افزودن» و برای تغییر اطلاعات «فهرست و ویرایش» را انتخاب کنید.'
          : user?.portal_context?.can_manage_annual_slogan
            ? 'این حساب اطلاعات استانداری را مشاهده می‌کند و از بخش «شعار سال» می‌تواند تصویر شعار را جایگزین کند. ویرایش سایر محتواها غیرفعال است.'
            : 'حساب روابط عمومی استانداری فقط امکان مشاهدهٔ اطلاعات همین استانداری را دارد. ثبت، ویرایش و حذف محتوا برای این حساب غیرفعال است.'}
      </p>
      {stats && (
        <div className="portal-admin-stats">
          {[
            ['کاربران', stats.users],
            ['اعضا', stats.members],
            [
              'مطالب',
              Object.values((stats.contents_by_type ?? {}) as Record<string, number>).reduce(
                (sum, n) => sum + Number(n),
                0,
              ),
            ],
          ].map(([label, value]) => (
            <div key={String(label)}>
              <strong>{Number(value ?? 0).toLocaleString('fa-IR')}</strong>
              <span>{String(label)}</span>
            </div>
          ))}
        </div>
      )}
      {error && (
        <div role="status">
          <p>{error}</p>
          <button type="button" className="portal-button" onClick={() => setRevision((n) => n + 1)}>
            تلاش دوباره
          </button>
        </div>
      )}
      <div className="portal-dashboard-filters">
        <label>
          جستجوی بخش
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="مثلاً خبر، استاندار، فرم یا گزارش…"
          />
        </label>
        <label>
          گروه
          <select value={sectionId} onChange={(event) => setSectionId(event.target.value)}>
            <option value="">همهٔ گروه‌ها</option>
            {adminSections
              .filter((section) => links.some((page) => page.section === section.id))
              .map((section) => (
                <option key={section.id} value={section.id}>
                  {section.title}
                </option>
              ))}
          </select>
        </label>
        <span role="status">{visible.length.toLocaleString('fa-IR')} بخش</span>
      </div>
      {adminSections.map((section) => {
        const modules = visible.filter((page) => page.section === section.id);
        if (!modules.length) return null;
        return (
          <section
            className="portal-dashboard-section"
            key={section.id}
            aria-labelledby={'admin-section-' + section.id}
          >
            <header>
              <div>
                <h3 id={'admin-section-' + section.id}>{section.title}</h3>
                <p>{section.description}</p>
              </div>
              <span>{modules.length.toLocaleString('fa-IR')} بخش</span>
            </header>
            <div className="portal-module-grid">
              {modules.map((page) => (
                <article key={page.path} className="portal-module-card">
                  <a href={page.path}>
                    <h4>{page.title}</h4>
                    <p>{page.description}</p>
                  </a>
                  <div>
                    <a href={page.path}>
                      {canWrite && page.resource && page.canEdit
                        ? 'فهرست و ویرایش'
                        : 'مشاهده و مدیریت'}
                      <span aria-hidden="true"> ←</span>
                    </a>
                    {workspaceCanCreate(page, user) && (
                      <a className="portal-module-create" href={adminEditorHref(page.path)}>
                        + {page.resource === 'media' ? 'بارگذاری' : 'افزودن'}
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}
      {!visible.length && <p role="status">بخشی با این نام یا در این گروه پیدا نشد.</p>}
    </div>
  );
}
