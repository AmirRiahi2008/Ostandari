import { TransparencyContent } from './transparency-page';
import { membersForGroup } from '@/data/manager-groups';
import { officeIdentity } from './office-page';
import { PortalLayout, EmptyState, loadPortalChrome } from '@/components/site/portal-layout';
import { SafeRichText } from '@/components/site/safe-rich-text';
import { PollCard } from '@/components/site/public-forms';
import {
  OriginalDirectory,
  OriginalManagerCards,
  OriginalNewsCards,
} from '@/components/site/original-content';
import { plainText, type PublicRecord } from '@/lib/public-content';
import { safeDestination } from '@/lib/urls';
import {
  canUseSnapshot,
  metadata,
  officialDate,
  officialImage,
  officialRead,
  officialSite,
  sectionById,
  sourceArticle,
  type OfficialSection,
} from './official-data';
import { first, type Search } from './search-params';
import { ContentArticle, ArticleBreadcrumb } from '@/components/site/content-article';
import { OfficialGallery } from './official-gallery';

function SectionLinks({ ids }: { ids: string[] }) {
  return (
    <OriginalDirectory
      items={ids.flatMap((id) => (sectionById.has(id) ? [sectionById.get(id)!] : []))}
    />
  );
}

export async function OfficialSectionPage({
  section,
  search = {},
}: {
  section: OfficialSection;
  search?: Search;
}) {
  const chrome = loadPortalChrome();
  const { kind, id } = section;
  const countyName = first(search.name);
  const countyIdentity =
    kind === 'managers' && countyName ? await officeIdentity(countyName) : undefined;
  const memberKind = ['district_head', 'village_head'].includes(first(search.kind) ?? '')
    ? first(search.kind)
    : undefined;

  let article: PublicRecord | undefined;
  let items: PublicRecord[] = [];
  let unavailable = false;
  if (kind === 'article') {
    const result = await officialRead(
      'contents/by-slug/' + section.record_type + '/' + encodeURIComponent(section.record_slug!),
    );
    article =
      (result.data as { content?: PublicRecord } | undefined)?.content ??
      (canUseSnapshot(result.unavailable) ? sourceArticle(section) : undefined);
    unavailable = result.unavailable;
  } else if (
    [
      'news',
      'documents',
      'tenders',
      'services',
      'links',
      'faqs',
      'governors',
      'polls',
      'managers',
    ].includes(kind)
  ) {
    const endpoint =
      kind === 'governors'
        ? 'members?kind=governor&'
        : kind === 'managers'
          ? 'members?kind=' +
            (memberKind ??
              (section.group === '4'
                ? 'county_governor'
                : section.group === '6'
                  ? 'advisor'
                  : 'manager')) +
            '&'
          : kind + '?';
    const result =
      countyIdentity && !countyIdentity.record?.id
        ? { data: [], unavailable: countyIdentity.unavailable }
        : await officialRead(
            endpoint +
              'per_page=100&locale=fa' +
              (countyIdentity?.record?.id ? '&county_id=' + countyIdentity.record.id : ''),
          );
    items = Array.isArray(result.data) ? (result.data as PublicRecord[]) : [];
    items = items.filter(
      (item) =>
        !String(item.title ?? item.name).includes('آزمایشی') &&
        !String(item.bio ?? item.excerpt).includes('اطلاعات نمایشی'),
    );
    if (kind === 'services' && id !== 'services')
      items = items.filter((item) => item.slug === 'official-' + id);
    if (kind === 'managers') items = membersForGroup(items, section.group);
    if (!items.length && canUseSnapshot(result.unavailable) && kind === 'news')
      items = officialSite.news.filter((item) => item.type === 'news');
    if (!items.length && canUseSnapshot(result.unavailable) && kind === 'documents')
      items = officialSite.news.filter((item) => item.type === 'document');
    if (!items.length && canUseSnapshot(result.unavailable) && kind === 'tenders')
      items = officialSite.news.filter((item) => item.type === 'tender');
    if (!items.length && canUseSnapshot(result.unavailable) && kind === 'governors')
      items = [officialSite.governor];
    unavailable = result.unavailable;
  } else if (!section.children.length && kind === 'page' && id !== 'menu-195') {
    const result = await officialRead(
      'contents/by-slug/page/official-page-' + encodeURIComponent(id),
    );
    article = (result.data as { content?: PublicRecord } | undefined)?.content;
    unavailable = result.unavailable;
  }

  const selectedPerson = first(search.person);
  if (selectedPerson && ['managers', 'governors'].includes(kind))
    items = items.filter((item) => String(item.id ?? item.name) === selectedPerson);
  const source = safeDestination(
    metadata(article ?? {}).source_url ?? section.source_url,
    'https://ostan-mz.ir/',
  );
  const partial =
    !article?.body ||
    ['homepage_excerpt', 'title_only', 'source_reference'].includes(
      String(metadata(article ?? {}).content_completeness),
    );
  const image = article ? officialImage(article) : undefined;
  const isDuties = id === 'duties' || id.startsWith('duties-group-');
  const isServices = id === 'services' || kind === 'services';
  const designPath =
    id === 'menu-195'
      ? '/governorate'
      : kind === 'article'
        ? '/news'
        : kind === 'governors'
          ? '/governors'
          : isDuties
            ? '/duties'
            : isServices
              ? id === 'menu-1'
                ? '/services/provincial'
                : '/services'
              : kind === 'links'
                ? '/links'
                : id === 'gallery'
                  ? '/gallery'
                  : '/';
  let content;
  if (id === 'menu-195') content = <TransparencyContent />;
  else if (kind === 'article')
    content = (
      <>
        <ArticleBreadcrumb
          links={[
            { title: 'صفحه اصلی', href: '/' },
            {
              title:
                section.record_type === 'document' || section.record_type === 'resolution'
                  ? 'اسناد و مصوبات'
                  : 'اخبار و مطالب',
              href:
                section.record_type === 'document' || section.record_type === 'resolution'
                  ? '/regulations'
                  : '/news',
            },
          ]}
          title={String(article?.title ?? section.title)}
        />
        <div className="portal-article-layout">
          {article ? (
            <ContentArticle
              article={article}
              image={image}
              text={plainText(article.body)}
              showSummary={!article.body || !partial}
            >
              {partial && (
                <p className="source-reference">
                  این متن، چکیدهٔ منتشرشده در صفحهٔ اصلی سایت قدیمی است. متن کامل در منبع قرار دارد.
                </p>
              )}
            </ContentArticle>
          ) : (
            <EmptyState unavailable={unavailable}>این مطلب در دسترس نیست.</EmptyState>
          )}
          <aside className="portal-related-panel">
            <h3>مطالب مرتبط</h3>
            <SectionLinks
              ids={
                sectionById
                  .get(section.record_type === 'document' ? 'regulations' : 'news')
                  ?.children.filter((child) => child !== id)
                  .slice(0, 6) ?? []
              }
            />
          </aside>
        </div>
      </>
    );
  else if (kind === 'governors')
    content = (
      <div className="advar-wrap">
        <div className="advar-head">
          <h2>استانداران مازندران</h2>
        </div>
        <div className={'advar-grid' + (selectedPerson ? ' portal-official-profile' : '')}>
          {items.map((person) => (
            <article
              className={
                'advar-card' +
                (person.is_current === true || person.name === officialSite.governor.name
                  ? ' advar-current'
                  : '')
              }
              key={String(person.id ?? person.name)}
            >
              {person.is_current === true && <span className="advar-ribbon">فعلی</span>}
              <div className="advar-avatar">
                {officialImage(person) && (
                  <img
                    className="source-governor-image"
                    src={officialImage(person)}
                    alt={String(person.name)}
                  />
                )}
              </div>
              <h3 className="advar-name">{String(person.name)}</h3>
              <span className="advar-badge">{String(person.position ?? 'استاندار مازندران')}</span>
              <div className="advar-divider" />
              {Boolean(person.bio) && <p className="advar-desc">{plainText(person.bio)}</p>}
              {selectedPerson && Boolean(person.body) && (
                <SafeRichText html={String(person.body)} text={plainText(person.body)} />
              )}
              <div className="advar-actions">
                <a
                  className="btn-profile"
                  href={'/governors?person=' + encodeURIComponent(String(person.id ?? person.name))}
                >
                  پروفایل
                </a>
                <a className="btn-contact" href="/contact">
                  ارتباط
                </a>
              </div>
            </article>
          ))}
        </div>
        {!items.length && (
          <EmptyState unavailable={unavailable}>اطلاعاتی منتشر نشده است.</EmptyState>
        )}
      </div>
    );
  else if (kind === 'managers')
    content = (
      <div className="container-modiran">
        <nav className="manager-tabs" aria-label="گروه مدیران">
          {sectionById.get('managers')!.children.map((child) => {
            const item = sectionById.get(child)!;
            return (
              <a
                key={child}
                className={'tab-btn' + (id === child ? ' active' : '')}
                href={
                  item.href +
                  (countyName
                    ? (item.href.includes('?') ? '&' : '?') +
                      'name=' +
                      encodeURIComponent(countyName)
                    : '')
                }
              >
                {item.title}
              </a>
            );
          })}
        </nav>
        {items.length ? (
          <OriginalManagerCards
            people={items}
            profilePath={section.href}
            contactHref={
              countyName ? '/contact-us?name=' + encodeURIComponent(countyName) : '/contact'
            }
          />
        ) : section.group === '4' ? (
          <SectionLinks ids={sectionById.get('counties')!.children} />
        ) : (
          <EmptyState unavailable={unavailable}>
            مشخصات مدیران این گروه هنوز منتشر نشده است.
          </EmptyState>
        )}
        {selectedPerson && items[0]?.body && (
          <SafeRichText html={String(items[0].body)} text={plainText(items[0].body)} />
        )}
      </div>
    );
  else if (['news', 'documents', 'tenders'].includes(kind))
    content = items.length ? (
      <OriginalNewsCards items={items} />
    ) : (
      <EmptyState unavailable={unavailable}>مطلبی منتشر نشده است.</EmptyState>
    );
  else if (isDuties)
    content = (
      <div className="container mt-4">
        <div className="accordion" id="statuteAccordion">
          {section.children.map((child) => {
            const item = sectionById.get(child)!;
            return (
              <details className="accordion-item" key={child}>
                <summary className="accordion-button">{item.title}</summary>
                <div className="accordion-body">
                  <a href={item.href}>مشاهدهٔ {item.title}</a>
                  {item.children.length > 0 && <SectionLinks ids={item.children} />}
                </div>
              </details>
            );
          })}
        </div>
      </div>
    );
  else if (id === 'menu-1')
    content = (
      <div className="container mt-4">
        <div className="source-table-scroll">
          <table>
            <thead>
              <tr>
                <th>ردیف</th>
                <th>عنوان خدمت کلان</th>
                <th>
                  عنوان زیرخدمت
                  <br />
                  (شناسه زیرخدمت)
                </th>
                <th>نحوه ارائه زیرخدمت</th>
                <th>راهنمای استفاده از زیرخدمت</th>
                <th>اطلاعات تکمیلی زیرخدمت</th>
                <th>SLA</th>
                <th>نظرسنجی</th>
                <th>اطلاعات تکمیلی واحد پاسخگو</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={String(item.id)}>
                  <td>{(index + 1).toLocaleString('fa-IR')}</td>
                  <td className="main-title">{String(item.name ?? item.title)}</td>
                  <td>{String(item.code ?? '—')}</td>
                  <td>
                    <span className="badge">{String(item.delivery_method ?? '—')}</span>
                  </td>
                  <td>{plainText(item.description) || '—'}</td>
                  <td>
                    <a href={'/service/' + item.id}>کلیک کنید</a>
                  </td>
                  <td>
                    <a href="/service-agreement">سطح توافق خدمات</a>
                  </td>
                  <td>
                    <a href="/polls/site">نظرسنجی</a>
                  </td>
                  <td>{String((item.organization as PublicRecord | undefined)?.name ?? '—')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!items.length && (
          <EmptyState unavailable={unavailable}>خدمتی در این بخش منتشر نشده است.</EmptyState>
        )}
      </div>
    );
  else if (isServices)
    content = (
      <div className="container mt-4">
        <div className="source-service-grid">
          {section.children.map((child) => {
            const item = sectionById.get(child)!;
            return (
              <a className="testimonial-card" href={item.href} key={child}>
                <div className="d-flex pb-2 align-items-center justify-content-between">
                  <div className="name">{item.title}</div>
                </div>
              </a>
            );
          })}
          {items.map((item) => (
            <article className="testimonial-card" key={String(item.id)}>
              <div className="name">{String(item.name ?? item.title)}</div>
              {Boolean(item.description) && <p>{plainText(item.description)}</p>}
              <a className="custom-dropdown-item" href={'/service/' + item.id}>
                جزئیات خدمت
              </a>
            </article>
          ))}
        </div>
        {!items.length && !section.children.length && (
          <EmptyState unavailable={unavailable}>
            اطلاعات تکمیلی این خدمت هنوز منتشر نشده است.
          </EmptyState>
        )}
      </div>
    );
  else if (id === 'gallery') content = <OfficialGallery album={first(search.id)} />;
  else if (kind === 'links')
    content = (
      <div className="container-peyvand">
        <div className="top-section1-samane">
          <h2>{section.title}</h2>
        </div>
        <div className="mz-portal-links">
          <OriginalDirectory
            items={items.map((item) => ({
              id: String(item.id),
              title: String(item.title ?? item.name),
              href: safeDestination(item.url, '/links'),
            }))}
          />
          {section.children.length > 0 && <SectionLinks ids={section.children} />}
        </div>
      </div>
    );
  else if (kind === 'polls')
    content = (
      <div>
        {items.map((poll) => (
          <PollCard
            key={String(poll.id)}
            poll={poll as unknown as Parameters<typeof PollCard>[0]['poll']}
          />
        ))}
        {!items.length && (
          <EmptyState unavailable={unavailable}>نظرسنجی فعالی منتشر نشده است.</EmptyState>
        )}
      </div>
    );
  else if (kind === 'faqs')
    content = (
      <div className="accordion">
        {items.map((item) => (
          <details className="accordion-item" key={String(item.id)}>
            <summary className="accordion-button">{String(item.question ?? item.title)}</summary>
            <div className="accordion-body">
              <SafeRichText html={String(item.answer ?? '')} text={plainText(item.answer)} />
            </div>
          </details>
        ))}
      </div>
    );
  else
    content = (
      <article className="source-article">
        {article?.excerpt && (!article.body || !partial) && <p>{article.excerpt}</p>}
        {article?.body && <SafeRichText html={article.body} text={plainText(article.body)} />}
        {id === 'sitemap' ? (
          <SectionLinks
            ids={officialSite.main
              .filter((key) => key !== 'home')
              .concat([
                'news',
                'counties',
                'districts',
                'units',
                'useful',
                'regulations',
                'gallery',
              ])}
          />
        ) : (
          section.children.length > 0 && <SectionLinks ids={section.children} />
        )}
        {id === 'forum' && <ForumContent topic={first(search.topic)} />}
        {!section.children.length && !article?.body && id !== 'forum' && (
          <p>
            {id.startsWith('design-transparency-')
              ? 'اطلاعاتی در این بخش منتشر نشده است.'
              : 'اطلاعات کامل این بخش در صفحهٔ رسمی منبع قرار دارد.'}
          </p>
        )}
      </article>
    );
  return (
    <PortalLayout
      breadcrumbs={kind !== 'article'}
      path={new URL(section.href, 'https://portal.invalid').pathname}
      title={section.title}
      designPath={designPath}
      chrome={chrome}
    >
      {content}
      {Boolean(section.source_url ?? metadata(article ?? {}).source_url) && (
        <div className="source-reference">
          <a href={source} target="_blank" rel="noopener noreferrer">
            مشاهدهٔ صفحهٔ منبع ↗
          </a>
        </div>
      )}
    </PortalLayout>
  );
}

async function ForumContent({ topic }: { topic?: string }) {
  if (topic && !/^\d+$/.test(topic)) return <EmptyState>شناسهٔ موضوع معتبر نیست.</EmptyState>;
  const result = await officialRead('forum/topics' + (topic ? '/' + topic : ''));
  const data = result.data as
    (PublicRecord & { replies?: PublicRecord[] }) | PublicRecord[] | undefined;
  if (Array.isArray(data))
    return data.length ? (
      <ul className="source-records">
        {data.map((item) => (
          <li key={String(item.id)}>
            <a href={'/forum?topic=' + item.id}>{String(item.title)}</a>
          </li>
        ))}
      </ul>
    ) : (
      <EmptyState>هنوز موضوعی منتشر نشده است.</EmptyState>
    );
  return data?.id ? (
    <>
      <h3>{data.title}</h3>
      <p>{plainText(data.body)}</p>
      {data.replies?.map((reply) => (
        <blockquote key={String(reply.id)}>{plainText(reply.body)}</blockquote>
      ))}
    </>
  ) : (
    <EmptyState unavailable={result.unavailable} />
  );
}
