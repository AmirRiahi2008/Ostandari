import fs from 'node:fs/promises';
import path from 'node:path';
import postcss from 'postcss';
import prefixSelector from 'postcss-prefix-selector';

const root = process.cwd();
const tasks = JSON.parse(await fs.readFile('scripts/design-css.json', 'utf8'));
const inline = JSON.parse(await fs.readFile('scripts/design-inline.json', 'utf8'));
const inlineCss = Object.entries(inline)
  .map(([name, style]) => `${`:is(#design-inline-priority,.${name})`.repeat(8)}{${style}}`)
  .join('\n');

for (const task of tasks) {
  const files = await Promise.all(
    task.files.map((file) => fs.readFile(path.join(root, 'public', file), 'utf8')),
  );
  const css = [...files, task.inline, inlineCss]
    .join('\n')
    .replace(/\/\*[\s\S]*?\*\//g, (comment) =>
      /^\/\*!|copyright|licen[cs]e/i.test(comment) ? comment : '',
    );
  const prefix = `:where([data-design="${task.scope}"])`;
  const result = await postcss([
    {
      postcssPlugin: 'original-font-formats',
      Once(root) {
        root.walkAtRules('font-face', (rule) => {
          if (!rule.nodes.some((node) => node.prop === 'font-display'))
            rule.append({ prop: 'font-display', value: 'swap' });
          const vazirmatn = rule.nodes.some(
            (node) => node.prop === 'font-family' && /vazirmatn/i.test(node.value),
          );
          if (vazirmatn && !rule.nodes.some((node) => node.prop === 'font-weight'))
            rule.append({ prop: 'font-weight', value: '100 900' });
          rule.walkDecls('src', (declaration) => {
            if (vazirmatn) {
              declaration.value =
                "url('/design/site/assets/fonts/Vazirmatn-VariableFont_wght.woff2') format('woff2')";
              return;
            }
            // Some supplied templates label a TTF file as WOFF2, which prevents font loading.
            declaration.value = declaration.value
              .replace(/Vazirmatn-VariableFont_wght\.ttf/g, 'Vazirmatn-VariableFont_wght.woff2')
              .replace(
                /(url\([^)]*\.ttf(?:[?#][^)]*)?[^)]*\)\s*format\()['"](?:woff2?|opentype)['"]\)/gi,
                "$1'truetype')",
              );
          });
        });
      },
    },
    prefixSelector({
      prefix,
      transform(prefix, selector, prefixedSelector) {
        if (/^(html|body|:root)(?=[\s.#[:>+~]|$)/.test(selector.trim())) {
          return selector.replace(/^(?:html\s+body|html|body|:root)/, prefix);
        }
        return prefixedSelector;
      },
    }),
  ]).process(css, { from: undefined });
  const destination = path.join(root, 'public', task.output);
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.writeFile(destination, result.css);
}
console.log(`Scoped the original CSS for ${tasks.length} template pages.`);
