/**
 * Sequential design-context queue for the Figma Dev Mode MCP server.
 * For each node id: pulls design context (via figma-mcp.mjs), saves the text,
 * then downloads every referenced localhost asset so nothing expires.
 *
 * Usage: node scripts/figma-queue.mjs <ctxDir> <assetDir> <nodeId> [nodeId...]
 */
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { get } from 'node:http';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const [ctxDir, assetDir, ...ids] = process.argv.slice(2);
if (!ctxDir || !assetDir || ids.length === 0) {
  console.error('Usage: node scripts/figma-queue.mjs <ctxDir> <assetDir> <nodeId>...');
  process.exit(1);
}
const mcpScript = join(dirname(fileURLToPath(import.meta.url)), 'figma-mcp.mjs');
mkdirSync(ctxDir, { recursive: true });
mkdirSync(assetDir, { recursive: true });

function download(url, dest) {
  return new Promise((resolvePromise, reject) => {
    get(url, (r) => {
      if (r.statusCode !== 200) {
        r.resume();
        return reject(new Error(`HTTP ${r.statusCode}`));
      }
      const chunks = [];
      r.on('data', (c) => chunks.push(c));
      r.on('end', () => {
        const buf = Buffer.concat(chunks);
        if (buf.length < 100 && buf.toString().startsWith('Error')) {
          return reject(new Error(buf.toString()));
        }
        writeFileSync(dest, buf);
        resolvePromise();
      });
    }).on('error', reject);
  });
}

for (const id of ids) {
  const out = join(ctxDir, `ctx-${id.replace(':', '_')}.txt`);
  if (existsSync(out)) {
    console.log(`SKIP ${id} — ${out} exists`);
    continue;
  }
  const t0 = Date.now();
  console.log(`START ${id} @ ${new Date().toISOString()}`);
  const args = JSON.stringify({
    nodeId: id,
    clientLanguages: 'typescript,css',
    clientFrameworks: 'react',
    skillNames: 'figma-design-to-code',
  });
  const r = spawnSync('node', [mcpScript, 'call', 'get_design_context', args, '--out', out, '--preview', '1'], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  if (r.status !== 0) {
    console.log(`FAIL ${id}: ${(r.stderr || r.stdout || 'unknown').slice(0, 200)}`);
    continue;
  }
  const text = readFileSync(out, 'utf8');
  const urls = [...new Set(text.match(/http:\/\/localhost:3845\/assets\/[a-f0-9]+\.\w+/g) || [])];
  let ok = 0;
  let fail = 0;
  for (const u of urls) {
    const dest = join(assetDir, u.split('/').pop());
    if (existsSync(dest)) {
      ok++;
      continue;
    }
    try {
      await download(u, dest);
      ok++;
    } catch (e) {
      fail++;
      console.log(`  asset FAIL ${u.split('/').pop()}: ${e.message}`);
    }
  }
  const mins = ((Date.now() - t0) / 60000).toFixed(1);
  console.log(`DONE ${id} in ${mins}m — ${text.length} chars, ${ok}/${urls.length} assets${fail ? ` (${fail} failed)` : ''}`);
}
console.log('QUEUE COMPLETE');
