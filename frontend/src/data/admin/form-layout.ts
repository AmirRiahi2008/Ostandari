const advanced = new Set([
  'subtitle',
  'locale',
  'slug',
  'priority',
  'organization_id',
  'name_en',
  'domain',
  'map_key',
  'latitude',
  'longitude',
  'video_url',
  'icon',
  'content_id',
  'target',
  'expires_at',
  'starts_at',
  'ends_at',
  'term_start',
  'term_end',
  'parent_id',
  'tag_ids',
  'media_ids',
  'personnel_code',
  'access_scope',
]);
export function adminFieldLabel(resource: string, field: string, fallback: string): string {
  if (field === 'subtitle') return 'یک جملهٔ کوتاه زیر عنوان';
  if (field === 'title' && ['slides', 'advertisements'].includes(resource))
    return 'عنوان اختیاری اسلاید';
  if (field === 'excerpt') return 'خلاصهٔ متن برای فهرست سایت';
  if (field === 'body') return 'متن کامل صفحه یا خبر';
  if (field === 'media_id') return resource === 'members' ? 'عکس این شخص' : 'تصویر';
  if (field === 'cover_media_id') return 'تصویر شاخص خبر یا صفحه';
  if (field === 'parent_id')
    return resource === 'organizations'
      ? 'واحد سازمانی بالادست'
      : resource === 'menu-items'
        ? 'گزینهٔ بالاتر در منو'
        : 'گروه یا مورد بالاتر';
  if (field === 'name' && ['users', 'members'].includes(resource)) return 'نام و نام خانوادگی';
  if (field === 'position' && resource === 'members') return 'سمت سازمانی';
  if (field === 'category_id' && resource === 'members') return 'گروه مدیران و اعضا';
  if (field === 'key' && resource === 'menus') return 'شناسهٔ محل نمایش منو';
  if (field === 'name' && resource === 'roles') return 'شناسهٔ نقش (انگلیسی)';
  return fallback;
}
export function adminFieldHelp(
  resource: string,
  field: string,
  editing: boolean,
): string | undefined {
  if (field === 'banner_media_id')
    return 'بنر بالای پرتال همین فرمانداری؛ عکس را همین‌جا بارگذاری کنید یا از تصاویر قبلی انتخاب کنید. نسبت پیشنهادی ۱۳۸۰ در ۱۸۰ است.';
  if (field === 'aerial_media_id')
    return 'عکس هوایی یا نمای کلی همین شهرستان در صفحهٔ فرمانداری نمایش داده می‌شود. امکان بارگذاری مستقیم در همین فرم وجود دارد.';
  if (field === 'title' && ['slides', 'advertisements'].includes(resource))
    return 'اختیاری؛ برای شناسایی اسلاید در مدیریت و توضیح تصویر است و روی عکس نوشته نمی‌شود. برای نمایش فقط عکس، خالی بگذارید.';
  if (field === 'subtitle')
    return 'اختیاری؛ جمله‌ای کوتاه برای توضیح عنوان، مثلاً «جزئیات برنامهٔ ملاقات مردمی این هفته». با متن اصلی صفحه فرق دارد.';
  if (field === 'media_id')
    return resource === 'members'
      ? 'عکس استاندار، فرماندار یا همین شخص؛ در کارت معرفی او نمایش داده می‌شود.'
      : 'تصویر را همین‌جا بارگذاری کنید. رفتن به کتابخانه لازم نیست.';
  if (field === 'cover_media_id')
    return 'عکسی که کنار عنوان در فهرست و بالای صفحهٔ خبر یا محتوا نمایش داده می‌شود.';
  if (field === 'excerpt')
    return 'دو یا سه جمله برای معرفی خبر در فهرست؛ متن کامل را در قسمت متن اصلی بنویسید.';
  if (field === 'body')
    return 'متن اصلی که بازدیدکننده در صفحه می‌خواند. از ابزار ویرایشگر برای درج عکس، جدول و پیوند استفاده کنید.';
  if (field === 'url')
    return resource === 'menu-items'
      ? 'نشانی کامل مثل https://example.ir یا مسیر داخل سایت مثل /news.'
      : 'نشانی کامل صفحه مثل https://example.ir/news را وارد کنید. در اسلاید بدون پیوند، خالی بگذارید؛ برای خبر داخلی می‌توانید صفحهٔ مرتبط را انتخاب کنید.';
  if (field === 'content_id')
    return 'اختیاری؛ به‌جای وارد کردن نشانی، یک خبر یا صفحهٔ موجود سایت را به این مورد وصل کنید.';
  if (field === 'is_active')
    return 'با فعال بودن این گزینه، مورد در بخش مربوط سایت قابل نمایش است؛ تاریخ انتشار و دسترسی‌ها هم باید معتبر باشند.';
  if (field === 'comments_enabled')
    return 'اجازهٔ ارسال نظر برای این محتوا؛ نظرها طبق روند بررسی سایت منتشر می‌شوند.';
  if (field === 'is_featured') return 'این خبر در جایگاه خبرهای ویژه هم نمایش داده شود.';
  if (field === 'is_current')
    return 'برای مسئول کنونی انتخاب شود. در هر سازمان فقط یک مسئول فعلی فعال مجاز است.';
  if (field === 'category_id')
    return 'گروه مرتبط با همین بخش را انتخاب کنید؛ برای مرتب کردن موارد مشابه است.';
  if (field === 'parent_id')
    return 'اختیاری؛ اگر مورد زیرمجموعهٔ گزینه یا گروه دیگری است، آن را انتخاب کنید. برای مورد مستقل خالی بگذارید.';
  if (field === 'locale') return 'زبان محتوای این مورد؛ برای صفحات فارسی، فارسی را نگه دارید.';
  if (field === 'starts_at' || field === 'opens_at')
    return 'اختیاری؛ از این تاریخ و ساعت به بعد در دسترس باشد. زمان بر اساس تنظیمات سایت است.';
  if (field === 'ends_at' || field === 'expires_at' || field === 'closes_at')
    return 'اختیاری؛ پس از این زمان نمایش یا دریافت درخواست متوقف شود. باید بعد از زمان شروع باشد.';
  if (field === 'requirements')
    return 'هر مدرک لازم را در یک خط جدا بنویسید؛ مثل کارت ملی یا فرم تکمیل‌شده.';
  if (field === 'steps')
    return 'هر مرحلهٔ دریافت خدمت را به ترتیب در یک خط بنویسید؛ مثل ثبت درخواست و بررسی مدارک.';
  if (field === 'target_audience')
    return 'این خدمت برای چه کسانی است؟ مثلاً شهروندان استان یا متقاضیان مجوز.';
  if (field === 'delivery_time') return 'زمان تقریبی انجام کار؛ مثلاً سه روز کاری.';
  if (field === 'cost') return 'مبلغ و واحد هزینه یا عبارت «رایگان» را بنویسید.';
  if (field === 'role_id')
    return 'نقش، امکانات مجاز این حساب را تعیین می‌کند؛ فقط دسترسی لازم را بدهید.';
  if (field === 'status')
    return ['tickets', 'submissions'].includes(resource) || resource.startsWith('moderation/')
      ? 'مرحلهٔ بررسی این درخواست یا پیام را انتخاب کنید.'
      : 'پیش‌نویس برای آماده‌سازی است. منتشرشده با رعایت زمان انتشار در سایت دیده می‌شود.';
  if (field === 'slug') return 'اختیاری؛ اگر خالی باشد، نشانی از روی عنوان ساخته می‌شود.';
  if (field === 'priority') return 'عدد کوچک‌تر، بالاتر نمایش داده می‌شود.';
  if (field === 'password')
    return editing
      ? 'برای حفظ رمز فعلی، خالی بگذارید. رمز جدید حداقل ۱۲ نویسه با حروف بزرگ و کوچک انگلیسی و عدد باشد.'
      : 'حداقل ۱۲ نویسه، شامل حروف بزرگ و کوچک انگلیسی و عدد.';
  if (field === 'key' && resource === 'menus')
    return 'برای منوی اصلی official-main و برای فوتر footer؛ شناسهٔ منوی موجود را بدون نیاز تغییر ندهید.';
  if (field === 'organization_id')
    return 'برای ثبت در پرتال فرمانداری، واحد سازمانی همان فرمانداری را انتخاب کنید.';
  if (field === 'published_at')
    return 'برای انتشار زمان‌بندی‌شده، تاریخ آینده را همراه وضعیت منتشرشده انتخاب کنید.';
}
export function adminFieldIncluded(
  resource: string,
  field: string,
  defaults: Record<string, string>,
  path = '',
): boolean {
  if (field === 'subtitle' && ['slides', 'advertisements'].includes(resource)) return false;
  if (field.includes('.') || field === 'metadata') return false;
  if (
    resource === 'members' &&
    ['manager', 'advisor'].includes(defaults.kind) &&
    ['is_current', 'term_start', 'term_end'].includes(field)
  )
    return false;
  if (
    path === '/admin/organization-contact' &&
    !['name', 'email', 'phone', 'fax', 'sms_number', 'address'].includes(field)
  )
    return false;
  return true;
}
export function adminFieldAdvanced(field: string, rules: string[]): boolean {
  return advanced.has(field) && !rules.includes('required');
}

export function adminFieldPlaceholder(resource: string, field: string): string | undefined {
  if (field === 'title' && ['slides', 'advertisements'].includes(resource))
    return 'می‌توانید خالی بگذارید';
  if (field === 'subtitle') return 'مثلاً: جزئیات برنامهٔ ملاقات مردمی این هفته';
  if (field === 'url')
    return resource === 'menu-items' ? 'https://example.ir یا /news' : 'https://example.ir/news';
  if (field === 'excerpt') return 'خلاصه‌ای کوتاه برای معرفی این مطلب…';
  if (field === 'priority') return '۰';
}
