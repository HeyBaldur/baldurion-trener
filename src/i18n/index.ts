import { es } from './es';
import { en } from './en';
import { pl } from './pl';

export type Locale = 'es' | 'en' | 'pl';

export const translations = { es, en, pl };

export function useTranslations(locale: Locale) {
  return translations[locale] ?? translations.en;
}

export const locales: Locale[] = ['es', 'en', 'pl'];
export const defaultLocale: Locale = 'en';

export function getLocalePath(locale: Locale, path: string = '') {
  if (locale === defaultLocale) {
    return `/${path}`;
  }
  return `/${locale}${path ? `/${path}` : ''}`;
}

/**
 * Localized slugs for every translated route. Keyed by a stable route id so the
 * footer and the language switcher agree on which URL a locale actually serves.
 */
export const routeSlugs = {
  researches: { es: 'investigaciones', en: 'researches', pl: 'badania' },
  privacy: { es: 'privacidad', en: 'privacy', pl: 'prywatnosc' },
  cookies: { es: 'cookies', en: 'cookies', pl: 'cookies' },
  legal: { es: 'aviso-legal', en: 'legal-notice', pl: 'nota-prawna' },
  terms: { es: 'terminos', en: 'terms', pl: 'regulamin' },
  preferences: { es: 'preferencias', en: 'preferences', pl: 'preferencje' },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteId = keyof typeof routeSlugs;

/** Translate a single path segment from one locale to another, if it is a known route. */
export function translateSlug(slug: string, from: Locale, to: Locale): string {
  const entry = Object.values(routeSlugs).find(r => r[from] === slug);
  return entry ? entry[to] : slug;
}

export function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / 200);
}

export const categoryColors: Record<string, string> = {
  entrenamiento: 'bg-[var(--color-accent-lime)] text-[var(--color-text)]',
  nutricion: 'bg-[var(--color-accent-lilac)] text-[var(--color-text)]',
  lesiones: 'bg-orange-200 text-orange-900',
  metodologia: 'bg-sky-200 text-sky-900',
  ciencia: 'bg-emerald-200 text-emerald-900',
  'casos-de-estudio': 'bg-rose-200 text-rose-900',
};
