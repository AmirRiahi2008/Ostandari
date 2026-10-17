import type { RecordData } from '@/types/portal';
import { sanitizedFragment } from './html';

export const all = <T extends Element = HTMLElement>(root: ParentNode, selector: string): T[] =>
  Array.from(root.querySelectorAll<T>(selector));
export const one = <T extends Element = HTMLElement>(root: ParentNode, selector: string) =>
  root.querySelector<T>(selector);
export const text = (root: ParentNode, selector: string, value: unknown) => {
  const element = one(root, selector);
  if (element) element.textContent = String(value ?? '');
};
export const value = (root: ParentNode, selector: string) =>
  one<HTMLInputElement>(root, selector)?.value.trim() ?? '';
export const digits = (input: string) =>
  input
    .replace(/[۰-۹]/g, (char) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(char)))
    .replace(/[٠-٩]/g, (char) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(char)));
export const date = (input: unknown) =>
  input
    ? new Intl.DateTimeFormat('fa-IR', { dateStyle: 'short' }).format(new Date(String(input)))
    : '';

export function setOptions(select: HTMLSelectElement, records: RecordData[], label = 'name'): void {
  const current = select.value;
  select.replaceChildren(
    new Option('یک گزینه را انتخاب کنید', ''),
    ...records.map(
      (record) =>
        new Option(
          String(record[label] ?? record.title ?? record.id ?? ''),
          String(record.id ?? ''),
        ),
    ),
  );
  if (Array.from(select.options).some((option) => option.value === current)) select.value = current;
}

export function setSafeHtml(element: Element, html: string): void {
  element.replaceChildren(sanitizedFragment(html));
}

export function feedback(root: HTMLElement, message: string): void {
  let container = one<HTMLElement>(root, '#toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.setAttribute('aria-live', 'polite');
    root.append(container);
  }
  const notice = document.createElement('div');
  notice.className = 'portal-status';
  notice.setAttribute('role', 'status');
  notice.textContent = message;
  container.replaceChildren(notice);
  setTimeout(() => notice.remove(), 6000);
}

export function fieldError(root: HTMLElement, error: unknown): void {
  const message = error instanceof Error ? error.message : 'عملیات ناموفق بود.';
  let status = one<HTMLElement>(root, '[data-form-error]');
  if (!status) {
    status = document.createElement('p');
    status.dataset.formError = 'true';
    status.className = 'portal-form-message';
    status.setAttribute('role', 'alert');
    root.prepend(status);
  }
  status.textContent = message;
}

export function commandArgs(source: string): string[] {
  return Array.from(
    source.matchAll(/'([^']*)'|"([^"]*)"|\b(\d+)\b/g),
    (match) => match[1] ?? match[2] ?? match[3],
  );
}

export function setImage(element: HTMLImageElement | SVGImageElement | null, media: unknown): void {
  if (!element) return;
  const item = media as { url?: string } | null;
  const url = item?.url && /^(https?:\/\/|\/)/.test(item.url) ? item.url : null;
  if (element.tagName.toLowerCase() === 'image') {
    if (url) {
      element.setAttribute('href', url);
      element.removeAttribute('xlink:href');
      element.removeAttribute('display');
    } else element.setAttribute('display', 'none');
  } else {
    const image = element as HTMLImageElement;
    if (url) {
      image.src = url;
      image.hidden = false;
    } else image.hidden = true;
  }
}
