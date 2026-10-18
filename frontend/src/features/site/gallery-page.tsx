import { OriginalGallery } from '@/components/site/original-gallery';
import { notFound } from 'next/navigation';
import { PortalLayout, EmptyState, loadPortalChrome } from '@/components/site/portal-layout';
import { publicData, recordImage, type PublicRecord } from '@/lib/public-content';
import { CountyNavigation, officeIdentity } from './office-page';
import { first, type Search } from './search-params';
export async function CountyGallery({ search }: { search: Search }) {
  const chrome = loadPortalChrome();
  const { county, organization, unavailable } = await officeIdentity(first(search.name));
  const data = organization
    ? await publicData<PublicRecord[]>(
        'galleries?per_page=100&organization_id=' + organization.id,
        [],
        [],
      )
    : { data: [], unavailable };
  const albumId = first(search.album);
  const albums = albumId ? data.data.filter((album) => String(album.id) === albumId) : data.data;
  if (albumId && !albums.length && !data.unavailable) notFound();
  const cards = albums.flatMap((album) =>
    ((album.items ?? []) as PublicRecord[]).flatMap((item, index) => {
      const src = recordImage(item.image ?? item.media);
      return src
        ? [
            {
              id: String(item.id ?? String(album.id) + '-' + index),
              title: String(item.caption ?? album.title ?? 'گالری'),
              image: src,
            },
          ]
        : [];
    }),
  );
  return (
    <PortalLayout
      path="/gallery/county"
      title={'گالری فرمانداری ' + county.name}
      designPath="/gallery"
      chrome={chrome}
    >
      <CountyNavigation county={county} />
      <div className="gal-wrap">
        <div className="gal-head">
          <h2>گالری تصاویر</h2>
          <div className="gal-rule" />
        </div>
        {cards.length ? (
          <OriginalGallery items={cards} />
        ) : (
          <EmptyState unavailable={data.unavailable}>
            تصویری برای فرمانداری {county.name} ثبت نشده است.
          </EmptyState>
        )}
      </div>
    </PortalLayout>
  );
}
