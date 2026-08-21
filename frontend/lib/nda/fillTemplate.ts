import { getTemplate } from "./templates";
import { countryLabel } from "./countries";
import { formatLegalDate } from "./formatDate";
import { localeForCountry } from "@/lib/i18n/locale";
import { getUiDictionary } from "@/lib/i18n/ui";
import type { NdaFormValues } from "./types";

export type TokenKey =
  | "PURPOSE"
  | "EFFECTIVE_DATE"
  | "MNDA_TERM"
  | "TERM_OF_CONFIDENTIALITY"
  | "GOVERNING_LAW"
  | "JURISDICTION";

export type TokenState = { text: string; isPlaceholder: boolean };

function state(rawValue: string, placeholderLabel: string): TokenState {
  const trimmed = rawValue.trim();
  return trimmed.length > 0
    ? { text: trimmed, isPlaceholder: false }
    : { text: `[${placeholderLabel}]`, isPlaceholder: true };
}

/**
 * Resolves every cover-page token to its display text, live as the form is
 * edited. The active locale (AG-79) is derived from the selected "Governing
 * Law" country, so the legal phrasing, dates and placeholder labels are all
 * consistent with one another.
 */
export function resolveTokens(
  values: NdaFormValues
): Record<TokenKey, TokenState> {
  const locale = localeForCountry(values.governingLawCountry);
  const template = getTemplate(locale);
  const placeholders = getUiDictionary(locale).document.placeholders;

  return {
    PURPOSE: state(values.purpose, placeholders.purpose),
    EFFECTIVE_DATE: state(
      formatLegalDate(values.effectiveDate, locale),
      placeholders.effectiveDate
    ),
    MNDA_TERM: state(template.describeMndaTerm(values.mndaTermYears), ""),
    TERM_OF_CONFIDENTIALITY: state(
      template.describeConfidentiality(values.confidentialityYears),
      ""
    ),
    GOVERNING_LAW: state(
      countryLabel(values.governingLawCountry, locale),
      placeholders.governingLaw
    ),
    JURISDICTION: state(values.jurisdiction, placeholders.jurisdiction),
  };
}

/** Escapes only what's needed to keep interpolated text literal inside HTML. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Standard Terms markdown with cover-page tokens substituted for raw HTML
 * (bold for a filled value, a dimmed placeholder for an empty one) so the
 * preview updates live, field by field, as the user types. The template
 * itself is picked by the locale derived from the selected country (AG-80).
 */
export function fillStandardTermsHtml(values: NdaFormValues): string {
  const locale = localeForCountry(values.governingLawCountry);
  const template = getTemplate(locale);
  const tokens = resolveTokens(values);
  return template.STANDARD_TERMS_TEMPLATE.replace(
    /\{\{(\w+)\}\}/g,
    (match, key: string) => {
      const token = tokens[key as TokenKey];
      if (!token) return match;
      const escaped = escapeHtml(token.text);
      return token.isPlaceholder
        ? `<span class="nda-token nda-token--empty">${escaped}</span>`
        : `<strong class="nda-token">${escaped}</strong>`;
    }
  );
}
