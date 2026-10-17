export default function SiteTestPart1() {
  return (
    <>
      <div className="cb2-wrapper">
        <div className="cb2-left">
          <div className="cb2-card">
            <div className="cb2-card-head">
              <i className="fa-regular fa-envelope-open"></i>
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
              <i className="fa-regular fa-images"></i>
              <h3>{'گالری چندرسانه‌ای'}</h3>
            </div>
            <div className="gallery-card-body">
              <div className="gallery-img-wrap">
                <img src="/design/site/assets/image/galery-resane.webp" alt="گالری چندرسانه‌ای" />
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
                <h4>{'ورود معاون رئیس‌جمهور در امور زنان به مازندران'}</h4>
                <p>
                  {'گزارش کامل از سفر و برنامه‌های در نظر گرفته‌شده در استان مازندران ارائه شد.'}
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
                <p>{'متن کامل آیین‌نامه جدید جهت اطلاع دستگاه‌های اجرایی استان منتشر گردید.'}</p>
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
                <p>{'علاقه‌مندان می‌توانند از طریق سامانه مربوطه نسبت به ثبت‌نام اقدام کنند.'}</p>
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
        <div className="cb2-right">
          <div className="cb2-card-head">
            <i className="fa-solid fa-link"></i>
            <h3>{'پیوند‌ها'}</h3>
          </div>
          <div className="links-body">
            <a href="/links" className="link-item">
              <div className="link-icon">
                <i className="fa-solid fa-landmark"></i>
              </div>
              <div className="link-text">
                <span className="lt-title">{'پایگاه اطلاع‌رسانی'}</span>
                <span className="lt-sub">{'دولت جمهوری اسلامی ایران'}</span>
              </div>
              <i className="fa-solid fa-chevron-left link-arrow"></i>
            </a>
            <a href="/links" className="link-item">
              <div className="link-icon">
                <i className="fa-solid fa-building-columns"></i>
              </div>
              <div className="link-text">
                <span className="lt-title">{'وزارت کشور'}</span>
                <span className="lt-sub">{'میز خدمت الکترونیک'}</span>
              </div>
              <i className="fa-solid fa-chevron-left link-arrow"></i>
            </a>
            <a href="/transparency" className="link-item">
              <div className="link-icon">
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <div className="link-text">
                <span className="lt-title">{'سامانه شفافیت'}</span>
                <span className="lt-sub">{'استانداری مازندران'}</span>
              </div>
              <i className="fa-solid fa-chevron-left link-arrow"></i>
            </a>
            <a href="/services" className="link-item">
              <div className="link-icon">
                <i className="fa-solid fa-database"></i>
              </div>
              <div className="link-text">
                <span className="lt-title">{'پایگاه ملی اطلاعات'}</span>
                <span className="lt-sub">{'سامانه ثبت اطلاعات'}</span>
              </div>
              <i className="fa-solid fa-chevron-left link-arrow"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
