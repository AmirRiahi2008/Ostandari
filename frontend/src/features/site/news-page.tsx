import { notFound } from 'next/navigation';
import { PortalLayout, Panel, EmptyState, loadPortalChrome } from '@/components/site/portal-layout';
import { NewsCard } from '@/components/site/news-card';
import { SafeRichText } from '@/components/site/safe-rich-text';
import { ArticleActions, CommentForm } from '@/components/site/public-forms';
import { SearchForm } from '@/components/site/search-form';
import { findCounty, countyQuery } from '@/data/counties';
import {
  publicData,
  plainText,
  recordImage,
  designNews,
  type PublicRecord,
} from '@/lib/public-content';
import { templatePreview } from '@/lib/config';
import { officeIdentity } from './office-page';
import { first, type Search } from './search-params';
export async function NewsPage({ search }: { search: Search }) {
  const chrome = loadPortalChrome();
  const slug = first(search.name),
    county = slug ? findCounty(slug) : undefined;
  if (slug && !county) notFound();
  const query = (first(search.q) ?? '').slice(0, 200);
  let organization: PublicRecord | undefined;
  if (county) organization = (await officeIdentity(county.slug)).organization;
  const params = new URLSearchParams({
    per_page: '100',
    ...(query ? { q: query } : {}),
    ...(organization?.id ? { organization_id: String(organization.id) } : {}),
  });
  const data =
    county && !organization
      ? { data: [], unavailable: false }
      : await publicData<PublicRecord[]>('news?' + params, county ? [] : designNews, []);
  const category = first(search.category);
  const items = data.data.filter(
    (item) =>
      (!templatePreview() || !query || String(item.title ?? '').includes(query)) &&
      (!category ||
        item.category === category ||
        (item.category as PublicRecord | undefined)?.name === category),
  );
  const title = county ? 'اخبار فرمانداری ' + county.name : 'اخبار و اطلاعیه‌ها';
  return (
    <PortalLayout path="/news" title={title} chrome={chrome}>
      <Panel title={title}>
        <SearchForm action="/news" query={query} county={county?.slug} />
        {items.length ? (
          <div className="portal-news-grid">
            {items.map((item) => (
              <NewsCard key={String(item.id)} item={item} county={county?.slug} />
            ))}
          </div>
        ) : (
          <EmptyState unavailable={data.unavailable}>
            {query ? 'نتیجه‌ای برای این عبارت پیدا نشد.' : 'خبری در این بخش ثبت نشده است.'}
          </EmptyState>
        )}
      </Panel>
    </PortalLayout>
  );
}

export async function ArticlePage({ id, search }: { id: string; search: Search }) {
  const chrome = loadPortalChrome();
  const sample = designNews.find((item) => String(item.id) === id);
  const result = await publicData<{
    content?: PublicRecord;
    related?: PublicRecord[];
    comments?: PublicRecord[];
  }>(
    'contents/' + encodeURIComponent(id),
    sample ? { content: sample, related: designNews.filter((item) => item !== sample) } : {},
    {},
  );
  const article = result.data.content;
  if (!article && !result.unavailable) notFound();
  const slug = first(search.name),
    county = slug ? findCounty(slug) : undefined;
  if (slug && !county) notFound();
  let related = result.data.related ?? [];
  if (county && !templatePreview()) {
    const office = await officeIdentity(county.slug);
    if (article && article.organization_id !== office.organization?.id) notFound();
    related = related.filter((item) => item.organization_id === office.organization?.id);
  }
  const image = recordImage(article?.cover ?? article?.image);
  return (
    <PortalLayout
      path="/news/article"
      title={article?.title ?? 'جزئیات خبر'}
      breadcrumbs={false}
      designPath="/news"
      chrome={chrome}
    >
      <nav className="portal-breadcrumb" aria-label="مسیر صفحه">
        <a href="/">صفحه اصلی</a>
        <span aria-hidden="true">/</span>
        <a href={'/news' + countyQuery(county)}>اخبار</a>
      </nav>
      <div className="source-article-grid">
        <article className="card p-4">
          {article ? (
            <>
              <span className="portal-eyebrow">
                {article.sample ? 'محتوای نمونهٔ فایل طراحی' : 'اخبار استانداری مازندران'}
              </span>
              <h1>{article.title}</h1>
              {Boolean(article.published_at) && (
                <time dateTime={String(article.published_at)}>
                  {new Date(String(article.published_at)).toLocaleDateString('fa-IR')}
                </time>
              )}
              {image && <img className="img-fluid radius10 inews" src={image} alt="" />}
              {article.excerpt && <p className="portal-lead">{article.excerpt}</p>}
              <SafeRichText html={String(article.body ?? '')} text={plainText(article.body)} />
              <ArticleActions />
              {Boolean(result.data.comments?.length) && (
                <section className="portal-comments">
                  <h2>دیدگاه‌ها</h2>
                  {result.data.comments!.map((comment) => (
                    <article key={String(comment.id)}>
                      <strong>
                        {String((comment.author as PublicRecord | undefined)?.name ?? 'کاربر')}
                      </strong>
                      <p>{plainText(comment.body)}</p>
                      {Boolean(comment.reply) && (
                        <blockquote>{plainText(comment.reply)}</blockquote>
                      )}
                    </article>
                  ))}
                </section>
              )}
              {!article.sample && article.comments_enabled === true && (
                <section>
                  <h2>ارسال دیدگاه</h2>
                  <CommentForm id={id} />
                </section>
              )}
            </>
          ) : (
            <EmptyState unavailable />
          )}
        </article>
        <aside>
          <section className="card p-3">
            <h2>اخبار مرتبط</h2>
            <a href={'/news' + countyQuery(county)}>همهٔ اخبار</a>
            {related.length ? (
              related.map((item) => (
                <NewsCard key={String(item.id)} item={item} county={county?.slug} />
              ))
            ) : (
              <EmptyState />
            )}
          </section>
        </aside>
      </div>
    </PortalLayout>
  );
}
