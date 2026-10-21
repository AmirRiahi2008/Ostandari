'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { api, jsonBody } from '@/lib/api/client';
import { digits } from '@/lib/dom';
import { adminDestination, citizenDestination } from '@/lib/auth/destinations';
import type { PortalUser } from '@/types/portal';

export function AuthenticationPage({
  mode,
  preview = false,
  returnTo,
  denied = false,
}: {
  mode: 'login' | 'register' | 'staff';
  preview?: boolean;
  returnTo?: string;
  denied?: boolean;
}) {
  const staff = mode === 'staff';
  const registration = mode === 'register';
  const [error, setError] = useState(
    denied ? 'برای دسترسی به پنل مدیریت، ابتدا با حساب مدیریتی وارد شوید.' : '',
  );
  const [busy, setBusy] = useState(false);
  const [challenge, setChallenge] = useState<{ challenge_id: string; dev_code?: string } | null>(
    null,
  );
  const [identity, setIdentity] = useState({ name: '', mobile: '', national_code: '' });
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
      if (staff) {
        const payload = {
          login: digits(String(fields.get('login') ?? '').trim()),
          password: fields.get('password'),
          audience: 'staff',
        };
        const result = preview
          ? await fetch('/api/local-admin', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: jsonBody(payload),
              signal: controller.signal,
            }).then(async (response) => {
              const result = await response.json();
              if (!response.ok) throw new Error(result.message);
              return result as { data: { user: PortalUser } };
            })
          : await api<{ user: PortalUser }>('auth/login', {
              method: 'POST',
              body: jsonBody(payload),
              signal: controller.signal,
            });
        if (!controller.signal.aborted)
          window.location.assign(adminDestination(result.data.user, returnTo));
      } else if (challenge) {
        const result = await api<{ user: PortalUser }>('auth/otp/verify', {
          method: 'POST',
          body: jsonBody({
            challenge_id: challenge.challenge_id,
            code: digits(String(fields.get('code') ?? '').trim()),
          }),
          signal: controller.signal,
        });
        if (!controller.signal.aborted)
          window.location.assign(citizenDestination(result.data.user));
      } else {
        const next = {
          name: String(fields.get('name') ?? '').trim(),
          mobile: digits(String(fields.get('mobile') ?? '').trim()),
          national_code: digits(String(fields.get('national_code') ?? '').trim()),
        };
        setIdentity(next);
        const result = await api<{ challenge_id: string; dev_code?: string }>(
          registration ? 'auth/register' : 'auth/citizen/login',
          {
            method: 'POST',
            body: jsonBody(registration ? next : { mobile: next.mobile }),
            signal: controller.signal,
          },
        );
        if (!controller.signal.aborted) setChallenge(result.data);
      }
    } catch (error) {
      if (!controller.signal.aborted)
        setError(error instanceof Error ? error.message : 'ورود انجام نشد. دوباره تلاش کنید.');
    } finally {
      inFlight.current = false;
      if (!controller.signal.aborted) setBusy(false);
    }
  }
  const normalize = (event: FormEvent<HTMLInputElement>) => {
    event.currentTarget.value = digits(event.currentTarget.value);
  };
  return (
    <main className="portal-auth-page" dir="rtl">
      <section className="portal-auth-card" aria-labelledby="authentication-title">
        <a href="/" className="portal-auth-brand">
          <img
            src="/design/site/assets/image/logo.png"
            alt="استانداری مازندران"
            width={70}
            height={76}
          />
          <span>پرتال استانداری مازندران</span>
        </a>
        <span className="portal-auth-kicker">
          {staff ? 'ورود مدیران و روابط عمومی' : 'حساب شهروندی'}
        </span>
        <h1 id="authentication-title">
          {staff
            ? 'ورود به پنل مدیریت'
            : challenge
              ? 'تأیید شمارهٔ همراه'
              : registration
                ? 'ثبت‌نام شهروندان'
                : 'ورود شهروندان'}
        </h1>
        <p>
          {staff
            ? 'نام کاربری و رمز عبور حساب مدیریتی خود را وارد کنید.'
            : challenge
              ? `کد پیامک‌شده به ${identity.mobile} را وارد کنید.`
              : registration
                ? 'اطلاعات خود را وارد کنید. حساب شما پس از تأیید شمارهٔ همراه ساخته می‌شود.'
                : 'پس از ثبت‌نام، با شمارهٔ همراه و کد یک‌بارمصرف وارد پنل خود شوید.'}
        </p>
        {error && (
          <p className="portal-auth-error" role="alert">
            {error}
          </p>
        )}
        <form onSubmit={submit} className="portal-auth-form">
          <fieldset disabled={busy}>
            {staff ? (
              <>
                <label>
                  نام کاربری
                  <input name="login" required autoComplete="username" maxLength={255} autoFocus />
                </label>
                <label>
                  رمز عبور
                  <input
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    maxLength={200}
                  />
                </label>
              </>
            ) : challenge ? (
              <label>
                کد تأیید شش‌رقمی
                <input
                  name="code"
                  required
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  onInput={normalize}
                  dir="ltr"
                  autoFocus
                />
              </label>
            ) : (
              <>
                {registration && (
                  <label>
                    نام و نام خانوادگی
                    <input
                      name="name"
                      required
                      minLength={3}
                      maxLength={120}
                      autoComplete="name"
                      defaultValue={identity.name}
                    />
                  </label>
                )}
                <label>
                  شمارهٔ همراه
                  <input
                    name="mobile"
                    required
                    inputMode="tel"
                    autoComplete="tel-national"
                    pattern="09[0-9]{9}"
                    maxLength={11}
                    placeholder="۰۹xxxxxxxxx"
                    defaultValue={identity.mobile}
                    onInput={normalize}
                    dir="ltr"
                  />
                </label>
                {registration && (
                  <label>
                    کد ملی
                    <input
                      name="national_code"
                      required
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      maxLength={10}
                      defaultValue={identity.national_code}
                      onInput={normalize}
                      dir="ltr"
                    />
                    <small>برای تطبیق هویت شهروندی و پیگیری درخواست‌ها استفاده می‌شود.</small>
                  </label>
                )}
              </>
            )}
            <button type="submit">
              {busy
                ? 'در حال بررسی…'
                : staff
                  ? 'ورود به مدیریت'
                  : challenge
                    ? registration
                      ? 'تأیید و ورود به پنل شهروندی'
                      : 'تأیید و ورود'
                    : 'دریافت کد تأیید'}
            </button>
          </fieldset>
        </form>
        {!staff && challenge && (
          <button
            className="portal-auth-back"
            type="button"
            disabled={busy}
            onClick={() => {
              setChallenge(null);
              setError('');
            }}
          >
            اصلاح شماره یا درخواست کد تازه
          </button>
        )}
        {challenge?.dev_code && (
          <p className="portal-auth-notice">
            کد محیط آزمایشی: <b dir="ltr">{challenge.dev_code}</b>
          </p>
        )}
        {!staff && (
          <p className="portal-auth-switch">
            {registration ? 'قبلاً ثبت‌نام کرده‌اید؟' : 'حساب شهروندی ندارید؟'}{' '}
            <a href={registration ? '/login' : '/register'}>
              {registration ? 'ورود شهروندان' : 'ثبت‌نام شهروندان'}
            </a>
          </p>
        )}
        {staff && (
          <a className="portal-auth-back" href="/forgot-password">
            بازیابی رمز عبور مدیریت
          </a>
        )}
        <a className="portal-auth-back" href="/">
          بازگشت به سایت
        </a>
      </section>
    </main>
  );
}
