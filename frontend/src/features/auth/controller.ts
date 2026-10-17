import { api, jsonBody } from '@/lib/api/client';
import { all, digits, feedback, fieldError, one } from '@/lib/dom';
import type { PageContext, PortalUser } from '@/types/portal';

export function safeReturn(path: string | null): string {
  return path &&
    path.startsWith('/') &&
    !path.startsWith('//') &&
    !/[\\\u0000-\u001f\u007f]/.test(path)
    ? path
    : '/admin';
}

export function initAuth(context: PageContext): void {
  const { root, signal, page } = context;
  root.addEventListener(
    'click',
    (event) => {
      const target = event.target as HTMLElement;
      const eye = target.closest('.showpassbutton');
      if (eye) {
        const input = eye.parentElement?.querySelector('input');
        if (input) input.type = input.type === 'password' ? 'text' : 'password';
      }
      if (target.closest('.login-google'))
        feedback(
          root,
          'ورود با گوگل در تنظیمات این پرتال فعال نشده است. از نام کاربری یا ورود پیامکی استفاده کنید.',
        );
      if (target.closest('.login-backtowebsite,.login-backtowebsite-phone'))
        window.location.assign('/');
    },
    { signal },
  );
  const form = one<HTMLFormElement>(root, '.login-form');
  if (!form) return;
  const inputs = all<HTMLInputElement>(form, 'input');
  inputs.forEach((input, i) => {
    input.required = true;
    input.setAttribute('aria-label', input.placeholder || (i === 0 ? 'نام کاربری' : 'رمز عبور'));
    if (page.path.includes('login')) input.autocomplete = i === 0 ? 'username' : 'current-password';
  });
  if (page.path === '/admin/login') {
    const title = one(root, '.login-row-title');
    if (title) title.textContent = 'ورود به مدیریت استانداری';
  }
  form.addEventListener(
    'submit',
    async (event) => {
      event.preventDefault();
      const submit = one<HTMLButtonElement>(form, 'button');
      if (submit?.disabled || !form.reportValidity()) return;
      if (submit) submit.disabled = true;
      try {
        if (page.path === '/login' || page.path === '/admin/login') {
          const local =
            context.preview &&
            (page.path === '/admin/login' || inputs[0]?.value.trim() === 'admin');
          const body = jsonBody({
            login: digits(inputs[0]?.value.trim() ?? ''),
            password: inputs[1]?.value,
          });
          const result = local
            ? await fetch('/api/local-admin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body,
              }).then(async (response) => {
                const result = await response.json();
                if (!response.ok) throw new Error(result.message);
                return result as { data: { user: PortalUser } };
              })
            : await api<{ user: PortalUser }>('auth/login', {
                method: 'POST',
                body: jsonBody({
                  login: digits(inputs[0]?.value.trim() ?? ''),
                  password: inputs[1]?.value,
                }),
              });
          const fallback = result.data.user.person_type === 'citizen' ? '/citizen' : '/admin';
          window.location.assign(
            new URLSearchParams(window.location.search).has('return')
              ? safeReturn(new URLSearchParams(window.location.search).get('return'))
              : fallback,
          );
        } else if (page.path === '/register') {
          sessionStorage.setItem(
            'ostandari_identity',
            JSON.stringify({
              name: inputs[0]?.value.trim(),
              mobile: digits(inputs[1]?.value.trim() ?? ''),
            }),
          );
          window.location.assign('/citizen');
        } else if (page.path === '/verify') {
          const pending = JSON.parse(sessionStorage.getItem('ostandari_challenge') ?? 'null');
          if (!pending?.challenge_id) {
            window.location.assign('/citizen');
            return;
          }
          await api('auth/otp/verify', {
            method: 'POST',
            body: jsonBody({
              challenge_id: pending.challenge_id,
              code: digits(inputs[0]?.value.trim() ?? ''),
            }),
          });
          sessionStorage.removeItem('ostandari_challenge');
          window.location.assign('/citizen');
        } else if (page.path === '/password') {
          const params = new URLSearchParams(window.location.search);
          if (!params.get('email') || !params.get('token'))
            throw new Error('این صفحه را با لینک معتبر بازیابی رمز باز کنید.');
          await api('auth/password/reset', {
            method: 'POST',
            body: jsonBody({
              email: params.get('email'),
              token: params.get('token'),
              password: inputs[0]?.value,
              password_confirmation: inputs[1]?.value,
            }),
          });
          window.location.assign('/login');
        }
      } catch (error) {
        fieldError(form, error);
      } finally {
        if (submit) submit.disabled = false;
      }
    },
    { signal },
  );
}
