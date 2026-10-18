export const transparencyCards: {
  id: string;
  title: string;
  href: string;
  icon: string;
}[] = [
  {
    id: 'transparency-personnel',
    title: 'احکام پرسنلی',
    href: '/section/design-transparency-personnel',
    icon: '/design/site/assets/image/guitar 1.png',
  },
  {
    id: 'transparency-budget',
    title: 'بودجه',
    href: '/section/design-transparency-budget',
    icon: '/design/site/assets/image/guitar 1 (16).png',
  },
  {
    id: 'transparency-tenders',
    title: 'مناقصات',
    href: '/tenders',
    icon: '/design/site/assets/image/guitar 1 (2).png',
  },
  {
    id: 'transparency-contracts',
    title: 'اطلاعات قراردادها',
    href: '/contracts',
    icon: '/design/site/assets/image/guitar 1 (3).png',
  },
  {
    id: 'transparency-development-plans',
    title: 'برنامه‌های توسعه راهبردی',
    href: '/section/design-transparency-development-plans',
    icon: '/design/site/assets/image/guitar 1 (4).png',
  },
  {
    id: 'transparency-permits',
    title: 'مجوزهای صادره',
    href: '/section/design-transparency-permits',
    icon: '/design/site/assets/image/guitar 1 (5).png',
  },
  {
    id: 'transparency-regulations',
    title: 'قوانین، مقررات و مصوبات بالادستی',
    href: '/regulations',
    icon: '/design/site/assets/image/guitar 1 (6).png',
  },
  {
    id: 'transparency-performance',
    title: 'آمار و اطلاعات عملکردی',
    href: '/performance',
    icon: '/design/site/assets/image/guitar 1 (7).png',
  },
  {
    id: 'transparency-open-data',
    title: 'اسناد داده باز',
    href: '/section/design-transparency-open-data',
    icon: '/design/site/assets/image/guitar 1 (8).png',
  },
  {
    id: 'transparency-research',
    title: 'اسناد پژوهشی',
    href: '/section/design-transparency-research',
    icon: '/design/site/assets/image/guitar 1 (9).png',
  },
  {
    id: 'transparency-managers',
    title: 'معرفی مدیران دستگاه',
    href: '/managers',
    icon: '/design/site/assets/image/guitar 1 (10).png',
  },
  {
    id: 'transparency-minutes',
    title: 'صورت جلسات',
    href: '/section/design-transparency-minutes',
    icon: '/design/site/assets/image/guitar 1 (11).png',
  },
  {
    id: 'transparency-business',
    title: 'کسب و کار',
    href: '/section/design-transparency-business',
    icon: '/design/site/assets/image/guitar 1 (12).png',
  },
  {
    id: 'transparency-structure',
    title: 'ساختار سازمانی و مدیریت',
    href: '/units',
    icon: '/design/site/assets/image/guitar 1 (11).png',
  },
  {
    id: 'transparency-proposals',
    title: 'لوایح پیشنهادی دستگاه',
    href: '/section/design-transparency-proposals',
    icon: '/design/site/assets/image/guitar 1 (14).png',
  },
  {
    id: 'transparency-agreements',
    title: 'تفاهم‌نامه‌ها',
    href: '/service-agreement',
    icon: '/design/site/assets/image/guitar 1 (3).png',
  },
];

export const transparencySteps = [
  {
    id: 'track',
    title: 'سامانه مدیریت پیگیری',
    href: '/track',
  },
  {
    id: 'mail',
    title: 'سامانه ایمیل سازمانی',
    href: '/section/design-transparency-mail',
  },
  {
    id: 'video',
    title: 'سامانه ویدئو کنفرانس',
    href: '/section/design-transparency-video',
  },
];

export const transparencyPages = [...transparencyCards, ...transparencySteps]
  .filter((item) => item.href.startsWith('/section/design-transparency-'))
  .map((item) => ({
    id: item.href.split('/').at(-1)!,
    title: item.title,
    href: item.href,
    kind: 'page',
    source_url: null,
    children: [] as string[],
  }));
