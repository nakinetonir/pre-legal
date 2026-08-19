/**
 * Locale architecture for the Mutual NDA product (AG-66/AG-67).
 *
 * One locale drives both the UI copy (lib/i18n/ui) and the legal template
 * body (lib/nda/templates) for a given "Governing Law" country, so the form,
 * the live preview and the exported .docx always show the same language.
 *
 * Belgium (BE) is multilingual (fr/nl/de) with no single official app
 * language; we default it to Dutch (nl) alongside the Netherlands, per the
 * product decision on AG-76.
 */
export const SUPPORTED_LOCALES = ["en", "es", "fr", "de", "it", "pt", "nl"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

/** English is the language the Common Paper Mutual NDA standard is written in. */
export const DEFAULT_LOCALE: Locale = "en";

const COUNTRY_LOCALE: Record<string, Locale> = {
  ES: "es",
  MX: "es",
  FR: "fr",
  DE: "de",
  IT: "it",
  PT: "pt",
  NL: "nl",
  BE: "nl",
  IE: "en",
  GB: "en",
  US: "en",
};

/** Resolves the active locale for a "Governing Law" country code, defaulting to English. */
export function localeForCountry(countryCode: string): Locale {
  return COUNTRY_LOCALE[countryCode] ?? DEFAULT_LOCALE;
}
