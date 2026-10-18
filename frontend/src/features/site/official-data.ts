import { cache } from 'react';
import snapshot from '@/data/official-site.json';
import { publicData, recordImage, type PublicRecord } from '@/lib/public-content';
import { safeDestination } from '@/lib/urls';
import type { NavigationItem } from '@/data/official-navigation';
import type { Search } from './search-params';
import { templatePreview } from '@/lib/config';

export interface OfficialSection {
  id: string;
  title: string;
  href: string;
  kind: string;
  source_url: string | null;
  children: string[];
  group?: string;
  record_slug?: string;
  record_type?: string;
}

export const officialSite = snapshot;
export const officialSections = snapshot.pages as OfficialSection[];
export const sectionById = new Map(officialSections.map((item) => [item.id, item]));

export function resolveOfficialSection(path: string, search: Search = {}) {
  if (['/', '/office', '/counties', '/contact', '/track', '/register', '/en'].includes(path))
    return undefined;
  const group = Array.isArray(search.group) ? search.group[0] : search.group;
  const legacyManagers: Record<string, string> = {
    '1': '61',
    '2': '64',
    '3': '62',
    '4': '63',
    '5': '198',
    '6': '109',
  };
  if (path === '/managers' && group && legacyManagers[group])
    return sectionById.get('menu-' + legacyManagers[group]);
  if (path === '/deputies') return sectionById.get('menu-64');
  return officialSections.find((section) => {
    const url = new URL(section.href, 'https://portal.invalid');
    if (url.pathname !== path) return false;
    if (['/news', '/gallery', '/contact'].includes(path) && search.name) return false;
    return [...url.searchParams].every(([key, expected]) => {
      const actual = Array.isArray(search[key]) ? search[key]![0] : search[key];
      return actual === expected;
    });
  });
}

export const officialRead = cache(async (endpoint: string) =>
  publicData<unknown>(endpoint, undefined, undefined),
);

export const canUseSnapshot = (unavailable: boolean) => templatePreview() || unavailable;

export function metadata(item: PublicRecord): PublicRecord {
  return item.metadata && typeof item.metadata === 'object' ? (item.metadata as PublicRecord) : {};
}

export function officialImage(item: PublicRecord) {
  return recordImage(item.image ?? item.cover) ?? recordImage(metadata(item).design_image);
}

export function articleHref(item: PublicRecord) {
  const source = metadata(item);
  const legacyId =
    typeof source.source_url === 'string'
      ? source.source_url.match(/^https?:\/\/(?:www\.)?ostan-mz\.ir\/news\/(\d+)(?:[/?#]|$)/i)?.[1]
      : undefined;
  const sourceId = source.source_id ?? item.source_id ?? legacyId;
  return sourceId
    ? '/section/article-' + encodeURIComponent(String(sourceId))
    : '/content/' + encodeURIComponent(String(item.id));
}

export function sourceArticle(section: OfficialSection): PublicRecord | undefined {
  const record = snapshot.news.find((item) => item.slug === section.record_slug);
  return record
    ? {
        ...record,
        id: record.slug,
        body: '',
        metadata: {
          source_url: record.source_url,
          source_id: record.source_id,
          content_completeness: 'homepage_excerpt',
        },
      }
    : undefined;
}

export function navigationFromMenus(value: unknown): NavigationItem[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const menu = value.find((item) => item.key === 'official-main');
  if (!Array.isArray(menu?.items) || !menu.items.length) return undefined;
  function convert(items: PublicRecord[], depth = 0): NavigationItem[] {
    if (depth > 4) return [];
    return items
      .filter((item) => typeof item.title === 'string')
      .map((item) => ({
        id: 'db-' + item.id,
        title: String(item.title),
        href: safeDestination(item.url, '/sitemap'),
        children: Array.isArray(item.children)
          ? convert(item.children as PublicRecord[], depth + 1)
          : [],
      }));
  }
  return convert(menu.items);
}

export function officialDate(value: unknown): string {
  const date = new Date(String(value ?? ''));
  return Number.isNaN(date.getTime())
    ? ''
    : date.toLocaleDateString('fa-IR', { timeZone: 'Asia/Tehran' });
}
