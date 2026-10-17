import { notFound } from 'next/navigation';
import { PortalLayout, Panel, EmptyState } from '@/components/site/portal-layout';
import { publicData, recordImage, type PublicRecord } from '@/lib/public-content';
import { CountyNavigation, officeIdentity } from './office-page';
import { first, type Search } from './search-params';
export async function CountyGallery({ search }: { search: Search }) {
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
  return (
    <PortalLayout path="/gallery/county" title={'گالری فرمانداری ' + county.name}>
      <CountyNavigation county={county} />
      <Panel title="گالری تصاویر">
        {albums.length ? (
          <div className="portal-gallery-grid">
            {albums.map((album) => (
              <section key={String(album.id)}>
                <h2>{album.title}</h2>
                {((album.items ?? []) as PublicRecord[]).map((item, i) => {
                  const src = recordImage(item.image ?? item.media);
                  return (
                    src && (
                      <a
                        key={String(item.id ?? i)}
                        href={src}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={src}
                          alt={String(item.caption ?? album.title ?? 'گالری')}
                          loading="lazy"
                        />
                      </a>
                    )
                  );
                })}
              </section>
            ))}
          </div>
        ) : (
          <EmptyState unavailable={data.unavailable}>
            تصویری برای فرمانداری {county.name} ثبت نشده است.
          </EmptyState>
        )}
      </Panel>
    </PortalLayout>
  );
}
