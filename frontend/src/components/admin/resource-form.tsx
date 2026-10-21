import { AdminImageField, imageFields } from './image-field';
import {
  adminFieldLabel,
  adminFieldPlaceholder,
  adminFieldHelp,
  adminFieldIncluded,
  adminFieldAdvanced,
} from '@/data/admin/form-layout';
import schemas from '@/data/admin/resource-schema.json';
import { lookupResource, resourceScope } from '@/features/admin/resources';

type FieldRules = Record<string, string[]>;
export const fieldLabels: Record<string, string> = {
  name: 'نام',
  title: 'عنوان',
  body: 'متن کامل',
  description: 'توضیحات',
  question: 'پرسش',
  answer: 'پاسخ',
  position: 'سمت',
  bio: 'معرفی کوتاه',
  slug: 'شناسه در نشانی',
  type: 'نوع',
  kind: 'گروه',
  locale: 'زبان',
  priority: 'ترتیب نمایش',
  is_active: 'فعال',
  is_current: 'مسئول فعلی',
  organization_id: 'واحد سازمانی',
  county_id: 'شهرستان',
  parent_id: 'والد',
  category_id: 'گروه‌بندی',
  role_id: 'نقش کاربری',
  menu_id: 'منو',
  media_id: 'تصویر',
  banner_media_id: 'بنر بالای پورتال فرمانداری',
  aerial_media_id: 'تصویر هوایی شهرستان',
  cover_media_id: 'تصویر شاخص',
  gallery_id: 'گالری',
  content_id: 'صفحه یا خبر مرتبط',
  poll_id: 'نظرسنجی',
  status: 'وضعیت',
  subtitle: 'عنوان فرعی',
  excerpt: 'خلاصه',
  url: 'نشانی پیوند',
  target: 'نحوهٔ باز شدن',
  icon: 'آیکن',
  key: 'کلید',
  email: 'ایمیل',
  phone: 'تلفن',
  fax: 'فکس',
  address: 'نشانی',
  username: 'نام کاربری',
  password: 'رمز عبور',
  mobile: 'شماره همراه',
  national_code: 'کد ملی',
  person_type: 'نوع کاربر',
  access_scope: 'محدودهٔ دسترسی',
  permissions: 'دسترسی‌ها',
  label: 'عنوان نمایشی',
  starts_at: 'تاریخ شروع',
  ends_at: 'تاریخ پایان',
  published_at: 'زمان انتشار',
  expires_at: 'زمان پایان انتشار',
  term_start: 'شروع مسئولیت',
  term_end: 'پایان مسئولیت',
  comments_enabled: 'ارسال نظر فعال باشد',
  is_featured: 'ویژه',
  caption: 'شرح تصویر',
  requirements: 'مدارک موردنیاز',
  steps: 'مراحل انجام',
  delivery_time: 'زمان ارائهٔ خدمت',
  cost: 'هزینه',
  target_audience: 'مخاطبان',
  fields_schema: 'فیلدهای فرم',
  settings: 'تنظیمات',
  reply: 'متن پاسخ',
  note: 'توضیح تغییر وضعیت',
  urgency: 'اولویت رسیدگی',
  metadata: 'اطلاعات تکمیلی',
  seo_title: 'عنوان موتور جستجو',
  seo_description: 'توضیحات موتور جستجو',
  code: 'کد خدمت',
  opens_at: 'زمان باز شدن فرم',
  closes_at: 'مهلت فرم',
  visibility: 'سطح انتشار فایل',
  assigned_to: 'کارشناس رسیدگی',
  message: 'متن پیام',
  fields: 'فیلدهای فرم',
  author: 'گوینده',
  text: 'متن سخن',
  personnel_code: 'کد پرسنلی',
  tag_ids: 'برچسب‌ها',
  media_ids: 'پیوست‌های عمومی',
  map_key: 'شناسهٔ شهرستان در نقشه',
  latitude: 'عرض جغرافیایی',
  longitude: 'طول جغرافیایی',
  video_url: 'نشانی ویدیو',
  name_en: 'نام انگلیسی',
  domain: 'دامنه',
  sms_number: 'شمارهٔ پیامک',
};
const labels: Record<string, string> = {
  fa: 'فارسی',
  en: 'انگلیسی',
  ar: 'عربی',
  draft: 'پیش‌نویس',
  published: 'منتشرشده',
  archived: 'بایگانی',
  pending: 'در انتظار',
  review: 'در حال بررسی',
  referred: 'ارجاع‌شده',
  resolved: 'پاسخ داده‌شده',
  closed: 'بسته‌شده',
  accepted: 'پذیرفته‌شده',
  rejected: 'ردشده',
  approved: 'تأییدشده',
  active: 'فعال',
  manager: 'مدیر',
  governor: 'استاندار',
  county_governor: 'فرماندار',
  advisor: 'مشاور',
  district_head: 'بخشدار',
  village_head: 'دهیار',
  governorate: 'استانداری',
  county: 'فرمانداری',
  district: 'بخشداری',
  village: 'دهیاری',
  department: 'اداره یا سازمان',
  _self: 'همین صفحه',
  _blank: 'پنجرهٔ جدید',
  useful: 'پیوندهای مفید',
  footer: 'پاورقی',
  banner: 'بنر',
  quick: 'دسترسی سریع',
  all: 'همهٔ واحدها',
  organization: 'واحد سازمانی',
  subtree: 'واحد و زیرمجموعه',
  citizen: 'شهروند',
  staff: 'کارمند',
  employee: 'کارمند',
  expert: 'کارشناس',
  low: 'کم',
  medium: 'متوسط',
  high: 'زیاد',
  urgent: 'فوری',
  news: 'خبر',
  announcement: 'اطلاعیه',
  resolution: 'مصوبه',
  page: 'صفحه',
  publication: 'انتشار',
  tender: 'مناقصه',
  contract: 'قرارداد',
  call: 'فراخوان',
  event: 'رویداد',
  duty: 'شرح وظایف',
  document: 'سند',
};
const extra: Record<string, FieldRules> = {
  users: {
    name: ['required', 'string', 'max:120'],
    username: ['nullable', 'string'],
    email: ['nullable', 'email'],
    mobile: ['nullable', 'string'],
    national_code: ['nullable', 'string'],
    password: ['nullable', 'string'],
    role_id: ['required', 'exists:roles,id'],
    organization_id: ['nullable', 'exists:organizations,id'],
    personnel_code: ['nullable', 'string', 'max:60'],
    person_type: ['required', 'in:"staff","citizen","employee","expert"'],
    access_scope: ['required', 'in:"organization","all"'],
    is_active: ['boolean'],
  },
  roles: {
    name: ['required', 'string'],
    label: ['required', 'string'],
    permissions: ['required', 'array'],
  },
  tickets: {
    status: ['required', 'in:"pending","review","referred","resolved","rejected","closed"'],
    organization_id: ['required', 'exists:organizations,id'],
    assigned_to: ['nullable', 'exists:users,id'],
    urgency: ['in:"low","medium","high","urgent"'],
    note: ['nullable', 'string', 'max:4000'],
    reply: ['nullable', 'string', 'max:20000'],
  },
  submissions: {
    status: ['required', 'in:"pending","review","accepted","rejected"'],
    reply: ['nullable', 'string', 'max:10000'],
  },
  subscribers: { is_active: ['boolean'] },
  settings: { settings: ['required', 'array'] },
  'moderation/comments': {
    status: ['required', 'in:"pending","approved","rejected"'],
    reply: ['nullable', 'string', 'max:5000'],
  },
  'moderation/forum-topics': {
    status: ['required', 'in:"pending","approved","rejected","closed"'],
  },
  'moderation/forum-replies': { status: ['required', 'in:"pending","approved","rejected"'] },
};
export function resourceFields(resource: string): FieldRules {
  return (
    extra[resource] ?? (schemas as Record<string, { fields: FieldRules }>)[resource]?.fields ?? {}
  );
}
export function AdminResourceForm({
  resource,
  defaults = {},
  formId,
  path,
  mode = 'create',
}: {
  resource: string;
  defaults?: Record<string, string>;
  formId?: string;
  path?: string;
  mode?: 'create' | 'edit';
}) {
  const fields = resourceFields(resource);
  const initialValues = { ...resourceScope(resource), ...defaults };
  const visible = Object.entries(fields)
    .filter(([field]) => adminFieldIncluded(resource, field, defaults, path))
    .sort(([a], [b]) => Number(imageFields.includes(b)) - Number(imageFields.includes(a)));
  const slide = ['slides', 'advertisements'].includes(resource);
  const slideExtra = (field: string) => slide && ['title', 'url', 'content_id'].includes(field);
  const renderField = ([field, rules]: [string, string[]]) => {
    const label = adminFieldLabel(resource, field, fieldLabels[field] ?? field);
    const help = adminFieldHelp(resource, field, mode === 'edit');
    if (initialValues[field] && ['type', 'kind', 'person_type'].includes(field))
      return (
        <input
          key={field}
          type="hidden"
          name={field}
          data-field={field}
          defaultValue={initialValues[field]}
        />
      );
    const id = 'editor-' + resource.replaceAll('/', '-') + '-' + field;
    const required = rules.includes('required');
    if (imageFields.includes(field))
      return (
        <AdminImageField
          key={field}
          field={field}
          id={id}
          label={label}
          help={help}
          required={required}
        />
      );
    const json = rules.includes('array');
    const list = ['requirements', 'steps'].includes(field);
    const multipleLookup = field === 'tag_ids' ? 'tags' : field === 'media_ids' ? 'media' : '';
    const flag = rules.includes('boolean');
    const options = rules
      .find((rule) => rule.startsWith('in:'))
      ?.slice(3)
      .split(',')
      .map((value) => value.replace(/^"|"$/g, ''));
    const lookup = rules
      .find((rule) => rule.startsWith('exists:'))
      ?.split(':')[1]
      .split(',')[0];
    const numeric = rules.includes('integer');
    const long = [
      'body',
      'bio',
      'description',
      'excerpt',
      'answer',
      'note',
      'reply',
      'question',
      'seo_description',
    ].includes(field);
    const initial =
      initialValues[field] ??
      (field === 'locale' ? 'fa' : field === 'status' ? 'draft' : undefined);
    const max = Number(rules.find((rule) => rule.startsWith('max:'))?.split(':')[1]);
    const date = rules.includes('date');
    return (
      <div
        className={'portal-resource-field' + (long || json ? ' portal-resource-wide' : '')}
        key={field}
      >
        {flag ? (
          <label className="portal-choice">
            <input
              id={id}
              type="checkbox"
              name={field}
              data-field={field}
              defaultChecked={
                field === 'is_active' ||
                field === 'comments_enabled' ||
                (field === 'is_current' && ['governor', 'county_governor'].includes(defaults.kind))
              }
            />
            {label}
            {help && <small className="portal-field-help">{help}</small>}
          </label>
        ) : (
          <>
            <label htmlFor={id}>
              {label}
              <span className="portal-field-requirement">{required ? 'الزامی' : 'اختیاری'}</span>
            </label>
            {multipleLookup ? (
              <select
                id={id}
                name={field}
                data-field={field}
                data-lookup={multipleLookup}
                multiple
                aria-describedby={id + '-help'}
              />
            ) : json ? (
              <textarea
                id={id}
                name={field}
                data-field={field}
                data-json={list ? undefined : 'true'}
                data-lines={list ? 'true' : undefined}
                data-form-builder={field === 'fields' ? 'true' : undefined}
                data-permissions={field === 'permissions' ? 'true' : undefined}
                required={required}
                rows={5}
                dir={list ? 'rtl' : 'ltr'}
                placeholder={
                  list
                    ? 'هر مورد در یک خط جداگانه'
                    : field === 'permissions'
                      ? '["content.manage"]'
                      : '[]'
                }
              />
            ) : options ? (
              <select
                id={id}
                name={field}
                data-field={field}
                required={required}
                disabled={
                  Boolean(initialValues[field]) && ['type', 'kind', 'person_type'].includes(field)
                }
                defaultValue={initial ?? options[0]}
              >
                {options.map((value) => (
                  <option key={value} value={value}>
                    {labels[value] ?? value}
                  </option>
                ))}
              </select>
            ) : lookup ? (
              <select
                id={id}
                name={field}
                data-field={field}
                data-lookup={lookupResource(lookup)}
                required={required}
              >
                <option value="">انتخاب کنید</option>
              </select>
            ) : long ? (
              <textarea
                id={id}
                name={field}
                data-field={field}
                rows={field === 'body' ? 8 : 4}
                required={required}
                maxLength={max || undefined}
                data-rich-text={
                  ['body', 'bio', 'description', 'answer'].includes(field) ? 'true' : undefined
                }
              />
            ) : (
              <input
                id={id}
                name={field}
                data-field={field}
                type={
                  field === 'password'
                    ? 'password'
                    : field === 'email'
                      ? 'email'
                      : date
                        ? 'datetime-local'
                        : numeric
                          ? 'number'
                          : 'text'
                }
                placeholder={adminFieldPlaceholder(resource, field)}
                defaultValue={initial ?? (numeric ? '0' : undefined)}
                required={field === 'password' ? mode === 'create' : required}
                minLength={field === 'password' ? 12 : undefined}
                autoComplete={field === 'password' ? 'new-password' : undefined}
                maxLength={!numeric && !date ? max || undefined : undefined}
                min={numeric ? 0 : undefined}
                dir={
                  date ||
                  numeric ||
                  ['url', 'slug', 'username', 'email', 'mobile', 'phone'].includes(field)
                    ? 'ltr'
                    : undefined
                }
              />
            )}
            {help && <small className="portal-field-help">{help}</small>}
            {multipleLookup && (
              <small id={id + '-help'}>
                برای انتخاب چند مورد، کلید Ctrl یا Command را نگه دارید.
              </small>
            )}
            {json && !list && !multipleLookup && (
              <small>
                {field === 'fields_schema'
                  ? 'تعریف فیلدهای فرم به صورت آرایهٔ JSON'
                  : 'مقدار را به صورت JSON وارد کنید.'}
              </small>
            )}
          </>
        )}
      </div>
    );
  };
  return (
    <form
      id={formId}
      className="cbn-flex-form portal-resource-form"
      data-form="true"
      data-resource={resource}
    >
      {slide && (
        <p className="portal-resource-wide portal-admin-help">
          برای اسلایدِ بدون نوشته، فقط عکس را انتخاب کنید و ذخیره را بزنید. عنوان، متن و پیوند لازم
          نیست.
        </p>
      )}
      {resource === 'media' && (
        <label className="portal-resource-field portal-resource-wide">
          انتخاب فایل
          <input
            type="file"
            required
            accept={
              path === '/admin/images'
                ? 'image/jpeg,image/png,image/webp'
                : 'image/jpeg,image/png,image/webp,.pdf,.docx,.xlsx,.mp4,.mp3,.txt'
            }
          />
          <small>
            تصاویر به WebP تبدیل می‌شوند؛ حداکثر ۴ مگابایت. فایل در کتابخانهٔ عمومی سایت ذخیره
            می‌شود.
          </small>
        </label>
      )}
      {visible
        .filter(([field, rules]) => !slideExtra(field) && !adminFieldAdvanced(field, rules))
        .map(renderField)}
      {visible.some(([field, rules]) => !slideExtra(field) && adminFieldAdvanced(field, rules)) && (
        <details className="portal-form-additional">
          <summary>تنظیمات بیشتر (اختیاری)</summary>
          <p>این گزینه‌ها را فقط در صورت نیاز تغییر دهید.</p>
          <div className="portal-form-additional-fields">
            {visible
              .filter(([field, rules]) => !slideExtra(field) && adminFieldAdvanced(field, rules))
              .map(renderField)}
          </div>
        </details>
      )}
      {slide && (
        <details className="portal-form-additional">
          <summary>عنوان و پیوند اسلاید (اختیاری)</summary>
          <p>
            اگر اسلاید باید به صفحه‌ای باز شود، پیوند آن را وارد کنید؛ در غیر این صورت، این بخش را
            خالی بگذارید.
          </p>
          <div className="portal-form-additional-fields">
            {visible.filter(([field]) => slideExtra(field)).map(renderField)}
          </div>
        </details>
      )}
    </form>
  );
}
