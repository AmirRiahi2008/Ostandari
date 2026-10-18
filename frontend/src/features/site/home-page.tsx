import { PortalLayout, Panel } from '@/components/site/portal-layout';
import { CountyMap } from '@/components/site/county-map';
import { HomeSlider, type HomeSlide } from '@/components/site/home-slider';
import { NewsletterForm, PollCard } from '@/components/site/public-forms';
import { safeDestination } from '@/lib/urls';
import type { PublicRecord } from '@/lib/public-content';
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

function Records({ items }: { items: PublicRecord[] }) {
  if (!items.length) return <p className="public-source-note">در حال حاضر مطلبی منتشر نشده است.</p>;
  return (
    <ul className="public-records">
      {items.map((item) => (
        <li key={String(item.id ?? item.slug)}>
          <a href={articleHref(item)}>{item.title}</a>
          <time dateTime={String(item.published_at ?? '')}>{officialDate(item.published_at)}</time>
        </li>
      ))}
    </ul>
  );
}

export async function HomePage() {
  const [result, polls, documentResult] = await Promise.all([
    officialRead('home?locale=fa'),
    officialRead('polls?per_page=100&locale=fa'),
    officialRead('documents?per_page=5&locale=fa'),
  ]);
  const home = (result.data ?? {}) as PublicRecord;
  const sourceNews = officialSite.news.filter((item) => item.type === 'news');
  const real = (items: unknown): PublicRecord[] =>
    Array.isArray(items)
      ? items.filter(
          (item) =>
            !String(item.title ?? item.name).includes('آزمایشی') &&
            !String(item.excerpt ?? item.bio).includes('اطلاعات نمایشی'),
        )
      : [];
  const usingSnapshot = canUseSnapshot(result.unavailable);
  const news = usingSnapshot ? sourceNews : real(home.news);
  const notices = real(home.announcements);
  const governorRecord = home.governor as PublicRecord | undefined;
  const governor =
    governorRecord && !String(governorRecord.name).includes('آزمایشی')
      ? governorRecord
      : usingSnapshot
        ? officialSite.governor
        : { name: 'استانداری مازندران', position: 'ارتباط مستقیم' };
  const governorPhoto =
    officialImage(governor) ??
    (governor.name === officialSite.governor.name ? officialSite.governor.image : undefined);
  const apiSlides = real(home.slides).map((slide): HomeSlide => ({
    id: String(slide.id),
    title: String(slide.title),
    image:
      officialImage(slide) ??
      officialSite.slides.find((source) => source.title === slide.title)?.image ??
      undefined,
    href: safeDestination(slide.url, slide.content_id ? '/content/' + slide.content_id : '/news'),
  }));
  const slides: HomeSlide[] = apiSlides.length
    ? apiSlides
    : usingSnapshot
      ? officialSite.slides.map((slide, index) => ({
          id: 'official-slide-' + index,
          title: slide.title,
          image: slide.image ?? undefined,
          href: slide.href,
        }))
      : [];
  const documents = canUseSnapshot(documentResult.unavailable)
    ? officialSite.news.filter((item) => item.type === 'document')
    : real(documentResult.data);
  const poll = Array.isArray(polls.data)
    ? polls.data.find((item) => item.question === officialSite.poll.question)
    : undefined;

  return (
    <PortalLayout
      path="/public-home"
      breadcrumbs={false}
      headerItems={navigationFromMenus(home.menus)}
    >
      <div className="public-home">
        <h1 className="public-sr-only">درگاه الکترونیکی استانداری مازندران</h1>
        <div className="public-home-lead">
          <section className="public-news-rail">
            <div className="public-section-heading">
              <h2>آخرین اخبار</h2>
              <a href="/news">همهٔ اخبار ←</a>
            </div>
            <Records items={news.slice(0, 7)} />
          </section>
          <HomeSlider slides={slides} />
          <aside className="public-governor">
            {governorPhoto && (
              <img src={governorPhoto} width={520} height={539} alt={String(governor.name)} />
            )}
            <h2>{String(governor.name)}</h2>
            <p>{String(governor.position ?? 'استاندار مازندران')}</p>
            <a className="portal-button" href="/contact">
              ارتباط با استاندار
            </a>
            <a href="/governors">معرفی استانداران</a>
          </aside>
        </div>
        {usingSnapshot && (
          <p className="public-source-date">
            اخبار برگرفته از نسخهٔ سایت اصلی در {officialSite.snapshot_date} است.
          </p>
        )}
        <nav className="public-shortcuts" aria-label="خدمات و دسترسی سریع">
          {['services', 'managers', 'duties', 'menu-173', 'districts', 'units'].map((id, index) => {
            const item = sectionById.get(id)!;
            return (
              <a href={item.href} key={id}>
                <span aria-hidden="true">{['◈', '♧', '▤', '✓', '⌂', '▦'][index]}</span>
                <strong>{item.title}</strong>
                <span aria-hidden="true">←</span>
              </a>
            );
          })}
        </nav>
        <CountyMap />
        <div className="public-home-columns">
          <Panel title="اخبار و اطلاعیه‌ها" href="/news">
            <Records items={[...notices, ...news].slice(0, 6)} />
          </Panel>
          <Panel title="پیوندهای مفید" href="/section/useful">
            <div className="public-link-tiles">
              {officialSite.useful.map((id) => {
                const item = sectionById.get(id)!;
                return (
                  <a key={id} href={item.href}>
                    {item.title}
                    <span aria-hidden="true">↗</span>
                  </a>
                );
              })}
            </div>
          </Panel>
        </div>
        <Panel title="مدیران و ساختار استانداری" href="/managers">
          <div className="public-directory-tiles">
            {sectionById.get('managers')!.children.map((id) => {
              const item = sectionById.get(id)!;
              return (
                <a key={id} href={item.href}>
                  {item.title}
                  <span aria-hidden="true">←</span>
                </a>
              );
            })}
          </div>
        </Panel>
        <div className="public-home-columns">
          <Panel title="قوانین و مقررات" href="/regulations">
            <Records items={documents.slice(0, 5)} />
          </Panel>
          <Panel title="گالری فیلم و عکس" href="/gallery">
            <div className="public-gallery-text">
              {sectionById
                .get('gallery')!
                .children.slice(0, 4)
                .map((id) => {
                  const item = sectionById.get(id)!;
                  return (
                    <a key={id} href={item.href}>
                      <span aria-hidden="true">▧</span>
                      <span>{item.title}</span>
                    </a>
                  );
                })}
            </div>
          </Panel>
        </div>
        <div className="public-home-columns">
          <Panel title="نظر سنجی" href="/polls/site">
            {poll ? (
              <PollCard poll={poll} />
            ) : (
              <>
                <h3>{officialSite.poll.question}</h3>
                <ul className="public-records">
                  {officialSite.poll.options.map((option) => (
                    <li key={option}>{option}</li>
                  ))}
                </ul>
                <a href="/polls/site">شرکت در نظرسنجی ←</a>
              </>
            )}
          </Panel>
          <Panel title="عضویت در خبرنامه">
            <p>با عضویت در خبرنامهٔ استانداری از طریق ایمیل از آخرین اخبار مطلع شوید.</p>
            <NewsletterForm />
          </Panel>
        </div>
      </div>
    </PortalLayout>
  );
}
