import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// GITHUB_PAGES=1 builds a static copy for GitHub Pages: every page is pre-rendered
// to HTML under /savannah-loan-system/. Without it, builds keep the Nitro
// (Cloudflare) server bundle that Lovable deploys.
const githubPages = process.env.GITHUB_PAGES === "1";
const base = githubPages ? "/savannah-loan-system/" : "/";

export default defineConfig({
  nitro: githubPages ? false : true,
  tanstackStart: githubPages
    ? {
        router: { basepath: base },
        prerender: { enabled: true, crawlLinks: true, autoSubfolderIndex: true },
        spa: { enabled: true },
      }
    : {},
  vite: {
    base,
    plugins: [],
    // Pre-rendering starts a local preview server; pin it to IPv4 so it also runs where IPv6 is unavailable.
    preview: { host: "127.0.0.1" },
  },
});
