'use client';

import { useEffect, useRef, useState } from 'react';
import { officialNavigation, type NavigationItem } from '@/data/official-navigation';
import { OriginalIcon, type OriginalIconName } from './original-icons';

export type SiteBranding = { banner?: string; logo?: string; sloganImage?: string; name?: string };

function MenuTile({ item }: { item: NavigationItem }) {
  return (
    <a className="submenu-item" href={item.href}>
      <span className="gerd" />
      <span className="submenu-text">{item.title}</span>
    </a>
  );
}

function NestedMenu({ items, rootItem }: { items: NavigationItem[]; rootItem: NavigationItem }) {
  const [index, setIndex] = useState(0);
  const selected = Math.min(index, Math.max(0, items.length - 1));
  return (
    <div className="nested-mega">
      <ul className="nested-categories">
        {items.map((item, number) => (
          <li
            key={item.id}
            className={selected === number ? 'active' : ''}
            onMouseEnter={() => setIndex(number)}
          >
            <button
              type="button"
              onFocus={() => setIndex(number)}
              onClick={() => setIndex(number)}
              aria-expanded={selected === number}
              aria-controls={'nested-menu-' + item.id}
            >
              <span className="category-text">{item.title}</span>
              <OriginalIcon name="arrow" className="arrow10" />
            </button>
          </li>
        ))}
      </ul>
      <div className="nested-submenus">
        {items.map((item, number) => (
          <div
            className={'nested-submenu' + (selected === number ? ' active' : '')}
            key={item.id}
            id={'nested-menu-' + item.id}
            hidden={selected !== number}
          >
            <div className="submenu-grid">
              <MenuTile item={rootItem} />
              <MenuTile item={item} />
              {item.children.map((child) => (
                <MenuTile item={child} key={child.id} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileItems({ items }: { items: NavigationItem[] }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="mm-accordion">
      {items.map((item) => (
        <div className={'mm-item' + (open === item.id ? ' is-open' : '')} key={item.id}>
          <div className="mm-row">
            <a className="mm-link" href={item.href}>
              {item.title}
            </a>
            {item.children.length > 0 && (
              <button
                type="button"
                className="mm-toggle"
                aria-label={'زیرمنوی ' + item.title}
                aria-expanded={open === item.id}
                aria-controls={'mobile-' + item.id}
                onClick={() => setOpen(open === item.id ? null : item.id)}
              >
                <OriginalIcon name="arrow" className="arrow10" />
              </button>
            )}
          </div>
          {item.children.length > 0 && (
            <div className="mm-submenu" id={'mobile-' + item.id} hidden={open !== item.id}>
              <MobileItems items={item.children} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function SiteHeader({
  items = officialNavigation.main,
  branding = {},
}: {
  items?: NavigationItem[];
  branding?: SiteBranding;
}) {
  const [mobile, setMobile] = useState(false);
  const [mega, setMega] = useState(false);
  const [category, setCategory] = useState(0);
  const [language, setLanguage] = useState(false);
  const header = useRef<HTMLElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const megaOpener = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLDivElement>(null);
  const groups = ['/managers', '/services', '/duties', '/service-agreement', '/about'].flatMap(
    (path) => items.filter((item) => item.href === path),
  );
  const extra = items.filter(
    (item) =>
      ![
        '/',
        '/transparency',
        '/managers',
        '/services',
        '/duties',
        '/service-agreement',
        '/about',
        '/polls',
      ].includes(item.href),
  );
  const categories = groups.concat(extra);
  const selected = Math.min(category, Math.max(0, categories.length - 1));
  const rootLink = (path: string) => items.find((item) => item.href === path);
  const image = (value: string | undefined, fallback: string) =>
    value && /^(?:\/(?!\/)|https?:\/\/)/.test(value) ? value : fallback;
  const logo = image(branding.logo, '/design/site/assets/image/logo.png');

  useEffect(() => {
    function outside(event: PointerEvent) {
      if (!header.current?.contains(event.target as Node)) {
        setMega(false);
        setLanguage(false);
      }
    }
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, []);

  useEffect(() => {
    if (!mobile) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    drawer.current?.querySelector<HTMLButtonElement>('#closeMobileMenu')?.focus();
    return () => {
      document.body.style.overflow = previous;
      opener.current?.focus();
    };
  }, [mobile]);

  function navItem(path: string, icon: OriginalIconName) {
    const item = rootLink(path);
    return item ? (
      <div className="menu-item">
        <div className="rast">
          <OriginalIcon name={icon} />
          <a href={item.href}>{item.title}</a>
        </div>
      </div>
    ) : null;
  }

  return (
    <header
      className="header-container"
      data-react-header="true"
      ref={header}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          setLanguage(false);
          if (mobile) setMobile(false);
          else if (mega) {
            setMega(false);
            megaOpener.current?.focus();
          }
        }
      }}
    >
      <a className="source-skip" href="#main-content">
        رفتن به محتوای صفحه
      </a>
      <div className="nav-bala">
        <div className="nav-bala-right">
          <div className="tamas">
            <a href="/contact">تماس با ما</a>
          </div>
          <div className="dastresi">
            <a href="/quick-access">دسترسی سریع</a>
          </div>
          <div className="ghavanin">
            <a href="/regulations">قوانین و مقررات</a>
          </div>
          <div className="etelaat">
            <a href="/information">دسترسی آزاد به اطلاعات</a>
          </div>
        </div>
        <div className="nav-bala-left">
          <div className="iran-container">
            <div className="iran-img">
              <button
                type="button"
                id="flagSwitcher"
                aria-label="انتخاب زبان"
                aria-expanded={language}
                aria-controls="flagDropdown"
                onClick={() => setLanguage(!language)}
              >
                <OriginalIcon name="iran" />
              </button>
              <div
                className={'flag-dropdown' + (language ? ' active' : '')}
                id="flagDropdown"
                hidden={!language}
              >
                <a className="flag-option" href="/en" lang="en">
                  <OriginalIcon name="english" />
                  <span>English</span>
                </a>
                <a className="flag-option" href="/ar" lang="ar">
                  <OriginalIcon name="arabic" />
                  <span>العربية</span>
                </a>
              </div>
            </div>
            <a className="search" href="/search" aria-label="جستجو در سایت">
              <OriginalIcon name="search" />
            </a>
          </div>
          <div className="sabtnam-container">
            <div className="sabtnan">
              <a href="/register">ثبت نام</a>
            </div>
            <div className="vorod">
              <a href="/login">ورود به حساب</a>
            </div>
          </div>
        </div>
      </div>
      <div className="imageeee">
        <img
          className="icx-responsive-img"
          src={image(branding.banner, '/design/site/assets/image/baner.png')}
          width={1380}
          height={180}
          alt={
            branding.name ??
            'استانداری مازندران؛ که مازندران شهر ما یاد باد، همیشه بر و بومش آباد باد'
          }
          fetchPriority="high"
        />
        <div className="shoar-sal">
          <img
            src={image(branding.sloganImage, '/design/site/assets/image/شعار پ.png')}
            alt="شعار سال"
          />
        </div>
      </div>
      <div className="top-header">
        <div className="header-box">
          <button
            type="button"
            className="header-hamburger"
            id="hamburgerBtn"
            ref={opener}
            aria-label="باز کردن فهرست سایت"
            aria-expanded={mobile}
            aria-controls="mobileMenu"
            onClick={() => setMobile(true)}
          >
            <span />
            <span />
            <span />
          </button>
          <div className="hum-logo">
            <a href="/" aria-label="صفحه اصلی">
              <img src={logo} width={150} height={162} alt="نشان استانداری مازندران" />
            </a>
          </div>
          <div className="desktop-menu">
            <div className="menu-right">
              {navItem('/', 'home')}
              <div
                className={'menu-item has-mega source-mega' + (mega ? ' is-open' : '')}
                onMouseEnter={() => setMega(true)}
                onMouseLeave={() => setMega(false)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node)) setMega(false);
                }}
              >
                <div className="rast">
                  <OriginalIcon name="services" />
                  <button
                    type="button"
                    id="khadmat"
                    ref={megaOpener}
                    aria-expanded={mega}
                    aria-controls="source-services-menu"
                    onClick={() => setMega(!mega)}
                  >
                    خدمات
                  </button>
                </div>
                <div className="mega-menu" id="source-services-menu" hidden={!mega}>
                  <ul className="categories">
                    {categories.map((item, number) => (
                      <li
                        className={selected === number ? 'active' : ''}
                        key={item.id}
                        onMouseEnter={() => setCategory(number)}
                      >
                        <button
                          type="button"
                          aria-expanded={selected === number}
                          aria-controls={'source-submenu-' + item.id}
                          onFocus={() => setCategory(number)}
                          onClick={() => setCategory(number)}
                        >
                          <span className="category-text">
                            {item.href === '/services' ? 'خدمات الکترونیکی' : item.title}
                          </span>
                          <OriginalIcon name="arrow" className="arrow10" />
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="submenus">
                    {categories.map((item, number) => (
                      <div
                        key={item.id}
                        className={
                          'submenu' +
                          (item.children.some((child) => child.children.length)
                            ? ' submenu-nested'
                            : '') +
                          (selected === number ? ' active' : '')
                        }
                        id={'source-submenu-' + item.id}
                        hidden={selected !== number}
                      >
                        {item.children.some((child) => child.children.length) ? (
                          <NestedMenu items={item.children} rootItem={item} />
                        ) : (
                          <div className="submenu-grid">
                            <MenuTile item={item} />
                            {item.children.map((child) => (
                              <MenuTile item={child} key={child.id} />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="menu-item install-app-menu-item">
                <div className="rast">
                  <span className="app-badge">App</span>
                  <a href="/install">نصب اپلیکیشن</a>
                </div>
              </div>
              {navItem('/polls', 'poll')}
            </div>
            <div className="logo-wrapper">
              <a href="/" aria-label="صفحه اصلی استانداری مازندران">
                <img src={logo} width={150} height={162} alt="استانداری مازندران" />
              </a>
            </div>
            <div className="menu-left">
              {navItem('/transparency', 'transparency')}
              {navItem('/duties', 'duties')}
              {navItem('/service-agreement', 'agreement')}
              <div className="menu-item ai-menu-item">
                <div className="rast">
                  <span className="ai-badge">
                    <OriginalIcon name="ai" />
                    AI
                  </span>
                  <a href="/assistant">هوش مصنوعی سازمانی</a>
                </div>
              </div>
            </div>
          </div>
          <div
            className={'mm-backdrop' + (mobile ? ' active' : '')}
            id="mmBackdrop"
            hidden={!mobile}
            onClick={() => setMobile(false)}
          />
          {mobile && (
            <div
              className="mobile-menu-overlay active"
              id="mobileMenu"
              role="dialog"
              aria-modal="true"
              aria-label="فهرست سایت"
              ref={drawer}
              onKeyDown={(event) => {
                if (event.key !== 'Tab') return;
                const controls = [
                  ...event.currentTarget.querySelectorAll<HTMLElement>('a[href],button'),
                ].filter((element) => !element.closest('[hidden]'));
                const first = controls[0],
                  last = controls.at(-1);
                if (event.shiftKey && document.activeElement === first) {
                  event.preventDefault();
                  last?.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                  event.preventDefault();
                  first?.focus();
                }
              }}
            >
              <div className="mm-header">
                <img src={logo} className="mm-logo" alt="استانداری مازندران" />
                <button
                  type="button"
                  id="closeMobileMenu"
                  className="mm-close"
                  aria-label="بستن منو"
                  onClick={() => setMobile(false)}
                >
                  ×
                </button>
              </div>
              <MobileItems items={items} />
              <div className="mm-footer">
                <a href="/install">نصب اپلیکیشن</a>
                <a href="/assistant">هوش مصنوعی سازمانی</a>
                <a href="/sitemap">نقشه سایت</a>
              </div>
            </div>
          )}
        </div>
        <div className="header-paen">
          <div className="marquee">
            <div className="marquee-content">
              <span>اقتصاد مقاومتی در سایه وحدت ملی و امنیت ملی</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
