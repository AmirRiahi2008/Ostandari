import { recordImage, plainText, type PublicRecord } from '@/lib/public-content';
import { findCounty } from '@/data/counties';
import { countyPortalHref } from '@/lib/county-portal';
export function NewsCard({
  item,
  county,
  canonicalCounty = false,
}: {
  item: PublicRecord;
  county?: string;
  canonicalCounty?: boolean;
}) {
  const image = recordImage(item.cover ?? item.image);
  return (
    <article className="portal-news-card source-news-card">
      <a
        className="akhbar-container"
        href={
          canonicalCounty && findCounty(county)
            ? countyPortalHref(findCounty(county)!, '/news/' + encodeURIComponent(String(item.id)))
            : '/news/' +
              encodeURIComponent(String(item.id)) +
              (county ? '?name=' + encodeURIComponent(county) : '')
        }
      >
        {image && <img src={image} alt="" loading="lazy" />}
        <div className="akhbar-left">
          <span className="portal-eyebrow">
            {String(
              typeof item.category === 'object'
                ? ((item.category as PublicRecord)?.name ?? 'اخبار')
                : (item.category ?? 'اخبار'),
            )}
          </span>
          <h3 className="akhbar-onvan">{item.title}</h3>
          {item.excerpt && <p className="akhbar-date">{plainText(item.excerpt)}</p>}
          {Boolean(item.published_at) && (
            <time dateTime={String(item.published_at)}>
              {new Date(String(item.published_at)).toLocaleDateString('fa-IR')}
            </time>
          )}
        </div>
      </a>
    </article>
  );
}
