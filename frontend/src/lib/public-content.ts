import sampleNews from '@/data/sample-news.json';
import { templatePreview } from '@/lib/config';
import type { RecordData } from '@/types/portal';

export type PublicRecord = RecordData & {
  title?: string;
  name?: string;
  body?: string;
  excerpt?: string;
  cover?: unknown;
  url?: string;
};
export type PublicResult<T> = { data: T; unavailable: boolean };
export const designNews = sampleNews as PublicRecord[];

/** Public reads run on the server; Laravel tokens and environment values stay off the client. */
export async function publicData<T>(
  endpoint: string,
  previewData: T,
  empty: T = previewData,
): Promise<PublicResult<T>> {
  if (templatePreview()) return { data: previewData, unavailable: false };
  try {
    const base = (process.env.BACKEND_URL ?? 'http://127.0.0.1:8000/api/v1').replace(/\/$/, '');
    const response = await fetch(base + '/' + endpoint, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
      signal: AbortSignal.timeout(6000),
    });
    if (!response.ok) return { data: empty, unavailable: response.status !== 404 };
    const result = await response.json();
    return { data: result.data as T, unavailable: false };
  } catch {
    return { data: empty, unavailable: true };
  }
}
export function recordImage(value: unknown): string | undefined {
  if (typeof value === 'string' && /^(?:\/(?!\/)|https?:\/\/)/.test(value)) return value;
  if (value && typeof value === 'object')
    return recordImage((value as RecordData).url ?? (value as RecordData).path);
  return undefined;
}
export function plainText(value: unknown): string {
  return String(value ?? '')
    .replace(/<br\s*\/?\s*>|<\/p>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}
