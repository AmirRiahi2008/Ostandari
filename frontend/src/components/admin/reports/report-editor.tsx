'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api/client';
import type { ReportOptions } from '@/features/admin/reports';
import { ReportDetail } from './report-detail';
import { safeAdminReturn } from '@/lib/admin-routes';

export function ReportEditor({
  reference,
  preview,
  returnTo,
}: {
  reference: string;
  preview: boolean;
  returnTo?: string;
}) {
  const [options, setOptions] = useState<ReportOptions | null>(null);
  const [error, setError] = useState('');
  const [revision, setRevision] = useState(0);
  const [busy, setBusy] = useState(false);
  const back = safeAdminReturn('/admin/reports', returnTo);
  useEffect(() => {
    if (preview) return;
    const controller = new AbortController();
    setError('');
    void api<ReportOptions>('admin/reports/options', { signal: controller.signal })
      .then((result) => {
        if (!controller.signal.aborted) setOptions(result.data);
      })
      .catch((error) => {
        if (!controller.signal.aborted) setError(error.message);
      });
    return () => controller.abort();
  }, [preview, revision]);
  return (
    <section className="admin-reports portal-report-editor">
      <a
        href={back}
        onClick={(event) => {
          if (busy) event.preventDefault();
        }}
      >
        بازگشت به فهرست گزارش‌ها
      </a>
      {preview ? (
        <p role="status">برای رسیدگی به گزارش واقعی، وارد حساب متصل به بک‌اند شوید.</p>
      ) : (
        <>
          {error && (
            <div role="alert">
              <p>{error}</p>
              <button
                type="button"
                onClick={() => setRevision((value) => value + 1)}
                disabled={busy}
              >
                دریافت دوبارهٔ واحدها و کارشناسان
              </button>
            </div>
          )}
          <ReportDetail
            reference={reference}
            options={options}
            onClose={() => window.location.assign(back)}
            onChanged={() => {}}
            onBusy={setBusy}
            closeLabel="بازگشت به فهرست گزارش‌ها"
          />
        </>
      )}
    </section>
  );
}
