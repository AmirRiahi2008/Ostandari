import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { PortalLayout, Panel, EmptyState } from '@/components/site/portal-layout';
import { OriginalDirectory, OriginalManagerCards } from '@/components/site/original-content';
import { OriginalGallery } from '@/components/site/original-gallery';
import { ContactForm, PollCard, CommentForm, ArticleActions, AssistantForm } from '@/components/site/public-forms';
import { SafeRichText } from '@/components/site/safe-rich-text';
import { SearchForm } from '@/components/site/search-form';
import { NewsCard } from '@/components/site/news-card';
import { InstallGuide } from '@/components/site/install-guide';
import { publicData, plainText, recordImage, type PublicRecord } from '@/lib/public-content';
import { countyPortalHref, countyQuickLinks, countyTitle } from '@/lib/county-portal';
import type { resolveCountyPortal } from '@/lib/county-portal';
import { publicTitles, collectionRoutes } from '@/data/public-navigation';
import { safeDestination } from '@/lib/urls';
import { OfficePage, officeIdentity } from './office-page';
import { resolveOfficialSection, sectionById, officialDate } from './official-data';
import { first, type Search } from './search-params';

type Route = NonNullable<ReturnType<typeof resolveCountyPortal>>;
export async function CountyPortalPage({ route, search = {} }: { route: Route; search?: Search }) {
  const { county, path, canonical } = route;
  if (path === '/' || path === '/about')
    return <OfficePage slug={county.slug} section={path === '/about' ? 'about' : undefined} />;
  const identity = await officeIdentity(county.slug);
  const { organization, unavailable } = identity;
  const href = (destination: string) => countyPortalHref(county, destination);
  const cleanSearch = { ...search, name: undefined };
  const section = resolveOfficialSection(path, cleanSearch);
  const supported = [
    '/forms',
    '/districts',
    '/sitemap',
    '/links',
    '/governors',
    '/services',
    '/contact',
    '/gallery',
    '/announcements',
    '/documents',
    '/resolutions',
  ];
  if (
    !section &&
    !publicTitles[path] &&
    !collectionRoutes[path] &&
    !supported.includes(path) &&
    !/^\/(news|content|service)\/[1-9]\d*$/.test(path)
  )
    notFound();
  let title = countyTitle(
    section?.title ??
      publicTitles[path] ??
      collectionRoutes[path]?.title ??
      (
        {
          '/forms': 'فرم‌های خدمات',
          '/districts': 'بخش‌ها و دهستان‌ها',
          '/services': 'خدمات الکترونیکی',
          '/governors': 'فرمانداران ادوار',
          '/links': 'پیوندها',
        } as Record<string, string>
      )[path] ??
      'جزئیات',
    county,
  );
  const query = (first(search.q) ?? '').trim().slice(0, 150);
  async function read(resource: string, filters: Record<string, string> = {}) {
    if (!organization?.id) return { data: [] as PublicRecord[], unavailable };
    const params = new URLSearchParams({
      per_page: '100',
      locale: 'fa',
      ...filters,
      organization_id: String(organization.id),
    });
    return publicData<PublicRecord[]>(resource + '?' + params, [], []);
  }
  const empty = (failed = unavailable) => (
    <EmptyState unavailable={failed}>
      اطلاعاتی در این بخش از فرمانداری {county.name} منتشر نشده است.
    </EmptyState>
  );
  const directory = (items: { title: string; href: string; id?: string }[]) => (
    <OriginalDirectory
      items={items.map((item, index) => ({
        id: item.id ?? String(index),
        title: countyTitle(item.title, county),
        href: href(item.href),
      }))}
    />
  );
  const news = (items: PublicRecord[]) => (
    <div className="portal-news-grid">
      {items.map((item) => (
        <NewsCard key={String(item.id)} item={item} county={county.slug} canonicalCounty />
      ))}
    </div>
  );
  let content: ReactNode;
  const contentId = path.match(/^\/(?:news|content)\/([1-9]\d*)$/)?.[1];
  if (contentId || section?.kind === 'article') {
    const endpoint = contentId
      ? 'contents/' + contentId
      : 'contents/by-slug/' +
        section!.record_type +
        '/' +
        encodeURIComponent(section!.record_slug!);
    const result = organization?.id
      ? await publicData<{ content?: PublicRecord; related?: PublicRecord[] }>(endpoint, {}, {})
      : { data: {}, unavailable };
    const article = result.data.content;
    if (article && Number(article.organization_id) !== Number(organization?.id)) notFound();
    if (!article && !result.unavailable) notFound();
    title = String(article?.title ?? title);
    const image = recordImage(article?.cover ?? article?.image);
    const related = (result.data.related ?? []).filter(
      (item) => Number(item.organization_id) === Number(organization?.id),
    );
    content = article ? (
      <div className="source-article-grid">
        <article className="card p-4">
          <span className="portal-eyebrow">فرمانداری {county.name}</span>
          <h2>{article.title}</h2>
          {Boolean(article.published_at) && <time>{officialDate(article.published_at)}</time>}
          {image && <img className="img-fluid radius10 inews" src={image} alt="" />}
          {article.excerpt && <p className="portal-lead">{article.excerpt}</p>}
          <SafeRichText html={String(article.body ?? '')} text={plainText(article.body)} />
          <ArticleActions />
          {article.comments_enabled === true && <CommentForm id={String(article.id)} />}
        </article>
        <aside className="card p-3">
          <h2>مطالب مرتبط فرمانداری</h2>
          {related.length ? news(related) : empty(false)}
          <a href={href('/news')}>همهٔ اخبار</a>
        </aside>
      </div>
    ) : (
      empty(true)
    );
  } else if (
    path === '/contact' ||
    path === '/contact-us' ||
    path === '/ideas' ||
    path === '/support'
  ) {
    title =
      path === '/ideas'
        ? 'ایده و پیشنهاد برای فرمانداری ' + county.name
        : 'ارتباط با فرمانداری ' + county.name;
    content = (
      <Panel title={title}>
        {Boolean(organization?.description) && (
          <SafeRichText
            html={String(organization?.description)}
            text={plainText(organization?.description)}
          />
        )}
        <ContactForm county={county} subject={path === '/ideas' ? 'ایده و پیشنهاد' : ''} />
      </Panel>
    );
  } else if (path === '/quick-access' || path === '/sitemap' || section?.kind === 'sitemap') {
    content = directory(countyQuickLinks(county));
  } else if (
    path === '/news' ||
    path === '/announcements' ||
    ['news', 'documents', 'tenders'].includes(section?.kind ?? '') ||
    collectionRoutes[path]
  ) {
    const resource =
      path === '/announcements'
        ? 'announcements'
        : section?.kind === 'documents'
          ? 'documents'
          : (collectionRoutes[path]?.endpoint ?? 'news');
    const result = await read(resource, query ? { q: query } : {});
    content = (
      <Panel title={title}>
        <SearchForm action={canonical} query={query} />
        {result.data.length ? news(result.data) : empty(result.unavailable)}
      </Panel>
    );
  } else if (
    path === '/managers' ||
    path === '/governors' ||
    ['managers', 'governors'].includes(section?.kind ?? '')
  ) {
    const kinds = ['manager', 'advisor', 'county_governor', 'district_head', 'village_head'];
    const requested = first(search.kind);
    const kind =
      requested && kinds.includes(requested)
        ? requested
        : path === '/governors' || section?.kind === 'governors'
          ? 'county_governor'
          : section?.group === '6'
            ? 'advisor'
            : section?.group === '4'
              ? 'district_head'
              : undefined;
    const result = await read('members', kind ? { kind } : {});
    const person = first(search.person);
    const people = person ? result.data.filter((item) => String(item.id) === person) : result.data;
    if (person && !people.length && !result.unavailable) notFound();
    title =
      kind === 'district_head'
        ? 'بخشداران شهرستان ' + county.name
        : kind === 'village_head'
          ? 'دهیاران شهرستان ' + county.name
          : kind === 'advisor'
            ? 'مشاوران فرماندار ' + county.name
            : kind === 'county_governor'
              ? 'فرمانداران شهرستان ' + county.name
              : 'مدیران شهرستان ' + county.name;
    content = (
      <>
        <nav className="county-manager-groups" aria-label="گروه مدیران شهرستان">
          {[
            ['مدیران', 'manager'],
            ['مشاوران', 'advisor'],
            ['بخشداران', 'district_head'],
            ['دهیاران', 'village_head'],
          ].map(([label, value]) => (
            <a
              key={value}
              href={href('/managers?kind=' + value)}
              aria-current={kind === value ? 'page' : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        {people.length ? (
          <OriginalManagerCards
            people={people}
            profilePath={href('/managers' + (kind ? '?kind=' + kind : ''))}
            contactHref={href('/contact')}
          />
        ) : (
          empty(result.unavailable)
        )}
        {person && people[0]?.body && (
          <SafeRichText html={String(people[0].body)} text={plainText(people[0].body)} />
        )}
      </>
    );
  } else if (path === '/gallery') {
    const result = await read('galleries');
    const id = first(search.album);
    const albums = id ? result.data.filter((album) => String(album.id) === id) : result.data;
    if (id && !albums.length && !result.unavailable) notFound();
    const items = albums.flatMap((album) =>
      ((album.items ?? []) as PublicRecord[]).flatMap((item) => {
        const image = recordImage(item.image ?? item.media);
        return image
          ? [
              {
                id: String(item.id),
                title: String(item.caption ?? album.title ?? 'گالری ' + county.name),
                image,
              },
            ]
          : [];
      }),
    );
    title = 'گالری تصاویر فرمانداری ' + county.name;
    content = items.length ? <OriginalGallery items={items} /> : empty(result.unavailable);
  } else if (path === '/services' || section?.kind === 'services') {
    const result = await read('services');
    content = result.data.length
      ? directory(
          result.data.map((item) => ({
            id: String(item.id),
            title: String(item.name),
            href: '/service/' + item.id,
          })),
        )
      : empty(result.unavailable);
  } else if (path.startsWith('/service/')) {
    const result = organization?.id
      ? await publicData<PublicRecord | undefined>(
          'services/' + path.split('/')[2],
          undefined,
          undefined,
        )
      : { data: undefined, unavailable };
    const service = result.data;
    if (service && Number(service.organization_id) !== Number(organization?.id)) notFound();
    if (!service && !result.unavailable) notFound();
    title = String(service?.name ?? 'جزئیات خدمت');
    content = service ? (
      <Panel title={title}>
        <SafeRichText
          html={String(service.description ?? '')}
          text={plainText(service.description)}
        />
        {(['requirements', 'steps'] as const).map(
          (key) =>
            Array.isArray(service[key]) && (
              <section key={key}>
                <h3>{key === 'steps' ? 'مراحل انجام خدمت' : 'مدارک موردنیاز'}</h3>
                <ol>
                  {(service[key] as string[]).map((text, index) => (
                    <li key={index}>{text}</li>
                  ))}
                </ol>
              </section>
            ),
        )}
        {service.url && (
          <a className="portal-button" href={safeDestination(service.url, href('/services'))}>
            ورود به سامانهٔ خدمت
          </a>
        )}
      </Panel>
    ) : (
      empty(true)
    );
  } else if (path === '/assistant') {
    title = 'دستیار پرتال فرمانداری ' + county.name;
    content = organization?.id ? (
      <Panel title={title}>
        <AssistantForm organizationId={Number(organization.id)} />
      </Panel>
    ) : (
      empty(unavailable)
    );
  } else if (path === '/search') {
    title = 'جستجو در پرتال فرمانداری ' + county.name;
    const result =
      query.length >= 2 ? await read('contents', { q: query }) : { data: [], unavailable: false };
    content = (
      <Panel title={title}>
        <SearchForm action={canonical} query={query} />
        {query && (result.data.length ? news(result.data) : empty(result.unavailable))}
      </Panel>
    );
  } else if (path === '/polls' || section?.kind === 'polls') {
    const result = await read('polls');
    content = result.data.length ? (
      <div className="portal-polls">
        {result.data.map((poll) => (
          <PollCard
            key={String(poll.id)}
            poll={poll as unknown as Parameters<typeof PollCard>[0]['poll']}
          />
        ))}
      </div>
    ) : (
      empty(result.unavailable)
    );
  } else if (path === '/faq' || section?.kind === 'faqs') {
    const result = await read('faqs');
    content = result.data.length
      ? result.data.map((item) => (
          <details className="portal-faq" key={String(item.id)}>
            <summary>{String(item.question ?? item.title ?? '')}</summary>
            <SafeRichText html={String(item.answer ?? '')} text={plainText(item.answer)} />
          </details>
        ))
      : empty(result.unavailable);
  } else if (path === '/links' || section?.kind === 'links') {
    const result = await read('links');
    content = result.data.length
      ? directory(
          result.data.map((item) => ({
            id: String(item.id),
            title: String(item.title),
            href: safeDestination(item.url, href('/links')),
          })),
        )
      : empty(result.unavailable);
  } else if (path === '/forms') {
    const result = await read('forms');
    content = result.data.length ? (
      <Panel title="فرم‌های خدمات فرمانداری">
        {result.data.map((form) => (
          <article key={String(form.id)}>
            <h2>{form.title}</h2>
            <SafeRichText
              html={String(form.description ?? '')}
              text={plainText(form.description)}
            />
            <a href="/citizen">ورود به حساب برای ثبت درخواست</a>
          </article>
        ))}
      </Panel>
    ) : (
      empty(result.unavailable)
    );
  } else if (path === '/districts') {
    const result = identity.record?.id
      ? await publicData<PublicRecord[]>(
          'organizations?county_id=' + identity.record.id + '&per_page=100',
          [],
          [],
        )
      : { data: [], unavailable };
    const units = result.data.filter((item) => ['district', 'village'].includes(String(item.type)));
    content = units.length ? (
      <Panel title={title}>
        {units.map((unit) => (
          <article key={String(unit.id)}>
            <h2>{unit.name}</h2>
            <p>{plainText(unit.description)}</p>
          </article>
        ))}
      </Panel>
    ) : (
      empty(result.unavailable)
    );
  } else if (path === '/transparency') {
    content = directory([
      { title: 'مناقصه‌ها و مزایده‌ها', href: '/tenders' },
      { title: 'قراردادها', href: '/contracts' },
      { title: 'اسناد و قوانین', href: '/regulations' },
      { title: 'دسترسی آزاد به اطلاعات', href: '/information' },
    ]);
  } else if (path === '/install' || path === '/download') {
    content = (
      <Panel title={'پرتال فرمانداری ' + county.name + '، همراه شما'}>
        <p>پرتال همین فرمانداری را از مرورگر تلفن همراه به صفحهٔ اصلی اضافه کنید.</p>
        <InstallGuide />
      </Panel>
    );
  } else if (path === '/track') {
    content = (
      <Panel title="پیگیری درخواست‌های مردمی">
        <p>درخواست‌ها و پاسخ‌های فرمانداری در حساب کاربری شما قابل پیگیری است.</p>
        <a className="portal-button" href="/citizen">
          ورود به حساب کاربری
        </a>
      </Panel>
    );
  } else if (section?.children.length) {
    content = directory(
      section.children.flatMap((id) => {
        const child = sectionById.get(id);
        return child ? [child] : [];
      }),
    );
  } else {
    const result = await read('pages', { q: section?.title ?? publicTitles[path] ?? title });
    content = result.data.length
      ? result.data.map((item) => (
          <Panel key={String(item.id)} title={String(item.title)}>
            <SafeRichText html={String(item.body ?? '')} text={plainText(item.body)} />
          </Panel>
        ))
      : empty(result.unavailable);
  }
  return (
    <PortalLayout path={canonical} title={title} county={county} organization={organization}>
      <div className="county-portal-content">{content}</div>
    </PortalLayout>
  );
}
