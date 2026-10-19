import type { PublicRecord } from '@/lib/public-content';

export const managerGroups = [
  { group: '1', title: 'مدیران ستادی' },
  { group: '2', title: 'معاونین استاندار مازندران' },
  { group: '3', title: 'مدیران دستگاه‌های اجرایی' },
  { group: '4', title: 'فرمانداران سطح استان' },
  { group: '5', title: 'مدیران روابط عمومی استان' },
  { group: '6', title: 'مشاورین استاندار' },
] as const;

export type ManagerGroup = (typeof managerGroups)[number]['group'];
const normalize = (value: unknown) =>
  String(value ?? '')
    .replace(/ي/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/‌/g, ' ');

function groupFor(person: PublicRecord): ManagerGroup | undefined {
  if (person.kind === 'county_governor') return '4';
  if (person.kind === 'advisor') return '6';
  if (person.kind && person.kind !== 'manager') return undefined;
  const category = (person.category ?? {}) as PublicRecord;
  const sourceMenu = String(category.slug ?? '').match(
    /(?:official-)?menu-(61|64|62|63|198|109)$/,
  )?.[1];
  if (sourceMenu) {
    const groups: Record<string, ManagerGroup> = {
      '61': '1',
      '64': '2',
      '62': '3',
      '63': '4',
      '198': '5',
      '109': '6',
    };
    return groups[sourceMenu];
  }
  const label = normalize(category.name) + ' ' + normalize(person.position);
  if (/روابط\s*عمومی/.test(label)) return '5';
  if (/معاون/.test(label)) return '2';
  if (/دستگاه|ادارات/.test(label)) return '3';
  return '1';
}

export function membersForGroup(people: PublicRecord[], group?: string): PublicRecord[] {
  if (!group || !managerGroups.some((item) => item.group === group)) return people;
  return people.filter((person) => {
    if (!person.kind && (group === '4' || group === '6')) return true;
    return groupFor(person) === group;
  });
}
