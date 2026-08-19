import { STANDARD_TERMS_TEMPLATE } from "./standardTermsTemplate";
import { countryLabel } from "./countries";
import { describeConfidentiality, describeMndaTerm } from "./durations";
import { formatLegalDate } from "./formatDate";
import type { NdaFormValues } from "./types";

export type TokenKey =
  | "PURPOSE"
  | "EFFECTIVE_DATE"
  | "MNDA_TERM"
  | "TERM_OF_CONFIDENTIALITY"
  | "GOVERNING_LAW"
  | "JURISDICTION";

export type TokenState = { text: string; isPlaceholder: boolean };

const TOKEN_PLACEHOLDER_LABEL: Record<TokenKey, string> = {
  PURPOSE: "Purpose",
  EFFECTIVE_DATE: "Effective Date",
  MNDA_TERM: "MNDA Term",
  TERM_OF_CONFIDENTIALITY: "Term of Confidentiality",
  GOVERNING_LAW: "Governing Law",
  JURISDICTION: "Jurisdiction",
};

function state(rawValue: string, key: TokenKey): TokenState {
  const trimmed = rawValue.trim();
  return trimmed.length > 0
    ? { text: trimmed, isPlaceholder: false }
    : { text: `[${TOKEN_PLACEHOLDER_LABEL[key]}]`, isPlaceholder: true };
}

/** Resolves every cover-page token to its display text, live as the form is edited. */
export function resolveTokens(
  values: NdaFormValues
): Record<TokenKey, TokenState> {
  return {
    PURPOSE: state(values.purpose, "PURPOSE"),
    EFFECTIVE_DATE: state(formatLegalDate(values.effectiveDate), "EFFECTIVE_DATE"),
    MNDA_TERM: state(describeMndaTerm(values.mndaTermYears), "MNDA_TERM"),
    TERM_OF_CONFIDENTIALITY: state(
      describeConfidentiality(values.confidentialityYears),
      "TERM_OF_CONFIDENTIALITY"
    ),
    GOVERNING_LAW: state(
      countryLabel(values.governingLawCountry),
      "GOVERNING_LAW"
    ),
    JURISDICTION: state(values.jurisdiction, "JURISDICTION"),
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
 * preview updates live, field by field, as the user types.
 */
export function fillStandardTermsHtml(values: NdaFormValues): string {
  const tokens = resolveTokens(values);
  return STANDARD_TERMS_TEMPLATE.replace(
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
