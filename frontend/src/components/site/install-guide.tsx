'use client';

import { useId, useRef, useState, type KeyboardEvent } from 'react';

const devices = [
  {
    id: 'android',
    title: 'اندروید',
    steps: [
      'پرتال را در مرورگر اصلی گوشی، مانند Chrome، باز کنید.',
      'منوی سه‌نقطهٔ مرورگر را باز کنید و «افزودن به صفحهٔ اصلی» (Add to Home screen) یا «نصب برنامه» را انتخاب کنید.',
      'افزودن را تأیید کنید. از این پس با نشان استانداری در صفحهٔ اصلی به پرتال دسترسی دارید.',
    ],
  },
  {
    id: 'ios',
    title: 'آیفون و آیپد',
    steps: [
      'پرتال را در مرورگر Safari دستگاه باز کنید.',
      'دکمهٔ اشتراک‌گذاری (Share) را بزنید و «افزودن به صفحهٔ اصلی» (Add to Home Screen) را انتخاب کنید.',
      'نام میان‌بر را تأیید کنید و «افزودن» (Add) را بزنید. نشان پرتال در صفحهٔ اصلی قرار می‌گیرد.',
    ],
  },
  {
    id: 'desktop',
    title: 'رایانه',
    steps: [
      'پرتال را در مرورگر Chrome، Microsoft Edge یا Safari رایانه باز کنید.',
      'اگر گزینهٔ نصب در منوی مرورگر یا کنار نوار آدرس وجود دارد، آن را انتخاب کنید. در Safari مک نیز می‌توانید از گزینهٔ «افزودن به Dock» استفاده کنید.',
      'افزودن را تأیید کنید. اگر مرورگر شما گزینهٔ نصب ندارد، نشانی پرتال را به نشانک‌ها (Bookmarks) اضافه کنید.',
    ],
  },
] as const;

export function InstallGuide() {
  const [selected, setSelected] = useState(0);
  const prefix = 'install-' + useId().replace(/:/g, '');
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);

  function changeDevice(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowLeft') next = (index + 1) % devices.length;
    else if (event.key === 'ArrowRight') next = (index - 1 + devices.length) % devices.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = devices.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  }

  return (
    <section
      className="download-guide"
      id="installation-guide"
      aria-labelledby="install-guide-heading"
    >
      <div className="download-guide-intro">
        <span className="download-eyebrow">دسترسی آسان در چند قدم</span>
        <h2 id="install-guide-heading" tabIndex={-1}>
          پرتال را به دستگاهتان اضافه کنید
        </h2>
        <p>دستگاه خود را انتخاب کنید و مراحل را دنبال کنید.</p>
      </div>
      <div
        className="download-device-tabs"
        role="tablist"
        aria-label="نوع دستگاه"
        aria-orientation="horizontal"
      >
        {devices.map((device, index) => (
          <button
            key={device.id}
            type="button"
            role="tab"
            id={prefix + '-tab-' + device.id}
            aria-selected={selected === index}
            aria-controls={prefix + '-panel-' + device.id}
            tabIndex={selected === index ? 0 : -1}
            ref={(element) => {
              tabs.current[index] = element;
            }}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => changeDevice(event, index)}
          >
            {device.title}
          </button>
        ))}
      </div>
      {devices.map((device, index) => (
        <div
          key={device.id}
          className="download-device-panel"
          role="tabpanel"
          id={prefix + '-panel-' + device.id}
          aria-labelledby={prefix + '-tab-' + device.id}
          hidden={selected !== index}
          tabIndex={0}
        >
          <ol>
            {device.steps.map((step, number) => (
              <li key={step}>
                <span aria-hidden="true">{(number + 1).toLocaleString('fa-IR')}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </div>
      ))}
      <p className="download-browser-note">
        اگر گزینهٔ افزودن را نمی‌بینید، صفحه را در مرورگر اصلی دستگاه باز کنید؛ مرورگر داخلی بعضی
        پیام‌رسان‌ها این امکان را ندارد.
      </p>
    </section>
  );
}
