import { OriginalCountyNews, type OriginalNewsItem } from '@/components/site/original-news';
import { articleHref, officialDate } from './official-data';
import { findCounty, officeHref, countyQuery, type County } from '@/data/counties';
import { PortalLayout, EmptyState, loadPortalChrome } from '@/components/site/portal-layout';
import { NewsletterForm } from '@/components/site/public-forms';
import { HomeSlider } from '@/components/site/home-slider';
import { OriginalManagerCards } from '@/components/site/original-content';
import { officialSite } from './official-data';
import { SafeRichText } from '@/components/site/safe-rich-text';
import { publicData, recordImage, plainText, type PublicRecord } from '@/lib/public-content';
import { notFound, redirect } from 'next/navigation';

export async function officeIdentity(slug: string | undefined) {
  const county = findCounty(slug);
  if (!county) notFound();
  if (slug !== county.slug) redirect(officeHref(county));
  const countyResult = await publicData<{
    county?: PublicRecord;
    members?: PublicRecord[];
    organizations?: PublicRecord[];
  }>('counties/by-slug/' + county.slug, {}, {});
  const record = countyResult.data.county;
  const organizations = countyResult.data.organizations ?? [];
  const organization = organizations.find((org) => org.type === 'county') ?? organizations[0];
  // Never show a different county's news or governor when its data is absent.
  return {
    county,
    record,
    organization,
    governor: countyResult.data.members?.find(
      (member) => member.kind === 'county_governor' && member.is_current === true,
    ),
    members: countyResult.data.members ?? [],
    unavailable: countyResult.unavailable,
  };
}
export async function officeContent(slug: string | undefined) {
  const identity = await officeIdentity(slug);
  const { county, organization } = identity;
  const filter = organization?.id ? '&organization_id=' + organization.id : '';
  const [news, announcements, galleries, links] = await Promise.all([
    organization
      ? publicData<PublicRecord[]>('news?per_page=6' + filter, [], [])
      : Promise.resolve({ data: [], unavailable: false }),
    organization
      ? publicData<PublicRecord[]>('announcements?per_page=6' + filter, [], [])
      : Promise.resolve({ data: [], unavailable: false }),
    organization
      ? publicData<PublicRecord[]>('galleries?per_page=4' + filter, [], [])
      : Promise.resolve({ data: [], unavailable: false }),
    publicData<PublicRecord[]>('links?per_page=8', [], []),
  ]);
  return { ...identity, news, announcements, galleries, links };
}
export function CountyNavigation({ county }: { county: County }) {
  const q = countyQuery(county);
  return (
    <nav className="portal-office-nav" aria-label={'بخش‌های فرمانداری ' + county.name}>
      <a href={officeHref(county)}>صفحه فرمانداری</a>
      <a href={officeHref(county, 'about')}>معرفی شهرستان</a>
      <a href={'/news' + q}>اخبار فرمانداری</a>
      <a href={'/gallery' + q}>گالری تصاویر</a>
      <a href={'/contact-us' + q + '&type=normal'}>ارتباط با فرماندار</a>
      <a href="/counties">همه فرمانداری‌ها</a>
    </nav>
  );
}
export async function OfficePage({ slug, section }: { slug?: string; section?: string }) {
  const chrome = loadPortalChrome();
  const { county, record, governor, news, announcements, galleries, links, members, unavailable } =
    await officeContent(slug);
  const q = countyQuery(county);
  const photo = recordImage(governor?.image);
  const mapImage = recordImage(record?.map_image);
  const newsItems = (items: PublicRecord[], type: string): OriginalNewsItem[] =>
    items.map((item) => ({
      id: String(item.id),
      title: String(item.title),
      excerpt: plainText(item.excerpt),
      date: officialDate(item.published_at),
      image: recordImage(item.cover ?? item.image),
      type,
      href:
        articleHref(item) + (articleHref(item).includes('?') ? '&' : '?') + 'name=' + county.slug,
    }));
  const people = members.filter((person) => person.kind !== 'county_governor');
  return (
    <PortalLayout
      path="/office"
      title={'فرمانداری شهرستان ' + county.name}
      designPath="/county"
      chrome={chrome}
    >
      <CountyNavigation county={county} />
      {section === 'about' ? (
        <div className="source-article">
          <h2>دربارهٔ شهرستان {county.name}</h2>
          {record?.description || record?.body ? (
            <SafeRichText
              html={String(record.body ?? record.description)}
              text={plainText(record.body ?? record.description)}
            />
          ) : (
            <EmptyState unavailable={unavailable}>
              معرفی شهرستان {county.name} هنوز در پرتال ثبت نشده است.
            </EmptyState>
          )}
          <a href={officeHref(county)}>بازگشت به صفحه فرمانداری</a>
        </div>
      ) : (
        <div className="source-office">
          <div className="container-body">
            <div className="container-body-right">
              <HomeSlider
                slides={officialSite.slides.map((slide, index) => ({
                  id: 'county-slide-' + index,
                  title: slide.title,
                  image: slide.image ?? undefined,
                  href: '/news' + q,
                }))}
              />
            </div>
            <div className="container-body-left">
              {photo ? (
                <img src={photo} alt={String(governor?.name ?? 'فرماندار')} />
              ) : (
                <img
                  src="/design/site/assets/image/logo.png"
                  alt="نشان استانداری"
                  className="source-seal"
                />
              )}
              <div className="name">
                <span>{String(governor?.name ?? 'فرمانداری ' + county.name)}</span>
                <p>
                  {governor?.name
                    ? 'فرماندار شهرستان ' + county.name
                    : 'پرتال اطلاع‌رسانی شهرستان ' + county.name}
                </p>
              </div>
              <a className="name-btn" href={'/contact-us' + q + '&type=normal'}>
                ارتباط با فرماندار
              </a>
              <a className="name-btn2" href={officeHref(county, 'about')}>
                معرفی شهرستان
              </a>
            </div>
          </div>
          <div className="cb2-wrapper">
            <aside className="cb2-left">
              <div className="cb2-card">
                <div className="cb2-card-head">
                  <h3>عضویت در خبرنامه</h3>
                </div>
                <div className="newsletter-body">
                  <p>از طریق ایمیل از آخرین اخبار و اطلاعیه‌ها مطلع شوید.</p>
                  <NewsletterForm />
                </div>
              </div>
              <div className="cb2-card gallery-card">
                <div className="cb2-card-head">
                  <h3>گالری چندرسانه‌ای</h3>
                </div>
                <div className="gallery-card-body">
                  {galleries.data.map((album) => (
                    <a
                      key={String(album.id)}
                      className="gallery-img-wrap"
                      href={'/gallery' + q + '&album=' + album.id}
                    >
                      {recordImage(
                        album.cover ?? (album.items as PublicRecord[] | undefined)?.[0]?.image,
                      ) && (
                        <img
                          src={recordImage(
                            album.cover ?? (album.items as PublicRecord[] | undefined)?.[0]?.image,
                          )}
                          alt=""
                          loading="lazy"
                        />
                      )}
                      <span>{album.title}</span>
                    </a>
                  ))}
                  {!galleries.data.length && (
                    <a href={'/gallery' + q}>گالری فرمانداری {county.name}</a>
                  )}
                </div>
              </div>
            </aside>
            <div>
              <OriginalCountyNews
                news={newsItems(news.data, 'news')}
                announcements={newsItems(announcements.data, 'announcement')}
                county={county.name}
              />
              <a href={'/news' + q}>همهٔ اخبار فرمانداری</a>
            </div>
            <aside className="cb2-right">
              <div className="cb2-card">
                <div className="cb2-card-head">
                  <h3>مدیران شهرستان {county.name}</h3>
                </div>
                {people.length ? (
                  <OriginalManagerCards
                    people={people}
                    profilePath={'/managers' + q}
                    contactHref={'/contact-us' + q}
                  />
                ) : (
                  <EmptyState>مشخصات مدیران شهرستان هنوز منتشر نشده است.</EmptyState>
                )}
              </div>
              <div className="cb2-card">
                <div className="cb2-card-head">
                  <h3>پیوندهای مرتبط</h3>
                </div>
                <ul className="portal-link-list">
                  {links.data.map((item) => (
                    <li key={String(item.id)}>
                      <a href={String(item.url ?? '/links')}>{String(item.title ?? item.name)}</a>
                    </li>
                  ))}
                  <li>
                    <a href="/services">میز خدمت الکترونیکی</a>
                  </li>
                  <li>
                    <a href={'/contact-us' + q}>ارتباط با فرمانداری</a>
                  </li>
                  <li>
                    <a href="/citizen">پیگیری درخواست‌ها</a>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
          <section className="qs-map-section">
            <div className="qs-map-inner">
              <div className="qs-map-text">
                <h2 className="qs-map-title">
                  {county.name} <span>در یک نگاه</span>
                </h2>
                {Boolean(record?.description) && (
                  <p className="qs-map-desc">{plainText(record?.description)}</p>
                )}
                <a className="qs-map-btn" href={officeHref(county, 'about')}>
                  دربارهٔ شهرستان {county.name}
                </a>
              </div>
              <div className="qs-map-visual">
                <div className="qs-map-frame">
                  {mapImage ? (
                    <img
                      src={mapImage}
                      alt={'نقشهٔ شهرستان ' + county.name}
                      className="qs-map-img"
                    />
                  ) : (
                    <svg
                      viewBox="0 0 655 360"
                      role="img"
                      aria-label={'محدودهٔ شهرستان ' + county.name + ' در نقشهٔ طرح'}
                    >
                      <path d={county.shape} fill="#00477a" stroke="#ffffff" strokeWidth="1" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </PortalLayout>
  );
}
