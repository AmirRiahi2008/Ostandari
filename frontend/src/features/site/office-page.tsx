import { findCounty, officeHref, countyQuery, type County } from '@/data/counties';
import { PortalLayout, Panel, EmptyState } from '@/components/site/portal-layout';
import { NewsletterForm } from '@/components/site/public-forms';
import { NewsCard } from '@/components/site/news-card';
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
    unavailable: countyResult.unavailable,
  };
}
export async function officeContent(slug: string | undefined) {
  const identity = await officeIdentity(slug);
  const { county, organization } = identity;
  const filter = organization?.id ? '&organization_id=' + organization.id : '';
  const [news, galleries, links] = await Promise.all([
    organization
      ? publicData<PublicRecord[]>('news?per_page=6' + filter, [], [])
      : Promise.resolve({ data: [], unavailable: false }),
    organization
      ? publicData<PublicRecord[]>('galleries?per_page=4' + filter, [], [])
      : Promise.resolve({ data: [], unavailable: false }),
    publicData<PublicRecord[]>('links?per_page=8', [], []),
  ]);
  return { ...identity, news, galleries, links };
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
  const { county, record, governor, news, galleries, links, unavailable } =
    await officeContent(slug);
  const q = countyQuery(county);
  const photo = recordImage(governor?.image);
  return (
    <PortalLayout path="/office" title={'فرمانداری شهرستان ' + county.name}>
      <CountyNavigation county={county} />
      {section === 'about' ? (
        <Panel title={'دربارهٔ شهرستان ' + county.name}>
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
        </Panel>
      ) : (
        <>
          <div className="portal-office-lead">
            <section className="portal-office-hero">
              <img
                src="/design/site/assets/image/SlideShowImage48554642IMG_20260323_133439_246.jpg"
                alt="پرتال استانداری مازندران"
              />
              <div>
                <span>پرتال فرمانداری</span>
                <h2>شهرستان {county.name}</h2>
                <a className="portal-button" href={officeHref(county, 'about')}>
                  آشنایی با شهرستان
                </a>
              </div>
            </section>
            <section className="portal-governor-card">
              {photo ? (
                <img src={photo} alt={String(governor?.name ?? 'فرماندار')} />
              ) : (
                <img
                  className="portal-seal"
                  src="/design/site/assets/image/logo.png"
                  alt="نشان استانداری"
                />
              )}
              <h2>{governor?.name ? String(governor.name) : 'فرمانداری ' + county.name}</h2>
              <p>
                {governor?.name
                  ? 'فرماندار شهرستان ' + county.name
                  : 'پرتال اطلاع‌رسانی شهرستان ' + county.name}
              </p>
              <a className="portal-button" href={'/contact-us' + q + '&type=normal'}>
                ارتباط با فرماندار
              </a>
            </section>
          </div>
          <div className="portal-office-columns">
            <aside className="portal-office-aside">
              <Panel title="پیوندهای مرتبط">
                {links.data.length ? (
                  <ul className="portal-link-list">
                    {links.data.map((item) => (
                      <li key={String(item.id)}>
                        <a href={String(item.url ?? '/links')}>{item.title ?? item.name}</a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="portal-link-list">
                    <li>
                      <a href="/services">میز خدمت الکترونیکی</a>
                    </li>
                    <li>
                      <a href={'/contact-us' + q}>ارتباط با فرمانداری</a>
                    </li>
                    <li>
                      <a href="/citizen">پیگیری درخواست‌ها</a>
                    </li>
                    <li>
                      <a href="/links">پیوندهای استانداری</a>
                    </li>
                  </ul>
                )}
              </Panel>
            </aside>
            <div className="portal-office-news">
              <Panel title={'اخبار فرمانداری ' + county.name} href={'/news' + q}>
                {news.data.length ? (
                  <div className="portal-news-grid">
                    {news.data.map((item) => (
                      <NewsCard key={String(item.id)} item={item} county={county.slug} />
                    ))}
                  </div>
                ) : (
                  <EmptyState unavailable={news.unavailable || unavailable}>
                    خبری برای فرمانداری {county.name} ثبت نشده است.
                  </EmptyState>
                )}
              </Panel>
            </div>
            <aside className="portal-office-aside">
              <Panel title="خبرنامه">
                <NewsletterForm />
              </Panel>
              <Panel title="گالری تصاویر" href={'/gallery' + q}>
                {galleries.data.length ? (
                  galleries.data.map((item) => (
                    <a
                      className="portal-gallery-preview"
                      key={String(item.id)}
                      href={'/gallery' + q + '&album=' + item.id}
                    >
                      <img
                        src={
                          recordImage(
                            item.cover ?? (item.items as PublicRecord[] | undefined)?.[0]?.image,
                          ) ?? county.image
                        }
                        alt={String(item.title ?? 'گالری')}
                      />
                      <span>{item.title}</span>
                    </a>
                  ))
                ) : (
                  <a className="portal-gallery-preview" href={'/gallery' + q}>
                    <img src={county.image} alt="گالری تصاویر پرتال" />
                    <span>گالری فرمانداری {county.name}</span>
                  </a>
                )}
              </Panel>
            </aside>
          </div>
        </>
      )}
    </PortalLayout>
  );
}
