#!/usr/bin/env node
import { readdir, readFile, writeFile, mkdir, copyFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, extname, basename, resolve } from "node:path";

const REPO = resolve(new URL("..", import.meta.url).pathname);
const ASSET_DIR = join(REPO, ".gitbook", "assets");
const OUT_DIR = join(REPO, "public", "images");
const MAP_PATH = join(REPO, "scripts", "asset-rename-map.json");

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || entry.name === "node_modules" || entry.name === "public" || entry.name === "scripts") continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (entry.name.endsWith(".md")) out.push(full);
  }
  return out;
}

function urlSafe(name) {
  const ext = extname(name);
  const base = basename(name, ext);
  const slug = base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
  return slug + ext.toLowerCase();
}

function uniqueName(want, taken) {
  if (!taken.has(want)) {
    taken.add(want);
    return want;
  }
  const ext = extname(want);
  const base = basename(want, ext);
  for (let i = 2; ; i++) {
    const candidate = `${base}-${i}${ext}`;
    if (!taken.has(candidate)) {
      taken.add(candidate);
      return candidate;
    }
  }
}

function findReferences(content) {
  const refs = new Set();
  const patterns = [
    /(?:src|href)=["']([^"']*\.gitbook\/assets\/[^"']+)["']/g,
    /\{%\s*file\s+src=["']([^"']*\.gitbook\/assets\/[^"']+)["']/g,
    /\]\(<([^>]*\.gitbook\/assets\/[^>]+)>\)/g,
    /\]\(([^)<\s]*\.gitbook\/assets\/[^)\s]+)\)/g,
    /^\s*(?:light|dark):\s*(\.gitbook\/assets\/.+?)\s*$/gm,
  ];
  for (const re of patterns) {
    for (const m of content.matchAll(re)) {
      const raw = m[1].trim();
      const idx = raw.indexOf(".gitbook/assets/");
      if (idx === -1) continue;
      const repoRel = raw.slice(idx);
      refs.add(decodeURIComponent(repoRel));
    }
  }
  return refs;
}

async function main() {
  const mdFiles = await walk(REPO);
  const referenced = new Set();
  for (const f of mdFiles) {
    const content = await readFile(f, "utf8");
    for (const ref of findReferences(content)) referenced.add(ref);
  }

  const map = {};
  const taken = new Set();
  const missing = [];
  for (const oldPath of [...referenced].sort()) {
    const fileName = oldPath.replace(/^\.gitbook\/assets\//, "");
    const absSource = join(ASSET_DIR, fileName);
    if (!existsSync(absSource)) {
      missing.push(oldPath);
      continue;
    }
    const newName = uniqueName(urlSafe(fileName), taken);
    map[oldPath] = `images/${newName}`;
  }

  await mkdir(OUT_DIR, { recursive: true });
  for (const [oldPath, newRel] of Object.entries(map)) {
    const fileName = oldPath.replace(/^\.gitbook\/assets\//, "");
    const src = join(ASSET_DIR, fileName);
    const dst = join(REPO, "public", newRel);
    await copyFile(src, dst);
  }

  await writeFile(MAP_PATH, JSON.stringify(map, null, 2) + "\n");

  console.log(`Markdown files scanned: ${mdFiles.length}`);
  console.log(`Distinct asset references: ${referenced.size}`);
  console.log(`Assets copied to public/images/: ${Object.keys(map).length}`);
  if (missing.length) {
    console.log(`\nMissing source files (referenced in markdown, not present on disk):`);
    for (const m of missing) console.log(`  - ${m}`);
  }
  console.log(`\nRename map written to: ${MAP_PATH}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
