#!/usr/bin/env node
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, relative, resolve } from "node:path";

const REPO = resolve(new URL("..", import.meta.url).pathname);
const PAGES_DIR = join(REPO, "pages");
const SUMMARY = join(REPO, "SUMMARY.md");

function parseSummary(content) {
  const tokens = []; // ordered stream of {kind: 'section'|'hr'|'item', ...}
  for (const rawLine of content.split(/\r?\n/)) {
    const sectionMatch = rawLine.match(/^##\s+(.+)$/);
    if (sectionMatch) {
      const title = sectionMatch[1].replace(/<[^>]+>/g, "").trim();
      tokens.push({ kind: "section", title });
      continue;
    }
    if (/^\s*\*\*\*\s*$/.test(rawLine)) {
      tokens.push({ kind: "hr" });
      continue;
    }
    const itemMatch = rawLine.match(/^(\s*)\*\s+\[([^\]]+)\]\(([^)]+)\)/);
    if (itemMatch) {
      const indent = itemMatch[1].length;
      const depth = Math.floor(indent / 2);
      const title = itemMatch[2];
      const url = itemMatch[3];
      tokens.push({ kind: "item", title, url, depth });
    }
  }
  return tokens;
}

// Convert a SUMMARY URL to its Nextra location:
// "" / index page; "foo/bar" / "foo/bar/" for folder; otherwise a page slug
function urlToPath(url) {
  if (/^https?:\/\//.test(url)) return null;
  let p = url.replace(/\.md$/, "");
  p = p.replace(/(^|\/)README$/, "$1");
  if (p === "") return ""; // root index
  if (p.endsWith("/")) return p; // folder index
  return p; // page slug like "foo" or "foo/bar"
}

function topLevelDirOf(pPath) {
  if (pPath === "") return null;
  const idx = pPath.indexOf("/");
  if (idx === -1) return null; // root file, not a directory entry
  return pPath.slice(0, idx);
}

function pagePathSplit(pPath) {
  if (pPath === "") return { dir: "", key: "index" };
  const trimmed = pPath.replace(/\/$/, "");
  const idx = trimmed.lastIndexOf("/");
  if (idx === -1) return { dir: "", key: trimmed };
  return { dir: trimmed.slice(0, idx), key: trimmed.slice(idx + 1) };
}

async function listDir(dir) {
  const out = { files: [], dirs: [] };
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith("_") || entry.name.startsWith(".")) continue;
    if (entry.isDirectory()) out.dirs.push(entry.name);
    else if (entry.name.endsWith(".mdx")) {
      out.files.push(entry.name.replace(/\.mdx$/, ""));
    }
  }
  return out;
}

async function walkDirs(dir) {
  const out = [dir];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || entry.name.startsWith("_")) continue;
    if (entry.isDirectory()) {
      out.push(...(await walkDirs(join(dir, entry.name))));
    }
  }
  return out;
}

function titleCase(s) {
  return s.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function buildOrderAndTitlesPerDir(tokens) {
  // For each parent directory, collect ordered child keys with SUMMARY titles
  const order = new Map(); // dir -> [keys in order]
  const titles = new Map(); // dir -> Map<key, title>
  for (const t of tokens) {
    if (t.kind !== "item") continue;
    const p = urlToPath(t.url);
    if (p === null) continue;
    const { dir, key } = pagePathSplit(p);
    if (!order.has(dir)) order.set(dir, []);
    if (!titles.has(dir)) titles.set(dir, new Map());
    if (!order.get(dir).includes(key)) order.get(dir).push(key);
    if (!titles.get(dir).has(key)) titles.get(dir).set(key, t.title);
  }
  return { order, titles };
}

async function writeChildMetas(order, titles) {
  const dirs = await walkDirs(PAGES_DIR);
  let written = 0;
  for (const absDir of dirs) {
    const rel = relative(PAGES_DIR, absDir);
    if (rel === "") continue; // root handled separately
    const { files, dirs: subdirs } = await listDir(absDir);
    const childKeys = new Set([...files, ...subdirs]);
    if (childKeys.size === 0) continue;

    const orderForDir = order.get(rel) ?? [];
    const titlesForDir = titles.get(rel) ?? new Map();

    const meta = {};
    const seen = new Set();

    if (childKeys.has("index")) {
      const parentDir = rel.includes("/") ? rel.slice(0, rel.lastIndexOf("/")) : "";
      const dirName = rel.includes("/") ? rel.slice(rel.lastIndexOf("/") + 1) : rel;
      const fromParent = titles.get(parentDir)?.get(dirName);
      meta["index"] =
        titlesForDir.get("index") ?? fromParent ?? titleCase(dirName);
      seen.add("index");
    }

    for (const key of orderForDir) {
      if (!childKeys.has(key) || seen.has(key)) continue;
      meta[key] = titlesForDir.get(key) ?? titleCase(key);
      seen.add(key);
    }

    for (const key of [...files, ...subdirs].sort()) {
      if (seen.has(key)) continue;
      meta[key] = titlesForDir.get(key) ?? titleCase(key);
      seen.add(key);
    }

    await writeFile(
      join(absDir, "_meta.js"),
      `export default ${JSON.stringify(meta, null, 2)};\n`
    );
    written += 1;
  }
  return written;
}

async function writeRootMeta(tokens, titlesByDir) {
  const { dirs: rootSubdirs, files: rootFiles } = await listDir(PAGES_DIR);
  const rootChildSet = new Set([...rootFiles, ...rootSubdirs]);

  const meta = {};
  const usedKeys = new Set();
  const usedDirs = new Set();
  let sepCounter = 0;

  // Folder display titles inferred from section context
  const folderTitleHints = new Map(); // dir -> title

  // First pass: walk SUMMARY to collect folder titles per section
  let activeSection = null;
  const sectionUsedBy = new Map(); // section title -> first top dir that claimed it
  for (const t of tokens) {
    if (t.kind === "section") {
      activeSection = t.title;
      continue;
    }
    if (t.kind === "item" && t.depth === 0) {
      const p = urlToPath(t.url);
      if (p === null) continue;
      const top = topLevelDirOf(p);
      if (top && !folderTitleHints.has(top)) {
        if (activeSection && !sectionUsedBy.has(activeSection)) {
          folderTitleHints.set(top, activeSection);
          sectionUsedBy.set(activeSection, top);
        } else {
          folderTitleHints.set(top, titleCase(top));
        }
      }
    }
  }

  // Second pass: emit root meta in SUMMARY order
  activeSection = null;
  for (const t of tokens) {
    if (t.kind === "section") {
      meta[`-- sep-${sepCounter++}`] = { type: "separator", title: t.title };
      activeSection = t.title;
      continue;
    }
    if (t.kind === "hr") {
      meta[`-- hr-${sepCounter++}`] = { type: "separator", title: "" };
      continue;
    }
    if (t.kind !== "item" || t.depth !== 0) continue;

    const p = urlToPath(t.url);
    if (p === null) {
      // External link
      const slug = t.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const key = `-- ext-${slug}-${sepCounter++}`;
      meta[key] = {
        title: t.title,
        type: "page",
        href: t.url,
        newWindow: true,
      };
      continue;
    }

    if (p === "") {
      if (rootChildSet.has("index") && !usedKeys.has("index")) {
        meta["index"] = t.title;
        usedKeys.add("index");
      }
      continue;
    }

    const top = topLevelDirOf(p);
    if (top === null) {
      // Root-level page like "why-token-sales"
      if (rootChildSet.has(p) && !usedKeys.has(p)) {
        meta[p] = t.title;
        usedKeys.add(p);
      }
      continue;
    }

    // Item lives in a subdirectory — emit a folder entry for that top-level dir
    if (rootSubdirs.includes(top) && !usedDirs.has(top)) {
      meta[top] = folderTitleHints.get(top) ?? titleCase(top);
      usedDirs.add(top);
    }
  }

  // Append any leftover root children that SUMMARY didn't reference
  for (const f of rootFiles) {
    if (!usedKeys.has(f)) {
      const tt = (titlesByDir.titles.get("")?.get(f)) ?? titleCase(f);
      meta[f] = tt;
      usedKeys.add(f);
    }
  }
  for (const d of rootSubdirs) {
    if (!usedDirs.has(d)) {
      meta[d] = folderTitleHints.get(d) ?? titleCase(d);
      usedDirs.add(d);
    }
  }

  await writeFile(
    join(PAGES_DIR, "_meta.js"),
    `export default ${JSON.stringify(meta, null, 2)};\n`
  );
}

async function main() {
  const tokens = parseSummary(await readFile(SUMMARY, "utf8"));
  const { order, titles } = buildOrderAndTitlesPerDir(tokens);

  const childCount = await writeChildMetas(order, titles);
  await writeRootMeta(tokens, { order, titles });

  console.log(`Wrote ${childCount + 1} _meta.json files`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
