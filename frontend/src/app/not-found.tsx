import { PortalLayout } from '@/components/site/portal-layout';
export default function NotFound() {
  return (
    <PortalLayout path="/404" breadcrumbs={false}>
      <section className="portal-panel portal-not-found">
        <strong aria-hidden="true">۴۰۴</strong>
        <h1>صفحه پیدا نشد</h1>
        <p>نشانی واردشده معتبر نیست یا این صفحه در پرتال وجود ندارد.</p>
        <div className="portal-article-actions">
          <a className="portal-button" href="/">
            صفحه اصلی
          </a>
          <a className="portal-button" href="/counties">
            انتخاب فرمانداری
          </a>
          <a className="portal-button" href="/search">
            جستجو
          </a>
        </div>
      </section>
    </PortalLayout>
  );
}
