import { templates } from '@/lib/templates';
import schemas from './resource-schema.json';
import { adminExtraPages } from './extra-pages';
import { adminUtilityTitles } from './utility-pages';
import { adminSectionFor, reviewResource } from './sections';

const names: Record<string, string> = {
  '/admin/menu-items': 'آیتم‌های منو',
  '/admin/menu-groups': 'گروه‌های منو',
  '/admin/slide-groups': 'گروه‌های اسلایدشو',
  '/admin/slides': 'اسلایدهای صفحهٔ اصلی',
  '/admin/member-groups': 'گروه‌های اعضا',
  '/admin/members': 'اعضای سازمان',
  '/admin/document-groups': 'گروه‌های اسناد',
  '/admin/service-groups': 'گروه‌های خدمات',
  '/admin/calls': 'فراخوان‌ها',
  '/admin/form-groups': 'گروه‌بندی ویژگی‌ها',
  '/admin/gallery-groups': 'گروه‌های گالری',
  '/admin/item-order': 'تنظیمات پیشرفته',
  '/admin/external-users': 'کاربران مردمی',
  '/admin/internal-users': 'کاربران مدیریتی',
  '/admin/news-groups': 'گروه‌های خبر',
  '/admin/publications': 'انتشارات',
  '/admin/forms': 'فرم‌ساز',
  '/admin/employee-list': 'فهرست کارمندان',
  '/admin/employees': 'مدیریت کارمندان',
  '/admin/experts': 'کارشناسان فرم',
  '/admin/subscribers': 'اعضای خبرنامه',
  '/admin/organizations': 'سازمان‌ها',
  '/admin/files': 'فایل‌ها',
  '/admin/images': 'تصاویر',
  '/admin/submissions': 'متقاضیان فرم‌ها',
  '/admin/media-groups': 'گروه‌های چندرسانه‌ای',
  '/admin/roles': 'نقش‌ها و دسترسی‌ها',
  '/admin/comments/pending': 'نظرات در انتظار',
  '/admin/comments/replied': 'نظرات تأییدشده',
  '/admin/polls': 'نظرسنجی‌ها',
  '/admin/governor/pending': 'پیام‌های تازه به استاندار',
  '/admin/governor/replied': 'پیام‌های پاسخ‌داده‌شده به استاندار',
  '/admin/links': 'پیوندها',
  '/admin/forum-topics': 'موضوعات تالار گفتگو',
  '/admin/faqs': 'پرسش‌های متداول',
  '/admin/quotes': 'سخن روز',
  '/admin/advertisements': 'تبلیغات و بنرها',
  '/admin/tags': 'برچسب‌های خبر',
  '/admin/forum-groups': 'گروه‌های تالار گفتگو',
  '/admin/organization-contact': 'اطلاعات تماس سازمان‌ها',
  '/admin/contact/pending': 'پیام‌های تازهٔ تماس با ما',
  '/admin/contact/replied': 'پیام‌های پاسخ‌داده‌شدهٔ تماس با ما',
  '/admin/contact/approved': 'پیام‌های در حال بررسی',
};
const specialPermissions: Record<string, string> = {
  users: 'users.manage',
  roles: 'roles.manage',
  settings: 'settings.manage',
  media: 'media.manage',
  tickets: 'tickets.manage',
  submissions: 'forms.manage',
  subscribers: 'newsletter.manage',
  'moderation/comments': 'comments.manage',
  'moderation/forum-topics': 'forum.manage',
  'moderation/forum-replies': 'forum.manage',
};
export function resourcePermission(resource: string): string {
  return (
    (schemas as Record<string, { permission: string }>)[resource]?.permission ??
    specialPermissions[resource] ??
    ''
  );
}
export const adminModules = [
  ...new Map(
    [
      ...templates
        .filter((page) => page.group === 'admin' && page.resource)
        .map((page) => ({
          path: page.path,
          title: names[page.path] ?? page.title,
          permission: resourcePermission(page.resource),
          resource: page.resource,
        })),
      ...Object.entries(adminExtraPages).map(([path, page]) => ({
        path,
        title: page.title,
        permission: resourcePermission(page.resource),
        resource: page.resource,
      })),
      ...Object.entries(adminUtilityTitles)
        .filter(([path]) => !['/admin/logout', '/admin/account'].includes(path))
        .map(([path, title]) => ({
          path,
          title,
          resource: '',
          permission:
            path === '/admin/reports'
              ? 'tickets.manage'
              : path === '/admin/settings'
                ? 'settings.manage'
                : 'audit.view',
        })),
    ].map((page) => [page.path, page]),
  ).values(),
].map((page) => ({
  ...page,
  section: adminSectionFor(page.path),
  canCreate:
    Boolean(page.resource) && !reviewResource(page.resource) && page.resource !== 'settings',
  canEdit: Boolean(page.resource) && page.resource !== 'media',
  description: !page.resource
    ? page.path === '/admin/reports'
      ? 'رسیدگی و پاسخ به گزارش‌های ثبت‌شدهٔ شهروندان'
      : 'مشاهده و مدیریت ' + page.title
    : reviewResource(page.resource)
      ? 'مشاهده، بررسی و پیگیری موارد ثبت‌شده'
      : page.resource === 'media'
        ? 'بارگذاری و مدیریت فایل‌های سایت'
        : page.resource === 'settings'
          ? 'ویرایش تنظیمات موجود سامانه'
          : 'فهرست، افزودن و ویرایش ' + page.title.replace(/^مدیریت /, ''),
}));
