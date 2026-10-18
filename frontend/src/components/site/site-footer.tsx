import { officialNavigation } from '@/data/official-navigation';
import { OriginalIcon } from './original-icons';
import type { PublicRecord } from '@/lib/public-content';
import { officialSite } from '@/features/site/official-data';

export function SiteFooter({ contact }: { contact?: PublicRecord } = {}) {
  const field = (key: keyof typeof officialSite.contact) =>
    typeof contact?.[key] === 'string' ? String(contact[key]) : String(officialSite.contact[key]);
  const columns = [
    { title: 'سایت', items: officialNavigation.footer },
    {
      title: 'صفحات',
      items: [
        { id: 'news', title: 'اخبار و اطلاعیه‌ها', href: '/news' },
        { id: 'counties', title: 'فرمانداری‌ها', href: '/counties' },
        { id: 'managers', title: 'مدیران استان', href: '/managers' },
      ],
    },
    {
      title: 'خدمات',
      items: [
        { id: 'services', title: 'خدمات الکترونیکی', href: '/services' },
        { id: 'sitemap', title: 'نقشه سایت', href: '/sitemap' },
        { id: 'access', title: 'بیانیه دسترس‌پذیری', href: '/accessibility' },
        { id: 'rss', title: 'خوراک اخبار RSS', href: '/rss' },
      ],
    },
  ];
  return (
    <div className="footer" data-source-footer="true">
      <div className="top-footer">
        <div className="iconostandari">
          <OriginalIcon name="footer" />
        </div>
        <footer className="icx-footer-root">
          <div className="icx-footer-wrap">
            {columns.map((column) => (
              <nav className="icx-footer-col" key={column.title} aria-label={column.title}>
                <h4 className="icx-footer-title">{column.title}</h4>
                <ul className="icx-footer-list">
                  {column.items.map((item) => (
                    <li key={item.id}>
                      <a className="icx-footer-link" href={item.href}>
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            <address className="icx-footer-col icx-footer-contact">
              <h4 className="icx-footer-title">اطلاعات تماس</h4>
              <p className="icx-footer-text">{field('address')}</p>
              <p className="icx-footer-text">
                <a href={'mailto:' + field('email')}>{field('email')}</a>
              </p>
              <p className="icx-footer-text" dir="ltr">
                {field('phone')}
              </p>
              <p className="icx-footer-text">
                نمابر: <span dir="ltr">{field('fax')}</span>
              </p>
              <a className="icx-footer-link" href="/contact">
                ارتباط با ما
              </a>
            </address>
          </div>
        </footer>
      </div>
      <div className="bottom-footer">
        <span className="source-company">صدرا رایانه نوین طبرستان</span>
        <span>طراحی و توسعه یافته توسط</span>
      </div>
    </div>
  );
}
