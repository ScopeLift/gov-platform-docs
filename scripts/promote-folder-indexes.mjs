#!/usr/bin/env node
// One-off: for every nested directory under pages/ that contains an index.mdx,
// move that file up one level (pages/A/X/index.mdx -> pages/A/X.mdx) and
// remove the now-stale "index" entry from the directory's _meta.js.
//
// Why: Nextra v3 auto-merges a sibling file+folder pair with the same name
// into a single sidebar entry with `withIndexPage: true` — clicking expands
// AND navigates to the index. The pages/X/index.mdx pattern doesn't trigger
// that merge.
//
// The root pages/index.mdx is exempt — it's the site's home page, no parent.
import { readdir, readFile, writeFile, rename, stat } from "node:fs/promises";
import { join, resolve, dirname, basename } from "node:path";

const REPO = resolve(new URL("..", import.meta.url).pathname);
const PAGES = join(REPO, "pages");

async function walk(dir) {
  const out = [dir];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.name.startsWith(".") || e.name.startsWith("_")) continue;
    if (e.isDirectory()) out.push(...(await walk(join(dir, e.name))));
  }
  return out;
}

async function exists(p) {
  try { await stat(p); return true; } catch { return false; }
}

const INDEX_LINE_RE = /^\s*"index"\s*:\s*[^,\n]+,?\s*\n/m;

let moved = 0;
let metasUpdated = 0;

const dirs = await walk(PAGES);
for (const dir of dirs) {
  if (dir === PAGES) continue; // root home page stays put
  const indexFile = join(dir, "index.mdx");
  if (!(await exists(indexFile))) continue;

  const folderName = basename(dir);
  const parentDir = dirname(dir);
  const newFile = join(parentDir, `${folderName}.mdx`);

  if (await exists(newFile)) {
    console.warn(`SKIP ${dir}: target ${newFile} already exists`);
    continue;
  }

  await rename(indexFile, newFile);
  moved += 1;

  const meta = join(dir, "_meta.js");
  if (await exists(meta)) {
    const before = await readFile(meta, "utf8");
    if (INDEX_LINE_RE.test(before)) {
      await writeFile(meta, before.replace(INDEX_LINE_RE, ""));
      metasUpdated += 1;
    }
  }
}

console.log(`Promoted ${moved} index.mdx files; cleaned ${metasUpdated} _meta.js files`);
