import shapes from './county-shapes.json';

export type County = {
  slug: string;
  name: string;
  shape: string;
  image: string;
  label: readonly [number, number];
};

// Geometry comes from the supplied design. Coastal county names are aligned with
// their regions rather than inheriting the shifted labels in the HTML prototype.
const records = [
  ['ramsar', 'رامسر', 0, 48, 51],
  ['tonekabon', 'تنکابن', 1, 87, 105],
  ['abbasabad', 'عباس‌آباد', 2, 145, 68],
  ['chalus', 'چالوس', 3, 181, 91],
  ['noshahr', 'نوشهر', 4, 219, 143],
  ['mahmudabad', 'محمودآباد', 5, 329, 73],
  ['amol', 'آمل', 6, 306, 218],
  ['fereydunkenar', 'فریدونکنار', 7, 366, 48],
  ['babolsar', 'بابلسر', 8, 396, 64],
  ['juybar', 'جویبار', 9, 432, 76],
  ['simorgh', 'سیمرغ', 10, 399, 119],
  ['babol', 'بابل', 11, 380, 168],
  ['savadkuh', 'سوادکوه', 12, 436, 216],
  ['savadkuh-shomali', 'سوادکوه شمالی', 13, 445, 164],
  ['sari', 'ساری', 14, 503, 185],
  ['galugah', 'گلوگاه', 15, 604, 72],
  ['miandorud', 'میاندورود', 16, 486, 44],
  ['qaemshahr', 'قائم‌شهر', 17, 431, 137],
  ['nur', 'نور', 18, 264, 168],
  ['kelardasht', 'کلاردشت', 19, 141, 154],
  ['neka', 'نکا', 20, 548, 134],
  ['behshahr', 'بهشهر', 21, 541, 63],
] as const;

export const counties: County[] = records.map(([slug, name, index, x, y]) => ({
  slug,
  name,
  shape: shapes[index].d,
  image:
    slug === 'kelardasht'
      ? '/design/site/assets/Img/kelar.png'
      : shapes[index].image.startsWith('/design/')
        ? shapes[index].image
        : '/design/site/assets/image/baner.png',
  label: [x, y],
}));
const aliases: Record<string, string> = {
  chalous: 'chalus',
  'north-savadkuh': 'savadkuh-shomali',
  mahmoudabad: 'mahmudabad',
  noor: 'nur',
  nour: 'nur',
  gov_tonekabon: 'tonekabon',
  nowshahr: 'noshahr',
  joybar: 'juybar',
  juybar: 'juybar',
  mahmoodabad: 'mahmudabad',
  fereydounkenar: 'fereydunkenar',
  miandorood: 'miandorud',
  ghalugah: 'galugah',
  galoogah: 'galugah',
  ghaemshahr: 'qaemshahr',
};
export function findCounty(value: string | undefined): County | undefined {
  if (!value) return undefined;
  const clean = value.toLowerCase().trim();
  return counties.find(
    (county) => county.slug === (aliases[clean] ?? clean) || county.name === value,
  );
}
export function officeHref(county: Pick<County, 'slug'>, section?: string): string {
  return '/office?' + new URLSearchParams({ name: county.slug, ...(section ? { section } : {}) });
}
export function countyQuery(county?: Pick<County, 'slug'>): string {
  return county ? '?name=' + encodeURIComponent(county.slug) : '';
}
