'use client';

import { useEffect, useRef, useState } from 'react';
import { officialNavigation, type NavigationItem } from '@/data/official-navigation';

function MenuLinks({ items }: { items: NavigationItem[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <a href={item.href}>{item.title}</a>
          {item.children.length > 0 && <MenuLinks items={item.children} />}
        </li>
      ))}
    </ul>
  );
}

export function SiteHeader({ items = officialNavigation.main }: { items?: NavigationItem[] }) {
  const [active, setActive] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const root = useRef<HTMLElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function outside(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) setActive(null);
    }
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, []);

  useEffect(() => {
    if (!mobile) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    drawer.current?.querySelector<HTMLButtonElement>('button')?.focus();
    return () => {
      document.body.style.overflow = previous;
      opener.current?.focus();
    };
  }, [mobile]);

  function close() {
    setActive(null);
    setMobile(false);
  }

  return (
    <header
      className="header-container public-header"
      ref={root}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          const trigger = active
            ? root.current?.querySelector<HTMLButtonElement>(
                'button[aria-controls="public-menu-' + active + '"]',
              )
            : undefined;
          close();
          if (!mobile) trigger?.focus();
        }
      }}
    >
      <a className="public-skip" href="#main-content">
        رفتن به محتوای صفحه
      </a>
      <div className="public-utility">
        <nav aria-label="دسترسی‌های بالای سایت">
          {officialNavigation.utility
            .filter((item) => !['register', 'english', 'rss'].includes(item.id))
            .map((item) => (
              <a href={item.href} key={item.id}>
                {item.title}
              </a>
            ))}
        </nav>
        <div className="public-account">
          <a href="/search" aria-label="جستجو در سایت">
            ⌕
          </a>
          <a href="/en" lang="en">
            EN
          </a>
          <a href="/rss">RSS</a>
          <a href="/register">ثبت نام</a>
          <a href="/login">ورود به حساب</a>
        </div>
      </div>
      <a href="/" className="public-banner" aria-label="استانداری مازندران؛ صفحه اصلی">
        <img
          src="/design/site/assets/image/baner.png"
          alt="که مازندران شهر ما یاد باد، همیشه بر و بومش آباد باد"
          width={1380}
          height={180}
          fetchPriority="high"
        />
      </a>
      <div
        className="public-nav-shell"
        onMouseLeave={() => setActive(null)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) setActive(null);
        }}
      >
        <a href="/" className="public-brand" aria-label="صفحه اصلی استانداری مازندران">
          <img
            src="/design/site/assets/image/logo.png"
            width={100}
            height={108}
            alt="استانداری مازندران"
          />
        </a>
        <button
          ref={opener}
          className="public-menu-toggle"
          type="button"
          aria-expanded={mobile}
          aria-controls="public-mobile-menu"
          onClick={() => setMobile(true)}
        >
          ☰ <span>فهرست سایت</span>
        </button>
        <nav className="public-desktop-nav" aria-label="منوی اصلی">
          <ul>
            {items.map((item) => (
              <li
                key={item.id}
                className={active === item.id ? 'is-open' : ''}
                onMouseEnter={() => setActive(item.children.length ? item.id : null)}
              >
                <div className="public-nav-label">
                  <a href={item.href} onFocus={() => setActive(null)}>
                    {item.title}
                  </a>
                  {item.children.length > 0 && (
                    <button
                      type="button"
                      aria-label={'زیرمنوی ' + item.title}
                      aria-expanded={active === item.id}
                      aria-controls={'public-menu-' + item.id}
                      onClick={() => setActive(active === item.id ? null : item.id)}
                    >
                      ⌄
                    </button>
                  )}
                </div>
                {item.children.length > 0 && (
                  <div
                    className="public-mega"
                    id={'public-menu-' + item.id}
                    hidden={active !== item.id}
                  >
                    <div className="public-mega-heading">
                      <strong>{item.title}</strong>
                      <a href={item.href}>مشاهدهٔ همه ←</a>
                    </div>
                    <div className="public-mega-columns">
                      {item.children.map((child) => (
                        <section key={child.id}>
                          <a className="public-mega-title" href={child.href}>
                            {child.title}
                          </a>
                          {child.children.length > 0 && <MenuLinks items={child.children} />}
                        </section>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="public-nav-actions">
          <a className="public-app-link" href="/install">
            نصب اپلیکیشن
          </a>
          <a className="public-ai-link" href="/assistant">
            دستیار پرتال
          </a>
        </div>
      </div>
      {mobile && (
        <div className="public-mobile-backdrop" onClick={() => setMobile(false)}>
          <div
            className="public-mobile-drawer"
            id="public-mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="فهرست سایت"
            ref={drawer}
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => {
              if (event.key !== 'Tab') return;
              const targets = [
                ...event.currentTarget.querySelectorAll<HTMLElement>('a[href],button,summary'),
              ].filter((element) => element.getClientRects().length);
              const first = targets[0],
                last = targets.at(-1);
              if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last?.focus();
              }
              if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first?.focus();
              }
            }}
          >
            <div className="public-mobile-title">
              <strong>استانداری مازندران</strong>
              <button type="button" aria-label="بستن منو" onClick={() => setMobile(false)}>
                ×
              </button>
            </div>
            <nav aria-label="منوی اصلی موبایل">
              {items.map((item) =>
                item.children.length ? (
                  <details key={item.id}>
                    <summary>{item.title}</summary>
                    <a className="public-mobile-all" href={item.href}>
                      همهٔ {item.title}
                    </a>
                    <MenuLinks items={item.children} />
                  </details>
                ) : (
                  <a className="public-mobile-all" href={item.href} key={item.id}>
                    {item.title}
                  </a>
                ),
              )}
            </nav>
            <nav className="public-mobile-utility" aria-label="دسترسی‌های تکمیلی">
              <MenuLinks items={officialNavigation.utility} />
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
