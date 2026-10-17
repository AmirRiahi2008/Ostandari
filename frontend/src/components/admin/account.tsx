'use client';
import { useEffect, useState, type FormEvent } from 'react';
import { api, jsonBody } from '@/lib/api/client';
import type { PortalUser } from '@/types/portal';
export async function logoutAdmin(preview: boolean) {
  if (preview) await fetch('/api/local-admin', { method: 'DELETE' });
  else await api('auth/logout', { method: 'POST' });
  window.location.assign('/admin/login');
}
export function LogoutButton({ preview }: { preview: boolean }) {
  const [error, setError] = useState('');
  return (
    <>
      <button
        className="portal-button"
        onClick={() => void logoutAdmin(preview).catch((e) => setError(e.message))}
      >
        خروج از حساب مدیریت
      </button>
      <p role="status">{error}</p>
    </>
  );
}
export function AdminAccount({ preview }: { preview: boolean }) {
  const [user, setUser] = useState<PortalUser | null>(null);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (preview) {
      setUser({ name: 'مدیر محلی', username: 'admin', person_type: 'staff' });
      return;
    }
    const abort = new AbortController();
    void api<PortalUser>('auth/me', { signal: abort.signal })
      .then((r) => setUser(r.data))
      .catch((e) => {
        if (!abort.signal.aborted) setMessage(e.message);
      });
    return () => abort.abort();
  }, [preview]);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    try {
      await api('auth/profile', {
        method: 'PATCH',
        body: jsonBody(Object.fromEntries(new FormData(e.currentTarget))),
      });
      setMessage('اطلاعات حساب به‌روز شد.');
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'ثبت انجام نشد.');
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      {user && (
        <>
          <p>
            نام کاربری: <b dir="ltr">{String(user.username ?? '')}</b>
          </p>
          {preview ? (
            <p>حساب مدیریت محلی — admin</p>
          ) : (
            <form className="portal-form" onSubmit={submit}>
              <label>
                نام و نام خانوادگی
                <input name="name" defaultValue={user.name} required maxLength={120} />
              </label>
              <label>
                ایمیل
                <input name="email" type="email" defaultValue={String(user.email ?? '')} required />
              </label>
              <button className="portal-button" disabled={busy}>
                ذخیره اطلاعات
              </button>
            </form>
          )}
        </>
      )}
      <p role="status">{message}</p>
      <LogoutButton preview={preview} />
    </>
  );
}
