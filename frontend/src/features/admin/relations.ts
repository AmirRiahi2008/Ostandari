import type { RecordData } from '@/types/portal';

const groups: Record<string, string> = {
  news: '/admin/news',
  slide: '/admin/slides',
  gallery: '/admin/galleries',
  document: '/admin/documents',
  member: '/admin/members',
  service: '/admin/services',
  form: '/admin/forms',
  forum: '/admin/forum-topics',
  link: '/admin/links',
  publication: '/admin/publications',
};
export function relatedAdminLinks(
  resource: string,
  row: RecordData,
): { label: string; href: string }[] {
  if (resource === 'categories' && groups[String(row.type)])
    return [{ label: 'موارد این گروه', href: groups[String(row.type)] + '?category_id=' + row.id }];
  if (resource === 'galleries')
    return [{ label: 'تصاویر گالری', href: '/admin/gallery-items?gallery_id=' + row.id }];
  if (resource === 'polls')
    return [{ label: 'گزینه‌ها', href: '/admin/poll-options?poll_id=' + row.id }];
  if (resource === 'members' && row.kind === 'governor')
    return [{ label: 'مشاهده در سایت', href: '/governors?person=' + row.id }];
  return [];
}

export function contextualFilters(search: string): Record<string, string> {
  const params = new URLSearchParams(search);
  const filters: Record<string, string> = {};
  for (const field of [
    'category_id',
    'gallery_id',
    'poll_id',
    'menu_id',
    'organization_id',
    'county_id',
    'parent_id',
    'form_id',
  ]) {
    const value = params.get(field);
    if (value && /^[1-9]\d*$/.test(value)) filters[field] = value;
  }
  return filters;
}
