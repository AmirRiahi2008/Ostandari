import { cache } from 'react';
import { countyPortalHref } from '@/lib/county-portal';
import type { ReactNode } from 'react';
import { notFound, redirect } from 'next/navigation';
import { OriginalCountyNews, type OriginalNewsItem } from '@/components/site/original-news';
import { counties, findCounty, officeHref, type County } from '@/data/counties';
import { PortalLayout, EmptyState, loadPortalChrome } from '@/components/site/portal-layout';
import { CountyArtwork } from '@/components/site/county-artwork';
import { NewsletterForm } from '@/components/site/public-forms';
import { OriginalManagerCards } from '@/components/site/original-content';
import { SafeRichText } from '@/components/site/safe-rich-text';
import { publicData, recordImage, plainText, type PublicRecord } from '@/lib/public-content';
import { safeDestination } from '@/lib/urls';
import { officialDate } from './official-data';

export const officeIdentity = cache(async (slug: string | undefined) => {
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
  const organization = organizations.find((org) => org.type === 'county');
  // A missing county organization must never fall back to records from another county.
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
});

export async function officeContent(slug: string | undefined) {
  const identity = await officeIdentity(slug);
  const { organization } = identity;
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
    organization
      ? publicData<PublicRecord[]>('links?per_page=8' + filter, [], [])
      : Promise.resolve({ data: [], unavailable: false }),
  ]);
  return { ...identity, news, announcements, galleries, links };
}

function OfficePanel({
  title,
  href,
  children,
  className = '',
}: {
  title: string;
  href?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={'portal-office-panel ' + className}>
      <header className="portal-office-panel-head">
        <h2>{title}</h2>
        {href && (
          <a href={href}>
            مشاهده همه <span aria-hidden="true">←</span>
          </a>
        )}
      </header>
      <div className="portal-office-panel-body">{children}</div>
    </section>
  );
}

function OfficeGovernor({ county, governor }: { county: County; governor?: PublicRecord }) {
  const photo = recordImage(governor?.image);
  return (
    <aside className="portal-office-governor" aria-label={'فرماندار شهرستان ' + county.name}>
      <span className="portal-office-eyebrow">فرمانداری شهرستان {county.name}</span>
      <div className={'portal-office-portrait' + (!photo ? ' is-seal' : '')}>
        <img
          src={photo ?? '/design/site/assets/image/logo.png'}
          alt={
            photo
              ? String(governor?.name ?? 'فرماندار شهرستان ' + county.name)
              : 'نشان استانداری مازندران'
          }
          width={144}
          height={168}
        />
      </div>
      <h2>{String(governor?.name ?? 'فرمانداری ' + county.name)}</h2>
      <p>
        {governor?.name
          ? 'فرماندار شهرستان ' + county.name
          : 'پرتال اطلاع‌رسانی شهرستان ' + county.name}
      </p>
      <div className="portal-office-actions">
        <a className="portal-office-button" href={countyPortalHref(county, '/contact?type=normal')}>
          ارتباط با فرماندار
        </a>
        <a className="portal-office-button is-outline" href={officeHref(county, 'about')}>
          معرفی شهرستان
        </a>
      </div>
    </aside>
  );
}

function CountyLocator({ county, record }: { county: County; record?: PublicRecord }) {
  const image = recordImage(record?.map_image);
  return (
    <section className="portal-office-locator" aria-label={county.name + ' در یک نگاه'}>
      <div className="portal-office-location-copy">
        <span className="portal-office-eyebrow">استان مازندران</span>
        <h2>
          {county.name} <span>در یک نگاه</span>
        </h2>
        {Boolean(record?.description) && <p>{plainText(record?.description)}</p>}
        <a className="portal-office-button" href={officeHref(county, 'about')}>
          دربارهٔ شهرستان {county.name}
          <span aria-hidden="true">←</span>
        </a>
      </div>
      <div className="portal-office-location-map">
        {image ? (
          <img src={image} alt={'نقشهٔ شهرستان ' + county.name} loading="lazy" />
        ) : (
          <svg
            viewBox="0 -20 650 315"
            role="img"
            aria-label={'موقعیت شهرستان ' + county.name + ' در استان مازندران'}
          >
            {counties.map((region) => (
              <path
                key={region.slug}
                d={region.shape}
                fill={region.slug === county.slug ? '#00477a' : '#e5edf5'}
                stroke={region.slug === county.slug ? '#003353' : '#a9bed0'}
                strokeWidth={region.slug === county.slug ? 1.7 : 0.8}
                vectorEffect="non-scaling-stroke"
                data-selected={region.slug === county.slug ? 'true' : undefined}
              />
            ))}
            {county.labelAnchor && (
              <path
                d={
                  'M' +
                  county.labelAnchor.join(' ') +
                  ' L' +
                  county.label[0] +
                  ' ' +
                  (county.label[1] + 8)
                }
                stroke="#00477a"
                strokeWidth="1.2"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
            )}
            <text
              x={county.label[0]}
              y={county.label[1]}
              fill="#003e68"
              stroke="#fff"
              strokeWidth="4"
              paintOrder="stroke"
              fontSize="15"
              fontWeight="800"
              textAnchor="middle"
              dominantBaseline="middle"
              direction="rtl"
            >
              {county.name}
            </text>
          </svg>
        )}
        <p>
          <span aria-hidden="true" />
          موقعیت شهرستان {county.name}
        </p>
      </div>
    </section>
  );
}

export async function OfficePage({ slug, section }: { slug?: string; section?: string }) {
  const chrome = loadPortalChrome();
  const {
    county,
    record,
    organization,
    governor,
    news,
    announcements,
    galleries,
    links,
    members,
    unavailable,
  } = await officeContent(slug);
  const href = (path: string) => countyPortalHref(county, path);
  const about = section === 'about';
  const people = members.filter((person) => person.kind !== 'county_governor');
  const newsItems = (items: PublicRecord[], type: string): OriginalNewsItem[] =>
    items.map((item) => ({
      id: String(item.id),
      title: String(item.title),
      excerpt: plainText(item.excerpt),
      date: officialDate(item.published_at),
      image: recordImage(item.cover ?? item.image),
      type,
      href: href('/news/' + encodeURIComponent(String(item.id))),
    }));
  return (
    <PortalLayout
      path={officeHref(county, about ? 'about' : undefined)}
      county={county}
      organization={organization}
      title={'فرمانداری شهرستان ' + county.name}
      designPath="/county"
      chrome={chrome}
    >
      <div
        className="source-office portal-county-office"
        data-county-office={county.slug}
        data-office-view={about ? 'about' : 'home'}
      >
        <div className="portal-office-lead">
          <section className="portal-office-identity" aria-label={'معرفی فرمانداری ' + county.name}>
            <div className="portal-office-intro">
              <span className="portal-office-eyebrow">پرتال اطلاع‌رسانی شهرستان</span>
              <h2>
                فرمانداری شهرستان <strong>{county.name}</strong>
              </h2>
              <p>اخبار، اطلاعیه‌ها و راه‌های ارتباط با فرمانداری شهرستان {county.name}</p>
              <a className="portal-office-button" href={href('/news')}>
                اخبار شهرستان<span aria-hidden="true">←</span>
              </a>
            </div>
            <div className="portal-office-hero-art">
              <CountyArtwork county={county} loading="eager" />
            </div>
          </section>
          <OfficeGovernor county={county} governor={governor} />
        </div>
        {recordImage(organization?.aerial) && (
          <figure className="county-aerial-panel">
            <img
              src={recordImage(organization?.aerial)}
              alt={'تصویر هوایی شهرستان ' + county.name}
              loading="lazy"
            />
            <figcaption>تصویر هوایی شهرستان {county.name}</figcaption>
          </figure>
        )}
        <div className="portal-office-content-grid">
          <div className="portal-office-main-column">
            {about ? (
              <OfficePanel title={'دربارهٔ شهرستان ' + county.name} className="portal-office-about">
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
              </OfficePanel>
            ) : (
              <OfficePanel
                title="اخبار و اطلاعیه‌ها"
                href={href('/news')}
                className="portal-office-news"
              >
                <OriginalCountyNews
                  news={newsItems(news.data, 'news')}
                  announcements={newsItems(announcements.data, 'announcement')}
                  county={county.name}
                  newsUnavailable={unavailable || news.unavailable}
                  announcementsUnavailable={unavailable || announcements.unavailable}
                />
              </OfficePanel>
            )}
            <OfficePanel title="گالری تصاویر" href={href('/gallery')}>
              {galleries.data.length ? (
                <div className="portal-office-gallery">
                  {galleries.data.map((album) => {
                    const image = recordImage(
                      album.cover ?? (album.items as PublicRecord[] | undefined)?.[0]?.image,
                    );
                    return (
                      <a key={String(album.id)} href={href('/gallery?album=' + album.id)}>
                        <div className="portal-office-gallery-image">
                          {image ? (
                            <img src={image} alt="" loading="lazy" width={420} height={270} />
                          ) : (
                            <span aria-hidden="true">گالری تصاویر</span>
                          )}
                        </div>
                        <h3>{String(album.title ?? 'گالری فرمانداری ' + county.name)}</h3>
                      </a>
                    );
                  })}
                </div>
              ) : (
                <EmptyState unavailable={unavailable || galleries.unavailable}>
                  تصویری برای فرمانداری {county.name} منتشر نشده است.
                </EmptyState>
              )}
            </OfficePanel>
          </div>
          <aside
            className="portal-office-sidebar"
            aria-label={'اطلاعات و خدمات فرمانداری ' + county.name}
          >
            <OfficePanel title={'مدیران شهرستان ' + county.name}>
              {people.length ? (
                <OriginalManagerCards
                  people={people}
                  profilePath={href('/managers')}
                  contactHref={href('/contact')}
                />
              ) : (
                <EmptyState unavailable={unavailable}>
                  مشخصات مدیران شهرستان هنوز منتشر نشده است.
                </EmptyState>
              )}
            </OfficePanel>
            <OfficePanel title="دسترسی سریع">
              <div className="portal-office-shortcuts">
                <a href={href('/services')}>
                  میز خدمت الکترونیکی<span aria-hidden="true">←</span>
                </a>
                <a href={href('/contact')}>
                  ارتباط با فرمانداری<span aria-hidden="true">←</span>
                </a>
                <a href="/citizen">
                  پیگیری درخواست‌ها<span aria-hidden="true">←</span>
                </a>
              </div>
            </OfficePanel>
            <OfficePanel title="عضویت در خبرنامه" className="portal-office-newsletter">
              <p>از طریق ایمیل از آخرین اخبار و اطلاعیه‌ها مطلع شوید.</p>
              <NewsletterForm />
            </OfficePanel>
            {links.data.length > 0 && (
              <OfficePanel title="پیوندهای مرتبط">
                <ul className="portal-office-links">
                  {links.data.map((item) => (
                    <li key={String(item.id)}>
                      <a href={href(safeDestination(item.url, '/links'))}>
                        {String(item.title ?? item.name)}
                      </a>
                    </li>
                  ))}
                </ul>
              </OfficePanel>
            )}
          </aside>
        </div>
        <CountyLocator county={county} record={record} />
      </div>
    </PortalLayout>
  );
}
