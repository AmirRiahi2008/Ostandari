'use client';
import { useState } from 'react';
import { api, jsonBody } from '@/lib/api/client';
export function NewsletterConfirmation({ token, email }: { token?: string; email?: string }) {
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  async function confirm() {
    setBusy(true);
    try {
      await api('newsletter/confirm', { method: 'POST', body: jsonBody({ token, email }) });
      setMessage('عضویت شما تأیید شد.');
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'تأیید انجام نشد.');
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      {token && email && (
        <button
          className="portal-button"
          disabled={busy || Boolean(message === 'عضویت شما تأیید شد.')}
          onClick={confirm}
        >
          تأیید عضویت
        </button>
      )}
      <p role="status">{message}</p>
    </>
  );
}
