import { OriginalNews, type OriginalNewsItem } from './original-news';

export function HomeLatestNews({ items }: { items: OriginalNewsItem[] }) {
  return (
    <section
      className="container-body-center home-news-card"
      data-home-reveal="true"
      aria-label="تازه‌های استان"
    >
      <OriginalNews items={items} />
      <a href="/news" className="home-news-all home-text-link">
        همه اخبار <span aria-hidden="true">←</span>
      </a>
    </section>
  );
}
