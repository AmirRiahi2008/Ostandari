import { access, cp } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export async function prepareStandalone(root = process.cwd()) {
  const standalone = path.join(root, '.next', 'standalone');
  await access(path.join(standalone, 'server.js')).catch(() => {
    throw new Error('Run npm run build first.');
  });
  await cp(path.join(root, 'public'), path.join(standalone, 'public'), { recursive: true });
  await cp(path.join(root, '.next', 'static'), path.join(standalone, '.next', 'static'), {
    recursive: true,
  });
  return standalone;
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await prepareStandalone();
  console.log('Standalone server includes every local image, font and stylesheet.');
}
