import type { ReactNode } from 'react';
import type { PublicRecord } from '@/lib/public-content';
import { SafeRichText } from './safe-rich-text';

export function contentTypeLabel(type: unknown): string {
  return (
    (
      {
        news: 'خبر',
        announcement: 'اطلاعیه',
        resolution: 'مصوبه',
        document: 'سند',
        tender: 'مناقصه و مزایده',
        event: 'رویداد',
        contract: 'قرارداد',
        publication: 'انتشارات',
        call: 'فراخوان',
        duty: 'شرح وظایف',
        page: 'صفحه',
      } as Record<string, string>
    )[String(type)] ?? 'مطلب'
  );
}

export function ArticleBreadcrumb({
  links,
  title,
}: {
  links: { title: string; href: string }[];
  title: string;
}) {
  return (
    <nav className="portal-article-breadcrumb" aria-label="مسیر صفحه">
      {links.map((link) => (
        <span key={link.href}>
          <a href={link.href}>{link.title}</a>
          <span aria-hidden="true">/</span>
        </span>
      ))}
      <span aria-current="page">{title}</span>
    </nav>
  );
}

export function ContentArticle({
  article,
  image,
  text,
  organization = 'استانداری مازندران',
  showSummary = true,
  children,
}: {
  article: PublicRecord;
  image?: string;
  text: string;
  organization?: string;
  showSummary?: boolean;
  children?: ReactNode;
}) {
  const published = article.published_at ? new Date(String(article.published_at)) : null;
  const validDate = published && !Number.isNaN(published.valueOf());
  const category =
    article.category && typeof article.category === 'object'
      ? String((article.category as PublicRecord).name ?? '')
      : '';
  return (
    <article className="portal-content-article">
      <header className="portal-article-heading">
        <div className="portal-article-labels">
          <span>{organization}</span>
          <span className="portal-article-type">{contentTypeLabel(article.type)}</span>
        </div>
        <h1>{String(article.title ?? '')}</h1>
        {Boolean(article.subtitle) && (
          <p className="portal-article-subtitle">{String(article.subtitle)}</p>
        )}
        {(validDate || category) && (
          <div className="portal-article-meta">
            {validDate && (
              <time dateTime={published.toISOString()}>
                انتشار:{' '}
                {published.toLocaleDateString('fa-IR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  timeZone: 'Asia/Tehran',
                })}
              </time>
            )}
            {category && <span>{String(category)}</span>}
          </div>
        )}
      </header>
      {showSummary && article.excerpt && (
        <p className="portal-article-summary">{String(article.excerpt)}</p>
      )}
      {image && (
        <figure className="portal-article-cover">
          <img src={image} alt={String(article.title ?? '')} fetchPriority="high" />
        </figure>
      )}
      <div className="portal-article-body">
        <SafeRichText html={String(article.body ?? '')} text={text} />
      </div>
      {children && <footer className="portal-article-footer">{children}</footer>}
    </article>
  );
}
