import { PortalLayout, Panel, EmptyState } from '@/components/site/portal-layout';
import { SafeRichText } from '@/components/site/safe-rich-text';
import { PollCard } from '@/components/site/public-forms';
import { plainText, type PublicRecord } from '@/lib/public-content';
import { safeDestination } from '@/lib/urls';
import {
  articleHref,
  canUseSnapshot,
  metadata,
  navigationFromMenus,
  officialDate,
  officialImage,
  officialRead,
  officialSite,
  sectionById,
  sourceArticle,
  type OfficialSection,
} from './official-data';
import { first, type Search } from './search-params';

function SectionLinks({ ids }: { ids: string[] }) {
  return (
    <div className="public-directory-tiles">
      {ids.map((id) => {
        const item = sectionById.get(id);
        return item ? (
          <a href={item.href} key={id}>
            {item.title}
            <span aria-hidden="true">←</span>
          </a>
        ) : null;
      })}
    </div>
  );
}

function CatalogRecords({ items, kind }: { items: PublicRecord[]; kind: string }) {
  return (
    <div className="public-catalog">
      {items.map((item) => (
        <article key={String(item.id ?? item.slug)}>
          <h2>{String(item.title ?? item.name ?? item.question)}</h2>
          {Boolean(item.position) && <p>{String(item.position)}</p>}
          {item.excerpt && <p>{item.excerpt}</p>}
          {Boolean(item.description) && <p>{plainText(item.description)}</p>}
          {kind === 'faqs' && (
            <SafeRichText html={String(item.answer ?? '')} text={plainText(item.answer)} />
          )}
          {['news', 'documents', 'tenders'].includes(kind) && (
            <a href={articleHref(item)}>مطالعهٔ مطلب ←</a>
          )}
          {kind === 'services' && item.id && <a href={'/service/' + item.id}>جزئیات خدمت ←</a>}
          {kind === 'links' && item.url && (
            <a href={safeDestination(item.url, '/links')} target="_blank" rel="noopener noreferrer">
              مشاهدهٔ پیوند ↗
            </a>
          )}
        </article>
      ))}
    </div>
  );
}

export async function OfficialSectionPage({
  section,
  search = {},
}: {
  section: OfficialSection;
  search?: Search;
}) {
  const { kind, id } = section;
  const menuRequest = officialRead('menus?key=official-main');
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
            (section.group === '4'
              ? 'county_governor'
              : section.group === '6'
                ? 'advisor'
                : 'manager') +
            '&'
          : kind + '?';
    const result = await officialRead(endpoint + 'per_page=100&locale=fa');
    items = Array.isArray(result.data) ? (result.data as PublicRecord[]) : [];
    items = items.filter(
      (item) =>
        !String(item.title ?? item.name).includes('آزمایشی') &&
        !String(item.bio ?? item.excerpt).includes('اطلاعات نمایشی'),
    );
    if (kind === 'services' && id !== 'services')
      items = items.filter((item) => item.slug === 'official-' + id);
    if (kind === 'managers' && ['2', '3', '5'].includes(section.group ?? '')) {
      const terms: Record<string, string[]> = {
        '2': ['معاون'],
        '3': ['دستگاه', 'ادارات'],
        '5': ['روابط عمومی'],
      };
      items = items.filter((item) =>
        terms[section.group!].some((term) => String(item.position ?? '').includes(term)),
      );
    }
    if (!items.length && canUseSnapshot(result.unavailable) && kind === 'news')
      items = officialSite.news.filter((item) => item.type === 'news');
    if (!items.length && canUseSnapshot(result.unavailable) && kind === 'documents')
      items = officialSite.news.filter((item) => item.type === 'document');
    if (!items.length && canUseSnapshot(result.unavailable) && kind === 'tenders')
      items = officialSite.news.filter((item) => item.type === 'tender');
    if (!items.length && canUseSnapshot(result.unavailable) && kind === 'governors')
      items = [officialSite.governor];
    unavailable = result.unavailable;
  } else if (!section.children.length && kind === 'page') {
    const result = await officialRead(
      'contents/by-slug/page/official-page-' + encodeURIComponent(id),
    );
    article = (result.data as { content?: PublicRecord } | undefined)?.content;
    unavailable = result.unavailable;
  }

  const source = safeDestination(
    metadata(article ?? {}).source_url ?? section.source_url,
    'https://ostan-mz.ir/',
  );
  const menu = await menuRequest;
  const partial =
    !article?.body ||
    ['homepage_excerpt', 'title_only', 'source_reference'].includes(
      String(metadata(article).content_completeness),
    );
  const image = article ? officialImage(article) : undefined;
  return (
    <PortalLayout
      path="/official-section"
      title={section.title}
      headerItems={navigationFromMenus(menu.data)}
    >
      <div className="public-section">
        <nav className="public-section-navigation" aria-label="دسترسی به بخش‌های سایت">
          <a href="/services">خدمات</a>
          <a href="/managers">مدیران</a>
          <a href="/duties">شرح وظایف</a>
          <a href="/sitemap">نقشه سایت</a>
        </nav>
        <div className="public-section-layout">
          <article className="portal-panel public-section-content">
            <span className="portal-eyebrow">استانداری مازندران</span>
            <h2>{article?.title ?? section.title}</h2>
            {Boolean(article?.published_at) && (
              <time dateTime={String(article?.published_at)}>
                {officialDate(article?.published_at)}
              </time>
            )}
            {image && <img className="public-article-image" src={image} alt="" />}
            {article?.excerpt && (!article.body || !partial) && (
              <p className="portal-lead">{article.excerpt}</p>
            )}
            {article?.body && <SafeRichText html={article.body} text={plainText(article.body)} />}
            {kind === 'sitemap' && (
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
            )}
            {section.children.length > 0 &&
              !['sitemap', 'news', 'documents', 'tenders'].includes(kind) && (
                <SectionLinks ids={section.children} />
              )}
            {kind === 'managers' && section.group === '4' && !items.length && (
              <SectionLinks ids={sectionById.get('counties')!.children} />
            )}
            {items.length > 0 && kind !== 'polls' && <CatalogRecords items={items} kind={kind} />}
            {kind === 'polls' &&
              items.map((poll) => (
                <PollCard
                  key={String(poll.id)}
                  poll={poll as unknown as Parameters<typeof PollCard>[0]['poll']}
                />
              ))}
            {id === 'forum' && <ForumContent topic={first(search.topic)} />}
            {!items.length && !section.children.length && !article?.excerpt && id !== 'forum' && (
              <p>برای مطالعهٔ اطلاعات رسمی این بخش، صفحهٔ منبع را باز کنید.</p>
            )}
            {kind === 'article' && partial && (
              <p className="public-source-note">
                این مطلب شامل چکیدهٔ منتشرشده در صفحهٔ اصلی است. متن کامل در صفحهٔ منبع قرار دارد.
              </p>
            )}
            <div className="public-source-actions">
              <a className="portal-button" href={source} target="_blank" rel="noopener noreferrer">
                مشاهدهٔ صفحهٔ منبع ↗
              </a>
              <a href="/sitemap">فهرست همهٔ بخش‌ها</a>
            </div>
            {unavailable && !article && (
              <p className="public-source-note" role="status">
                اطلاعات تکمیلی در حال حاضر دریافت نشد. نشانی رسمی بخش در دسترس است.
              </p>
            )}
          </article>
          <aside>
            <Panel title="دسترسی آسان">
              <SectionLinks
                ids={['counties', 'districts', 'units', 'services', 'regulations', 'information']}
              />
            </Panel>
            <Panel title="اطلاعات تماس">
              <p>{officialSite.contact.address}</p>
              <a href="mailto:info@ostan-mz.ir">info@ostan-mz.ir</a>
              <p dir="ltr">{officialSite.contact.phone}</p>
              <a href="/contact">ارتباط مستقیم</a>
            </Panel>
          </aside>
        </div>
      </div>
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
      <ul className="public-records">
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
