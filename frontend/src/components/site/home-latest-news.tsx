import { OriginalNews, type OriginalNewsItem } from './original-news';

export function HomeLatestNews({ items }: { items: OriginalNewsItem[] }) {
  return (
    <section
      className="container-body-center home-news-card"
      data-home-reveal="true"
      aria-labelledby="home-latest-title"
    >
      <div className="home-news-heading">
        <div>
          <span className="home-kicker">روایت پیشرفت مازندران</span>
          <h2 id="home-latest-title">تازه‌های استان</h2>
        </div>
        <a href="/news" className="home-text-link">
          همهٔ اخبار <span aria-hidden="true">←</span>
        </a>
      </div>
      <OriginalNews items={items} />
    </section>
  );
}
