export type RouteLocale = 'es' | 'en' | 'pl';

export const routeLocales: RouteLocale[] = ['es', 'en', 'pl'];
export const routeDefaultLocale: RouteLocale = 'en';

/**
 * Localized slugs for every translated route, keyed by a stable route id.
 *
 * Kept in its own dependency-free module so `astro.config.mjs` can import it
 * to build the sitemap's hreflang alternates without pulling in the whole
 * translation catalogue.
 */
export const routeSlugs = {
  researches: { es: 'investigaciones', en: 'researches', pl: 'badania' },
  privacy: { es: 'privacidad', en: 'privacy', pl: 'prywatnosc' },
  cookies: { es: 'cookies', en: 'cookies', pl: 'cookies' },
  legal: { es: 'aviso-legal', en: 'legal-notice', pl: 'nota-prawna' },
  terms: { es: 'terminos', en: 'terms', pl: 'regulamin' },
  preferences: { es: 'preferencias', en: 'preferences', pl: 'preferencje' },
} as const satisfies Record<string, Record<RouteLocale, string>>;

export type RouteId = keyof typeof routeSlugs;

/** Translate a single path segment from one locale to another, if it is a known route. */
export function translateSlug(slug: string, from: RouteLocale, to: RouteLocale): string {
  const entry = Object.values(routeSlugs).find(r => r[from] === slug);
  return entry ? entry[to] : slug;
}
