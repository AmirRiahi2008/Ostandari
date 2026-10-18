export interface OriginalGalleryItem {
  id: string;
  title: string;
  image?: string;
  href?: string;
}

export function OriginalGallery({ items }: { items: OriginalGalleryItem[] }) {
  return (
    <>
      <div className="gal-grid" id="galGrid">
        {items.map((item) =>
          item.image ? (
            <div
              className="gal-item"
              role="button"
              tabIndex={0}
              key={item.id}
              aria-label={'نمایش تصویر: ' + item.title}
            >
              <div className="gal-media tone-1">
                <img src={item.image} alt={item.title} loading="lazy" />
              </div>
              <p className="gal-caption">{item.title}</p>
            </div>
          ) : (
            <a className="gal-item" key={item.id} href={item.href ?? '/gallery'}>
              <div className="gal-media tone-1" />
              <p className="gal-caption">{item.title}</p>
            </a>
          ),
        )}
      </div>
      <div
        className="lightbox-overlay"
        id="lightboxOverlay"
        role="dialog"
        aria-label="نمایش تصویر گالری"
        aria-modal="true"
      >
        <div className="lightbox-box">
          <button
            type="button"
            className="lightbox-close"
            id="lightboxClose"
            aria-label="بستن تصویر"
          >
            ×
          </button>
          <button
            type="button"
            className="lightbox-nav lightbox-prev"
            id="lightboxPrev"
            aria-label="تصویر قبلی"
          >
            ›
          </button>
          <button
            type="button"
            className="lightbox-nav lightbox-next"
            id="lightboxNext"
            aria-label="تصویر بعدی"
          >
            ‹
          </button>
          <div className="lightbox-media" id="lightboxMedia" />
          <div className="lightbox-info">
            <div id="lightboxCaption" />
          </div>
        </div>
      </div>
    </>
  );
}
