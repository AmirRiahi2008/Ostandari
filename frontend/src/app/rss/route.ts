import { articleHref, officialRead, officialSite } from '@/features/site/official-data';
import type { PublicRecord } from '@/lib/public-content';

export const dynamic = 'force-dynamic';
const xml = (value: unknown) =>
  String(value ?? '').replace(
    /[<>&"']/g,
    (letter) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[letter]!,
  );

export async function GET(request: Request) {
  const origin = new URL(request.url).origin;
  const result = await officialRead('news?per_page=30&locale=fa');
  const news = Array.isArray(result.data)
    ? (result.data as PublicRecord[])
    : officialSite.news.filter((item) => item.type === 'news');
  const items = news
    .map((item) => {
      const href = new URL(articleHref(item), origin).href;
      const date = new Date(String(item.published_at ?? ''));
      return (
        '<item><title>' +
        xml(item.title) +
        '</title><link>' +
        xml(href) +
        '</link><guid>' +
        xml(href) +
        '</guid><description>' +
        xml(item.excerpt) +
        '</description>' +
        (Number.isNaN(date.getTime()) ? '' : '<pubDate>' + date.toUTCString() + '</pubDate>') +
        '</item>'
      );
    })
    .join('');
  return new Response(
    '<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>اخبار استانداری مازندران</title><link>' +
      xml(origin) +
      '</link><description>اخبار و اطلاعیه‌های استانداری مازندران</description><language>fa-IR</language>' +
      items +
      '</channel></rss>',
    {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=60',
      },
    },
  );
}
