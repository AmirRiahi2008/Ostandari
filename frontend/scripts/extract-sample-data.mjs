import fs from 'node:fs';
import { JSDOM } from 'jsdom';
const base = 'originals/site/ostandari-website/';
const documentOf = (file) => new JSDOM(fs.readFileSync(base + file, 'utf8')).window.document;
const text = (node) => node?.textContent?.trim().replace(/\s+/g, ' ') ?? '';
const home = documentOf('asli.html');
const cards = [...home.querySelectorAll('.akhbar-container')].slice(0, 3).map((node, i) => ({
  id: 'design-' + (i + 1),
  title: text(node.querySelector('.akhbar-onvan')).replace('الوروددومین', 'الورود — دومین'),
  excerpt: 'از محتوای نمونهٔ موجود در فایل طراحی پرتال استانداری مازندران.',
  cover: '/design/site' + node.querySelector('img').getAttribute('src'),
  body: text(node.querySelector('.akhbar-onvan')),
  category: i === 2 ? 'اطلاعیه‌ها' : 'اخبار',
  sample: true,
}));
fs.writeFileSync('src/data/sample-news.json', JSON.stringify(cards, null, 2) + '\n');
