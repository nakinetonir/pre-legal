import type { Locale } from "@/lib/i18n/locale";

/** BCP 47 tag used to format the legal date text for each app locale. */
const DATE_LOCALE_TAG: Record<Locale, string> = {
  en: "en-US",
  es: "es-ES",
  fr: "fr-FR",
  de: "de-DE",
  it: "it-IT",
  pt: "pt-PT",
  nl: "nl-NL",
};

/** Formats an `input[type=date]` value ("YYYY-MM-DD") for the legal text, in the given locale. */
export function formatLegalDate(iso: string, locale: Locale): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!match) return "";
  const [, year, month, day] = match;
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
  return date.toLocaleDateString(DATE_LOCALE_TAG[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
