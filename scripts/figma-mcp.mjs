#!/usr/bin/env node
/**
 * Minimal client for the Figma Dev Mode MCP server (http://127.0.0.1:3845/mcp).
 * Requires the Figma desktop app running with "Enable Dev Mode MCP Server" on.
 *
 * Usage:
 *   node scripts/figma-mcp.mjs tools
 *   node scripts/figma-mcp.mjs call <toolName> '<jsonArgs>' [--out file] [--images dir] [--preview N]
 */
import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ENDPOINT = 'http://127.0.0.1:3845/mcp';
const SESSION_FILE = join(dirname(fileURLToPath(import.meta.url)), '.mcp-session');

let nextId = (Date.now() % 100000) + 1;

async function rpc(method, params, { session, expectResult = true } = {}) {
  const id = expectResult ? nextId++ : undefined;
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json, text/event-stream',
      ...(session ? { 'Mcp-Session-Id': session } : {}),
    },
    body: JSON.stringify({ jsonrpc: '2.0', method, params, ...(id !== undefined ? { id } : {}) }),
  });
  const newSession = res.headers.get('mcp-session-id') || session;
  const text = await res.text();
  if (!expectResult) return { session: newSession };
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${text.slice(0, 300)}`);

  let payload = null;
  if ((res.headers.get('content-type') || '').includes('text/event-stream')) {
    for (const line of text.split('\n')) {
      if (!line.startsWith('data:')) continue;
      try {
        const obj = JSON.parse(line.slice(5).trim());
        if (payload === null || obj.id === id) payload = obj;
      } catch {
        /* non-JSON data line — keep scanning */
      }
    }
  } else if (text.trim()) {
    payload = JSON.parse(text);
  }
  if (!payload) throw new Error(`No JSON-RPC payload in response: ${text.slice(0, 300)}`);
  if (payload.error) throw new Error(`RPC error: ${JSON.stringify(payload.error).slice(0, 500)}`);
  return { session: newSession, result: payload.result };
}

async function connect() {
  if (existsSync(SESSION_FILE)) {
    const session = readFileSync(SESSION_FILE, 'utf8').trim();
    if (session) {
      try {
        await rpc('ping', {}, { session });
        return session;
      } catch {
        /* stale session — re-initialize below */
      }
    }
  }
  const { session } = await rpc('initialize', {
    protocolVersion: '2025-03-26',
    capabilities: {},
    clientInfo: { name: 'cashback-figma-client', version: '1.0' },
  });
  await rpc('notifications/initialized', {}, { session, expectResult: false });
  writeFileSync(SESSION_FILE, session ?? '');
  return session;
}

function flag(args, name) {
  const i = args.indexOf(name);
  return i > -1 ? args[i + 1] : null;
}

const [cmd, ...rest] = process.argv.slice(2);

try {
  if (cmd === 'tools') {
    const session = await connect();
    const { result } = await rpc('tools/list', {}, { session });
    for (const t of result.tools) {
      const desc = (t.description || '').split('\n')[0].slice(0, 100);
      const props = Object.keys(t.inputSchema?.properties || {}).join(', ');
      console.log(`${t.name}(${props}): ${desc}`);
    }
  } else if (cmd === 'call') {
    const tool = rest[0];
    const args = JSON.parse(rest[1] || '{}');
    const outFile = flag(rest, '--out');
    const imgDir = flag(rest, '--images');
    const previewLen = Number(flag(rest, '--preview') || 1500);

    const session = await connect();
    const { result } = await rpc('tools/call', { name: tool, arguments: args }, { session });

    let textOut = '';
    let imgCount = 0;
    for (const item of result.content || []) {
      if (item.type === 'text') {
        textOut += item.text + '\n';
      } else if (item.type === 'image') {
        if (imgDir) {
          mkdirSync(imgDir, { recursive: true });
          const ext = (item.mimeType || 'image/png').split('/')[1].split('+')[0];
          const safe = String(args.nodeId || 'node').replace(/[^0-9A-Za-z_-]/g, '_');
          const file = join(imgDir, `${safe}${imgCount ? '_' + imgCount : ''}.${ext}`);
          writeFileSync(file, Buffer.from(item.data, 'base64'));
          console.log(`[image saved] ${resolve(file)}`);
        } else {
          console.log(`[image ${item.mimeType}, ${item.data.length} b64 chars — pass --images <dir> to save]`);
        }
        imgCount++;
      }
    }
    if (result.isError) console.log('[tool reported an error]');
    if (outFile) {
      writeFileSync(outFile, textOut);
      console.log(`[text saved] ${resolve(outFile)} (${textOut.length} chars)`);
      console.log(textOut.slice(0, previewLen));
    } else if (textOut) {
      console.log(
        textOut.length > previewLen
          ? textOut.slice(0, previewLen) + `\n...[truncated, ${textOut.length} chars total]`
          : textOut,
      );
    }
  } else {
    console.log('Usage: node scripts/figma-mcp.mjs tools | call <tool> <jsonArgs> [--out f] [--images dir] [--preview N]');
    process.exit(1);
  }
} catch (err) {
  console.error(`FAILED: ${err.message}`);
  process.exit(1);
}
