'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api/client';
import { adminModules } from '@/data/admin/modules';
import { adminSections } from '@/data/admin/sections';
import { adminEditorHref } from '@/lib/admin-routes';
import {
  workspaceCanCreate,
  workspaceModuleAllowed,
  workspaceModuleTitle,
} from '@/lib/admin-workspace';
import { ticketStatuses } from '@/data/ticket-status';
import type { PortalUser, PortalWorkspace } from '@/types/portal';
import { OriginalIcon } from '@/components/site/original-icons';

type CountyStats = {
  workspace: PortalWorkspace;
  permissions: string[];
  contents_by_type: Record<string, number>;
  contents_by_status: Record<string, number>;
  tickets_by_status: Record<string, number>;
  overdue_tickets: number;
  recent_contents: {
    id: number;
    type: string;
    title: string;
    status: string;
    updated_at: string;
  }[];
  recent_reports: { reference: string; subject: string; status: string }[];
  daily_activity: { date: string; contents: number; tickets: number }[];
};
const count = (value: number) => Number(value || 0).toLocaleString('fa-IR');
const sum = (values: Record<string, number> = {}) =>
  Object.values(values).reduce((a, b) => a + Number(b || 0), 0);
const statuses: Record<string, string> = {
  draft: 'پیش‌نویس',
  published: 'منتشرشده',
  archived: 'بایگانی',
};
const contentPaths: Record<string, string> = {
  news: 'news',
  announcement: 'announcements',
  resolution: 'resolutions',
  page: 'pages',
  document: 'documents',
  event: 'events',
  publication: 'publications',
  tender: 'tenders',
  contract: 'contracts',
  call: 'calls',
  duty: 'duties',
};
const quick = [
  ['/admin/news', 'ثبت خبر', 'خبر و گزارش فعالیت‌های فرمانداری'],
  ['/admin/galleries', 'ساخت گالری', 'تصاویر بازدیدها و رویدادهای شهرستان'],
  ['/admin/county-governors', 'مشخصات فرماندار', 'معرفی، تصویر و راه‌های ارتباط'],
  ['/admin/reports', 'گزارش‌های مردم', 'بررسی، ارجاع و پاسخ‌گویی'],
];

function validStats(data: CountyStats): boolean {
  return Boolean(
    data &&
    Array.isArray(data.permissions) &&
    data.permissions.every((value) => typeof value === 'string') &&
    Array.isArray(data.recent_contents) &&
    Array.isArray(data.recent_reports) &&
    Array.isArray(data.daily_activity) &&
    data.contents_by_type &&
    data.contents_by_status &&
    data.tickets_by_status,
  );
}

function ActivityChart({ days }: { days: CountyStats['daily_activity'] }) {
  const maximum = Math.max(1, ...days.flatMap((day) => [day.contents, day.tickets]));
  return (
    <div
      className="county-chart"
      role="img"
      aria-label="تعداد محتوای ثبت‌شده و درخواست‌های مردمی در ده روز اخیر"
    >
      {days.map((day) => (
        <div
          className="county-chart-day"
          key={day.date}
          title={day.date + ' — محتوا: ' + count(day.contents) + '، درخواست: ' + count(day.tickets)}
        >
          <div className="county-chart-bars">
            <span style={{ height: (Math.max(0, day.contents) / maximum) * 100 + '%' }} />
            <span style={{ height: (Math.max(0, day.tickets) / maximum) * 100 + '%' }} />
          </div>
          <time dateTime={day.date}>
            {new Date(day.date + 'T12:00:00').toLocaleDateString('fa-IR', {
              day: 'numeric',
              month: 'numeric',
            })}
          </time>
        </div>
      ))}
    </div>
  );
}

export function CountyDashboard({ user }: { user: PortalUser }) {
  const workspace = user.portal_context!;
  const [stats, setStats] = useState<CountyStats | null>(null);
  const [error, setError] = useState('');
  const [revision, setRevision] = useState(0);
  const [query, setQuery] = useState('');
  useEffect(() => {
    const abort = new AbortController();
    setError('');
    setStats(null);
    void api<CountyStats>('admin/dashboard', { signal: abort.signal })
      .then(({ data }) => {
        if (abort.signal.aborted) return;
        if (!validStats(data))
          throw new Error(
            'پاسخ داشبورد معتبر نیست. نسخهٔ بک‌اند و فرانت‌اند را با هم به‌روزرسانی کنید.',
          );
        if (
          data.workspace?.organization_id !== workspace.organization_id ||
          data.workspace?.county?.slug !== workspace.county?.slug
        )
          throw new Error('فضای کاری حساب با فرمانداری این صفحه یکسان نیست. دوباره وارد شوید.');
        setStats(data);
      })
      .catch((error) => {
        if (!abort.signal.aborted) setError(error.message);
      });
    return () => abort.abort();
  }, [workspace.organization_id, workspace.county?.slug, revision]);
  const modules = adminModules.filter(
    (module) =>
      workspaceModuleAllowed(module, user) &&
      (!stats || stats.permissions.includes('*') || stats.permissions.includes(module.permission)),
  );
  const visible = modules.filter((module) =>
    workspaceModuleTitle(module.path, module.title, user).includes(query.trim()),
  );
  const activity = stats?.daily_activity ?? [];
  const metrics = [
    ['محتوای فرمانداری', stats ? sum(stats.contents_by_type) : null, 'اخبار، اطلاعیه‌ها و صفحات'],
    ['پیش‌نویس‌ها', stats?.contents_by_status.draft ?? (stats ? 0 : null), 'آمادهٔ تکمیل و انتشار'],
    [
      'درخواست‌های باز',
      stats
        ? sum(
            Object.fromEntries(
              Object.entries(stats.tickets_by_status).filter(
                ([status]) => !['resolved', 'closed', 'rejected'].includes(status),
              ),
            ),
          )
        : null,
      'در انتظار بررسی و پاسخ',
    ],
    ['گذشته از مهلت پاسخ', stats?.overdue_tickets ?? null, 'نیازمند پیگیری سریع‌تر'],
  ];
  return (
    <div className="county-dashboard">
      <header className="county-dashboard-hero">
        <div>
          <span className="county-eyebrow">میزکار روابط عمومی فرمانداری</span>
          <h1>{workspace.organization_name}</h1>
          <p>
            {user.name}، به فضای کاری شهرستان {workspace.county?.name} خوش آمدید.
          </p>
          <div className="county-hero-actions">
            <a href={workspace.public_path}>مشاهدهٔ پرتال فرمانداری ↗</a>
            <a href="/admin/account">حساب کاربری</a>
          </div>
        </div>
        <div className="county-identity">
          <OriginalIcon name="footer" />
          <strong>{workspace.county?.name}</strong>
          <span>دسترسی محدود به همین فرمانداری</span>
        </div>
      </header>
      {error && (
        <div className="county-dashboard-error" role="alert">
          <p>{error}</p>
          <button type="button" onClick={() => setRevision((value) => value + 1)}>
            تلاش دوباره
          </button>
        </div>
      )}
      <section
        className="county-metrics"
        aria-label="آمار همین فرمانداری"
        aria-busy={!stats && !error}
      >
        {metrics.map(([title, value, detail], index) => (
          <article key={String(title)}>
            <span className={'county-metric-mark metric-' + index} aria-hidden="true">
              {['▤', '✎', '◷', '!'][index]}
            </span>
            <span>{title}</span>
            <strong>{value === null ? '—' : count(Number(value))}</strong>
            <small>{detail}</small>
          </article>
        ))}
      </section>
      <section className="county-quick-actions" aria-label="شروع سریع">
        {quick
          .filter(([path]) => modules.some((module) => module.path === path))
          .map(([path, title, detail], index) => (
            <a
              href={
                path === '/admin/news' || path === '/admin/galleries' ? adminEditorHref(path) : path
              }
              key={path}
            >
              <span className="county-quick-number">
                {(index + 1).toLocaleString('fa-IR', { minimumIntegerDigits: 2 })}
              </span>
              <div>
                <strong>{title}</strong>
                <p>{detail}</p>
              </div>
              <span aria-hidden="true">←</span>
            </a>
          ))}
      </section>
      <div className="county-dashboard-grid">
        <section className="county-panel county-activity">
          <header>
            <div>
              <span className="county-eyebrow">روند فعالیت</span>
              <h2>ده روز اخیر فرمانداری</h2>
            </div>
            <div className="county-chart-legend">
              <span>محتوا</span>
              <span>درخواست مردمی</span>
            </div>
          </header>
          <ActivityChart days={activity} />
          {!stats && (
            <p className="county-empty">
              {error ? 'اطلاعات فعالیت دریافت نشد.' : 'در حال دریافت فعالیت‌های همین فرمانداری…'}
            </p>
          )}
          {stats && activity.every((day) => !day.contents && !day.tickets) && (
            <p className="county-empty">در این بازه فعالیتی ثبت نشده است.</p>
          )}
        </section>
        <section className="county-panel county-inbox">
          <header>
            <div>
              <span className="county-eyebrow">ارتباط با مردم</span>
              <h2>تازه‌ترین گزارش‌های مردمی</h2>
            </div>
            <a href="/admin/reports">همهٔ گزارش‌ها ←</a>
          </header>
          {stats?.recent_reports.map((ticket) => (
            <a
              className="county-inbox-item"
              href={'/admin/reports/' + encodeURIComponent(ticket.reference) + '/edit'}
              key={ticket.reference}
            >
              <strong>{ticket.subject}</strong>
              <span>
                {ticketStatuses[ticket.status as keyof typeof ticketStatuses] ?? ticket.status}
              </span>
            </a>
          ))}
          {stats && !stats.recent_reports.length && (
            <p className="county-empty">گزارشی برای این فرمانداری ثبت نشده است.</p>
          )}
        </section>
      </div>
      <section className="county-panel county-recent-content">
        <header>
          <div>
            <span className="county-eyebrow">مدیریت انتشار</span>
            <h2>آخرین محتواهای فرمانداری</h2>
          </div>
          <a href="/admin/news">فهرست اخبار ←</a>
        </header>
        <div className="county-content-list">
          {stats?.recent_contents.map((item) => (
            <a
              href={adminEditorHref('/admin/' + (contentPaths[item.type] ?? 'news'), item.id)}
              key={item.id}
            >
              <span className="county-content-dot" aria-hidden="true" />
              <strong>{item.title}</strong>
              <span className={'county-status status-' + item.status}>
                {statuses[item.status] ?? item.status}
              </span>
              <time dateTime={item.updated_at}>
                {new Date(item.updated_at).toLocaleDateString('fa-IR')}
              </time>
              <span aria-hidden="true">↖</span>
            </a>
          ))}
          {stats && !stats.recent_contents.length && (
            <p className="county-empty">هنوز محتوایی برای این فرمانداری ثبت نشده است.</p>
          )}
        </div>
      </section>
      <section className="county-modules" aria-labelledby="county-modules-title">
        <header>
          <div>
            <span className="county-eyebrow">همهٔ ابزارهای شما</span>
            <h2 id="county-modules-title">بخش‌های مدیریت فرمانداری</h2>
          </div>
          <label>
            <span className="source-sr-only">جستجوی بخش مدیریت</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="جستجو در بخش‌ها…"
            />
          </label>
        </header>
        {adminSections.map((section) => {
          const items = visible.filter((module) => module.section === section.id);
          if (!items.length) return null;
          return (
            <div className="county-module-group" key={section.id}>
              <h3>{section.title}</h3>
              <div>
                {items.map((module) => (
                  <article key={module.path}>
                    <a href={module.path}>
                      <strong>{workspaceModuleTitle(module.path, module.title, user)}</strong>
                      <span>مشاهده و مدیریت ←</span>
                    </a>
                    {workspaceCanCreate(module, user) && (
                      <a
                        className="county-module-add"
                        href={adminEditorHref(module.path)}
                        aria-label={
                          'افزودن در ' + workspaceModuleTitle(module.path, module.title, user)
                        }
                      >
                        +
                      </a>
                    )}
                  </article>
                ))}
              </div>
            </div>
          );
        })}
        {!visible.length && <p className="county-empty">بخشی با این نام در دسترس شما نیست.</p>}
      </section>
    </div>
  );
}
