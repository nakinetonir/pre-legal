import { getTemplate } from "./templates";
import { countryLabel } from "@/lib/nda/countries";
import { formatLegalDate } from "@/lib/nda/formatDate";
import type { Locale } from "@/lib/i18n/locale";
import { getUiDictionary } from "@/lib/i18n/ui";
import type { GenericDocumentTypeId } from "@/lib/documents/types";
import type { GenericFormValues } from "./types";

export type TokenKey = "PURPOSE" | "EFFECTIVE_DATE" | "GOVERNING_LAW" | "JURISDICTION";

export type TokenState = { text: string; isPlaceholder: boolean };

function state(rawValue: string, placeholderLabel: string): TokenState {
  const trimmed = rawValue.trim();
  return trimmed.length > 0
    ? { text: trimmed, isPlaceholder: false }
    : { text: `[${placeholderLabel}]`, isPlaceholder: true };
}

/** Resolves the 4 shared generic-document tokens, live as the chat fills in the form. */
export function resolveTokens(
  values: GenericFormValues,
  locale: Locale
): Record<TokenKey, TokenState> {
  const placeholders = getUiDictionary(locale).genericDocument.placeholders;

  return {
    PURPOSE: state(values.purpose, placeholders.purpose),
    EFFECTIVE_DATE: state(formatLegalDate(values.effectiveDate, locale), placeholders.effectiveDate),
    GOVERNING_LAW: state(countryLabel(values.governingLawCountry, locale), placeholders.governingLaw),
    JURISDICTION: state(values.jurisdiction, placeholders.jurisdiction),
  };
}

/** Escapes only what's needed to keep interpolated text literal inside HTML. */
function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * Standard Terms markdown (always English - AG-64's 8 generic types have no
 * per-locale body) with the 4 shared tokens substituted for raw HTML, same
 * rendering convention as the NDA/CSA/Pilot modules.
 */
export function fillStandardTermsHtml(
  documentType: GenericDocumentTypeId,
  values: GenericFormValues,
  locale: Locale
): string {
  const template = getTemplate(documentType);
  const tokens = resolveTokens(values, locale);
  return template.STANDARD_TERMS_TEMPLATE.replace(/\{\{(\w+)\}\}/g, (match, key: string) => {
    const token = tokens[key as TokenKey];
    if (!token) return match;
    const escaped = escapeHtml(token.text);
    return token.isPlaceholder
      ? `<span class="nda-token nda-token--empty">${escaped}</span>`
      : `<strong class="nda-token">${escaped}</strong>`;
  });
}
