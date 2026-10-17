import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));

export async function verifyOriginalDesigns() {
  const manifest = JSON.parse(
    await readFile(path.join(projectRoot, 'docs/original-designs.json'), 'utf8'),
  );
  assert.equal(manifest.files.length, manifest.fileCount);
  assert.equal(new Set(manifest.files.map((file) => file.path)).size, manifest.fileCount);
  const prefix = path.join(projectRoot, 'originals') + path.sep;
  for (const file of manifest.files) {
    const filename = path.resolve(projectRoot, file.path);
    assert.ok(filename.startsWith(prefix), 'Invalid original design path');
    const content = await readFile(filename);
    assert.equal(content.length, file.bytes, 'Incomplete design file: ' + file.path);
    assert.equal(
      createHash('sha256').update(content).digest('hex'),
      file.sha256,
      'Modified design file: ' + file.path,
    );
  }
  return { files: manifest.fileCount, archives: manifest.archives.map((archive) => archive.name) };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  console.log(JSON.stringify(await verifyOriginalDesigns()));
}
