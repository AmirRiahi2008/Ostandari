import { OriginalGallery } from '@/components/site/original-gallery';
import { EmptyState } from '@/components/site/portal-layout';
import type { PublicRecord } from '@/lib/public-content';
import { canUseSnapshot, officialImage, officialRead, sectionById } from './official-data';

export async function OfficialGallery({ album }: { album?: string }) {
  const result = await officialRead('galleries?per_page=100&locale=fa');
  const all = Array.isArray(result.data) ? (result.data as PublicRecord[]) : [];
  const albums = album ? all.filter((item) => String(item.id) === album) : all;
  const cards = albums.flatMap((item) => {
    const media = (item.items ?? []) as PublicRecord[];
    const images = media
      .map((record) => ({
        image: officialImage(record),
        title: String(record.caption ?? item.title),
        id: String(record.id),
        href: officialImage(record),
      }))
      .filter((record) => record.image);
    return images.length
      ? images
      : [
          {
            image: officialImage(item),
            title: String(item.title),
            id: String(item.id),
            href: '/gallery?id=' + item.id,
          },
        ];
  });
  const fallback =
    !album && canUseSnapshot(result.unavailable)
      ? sectionById.get('gallery')!.children.map((id) => ({
          id,
          title: sectionById.get(id)!.title,
          href: sectionById.get(id)!.href,
          image: undefined as string | undefined,
        }))
      : [];
  const records = cards.length ? cards : fallback;
  return (
    <div className="gal-wrap">
      <div className="gal-head">
        <h2>گالری تصاویر</h2>
        <div className="gal-rule" />
      </div>
      {records.length ? (
        <OriginalGallery items={records} />
      ) : (
        <EmptyState unavailable={result.unavailable}>گالری‌ای منتشر نشده است.</EmptyState>
      )}
    </div>
  );
}
