import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'content', 'courses');
const target = path.join(root, 'public', 'content', 'courses');

async function copyDeployable(src, dst) {
  const stat = await fs.stat(src);
  if (stat.isDirectory()) {
    await fs.mkdir(dst, { recursive: true });
    for (const name of await fs.readdir(src)) await copyDeployable(path.join(src, name), path.join(dst, name));
    return;
  }
  const ext = path.extname(src).toLowerCase();
  const allowed = new Set(['.html', '.md', '.sql', '.py', '.sh', '.yaml', '.yml', '.json', '.csv', '.txt', '.ipynb']);
  if (allowed.has(ext)) {
    await fs.mkdir(path.dirname(dst), { recursive: true });
    await fs.copyFile(src, dst);
  }
}

await fs.rm(target, { recursive: true, force: true });
await fs.mkdir(target, { recursive: true });
await copyDeployable(source, target);
console.log(`Prepared deployable course content at ${target}`);
