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
  banner: {
    key: "docs-revamp-2026",
    dismissible: false,
    content: (
      <>
        These docs are being revamped as part of the platform{" "}
        <a
          className="prose-link"
          href="https://scopelift.co/blog/scopelift-tally-operation"
          target="_blank"
          rel="noopener noreferrer"
        >
          transition
        </a>{" "}
        and may be out of date. Reach out to{" "}
        <a
          className="prose-link"
          href="https://www.tally.xyz/support"
          target="_blank"
          rel="noopener noreferrer"
        >
          support
        </a>{" "}
        if assistance is needed.
      </>
    ),
  },
  logo: <span style={{ fontWeight: 600 }}>Tally Docs</span>,
  docsRepositoryBase:
    "https://github.com/withtally/gov-platform-docs/tree/main",
  editLink: { component: null },
  feedback: { content: null },
  footer: {
    content: `© ${new Date().getFullYear()} Tally`,
  },
  search: { placeholder: "Search docs..." },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
    autoCollapse: true,
  },
  toc: { float: true },
  darkMode: true,
  nextThemes: { defaultTheme: "system" },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:title" content="Tally Docs" />
      {/* Privacy-friendly analytics by Plausible */}
      <script
        async
        src="https://plausible.io/js/pa-b5cBh6SFnScNFjraTUEZX.js"
      />
      <script
        dangerouslySetInnerHTML={{
          __html:
            "window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()",
        }}
      />
    </>
  ),
};

export default config;
