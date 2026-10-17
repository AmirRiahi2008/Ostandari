import sampleServices from '@/data/sample-services.json';
import { notFound, redirect } from 'next/navigation';
import { PortalLayout, Panel, EmptyState } from '@/components/site/portal-layout';
import { CountyMap } from '@/components/site/county-map';
import { NewsCard } from '@/components/site/news-card';
import { SafeRichText } from '@/components/site/safe-rich-text';
import {
  ContactForm,
  PollCard,
  AssistantForm,
  ForgotPasswordForm,
} from '@/components/site/public-forms';
import { NewsletterConfirmation } from '@/components/site/newsletter-confirmation';
import { LinkGrid } from '@/components/site/link-grid';
import { SearchForm } from '@/components/site/search-form';
import { publicData, plainText, designNews, type PublicRecord } from '@/lib/public-content';
import { findCounty } from '@/data/counties';
import { publicTitles, collectionRoutes } from '@/data/public-navigation';
import { OfficePage, CountyNavigation } from './office-page';
import { NewsPage, ArticlePage } from './news-page';
import { ManagersPage } from './managers-page';
import { CountyGallery } from './gallery-page';
import { CollectionPage } from './collection-page';
import { first, type Search } from './search-params';
export type { Search } from './search-params';
export async function PublicPage({ path, search }: { path: string; search: Search }) {
  if (path === '/office' && !first(search.name)) redirect('/counties');
  if (path === '/office')
    return <OfficePage slug={first(search.name)} section={first(search.section)} />;
  if (path === '/news') return <NewsPage search={search} />;
  if (/^\/(news|content)\/[^/]+$/.test(path))
    return <ArticlePage id={decodeURIComponent(path.split('/')[2])} search={search} />;
  if (path === '/managers') return <ManagersPage search={search} />;
  if (path === '/gallery' && first(search.name)) return <CountyGallery search={search} />;
  if (collectionRoutes[path]) return <CollectionPage path={path} />;
  const title = publicTitles[path] ?? 'جزئیات خدمت';
  let content;
  if (path === '/forgot-password')
    content = (
      <Panel title={title}>
        <ForgotPasswordForm />
      </Panel>
    );
  else if (path === '/counties') content = <CountyMap />;
  else if (path === '/quick-access') content = <LinkGrid />;
  else if (path === '/search') {
    const query = (first(search.q) ?? '').slice(0, 150);
    const result =
      query.length >= 2
        ? await publicData<{
            contents: PublicRecord[];
            services: PublicRecord[];
            faqs: PublicRecord[];
          }>(
            'search?q=' + encodeURIComponent(query),
            {
              contents: designNews.filter((item) => String(item.title).includes(query)),
              services: [],
              faqs: [],
            },
            { contents: [], services: [], faqs: [] },
          )
        : { data: { contents: [], services: [], faqs: [] }, unavailable: false };
    const data = { data: result.data.contents, unavailable: result.unavailable };
    content = (
      <Panel title="جستجو در پرتال">
        <SearchForm query={query} />
        {query &&
          (data.data.length + result.data.services.length + result.data.faqs.length > 0 ? (
            <div className="portal-news-grid">
              {data.data.map((item) => (
                <NewsCard key={String(item.id)} item={item} />
              ))}
            </div>
          ) : (
            <EmptyState unavailable={data.unavailable}>نتیجه‌ای پیدا نشد.</EmptyState>
          ))}
        {result.data.services.map((service) => (
          <p key={String(service.id)}>
            <a href={'/service/' + service.id}>{service.name}</a>
          </p>
        ))}
        {result.data.faqs.map((faq) => (
          <details className="portal-faq" key={String(faq.id)}>
            <summary>{String(faq.question ?? '')}</summary>
            <p>{plainText(faq.answer)}</p>
          </details>
        ))}
      </Panel>
    );
  } else if (path === '/faq') {
    const data = await publicData<PublicRecord[]>('faqs?per_page=100', [], []);
    content = (
      <Panel title={title}>
        {data.data.length ? (
          data.data.map((item) => (
            <details className="portal-faq" key={String(item.id)}>
              <summary>{String(item.question ?? item.title)}</summary>
              <SafeRichText html={String(item.answer ?? '')} text={plainText(item.answer)} />
            </details>
          ))
        ) : (
          <>
            <EmptyState unavailable={data.unavailable} />
            <p>
              برای پرسش دربارهٔ خدمات، از <a href="/contact">فرم ارتباط مستقیم</a> استفاده کنید.
            </p>
          </>
        )}
      </Panel>
    );
  } else if (path === '/polls') {
    const data = await publicData<PublicRecord[]>('polls?per_page=100', [], []);
    content = data.data.length ? (
      <div className="portal-polls">
        {data.data.map((poll) => (
          <PollCard
            key={String(poll.id)}
            poll={poll as unknown as Parameters<typeof PollCard>[0]['poll']}
          />
        ))}
      </div>
    ) : (
      <Panel title={title}>
        <EmptyState unavailable={data.unavailable}>نظرسنجی فعالی ثبت نشده است.</EmptyState>
      </Panel>
    );
  } else if (path === '/contact-us' || path === '/ideas' || path === '/support') {
    const slug = first(search.name);
    const county = slug ? findCounty(slug) : undefined;
    if (slug && !county) notFound();
    content = (
      <>
        {county && <CountyNavigation county={county} />}
        <Panel title={county ? 'ارتباط با فرمانداری ' + county.name : title}>
          <ContactForm
            county={county}
            subject={
              path === '/ideas' ? 'ایده و پیشنهاد' : path === '/support' ? 'درخواست پشتیبانی' : ''
            }
          />
        </Panel>
      </>
    );
  } else if (path === '/track')
    content = (
      <Panel title={title}>
        <p>درخواست‌ها و پاسخ‌ها در حساب کاربری شما قابل مشاهده‌اند.</p>
        <p>پس از ورود، بخش «درخواست‌های من» را باز کرده و کد رهگیری را جستجو کنید.</p>
        <a className="portal-button" href="/citizen">
          ورود به پیگیری درخواست‌ها
        </a>
      </Panel>
    );
  else if (path === '/assistant')
    content = (
      <Panel title={title}>
        <p>پاسخ به پرسش‌ها بر اساس محتوای منتشرشده در پرتال.</p>
        <AssistantForm />
      </Panel>
    );
  else if (path === '/install')
    content = (
      <Panel title={title}>
        <div className="portal-install">
          <img src="/design/site/assets/image/logo.png" alt="نشان پرتال" />
          <div>
            <h2>پرتال استانداری روی دستگاه شما</h2>
            <p>برای دسترسی سریع، نشانی پرتال را به صفحهٔ اصلی یا نشانک‌های مرورگر اضافه کنید.</p>
            <details className="portal-faq" open>
              <summary>آیفون و آیپد</summary>
              <p>
                صفحه را در Safari باز کنید. از منوی اشتراک‌گذاری، Add to Home Screen را انتخاب کنید.
              </p>
            </details>
            <details className="portal-faq">
              <summary>اندروید و رایانه</summary>
              <p>از منوی مرورگر، افزودن به صفحهٔ اصلی یا افزودن به نشانک‌ها را انتخاب کنید.</p>
            </details>
            <a className="portal-button" href="/">
              باز کردن صفحه اصلی
            </a>
          </div>
        </div>
      </Panel>
    );
  else if (path === '/help')
    content = (
      <Panel title={title}>
        <div className="portal-help">
          <h2>دسترسی به بخش‌های پرتال</h2>
          <p>
            از منوی خدمات به فرم‌ها و سامانه‌ها دسترسی دارید. روی نام شهرستان در نقشه کلیک کنید تا
            پرتال همان فرمانداری باز شود.
          </p>
          <h2>حساب کاربری و پیگیری</h2>
          <p>
            از بخش ورود و ثبت‌نام، حساب خود را باز کنید. درخواست‌ها، پیام‌ها و پاسخ‌ها در داشبورد
            کاربران قرار دارند.
          </p>
          <LinkGrid />
        </div>
      </Panel>
    );
  else if (path === '/information')
    content = (
      <Panel title={title}>
        <p>
          اطلاعات و اسناد منتشرشده در بخش شفافیت و قوانین در دسترس‌اند. برای درخواست اطلاعات از مسیر
          ارتباط مستقیم استفاده کنید.
        </p>
        <div className="portal-link-grid">
          <a href="/regulations">قوانین و اسناد</a>
          <a href="/transparency">شفافیت</a>
          <a href="/contact">درخواست اطلاعات</a>
        </div>
      </Panel>
    );
  else if (path === '/social')
    content = (
      <Panel title={title}>
        <p>نشانی شبکه‌های اجتماعی تأییدشدهٔ پرتال در بخش پیوندها منتشر می‌شود.</p>
        <a className="portal-button" href="/links">
          مشاهده پیوندهای رسمی
        </a>
      </Panel>
    );
  else if (path.startsWith('/service/')) {
    const id = decodeURIComponent(path.split('/')[2]);
    const data = /^\d+$/.test(id)
      ? await publicData<PublicRecord | undefined>('services/' + id, undefined, undefined)
      : {
          data: sampleServices.find((service) => service.id === id) as PublicRecord | undefined,
          unavailable: false,
        };
    content = (
      <Panel title={data.data?.name ?? id}>
        <p>
          {plainText(
            data.data?.description ?? 'توضیحات این خدمت در داده‌های فعلی پرتال ثبت نشده است.',
          )}
        </p>
        {data.data?.url ? (
          <a className="portal-button" href={data.data.url}>
            ورود به سامانه خدمت
          </a>
        ) : (
          <a href="/services">بازگشت به خدمات الکترونیکی</a>
        )}
        {data.unavailable && <EmptyState unavailable />}
      </Panel>
    );
  } else if (path === '/newsletter/confirm')
    content = (
      <Panel title={title}>
        <p>برای تأیید عضویت، لینک موجود در ایمیل خبرنامه را باز کنید.</p>
        <NewsletterConfirmation token={first(search.token)} email={first(search.email)} />
      </Panel>
    );
  else {
    const name = path === '/unit' ? first(search.name) : undefined;
    const data = await publicData<PublicRecord[]>(
      'pages?q=' + encodeURIComponent(name ?? title) + '&per_page=100',
      [],
      [],
    );
    content = (
      <Panel title={name ?? title}>
        {data.data.length ? (
          data.data.map((item) => (
            <section key={String(item.id)}>
              <h2>{item.title}</h2>
              <SafeRichText html={String(item.body ?? '')} text={plainText(item.body)} />
            </section>
          ))
        ) : (
          <EmptyState unavailable={data.unavailable}>
            محتوای این بخش هنوز در پرتال ثبت نشده است.
          </EmptyState>
        )}
        {path === '/about' && (
          <div className="portal-link-grid">
            <a href="/counties">شهرستان‌های مازندران</a>
            <a href="/governors">استانداران ادوار</a>
            <a href="/duties">ساختار و وظایف</a>
          </div>
        )}
      </Panel>
    );
  }
  return (
    <PortalLayout path={path} title={title}>
      {content}
    </PortalLayout>
  );
}
