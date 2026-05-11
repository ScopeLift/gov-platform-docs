import type { DocsThemeConfig } from "nextra-theme-docs";
import { Link } from "./components/link";
import { Embed } from "./components/embed";
import { Columns, Column } from "./components/columns";

const config: DocsThemeConfig = {
  components: {
    a: Link,
    Embed,
    Columns,
    Column,
  } as never,
  logo: <span style={{ fontWeight: 600 }}>Tally Docs</span>,
  project: {
    link: "https://github.com/withtally/gov-platform-docs",
  },
  docsRepositoryBase:
    "https://github.com/withtally/gov-platform-docs/tree/main",
  footer: {
    content: `© ${new Date().getFullYear()} Tally`,
  },
  search: { placeholder: "Search docs..." },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  toc: { float: true },
  darkMode: true,
  nextThemes: { defaultTheme: "system" },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:title" content="Tally Docs" />
    </>
  ),
};

export default config;
