const advanced = new Set([
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
    return 'بنر اختصاصی همین فرمانداری را از کتابخانهٔ تصاویر انتخاب کنید؛ نسبت پیشنهادی ۱۳۸۰ در ۱۸۰.';
  if (field === 'aerial_media_id')
    return 'تصویر هوایی همین شهرستان را از کتابخانهٔ تصاویر انتخاب کنید؛ عکس شهر دیگر انتخاب نشود.';
  if (field === 'slug') return 'اختیاری؛ اگر خالی باشد، نشانی از روی عنوان ساخته می‌شود.';
  if (field === 'priority') return 'عدد کوچک‌تر، بالاتر نمایش داده می‌شود.';
  if (field === 'password')
    return editing
      ? 'برای حفظ رمز فعلی، خالی بگذارید. رمز جدید حداقل ۱۲ نویسه با حروف بزرگ و کوچک انگلیسی و عدد باشد.'
      : 'حداقل ۱۲ نویسه، شامل حروف بزرگ و کوچک انگلیسی و عدد.';
  if (field === 'key' && resource === 'menus')
    return 'برای منوی اصلی main و برای فوتر footer؛ شناسهٔ منوی موجود را بدون نیاز تغییر ندهید.';
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
