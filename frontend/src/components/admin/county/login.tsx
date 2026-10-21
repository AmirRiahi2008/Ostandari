'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { api, jsonBody } from '@/lib/api/client';
import type { PortalUser } from '@/types/portal';
import { OriginalIcon } from '@/components/site/original-icons';

export function CountyLogin({ slug, name }: { slug: string; name: string }) {
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const inFlight = useRef(false);
  const request = useRef<AbortController | null>(null);
  useEffect(() => () => request.current?.abort(), []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current || !event.currentTarget.reportValidity()) return;
    const fields = new FormData(event.currentTarget);
    const controller = new AbortController();
    request.current = controller;
    inFlight.current = true;
    setBusy(true);
    setError('');
    try {
      const { data } = await api<{ user: PortalUser }>('auth/login', {
        method: 'POST',
        body: jsonBody({
          login: String(fields.get('login')).trim(),
          password: fields.get('password'),
          county_slug: slug,
        }),
        signal: controller.signal,
      });
      if (controller.signal.aborted) return;
      if (
        data.user?.portal_context?.type !== 'county' ||
        data.user.portal_context.county?.slug !== slug
      )
        throw new Error('این حساب به فرمانداری انتخاب‌شده تعلق ندارد.');
      window.location.assign('/county-admin/' + slug);
    } catch (error) {
      if (!controller.signal.aborted)
        setError(error instanceof Error ? error.message : 'ورود انجام نشد. دوباره تلاش کنید.');
    } finally {
      inFlight.current = false;
      if (!controller.signal.aborted) setBusy(false);
    }
  }
  return (
    <main className="county-admin-login" dir="rtl">
      <section className="county-login-brand">
        <OriginalIcon name="footer" />
        <span>پرتال رسمی استانداری مازندران</span>
        <h1>فرمانداری شهرستان {name}</h1>
        <p>فضای اختصاصی روابط عمومی برای انتشار محتوای فرمانداری و پاسخ‌گویی به مردم شهرستان.</p>
        <a href={'/office?name=' + slug}>بازگشت به پرتال فرمانداری ←</a>
      </section>
      <section className="county-login-form">
        <span className="county-eyebrow">ورود همکاران روابط عمومی</span>
        <h2>ورود به میزکار {name}</h2>
        <p>با حساب اختصاصی همین فرمانداری وارد شوید.</p>
        <form onSubmit={submit}>
          <fieldset disabled={busy}>
            <label>
              نام کاربری
              <input name="login" autoComplete="username" required maxLength={255} dir="ltr" />
            </label>
            <label>
              رمز عبور
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
                maxLength={200}
                dir="ltr"
              />
            </label>
            <button type="submit">
              {busy ? 'در حال بررسی حساب…' : 'ورود به داشبورد فرمانداری'}
            </button>
          </fieldset>
          {error && (
            <p className="county-login-error" role="alert">
              {error}
            </p>
          )}
        </form>
        <p className="county-login-note">این صفحه ویژهٔ کارکنان مجاز فرمانداری {name} است.</p>
      </section>
    </main>
  );
}
