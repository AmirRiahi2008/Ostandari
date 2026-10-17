# نگاشت طرح ارسالی به بک‌اند

این پیاده‌سازی API مستقل است. هیچ فایل HTML/CSS/JS از طرح در پروژه کپی یا به فرانت‌اند تبدیل نشده است. داده‌های سایت آنلاین مهاجرت نشده‌اند؛ قرارداد API از طرح‌های مشاهده‌شده استخراج شده است.

| بخش طرح | منبع و مسیر اصلی |
|---|---|
| صفحه اصلی asli و نسخه‌های en/ar | `/home?locale=fa/en/ar` |
| اخبار، اطلاعیه و مصوبات | contents با نوع ثابت؛ `/admin/news`, `/admin/announcements`, `/admin/resolutions` |
| جزئیات خبر | `/contents/{id}` یا `/contents/by-slug/{type}/{slug}` |
| معرفی استاندار و مدیران | members با kind، position، تصویر و بازه تصدی |
| تب مدیران، استانداران، فرمانداران، بخشداران، دهیاران | members با kindهای متناظر |
| نقشه شهرستان‌ها و صفحه معرفی | counties، map_key و مختصات؛ `/counties/by-slug/{slug}` |
| پرتال فرمانداری | organizations با سلسله‌مراتب و `/portals/{slug}` |
| سامانه شفافیت | contents با نوع tender/contract/resolution/document/page؛ دسته‌بندی موضوعی |
| شرح وظایف | contents با type=duty و سازمان مرتبط |
| خدمات الکترونیکی و جدول خدمات کلان/زیرخدمت | services با parent_id، گروه، مدارک، مراحل و نشانی خدمت |
| ارتباط مستقیم با استاندار | tickets با type=governor؛ تماس بدون حساب با type=contact |
| گالری و آرشیو چندرسانه‌ای | galleries، gallery-items و رسانه با MIME واقعی |
| منو، گروه منو و زیرمنوهای چندسطحی | menus و menu-items؛ کنترل چرخه و منوی والد |
| اسلایدشو و گروه اسلایدشو | slides و categories با type=slide |
| گروه‌های خبری و گروه اسناد | categories با type=news/document |
| اسناد و فایل‌های دانلودی | contents با type=document، metadata و media_ids |
| تگ‌های خبری | tags و ارتباط content_tag |
| اعضای سازمان و گروه اعضا | members و categories با type=member |
| لیست انتشارات | contents با type=publication |
| سخن روز | quotes با زمان شروع/پایان |
| پرسش‌های متداول | faqs |
| نظرسنجی | polls، poll-options، poll-votes |
| پیوندها | links، تصویر اختیاری، گروه و موقعیت نمایش |
| مدیریت فراخوان‌ها | contents با type=call |
| تبلیغات | advertisements؛ همان ساختار اسلاید با kind جدا |
| کاربران درون و برون سازمانی | users؛ staff/citizen و role |
| نقش‌ها و دسترسی‌ها | roles.permissions؛ کنترل مجوز و محدوده سازمانی |
| مدیریت سازمان‌ها | organizations؛ نوع، والد، شهرستان، دامنه و اطلاعات تماس |
| اطلاعات تماس سازمان/رئیس | organizations و members.phone/email/position/image |
| تالار گفت‌وگو و موضوع پیشنهادی | forum-topics و forum-replies؛ صف تأیید |
| اعضای خبرنامه | subscribers؛ تأیید عضویت و وضعیت فعال |
| کارمندان و کارشناسان | users با person_type=employee/expert و personnel_code |
| لیست فرم‌ها، گروه‌های فرم و گروه ویژگی‌ها | forms و categories با type=form/form_attribute؛ schema فیلدها در fields |
| متقاضیان فرم‌ها | form-submissions؛ نسخه تعریف فرم و نتیجه بررسی |
| پیام‌های پاسخ‌داده‌شده/نشده | tickets با type، status و پیام‌ها |
| نظرات تأییدشده/نشده | comments.status و API moderation |
| تصاویر و فایل‌های متفرقه | media، با visibility=public/private |
| تنظیمات آیتم‌ها و محل قرارگیری | settings با key=home.sections و آرایه key/position/priority/enabled |
| داشبورد خالی پنل | آمار واقعی `/admin/dashboard` و خروجی CSV |
| پرتال مردمی | `/citizen/dashboard`, tickets، submissions، polls، notifications و profile |
| پنجره نصب اپ | تنظیمات عمومی site.app_url و site.app_qr؛ نصب و نمایش UI وظیفه فرانت‌اند است |
| دستیار Hyrcan در طرح | `/assistant/query` با موتور محلی local-content؛ اتصال LLM خارجی جزو این نسخه نیست |

مواردی مانند ظاهر، انیمیشن، تغییر زبان UI، حالت تاریک، پخش‌کننده، lightbox و انتخاب‌گر شمسی در حیطه فرانت‌اند قرار دارند. بک‌اند، داده و سطح دسترسی مربوط به آن‌ها را فراهم می‌کند. جایگزین‌کردن محتوای نمونه و نشانی سامانه‌های واقعی از API مدیریت انجام می‌شود.
