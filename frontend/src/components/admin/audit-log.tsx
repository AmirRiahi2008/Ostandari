'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { api } from '@/lib/api/client';
import type { ApiResult, RecordData } from '@/types/portal';

export function AuditLog({ preview }: { preview: boolean }) {
  const [result, setResult] = useState<ApiResult<RecordData[]> | null>(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [revision, setRevision] = useState(0);
  const [error, setError] = useState('');
  useEffect(() => {
    if (preview) return;
    const abort = new AbortController();
    setError('');
    setResult(null);
    const params = new URLSearchParams(query);
    params.set('page', String(page));
    params.set('per_page', '30');
    void api<RecordData[]>('admin/audit-logs?' + params, { signal: abort.signal })
      .then((value) => {
        if (!abort.signal.aborted) setResult(value);
      })
      .catch((e) => {
        if (!abort.signal.aborted) setError(e.message);
      });
    return () => abort.abort();
  }, [preview, query, page, revision]);
  function filter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const params = new URLSearchParams();
    for (const key of ['action', 'user_id'])
      if (String(data.get(key) ?? '').trim()) params.set(key, String(data.get(key)));
    setQuery(params.toString());
    setPage(1);
  }
  return (
    <section>
      <p>رویدادهای ثبت و ویرایش، حذف، پاسخ‌گویی و تغییر تنظیمات مدیران را بررسی کنید.</p>
      <form className="portal-admin-toolbar" onSubmit={filter}>
        <label>
          نام عملیات
          <input name="action" maxLength={80} placeholder="contents.updated" dir="ltr" />
        </label>
        <label>
          شناسهٔ کاربر
          <input name="user_id" type="number" min={1} />
        </label>
        <button className="portal-button">فیلتر</button>
        <button type="button" onClick={() => setRevision((n) => n + 1)}>
          تازه‌سازی
        </button>
      </form>
      {preview ? (
        <p>تاریخچهٔ واقعی در حالت نمایش طرح دریافت نمی‌شود.</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : !result ? (
        <p role="status">در حال دریافت…</p>
      ) : (
        <>
          <div className="portal-admin-table">
            <table>
              <thead>
                <tr>
                  <th>زمان</th>
                  <th>عملیات</th>
                  <th>کاربر</th>
                  <th>رکورد</th>
                  <th>تغییرات</th>
                </tr>
              </thead>
              <tbody>
                {result.data.length ? (
                  result.data.map((row) => (
                    <tr key={String(row.id)}>
                      <td>{new Date(String(row.created_at)).toLocaleString('fa-IR')}</td>
                      <td dir="ltr">{String(row.action)}</td>
                      <td>{String(row.user_id ?? 'سامانه')}</td>
                      <td>{String(row.subject_id ?? '—')}</td>
                      <td>
                        <details>
                          <summary>مشاهده</summary>
                          <pre dir="ltr">{JSON.stringify(row.changes, null, 2)}</pre>
                        </details>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>رویدادی ثبت نشده است.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <nav className="portal-admin-toolbar" aria-label="صفحه‌های تاریخچه">
            <button disabled={page <= 1} onClick={() => setPage((n) => n - 1)}>
              صفحهٔ قبل
            </button>
            <span>
              {page.toLocaleString('fa-IR')} از{' '}
              {(result.meta?.last_page ?? 1).toLocaleString('fa-IR')}
            </span>
            <button
              disabled={page >= (result.meta?.last_page ?? 1)}
              onClick={() => setPage((n) => n + 1)}
            >
              صفحهٔ بعد
            </button>
          </nav>
        </>
      )}
    </section>
  );
}
