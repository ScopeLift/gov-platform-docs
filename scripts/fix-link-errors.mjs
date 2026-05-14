#!/usr/bin/env node
// One-off cleanup pass for the lychee link errors:
//
// (a) Strip every link wrapper that points at GitBook's "/broken/pages/<slug>"
//     placeholder. GitBook leaves these behind when the target page was
//     deleted in the source space, so we can't repoint them — just unwrap.
//
// (b) Convert self-page absolute-URL links (where the URL path matches the
//     containing file's own path) to bare fragment references (#anchor).
//     These were emitted by GitBook's "mention" feature. Nextra renders them
//     as normal links, and lychee can't validate them through trailingSlash
//     routing — but a bare fragment works in both the browser and lychee.
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve, relative } from "node:path";

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

function pageUrlPath(absPath) {
  // /repo/pages/A/B/C.mdx -> /A/B/C
  const rel = relative(PAGES, absPath).replace(/\.mdx$/, "");
  return "/" + rel;
}

let brokenStripped = 0;
let selfFragsRewritten = 0;
const filesChanged = new Set();

for (const file of await walk(PAGES)) {
  const before = await readFile(file, "utf8");
  let after = before;
  const ownPath = pageUrlPath(file);

  // (a) Strip /broken/pages/<slug> links. Match both bare and with title attr.
  after = after.replace(
    /\[([^\]]+)\]\(\/broken\/pages\/[^)\s]+(?:\s+"[^"]*")?\)/g,
    (_m, text) => {
      brokenStripped += 1;
      return text;
    }
  );

  // (b) Self-page absolute-URL fragments -> bare fragments.
  // Match [text](<ownPath>#frag) or [text](<ownPath>/#frag) optionally with " "title"".
  const selfRe = new RegExp(
    `\\[([^\\]]+)\\]\\(${ownPath.replace(/[/]/g, "\\/")}\\/?(#[^)\\s]+)(\\s+"[^"]*")?\\)`,
    "g"
  );
  after = after.replace(selfRe, (_m, text, frag) => {
    selfFragsRewritten += 1;
    return `[${text}](${frag})`;
  });

  if (after !== before) {
    await writeFile(file, after);
    filesChanged.add(file);
  }
}

console.log(`Stripped ${brokenStripped} /broken/pages/ links`);
console.log(`Rewrote ${selfFragsRewritten} self-page absolute fragments to relative`);
console.log(`Touched ${filesChanged.size} files`);
