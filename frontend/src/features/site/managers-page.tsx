import { notFound } from 'next/navigation';
import { PortalLayout, Panel, EmptyState } from '@/components/site/portal-layout';
import { publicData, plainText, recordImage, type PublicRecord } from '@/lib/public-content';
import { counties, officeHref } from '@/data/counties';
import { first, type Search } from './search-params';
export async function ManagersPage({ search }: { search: Search }) {
  const groups: Record<string, [string, string]> = {
    '1': ['مدیران ستادی', 'manager'],
    '2': ['معاونین استاندار', 'manager'],
    '3': ['مدیران دستگاه‌های اجرایی', 'manager'],
    '4': ['فرمانداران مازندران', 'county_governor'],
    '5': ['مدیران روابط عمومی', 'manager'],
    '6': ['مشاورین استاندار', 'advisor'],
  };
  const group = first(search.group) ?? '1';
  if (!groups[group]) notFound();
  const [title, kind] = groups[group];
  const fetched = await publicData<PublicRecord[]>(
    'members?kind=' + kind + '&per_page=100',
    [],
    [],
  );
  const keywords: Record<string, string[]> = {
    '2': ['معاون', 'deput'],
    '3': ['دستگاه', 'ادارات', 'agenc'],
    '5': ['روابط عمومی', 'public-relations'],
  };
  const people = {
    ...fetched,
    data: keywords[group]
      ? fetched.data.filter((person) =>
          keywords[group].some(
            (word) =>
              String(person.position ?? '').includes(word) ||
              String((person.category as PublicRecord | undefined)?.name ?? '').includes(word),
          ),
        )
      : fetched.data,
  };
  return (
    <PortalLayout path="/managers" title={title}>
      <nav className="portal-office-nav" aria-label="گروه مدیران">
        {Object.entries(groups).map(([key, [name]]) => (
          <a
            key={key}
            href={'/managers?group=' + key}
            aria-current={key === group ? 'page' : undefined}
          >
            {name}
          </a>
        ))}
      </nav>
      <Panel title={title}>
        {people.data.length ? (
          <div className="portal-manager-grid">
            {people.data.map((person) => (
              <article className="portal-manager" key={String(person.id)}>
                {recordImage(person.image) && <img src={recordImage(person.image)} alt="" />}
                <h2>{person.name}</h2>
                <p>{String(person.position ?? person.title ?? '')}</p>
                {Boolean(person.bio) && <p>{plainText(person.bio)}</p>}
              </article>
            ))}
          </div>
        ) : group === '4' ? (
          <div className="portal-link-grid">
            {counties.map((county) => (
              <a href={officeHref(county)} key={county.slug}>
                فرمانداری {county.name}
                <span aria-hidden="true">←</span>
              </a>
            ))}
          </div>
        ) : (
          <EmptyState unavailable={people.unavailable}>
            مشخصات مدیران این گروه هنوز ثبت نشده است.
          </EmptyState>
        )}
      </Panel>
    </PortalLayout>
  );
}
