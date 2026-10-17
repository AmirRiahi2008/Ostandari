# مسیرهای پروژه

تمام مسیرها نسبت به `http://127.0.0.1:3000` هستند. مسیرهای مدیریت، ورود لازم دارند.

## مسیرهای اصلی

| بخش                   | مسیر                               |
| --------------------- | ---------------------------------- |
| صفحه اصلی             | `/`                                |
| ورود مدیریت           | `/admin/login`                     |
| داشبورد مدیریت        | `/admin`                           |
| فرمانداری نور         | `/office?name=nur`                 |
| فرمانداری‌ها و نقشه   | `/counties`                        |
| اخبار                 | `/news`                            |
| نمونهٔ جزئیات خبر     | `/news/design-1`                   |
| اخبار فرمانداری نور   | `/news?name=nur`                   |
| گالری فرمانداری نور   | `/gallery?name=nur`                |
| تماس با فرمانداری نور | `/contact-us?name=nur&type=normal` |
| مدیران استان          | `/managers?group=1`                |
| دسترسی سریع           | `/quick-access`                    |
| قوانین                | `/regulations`                     |
| دسترسی به اطلاعات     | `/information`                     |
| بازیابی رمز           | `/forgot-password`                 |
| راهنمای نصب           | `/install`                         |
| پرسش‌های متداول       | `/faq`                             |
| نظرسنجی               | `/polls`                           |
| جستجو                 | `/search?q=عبارت`                  |

گروه مدیران: ۱ ستادی، ۲ معاونین، ۳ دستگاه‌های اجرایی، ۴ فرمانداران، ۵ روابط عمومی و ۶ مشاورین.

## شهرستان‌ها

| نام           | مسیر                            |
| ------------- | ------------------------------- |
| رامسر         | `/office?name=ramsar`           |
| تنکابن        | `/office?name=tonekabon`        |
| عباس‌آباد     | `/office?name=abbasabad`        |
| چالوس         | `/office?name=chalus`           |
| نوشهر         | `/office?name=noshahr`          |
| محمودآباد     | `/office?name=mahmudabad`       |
| آمل           | `/office?name=amol`             |
| فریدونکنار    | `/office?name=fereydunkenar`    |
| بابلسر        | `/office?name=babolsar`         |
| جویبار        | `/office?name=juybar`           |
| سیمرغ         | `/office?name=simorgh`          |
| بابل          | `/office?name=babol`            |
| سوادکوه       | `/office?name=savadkuh`         |
| سوادکوه شمالی | `/office?name=savadkuh-shomali` |
| ساری          | `/office?name=sari`             |
| گلوگاه        | `/office?name=galugah`          |
| میاندورود     | `/office?name=miandorud`        |
| قائم‌شهر      | `/office?name=qaemshahr`        |
| نور           | `/office?name=nur`              |
| کلاردشت       | `/office?name=kelardasht`       |
| نکا           | `/office?name=neka`             |
| بهشهر         | `/office?name=behshahr`         |

## قالب‌های ارسالی

هر فایل HTML/HTM اصلی، به‌عنوان alias هم قابل باز کردن است. برای مثال `/pages/khadamatelectronic.htm`. صفحه‌های آزمایشی در شاخهٔ `/design` قرار دارند.

| قالب                                  | مسیر                          | فایل اصلی                                     |
| ------------------------------------- | ----------------------------- | --------------------------------------------- |
| بوابة محافظة مازندران                 | `/ar`                         | `ar.html`                                     |
| پرتال استانداری مازندران              | `/`                           | `asli.html`                                   |
| پرتال خدمات مردمی                     | استانداری مازندران            | `/citizen`                                    | `dashbord-karbaran.html` |
| Mazandaran Governorate Portal         | `/en`                         | `en.html`                                     |
| پیشنهادها و انتقادات                  | `/contact`                    | `ertebat-mostaghim.html`                      |
| گالری تصاویر                          | `/gallery`                    | `galery.html`                                 |
| Document                              | `/design/ghabli`              | `ghabli.html`                                 |
| مهندسی صدرا رایانه نوین طبرستان       | `/password`                   | `login-panel-ostandari/login-changepass.html` |
| مهندسی صدرا رایانه نوین طبرستان       | `/verify`                     | `login-panel-ostandari/login-otp.html`        |
| مهندسی صدرا رایانه نوین طبرستان       | `/login`                      | `login-panel-ostandari/login.html`            |
| مهندسی صدرا رایانه نوین طبرستان       | `/register`                   | `login-panel-ostandari/register-login.html`   |
| درگاه الکترونیکی استانداری مازندران   | `/design/no-responsive`       | `no-responsive.html`                          |
| Document                              | `/governors`                  | `ostandaran.html`                             |
| Document                              | `/county`                     | `pages/farmandari.html`                       |
| جدول خدمات کلان و زیرخدمات            | `/services`                   | `pages/khadamatelectronic.htm`                |
| جدول خدمات کلان و زیرخدمات            | `/services/provincial`        | `pages/khadamatelectronicostanmazandaran.htm` |
| معاونین                               | `/deputies`                   | `pages/moavenin.html`                         |
| لیست خدمات قابل ارائه                 | `/transparency`               | `pages/nazar.html`                            |
| Singlepost                            | `/news`                       | `pages/news-details.html`                     |
| Document                              | `/links`                      | `pages/peyand.html`                           |
| سامانه شفافیت                         | `/governorate`                | `pages/samane.html`                           |
| جدول خدمات کلان و زیرخدمات            | `/duties`                     | `pages/sharhvazayef.htm`                      |
| بازطراحی بخش اخبار، خبرنامه و پیوندها | `/design/test`                | `pages/test.html`                             |
| آشنایی با شهرستان ساری                | پرتال استانداری مازندران      | `/design/shahrestan`                          | `shahrestan.html`        |
| صدیار                                 | `/admin`                      | `!-home.html`                                 |
| صدیار                                 | `/admin/menu-items`           | `Manage-Site-menu.html`                       |
| صدیار                                 | `/admin/slide-groups`         | `Manage-Site-slide.html`                      |
| صدیار                                 | `/admin/slides`               | `Manage-Site-slide2.html`                     |
| صدیار                                 | `/admin/menu-groups`          | `Manage-Site.html`                            |
| صدیار                                 | `/admin/member-groups`        | `ahza-groh.html`                              |
| صدیار                                 | `/admin/document-groups`      | `asnad.html`                                  |
| صدیار                                 | `/admin/service-groups`       | `emkanat.html`                                |
| صدیار                                 | `/admin/calls`                | `farakhan.html`                               |
| صدیار                                 | `/admin/form-groups`          | `forms-group.html`                            |
| صدیار                                 | `/admin/gallery-groups`       | `galery-tasavir.html`                         |
| صدیار                                 | `/admin/item-order`           | `item-setting.html`                           |
| صدیار                                 | `/admin/external-users`       | `karbaran-boron.html`                         |
| صدیار                                 | `/admin/internal-users`       | `karbaran-daron.html`                         |
| صدیار                                 | `/admin/news-groups`          | `khabar-group.html`                           |
| صدیار                                 | `/admin/members`              | `list-ahza.html`                              |
| صدیار                                 | `/admin/publications`         | `list-entesharat.html`                        |
| صدیار                                 | `/admin/forms`                | `list-forms.html`                             |
| صدیار                                 | `/admin/employee-list`        | `list-karmandan.html`                         |
| صدیار                                 | `/admin/employees`            | `manage-karmandan.html`                       |
| صدیار                                 | `/admin/experts`              | `manage-karshenas.html`                       |
| صدیار                                 | `/admin/subscribers`          | `manage-khabarname.html`                      |
| صدیار                                 | `/admin/organizations`        | `manage-sazman.html`                          |
| صدیار                                 | `/admin/files`                | `motefareghe-file.html`                       |
| صدیار                                 | `/admin/images`               | `motefareghe-img.html`                        |
| صدیار                                 | `/admin/submissions`          | `moteghazi-form.html`                         |
| صدیار                                 | `/admin/media-groups`         | `multi-resane.html`                           |
| صدیار                                 | `/admin/roles`                | `naghsh.html`                                 |
| صدیار                                 | `/admin/comments/pending`     | `nazar-no.html`                               |
| صدیار                                 | `/admin/comments/replied`     | `nazar-pasokh.html`                           |
| صدیار                                 | `/admin/polls`                | `nazarsanji.html`                             |
| صدیار                                 | `/admin/governor/pending`     | `payam-no-pasokh.html`                        |
| صدیار                                 | `/admin/governor/replied`     | `payam-pasokh.html`                           |
| صدیار                                 | `/admin/links`                | `peyvand.html`                                |
| صدیار                                 | `/admin/forum-topics`         | `pishnahad.html`                              |
| صدیار                                 | `/admin/faqs`                 | `porsesh.html`                                |
| صدیار                                 | `/admin/quotes`               | `sokhan-roz.html`                             |
| صدیار                                 | `/admin/advertisements`       | `tabligh.html`                                |
| صدیار                                 | `/admin/tags`                 | `tag-khabar.html`                             |
| صدیار                                 | `/admin/forum-groups`         | `talar.html`                                  |
| صدیار                                 | `/admin/organization-contact` | `tamas-modiriyat.html`                        |
| صدیار                                 | `/admin/contact/pending`      | `tamas-no.html`                               |
| صدیار                                 | `/admin/contact/replied`      | `tamas-pasokh.html`                           |
| صدیار                                 | `/admin/contact/approved`     | `tamas.html`                                  |
| پرینت در همان صفحه                    | `/admin/design/test`          | `test.html`                                   |
| مودال سمت‌های شغلی                    | `/admin/design/test2`         | `test2.html`                                  |

## مدیریت تکمیلی

`/admin/news`، `/admin/pages`، `/admin/counties`، `/admin/services`، `/admin/galleries`، `/admin/gallery-items`، `/admin/poll-options`، `/admin/account` و `/admin/reports`.

در حالت نمایش طرح، حساب `admin/admin` برای مدیریت محلی است. برای استفاده از MySQL، `TEMPLATE_PREVIEW=false` و حساب Laravel آماده‌شده با `php artisan portal:local-admin` استفاده می‌شود.
