import { PortalLayout } from '@/components/site/portal-layout';
import { CountyMap } from '@/components/site/county-map';
import { HomeSlider, type HomeSlide } from '@/components/site/home-slider';
import { type OriginalNewsItem } from '@/components/site/original-news';
import { HomeLatestNews } from '@/components/site/home-latest-news';
import { OriginalTabs } from '@/components/site/original-tabs';
import { OriginalManagerCards } from '@/components/site/original-content';
import { OriginalIcon } from '@/components/site/original-icons';
import { HomeExperience } from '@/components/site/home-experience';
import { managerGroups, membersForGroup } from '@/data/manager-groups';
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
    title: String(slide.title ?? ''),
    image:
      officialImage(slide) ??
      officialSite.slides.find((source) => source.title === slide.title)?.image ??
      undefined,
    href:
      slide.url || slide.content_id
        ? safeDestination(slide.url, slide.content_id ? '/content/' + slide.content_id : '/news')
        : undefined,
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
  const allMembers = Object.entries(members).flatMap(([kind, people]) =>
    realRecords(people).map((person) => ({ ...person, kind: person.kind ?? kind })),
  );
  const managerTabs = managerGroups.map((group) => ({
    title: group.title,
    href: '/managers?group=' + group.group,
    people: membersForGroup(allMembers, group.group),
  }));
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
  const featuredGallery = galleries.find((gallery) => gallery.image);
  return (
    <PortalLayout
      path="/"
      home
      chrome={home}
      breadcrumbs={false}
      headerItems={navigationFromMenus(home.menus)}
    >
      <link rel="stylesheet" href="/styles/home-page.css" precedence="home" />
      <HomeExperience>
        <h1 className="source-sr-only">درگاه الکترونیکی استانداری مازندران</h1>
        <section className="home-intro" aria-label="تازه‌های استانداری">
          <div className="container-body d-f6279acc73263f">
            <HomeLatestNews items={newsItems} />
            <div className="container-body-right">
              <HomeSlider slides={slides} />
            </div>
            <div className="container-body-left" data-home-reveal="true">
              <span className="home-governor-label">استانداری مازندران</span>
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
            </div>
          </div>
        </section>
        <div className="sections-container">
          <section
            className="home-counties"
            aria-label="فرمانداری‌های مازندران"
            data-home-reveal="true"
          >
            <CountyMap />
          </section>
          <section
            className="home-information"
            aria-label="مصوبات و پیوندهای مفید"
            data-home-reveal="true"
          >
            <div className="container-peyvand">
              <div className="mz-portal-wrapper">
                <div className="mz-portal-news">
                  <span className="home-kicker">دسترسی به تازه‌ترین اسناد</span>
                  <h2 className="mz-portal-title">مصوبات و اطلاعیه‌ها</h2>
                  <p className="mz-portal-subtitle">
                    آخرین مصوبات و اطلاعیه‌های سازمان را مطالعه کنید.
                  </p>
                  <ul className="mz-news-list" id="mzNewsList">
                    {notices.map((item) => (
                      <li
                        className="mz-news-item"
                        key={String(item.id ?? item.slug)}
                        data-home-item="true"
                      >
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
                    مشاهدهٔ همهٔ اسناد <span aria-hidden="true">←</span>
                  </a>
                </div>
                <div className="mz-portal-links">
                  <span className="home-kicker">مسیرهای کوتاه‌تر، دسترسی آسان‌تر</span>
                  <h2 className="mz-portal-title">پیوندهای مفید</h2>
                  <p className="mz-portal-subtitle">پیوندهای مفید سازمان را اینجا مطالعه کنید.</p>
                  <div className="mz-links-grid">
                    {useful.map((item) => (
                      <a
                        className="mz-link-btn"
                        href={item.href}
                        key={item.id}
                        data-home-item="true"
                      >
                        <span>{item.title}</span>
                        <span className="home-link-arrow" aria-hidden="true">
                          ↖
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section
            className="home-managers"
            aria-labelledby="home-managers-title"
            data-home-reveal="true"
          >
            <div className="container-modiran">
              <div className="home-section-heading">
                <div>
                  <span className="home-kicker">شناخت مسئولان و راه‌های ارتباطی</span>
                  <h2 id="home-managers-title">مدیران و مسئولان استان</h2>
                </div>
                <a href="/managers" className="home-text-link">
                  مشاهدهٔ همه <span aria-hidden="true">←</span>
                </a>
              </div>
              <OriginalTabs tabs={managerTabs.map(({ title, href }) => ({ title, href }))}>
                {managerTabs.map((tab) =>
                  tab.people.length ? (
                    <OriginalManagerCards
                      people={tab.people.slice(0, 8)}
                      profilePath={tab.href}
                      key={tab.href}
                    />
                  ) : null,
                )}
              </OriginalTabs>
            </div>
          </section>
          <section
            className="home-public-relations"
            aria-labelledby="home-media-title"
            data-home-reveal="true"
          >
            <div className="container-omomi">
              <div className="stdprx-container">
                <div className="stdprx-header home-section-heading">
                  <div>
                    <span className="home-kicker">همراه با رویدادهای استان</span>
                    <h2 id="home-media-title">روابط عمومی استانداری</h2>
                  </div>
                  <a href="/news" className="home-text-link">
                    آرشیو اخبار <span aria-hidden="true">←</span>
                  </a>
                </div>
                <div className="stdprx-body">
                  <div className="stdprx-tv">
                    <a
                      className={'stdprx-screen' + (!featuredGallery ? ' source-media-empty' : '')}
                      href={featuredGallery?.href ?? '/gallery'}
                      aria-label={featuredGallery?.title ?? 'گالری روابط عمومی استانداری'}
                    >
                      {featuredGallery ? (
                        <img src={featuredGallery.image} alt="" loading="lazy" />
                      ) : (
                        <OriginalIcon name="footer" />
                      )}
                      <div className="home-media-caption">
                        <span>مازندران در قاب تصویر</span>
                        <strong>
                          {featuredGallery?.title ?? 'روایت تصویری رویدادهای استانداری'}
                        </strong>
                        <span className="home-media-action">
                          مشاهدهٔ گالری <span aria-hidden="true">←</span>
                        </span>
                      </div>
                    </a>
                  </div>
                  <div className="stdprx-timeline">
                    <ul className="stdprx-list">
                      {relations.slice(0, 6).map((item, index) => (
                        <li
                          className={'stdprx-item' + (index === 0 ? ' active' : '')}
                          key={String(item.id ?? item.slug)}
                          data-home-item="true"
                        >
                          <time>{officialDate(item.published_at)}</time>
                          <a href={articleHref(item)}>{item.title}</a>
                        </li>
                      ))}
                    </ul>
                    {!relations.length && (
                      <p className="source-empty">رویدادی در این بخش منتشر نشده است.</p>
                    )}
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
          <section
            className="home-gallery"
            aria-labelledby="home-gallery-title"
            data-home-reveal="true"
          >
            <div className="container-galery">
              <section className="gallery-section">
                <div className="home-section-heading">
                  <div>
                    <span className="home-kicker">تصاویر، روایتگر مازندران</span>
                    <h2 className="gallery-title" id="home-gallery-title">
                      گالری تصاویر
                    </h2>
                  </div>
                  <a href="/gallery" className="home-text-link">
                    همهٔ گالری‌ها <span aria-hidden="true">←</span>
                  </a>
                </div>
                <div className="gallery-wrapper">
                  {galleries.map((item) => (
                    <article className="gallery-card1" key={item.id} data-home-item="true">
                      <div className="card1-header">
                        <a className="card1-title" href={item.href}>
                          {item.title}
                        </a>
                        <a className="jahatha" href={item.href} aria-label="مشاهده گالری">
                          <span className="jahat" aria-hidden="true">
                            ↖
                          </span>
                        </a>
                      </div>
                      <a
                        className={'image-box' + (!item.image ? ' source-gallery-empty' : '')}
                        href={item.href}
                      >
                        {item.image && <img src={item.image} alt="" loading="lazy" />}
                        {!item.image && (
                          <OriginalIcon name="footer" className="home-gallery-mark" />
                        )}
                        <p className="caption">
                          مشاهدهٔ گالری <span aria-hidden="true">←</span>
                        </p>
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
      </HomeExperience>
    </PortalLayout>
  );
}
