# Cactus Docs

Source for the Cactus documentation site. Built with [Nextra](https://nextra.site) (Next.js + MDX) and deployed to GitHub Pages.

## Development

Requires Node and pnpm (pinned via Volta in `package.json`).

```sh
pnpm install
pnpm dev          # local server on http://localhost:3000
pnpm build        # static export to ./out
```

## Editing content

All pages live under `pages/`. Files are MDX — standard Markdown plus a small set of components:

- `<Callout type="info|warning|error|default">` for callouts
- `<Embed url="..." />` for YouTube/Loom/Drive embeds
- `<Steps>` and `<Columns>`/`<Column>` for layout
- Standard `[text](slug)` for in-tab navigation; external `https://` links automatically open in a new tab via `components/link.tsx`

Sidebar navigation is controlled per directory by `_meta.js` files.

Images live in `public/images/`. Reference them as `/images/<filename>`.

## Contributing

1. Open a PR with your changes
2. CI runs the build and a link check — fix any failures
3. On merge to `main`, the site redeploys automatically via `.github/workflows/deploy.yml`

See `STYLEGUIDE.md` for writing conventions.

## Migration scripts

Under `scripts/`. These were used to convert the previous GitBook export to Nextra. They're kept in the repo for traceability and aren't part of the runtime build.
