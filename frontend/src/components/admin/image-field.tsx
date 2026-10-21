export const imageFields = ['media_id', 'cover_media_id', 'banner_media_id', 'aerial_media_id'];

export function AdminImageField({
  field,
  id,
  label,
  help,
  required,
}: {
  field: string;
  id: string;
  label: string;
  help?: string;
  required: boolean;
}) {
  return (
    <section
      className="portal-resource-field portal-image-field"
      data-image-field={field}
      aria-labelledby={id + '-label'}
    >
      <header>
        <label id={id + '-label'} htmlFor={id + '-file'}>
          {label}
        </label>
        <span className="portal-field-requirement">{required ? 'الزامی' : 'اختیاری'}</span>
      </header>
      {help && (
        <p className="portal-field-help" id={id + '-help'}>
          {help}
        </p>
      )}
      <input
        id={id + '-file'}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        data-image-upload={field}
        data-media-field={field}
        aria-describedby={id + '-help ' + id + '-status'}
      />
      <small className="portal-field-help">
        عکس را همین‌جا انتخاب کنید؛ به WebP تبدیل می‌شود. حداکثر حجم پس از بهینه‌سازی ۴ مگابایت است.
      </small>
      <figure data-image-preview hidden>
        <img alt="پیش‌نمایش تصویر انتخاب‌شده" />
        <figcaption />
      </figure>
      <p id={id + '-status'} data-image-status role="status" aria-live="polite" />
      <div className="portal-image-actions">
        <button type="button" data-image-retry hidden>
          تلاش دوباره برای بارگذاری
        </button>
        <button type="button" data-image-remove hidden>
          برداشتن تصویر از این فرم
        </button>
      </div>
      <details data-image-library>
        <summary>یا انتخاب از تصاویر قبلی (اختیاری)</summary>
        <label htmlFor={id}>تصویری که قبلاً بارگذاری کرده‌اید</label>
        <select
          id={id}
          name={field}
          data-field={field}
          data-lookup="media"
          data-image-value
          data-image-required={required ? 'true' : undefined}
        >
          <option value="">بدون تصویر</option>
        </select>
      </details>
    </section>
  );
}
