import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { JSDOM } from 'jsdom';
import { templates } from '../src/lib/templates';
import { templateViews } from '../src/views';

const pages = templates.map((page) => {
  const View = templateViews[page.id as keyof typeof templateViews];
  const document = new JSDOM(renderToStaticMarkup(React.createElement(View))).window.document;
  const links = Array.from(document.querySelectorAll('a')).map((a) => ({
    href: a.getAttribute('href'),
    label: a.textContent?.trim().replace(/\s+/g, ' '),
    title:
      a.getAttribute('title') ??
      a.getAttribute('aria-label') ??
      a.querySelector('img')?.getAttribute('src'),
    className: a.className.baseVal ?? a.className,
    parent: a.parentElement?.className,
    action: a.getAttribute('data-command'),
    children: Boolean(a.querySelector('ul,nav')),
  }));
  return {
    path: page.path,
    source: page.source,
    links,
    svgPaths: document.querySelectorAll('path[d]').length,
  };
});
fs.mkdirSync('docs', { recursive: true });
fs.writeFileSync('docs/link-audit.json', JSON.stringify(pages, null, 2) + '\n');
console.log(
  JSON.stringify({
    pages: pages.length,
    links: pages.reduce((sum, page) => sum + page.links.length, 0),
    placeholders: pages
      .flatMap((page) => page.links)
      .filter((link) => !link.href || link.href === '#').length,
  }),
);
