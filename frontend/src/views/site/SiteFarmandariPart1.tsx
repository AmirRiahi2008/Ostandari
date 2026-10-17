import { SiteHeader } from '@/components/site/site-header';
import { SiteFooter } from '@/components/site/site-footer';
export default function SiteFarmandariPart1() {
  return (
    <>
      <div className="container-asli">
        <SiteHeader />
        <div className="container">
          <div className="container-body">
            <div className="container-body-right">
              <div className="swiper mySwiper">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <img
                      src="/design/site/assets/image/SlideShowImage48554642IMG_20260323_133439_246.jpg"
                      alt=""
                    />
                  </div>
                  <div className="swiper-slide">
                    <img
                      src="/design/site/assets/image/SlideShowImage48554642IMG_20260323_133439_246.jpg"
                      alt=""
                    />
                  </div>
                  <div className="swiper-slide">
                    <img
                      src="/design/site/assets/image/SlideShowImage48554642IMG_20260323_133439_246.jpg"
                      alt=""
                    />
                  </div>
                  <div className="swiper-slide">
                    <img
                      src="/design/site/assets/image/SlideShowImage48554642IMG_20260323_133439_246.jpg"
                      alt=""
                    />
                  </div>
                  <div className="swiper-slide">
                    <img
                      src="/design/site/assets/image/SlideShowImage48554642IMG_20260323_133439_246.jpg"
                      alt=""
                    />
                  </div>
                  <div className="swiper-slide">
                    <img
                      src="/design/site/assets/image/SlideShowImage48554642IMG_20260323_133439_246.jpg"
                      alt=""
                    />
                  </div>
                  <div className="swiper-slide">
                    <img
                      src="/design/site/assets/image/SlideShowImage48554642IMG_20260323_133439_246.jpg"
                      alt=""
                    />
                  </div>
                  <div className="swiper-slide">
                    <img
                      src="/design/site/assets/image/SlideShowImage48554642IMG_20260323_133439_246.jpg"
                      alt=""
                    />
                  </div>
                </div>
                <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div>
              </div>
            </div>
            <div className="container-body-left">
              <img src="/design/site/assets/image/abozar.jpeg" alt="" />
              <div className="name">
                <span>{'ابوذر قربانی ارات بنی'}</span>
                <p>{'فرماندار شهرستان قائمشهر'}</p>
              </div>
              <div className="name-btn">{' ارتباط با رئیس '}</div>
              <div className="name-btn2">{' ریاست ادوار '}</div>
              <div className="name-icon">
                <a href="/social" aria-label="شبکه‌های اجتماعی">
                  <img src="/design/site/assets/image/bale-color.png" alt="" />
                </a>
                <a href="/social" aria-label="شبکه‌های اجتماعی">
                  <img src="/design/site/assets/image/eitaa-icon-colorful.png" alt="" />
                </a>
                <a href="/social" aria-label="شبکه‌های اجتماعی">
                  <img src="/design/site/assets/image/linkedin.png" alt="" />
                </a>
                <a href="/social" aria-label="شبکه‌های اجتماعی">
                  <img src="/design/site/assets/image/telegram.png" alt="" />
                </a>
              </div>
            </div>
          </div>
          <div className="cb2-wrapper">
            <div className="cb2-left">
              <div className="cb2-card">
                <div className="cb2-card-head">
                  <i className="fa-regular fa-envelope-open">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M3 6h18v12H3V6z"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M3 7l9 7 9-7"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </i>
                  <h3>{'عضویت در خبرنامه'}</h3>
                </div>
                <div className="newsletter-body">
                  <p>
                    {
                      'با عضویت در خبرنامه استانداری، از طریق ایمیل، از آخرین اخبار و اطلاعیه‌ها مطلع شوید.'
                    }
                  </p>
                  <div className="nl-field">
                    <input type="email" placeholder="ایمیل خود را وارد نمایید" />
                    <i className="fa-regular fa-envelope"></i>
                  </div>
                  <button className="nl-btn" type="button">
                    <span>{'عضویت در خبرنامه'}</span>
                    <i className="fa-solid fa-paper-plane"></i>
                  </button>
                </div>
              </div>
              <div className="cb2-card gallery-card">
                <div className="cb2-card-head">
                  <i className="fa-regular fa-images">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <rect
                        x="3"
                        y="5"
                        width="18"
                        height="14"
                        rx="2"
                        stroke="#fff"
                        strokeWidth="2"
                      ></rect>
                      <circle cx="9" cy="10" r="1.5" fill="#fff"></circle>
                      <path
                        d="M5 17l5-5 3 3 4-4 2 2"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </i>
                  <h3>{'گالری چندرسانه‌ای'}</h3>
                </div>
                <div className="gallery-card-body">
                  <div className="gallery-img-wrap">
                    <img
                      src="/design/site/assets/image/galery-resane.webp"
                      alt="گالری چندرسانه‌ای"
                    />
                    <div className="gallery-overlay">
                      <span className="tag">{'تصویر'}</span>
                      <div className="g-title">{'بازدید استاندار از پروژه‌های عمرانی'}</div>
                    </div>
                  </div>
                  <div className="gallery-dots">
                    <span className="active"></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="cb2-center">
              <div className="news-top">
                <div className="news-tabs2" id="newsTabs">
                  <div className="news-tab-slider" id="newsSlider"></div>
                  <button
                    className="news-tab-btn active"
                    data-index="0"
                    data-command="cb2SwitchTab"
                    data-command-args="this,0"
                    data-command-event="click"
                  >
                    {'اخبار'}
                  </button>
                  <button
                    className="news-tab-btn"
                    data-index="1"
                    data-command="cb2SwitchTab"
                    data-command-args="this,1"
                    data-command-event="click"
                  >
                    {'اطلاعیه‌ها'}
                  </button>
                </div>
                <div className="news-count-pill">
                  <i className="fa-solid fa-circle"></i>
                  {' بروزرسانی لحظه‌ای'}
                </div>
              </div>
              <div className="news-list2" id="tabPanel-0">
                <div className="news-card2">
                  <div className="thumb">
                    <img src="/design/site/assets/image/khabar1.jpg" alt="خبر" />
                    <span className="cat-badge">{'اخبار'}</span>
                  </div>
                  <div className="content">
                    <h4>
                      {
                        'ورود معاون رئیس‌جمهور در امور زنان به مازندرانون رئیس‌جمهور در امور زنان به مازندرانون رئیس‌جمهور در امور زنان به مازندرانون رئیس‌جمهور در امور زنان به مازندرانون رئیس‌جمهور در امور زنان به مازندرانون رئیس‌جمهور در امور زنان به مازندرانون رئیس‌جمهور در امور زنان به مازندرانون رئیس‌جمهور در امور زنان به مازندران'
                      }
                    </h4>
                    <p>
                      {
                        'گزارش کامل از سفر و برنامه‌های در نظر گرفته‌شده در استان مازندران ارائه شد.گزارش کامل از سفر و برنامه‌های در نظر گرفته‌شده در استان مازندران ارائه شد.گزارش کامل از سفر و برنامه‌های در نظر گرفته‌شده در استان مازندران ارائه شد.گزارش کامل از سفر و برنامه‌های در نظر گرفته‌شده در استان مازندران ارائه شد.گزارش کامل از سفر و برنامه‌های در نظر گرفته‌شده در استان مازندران ارائه شد.گزارش کامل از سفر و برنامه‌های در نظر گرفته‌شده در استان مازندران ارائه شد.'
                      }
                    </p>
                    <div className="meta">
                      <span>
                        <i className="fa-regular fa-calendar"></i>
                        {' ۱۴۰۴/۰۶/۲۸'}
                      </span>
                      <span>
                        <i className="fa-regular fa-eye"></i>
                        {' ۳۲۱ بازدید'}
                      </span>
                    </div>
                  </div>
                  <div className="go-arrow">
                    <i className="fa-solid fa-arrow-up-left"></i>
                  </div>
                </div>
                <div className="news-card2">
                  <div className="thumb">
                    <img src="/design/site/assets/image/khabar1.jpg" alt="خبر" />
                    <span className="cat-badge">{'اخبار'}</span>
                  </div>
                  <div className="content">
                    <h4>{'عیادت استاندار مازندران از آیت‌الله محمدی'}</h4>
                    <p>
                      {'استاندار مازندران در دیدار صمیمی، جویای احوال ایشان شد و آرزوی سلامتی کرد.'}
                    </p>
                    <div className="meta">
                      <span>
                        <i className="fa-regular fa-calendar"></i>
                        {' ۱۴۰۴/۰۶/۲۸'}
                      </span>
                      <span>
                        <i className="fa-regular fa-eye"></i>
                        {' ۲۰۴ بازدید'}
                      </span>
                    </div>
                  </div>
                  <div className="go-arrow">
                    <i className="fa-solid fa-arrow-up-left"></i>
                  </div>
                </div>
                <div className="news-card2">
                  <div className="thumb">
                    <img src="/design/site/assets/image/khabar1.jpg" alt="خبر" />
                    <span className="cat-badge">{'مصوبات'}</span>
                  </div>
                  <div className="content">
                    <h4>{'آیین‌نامه اجرایی قانون انتشار و دسترسی آزاد'}</h4>
                    <p>
                      {'متن کامل آیین‌نامه جدید جهت اطلاع دستگاه‌های اجرایی استان منتشر گردید.'}
                    </p>
                    <div className="meta">
                      <span>
                        <i className="fa-regular fa-calendar"></i>
                        {' ۱۴۰۴/۰۵/۱۶'}
                      </span>
                      <span>
                        <i className="fa-regular fa-eye"></i>
                        {' ۱۵۸ بازدید'}
                      </span>
                    </div>
                  </div>
                  <div className="go-arrow">
                    <i className="fa-solid fa-arrow-up-left"></i>
                  </div>
                </div>
                <div className="news-card2">
                  <div className="thumb">
                    <img src="/design/site/assets/image/khabar1.jpg" alt="خبر" />
                    <span className="cat-badge">{'اخبار'}</span>
                  </div>
                  <div className="content">
                    <h4>{'برگزاری جلسه هماهنگی مدیران دستگاه‌های اجرایی'}</h4>
                    <p>{'در این جلسه موضوعات مربوط به توسعه زیرساخت‌های استان بررسی شد.'}</p>
                    <div className="meta">
                      <span>
                        <i className="fa-regular fa-calendar"></i>
                        {' ۱۴۰۴/۰۵/۱۰'}
                      </span>
                      <span>
                        <i className="fa-regular fa-eye"></i>
                        {' ۹۷ بازدید'}
                      </span>
                    </div>
                  </div>
                  <div className="go-arrow">
                    <i className="fa-solid fa-arrow-up-left"></i>
                  </div>
                </div>
              </div>
              <div className="news-list2 d-d0466aa33fa806" id="tabPanel-1">
                <div className="news-card2">
                  <div className="thumb">
                    <img src="/design/site/assets/image/khabar1.jpg" alt="اطلاعیه" />
                    <span className="cat-badge">{'اطلاعیه'}</span>
                  </div>
                  <div className="content">
                    <h4>{'متن قانون انتشار و دسترسی آزاد به اطلاعات'}</h4>
                    <p>{'متن کامل قانون جهت استحضار عموم شهروندان در این بخش منتشر می‌شود.'}</p>
                    <div className="meta">
                      <span>
                        <i className="fa-regular fa-calendar"></i>
                        {' ۱۴۰۴/۰۵/۱۶'}
                      </span>
                      <span>
                        <i className="fa-regular fa-eye"></i>
                        {' ۲۴۳ بازدید'}
                      </span>
                    </div>
                  </div>
                  <div className="go-arrow">
                    <i className="fa-solid fa-arrow-up-left"></i>
                  </div>
                </div>
                <div className="news-card2">
                  <div className="thumb">
                    <img src="/design/site/assets/image/khabar1.jpg" alt="اطلاعیه" />
                    <span className="cat-badge">{'اطلاعیه'}</span>
                  </div>
                  <div className="content">
                    <h4>{'فراخوان ثبت‌نام دوره‌های آموزشی کارکنان دولت'}</h4>
                    <p>
                      {'علاقه‌مندان می‌توانند از طریق سامانه مربوطه نسبت به ثبت‌نام اقدام کنند.'}
                    </p>
                    <div className="meta">
                      <span>
                        <i className="fa-regular fa-calendar"></i>
                        {' ۱۴۰۴/۰۴/۰۲'}
                      </span>
                      <span>
                        <i className="fa-regular fa-eye"></i>
                        {' ۱۱۲ بازدید'}
                      </span>
                    </div>
                  </div>
                  <div className="go-arrow">
                    <i className="fa-solid fa-arrow-up-left"></i>
                  </div>
                </div>
              </div>
              <div className="news-footer2">
                <a href="/news" className="news-more-btn">
                  <span>{'مشاهده همه'}</span>
                  <i className="fa-solid fa-arrow-left"></i>
                </a>
              </div>
            </div>
            <section>
              <div className="cb2-right">
                <div className="cb2-card-head">
                  <i className="fa-solid fa-link">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M10.59 13.41a1 1 0 0 0 1.41 1.41l4.24-4.24a3 3 0 0 0-4.24-4.24L9.88 8.46"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M13.41 10.59a1 1 0 0 0-1.41-1.41L7.76 13.41A3 3 0 0 0 12 17.66l2.12-2.12"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </i>
                  <h3>{'پیوند‌ها'}</h3>
                </div>
                <div className="links-body">
                  <a href="/links" className="link-item" aria-label="مشاهده صفحه">
                    <img src="/design/site/assets/image/paygah.jpg" alt="" />
                  </a>
                  <a href="/links" className="link-item" aria-label="مشاهده صفحه">
                    <img src="/design/site/assets/image/paygah.jpg" alt="" />
                  </a>
                  <a href="/links" className="link-item" aria-label="مشاهده صفحه">
                    <img src="/design/site/assets/image/paygah.jpg" alt="" />
                  </a>
                  <a href="/links" className="link-item" aria-label="مشاهده صفحه">
                    <img src="/design/site/assets/image/paygah.jpg" alt="" />
                  </a>
                  <a href="/links" className="link-item" aria-label="مشاهده صفحه">
                    <img src="/design/site/assets/image/paygah.jpg" alt="" />
                  </a>
                </div>
              </div>
            </section>
          </div>
          <div className="qs-map-section">
            <div className="qs-map-inner">
              <div className="qs-map-text">
                <div className="qs-map-badge">
                  <span className="qs-dot"></span>
                  {' نقشهٔ رسمی شهرستان '}
                </div>
                <h2 className="qs-map-title">
                  {'قائم‌شهر '}
                  <span>{'در یک نگاه'}</span>
                </h2>
                <p className="qs-map-desc">
                  {
                    ' نقشهٔ کامل بافت شهری قائم‌شهر، شامل معابر اصلی، محورهای ارتباطی و بافت مسکونی این شهرستان که تحت پوشش فرمانداری قائم‌شهر اداره می‌شود. '
                  }
                </p>
                <div className="qs-map-coords">
                  <div className="qs-coord-item">
                    <span className="qs-coord-label">{'عرض جغرافیایی'}</span>
                    <span className="qs-coord-value">{'36.4593° N'}</span>
                  </div>
                  <div className="qs-coord-sep"></div>
                  <div className="qs-coord-item">
                    <span className="qs-coord-label">{'طول جغرافیایی'}</span>
                    <span className="qs-coord-value">{'52.8551° E'}</span>
                  </div>
                </div>
                <a href="/office?name=qaemshahr&section=about" className="qs-map-btn">
                  <span>{'درباره قائمشهر'}</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="d-87dec954737471"
                  >
                    <path
                      d="M15 6L9 12L15 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </a>
              </div>
              <div className="qs-map-visual">
                <div className="qs-map-glow"></div>
                <div className="qs-map-frame">
                  <img alt="نقشه شهرستان قائم شهر" className="qs-map-img" />
                  <div className="qs-map-shine"></div>
                  <div className="qs-pin">
                    <span className="qs-pin-ring"></span>
                    <span className="qs-pin-dot"></span>
                  </div>
                </div>
                <div className="qs-map-corner qs-corner-tl"></div>
                <div className="qs-map-corner qs-corner-br"></div>
              </div>
            </div>
          </div>
          <SiteFooter />
        </div>
      </div>
    </>
  );
}
