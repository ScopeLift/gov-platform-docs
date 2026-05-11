#!/usr/bin/env node
import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join, relative, resolve, basename } from "node:path";

const REPO = resolve(new URL("..", import.meta.url).pathname);
const PAGES_DIR = join(REPO, "pages");
const MAP_PATH = join(REPO, "scripts", "asset-rename-map.json");

const SKIP_DIRS = new Set([
  "node_modules", ".git", ".next", "out", "public", "scripts",
  "components", ".gitbook", "pages",
]);
const SKIP_ROOT_FILES = new Set(["SUMMARY.md", "STYLEGUIDE.md"]);

const HINT_STYLE_TO_CALLOUT = {
  info: "info",
  warning: "warning",
  danger: "error",
  success: "default",
};

const DROP_FRONTMATTER_KEYS = new Set(["cover", "coverY", "icon", "layout"]);

async function loadAssetMap() {
  const raw = await readFile(MAP_PATH, "utf8");
  return JSON.parse(raw);
}

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (entry.name.endsWith(".md")) {
      const rel = relative(REPO, full);
      if (rel.includes("/") === false && SKIP_ROOT_FILES.has(entry.name)) continue;
      out.push(full);
    }
  }
  return out;
}

function stripFrontmatter(content) {
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { frontmatter: "", body: content };
  return { frontmatter: m[1], body: content.slice(m[0].length) };
}

function rewriteFrontmatter(fm) {
  if (!fm.trim()) return "";
  const lines = fm.split(/\r?\n/);
  const kept = [];
  let dropping = false;
  let dropIndent = 0;
  for (const line of lines) {
    const indentMatch = line.match(/^(\s*)/);
    const indent = indentMatch ? indentMatch[1].length : 0;

    if (dropping) {
      if (line.trim() === "") continue;
      if (indent > dropIndent) continue;
      dropping = false;
    }

    const keyMatch = line.match(/^(\s*)([A-Za-z_][A-Za-z0-9_-]*)\s*:/);
    if (keyMatch && keyMatch[1].length === 0) {
      const key = keyMatch[2];
      if (DROP_FRONTMATTER_KEYS.has(key)) {
        dropping = true;
        dropIndent = indent;
        continue;
      }
    }
    kept.push(line);
  }
  const result = kept.join("\n").trim();
  return result ? `---\n${result}\n---\n` : "";
}

function stripEntities(s) {
  let out = s.replace(/&nbsp;/g, " ");
  out = out.replace(/&#x([0-9a-fA-F]+);/g, (_m, hex) => {
    const cp = parseInt(hex, 16);
    if (cp === 0x20) return "";
    return String.fromCodePoint(cp);
  });
  out = out.replace(/&#(\d+);/g, (_m, dec) => {
    const cp = parseInt(dec, 10);
    if (cp === 32) return "";
    return String.fromCodePoint(cp);
  });
  return out;
}

function transformHints(s) {
  return s.replace(
    /\{%\s*hint\s+style="(info|warning|danger|success)"\s*%\}([\s\S]*?)\{%\s*endhint\s*%\}/g,
    (_m, style, inner) => {
      const type = HINT_STYLE_TO_CALLOUT[style] ?? "default";
      return `<Callout type="${type}">\n${inner.trim()}\n</Callout>`;
    }
  );
}

function prettifyLabel(slug) {
  const base = slug
    .replace(/\.md$/, "")
    .replace(/\/README$/, "")
    .replace(/\/$/, "")
    .split("/").pop() || slug;
  return base
    .split("-")
    .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

function transformContentRefs(s) {
  return s.replace(
    /\{%\s*content-ref\s+url="([^"]+)"\s*%\}\s*\n([\s\S]*?)\n\s*\{%\s*endcontent-ref\s*%\}/g,
    (_m, url, inner) => {
      const linkMatch = inner.match(/\[([^\]]+)\]\([^)]+\)/);
      let label = linkMatch ? linkMatch[1] : url;
      if (/\.md$/.test(label) || label === url) {
        label = prettifyLabel(url);
      }
      const cleanUrl = url.replace(/\.md(#|$)/, "$1");
      return `[${label}](${cleanUrl})`;
    }
  );
}

function transformEmbeds(s) {
  return s.replace(
    /\{%\s*embed\s+url="([^"]+)"\s*%\}(?:\s*\{%\s*endembed\s*%\})?/g,
    (_m, url) => `<Embed url="${url}" />`
  );
}

function transformFileEmbeds(s, assetMap) {
  return s.replace(
    /\{%\s*file\s+src="([^"]+)"\s*%\}/g,
    (_m, src) => {
      const idx = src.indexOf(".gitbook/assets/");
      const repoRel = idx >= 0 ? decodeURIComponent(src.slice(idx)) : src;
      const newRel = assetMap[repoRel];
      const file = basename(repoRel);
      if (newRel) return `[Download ${file}](/${newRel})`;
      return `[Download ${file}](${src})`;
    }
  );
}

function transformColumns(s) {
  let out = s.replace(/\{%\s*columns\s*%\}/g, "<Columns>");
  out = out.replace(/\{%\s*endcolumns\s*%\}/g, "</Columns>");
  out = out.replace(/\{%\s*column\s*%\}/g, "<Column>");
  out = out.replace(/\{%\s*endcolumn\s*%\}/g, "</Column>");
  return out;
}

function transformStepper(s) {
  let out = s.replace(/\{%\s*stepper\s*%\}/g, "<Steps>");
  out = out.replace(/\{%\s*endstepper\s*%\}/g, "</Steps>");
  out = out.replace(/\{%\s*step\s*%\}/g, "");
  out = out.replace(/\{%\s*endstep\s*%\}/g, "");
  return out;
}

function escapeStrayAngleBrackets(s) {
  const lines = s.split("\n");
  let inFence = false;
  return lines
    .map((line) => {
      if (/^\s*```/.test(line)) {
        inFence = !inFence;
        return line;
      }
      if (inFence) return line;
      const codeChunks = [];
      let masked = line.replace(/`[^`]+`/g, (m) => {
        codeChunks.push(m);
        return "@@CODE" + (codeChunks.length - 1) + "@@";
      });
      masked = masked
        .replace(/<(\d)/g, "&lt;$1")
        .replace(/<>/g, "&lt;&gt;")
        .replace(/<(\s)/g, "&lt;$1");
      masked = masked.replace(/@@CODE(\d+)@@/g, (_m, i) => codeChunks[+i]);
      return masked;
    })
    .join("\n");
}

function stripGitbookAnchors(s) {
  return s.replace(
    /\s*<a\s+(?:href="[^"]*"\s+id="[^"]*"|id="[^"]*"\s+href="[^"]*")\s*>\s*<\/a>/g,
    ""
  );
}

function selfCloseVoidTags(s) {
  return s
    .replace(/<br\s*>/gi, "<br />")
    .replace(/<hr\s*>/gi, "<hr />")
    .replace(/<img\s+([^>]*?)\/?>/gi, (_m, attrs) => `<img ${attrs.trim()} />`);
}

function preCodeToFence(s) {
  return s.replace(
    /<pre><code>([\s\S]*?)<\/code><\/pre>/g,
    (_m, body) => {
      const cleaned = body
        .replace(/<\/?strong>/g, "")
        .replace(/<\/?em>/g, "")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"');
      const trimmed = cleaned.replace(/^\n+/, "").replace(/\n+$/, "");
      return "\n```\n" + trimmed + "\n```\n";
    }
  );
}

function rewriteAssetReferences(s, assetMap) {
  const rewriteOne = (raw) => {
    const idx = raw.indexOf(".gitbook/assets/");
    if (idx === -1) return null;
    const repoRel = decodeURIComponent(raw.slice(idx));
    const newRel = assetMap[repoRel];
    return newRel ? `/${newRel}` : null;
  };

  let out = s.replace(
    /(src|href)=("|')([^"']*\.gitbook\/assets\/[^"']+)\2/g,
    (m, attr, q, raw) => {
      const replacement = rewriteOne(raw);
      return replacement ? `${attr}=${q}${replacement}${q}` : m;
    }
  );

  out = out.replace(
    /\]\(<([^>]*\.gitbook\/assets\/[^>]+)>\)/g,
    (m, raw) => {
      const replacement = rewriteOne(raw);
      return replacement ? `](${replacement})` : m;
    }
  );

  out = out.replace(
    /\]\(([^)<\s]*\.gitbook\/assets\/[^)\s]+)\)/g,
    (m, raw) => {
      const replacement = rewriteOne(raw);
      return replacement ? `](${replacement})` : m;
    }
  );

  return out;
}

function rewriteInternalLinks(s) {
  return s.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (m, text, url) => {
      if (/^(?:https?:|mailto:|tel:|#|\/)/i.test(url)) return m;
      const [pathPart, hash = ""] = url.split("#", 2);
      const stripped = pathPart.replace(/\.md$/, "").replace(/\/README$/, "/");
      const finalUrl = hash ? `${stripped}#${hash}` : stripped;
      return `[${text}](${finalUrl})`;
    }
  );
}

function ensureCalloutImport(content) {
  if (!content.includes("<Callout")) return content;
  if (/^import\s+\{[^}]*Callout[^}]*\}\s+from\s+["']nextra\/components["']/m.test(content))
    return content;
  return `import { Callout } from "nextra/components";\n\n${content}`;
}

function ensureStepsImport(content) {
  if (!content.includes("<Steps")) return content;
  if (/^import\s+\{[^}]*Steps[^}]*\}\s+from\s+["']nextra\/components["']/m.test(content))
    return content;
  return `import { Steps } from "nextra/components";\n\n${content}`;
}

function injectImports(body) {
  let out = body;
  out = ensureCalloutImport(out);
  out = ensureStepsImport(out);
  return out;
}

function outputPath(absSource) {
  const rel = relative(REPO, absSource);
  let target = rel.replace(/\.md$/, ".mdx");
  if (basename(target).toLowerCase() === "readme.mdx") {
    target = join(dirname(target), "index.mdx");
  }
  if (target === "index.mdx" || target === relative(REPO, absSource).replace(/\.md$/, ".mdx")) {
    // root README.md -> pages/index.mdx
  }
  return join(PAGES_DIR, target);
}

async function main() {
  const assetMap = await loadAssetMap();
  const mdFiles = await walk(REPO);

  let written = 0;
  for (const src of mdFiles) {
    const raw = await readFile(src, "utf8");
    const { frontmatter, body } = stripFrontmatter(raw);

    let out = body;
    out = preCodeToFence(out);
    out = stripEntities(out);
    out = transformHints(out);
    out = transformContentRefs(out);
    out = transformEmbeds(out);
    out = transformFileEmbeds(out, assetMap);
    out = transformColumns(out);
    out = transformStepper(out);
    out = rewriteAssetReferences(out, assetMap);
    out = rewriteInternalLinks(out);
    out = stripGitbookAnchors(out);
    out = escapeStrayAngleBrackets(out);
    out = selfCloseVoidTags(out);
    out = injectImports(out);

    const newFrontmatter = rewriteFrontmatter(frontmatter);
    const final = newFrontmatter + out;

    const dst = outputPath(src);
    await mkdir(dirname(dst), { recursive: true });
    await writeFile(dst, final);
    written += 1;
  }

  console.log(`Migrated ${written} files into ${relative(REPO, PAGES_DIR)}/`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
