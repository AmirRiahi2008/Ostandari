
'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { api, jsonBody } from '@/lib/api/client';
import { recordImage } from '@/lib/public-content';
import { prepareUpload } from '@/features/admin/uploads';

export function AnnualSlogan({ preview }: { preview: boolean }) {
  const [current, setCurrent] = useState('/design/site/assets/image/شعار پ.png');
  const [file, setFile] = useState<File | null>(null);
  const [candidate, setCandidate] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const writing = useRef(false);
  const input = useRef<HTMLInputElement>(null);
  const request = useRef<AbortController | null>(null);

  useEffect(() => {
    if (preview) return;
    const abort = new AbortController();
<<<<<<< HEAD
=======

>>>>>>> 9391ead (finish)
    void api<Record<string, unknown>>('settings', { signal: abort.signal })
      .then(({ data }) => {
        if (!abort.signal.aborted)
          setCurrent(recordImage(data['site.slogan']) ?? '/design/site/assets/image/شعار پ.png');
      })
      .catch((error) => {
        if (!abort.signal.aborted) setMessage(error.message);
      });

    return () => abort.abort();
  }, [preview]);

  useEffect(() => {
    if (!file) {
      setCandidate('');
      return;
    }

    const url = URL.createObjectURL(file);
    setCandidate(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => () => request.current?.abort(), []);

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (preview || !file || writing.current) return;

    writing.current = true;
    setBusy(true);
    setMessage('');

    const abort = new AbortController();
    request.current = abort;

    try {
      const body = new FormData();
      body.set('file', await prepareUpload(file));
      body.set('visibility', 'public');
<<<<<<< HEAD
      if (abort.signal.aborted) return;
=======

      if (abort.signal.aborted) return;

>>>>>>> 9391ead (finish)
      const { data } = await api<{ url: string }>('media', {
        method: 'POST',
        body,
        signal: abort.signal,
      });

      if (abort.signal.aborted) return;
<<<<<<< HEAD
      const url = recordImage(data.url);
      if (!url) throw new Error('نشانی تصویر بارگذاری‌شده معتبر نیست.');
      await api('admin/settings', {
        method: 'PUT',
        body: jsonBody({ settings: [{ key: 'site.slogan', value: url, is_public: true }] }),
        signal: abort.signal,
      });
      if (abort.signal.aborted) return;
=======

      const url = recordImage(data.url);

      if (!url) {
        throw new Error('نشانی تصویر بارگذاری‌شده معتبر نیست.');
      }

      await api('admin/settings', {
        method: 'PUT',
        body: jsonBody({
          settings: [
            {
              key: 'site.slogan',
              value: url,
              is_public: true,
            },
          ],
        }),
        signal: abort.signal,
      });

      if (abort.signal.aborted) return;

>>>>>>> 9391ead (finish)
      setCurrent(url);
      setFile(null);

      if (input.current) input.current.value = '';

      setMessage('شعار سال جایگزین شد و در سربرگ استانداری و فرمانداری‌ها نمایش داده می‌شود.');
    } catch (error) {
      if (!abort.signal.aborted)
        setMessage(error instanceof Error ? error.message : 'ذخیره انجام نشد.');
    } finally {
      writing.current = false;
      if (!abort.signal.aborted) setBusy(false);
    }
  }

  return (
    <section className="portal-annual-slogan">
      <p>
        تصویر شعار سال، جدا از بنر سایت است. تصویر جدید را انتخاب کنید، پیش‌نمایش را ببینید و ذخیره
        کنید.
      </p>

      <div className="portal-slogan-preview" aria-label="پیش‌نمایش شعار سال در بنر">
        <img
          className="portal-slogan-background"
          src="/design/site/assets/image/baner.png"
          alt=""
        />

        <img
          className="portal-slogan-image"
          src={candidate || current}
          alt={candidate ? 'شعار جدید؛ هنوز ذخیره نشده' : 'شعار سال فعلی'}
        />
      </div>

      <form onSubmit={save} className="portal-resource-form">
        <label className="portal-resource-field portal-resource-wide">
          تصویر شعار سال

          <input
            ref={input}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            required
            disabled={preview || busy}
            onChange={(event) => {
              setFile(event.currentTarget.files?.[0] ?? null);
              setMessage('');
            }}
          />

          <small>
            PNG، JPG یا WebP؛ تصویر کامل داخل کادر نمایش داده می‌شود. برای زمینهٔ شفاف از PNG یا
            WebP استفاده کنید.
          </small>
        </label>

        <button type="submit" className="portal-button" disabled={preview || busy || !file}>
          {busy ? 'در حال ذخیره…' : 'ذخیره و جایگزینی شعار سال'}
        </button>

        <a href="/" target="_blank" rel="noreferrer">
          مشاهدهٔ سایت
        </a>
      </form>

      {preview && <p>برای ذخیرهٔ تصویر، اتصال واقعی داشبورد باید فعال باشد.</p>}
      {message && <p role="status">{message}</p>}
    </section>
  );
}
