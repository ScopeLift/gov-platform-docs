#!/usr/bin/env node
// One-off: for every nested folder under pages/ that has an index.mdx, set its
// _meta.js entry for "index" to { display: "hidden" }. This removes the
// duplicate sidebar child without losing the page — the parent folder header
// stays clickable + expandable and routes to the index.
// The root pages/_meta.js is exempt — its "index" is the real Welcome page.
import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import { join, resolve, dirname } from "node:path";

const REPO = resolve(new URL("..", import.meta.url).pathname);
const PAGES = join(REPO, "pages");
const ROOT_META = join(PAGES, "_meta.js");

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.name.startsWith(".")) continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else if (e.name === "_meta.js") out.push(full);
  }
  return out;
}

async function exists(p) {
  try { await stat(p); return true; } catch { return false; }
}

const EXISTING_INDEX_LINE_RE = /^\s*"index"\s*:\s*[^,\n]+,?\s*\n/m;
const EXPORT_DEFAULT_RE = /export\s+default\s+\{\s*\n/;
const HIDDEN_LINE = '  "index": { "display": "hidden" },\n';

let changed = 0;
for (const file of await walk(PAGES)) {
  if (file === ROOT_META) continue;
  const dir = dirname(file);
  if (!(await exists(join(dir, "index.mdx")))) continue;

  let content = await readFile(file, "utf8");
  if (EXISTING_INDEX_LINE_RE.test(content)) {
    content = content.replace(EXISTING_INDEX_LINE_RE, HIDDEN_LINE);
  } else if (EXPORT_DEFAULT_RE.test(content)) {
    content = content.replace(EXPORT_DEFAULT_RE, (m) => m + HIDDEN_LINE);
  } else {
    continue;
  }
  await writeFile(file, content);
  changed += 1;
}
console.log(`Updated ${changed} _meta.js files to hide index entries`);
