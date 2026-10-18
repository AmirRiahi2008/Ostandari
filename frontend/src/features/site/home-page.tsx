import { PortalLayout } from '@/components/site/portal-layout';
import { CountyMap } from '@/components/site/county-map';
import { HomeSlider, type HomeSlide } from '@/components/site/home-slider';
import { OriginalNews, type OriginalNewsItem } from '@/components/site/original-news';
import { OriginalTabs } from '@/components/site/original-tabs';
import { OriginalManagerCards } from '@/components/site/original-content';
import { OriginalIcon } from '@/components/site/original-icons';
import { safeDestination } from '@/lib/urls';
import { plainText, type PublicRecord } from '@/lib/public-content';
import {
  articleHref,
  canUseSnapshot,
  navigationFromMenus,
  officialDate,
  officialImage,
  officialRead,
  officialSite,
  sectionById,
} from './official-data';

const realRecords = (items: unknown): PublicRecord[] =>
  Array.isArray(items)
    ? items.filter(
        (item) =>
          !String(item.title ?? item.name).includes('آزمایشی') &&
          !String(item.excerpt ?? item.bio).includes('اطلاعات نمایشی'),
      )
    : [];

export async function HomePage() {
  const [result, documentResult] = await Promise.all([
    officialRead('home?locale=fa'),
    officialRead('documents?per_page=5&locale=fa'),
  ]);
  const home = (result.data ?? {}) as PublicRecord;
  const usingSnapshot = canUseSnapshot(result.unavailable);
  const news: PublicRecord[] = usingSnapshot
    ? officialSite.news.filter((item) => item.type === 'news')
    : realRecords(home.news);
  const announcements = realRecords(home.announcements);
  const resolutions = realRecords(home.resolutions);
  const governorRecord = home.governor as PublicRecord | undefined;
  const governor: PublicRecord =
    governorRecord && !String(governorRecord.name).includes('آزمایشی')
      ? governorRecord
      : usingSnapshot
        ? officialSite.governor
        : { name: 'استانداری مازندران', position: 'ارتباط مستقیم' };
  const photo =
    officialImage(governor) ??
    (governor.name === officialSite.governor.name ? officialSite.governor.image : undefined);
  const slidesFromApi: HomeSlide[] = realRecords(home.slides).map((slide) => ({
    id: String(slide.id),
    title: String(slide.title),
    image:
      officialImage(slide) ??
      officialSite.slides.find((source) => source.title === slide.title)?.image ??
      undefined,
    href: safeDestination(slide.url, slide.content_id ? '/content/' + slide.content_id : '/news'),
  }));
  const slides = slidesFromApi.length
    ? slidesFromApi
    : usingSnapshot
      ? officialSite.slides.map((slide, index) => ({
          id: 'official-slide-' + index,
          title: slide.title,
          image: slide.image ?? undefined,
          href: slide.href,
        }))
      : [];
  const newsItems: OriginalNewsItem[] = [
    ...news.map((item): PublicRecord => ({ ...item, type: 'news' })),
    ...announcements.map((item): PublicRecord => ({ ...item, type: 'announcement' })),
    ...resolutions.map((item): PublicRecord => ({ ...item, type: 'resolution' })),
  ].map((item) => ({
    id: item.type + '-' + String(item.id ?? item.slug),
    title: String(item.title),
    excerpt: plainText(item.excerpt),
    href: articleHref(item),
    image: officialImage(item),
    date: officialDate(item.published_at),
    type: String(item.type),
  }));
  const documents: PublicRecord[] = canUseSnapshot(documentResult.unavailable)
    ? officialSite.news.filter((item) => item.type === 'document')
    : realRecords(documentResult.data);
  const notices = [...announcements, ...resolutions, ...documents].slice(0, 6);
  const members = (home.members ?? {}) as Record<string, PublicRecord[]>;
  const managerTabs = [
    { title: 'مدیران ستادی', href: '/managers?group=1', people: realRecords(members.manager) },
    {
      title: 'استانداران',
      href: '/governors',
      people: realRecords(members.governor).length
        ? realRecords(members.governor)
        : governorRecord || usingSnapshot
          ? [governor]
          : [],
    },
    {
      title: 'فرمانداران',
      href: '/managers?group=4',
      people: realRecords(members.county_governor),
    },
    {
      title: 'بخشداران',
      href: '/managers?kind=district_head',
      people: realRecords(members.district_head),
    },
    {
      title: 'دهیاران',
      href: '/managers?kind=village_head',
      people: realRecords(members.village_head),
    },
  ];
  const galleriesFromApi = realRecords(home.galleries).map((item) => ({
    id: String(item.id),
    title: String(item.title),
    href: '/gallery?id=' + item.id,
    image:
      officialImage(item) ??
      officialImage(((item.items as PublicRecord[] | undefined) ?? [])[0] ?? {}),
  }));
  const galleries = galleriesFromApi.length
    ? galleriesFromApi
    : usingSnapshot
      ? sectionById
          .get('gallery')!
          .children.slice(0, 3)
          .map((id) => ({ ...sectionById.get(id)!, image: undefined as string | undefined }))
      : [];
  const links = realRecords(home.links);
  const useful = links.length
    ? links.slice(0, 14).map((item) => ({
        id: String(item.id),
        title: String(item.title ?? item.name),
        href: safeDestination(item.url, '/links'),
      }))
    : officialSite.useful.map((id) => sectionById.get(id)!);
  const relations = realRecords(home.events).length ? realRecords(home.events) : news;
  return (
    <PortalLayout
      path="/"
      home
      chrome={home}
      breadcrumbs={false}
      headerItems={navigationFromMenus(home.menus)}
      headlines={news
        .slice(0, 5)
        .map((item) => ({ title: String(item.title), href: articleHref(item) }))}
    >
      <h1 className="source-sr-only">درگاه الکترونیکی استانداری مازندران</h1>
      <section>
        <div className="container-body d-f6279acc73263f">
          <div className="container-body-center">
            <OriginalNews items={newsItems} />
          </div>
          <div className="container-body-right">
            <HomeSlider slides={slides} />
          </div>
          <div className="container-body-left">
            {photo && <img src={photo} width={520} height={539} alt={String(governor.name)} />}
            <div className="name">
              <span>{String(governor.name)}</span>
              <p>{String(governor.position ?? 'استاندار مازندران')}</p>
            </div>
            <a className="name-btn" href="/contact">
              ارتباط با استاندار
            </a>
            <a className="name-btn2" href="/governors">
              معرفی استانداران
            </a>
            <div className="name-icon">
              {[
                ['bale-color.png', 'بله'],
                ['eitaa-icon-colorful.png', 'ایتا'],
                ['linkedin.png', 'لینکدین'],
                ['telegram.png', 'تلگرام'],
              ].map(([image, title]) => (
                <a href="/social" key={image} aria-label={title}>
                  <img
                    src={'/design/site/assets/image/' + image}
                    width={24}
                    height={24}
                    alt={title}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="sections-container">
        <section>
          <CountyMap />
        </section>
        <section>
          <div className="container-peyvand">
            <div className="mz-portal-wrapper">
              <div className="mz-portal-news">
                <h2 className="mz-portal-title">آخرین مصوبات و اطلاعیه‌ها:</h2>
                <p className="mz-portal-subtitle">
                  آخرین مصوبات و اطلاعیه‌های سازمان را مطالعه کنید.
                </p>
                <ul className="mz-news-list" id="mzNewsList">
                  {notices.map((item) => (
                    <li className="mz-news-item" key={String(item.id ?? item.slug)}>
                      <div>
                        <OriginalIcon name="document" className="item-svg" />
                      </div>
                      <div>
                        <time className="mz-news-date">{officialDate(item.published_at)}</time>
                        <p>
                          <a href={articleHref(item)}>{item.title}</a>
                        </p>
                      </div>
                    </li>
                  ))}
                  {!notices.length && (
                    <li className="source-empty">مطلبی در این بخش منتشر نشده است.</li>
                  )}
                </ul>
                <a className="source-more" href="/regulations">
                  مشاهده همه
                </a>
              </div>
              <div className="mz-portal-links">
                <h2 className="mz-portal-title">پیوندهای مفید:</h2>
                <p className="mz-portal-subtitle">پیوندهای مفید سازمان را اینجا مطالعه کنید.</p>
                <div className="mz-links-grid">
                  {useful.map((item) => (
                    <a className="mz-link-btn" href={item.href} key={item.id}>
                      {item.title}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container-modiran">
            <OriginalTabs tabs={managerTabs.map(({ title, href }) => ({ title, href }))}>
              {managerTabs.map((tab) =>
                tab.people.length ? (
                  <OriginalManagerCards
                    people={tab.people.slice(0, 8)}
                    profilePath={tab.href}
                    key={tab.href}
                  />
                ) : (
                  <p className="source-empty" key={tab.href}>
                    مشخصات {tab.title} هنوز منتشر نشده است.
                  </p>
                ),
              )}
            </OriginalTabs>
          </div>
        </section>
        <section>
          <div className="container-omomi">
            <div className="stdprx-container">
              <div className="stdprx-header">
                <span>روابط عمومی استانداری</span>
              </div>
              <div className="stdprx-body">
                <div className="stdprx-tv">
                  <a
                    className="stdprx-screen source-media-empty"
                    href="/gallery"
                    aria-label="گالری روابط عمومی استانداری"
                  >
                    <OriginalIcon name="footer" />
                    <span className="stdprx-play" />
                  </a>
                  <div className="stdprx-stand" />
                </div>
                <div className="stdprx-timeline">
                  <ul className="stdprx-list">
                    {relations.slice(0, 6).map((item, index) => (
                      <li
                        className={'stdprx-item' + (index === 0 ? ' active' : '')}
                        key={String(item.id ?? item.slug)}
                      >
                        <a href={articleHref(item)}>{item.title}</a>
                      </li>
                    ))}
                  </ul>
                  <div className="stdprx-actions">
                    <a className="stdprx-btn live" href="/news">
                      اخبار
                    </a>
                    <a className="stdprx-btn archive" href="/gallery">
                      آرشیو
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container-galery">
            <section className="gallery-section">
              <h2 className="gallery-title">گالری تصاویر</h2>
              <div className="gallery-wrapper">
                {galleries.map((item) => (
                  <article className="gallery-card1" key={item.id}>
                    <div className="card1-header">
                      <a className="card1-title" href={item.href}>
                        گالری تصاویر استانداری
                      </a>
                      <a className="jahatha" href={item.href} aria-label="مشاهده گالری">
                        <span className="jahat">‹</span>
                        <span className="jahat">›</span>
                      </a>
                    </div>
                    <a
                      className={'image-box' + (!item.image ? ' source-gallery-empty' : '')}
                      href={item.href}
                    >
                      {item.image && <img src={item.image} alt="" loading="lazy" />}
                      <p className="caption">{item.title}</p>
                    </a>
                  </article>
                ))}
              </div>
              {!galleries.length && (
                <p className="source-empty">گالری‌ای در این بخش منتشر نشده است.</p>
              )}
            </section>
          </div>
        </section>
      </div>
    </PortalLayout>
  );
}
