import type { Locale } from '../i18n/index';
import { locales } from '../i18n/index';

export interface Research {
  /** Stable id, used for keys and analytics. */
  id: string;
  /** Category key shared with `t.categories`. */
  category: 'entrenamiento' | 'nutricion' | 'lesiones' | 'metodologia' | 'ciencia' | 'casos-de-estudio';
  /** ISO date of the last revision, shown in the card meta. */
  date: string;
  /** PDF filename inside `public/docs/`, per locale. Missing locales fall back to English. */
  files: Partial<Record<Locale, string>>;
  /** Card copy, per locale. */
  content: Record<Locale, { title: string; summary: string }>;
}

export const researches: Research[] = [
  {
    id: 'atlas-sequence',
    category: 'metodologia',
    date: '2026-08-28',
    files: {
      en: 'at-seq-en.pdf',
      es: 'at-seq-es.pdf',
      pl: 'at-seq-pl.pdf',
    },
    content: {
      en: {
        title: 'Atlas Sequence',
        summary:
          'Iso-dynamic complex with asymmetric loading and a bilateral finisher: physiological rationale, practical application, and an honest line between what is demonstrated and what is only plausible.',
      },
      es: {
        title: 'Atlas Sequence',
        summary:
          'Complejo iso-dinámico con carga asimétrica y finalización bilateral: fundamentación fisiológica, aplicación práctica y una línea honesta entre lo demostrado y lo solo plausible.',
      },
      pl: {
        title: 'Atlas Sequence',
        summary:
          'Kompleks izo-dynamiczny z obciążeniem asymetrycznym i zakończeniem bilateralnym: podstawy fizjologiczne, zastosowanie praktyczne i uczciwa granica między tym, co udowodnione, a tym, co jedynie prawdopodobne.',
      },
    },
  },
  {
    id: 'creatine',
    category: 'nutricion',
    date: '2026-08-24',
    files: {
      en: 'Creatine.pdf',
      es: 'Creatine-Es.pdf',
      pl: 'Creatine-Pl.pdf',
    },
    content: {
      en: {
        title: 'Creatine monohydrate',
        summary:
          'What the evidence actually says about creatine: mechanism, effective dosing, loading versus maintenance, safety, and the myths that refuse to die.',
      },
      es: {
        title: 'Creatina monohidrato',
        summary:
          'Lo que la evidencia dice realmente sobre la creatina: mecanismo, dosis efectiva, fase de carga frente a mantenimiento, seguridad y los mitos que no terminan de morir.',
      },
      pl: {
        title: 'Monohydrat kreatyny',
        summary:
          'Co naprawdę mówią badania o kreatynie: mechanizm działania, skuteczne dawkowanie, faza ładowania a podtrzymująca, bezpieczeństwo i mity, które nie chcą umrzeć.',
      },
    },
  },
];

export interface ResearchVersion {
  /** Public path to the PDF. */
  href: string;
  /** Language this file is written in. */
  fileLocale: Locale;
  /** Endonym shown on the card badge, so it reads the same in every locale. */
  languageName: string;
}

/** Language names in their own language — identical on every page of the site. */
export const languageNames: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
  pl: 'Polski',
};

/**
 * One entry per translated PDF of the same research. All versions share the
 * card copy; only the language badge and the file differ. The reader's own
 * locale is listed first, the rest keep the site's canonical language order.
 */
export function getResearchVersions(
  research: Research,
  locale: Locale,
  base: string
): ResearchVersion[] {
  const order = [locale, ...locales.filter(l => l !== locale)];

  return order
    .filter((l): l is Locale => Boolean(research.files[l]))
    .map(l => ({
      href: `${base}docs/${research.files[l]}`,
      fileLocale: l,
      languageName: languageNames[l],
    }));
}
