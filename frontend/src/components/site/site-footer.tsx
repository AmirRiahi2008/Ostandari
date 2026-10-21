import type { County } from '@/data/counties';
import { countyPortalHref, countyTitle } from '@/lib/county-portal';
import { OriginalIcon } from './original-icons';
import type { PublicRecord } from '@/lib/public-content';
import { officialSite } from '@/features/site/official-data';

function ContactIcon({ kind }: { kind: 'address' | 'email' | 'phone' }) {
  return (
    <svg
      className="icx-footer-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {kind === 'address' ? (
        <>
          <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="2.5" />
        </>
      ) : kind === 'email' ? (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 6 9 7 9-7" />
        </>
      ) : (
        <path d="m7 3 3 5-3 3c2 3 3 4 6 6l3-3 5 3c-1 4-3 5-6 4C8 19 5 16 3 9 2 6 3 4 7 3Z" />
      )}
    </svg>
  );
}

const columns = [
  {
    title: 'سایت',
    items: [
      { title: 'نظرسنجی دستگاه‌های اجرایی', href: '/polls' },
      { title: 'سامانه شفافیت', href: '/transparency' },
      { title: 'معرفی ما', href: '/about' },
    ],
  },
  {
    title: 'صفحات',
    items: [
      { title: 'صفحه اصلی', href: '/' },
      { title: 'تماس با ما', href: '/contact' },
    ],
  },
  {
    title: 'سرویس‌ها',
    items: [
      { title: 'عملکرد دستگاه', href: '/performance' },
      { title: 'بیانیه حریم خصوصی', href: '/privacy' },
      { title: 'بیانیه راهبرد مشارکت', href: '/participation' },
      { title: 'بیانیه سطح توافق خدمات', href: '/service-agreement/statement' },
    ],
  },
];

export function SiteFooter({ contact, county }: { contact?: PublicRecord; county?: County } = {}) {
  const href = (path: string) => (county ? countyPortalHref(county, path) : path);
  const field = (key: keyof typeof officialSite.contact) => {
    const value = contact?.[key];
    return typeof value === 'string' && value.trim()
      ? value
      : county
        ? ''
        : String(officialSite.contact[key]);
  };
  const phone = field('phone');
  return (
    <div className="footer" data-source-footer="true">
      <div className="top-footer">
        <div className="iconostandari">
          <OriginalIcon name="footer" />
        </div>
        <footer
          className="icx-footer-root"
          aria-label={county ? 'پاورقی فرمانداری ' + county.name : 'پاورقی استانداری مازندران'}
        >
          <div className="icx-footer-wrap">
            {columns.map((column) => (
              <nav className="icx-footer-col" key={column.title} aria-label={column.title}>
                <h4 className="icx-footer-title">{column.title}</h4>
                <ul className="icx-footer-list">
                  {column.items.map((item) => (
                    <li key={item.href}>
                      <a className="icx-footer-link" href={href(item.href)}>
                        {county ? countyTitle(item.title, county) : item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            <address className="icx-footer-col icx-footer-contact">
              <h4 className="icx-footer-title">
                {county ? 'فرمانداری ' + county.name : 'اطلاعات تماس'}
              </h4>
              {county && !field('address') && !phone && (
                <p className="icx-footer-text">اطلاعات تماس این فرمانداری هنوز ثبت نشده است.</p>
              )}
              {field('address') && (
                <p className="icx-footer-text">
                  <ContactIcon kind="address" />
                  <span>{field('address')}</span>
                </p>
              )}
              {field('email') && (
                <p className="icx-footer-text">
                  <ContactIcon kind="email" />
                  <a href={'mailto:' + field('email')}>
                    <bdi>{field('email')}</bdi>
                  </a>
                </p>
              )}
              {phone && (
                <p className="icx-footer-text">
                  <ContactIcon kind="phone" />
                  <a
                    href={'tel:' + phone.split('-')[0].replace(/[^\d+]/g, '')}
                    aria-label={'تلفن ' + phone}
                  >
                    <bdi>{phone}</bdi>
                  </a>
                </p>
              )}
              {field('fax') && (
                <p className="icx-footer-text">
                  <ContactIcon kind="phone" />
                  <span aria-label="نمابر">
                    <bdi>{field('fax')}</bdi>
                  </span>
                </p>
              )}
            </address>
          </div>
        </footer>
      </div>
      <div className="bottom-footer">
        <a href="https://sadrasoft.ir" className="source-footer-credit">
          <span>طراحی و توسعه یافته توسط</span>
          <span className="source-company">صدرا رایانه نوین طبرستان</span>
        </a>
      </div>
    </div>
  );
}
