import { officialNavigation } from '@/data/official-navigation';

export function SiteFooter() {
  return (
    <footer className="footer public-footer">
      <div className="public-footer-grid">
        <div>
          <img
            src="/design/site/assets/image/logo.png"
            width={80}
            height={87}
            alt="استانداری مازندران"
            loading="lazy"
          />
          <p>درگاه الکترونیکی استانداری مازندران</p>
        </div>
        <nav aria-label="دسترسی آسان">
          <h2>دسترسی آسان</h2>
          {officialNavigation.footer.map((item) => (
            <a href={item.href} key={item.id}>
              {item.title}
            </a>
          ))}
        </nav>
        <nav aria-label="بخش‌های سایت">
          <h2>بخش‌های سایت</h2>
          <a href="/counties">فرمانداری‌ها</a>
          <a href="/districts">بخشداری‌ها</a>
          <a href="/units">واحدهای ستادی</a>
          <a href="/news">اخبار و اطلاعیه‌ها</a>
          <a href="/regulations">قوانین و مقررات</a>
          <a href="/gallery">گالری فیلم و عکس</a>
        </nav>
        <address>
          <h2>اطلاعات تماس</h2>
          <p>ساری، خیابان انقلاب، استانداری مازندران</p>
          <p>
            تلفن: <span dir="ltr">۰۱۱۳۳۳۱۰۲۱۱–۱۹</span>
          </p>
          <p>
            نمابر: <span dir="ltr">۰۱۱۳۳۳۱۰۲۸۳</span>
          </p>
          <a href="mailto:info@ostan-mz.ir">info@ostan-mz.ir</a>
          <a href="/contact">ارتباط با ما</a>
        </address>
      </div>
      <div className="public-footer-bottom">
        کلیه حقوق مادی و معنوی این سایت متعلق به استانداری مازندران است.
      </div>
    </footer>
  );
}
