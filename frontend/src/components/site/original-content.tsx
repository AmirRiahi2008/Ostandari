import type { PublicRecord } from '@/lib/public-content';
import { plainText } from '@/lib/public-content';
import { safeDestination } from '@/lib/urls';
import { articleHref, officialDate, officialImage } from '@/features/site/official-data';
import { OriginalIcon } from './original-icons';

export function OriginalNewsCards({ items }: { items: PublicRecord[] }) {
  return (
    <div className="source-news-list">
      {items.map((item) => (
        <a
          className={'akhbar-container' + (!officialImage(item) ? ' source-without-image' : '')}
          key={String(item.id ?? item.slug)}
          href={articleHref(item)}
        >
          {officialImage(item) && <img src={officialImage(item)} alt="" loading="lazy" />}
          <div className="akhbar-left">
            <div className="akhbar-header">
              <span className="akhbar-btn">
                {String((item.category as PublicRecord | undefined)?.name ?? 'استانداری مازندران')}
              </span>
              <time className="akhbar-date">{officialDate(item.published_at)}</time>
            </div>
            <h2 className="akhbar-onvan">{item.title}</h2>
            {item.excerpt && <p className="akhbar-date">{plainText(item.excerpt)}</p>}
          </div>
        </a>
      ))}
    </div>
  );
}

export function OriginalManagerCards({
  people,
  profilePath = '/managers',
  contactHref = '/contact',
}: {
  people: PublicRecord[];
  profilePath?: string;
  contactHref?: string;
}) {
  return (
    <div className="manager-grid">
      {people.map((person) => {
        const image = officialImage(person);
        const profile =
          profilePath +
          (profilePath.includes('?') ? '&' : '?') +
          'person=' +
          encodeURIComponent(String(person.id ?? person.name));
        return (
          <article className="card1" key={String(person.id ?? person.name)}>
            <div className="card1-bala">
              <div className="cart1-img">
                {image ? (
                  <img src={image} alt={String(person.name ?? '')} loading="lazy" />
                ) : (
                  <div className="cart1-avatar">
                    <OriginalIcon name="services" />
                  </div>
                )}
              </div>
              <div className="cart1-onvan">
                <h3>{String(person.name ?? '')}</h3>
                <div className="badge">{String(person.position ?? person.title ?? '')}</div>
              </div>
            </div>
            <div className="cart1-p-class">
              <p>
                {String(
                  (person.organization as PublicRecord | undefined)?.name ?? person.position ?? '',
                )}
              </p>
            </div>
            <div className="buttons">
              <a className="btn-outline" href={profile}>
                پروفایل
              </a>
              <a
                className="btn-solid"
                href={
                  person.email
                    ? safeDestination('mailto:' + person.email, contactHref)
                    : contactHref
                }
              >
                ارتباط
              </a>
            </div>
            {Boolean(person.bio) && <p>{plainText(person.bio)}</p>}
          </article>
        );
      })}
    </div>
  );
}

export function OriginalDirectory({
  items,
}: {
  items: { id: string; title: string; href: string }[];
}) {
  return (
    <div className="mz-links-grid source-directory">
      {items.map((item) => (
        <a className="mz-link-btn" key={item.id} href={item.href}>
          {item.title}
        </a>
      ))}
    </div>
  );
}
