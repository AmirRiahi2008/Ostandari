'use client';
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="portal-main">
      <section className="portal-panel portal-not-found">
        <h1>بارگذاری صفحه کامل نشد</h1>
        <p>دوباره تلاش کنید یا به صفحهٔ اصلی برگردید.</p>
        <div className="portal-article-actions">
          <button type="button" onClick={reset}>
            تلاش دوباره
          </button>
          <a className="portal-button" href="/">
            صفحه اصلی
          </a>
        </div>
      </section>
    </main>
  );
}
