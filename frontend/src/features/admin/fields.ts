import { all, digits } from '@/lib/dom';
import type { RecordData } from '@/types/portal';

const numbers = new Set([
  'priority',
  'parent_id',
  'category_id',
  'organization_id',
  'county_id',
  'menu_id',
  'media_id',
  'cover_media_id',
  'role_id',
]);

export function collectFields(root: ParentNode): RecordData {
  const record: RecordData = {};
  for (const input of all<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
    root,
    '[data-field]',
  )) {
    const key = input.dataset.field;
    if (
      !key ||
      (input instanceof HTMLInputElement &&
        ['file', 'radio'].includes(input.type) &&
        !input.checked)
    )
      continue;
    if (input instanceof HTMLInputElement && input.type === 'file') continue;
    if (input instanceof HTMLInputElement && input.type === 'checkbox') {
      record[key] = input.checked;
      continue;
    }
    const raw =
      'value' in input
        ? key === 'password'
          ? input.value
          : input.value.trim()
        : (input as HTMLElement).innerHTML;
    if (raw === '' && ['password', 'password_confirmation'].includes(key)) continue;
    if (input.dataset.json) {
      if (!raw) {
        record[key] = [];
        continue;
      }
      try {
        record[key] = JSON.parse(raw);
      } catch {
        throw new Error('مقدار ' + key + ' باید JSON معتبر باشد.');
      }
    } else
      record[key] =
        numbers.has(key) || key.endsWith('_id') ? (raw === '' ? null : Number(digits(raw))) : raw;
  }
  return record;
}

export function fillFields(root: ParentNode, record: RecordData): void {
  for (const input of all<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
    root,
    '[data-field]',
  )) {
    const value = record[input.dataset.field ?? ''];
    if (input instanceof HTMLInputElement && input.type === 'file') {
      input.value = '';
      continue;
    }
    if (input instanceof HTMLInputElement && input.type === 'checkbox')
      input.checked = value === undefined ? input.defaultChecked : Boolean(value);
    else if ('value' in input) {
      if (input.dataset.json)
        input.value = value === undefined || value === null ? '' : JSON.stringify(value, null, 2);
      else if (input instanceof HTMLInputElement && input.type === 'datetime-local' && value) {
        const date = new Date(String(value));
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        input.value = Number.isNaN(date.valueOf()) ? '' : date.toISOString().slice(0, 16);
      } else if (input instanceof HTMLSelectElement && value === undefined)
        input.value = input.options[0]?.value ?? '';
      else input.value = value === null || value === undefined ? '' : String(value);
    }
  }
}

export function fieldForColumn(label: string): string {
  const mapping: [string[], string][] = [
    [['ردیف'], '_index'],
    [['عملیات'], '_actions'],
    [['غیرفعال'], '_inactive'],
    [['نمایش', 'فعال'], 'is_active'],
    [['شناسه', 'کد'], 'id'],
    [['زبان'], 'locale'],
    [['اولویت', 'ترتیب'], 'priority'],
    [['پدر'], 'parent_id'],
    [['عنوان اصلی'], 'title'],
    [['عنوان فرعی'], 'subtitle'],
    [['سوال', 'سؤال'], 'question'],
    [['جواب', 'پاسخ'], 'answer'],
    [['نام کاربری'], 'username'],
    [['همراه', 'موبایل'], 'mobile'],
    [['ایمیل'], 'email'],
    [['فکس'], 'fax'],
    [['تلفن'], 'phone'],
    [['آدرس'], 'address'],
    [['تاریخ'], 'created_at'],
    [['تصویر', 'عکس'], 'image'],
    [['سمت'], 'position'],
    [['نام خانوادگی'], 'name'],
    [['موضوع'], 'subject'],
    [['وضعیت'], 'status'],
    [['نام'], 'name'],
    [['عنوان'], 'title'],
    [['لینک'], 'url'],
    [['متن'], 'body'],
  ];
  return mapping.find(([words]) => words.some((word) => label.includes(word)))?.[1] ?? '';
}
