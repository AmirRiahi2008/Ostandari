'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api/client';
import { adminModules } from '@/data/admin/modules';
import type { RecordData } from '@/types/portal';
export function AdminDashboard({ preview }: { preview: boolean }) {
  const [stats, setStats] = useState<RecordData | null>(null);
  const [error, setError] = useState('');
  const [revision, setRevision] = useState(0);
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
    (page) => !permissions || permissions.includes('*') || permissions.includes(page.permission),
  );
  return (
    <div className="portal-dashboard">
      <div className="portal-dashboard-heading">
        <h2>مدیریت پرتال استانداری مازندران</h2>
        <a href="/">مشاهدهٔ سایت</a>
        <a href="/admin/account">حساب کاربری</a>
      </div>
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
      <div className="portal-link-grid">
        {links.map((page) => (
          <a key={page.path} href={page.path}>
            {page.title}
            <span aria-hidden="true">←</span>
          </a>
        ))}
      </div>
    </div>
  );
}
