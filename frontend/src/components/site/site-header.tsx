'use client';

import { useEffect, useRef, useState } from 'react';
import { officialNavigation, type NavigationItem } from '@/data/official-navigation';
import type { County } from '@/data/counties';
import { countyPortalHref, canonicalNavigation } from '@/lib/county-portal';
import { CountyBanner } from './county-banner';
import { DirectMenu } from './direct-menu';
import { OriginalIcon, type OriginalIconName } from './original-icons';

export type SiteBranding = {
  banner?: string;
  logo?: string;
  sloganImage?: string;
  sloganText?: string;
  name?: string;
};

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
  items: providedItems = officialNavigation.main,
  branding = {},
  county,
}: {
  items?: NavigationItem[];
  branding?: SiteBranding;
  county?: County;
}) {
  const items = canonicalNavigation(providedItems);
  const [mobile, setMobile] = useState(false);
  const [mega, setMega] = useState(false);
  const [category, setCategory] = useState(0);
  const [language, setLanguage] = useState(false);
  const header = useRef<HTMLElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const megaOpener = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLDivElement>(null);
  const megaCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const focusMegaCategory = useRef(false);
  const href = (path: string) => (county ? countyPortalHref(county, path) : path);
  const localPath = (path: string) =>
    county && path.startsWith('/' + county.slug) ? path.slice(county.slug.length + 1) || '/' : path;
  const rootLink = (path: string) => items.find((item) => localPath(item.href) === path);
  const groups = ['/services', '/service-agreement'].flatMap((path) =>
    items.filter((item) => localPath(item.href) === path),
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
      ].includes(localPath(item.href)),
  );
  const categories = groups.concat(extra);
  const selected = Math.min(category, Math.max(0, categories.length - 1));
  const utility = [
    ['تماس با ما', '/contact'],
    ['دسترسی سریع', '/quick-access'],
    ['سامانه شفافیت', '/transparency'],
    ['شرح وظایف واحدها', '/duties'],
    ['قوانین و مقررات', '/regulations'],
    ['دسترسی آزاد به اطلاعات', '/information'],
  ];
  const portalName = county
    ? 'فرمانداری شهرستان ' + county.name
    : (branding.name ?? 'استانداری مازندران');
  const banner = branding.banner;
  const image = (value: string | undefined, fallback: string) =>
    value && /^(?:\/(?!\/)|https?:\/\/)/.test(value) ? value : fallback;
  const logo = image(branding.logo, '/design/site/assets/image/logo.png');

  function cancelMegaClose() {
    if (megaCloseTimer.current !== null) clearTimeout(megaCloseTimer.current);
    megaCloseTimer.current = null;
  }

  function openMega() {
    cancelMegaClose();
    setMega(true);
  }

  function closeMega() {
    cancelMegaClose();
    setMega(false);
  }

  useEffect(
    () => () => {
      if (megaCloseTimer.current !== null) clearTimeout(megaCloseTimer.current);
    },
    [],
  );

  useEffect(() => {
    if (mega && focusMegaCategory.current) {
      focusMegaCategory.current = false;
      header.current?.querySelector<HTMLButtonElement>('.categories button')?.focus();
    }
  }, [mega]);

  useEffect(() => {
    function outside(event: PointerEvent) {
      if (!header.current?.contains(event.target as Node)) {
        closeMega();
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
      data-county-header={county?.slug}
      ref={header}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          setLanguage(false);
          if (mobile) setMobile(false);
          else if (mega) {
            closeMega();
            megaOpener.current?.focus();
          }
        }
      }}
    >
      <a className="source-skip" href="#main-content">
        رفتن به محتوای صفحه
      </a>
      {!county && (
        <div className="nav-bala">
          <nav className="nav-bala-right" aria-label="پیوندهای بالای سایت">
            {utility.map(([title, path]) => (
              <a key={path} href={href(path)}>
                {title}
              </a>
            ))}
            {county && <a href="/">پرتال استانداری</a>}
          </nav>
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
              <a className="search" href={href('/search')} aria-label="جستجو در سایت">
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
      )}
      <div className={'imageeee' + (county ? ' county-portal-banner' : '')}>
        {county && !banner ? (
          <CountyBanner county={county} />
        ) : (
          <img
            className="icx-responsive-img"
            src={image(banner, '/design/site/assets/image/baner.png')}
            width={1380}
            height={180}
            alt={
              county
                ? portalName
                : (branding.name ??
                  'استانداری مازندران؛ که مازندران شهر ما یاد باد، همیشه بر و بومش آباد باد')
            }
            fetchPriority="high"
          />
        )}
        <div className="shoar-sal">
          <img
            src={image(branding.sloganImage, '/design/site/assets/image/شعار پ.png')}
            alt="شعار سال"
          />
        </div>
      </div>
      <div className="top-header">
        <div className="header-box" data-mega-open={mega ? 'true' : undefined}>
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
            <a href={href('/')} aria-label="صفحه اصلی">
              <img src={logo} width={150} height={162} alt={portalName} />
            </a>
          </div>
          <nav className="desktop-menu" aria-label="منوی اصلی">
            <div className="menu-right">
              {navItem('/', 'home')}
              <div
                className={'menu-item has-mega source-mega' + (mega ? ' is-open' : '')}
                onMouseEnter={openMega}
                onMouseLeave={() => {
                  cancelMegaClose();
                  megaCloseTimer.current = setTimeout(() => {
                    if (
                      !header.current
                        ?.querySelector('.source-mega')
                        ?.contains(document.activeElement)
                    ) {
                      setMega(false);
                    }
                    megaCloseTimer.current = null;
                  }, 140);
                }}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node)) closeMega();
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
                    onClick={() => {
                      cancelMegaClose();
                      setMega(!mega);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'ArrowDown') {
                        event.preventDefault();
                        focusMegaCategory.current = !mega;
                        openMega();
                        if (mega)
                          header.current
                            ?.querySelector<HTMLButtonElement>('.categories button')
                            ?.focus();
                      }
                    }}
                  >
                    خدمات
                    <svg
                      className="source-mega-chevron"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                </div>
                <div
                  className="mega-menu"
                  id="source-services-menu"
                  hidden={!mega}
                  role="region"
                  aria-label={'خدمات و بخش‌های ' + portalName}
                >
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
                            {localPath(item.href) === '/services' ? 'خدمات الکترونیکی' : item.title}
                          </span>
                          <OriginalIcon name="arrow" className="arrow10" />
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="submenus">
                    {categories[selected] && (
                      <div className="source-mega-heading">
                        <div>
                          <span>دسترسی به بخش‌های {county ? 'فرمانداری' : 'استانداری'}</span>
                          <h2>
                            {localPath(categories[selected].href) === '/services'
                              ? 'خدمات الکترونیکی'
                              : categories[selected].title}
                          </h2>
                        </div>
                        <a href={categories[selected].href}>
                          مشاهدهٔ بخش <span aria-hidden="true">←</span>
                        </a>
                      </div>
                    )}
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
                  <a href={href('/install')}>
                    <OriginalIcon name="app" className="source-install-icon" />
                    <span>نصب اپلیکیشن</span>
                  </a>
                </div>
              </div>
              {navItem('/polls', 'poll')}
            </div>
            <div className="logo-wrapper">
              <a href={href('/')} aria-label={'صفحه اصلی ' + portalName}>
                <img src={logo} width={150} height={162} alt={portalName} />
              </a>
            </div>
            <div className="menu-left">
              {rootLink('/about') && (
                <DirectMenu item={rootLink('/about')!} icon="about" onOpen={closeMega} />
              )}
              {rootLink('/managers') && (
                <DirectMenu item={rootLink('/managers')!} icon="people" onOpen={closeMega} />
              )}
              {navItem('/service-agreement', 'agreement')}
              <div className="menu-item ai-menu-item">
                <div className="rast">
                  <span className="ai-badge">
                    <OriginalIcon name="ai" />
                    AI
                  </span>
                  <a href={href('/assistant')}>هوش مصنوعی سازمانی</a>
                </div>
              </div>
            </div>
          </nav>
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
                <img src={logo} className="mm-logo" alt={portalName} />
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
              <div className="mm-utility">
                {utility.map(([title, path]) => (
                  <a key={path} href={href(path)}>
                    {title}
                  </a>
                ))}
              </div>
              <div className="mm-footer">
                <a href={href('/install')}>نصب اپلیکیشن</a>
                <a href={href('/assistant')}>هوش مصنوعی سازمانی</a>
                <a href={href('/sitemap')}>نقشه سایت</a>
              </div>
            </div>
          )}
        </div>
        <div className="header-paen">
          <div className="marquee">
            <div className="marquee-content">
              <span>{branding.sloganText || 'اقتصاد مقاومتی در سایه وحدت ملی و امنیت ملی'}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
