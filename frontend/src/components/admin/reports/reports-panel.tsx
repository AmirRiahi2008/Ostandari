'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { api, ApiError } from '@/lib/api/client';
import { safeAdminReturn } from '@/lib/admin-routes';
import { ticketStatuses, ticketTypes, ticketUrgencies } from '@/data/ticket-status';
import {
  reportDate,
  reportOverdue,
  reportQuery,
  type ReportOptions,
  type ReportsResponse,
} from '@/features/admin/reports';

export function ReportsPanel({ preview }: { preview: boolean }) {
  const [options, setOptions] = useState<ReportOptions | null>(null);
  const [optionsError, setOptionsError] = useState('');
  const [result, setResult] = useState<ReportsResponse | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(!preview);
  const [query, setQuery] = useState('order=urgency');
  const [countyId, setCountyId] = useState('');
  const [page, setPage] = useState(1);
  const [revision, setRevision] = useState(0);
  const form = useRef<HTMLFormElement>(null);
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    const saved = safeAdminReturn(
      '/admin/reports',
      window.location.pathname + window.location.search,
    );
    const params = new URL(saved, window.location.origin).searchParams;
    setPage(Number(params.get('page') ?? 1));
    params.delete('page');
    if (!params.has('order')) params.set('order', 'urgency');
    setQuery(params.toString());
    setCountyId(params.get('county_id') ?? '');
    for (const [key, value] of params) {
      const control = form.current?.querySelector<HTMLInputElement | HTMLSelectElement>(
        '[name="' + key + '"]',
      );
      if (control instanceof HTMLInputElement && control.type === 'checkbox')
        control.checked = value === '1';
      else if (control) control.value = value;
    }
    setRestored(true);
  }, []);

  useEffect(() => {
    if (preview) return;
    const abort = new AbortController();
    setOptionsError('');
    void api<ReportOptions>('admin/reports/options', { signal: abort.signal })
      .then(({ data }) => {
        if (!abort.signal.aborted) setOptions(data);
      })
      .catch((e) => {
        if (!abort.signal.aborted) setOptionsError(e.message);
      });
    return () => abort.abort();
  }, [preview, revision]);

  useEffect(() => {
    if (preview) return;
    const abort = new AbortController();
    setLoading(true);
    setResult(null);
    setError('');
    if (!restored) return;
    const params = new URLSearchParams(query);
    params.set('per_page', '20');
    params.set('page', String(page));
    void api<ReportsResponse['data']>('admin/reports?' + params, { signal: abort.signal })
      .then((response) => {
        if (abort.signal.aborted) return;
        const next = response as ReportsResponse;
        if (!Array.isArray(next.data) || !next.summary)
          throw new Error('فهرست گزارش‌ها قابل دریافت نیست.');
        if (!next.data.length && page > 1) {
          setPage(page - 1);
          return;
        }
        setResult(next);
      })
      .catch((e) => {
        if (!abort.signal.aborted)
          setError(
            e instanceof ApiError && e.status === 403
              ? 'حساب شما مجوز رسیدگی به گزارش‌های مردمی را ندارد.'
              : e.message,
          );
      })
      .finally(() => {
        if (!abort.signal.aborted) setLoading(false);
      });
    return () => abort.abort();
  }, [preview, query, page, revision, restored]);

  function filter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setQuery(reportQuery(new FormData(event.currentTarget)));
    setPage(1);
  }

  if (preview)
    return (
      <section className="admin-reports">
        <p role="status">
          برای نمایش گزارش‌های ثبت‌شده و پاسخ‌گویی، وارد حساب متصل به سامانه شوید. در نمایش طرح،
          گزارش واقعی بارگیری نمی‌شود.
        </p>
      </section>
    );

  return (
    <section className="admin-reports" aria-label="رسیدگی به گزارش‌های مردمی">
      <p className="reports-intro">
        گزارش‌های ثبت‌شده در پنل مردم و پیام‌های ارسالی به استاندار را بررسی و پیگیری کنید.
      </p>
      <div className="reports-stats" aria-label="آمار گزارش‌ها با فیلترهای فعلی" aria-live="polite">
        {(
          [
            ['total', 'کل درخواست‌ها'],
            ['pending', 'در انتظار بررسی'],
            ['active', 'در حال رسیدگی'],
            ['overdue', 'گذشته از مهلت پاسخ'],
          ] as const
        ).map(([key, title]) => (
          <div key={key}>
            <span>{title}</span>
            <strong>{result ? result.summary[key].toLocaleString('fa-IR') : '—'}</strong>
          </div>
        ))}
      </div>
      <form className="reports-filters" ref={form} onSubmit={filter} aria-label="فیلتر گزارش‌ها">
        <label className="reports-search">
          جستجو در عنوان یا شناسه
          <input type="search" name="q" maxLength={100} placeholder="عنوان یا شناسهٔ پیگیری…" />
        </label>
        <label>
          نوع درخواست
          <select name="type">
            <option value="">همهٔ درخواست‌های مردمی</option>
            {Object.entries(ticketTypes).map(([key, title]) => (
              <option key={key} value={key}>
                {title}
              </option>
            ))}
          </select>
        </label>
        <label>
          وضعیت
          <select name="status">
            <option value="">همهٔ وضعیت‌ها</option>
            {Object.entries(ticketStatuses).map(([key, title]) => (
              <option key={key} value={key}>
                {title}
              </option>
            ))}
          </select>
        </label>
        <label>
          فوریت
          <select name="urgency">
            <option value="">همهٔ فوریت‌ها</option>
            {Object.entries(ticketUrgencies).map(([key, title]) => (
              <option key={key} value={key}>
                {title}
              </option>
            ))}
          </select>
        </label>
        <label>
          شهرستان
          <select
            name="county_id"
            value={countyId}
            onChange={(event) => setCountyId(event.target.value)}
            disabled={!options}
          >
            <option value="">همهٔ شهرستان‌های مجاز</option>
            {options?.counties.map((county) => (
              <option key={county.id} value={county.id}>
                {county.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          از تاریخ (میلادی)
          <input type="date" name="from" />
        </label>
        <label>
          تا تاریخ (میلادی)
          <input type="date" name="to" />
        </label>
        <label>
          ترتیب نمایش
          <select name="order" defaultValue="urgency">
            <option value="urgency">فوری‌ترین درخواست‌ها</option>
            <option value="newest">جدیدترین</option>
            <option value="oldest">قدیمی‌ترین</option>
          </select>
        </label>
        <label className="reports-checkbox">
          <input type="checkbox" name="overdue" value="1" />
          فقط درخواست‌های گذشته از مهلت پاسخ
        </label>
        <div className="reports-actions">
          <button type="submit" disabled={loading}>
            اعمال فیلتر
          </button>
          <button
            type="button"
            className="reports-secondary"
            disabled={loading}
            onClick={() => {
              form.current?.reset();
              setCountyId('');
              setQuery('order=urgency');
              setPage(1);
              setRevision((value) => value + 1);
            }}
          >
            پاک‌کردن فیلترها
          </button>
          <button
            type="button"
            className="reports-secondary"
            disabled={loading}
            onClick={() => setRevision((value) => value + 1)}
          >
            تازه‌سازی
          </button>
        </div>
      </form>
      {optionsError ? (
        <p className="reports-error" role="alert">
          فهرست سازمان‌ها و کارشناسان دریافت نشد: {optionsError}
        </p>
      ) : null}
      {error ? (
        <div className="reports-error" role="alert">
          <p>{error}</p>
          <button type="button" onClick={() => setRevision((value) => value + 1)}>
            تلاش دوباره
          </button>
        </div>
      ) : null}
      <div
        className="reports-table-wrap"
        tabIndex={0}
        role="region"
        aria-label="جدول گزارش‌ها؛ در نمایش کوچک قابل پیمایش است"
        aria-busy={loading}
      >
        <table className="reports-table">
          <thead>
            <tr>
              <th scope="col">درخواست و شناسه</th>
              <th scope="col">شهروند / شهرستان</th>
              <th scope="col">فوریت و وضعیت</th>
              <th scope="col">واحد رسیدگی</th>
              <th scope="col">زمان و مهلت پاسخ</th>
              <th scope="col">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} role="status">
                  در حال دریافت گزارش‌ها…
                </td>
              </tr>
            ) : null}
            {!loading && !error && result?.data.length === 0 ? (
              <tr>
                <td colSpan={6}>گزارشی با این فیلترها وجود ندارد.</td>
              </tr>
            ) : null}
            {result?.data.map((report) => (
              <tr key={report.reference} data-report-reference={report.reference}>
                <th scope="row">
                  <strong>{report.subject}</strong>
                  <small>{ticketTypes[report.type]}</small>
                  <code dir="ltr">{report.reference}</code>
                </th>
                <td>
                  {report.owner?.name ?? '—'}
                  <small>{report.county?.name ?? 'استان مازندران'}</small>
                </td>
                <td>
                  <span className="reports-badge" data-urgency={report.urgency}>
                    {ticketUrgencies[report.urgency]}
                  </span>
                  <span className="reports-badge" data-status={report.status}>
                    {ticketStatuses[report.status]}
                  </span>
                </td>
                <td>
                  {report.organization?.name ?? 'واحد تعیین نشده'}
                  <small>{report.assignee?.name ?? 'کارشناس تعیین نشده'}</small>
                </td>
                <td>
                  <time dateTime={report.created_at}>{reportDate(report.created_at)}</time>
                  <small>مهلت: {reportDate(report.due_at)}</small>
                  {reportOverdue(report) ? (
                    <span className="reports-overdue">گذشته از مهلت پاسخ</span>
                  ) : null}
                </td>
                <td>
                  <a
                    href={
                      '/admin/reports/' +
                      encodeURIComponent(report.reference) +
                      '/edit?' +
                      new URLSearchParams({ return: '/admin/reports?' + query + '&page=' + page })
                    }
                    className="reports-secondary"
                  >
                    جزئیات و پاسخ<span className="reports-sr-only"> به {report.subject}</span>
                  </a>
                  <small>{(report.messages_count ?? 0).toLocaleString('fa-IR')} پیام</small>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {result?.meta ? (
        <nav className="reports-pagination" aria-label="صفحه‌های گزارش‌ها">
          <button
            type="button"
            className="reports-secondary"
            disabled={loading || page <= 1}
            onClick={() => setPage(page - 1)}
          >
            صفحهٔ قبل
          </button>
          <span>
            صفحهٔ {result.meta.current_page.toLocaleString('fa-IR')} از{' '}
            {result.meta.last_page.toLocaleString('fa-IR')}
          </span>
          <button
            type="button"
            className="reports-secondary"
            disabled={loading || page >= result.meta.last_page}
            onClick={() => setPage(page + 1)}
          >
            صفحهٔ بعد
          </button>
        </nav>
      ) : null}
    </section>
  );
}
