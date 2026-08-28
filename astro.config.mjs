import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import { routeLocales, routeSlugs, translateSlug } from "./src/i18n/routes";
import { buildLastmodMap } from "./scripts/lastmod.mjs";

const SITE = "https://baldurion.com";
const DEFAULT_LOCALE = "en";
const HREFLANG = { es: "es-ES", en: "en-US", pl: "pl-PL" };

/** Utility pages with no search intent. Crawling them only spends budget. */
const EXCLUDED_ROUTES = new Set(Object.values(routeSlugs.preferences));

const LASTMOD = buildLastmodMap();

/** Split a URL into its locale and its unprefixed slug (`""` for a home page). */
function parseRoute(url) {
  const segments = new URL(url).pathname.split("/").filter(Boolean);
  const locale = routeLocales.includes(segments[0]) ? segments[0] : DEFAULT_LOCALE;
  const slug = (locale === DEFAULT_LOCALE ? segments[0] : segments[1]) ?? "";
  return { locale, slug };
}

function localizedURL(slug, from, to) {
  const prefix = to === DEFAULT_LOCALE ? "" : `${to}/`;
  const translated = slug ? `${translateSlug(slug, from, to)}/` : "";
  return `${SITE}/${prefix}${translated}`;
}

/** Drop utility pages from the sitemap. They stay crawlable, they just aren't advertised. */
function shouldIndex(page) {
  return !EXCLUDED_ROUTES.has(parseRoute(page).slug);
}

/**
 * @astrojs/sitemap pairs translations by matching identical slugs, so routes like
 * /researches/ ↔ /es/investigaciones/ come out with no alternates at all, and it
 * never emits x-default. Rebuild `links` for every page, and attach the real
 * lastmod taken from git history.
 */
function serializeEntry(item) {
  const { locale, slug } = parseRoute(item.url);
  const lastmod = LASTMOD.get(new URL(item.url).pathname);

  return {
    ...item,
    ...(lastmod ? { lastmod } : {}),
    links: [
      ...routeLocales.map(target => ({
        lang: HREFLANG[target],
        url: localizedURL(slug, locale, target),
      })),
      // Tells Google which version to serve when no language matches the user.
      { lang: "x-default", url: localizedURL(slug, locale, DEFAULT_LOCALE) },
    ],
  };
}

export default defineConfig({
  site: SITE,
  output: "static",
  trailingSlash: "always",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: DEFAULT_LOCALE,
        locales: {
          es: "es-ES",
          en: "en-US",
          pl: "pl-PL",
        },
      },
      filter: shouldIndex,
      serialize: serializeEntry,
    }),
  ],
  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: ["es", "en", "pl"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
