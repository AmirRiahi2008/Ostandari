import type { ReactEventHandler } from 'react';
import type { County } from '@/data/counties';

export function CountyArtwork({
  county,
  image = county.previewImage,
  template = county.usesPreviewTemplate,
  id,
  loading = 'lazy',
  onError,
}: {
  county: Pick<County, 'slug' | 'name' | 'previewImage' | 'usesPreviewTemplate'>;
  image?: string;
  template?: boolean;
  id?: string;
  loading?: 'eager' | 'lazy';
  onError?: ReactEventHandler<HTMLImageElement>;
}) {
  return (
    <div className="portal-county-photo county-artwork" data-county-artwork={county.slug}>
      <img
        id={id}
        src={image}
        alt={'طرح فرمانداری شهرستان ' + county.name}
        width={1536}
        height={1024}
        loading={loading}
        onError={onError}
      />
      {template && (
        <div className="portal-county-nameplate" aria-hidden="true">
          فرمانداری {county.name}
        </div>
      )}
    </div>
  );
}
