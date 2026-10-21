type Column = { key: string; label: string };
const column = (key: string, label: string): Column => ({ key, label });
export function adminListColumns(
  resource: string,
  defaults: Record<string, string> = {},
): Column[] {
  let fields: Column[];
  if (
    [
      'contents',
      'news',
      'announcements',
      'resolutions',
      'pages',
      'publications',
      'tenders',
      'contracts',
      'calls',
      'events',
      'duties',
      'documents',
    ].includes(resource)
  )
    fields = [
      column('title', 'عنوان مطلب'),
      column('status', 'وضعیت انتشار'),
      column('published_at', 'زمان انتشار'),
    ];
  else
    fields = (
      {
        categories: [
          column('name', 'نام گروه'),
          column('priority', 'ترتیب نمایش'),
          column('is_active', 'وضعیت'),
        ],
        tags: [column('name', 'نام برچسب'), column('slug', 'نشانی برچسب')],
        counties: [
          column('name', 'نام شهرستان'),
          column('slug', 'شناسهٔ شهرستان'),
          column('is_active', 'وضعیت'),
        ],
        organizations: [
          column('name', 'نام واحد سازمانی'),
          column('phone', 'شماره تماس'),
          column('is_active', 'وضعیت'),
        ],
        menus: [
          column('name', 'نام منو'),
          column('key', 'شناسهٔ نمایش'),
          column('is_active', 'وضعیت'),
        ],
        'menu-items': [
          column('title', 'عنوان گزینه'),
          column('url', 'نشانی پیوند'),
          column('priority', 'ترتیب نمایش'),
          column('is_active', 'وضعیت'),
        ],
        slides: [
          column('image', 'تصویر'),
          column('title', 'عنوان اسلاید'),
          column('is_active', 'وضعیت'),
        ],
        advertisements: [
          column('image', 'تصویر'),
          column('title', 'عنوان بنر'),
          column('is_active', 'وضعیت'),
        ],
        members: [
          column('image', 'تصویر'),
          column('name', 'نام و نام خانوادگی'),
          column('position', 'سمت سازمانی'),
          ...(['governor', 'county_governor'].includes(defaults.kind)
            ? [column('is_current', 'مسئول فعلی')]
            : []),
          column('is_active', 'وضعیت'),
        ],
        services: [
          column('name', 'نام خدمت'),
          column('code', 'کد خدمت'),
          column('is_active', 'وضعیت'),
        ],
        links: [
          column('title', 'عنوان پیوند'),
          column('url', 'نشانی پیوند'),
          column('is_active', 'وضعیت'),
        ],
        faqs: [column('question', 'پرسش'), column('is_active', 'وضعیت')],
        quotes: [
          column('author', 'گوینده'),
          column('text', 'متن سخن'),
          column('is_active', 'وضعیت'),
        ],
        galleries: [
          column('title', 'عنوان گالری'),
          column('status', 'وضعیت انتشار'),
          column('published_at', 'زمان انتشار'),
        ],
        'gallery-items': [
          column('image', 'تصویر'),
          column('title', 'عنوان تصویر'),
          column('priority', 'ترتیب نمایش'),
        ],
        polls: [
          column('question', 'پرسش نظرسنجی'),
          column('status', 'وضعیت'),
          column('ends_at', 'پایان نظرسنجی'),
        ],
        'poll-options': [column('title', 'متن گزینه'), column('priority', 'ترتیب نمایش')],
        forms: [
          column('title', 'عنوان فرم'),
          column('is_active', 'وضعیت'),
          column('closes_at', 'مهلت ارسال'),
        ],
        users: [
          column('name', 'نام و نام خانوادگی'),
          column('username', 'نام کاربری'),
          column('is_active', 'وضعیت'),
        ],
        roles: [column('label', 'عنوان نقش'), column('name', 'شناسهٔ نقش')],
        media: [
          column('image', 'پیش‌نمایش'),
          column('name', 'نام فایل'),
          column('mime', 'نوع فایل'),
          column('size', 'حجم به بایت'),
        ],
        tickets: [
          column('reference', 'کد پیگیری'),
          column('subject', 'موضوع پیام'),
          column('status', 'وضعیت'),
          column('created_at', 'تاریخ ثبت'),
        ],
        submissions: [
          column('reference', 'کد پیگیری'),
          column('_form_title', 'عنوان فرم'),
          column('status', 'وضعیت'),
          column('created_at', 'تاریخ ثبت'),
        ],
        subscribers: [
          column('email', 'ایمیل عضو'),
          column('is_active', 'وضعیت عضویت'),
          column('created_at', 'تاریخ عضویت'),
        ],
        'moderation/comments': [
          column('body', 'متن نظر'),
          column('status', 'وضعیت'),
          column('created_at', 'تاریخ ثبت'),
        ],
        'moderation/forum-topics': [
          column('title', 'عنوان موضوع'),
          column('status', 'وضعیت'),
          column('created_at', 'تاریخ ثبت'),
        ],
        'moderation/forum-replies': [
          column('body', 'متن پاسخ'),
          column('status', 'وضعیت'),
          column('created_at', 'تاریخ ثبت'),
        ],
        settings: [column('key', 'نام تنظیم')],
      } as Record<string, Column[]>
    )[resource] ?? [column('title', 'عنوان')];
  return [column('_index', 'ردیف'), ...fields, column('_actions', 'عملیات')];
}
