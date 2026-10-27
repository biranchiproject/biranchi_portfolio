import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { buildJsonLd, buildMeta, findRoute, normalizeSiteUrl } from "@/seo/site";

const SITE_URL = normalizeSiteUrl(import.meta.env.VITE_SITE_URL);

const upsert = (selector: string, create: () => HTMLElement, apply: (el: HTMLElement) => void) => {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  apply(el);
};

const setMeta = (attr: "name" | "property", key: string, content: string) =>
  upsert(
    `meta[${attr}="${key}"]`,
    () => {
      const m = document.createElement("meta");
      m.setAttribute(attr, key);
      return m;
    },
    (el) => el.setAttribute("content", content)
  );

/** Keeps title, meta tags, canonical and JSON-LD in sync with the current route. */
const SeoManager = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const route = findRoute(pathname);
    const meta = buildMeta(route, SITE_URL);

    document.title = meta.title;
    Object.entries(meta.names).forEach(([k, v]) => setMeta("name", k, v));
    Object.entries(meta.properties).forEach(([k, v]) => setMeta("property", k, v));

    upsert(
      'link[rel="canonical"]',
      () => {
        const l = document.createElement("link");
        l.rel = "canonical";
        return l;
      },
      (el) => el.setAttribute("href", meta.canonical)
    );
    document.head
      .querySelectorAll('link[rel="alternate"][hreflang]')
      .forEach((el) => el.setAttribute("href", meta.canonical));

    upsert(
      "#seo-jsonld",
      () => {
        const s = document.createElement("script");
        s.id = "seo-jsonld";
        s.type = "application/ld+json";
        return s;
      },
      (el) => {
        el.textContent = JSON.stringify(buildJsonLd(route, SITE_URL));
      }
    );
  }, [pathname]);

  return null;
};

export default SeoManager;
