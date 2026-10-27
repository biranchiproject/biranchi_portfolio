import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";
import {
  PERSON,
  ROUTES,
  normalizeSiteUrl,
  renderBody,
  renderHead,
  renderLlmsTxt,
  renderRobots,
  renderSitemap,
} from "./src/seo/site";

const HEAD = /<!--seo:head:start-->[\s\S]*?<!--seo:head:end-->/;
const BODY = /<!--seo:body:start-->[\s\S]*?<!--seo:body:end-->/;

const injectSeo = (html: string, route: (typeof ROUTES)[number], siteUrl: string) =>
  html
    .replace(HEAD, `<!--seo:head:start-->\n${renderHead(route, siteUrl)}\n    <!--seo:head:end-->`)
    .replace(BODY, `<!--seo:body:start-->${renderBody(route, siteUrl)}<!--seo:body:end-->`);

/**
 * Pre-renders SEO for every route: index.html gets the home page tags, and each inner
 * page gets its own <route>.html (Cloudflare Pages serves /education from education.html).
 * Also writes sitemap.xml, robots.txt, llms.txt, humans.txt and the web manifest.
 */
const seoPlugin = (siteUrl: string): Plugin => {
  let outDir = "dist";
  return {
    name: "portfolio-seo",
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    transformIndexHtml: (html) => injectSeo(html, ROUTES[0], siteUrl),
    closeBundle() {
      const indexPath = path.join(outDir, "index.html");
      if (!fs.existsSync(indexPath)) return;
      const html = fs.readFileSync(indexPath, "utf8");

      for (const route of ROUTES.slice(1)) {
        if (route.noindex) continue;
        fs.writeFileSync(path.join(outDir, `${route.path.slice(1)}.html`), injectSeo(html, route, siteUrl));
      }

      const today = new Date().toISOString().slice(0, 10);
      const write = (file: string, content: string) => fs.writeFileSync(path.join(outDir, file), content);
      write("sitemap.xml", renderSitemap(siteUrl, today));
      write("robots.txt", renderRobots(siteUrl));
      write("llms.txt", renderLlmsTxt(siteUrl));
      write(
        "humans.txt",
        `/* TEAM */\nDeveloper: ${PERSON.name}\nRole: ${PERSON.headline}\nContact: ${PERSON.email}\nFrom: ${PERSON.locality}, ${PERSON.region}, ${PERSON.country}\nLinkedIn: ${PERSON.sameAs[0]}\n\n/* SITE */\nLast update: ${today}\nStandards: HTML5, CSS3, Schema.org\nComponents: React, Vite, Tailwind CSS\n`
      );
      write(
        "site.webmanifest",
        JSON.stringify(
          {
            name: `${PERSON.name} — Portfolio`,
            short_name: PERSON.shortName,
            description: ROUTES[0].description,
            start_url: "/",
            display: "standalone",
            background_color: "#0a0a0a",
            theme_color: "#0a0a0a",
            icons: [
              { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
              { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
            ],
          },
          null,
          2
        )
      );
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const siteUrl = normalizeSiteUrl(env.VITE_SITE_URL);

  return {
    base: "/",
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react(), seoPlugin(siteUrl)].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
