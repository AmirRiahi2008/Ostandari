export const adminExtraPages: Record<
  string,
  { title: string; resource: string; defaults: Record<string, string> }
> = {
  '/admin/announcements': {
    title: 'مدیریت اطلاعیه‌ها',
    resource: 'contents',
    defaults: { type: 'announcement' },
  },
  '/admin/resolutions': {
    title: 'مدیریت مصوبات',
    resource: 'contents',
    defaults: { type: 'resolution' },
  },
  '/admin/documents': {
    title: 'اسناد و قوانین',
    resource: 'contents',
    defaults: { type: 'document' },
  },
  '/admin/tenders': {
    title: 'مناقصه‌ها و مزایده‌ها',
    resource: 'contents',
    defaults: { type: 'tender' },
  },
  '/admin/contracts': {
    title: 'مدیریت قراردادها',
    resource: 'contents',
    defaults: { type: 'contract' },
  },
  '/admin/events': { title: 'مدیریت رویدادها', resource: 'contents', defaults: { type: 'event' } },
  '/admin/duties': { title: 'مدیریت شرح وظایف', resource: 'contents', defaults: { type: 'duty' } },

  '/admin/news': { title: 'مدیریت اخبار', resource: 'contents', defaults: { type: 'news' } },
  '/admin/pages': { title: 'صفحات داخلی', resource: 'contents', defaults: { type: 'page' } },
  '/admin/counties': { title: 'مدیریت فرمانداری‌ها', resource: 'counties', defaults: {} },
  '/admin/services': { title: 'مدیریت خدمات', resource: 'services', defaults: {} },
  '/admin/galleries': { title: 'مدیریت گالری‌ها', resource: 'galleries', defaults: {} },
  '/admin/gallery-items': { title: 'تصاویر گالری', resource: 'gallery-items', defaults: {} },
  '/admin/poll-options': { title: 'گزینه‌های نظرسنجی', resource: 'poll-options', defaults: {} },
};
