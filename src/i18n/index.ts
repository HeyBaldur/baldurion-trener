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
