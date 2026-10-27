/**
 * Single source of truth for SEO, AEO and GEO.
 *
 * Used in two places:
 *  - the browser (SeoManager) to update <head> on client-side navigation
 *  - vite.config.ts at build time to pre-render one static HTML file per route,
 *    plus sitemap.xml, robots.txt and llms.txt
 *
 * Keep this file free of the "@" alias, import.meta.env and browser APIs so the
 * Vite config can import it.
 */

export const DEFAULT_SITE_URL = "https://my-portfolio-6ie.pages.dev";

export const normalizeSiteUrl = (url?: string) => (url || DEFAULT_SITE_URL).trim().replace(/\/+$/, "");

export const PERSON = {
  name: "Biranchi Narayan Sahoo",
  givenName: "Biranchi Narayan",
  familyName: "Sahoo",
  shortName: "Biranchi",
  alternateNames: ["Biranchi", "Biranchi Sahoo", "Biranchi Narayan", "Biranchi N. Sahoo", "B. N. Sahoo"],
  jobTitle: "Freelance Developer",
  headline: "Freelance Developer at StudentLancer · Cybersecurity Enthusiast · AI Agent Developer · Full Stack Developer",
  email: "sahoobiranchi8249@gmail.com",
  telephone: "+91-8249735998",
  locality: "Bhubaneswar",
  region: "Odisha",
  country: "India",
  countryCode: "IN",
  image: "/biranchi-narayan-sahoo.jpg",
  ogImage: "/og-image.jpg",
  sameAs: [
    "https://www.linkedin.com/in/biranchisahoo/",
    "https://github.com/biranchiproject",
    "https://www.instagram.com/biranchi._.sahoo/",
  ],
  worksFor: { name: "StudentLancer", url: "https://www.studentlancer.in/" },
  education: [
    {
      name: "GIET Bhubaneswar",
      credential: "Bachelor of Technology (B.Tech)",
      status: "Currently pursuing",
      locality: "Bhubaneswar",
    },
    {
      name: "Bhubanananda Odisha School of Engineering (BOSE), Cuttack",
      credential: "Diploma in Computer Science Engineering",
      status: "Completed",
      locality: "Cuttack",
    },
  ],
  knowsAbout: [
    "Cybersecurity",
    "Ethical Hacking",
    "Penetration Testing",
    "Web Application Security",
    "Network Security",
    "Nmap",
    "Wireshark",
    "Bug Bounty",
    "AI Agent Development",
    "Large Language Models",
    "RAG Systems",
    "Voice AI Assistants",
    "Workflow Automation",
    "Full Stack Development",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "React Native",
    "UI/UX Design",
    "Figma",
    "Docker",
    "CI/CD",
    "Technical SEO",
  ],
  projects: [
    {
      name: "Hacker Store",
      url: "https://hacker-store.pages.dev/",
      description:
        "A cyber-themed app store platform with a hacker-style UI, dark interface, secure download system and categorized applications.",
    },
    {
      name: "Sona Store",
      url: "https://sona-store.pages.dev/",
      description:
        "A dynamic app store platform with a large application library, seamless downloads and a modern, Play Store-like interface.",
    },
  ],
};

const BIO =
  "Biranchi Narayan Sahoo (also known as Biranchi) is a freelance developer from Bhubaneswar, Odisha, India. " +
  "Biranchi takes on client projects through StudentLancer, a digital studio that designs and ships websites, products and brands, " +
  "and handles each one personally — discovery, design, engineering, testing and a complete, error-free handover. " +
  "Biranchi is a cybersecurity enthusiast with hands-on experience in web application security, network analysis (Nmap, Wireshark) " +
  "and ethical hacking fundamentals, and builds AI-powered systems: AI agents, RAG-based tools, voice assistants and automation. " +
  "Biranchi is currently pursuing a B.Tech at GIET Bhubaneswar after completing a Diploma in Computer Science Engineering at BOSE, Cuttack.";

export const FAQ: { q: string; a: string }[] = [
  {
    q: "Who is Biranchi Narayan Sahoo?",
    a: BIO,
  },
  {
    q: "What does Biranchi Narayan Sahoo do?",
    a:
      "Biranchi Narayan Sahoo is a freelance developer at StudentLancer. Biranchi builds secure websites and web apps (React, Next.js, full stack), " +
      "AI agents and automation tools, and mobile apps, and applies cybersecurity practices — web application security, penetration testing " +
      "and network analysis — to every project delivered.",
  },
  {
    q: "Where is Biranchi Narayan Sahoo from?",
    a: "Biranchi Narayan Sahoo is based in Bhubaneswar, Odisha, India. Biranchi studied Computer Science Engineering in Cuttack and is now pursuing a B.Tech at GIET Bhubaneswar.",
  },
  {
    q: "Is Biranchi Sahoo associated with StudentLancer?",
    a: "Yes. Biranchi Sahoo works as a freelance developer with StudentLancer (studentlancer.in), taking client projects from the first call to the final handover.",
  },
  {
    q: "What projects has Biranchi Narayan Sahoo built?",
    a:
      "Public projects by Biranchi include Hacker Store (hacker-store.pages.dev), a cyber-themed app store with a secure download system, and " +
      "Sona Store (sona-store.pages.dev), a Play Store-style app store platform — along with client websites delivered through StudentLancer.",
  },
  {
    q: "How can I contact or hire Biranchi Narayan Sahoo?",
    a:
      "You can email Biranchi Narayan Sahoo at sahoobiranchi8249@gmail.com, call +91 8249735998, connect on LinkedIn (linkedin.com/in/biranchisahoo), " +
      "or use the contact form on the official portfolio website.",
  },
];

export interface RouteSeo {
  path: string;
  /** Breadcrumb / nav label */
  label: string;
  title: string;
  description: string;
  keywords: string[];
  /** Static, crawlable heading and paragraphs pre-rendered into the page before React loads */
  heading: string;
  body: string[];
  bullets?: string[];
  noindex?: boolean;
  priority?: number;
  changefreq?: "weekly" | "monthly" | "yearly";
}

const NAME_KEYWORDS = [
  "Biranchi Narayan Sahoo",
  "Biranchi Sahoo",
  "Biranchi",
  "Biranchi Narayan",
  "Biranchi Sahoo portfolio",
  "Biranchi Narayan Sahoo Odisha",
];

export const ROUTES: RouteSeo[] = [
  {
    path: "/",
    label: "Home",
    title: "Biranchi Narayan Sahoo — Freelance Developer, Cybersecurity & AI | Official Portfolio",
    description:
      "Official portfolio of Biranchi Narayan Sahoo (Biranchi), freelance developer at StudentLancer from Bhubaneswar, Odisha. Cybersecurity, AI agents, full stack web development and error-free project delivery.",
    keywords: [
      ...NAME_KEYWORDS,
      "Biranchi Sahoo Bhubaneswar",
      "Biranchi Sahoo StudentLancer",
      "freelance developer Odisha",
      "cybersecurity enthusiast Bhubaneswar",
      "AI agent developer India",
      "full stack developer Bhubaneswar",
    ],
    heading: "Biranchi Narayan Sahoo — Freelance Developer, Cybersecurity Enthusiast & AI Developer",
    body: [BIO],
    bullets: [
      "Freelance developer at StudentLancer — client projects owned end to end",
      "Security-first development: web application security, penetration testing, network analysis",
      "AI agents, RAG systems, voice assistants and workflow automation",
      "Error-free delivery and a complete client handover with post-launch support",
    ],
    priority: 1.0,
    changefreq: "weekly",
  },
  {
    path: "/student-lancer",
    label: "Student Lancer",
    title: "Biranchi Narayan Sahoo at StudentLancer — Freelance Developer",
    description:
      "How Biranchi Narayan Sahoo works as a freelance developer with StudentLancer: web engineering, product design, mobile apps, AI automation and DevOps — tested, error-free and handed over complete.",
    keywords: [...NAME_KEYWORDS, "StudentLancer", "Biranchi Sahoo StudentLancer", "freelance developer StudentLancer", "studentlancer.in"],
    heading: "Biranchi Narayan Sahoo at StudentLancer",
    body: [
      "StudentLancer is a digital studio where emerging talent designs and ships world-class software. Biranchi Narayan Sahoo takes on client projects there as a freelance developer and handles each project personally.",
      "The process: Discover the client's goal and scope, Design the UI and brand direction, Build clean and secure code with progress shared at every milestone, Launch after full testing, and Evolve the product with post-launch support.",
    ],
    bullets: [
      "Web engineering — fast Next.js and React websites built to rank well",
      "Product & brand design — UI/UX systems and brand identity",
      "Mobile applications — cross-platform iOS and Android with React Native",
      "AI & automation — LLM integrations, AI agents and workflow automation",
      "Cloud & DevOps — Docker, CI/CD and reliable infrastructure",
      "Zero-error delivery, full QA & security check, complete client handover",
    ],
    priority: 0.9,
    changefreq: "monthly",
  },
  {
    path: "/services",
    label: "Services & Skills",
    title: "Services & Skills — Biranchi Narayan Sahoo | Web, AI & Security",
    description:
      "Services and skills offered by Biranchi Narayan Sahoo: secure web development, AI agent development, custom AI tools, RAG systems, voice AI assistants, ethical hacking and web application security.",
    keywords: [...NAME_KEYWORDS, "hire Biranchi Sahoo", "AI agent development services", "secure web development", "cybersecurity services Odisha"],
    heading: "Services & Skills of Biranchi Narayan Sahoo",
    body: [
      "Biranchi Narayan Sahoo offers high-impact security solutions and next-generation AI agent development — built to be secure, scalable and delivered error-free.",
    ],
    bullets: [
      "Secure web development with a security-first mindset",
      "AI agent development with LLMs, APIs and automation",
      "Custom AI tools and workflow automation",
      "RAG-based systems with LLMs and vector databases",
      "Real-time voice AI assistants",
      "Ethical hacking, penetration testing and web application security",
      "Skills: Python, React, TypeScript, Figma, deployment and DevOps",
    ],
    priority: 0.8,
    changefreq: "monthly",
  },
  {
    path: "/cybersecurity",
    label: "Cybersecurity",
    title: "Cybersecurity & Ethical Hacking — Biranchi Narayan Sahoo",
    description:
      "Cybersecurity work of Biranchi Narayan Sahoo: ethical hacking, penetration testing, web application security (XSS, SQL injection), network security with Nmap and Wireshark, and bug bounty research.",
    keywords: [...NAME_KEYWORDS, "Biranchi Sahoo cybersecurity", "ethical hacker Odisha", "penetration testing Bhubaneswar", "bug bounty India"],
    heading: "Cybersecurity — Biranchi Narayan Sahoo",
    body: [
      "Network security, ethical hacking and vulnerability detection are the practices Biranchi Narayan Sahoo brings into every product Biranchi builds.",
      "Biranchi has hands-on experience with network scanning using Nmap — identifying open ports and basic network vulnerabilities — and keeps growing in ethical hacking and vulnerability assessment.",
    ],
    bullets: [
      "Ethical hacking & penetration testing through real-world attack simulations",
      "Web application security against XSS, SQL injection and modern threats",
      "Network security & traffic analysis with Wireshark and Nmap",
      "Bug bounty & responsible disclosure research",
    ],
    priority: 0.8,
    changefreq: "monthly",
  },
  {
    path: "/education",
    label: "Education",
    title: "Education — Biranchi Narayan Sahoo | B.Tech GIET Bhubaneswar, Diploma BOSE Cuttack",
    description:
      "Education of Biranchi Narayan Sahoo: B.Tech (currently pursuing) at GIET Bhubaneswar and Diploma in Computer Science Engineering from BOSE (Bhubanananda Odisha School of Engineering), Cuttack.",
    keywords: [...NAME_KEYWORDS, "Biranchi Sahoo GIET", "Biranchi Sahoo BOSE Cuttack", "GIET Bhubaneswar", "BOSE Cuttack"],
    heading: "Education — Biranchi Narayan Sahoo",
    body: ["The academic journey and qualifications behind the work Biranchi Narayan Sahoo ships."],
    bullets: [
      "Bachelor of Technology (B.Tech) — GIET, Bhubaneswar (currently pursuing)",
      "Diploma in Computer Science Engineering — BOSE (Bhubanananda Odisha School of Engineering), Cuttack (completed)",
    ],
    priority: 0.7,
    changefreq: "yearly",
  },
  {
    path: "/projects",
    label: "My Work",
    title: "Projects & Work — Biranchi Narayan Sahoo",
    description:
      "Projects built by Biranchi Narayan Sahoo, including Hacker Store and Sona Store — React web apps, full stack platforms and client work, from creative design to complex engineering.",
    keywords: [...NAME_KEYWORDS, "Biranchi Sahoo projects", "Hacker Store", "Sona Store", "React projects"],
    heading: "Projects by Biranchi Narayan Sahoo",
    body: ["All the work Biranchi Narayan Sahoo has built, from creative designs to complex engineering."],
    bullets: PERSON.projects.map((p) => `${p.name} — ${p.description}`),
    priority: 0.8,
    changefreq: "monthly",
  },
  {
    path: "/achievements",
    label: "Achievements",
    title: "Achievements & Certifications — Biranchi Narayan Sahoo",
    description:
      "Achievements, certifications and professional milestones of Biranchi Narayan Sahoo in cybersecurity, AI and software development.",
    keywords: [...NAME_KEYWORDS, "Biranchi Sahoo achievements", "Biranchi Sahoo certifications"],
    heading: "Achievements of Biranchi Narayan Sahoo",
    body: ["A collection of the professional milestones and certifications of Biranchi Narayan Sahoo."],
    priority: 0.6,
    changefreq: "monthly",
  },
  {
    path: "/admin",
    label: "Admin",
    title: "Admin — Biranchi Narayan Sahoo",
    description: "Private admin area.",
    keywords: [],
    heading: "Admin",
    body: [],
    noindex: true,
  },
];

export const NOT_FOUND_ROUTE: RouteSeo = {
  path: "",
  label: "Not found",
  title: "Page not found — Biranchi Narayan Sahoo",
  description: "This page does not exist. Visit the portfolio of Biranchi Narayan Sahoo.",
  keywords: [],
  heading: "Page not found",
  body: [],
  noindex: true,
};

export const findRoute = (pathname: string) => {
  const clean = pathname.replace(/\/+$/, "") || "/";
  return ROUTES.find((r) => r.path === clean) ?? NOT_FOUND_ROUTE;
};

export const indexableRoutes = () => ROUTES.filter((r) => !r.noindex);

const pageUrl = (siteUrl: string, path: string) => (path === "/" ? `${siteUrl}/` : `${siteUrl}${path}`);

/** Schema.org graph: Person + WebSite + ProfilePage/WebPage + Breadcrumbs (+ FAQ on home). */
export const buildJsonLd = (route: RouteSeo, siteUrl: string) => {
  const personId = `${siteUrl}/#person`;
  const websiteId = `${siteUrl}/#website`;
  const url = pageUrl(siteUrl, route.path);
  const isHome = route.path === "/";

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Person",
      "@id": personId,
      name: PERSON.name,
      givenName: PERSON.givenName,
      familyName: PERSON.familyName,
      alternateName: PERSON.alternateNames,
      url: `${siteUrl}/`,
      mainEntityOfPage: `${siteUrl}/`,
      image: { "@type": "ImageObject", url: `${siteUrl}${PERSON.image}`, width: 800, height: 800 },
      jobTitle: PERSON.jobTitle,
      description: BIO,
      email: `mailto:${PERSON.email}`,
      telephone: PERSON.telephone,
      nationality: { "@type": "Country", name: PERSON.country },
      address: {
        "@type": "PostalAddress",
        addressLocality: PERSON.locality,
        addressRegion: PERSON.region,
        addressCountry: PERSON.countryCode,
      },
      homeLocation: { "@type": "Place", name: `${PERSON.locality}, ${PERSON.region}, ${PERSON.country}` },
      worksFor: { "@type": "Organization", name: PERSON.worksFor.name, url: PERSON.worksFor.url },
      hasOccupation: {
        "@type": "Occupation",
        name: "Freelance Software Developer",
        occupationLocation: { "@type": "City", name: PERSON.locality },
        skills: PERSON.knowsAbout.join(", "),
      },
      alumniOf: PERSON.education.map((e) => ({
        "@type": "EducationalOrganization",
        name: e.name,
        address: { "@type": "PostalAddress", addressLocality: e.locality, addressRegion: PERSON.region, addressCountry: PERSON.countryCode },
      })),
      hasCredential: PERSON.education.map((e) => ({
        "@type": "EducationalOccupationalCredential",
        name: e.credential,
        credentialCategory: e.credential.startsWith("Diploma") ? "diploma" : "degree",
        recognizedBy: { "@type": "EducationalOrganization", name: e.name },
      })),
      knowsAbout: PERSON.knowsAbout,
      knowsLanguage: ["English", "Hindi", "Odia"],
      sameAs: [...PERSON.sameAs, PERSON.worksFor.url],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: `${siteUrl}/`,
      name: `${PERSON.name} — Official Portfolio`,
      alternateName: ["Biranchi Portfolio", "Biranchi Sahoo Portfolio"],
      description: ROUTES[0].description,
      inLanguage: "en-IN",
      publisher: { "@id": personId },
      author: { "@id": personId },
    },
    {
      "@type": isHome ? "ProfilePage" : "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: route.title,
      description: route.description,
      inLanguage: "en-IN",
      isPartOf: { "@id": websiteId },
      about: { "@id": personId },
      ...(isHome ? { mainEntity: { "@id": personId } } : {}),
      primaryImageOfPage: { "@type": "ImageObject", url: `${siteUrl}${PERSON.ogImage}` },
      breadcrumb: { "@id": `${url}#breadcrumb` },
      dateModified: new Date().toISOString().slice(0, 10),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: PERSON.name, item: `${siteUrl}/` },
        ...(isHome ? [] : [{ "@type": "ListItem", position: 2, name: route.label, item: url }]),
      ],
    },
  ];

  if (isHome) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  if (route.path === "/projects") {
    graph.push({
      "@type": "ItemList",
      "@id": `${url}#projects`,
      name: `Projects by ${PERSON.name}`,
      itemListElement: PERSON.projects.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "WebApplication",
          name: p.name,
          url: p.url,
          description: p.description,
          applicationCategory: "WebApplication",
          operatingSystem: "Web",
          creator: { "@id": personId },
        },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
};

/** Every meta tag the page needs, as plain data (rendered to HTML at build, applied to the DOM at runtime). */
export const buildMeta = (route: RouteSeo, siteUrl: string) => {
  const url = pageUrl(siteUrl, route.path);
  const image = `${siteUrl}${PERSON.ogImage}`;
  const robots = route.noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  return {
    title: route.title,
    canonical: url,
    names: {
      description: route.description,
      keywords: route.keywords.join(", "),
      author: PERSON.name,
      creator: PERSON.name,
      publisher: PERSON.name,
      robots,
      googlebot: robots,
      bingbot: robots,
      "twitter:card": "summary_large_image",
      "twitter:title": route.title,
      "twitter:description": route.description,
      "twitter:image": image,
      "twitter:image:alt": `${PERSON.name} — ${PERSON.jobTitle}`,
      "geo.region": "IN-OR",
      "geo.placename": `${PERSON.locality}, ${PERSON.region}`,
      "geo.position": "20.2961;85.8245",
      ICBM: "20.2961, 85.8245",
    } as Record<string, string>,
    properties: {
      "og:type": route.path === "/" ? "profile" : "website",
      "og:site_name": `${PERSON.name} — Portfolio`,
      "og:title": route.title,
      "og:description": route.description,
      "og:url": url,
      "og:image": image,
      "og:image:secure_url": image,
      "og:image:type": "image/jpeg",
      "og:image:width": "1200",
      "og:image:height": "630",
      "og:image:alt": `${PERSON.name} — ${PERSON.jobTitle}`,
      "og:locale": "en_IN",
      "profile:first_name": PERSON.givenName,
      "profile:last_name": PERSON.familyName,
      "profile:username": "biranchisahoo",
    } as Record<string, string>,
  };
};

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** <head> block for the static HTML files. */
export const renderHead = (route: RouteSeo, siteUrl: string) => {
  const m = buildMeta(route, siteUrl);
  const lines = [
    `<title>${esc(m.title)}</title>`,
    `<link rel="canonical" href="${m.canonical}" />`,
    `<link rel="alternate" hreflang="en" href="${m.canonical}" />`,
    `<link rel="alternate" hreflang="x-default" href="${m.canonical}" />`,
    ...Object.entries(m.names).map(([k, v]) => `<meta name="${k}" content="${esc(v)}" />`),
    ...Object.entries(m.properties).map(([k, v]) => `<meta property="${k}" content="${esc(v)}" />`),
    `<script type="application/ld+json" id="seo-jsonld">${JSON.stringify(buildJsonLd(route, siteUrl)).replace(/</g, "\\u003c")}</script>`,
  ];
  return lines.map((l) => `    ${l}`).join("\n");
};

/**
 * Crawlable HTML placed inside #root. React replaces it on mount, so visitors see
 * the normal app; search engines and AI crawlers that don't run JavaScript still
 * read the real page content and the internal links.
 */
export const renderBody = (route: RouteSeo, siteUrl: string) => {
  const nav = indexableRoutes()
    .map((r) => `<a href="${pageUrl(siteUrl, r.path)}">${esc(r.path === "/" ? PERSON.name : r.label)}</a>`)
    .join(" · ");
  const paragraphs = route.body.map((p) => `<p>${esc(p)}</p>`).join("");
  const bullets = route.bullets?.length ? `<ul>${route.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : "";
  const faq =
    route.path === "/"
      ? `<section><h2>Frequently asked questions about ${esc(PERSON.name)}</h2>${FAQ.map(
          (f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`
        ).join("")}</section>`
      : "";
  const links = [...PERSON.sameAs, PERSON.worksFor.url]
    .map((u) => `<a href="${u}" rel="me noopener">${esc(u.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""))}</a>`)
    .join(" · ");

  return `<div class="seo-prerender" style="max-width:760px;margin:0 auto;padding:96px 20px;font-family:system-ui,sans-serif;line-height:1.6">
      <nav aria-label="Site">${nav}</nav>
      <main><article>
        <h1>${esc(route.heading)}</h1>
        ${paragraphs}${bullets}${faq}
      </article></main>
      <footer>
        <p><strong>${esc(PERSON.name)}</strong> — ${esc(PERSON.headline)}. ${esc(PERSON.locality)}, ${esc(PERSON.region)}, ${esc(PERSON.country)}.</p>
        <p>Email: <a href="mailto:${PERSON.email}">${PERSON.email}</a> · Phone: <a href="tel:+918249735998">+91 8249735998</a></p>
        <p>${links}</p>
      </footer>
    </div>`;
};

export const renderSitemap = (siteUrl: string, lastmod: string) => {
  const urls = indexableRoutes()
    .map(
      (r) => `  <url>
    <loc>${pageUrl(siteUrl, r.path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${r.changefreq ?? "monthly"}</changefreq>
    <priority>${(r.priority ?? 0.5).toFixed(1)}</priority>${
        r.path === "/"
          ? `
    <image:image>
      <image:loc>${siteUrl}${PERSON.image}</image:loc>
      <image:title>${PERSON.name}</image:title>
    </image:image>`
          : ""
      }
  </url>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;
};

/** Explicitly welcome search engines and AI answer engines (GEO), keep the admin area out. */
export const renderRobots = (siteUrl: string) => {
  const bots = [
    "Googlebot",
    "Googlebot-Image",
    "Google-Extended",
    "Bingbot",
    "DuckDuckBot",
    "Slurp",
    "YandexBot",
    "Applebot",
    "Applebot-Extended",
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-SearchBot",
    "Claude-User",
    "anthropic-ai",
    "PerplexityBot",
    "Perplexity-User",
    "CCBot",
    "cohere-ai",
    "meta-externalagent",
    "Amazonbot",
    "Bytespider",
    "Twitterbot",
    "facebookexternalhit",
    "LinkedInBot",
    "WhatsApp",
    "TelegramBot",
    "Discordbot",
  ];
  return `${bots.map((b) => `User-agent: ${b}\nAllow: /\nDisallow: /admin`).join("\n\n")}

User-agent: *
Allow: /
Disallow: /admin

Sitemap: ${siteUrl}/sitemap.xml
`;
};

/** llms.txt — a plain-language profile for AI assistants (ChatGPT, Claude, Perplexity, Gemini). */
export const renderLlmsTxt = (siteUrl: string) => `# ${PERSON.name}

> ${BIO}

## Key facts
- Full name: ${PERSON.name}
- Also known as: ${PERSON.alternateNames.join(", ")}
- Role: ${PERSON.headline}
- Works with: ${PERSON.worksFor.name} (${PERSON.worksFor.url})
- Location: ${PERSON.locality}, ${PERSON.region}, ${PERSON.country}
- Education: ${PERSON.education.map((e) => `${e.credential}, ${e.name} (${e.status.toLowerCase()})`).join("; ")}
- Expertise: ${PERSON.knowsAbout.join(", ")}
- Email: ${PERSON.email}
- Phone: +91 8249735998
- Official website: ${siteUrl}/
- Profiles: ${PERSON.sameAs.join(", ")}

## Pages
${indexableRoutes()
  .map((r) => `- [${r.path === "/" ? "Home" : r.label}](${pageUrl(siteUrl, r.path)}): ${r.description}`)
  .join("\n")}

## Projects
${PERSON.projects.map((p) => `- [${p.name}](${p.url}): ${p.description}`).join("\n")}

## FAQ
${FAQ.map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}
`;
