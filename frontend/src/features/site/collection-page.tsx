import { PortalLayout, Panel, EmptyState } from '@/components/site/portal-layout';
import { publicData, type PublicRecord } from '@/lib/public-content';
import { collectionRoutes } from '@/data/public-navigation';
export async function CollectionPage({ path }: { path: string }) {
  const config = collectionRoutes[path];
  const data = await publicData<PublicRecord[]>(config.endpoint + '?per_page=100', [], []);
  return (
    <PortalLayout path={path} title={config.title}>
      <Panel title={config.title}>
        {data.data.length ? (
          <ul className="portal-document-list">
            {data.data.map((item) => (
              <li key={String(item.id)}>
                <a href={'/content/' + item.id}>{item.title}</a>
                {item.excerpt && <p>{item.excerpt}</p>}
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState unavailable={data.unavailable} />
        )}
      </Panel>
    </PortalLayout>
  );
}
