import { recordImage, type PublicRecord } from '@/lib/public-content';
export function NewsCard({ item, county }: { item: PublicRecord; county?: string }) {
  const image = recordImage(item.cover ?? item.image);
  return (
    <article className="portal-news-card">
      <a
        href={
          '/news/' +
          encodeURIComponent(String(item.id)) +
          (county ? '?name=' + encodeURIComponent(county) : '')
        }
      >
        {image && <img src={image} alt="" loading="lazy" />}
        <div>
          <span className="portal-eyebrow">
            {String(
              typeof item.category === 'object'
                ? ((item.category as PublicRecord)?.name ?? 'اخبار')
                : (item.category ?? 'اخبار'),
            )}
          </span>
          <h3>{item.title}</h3>
          {item.excerpt && <p>{item.excerpt}</p>}
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
