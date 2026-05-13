#!/usr/bin/env node
// One-off: convert relative markdown links in pages/*.mdx to absolute paths.
// Next.js's relative URL resolution with trailingSlash:true + basePath drops
// the last path segment, breaking every relative link. Making them absolute
// sidesteps the whole issue.
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve, posix } from "node:path";

const REPO = resolve(new URL("..", import.meta.url).pathname);
const PAGES = join(REPO, "pages");

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.name.startsWith(".") || e.name.startsWith("_")) continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else if (e.name.endsWith(".mdx")) out.push(full);
  }
  return out;
}

function pageDir(absPath) {
  // /repo/pages/X/Y/Z.mdx -> /X/Y/   (regardless of filename, even index.mdx)
  const rel = absPath.slice(PAGES.length).replace(/\.mdx$/, "");
  const dir = rel.replace(/\/[^/]+$/, "") || "";
  return dir.endsWith("/") ? dir : dir + "/";
}

function isRelative(url) {
  if (!url) return false;
  if (/^[a-z][a-z0-9+.-]*:/i.test(url)) return false;
  if (url.startsWith("//")) return false;
  if (url.startsWith("/")) return false;
  if (url.startsWith("#")) return false;
  return true;
}

function resolveLink(currentDir, url) {
  const [pathPart, hashPart = ""] = url.split("#", 2);
  if (pathPart === "") return url;
  const trailingSlash = pathPart.endsWith("/");
  const resolved = posix.resolve(currentDir, pathPart);
  const out = trailingSlash && !resolved.endsWith("/") ? resolved + "/" : resolved;
  return hashPart ? `${out}#${hashPart}` : out;
}

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;
const HTML_HREF_RE = /\bhref=("|')([^"']+)\1/g;
const HTML_SRC_RE = /\bsrc=("|')([^"']+)\1/g;

let filesChanged = 0;
let linkCount = 0;

for (const file of await walk(PAGES)) {
  const dir = pageDir(file);
  const before = await readFile(file, "utf8");
  let after = before.replace(LINK_RE, (m, text, url) => {
    if (!isRelative(url)) return m;
    linkCount += 1;
    return `[${text}](${resolveLink(dir, url)})`;
  });
  after = after.replace(HTML_HREF_RE, (m, q, url) => {
    if (!isRelative(url)) return m;
    linkCount += 1;
    return `href=${q}${resolveLink(dir, url)}${q}`;
  });
  // Don't touch <img src=> — those use /images/... and Next handles them via Image pipeline anyway.
  if (after !== before) {
    await writeFile(file, after);
    filesChanged += 1;
  }
}

console.log(`Rewrote ${linkCount} relative links in ${filesChanged} files`);
