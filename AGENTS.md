# AGENTS.md

Working notes for humans and AI agents contributing to this repo. Read this before making meaningful changes — many decisions here look weird until you understand the history.

## What this is

The Tally documentation site, served at the URL configured in Vercel. Source content lives in `pages/` as MDX. The site is built with **Nextra v3** (Docs theme) on **Next.js 14**, statically exported to `out/`, and hosted on **Vercel**.

This repo was migrated from GitBook in early 2026 — it used to be a one-way sync target of GitBook's editor. The full content tree, asset cleanup, and structural conventions all stem from that migration. There are still cosmetic and editorial rough edges from that process; the site banner currently warns readers that the docs may be out of date.

## Stack

| Layer | Version | Notes |
|---|---|---|
| Node | 24 | Pinned in `package.json` under `volta.node`. Volta picks it up automatically inside the project dir. |
| pnpm | 11 | Pinned same way. Don't use npm or yarn. |
| Next.js | 14.2.x | Pages Router (not App Router). Static export mode (`output: "export"`). |
| Nextra | 3.x | Theme: `nextra-theme-docs`. v4 upgrade tracked in issue #3. |
| React | 18.x | Will move to 19 with the Nextra 4 upgrade. |
| TypeScript | 6.x | |

`pnpm-lock.yaml` is the source of truth for dependency versions. Do not delete it.

## Setup

```sh
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # produces ./out/ (static export)
```

If `node` resolves to a non-24 version, run `volta install node@24` once.

## Repo layout

```
pages/                    All docs content. MDX files + _meta.js for navigation.
  index.mdx               Home page (currently titled "Get started").
  on-chain-operations.mdx Folder index file — see "Folder + index pattern" below.
  on-chain-operations/    Folder contents.
    _meta.js              Sidebar ordering + labels for this folder.
    governance.mdx        Sub-folder index.
    governance/           ...

components/               Custom MDX components used across content.
  link.tsx                Drop-in <a> replacement with internal/external handling.
  embed.tsx               <Embed url="..."/> -> iframe for YouTube/Loom/Drive.
  columns.tsx             <Columns> and <Column> layout primitives.

theme.config.tsx          Nextra theme config: banner, search, sidebar behavior,
                          footer, custom MDX components map, etc.

styles/globals.css        Global CSS overrides (link colors, sidebar styling,
                          banner styling).

public/                   Static assets served at the site root.
  images/                 Content images, with URL-safe kebab-case filenames.

scripts/                  Historical one-off migration scripts. NOT load-bearing
                          for the current site — they were used to convert the
                          GitBook export to Nextra. Kept for traceability.
                          See "History" below.

.github/workflows/
  pr-check.yml            Build + lychee link check on PRs.
                          (No deploy workflow — Vercel handles that.)

next.config.js            Next.js config. Static export, trailing slash, basePath
                          (currently none — Vercel serves at root).

tsconfig.json             TypeScript config. Note: no `baseUrl` or `paths` —
                          they were deprecated in TS 6 and we don't use them.

globals.d.ts              Ambient module declarations for CSS imports.
                          Add image/svg/etc. modules here if needed.
```

## Content authoring

### File and folder layout

Every page is an `.mdx` file inside `pages/`. The URL is the path relative to `pages/`, minus `.mdx`. So `pages/on-chain-operations/governance/multigov.mdx` → `/on-chain-operations/governance/multigov`.

### Folder + index pattern

For a section that has its own landing page **and** contains sub-pages, use a **sibling file** rather than `index.mdx` inside the folder:

```
pages/governance.mdx        <-- landing page content
pages/governance/           <-- subdirectory with the section's children
  _meta.js
  page-a.mdx
  page-b.mdx
```

**Do not** use `pages/governance/index.mdx`. Nextra v3's sidebar logic auto-merges a sibling file + folder of the same name into a single clickable+expandable sidebar entry (the "`withIndexPage`" pattern). The `index.mdx` pattern breaks that and creates a confusing ghost entry.

### Navigation (`_meta.js`)

Sidebar ordering and labels are controlled by `_meta.js` files. One per directory you want to surface in the sidebar.

```js
// pages/governance/_meta.js
export default {
  "page-a": "Page A",
  "page-b": { title: "Page B", display: "hidden" },
  "external-link-x": {
    type: "page",
    href: "https://example.com",
    newWindow: true,
    title: "External"
  }
};
```

- `display: "children"` on a folder entry flattens its children into the parent level (used at top level so each major section's items appear directly under a separator). See `pages/_meta.js`.
- `display: "hidden"` removes a page from the sidebar but keeps it routable.
- A key starting with `--` and an object value with `type: "separator"` renders a bold section header in the sidebar (no link, no expand).

### Linking

**All internal links must be absolute paths**, not relative. Example:

```md
[See the Multigov docs](/on-chain-operations/governance/multigov)
```

Not `[See the Multigov docs](multigov)` or `[See the Multigov docs](../governance/multigov)`. Relative paths break due to Next.js's trailing-slash routing in static export mode — the last path segment gets dropped on resolution. The `scripts/links-to-absolute.mjs` script was used to fix this for the original migration.

External links (anything starting with `http://`, `https://`, `mailto:`, `tel:`) automatically open in a new tab thanks to `components/link.tsx`, which is wired into Nextra via `theme.config.tsx`'s `components` map. Don't add `target="_blank"` by hand in MDX.

Self-page anchor references should use **bare fragments**: `[See section](#section-name)`. Don't write `[See section](/full/path#section-name)` — Nextra's MDX rendering treats those as cross-page nav and the lychee link check can't validate them properly.

### Images

Place content images in `public/images/` and reference them with absolute paths:

```md
![Alt text](/images/some-image.png)
```

Use **markdown image syntax**, not raw `<img>` HTML. Markdown images get processed through Next/Image, which means future image optimization (issue #4) will work. Raw `<img src=>` tags bypass that pipeline.

Filenames should be URL-safe (kebab-case, ASCII only, no spaces or `@`). The migration script renamed the original GitBook assets to follow this convention; new images should match.

### Custom components

Available globally via `theme.config.tsx`'s `components` map:

| Component | Usage |
|---|---|
| `<Callout type="info\|warning\|error\|default">…</Callout>` | Info/warning boxes. From `nextra/components`. |
| `<Steps>…</Steps>` | Numbered steps. From `nextra/components`. |
| `<Embed url="https://..." />` | Auto-detects YouTube/Loom/Google Drive and renders an embedded iframe. From `components/embed.tsx`. |
| `<Columns>…<Column>…</Column>…</Columns>` | Side-by-side layout. From `components/columns.tsx`. |

`Callout` and `Steps` need explicit import lines at the top of any MDX file that uses them (the migration script adds them automatically when migrating). The other components don't need imports — they're registered globally.

### Frontmatter

Only `description` and `hidden` are honored. Everything else (icon, cover, coverY, layout, etc.) was GitBook-specific and gets ignored by Nextra. The migration script stripped these from all pages.

## Styling

Global CSS lives in `styles/globals.css`, imported via `pages/_app.tsx`. It currently handles:

- **Link colors** (`prose-link` class, applied automatically by `components/link.tsx`): blue in both light and dark mode.
- **Sidebar visual hierarchy**: enlarged section separators, indented section items, faint vertical line per section.
- **Top banner**: pale yellow in light mode, amber in dark mode, with a darker bottom border.

Some banner background overrides use `!important` because Nextra's `dark:_bg-[linear-gradient(...)]` rule has higher specificity than our class selector. Don't strip the `!important` without testing.

Theme colors for sidebar / TOC etc. are driven by Nextra's CSS variables (`--nextra-primary-hue`, etc.). Adjust those if you want a global accent change rather than editing individual rules.

## Banner

Edit the `banner.content` JSX in `theme.config.tsx`. It's set to `dismissible: false` deliberately — a "may be out of date" notice should reappear on every visit, not get dismissed once. Change `key` if you want anyone who *did* dismiss it (if you flip dismissibility) to see the new version.

## Deploy

- **Production**: Push to `main` → Vercel auto-builds and deploys.
- **Preview**: Every PR gets a Vercel preview URL — use it to eyeball changes before merge.
- **CI**: PRs run `pnpm build` plus lychee link check (page-level only — fragment checking was disabled because Nextra's auto-generated TOC produces absolute self-page anchors that lychee can't validate).

## Quirks and gotchas

These are non-obvious decisions baked into the repo. Don't "fix" them without understanding why they're there.

- **Static export mode** (`output: "export"`) is on **only** because the CI link check runs against `./out/**/*.html`. Vercel doesn't require it. If we drop it, image optimization works (issue #4), but the link check needs reworking.
- **Active sidebar folder can't be manually collapsed.** This is hardcoded in Nextra v3. We've enabled `sidebar.autoCollapse: true` to at least auto-close *other* folders when navigating, but the chevron on the folder you're currently inside will look broken. Expected. Re-evaluate during the v4 upgrade (see issue #3 comment thread).
- **Lychee fragment checking is off** (`--include-fragments` not passed). Nextra emits absolute URLs for in-page anchors in its TOC, and lychee can't resolve `path/#anchor` to `path/index.html` for fragment lookup. Real bad anchor references will slip through CI; we caught the existing ones during migration but watch for new ones in PR review.
- **No `next-env.d.ts` checked in** — it's gitignored and auto-regenerates. The hand-written `globals.d.ts` is where to add ambient module declarations.
- **Custom MDX components go in `theme.config.tsx`**, not in a root-level `mdx-components.tsx`. The latter is the Nextra v4 / App Router pattern; v3 with Pages Router uses the theme config's `components` field. Will flip when we upgrade.
- **The `scripts/` directory is historical**. Those files were the one-shot migration tools (`migrate-content.mjs`, `build-asset-map.mjs`, `build-meta.mjs`, `promote-folder-indexes.mjs`, `figures-to-markdown.mjs`, `links-to-absolute.mjs`, `strip-index-entries.mjs`, `fix-link-errors.mjs`). They expect the pre-migration GitBook source tree, which no longer exists. They're kept for traceability of how the current state was produced, not for re-running.

## History

- The repo was a GitBook bidirectional-sync target through January 2026. Every pre-migration commit has a `GITBOOK-N: ...` message format.
- In May 2026 the content was migrated to Nextra v3 over a series of mechanical passes (see `scripts/`). Migration covered: GitBook custom blocks → MDX components, asset renames + path rewrites, `SUMMARY.md` → `_meta.js`, frontmatter cleanup, link absolutization.
- `git filter-repo` was used to purge `.gitbook/assets/` from the entire history, shrinking `.git/` from 259 MB to 51 MB.
- The repo was briefly deployed to GitHub Pages, then moved to Vercel. The GitHub Pages workflow was deleted; the `pr-check.yml` workflow stayed.
- The `pre-nextra-migration` tag marks the last commit content-equivalent to the pre-migration state. Useful for spelunking the original GitBook content shape (without the bulky asset blobs).

## Working with the docs

A few collected conventions for ongoing editorial work:

- **Page titles** in the H1 of the file should match the sidebar label in `_meta.js` whenever practical. When they diverge it's confusing.
- **Removing a page**: delete the `.mdx` file, remove its entry from the relevant `_meta.js`, and grep the rest of `pages/` for any internal links to it.
- **Renaming a page**: rename the file, update the key in `_meta.js`, and grep for inbound links. Don't try to add redirects via Next.js config in static-export mode — they don't work.
- **Cross-referencing**: prefer absolute paths (`/foo/bar`) over relative (`../bar`) for the reasons in "Linking" above.

## When you change something

A few things to do reflexively when editing this repo:

1. **Verify locally** (`pnpm dev` or `pnpm build`) before pushing — Vercel preview is great but a local check catches the obvious stuff faster.
2. **Run the link check** if your change touches many links: `pnpm build && lychee --offline --no-progress --root-dir $(pwd)/out --exclude-path node_modules --exclude-path .git './out/**/*.html'`.
3. **Don't reintroduce the patterns the migration scripts cleaned up**: GitBook `{% … %}` blocks, frontmatter cover images, relative-path internal links, `.md` extensions in hrefs, raw `<img>` tags for content images.
4. **Don't put real environment-specific config in committed files** (Vercel project settings, DNS, etc.) — those live in the Vercel dashboard, not the repo.
5. **Update this document if applicable** If you make changes that make the information in this document outdated, update the content here atomically with your changes.
