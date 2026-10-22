import { PortalLayout, loadPortalChrome } from '@/components/site/portal-layout';
import { InstallGuide } from '@/components/site/install-guide';
import { OriginalIcon } from '@/components/site/original-icons';

function PortalPhonePreview() {
  return (
    <div className="download-art" aria-hidden="true">
      <div className="download-orbit" />
      <div className="download-phone">
        <div className="download-phone-camera" />
        <div className="download-phone-screen">
          <img src="/design/site/assets/image/logo.png" width={64} height={70} alt="" />
          <strong>اخبار استان یار</strong>
          <span>درگاه الکترونیکی خدمات</span>
          <div className="download-phone-news">
            <OriginalIcon name="document" />
            <strong>اخبار و اطلاعیه‌ها</strong>
            <span />
            <span />
            <span />
          </div>
          <div className="download-phone-services">
            <div>
              <OriginalIcon name="services" />
              <span>خدمات</span>
            </div>
            <div>
              <OriginalIcon name="home" />
              <span>فرمانداری‌ها</span>
            </div>
          </div>
          <div className="download-phone-home" />
        </div>
      </div>
      <div className="download-float is-news">
        <OriginalIcon name="document" />
        <span>اخبار استان</span>
      </div>
      <div className="download-float is-services">
        <OriginalIcon name="services" />
        <span>خدمات مردمی</span>
      </div>
    </div>
  );
}

export async function DownloadPage({ path = '/install' }: { path?: string }) {
  const chrome = loadPortalChrome();
  return (
    <PortalLayout path={path} title="دانلود و نصب اخبار استان یار" chrome={chrome}>
      <div className="portal-download">
        <section className="download-hero" aria-labelledby="download-title">
          <div className="download-hero-copy">
            <span className="download-eyebrow">پرتال استانداری، همیشه در دسترس</span>
            <h2 id="download-title">
              <strong>اخبار استان یار</strong>
            </h2>
            <p>
              اخبار استان، خدمات الکترونیکی، فرمانداری‌ها و پیگیری درخواست‌های مردمی؛ با همان تجربهٔ
              آشنای پرتال، در گوشی و رایانهٔ شما.
            </p>
            <a className="download-button" href="#download-options">
              <OriginalIcon name="app" />
              انتخاب روش دریافت<span aria-hidden="true">↓</span>
            </a>
            <ul className="download-hero-tags" aria-label="دستگاه‌های پشتیبانی‌شده">
              <li>اندروید و آیفون</li>
              <li>رایانه و مرورگر وب</li>
            </ul>
          </div>
          <PortalPhonePreview />
        </section>

        <section
          className="download-options"
          id="download-options"
          aria-label="روش‌های دریافت اپلیکیشن"
        >
          <article className="download-option">
            <div className="download-option-top">
              <span className="download-option-icon">
                <OriginalIcon name="app" />
              </span>
              <span lang="en" dir="ltr">
                Android
              </span>
            </div>
            <h2>دانلود مستقیم</h2>
            <p>دریافت فایل نصب نسخهٔ اندروید، بدون مراجعه به فروشگاه برنامه.</p>
            <button
              className="download-button"
              type="button"
              disabled
              aria-describedby="android-release-status"
            >
              نسخهٔ اندروید هنوز منتشر نشده
            </button>
            <small id="android-release-status">
              پس از انتشار فایل نصب رسمی، پیوند دریافت در همین بخش فعال می‌شود.
            </small>
          </article>
          <article className="download-option is-web">
            <div className="download-option-top">
              <span className="download-option-icon">
                <OriginalIcon name="home" />
              </span>
              <span lang="en" dir="ltr">
                Android · iOS · Desktop
              </span>
            </div>
            <h2>نسخهٔ وب پرتال</h2>
            <p>
              اخبار استان یار را به صفحهٔ اصلی دستگاه اضافه کنید و به بخش‌های مورد نیازتان سریع‌تر
              برسید.
            </p>
            <a className="download-button" href="#installation-guide">
              راهنمای افزودن به دستگاه<span aria-hidden="true">↓</span>
            </a>
            <a className="download-web-link" href="/">
              استفاده از نسخهٔ وب <span aria-hidden="true">↗</span>
            </a>
            <small>برای دریافت اطلاعات تازه و استفاده از خدمات، اتصال اینترنت لازم است.</small>
          </article>
        </section>

        <InstallGuide />

        <nav className="download-quick-links" aria-label="بخش‌های پرتال استانداری">
          <a href="/news">
            <OriginalIcon name="document" />
            <span>اخبار و اطلاعیه‌ها</span>
            <span aria-hidden="true">←</span>
          </a>
          <a href="/services">
            <OriginalIcon name="services" />
            <span>خدمات الکترونیکی</span>
            <span aria-hidden="true">←</span>
          </a>
          <a href="/counties">
            <OriginalIcon name="home" />
            <span>فرمانداری‌های استان</span>
            <span aria-hidden="true">←</span>
          </a>
          <a href="/track">
            <OriginalIcon name="agreement" />
            <span>پیگیری درخواست‌ها</span>
            <span aria-hidden="true">←</span>
          </a>
        </nav>
      </div>
    </PortalLayout>
  );
}
