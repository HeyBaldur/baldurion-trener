import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import { routeLocales, routeSlugs, translateSlug } from "./src/i18n/routes";

const SITE = "https://baldurion.com";
const DEFAULT_LOCALE = "en";
const HREFLANG = { es: "es-ES", en: "en-US", pl: "pl-PL" };

/** Slugs that differ per language — the sitemap integration cannot pair those on its own. */
const LOCALIZED_SLUGS = new Set(
  Object.values(routeSlugs).flatMap(entry => Object.values(entry))
);

/**
 * @astrojs/sitemap pairs translations by matching identical slugs, so routes
 * like /researches/ ↔ /es/investigaciones/ come out with no alternates at all.
 * Rebuild the `links` for exactly those pages.
 */
function withLocalizedAlternates(item) {
  const { pathname } = new URL(item.url);
  const segments = pathname.split("/").filter(Boolean);

  const locale = routeLocales.includes(segments[0]) ? segments[0] : DEFAULT_LOCALE;
  const slug = locale === DEFAULT_LOCALE ? segments[0] : segments[1];

  if (!slug || !LOCALIZED_SLUGS.has(slug)) return item;

  return {
    ...item,
    links: routeLocales.map(target => {
      const prefix = target === DEFAULT_LOCALE ? "" : `${target}/`;
      return {
        lang: HREFLANG[target],
        url: `${SITE}/${prefix}${translateSlug(slug, locale, target)}/`,
      };
    }),
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
      serialize: withLocalizedAlternates,
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
