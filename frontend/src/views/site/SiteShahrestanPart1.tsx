import { SiteHeader } from '@/components/site/site-header';
export default function SiteShahrestanPart1() {
  return (
    <>
      <div className="container-asli">
        <SiteHeader />
        <section>
          <div className="county-page">
            <div className="county-video-card">
              <div className="video-caption">
                <h3>{'ویدیوی معرفی شهرستان ساری'}</h3>
                <span className="video-tag">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polygon points="10 8 16 12 10 16 10 8"></polygon>
                  </svg>
                  {' ویدیوی معرفی '}
                </span>
              </div>
              <div className="video-frame">
                <video controls={true} preload="metadata">
                  <source type="video/mp4" />
                  {' مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند. '}
                </video>
              </div>
            </div>
            <div className="county-desc-card">
              <h2>{'درباره شهرستان ساری'}</h2>
              <p>
                {
                  ' ساری، مرکز استان مازندران، یکی از کهن‌ترین شهرهای شمال ایران است که در دامنه رشته‌کوه البرز و در فاصله‌ای کوتاه از سواحل دریای خزر قرار گرفته است. این شهرستان به دلیل موقعیت جغرافیایی ویژه، از دیرباز نقش مهمی در تجارت، کشاورزی و ارتباطات میان شمال و مرکز کشور ایفا کرده است. '
                }
              </p>
              <p>
                {
                  ' اقتصاد شهرستان بر پایه کشاورزی (به‌ویژه برنج و مرکبات)، صنعت، خدمات اداری و گردشگری استوار است. وجود جنگل‌های هیرکانی، تالاب‌های فصلی و مناطق ییلاقی همچون کیاسر و کوهستان‌های اطراف، ساری را به یکی از مقاصد گردشگری چهارفصل استان تبدیل کرده است. '
                }
              </p>
              <p>
                {
                  ' از نظر اداری، فرمانداری شهرستان ساری مسئولیت هماهنگی میان بخش‌ها، دهستان‌ها و دستگاه‌های اجرایی را بر عهده دارد و در راستای توسعه متوازن شهری و روستایی، پروژه‌های عمرانی متعددی را در حوزه‌های زیرساخت، آموزش، بهداشت و گردشگری در دست اجرا دارد. '
                }
              </p>
            </div>
          </div>
        </section>
        <section>
          <div className="container-body d-24672f875e71af">
            <div className="container-body-center">
              <footer className="icx-footer-root">
                <div className="icx-footer-wrap">
                  <div className="icx-footer-col">
                    <h4 className="icx-footer-title">{'سایت'}</h4>
                    <ul className="icx-footer-list">
                      <li>
                        <a className="icx-footer-link" href="/links">
                          {'مشتریان ما'}
                        </a>
                      </li>
                      <li>
                        <a className="icx-footer-link" href="/services">
                          {'خدمات'}
                        </a>
                      </li>
                      <li>
                        <a className="icx-footer-link" href="/about">
                          {'معرفی ما'}
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="icx-footer-col">
                    <h4 className="icx-footer-title">{'صفحات'}</h4>
                    <ul className="icx-footer-list">
                      <li>
                        <a className="icx-footer-link" href="/services">
                          {'سرویس ها'}
                        </a>
                      </li>
                      <li>
                        <a className="icx-footer-link" href="/links">
                          {'مشتریان ما'}
                        </a>
                      </li>
                      <li>
                        <a className="icx-footer-link" href="/help">
                          {'امکانات'}
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="icx-footer-col">
                    <h4 className="icx-footer-title">{'سرویس ها'}</h4>
                    <ul className="icx-footer-list">
                      <li>
                        <a className="icx-footer-link" href="/help">
                          {'آموزشی'}
                        </a>
                      </li>
                      <li>
                        <a className="icx-footer-link" href="/news">
                          {'روزانه'}
                        </a>
                      </li>
                      <li>
                        <a className="icx-footer-link" href="/news">
                          {'ویژه'}
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="icx-footer-col icx-footer-contact">
                    <h4 className="icx-footer-title">{'اطلاعات تماس'}</h4>
                    <p className="icx-footer-text">
                      <i className="fa-solid fa-location-dot icx-footer-icon"></i>
                      {' مازندران - ساری - خیابان شیخ طبرسی روبه روی خیابان ملت ساختمان طبرستان '}
                    </p>
                    <p className="icx-footer-text">
                      <i className="fa-regular fa-envelope icx-footer-icon"></i>
                      {' info@irancompile.com '}
                    </p>
                    <p className="icx-footer-text">
                      <i className="fa-solid fa-phone icx-footer-icon"></i>
                      {' ۰۱۱۳۳۳۲۴۰۵۶ '}
                    </p>
                    <div className="icx-footer-social">
                      <a
                        className="icx-footer-social-link"
                        href="/social"
                        aria-label="شبکه‌های اجتماعی"
                      >
                        <i className="fab fa-whatsapp"></i>
                      </a>
                      <a
                        className="icx-footer-social-link"
                        href="/social"
                        aria-label="شبکه‌های اجتماعی"
                      >
                        <i className="fab fa-instagram"></i>
                      </a>
                      <a
                        className="icx-footer-social-link"
                        href="/social"
                        aria-label="شبکه‌های اجتماعی"
                      >
                        <i className="fab fa-telegram"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </footer>
              <div className="bottom-footer">
                <div className="d-812ca5ad2a1e69">{' صدرا رایانه نوین طبرستان '}</div>
                {' طراحی و توسعه یافته توسط '}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
