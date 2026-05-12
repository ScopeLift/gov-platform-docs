#!/usr/bin/env node
// One-off: convert <figure><img></figure> in existing pages/*.mdx to markdown image syntax
// so Next.js applies basePath via its image pipeline.
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const REPO = resolve(new URL("..", import.meta.url).pathname);
const PAGES = join(REPO, "pages");

const FIGURE_RE =
  /<figure>\s*<img\s+src="([^"]+)"(?:\s+alt="([^"]*)")?[^>]*\/?>(?:\s*<figcaption>([\s\S]*?)<\/figcaption>)?\s*<\/figure>/g;

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

function captionText(html) {
  return html
    .replace(/<\/?p>/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

let touched = 0;
let conversions = 0;
for (const f of await walk(PAGES)) {
  const before = await readFile(f, "utf8");
  let count = 0;
  const after = before.replace(FIGURE_RE, (_m, src, alt = "", caption = "") => {
    count += 1;
    const text = captionText(caption) || alt || "";
    return `![${text}](${src})`;
  });
  if (count > 0) {
    await writeFile(f, after);
    touched += 1;
    conversions += count;
  }
}
console.log(`Converted ${conversions} figures in ${touched} files`);
