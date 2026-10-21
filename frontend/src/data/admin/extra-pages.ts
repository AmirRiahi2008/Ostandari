export const adminExtraPages: Record<
  string,
  { title: string; resource: string; defaults: Record<string, string> }
> = {
  '/panel/admin/announcements': {
    title: 'مدیریت اطلاعیه‌ها',
    resource: 'contents',
    defaults: { type: 'announcement' },
  },
  '/panel/admin/resolutions': {
    title: 'مدیریت مصوبات',
    resource: 'contents',
    defaults: { type: 'resolution' },
  },
  '/panel/admin/documents': {
    title: 'اسناد و قوانین',
    resource: 'contents',
    defaults: { type: 'document' },
  },
  '/panel/admin/tenders': {
    title: 'مناقصه‌ها و مزایده‌ها',
    resource: 'contents',
    defaults: { type: 'tender' },
  },
  '/panel/admin/contracts': {
    title: 'مدیریت قراردادها',
    resource: 'contents',
    defaults: { type: 'contract' },
  },
  '/panel/admin/events': {
    title: 'مدیریت رویدادها',
    resource: 'contents',
    defaults: { type: 'event' },
  },
  '/panel/admin/duties': {
    title: 'مدیریت شرح وظایف',
    resource: 'contents',
    defaults: { type: 'duty' },
  },

  '/panel/admin/news': { title: 'مدیریت اخبار', resource: 'contents', defaults: { type: 'news' } },
  '/panel/admin/pages': { title: 'صفحات داخلی', resource: 'contents', defaults: { type: 'page' } },
  '/panel/admin/counties': { title: 'شهرستان‌ها و نقشه', resource: 'counties', defaults: {} },
  '/panel/admin/services': { title: 'مدیریت خدمات', resource: 'services', defaults: {} },
  '/panel/admin/galleries': { title: 'مدیریت گالری‌ها', resource: 'galleries', defaults: {} },
  '/panel/admin/gallery-items': { title: 'تصاویر گالری', resource: 'gallery-items', defaults: {} },
  '/panel/admin/poll-options': {
    title: 'گزینه‌های نظرسنجی',
    resource: 'poll-options',
    defaults: {},
  },
  '/panel/admin/governors': {
    title: 'استاندار فعلی و استانداران ادوار',
    resource: 'members',
    defaults: { kind: 'governor' },
  },
  '/panel/admin/county-governors': {
    title: 'مدیریت فرمانداران',
    resource: 'members',
    defaults: { kind: 'county_governor' },
  },
  '/panel/admin/advisors': {
    title: 'مدیریت مشاوران',
    resource: 'members',
    defaults: { kind: 'advisor' },
  },
  '/panel/admin/form-categories': {
    title: 'گروه‌بندی فرم‌ها',
    resource: 'categories',
    defaults: { type: 'form' },
  },
  '/panel/admin/forum-replies': {
    title: 'بررسی پاسخ‌های تالار گفتگو',
    resource: 'moderation/forum-replies',
    defaults: {},
  },
};
