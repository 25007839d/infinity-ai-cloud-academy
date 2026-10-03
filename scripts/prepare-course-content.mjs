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
  const allowed = new Set(['.html', '.md', '.sql', '.py', '.sh', '.yaml', '.yml', '.json', '.csv', '.txt', '.ipynb', '.svg']);
  if (allowed.has(ext)) {
    await fs.mkdir(path.dirname(dst), { recursive: true });
    if (ext === '.html') {
      const html = await fs.readFile(src, 'utf8');
      await fs.writeFile(dst, renderMermaidBlocks(html), 'utf8');
    } else {
      await fs.copyFile(src, dst);
    }
  }
}

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function renderMermaidBlocks(html) {
  // Quarto/content generation currently emits Mermaid definitions as ordinary
  // <pre><code> blocks. Convert only recognised Mermaid diagram blocks into
  // <pre class="mermaid"> so the lesson iframe renders the SVG diagram.
  const mermaidStart = /^(flowchart|graph|sequenceDiagram|classDiagram|stateDiagram(?:-v2)?|erDiagram|journey|gantt|pie|quadrantChart|mindmap|timeline|gitGraph|xychart-beta|sankey-beta)\b/i;
  let found = false;
  const converted = html.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/gi, (full, encoded) => {
    const source = decodeHtml(encoded).trim();
    if (!mermaidStart.test(source)) return full;
    found = true;
    return `<pre class="mermaid">${encoded}</pre>`;
  });

  if (!found || converted.includes('mermaid.esm.min.mjs')) return converted;

  const mermaidScript = `
<style>
  pre.mermaid {
    background: #07111f;
    border: 1px solid #29415f;
    border-radius: 16px;
    padding: 22px;
    overflow-x: auto;
    text-align: center;
  }
  pre.mermaid svg { max-width: 100%; height: auto; }
</style>
<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    theme: 'dark',
    flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'basis' }
  });
  await mermaid.run({ querySelector: '.mermaid', suppressErrors: false });
</script>`;

  return converted.replace('</body>', `${mermaidScript}</body>`);
}

await fs.rm(target, { recursive: true, force: true });
await fs.mkdir(target, { recursive: true });
await copyDeployable(source, target);
console.log(`Prepared deployable course content at ${target}`);
