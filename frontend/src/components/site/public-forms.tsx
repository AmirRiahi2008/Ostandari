'use client';
import { useState, type FormEvent } from 'react';
import { api, ApiError, jsonBody } from '@/lib/api/client';

function messageOf(error: unknown) {
  return error instanceof ApiError && error.status === 503
    ? 'بک‌اند در دسترس نیست. سرویس Laravel را اجرا کنید و دوباره تلاش کنید.'
    : error instanceof Error
      ? error.message
      : 'ثبت درخواست انجام نشد.';
}
export function NewsletterForm() {
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [confirmation, setConfirmation] = useState('');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setBusy(true);
    setMessage('');
    try {
      const result = await api<{ dev_token?: string }>('newsletter/subscribe', {
        method: 'POST',
        body: jsonBody({ email: new FormData(form).get('email') }),
      });
      setMessage('درخواست عضویت ثبت شد. برای تکمیل، ایمیل تأیید را بررسی کنید.');
      if (result.data.dev_token)
        setConfirmation(
          '/newsletter/confirm?' +
            new URLSearchParams({
              email: String(new FormData(form).get('email')),
              token: result.data.dev_token,
            }),
        );
      form.reset();
    } catch (error) {
      setMessage(messageOf(error));
    } finally {
      setBusy(false);
    }
  }
  return (
    <form className="portal-form portal-newsletter" onSubmit={submit}>
      <label>
        عضویت در خبرنامه
        <input
          name="email"
          type="email"
          dir="ltr"
          autoComplete="email"
          required
          placeholder="ایمیل خود را وارد نمایید"
        />
      </label>
      <button className="portal-button" disabled={busy}>
        {busy ? 'در حال ثبت…' : 'عضویت در خبرنامه'}
      </button>
      <p role="status">{message}</p>
      {confirmation && <a href={confirmation}>تکمیل عضویت در محیط محلی</a>}
    </form>
  );
}
export function ContactForm({
  county,
  subject = '',
}: {
  county?: { slug: string; name: string };
  subject?: string;
}) {
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setBusy(true);
    setMessage('');
    setSuccess(false);
    try {
      const result = await api<{ reference: string }>('contact', {
        method: 'POST',
        body: jsonBody({ ...data, ...(county ? { county_slug: county.slug } : {}) }),
      });
      setMessage('پیام ثبت شد. کد پیگیری: ' + result.data.reference);
      setSuccess(true);
      form.reset();
    } catch (error) {
      setMessage(messageOf(error));
    } finally {
      setBusy(false);
    }
  }
  return (
    <form className="portal-form" onSubmit={submit}>
      {county && <p className="portal-notice">گیرنده: فرمانداری {county.name}</p>}
      <div className="portal-form-row">
        <label>
          نام و نام خانوادگی
          <input name="name" autoComplete="name" maxLength={120} required />
        </label>
        <label>
          ایمیل
          <input
            name="email"
            type="email"
            dir="ltr"
            autoComplete="email"
            maxLength={255}
            required
          />
        </label>
      </div>
      <div className="portal-form-row">
        <label>
          شماره تماس
          <input name="phone" type="tel" dir="ltr" autoComplete="tel" maxLength={40} />
        </label>
        <label>
          موضوع
          <input name="subject" defaultValue={subject} maxLength={255} required />
        </label>
      </div>
      <label>
        متن پیام
        <textarea name="body" rows={6} minLength={10} maxLength={10000} required />
      </label>
      <button className="portal-button" disabled={busy}>
        {busy ? 'در حال ارسال…' : 'ارسال پیام'}
      </button>
      <p role="status" className={success ? 'portal-success' : 'portal-form-message'}>
        {message}
      </p>
    </form>
  );
}
export function ArticleActions() {
  const [status, setStatus] = useState('');
  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setStatus('نشانی خبر کپی شد.');
    } catch {
      setStatus('نشانی خبر را از نوار آدرس مرورگر کپی کنید.');
    }
  }
  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({ title: document.title, url: window.location.href });
      } catch {}
    } else await copy();
  }
  return (
    <div className="portal-article-actions">
      <button type="button" onClick={copy}>
        کپی لینک خبر
      </button>
      <button type="button" onClick={share}>
        اشتراک‌گذاری
      </button>
      <button type="button" onClick={() => window.print()}>
        چاپ خبر
      </button>
      <span role="status">{status}</span>
    </div>
  );
}
export function PollCard({
  poll,
}: {
  poll: { id: number; question: string; status: string; options: { id: number; title: string }[] };
}) {
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [results, setResults] = useState<
    { id: number; title: string; percentage: number; votes: number }[] | null
  >(null);
  async function result() {
    try {
      const r = await api<{ options: NonNullable<typeof results> }>(
        'polls/' + poll.id + '/results',
      );
      setResults(r.data.options);
    } catch (e) {
      setMessage(messageOf(e));
    }
  }
  async function vote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    try {
      await api('polls/' + poll.id + '/vote', {
        method: 'POST',
        body: jsonBody({ option_id: Number(new FormData(event.currentTarget).get('option')) }),
      });
      setMessage('رأی شما ثبت شد.');
      await result();
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) {
        window.location.assign('/login?return=' + encodeURIComponent('/polls'));
        return;
      }
      setMessage(messageOf(e));
    } finally {
      setBusy(false);
    }
  }
  return (
    <article className="portal-panel">
      <h2>{poll.question}</h2>
      <form className="portal-form" onSubmit={vote}>
        {poll.options.map((option) => (
          <label className="portal-choice" key={option.id}>
            <input
              required
              type="radio"
              name="option"
              value={option.id}
              disabled={poll.status !== 'active'}
            />
            {option.title}
          </label>
        ))}
        <div className="portal-article-actions">
          {poll.status === 'active' && (
            <button className="portal-button" disabled={busy}>
              ثبت رأی
            </button>
          )}
          <button type="button" onClick={result}>
            مشاهده نتایج
          </button>
        </div>
      </form>
      {results &&
        results.map((option) => (
          <div key={option.id} className="portal-poll-result">
            <span>
              {option.title} — {option.percentage}٪
            </span>
            <meter min="0" max="100" value={option.percentage} />
          </div>
        ))}
      <p role="status">{message}</p>
    </article>
  );
}
export function AssistantForm() {
  const [reply, setReply] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const question = String(new FormData(e.currentTarget).get('question') ?? '').trim();
    setBusy(true);
    setReply('');
    try {
      const r = await api<{ answer: string }>('assistant/query', {
        method: 'POST',
        body: jsonBody({ question, locale: 'fa' }),
      });
      setReply(r.data.answer);
    } catch (error) {
      setReply(messageOf(error));
    } finally {
      setBusy(false);
    }
  }
  return (
    <form className="portal-form" onSubmit={submit}>
      <label>
        پرسش شما
        <textarea
          name="question"
          rows={4}
          minLength={3}
          maxLength={500}
          placeholder="دربارهٔ خدمات و محتوای پرتال بپرسید…"
          required
        />
      </label>
      <button className="portal-button" disabled={busy}>
        {busy ? 'در حال بررسی…' : 'ارسال پرسش'}
      </button>
      <div className="portal-assistant-reply" role="status">
        {reply}
      </div>
    </form>
  );
}
export function CommentForm({ id }: { id: string }) {
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setBusy(true);
    try {
      await api('contents/' + encodeURIComponent(id) + '/comments', {
        method: 'POST',
        body: jsonBody({ body: new FormData(form).get('body') }),
      });
      setMessage('نظر شما برای بررسی ثبت شد.');
      form.reset();
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        window.location.assign('/login?return=' + encodeURIComponent(window.location.pathname));
        return;
      }
      setMessage(messageOf(error));
    } finally {
      setBusy(false);
    }
  }
  return (
    <form className="portal-form" onSubmit={submit}>
      <label>
        دیدگاه شما
        <textarea name="body" rows={4} minLength={3} maxLength={5000} required />
      </label>
      <button className="portal-button" disabled={busy}>
        ثبت دیدگاه
      </button>
      <p role="status">{message}</p>
    </form>
  );
}

export function ForgotPasswordForm() {
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [resetHref, setResetHref] = useState('');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get('email'));
    setBusy(true);
    setMessage('');
    setResetHref('');
    try {
      const result = await api<{ dev_token?: string }>('auth/password/forgot', {
        method: 'POST',
        body: jsonBody({ email }),
      });
      setMessage('اگر حسابی با این ایمیل وجود داشته باشد، راهنمای بازیابی برای آن آماده می‌شود.');
      if (result.data.dev_token)
        setResetHref('/password?' + new URLSearchParams({ email, token: result.data.dev_token }));
    } catch (error) {
      setMessage(messageOf(error));
    } finally {
      setBusy(false);
    }
  }
  return (
    <form className="portal-form" onSubmit={submit}>
      <label>
        ایمیل حساب کاربری
        <input type="email" name="email" autoComplete="email" dir="ltr" maxLength={255} required />
      </label>
      <button className="portal-button" disabled={busy}>
        {busy ? 'در حال بررسی…' : 'دریافت راهنمای بازیابی'}
      </button>
      <p role="status">{message}</p>
      {resetHref && <a href={resetHref}>تعیین رمز جدید در محیط محلی</a>}
      <a href="/login">بازگشت به ورود</a>
    </form>
  );
}
