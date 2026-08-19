import type { Locale } from "@/lib/i18n/locale";
import { DEFAULT_LOCALE } from "@/lib/i18n/locale";

/**
 * Closed catalog of countries for the "Governing Law" field (AG-9).
 *
 * This is a starting list scoped to the jurisdictions the Common Paper
 * Mutual NDA is realistically used under (EU + a few common cross-border
 * counterparties). Pending confirmation from the legal/business team —
 * do not treat this as exhaustive.
 */
export type CountryCode =
  | "ES"
  | "FR"
  | "DE"
  | "IT"
  | "PT"
  | "NL"
  | "IE"
  | "BE"
  | "GB"
  | "US"
  | "MX";

export type CountryOption = {
  code: CountryCode;
  label: string;
};

/** Country names localized per app locale (AG-66), keyed by CountryCode. */
const COUNTRY_NAMES: Record<Locale, Record<CountryCode, string>> = {
  en: {
    ES: "Spain",
    FR: "France",
    DE: "Germany",
    IT: "Italy",
    PT: "Portugal",
    NL: "Netherlands",
    IE: "Ireland",
    BE: "Belgium",
    GB: "United Kingdom",
    US: "United States",
    MX: "Mexico",
  },
  es: {
    ES: "España",
    FR: "Francia",
    DE: "Alemania",
    IT: "Italia",
    PT: "Portugal",
    NL: "Países Bajos",
    IE: "Irlanda",
    BE: "Bélgica",
    GB: "Reino Unido",
    US: "Estados Unidos",
    MX: "México",
  },
  fr: {
    ES: "Espagne",
    FR: "France",
    DE: "Allemagne",
    IT: "Italie",
    PT: "Portugal",
    NL: "Pays-Bas",
    IE: "Irlande",
    BE: "Belgique",
    GB: "Royaume-Uni",
    US: "États-Unis",
    MX: "Mexique",
  },
  de: {
    ES: "Spanien",
    FR: "Frankreich",
    DE: "Deutschland",
    IT: "Italien",
    PT: "Portugal",
    NL: "Niederlande",
    IE: "Irland",
    BE: "Belgien",
    GB: "Vereinigtes Königreich",
    US: "Vereinigte Staaten",
    MX: "Mexiko",
  },
  it: {
    ES: "Spagna",
    FR: "Francia",
    DE: "Germania",
    IT: "Italia",
    PT: "Portogallo",
    NL: "Paesi Bassi",
    IE: "Irlanda",
    BE: "Belgio",
    GB: "Regno Unito",
    US: "Stati Uniti",
    MX: "Messico",
  },
  pt: {
    ES: "Espanha",
    FR: "França",
    DE: "Alemanha",
    IT: "Itália",
    PT: "Portugal",
    NL: "Países Baixos",
    IE: "Irlanda",
    BE: "Bélgica",
    GB: "Reino Unido",
    US: "Estados Unidos",
    MX: "México",
  },
  nl: {
    ES: "Spanje",
    FR: "Frankrijk",
    DE: "Duitsland",
    IT: "Italië",
    PT: "Portugal",
    NL: "Nederland",
    IE: "Ierland",
    BE: "België",
    GB: "Verenigd Koninkrijk",
    US: "Verenigde Staten",
    MX: "Mexico",
  },
};

const COUNTRY_CODES: CountryCode[] = [
  "ES",
  "FR",
  "DE",
  "IT",
  "PT",
  "NL",
  "IE",
  "BE",
  "GB",
  "US",
  "MX",
];

/** Country options for the "Governing Law" select, labeled in the given locale. */
export function governingLawCountries(locale: Locale): CountryOption[] {
  const names = COUNTRY_NAMES[locale];
  return COUNTRY_CODES.map((code) => ({ code, label: names[code] }));
}

/** Default-locale country list, kept for call sites that are not yet locale-aware. */
export const GOVERNING_LAW_COUNTRIES: CountryOption[] =
  governingLawCountries(DEFAULT_LOCALE);

export function countryLabel(code: string, locale: Locale = DEFAULT_LOCALE): string {
  const names = COUNTRY_NAMES[locale];
  return names[code as CountryCode] ?? "";
}
