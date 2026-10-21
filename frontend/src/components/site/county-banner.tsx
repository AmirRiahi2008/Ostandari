import type { County } from '@/data/counties';

/** Reuses the Amol artwork, with an accessible, responsive name for each county. */
export function CountyBanner({ county }: { county: County }) {
  const pattern = 'county-banner-pattern-' + county.slug;
  return (
    <div
      className="county-banner-template"
      role="img"
      aria-label={'فرمانداری شهرستان ' + county.name}
    >
      <svg viewBox="0 0 1380 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <pattern id={pattern} width="350" height="180" patternUnits="userSpaceOnUse">
            <image href="/design/site/assets/image/amol.png" width="1380" height="180" />
          </pattern>
        </defs>
        <image href="/design/site/assets/image/amol.png" width="1380" height="180" />
        <rect x="420" width="540" height="180" fill={'url(#' + pattern + ')'} />
      </svg>
      <div className="county-banner-name">
        <span>{county.slug === 'amol' ? 'فرمانداری ویژه شهرستان' : 'فرمانداری شهرستان'}</span>
        <strong>{county.name}</strong>
      </div>
    </div>
  );
}
