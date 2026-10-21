'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { api, jsonBody } from '@/lib/api/client';
import { prepareUpload } from '@/features/admin/uploads';

type Setting = { key: string; value: unknown; is_public: boolean };
const strings = {
  'site.name': 'نام سایت',
  'site.description': 'توضیح سایت',
  'site.logo': 'لوگوی سایت',
  'site.banner': 'تصویر سربرگ سایت',
  'site.slogan': 'تصویر شعار سال',
  'site.slogan_text': 'متن شعار زیر منو',
  'site.app_url': 'نشانی دانلود برنامه',
  'site.app_qr': 'تصویر کد QR برنامه',
};
const contactLabels = {
  address: 'نشانی',
  phone: 'تلفن',
  fax: 'فکس',
  email: 'ایمیل',
  postal_code: 'کد پستی',
};

export function SiteSettings({ preview }: { preview: boolean }) {
  const [records, setRecords] = useState<Setting[] | null>(null);
  const [message, setMessage] = useState('');
  const [revision, setRevision] = useState(0);
  const [busy, setBusy] = useState(false);
  const writing = useRef(false);
  useEffect(() => {
    if (preview) return;
    const abort = new AbortController();
    setMessage('');
    void api<Setting[]>('admin/settings', { signal: abort.signal })
      .then(({ data }) => {
        if (!abort.signal.aborted) setRecords(data);
      })
      .catch((error) => {
        if (!abort.signal.aborted) setMessage(error.message);
      });
    return () => abort.abort();
  }, [preview, revision]);
  const value = (key: string) => records?.find((row) => row.key === key)?.value;
  const displayValue = (key: string) => {
    const original = value(key);
    return typeof original === 'string'
      ? original
      : original &&
          typeof original === 'object' &&
          typeof (original as { url?: unknown }).url === 'string'
        ? (original as { url: string }).url
        : '';
  };
  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (writing.current || preview || !records) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    writing.current = true;
    setBusy(true);
    setMessage('');
    try {
      const settings: Setting[] = Object.keys(strings)
        .filter(
          (key) =>
            typeof value(key) !== 'object' ||
            displayValue(key) ||
            String(data.get(key) ?? '').trim(),
        )
        .map((key) => ({ key, value: String(data.get(key) ?? '').trim(), is_public: true }));
      const previous = value('site.contact');
      const contact =
        previous && typeof previous === 'object'
          ? { ...(previous as Record<string, unknown>) }
          : {};
      for (const key of Object.keys(contactLabels))
        contact[key] = String(data.get('contact.' + key) ?? '').trim();
      settings.push({ key: 'site.contact', value: contact, is_public: true });
      for (const key of ['site.logo', 'site.banner', 'site.slogan', 'site.app_qr']) {
        const input = form.elements.namedItem('upload.' + key) as HTMLInputElement;
        const file = input.files?.[0];
        if (!file) continue;
        const body = new FormData();
        body.set('file', await prepareUpload(file));
        body.set('visibility', 'public');
        const result = await api<{ url: string }>('media', { method: 'POST', body });
        const setting = settings.find((row) => row.key === key);
        if (setting) setting.value = result.data.url;
        else settings.push({ key, value: result.data.url, is_public: true });
        (form.elements.namedItem(key) as HTMLInputElement).value = result.data.url;
        input.value = '';
      }
      const result = await api<Setting[]>('admin/settings', {
        method: 'PUT',
        body: jsonBody({ settings }),
      });
      setRecords(result.data);
      setMessage('تنظیمات ذخیره شد و در سایت قابل مشاهده است.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'ذخیره انجام نشد.');
    } finally {
      writing.current = false;
      setBusy(false);
    }
  }
  if (preview) return <p>تنظیمات عمومی با اتصال واقعی به سامانه قابل ویرایش است.</p>;
  return (
    <section className="portal-settings">
      <p>
        نام سایت، سربرگ، لوگو، شعار و اطلاعات تماس را از این صفحه به‌روز کنید. برای تصاویر، فایل را
        همین‌جا انتخاب کنید؛ وارد کردن نشانی لازم نیست. عکس‌ها با زدن ذخیره بارگذاری می‌شوند.
      </p>
      {message && <p role="status">{message}</p>}
      {!records ? (
        <button type="button" className="portal-button" onClick={() => setRevision((n) => n + 1)}>
          دریافت تنظیمات
        </button>
      ) : (
        <form onSubmit={save} className="portal-resource-form">
          {Object.entries(strings).map(([key, label]) => (
            <label className="portal-resource-field" key={key}>
              {label}
              <input
                name={key}
                type={key === 'site.app_url' ? 'url' : 'text'}
                required={key === 'site.name'}
                defaultValue={displayValue(key)}
                maxLength={key === 'site.description' ? 2000 : 2048}
              />
              {['site.logo', 'site.banner', 'site.slogan', 'site.app_qr'].includes(key) && (
                <>
                  <span>یا بارگذاری تصویر جدید</span>
                  <input
                    name={'upload.' + key}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                  />
                </>
              )}
            </label>
          ))}
          <fieldset className="portal-resource-wide portal-contact-settings">
            <legend>اطلاعات تماس عمومی</legend>
            {Object.entries(contactLabels).map(([key, label]) => (
              <label key={key}>
                {label}
                <input
                  name={'contact.' + key}
                  type={key === 'email' ? 'email' : 'text'}
                  defaultValue={String(
                    (value('site.contact') as Record<string, unknown> | undefined)?.[key] ?? '',
                  )}
                  maxLength={key === 'address' ? 2000 : 255}
                />
              </label>
            ))}
          </fieldset>
          <button type="submit" className="portal-button" disabled={busy}>
            {busy ? 'در حال ذخیره…' : 'ذخیرهٔ تنظیمات'}
          </button>
          <a href="/" target="_blank" rel="noreferrer">
            مشاهدهٔ سایت
          </a>
        </form>
      )}
    </section>
  );
}
