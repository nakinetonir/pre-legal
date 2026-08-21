import { getTemplate } from "./templates";
import { countryLabel } from "@/lib/nda/countries";
import { formatLegalDate } from "@/lib/nda/formatDate";
import { localeForCountry } from "@/lib/i18n/locale";
import { getUiDictionary } from "@/lib/i18n/ui";
import type { PilotFormValues } from "./types";

export type TokenKey =
  | "EFFECTIVE_DATE"
  | "PILOT_PERIOD"
  | "EVALUATION_PURPOSE"
  | "GENERAL_CAP_AMOUNT"
  | "GOVERNING_LAW"
  | "JURISDICTION";

export type TokenState = { text: string; isPlaceholder: boolean };

function state(rawValue: string, placeholderLabel: string): TokenState {
  const trimmed = rawValue.trim();
  return trimmed.length > 0
    ? { text: trimmed, isPlaceholder: false }
    : { text: `[${placeholderLabel}]`, isPlaceholder: true };
}

/** Same token-resolution pattern as frontend/lib/nda/fillTemplate.ts, adapted to the Pilot Agreement. */
export function resolveTokens(values: PilotFormValues): Record<TokenKey, TokenState> {
  const locale = localeForCountry(values.governingLawCountry);
  const template = getTemplate(locale);
  const placeholders = getUiDictionary(locale).pilotDocument.placeholders;

  return {
    EFFECTIVE_DATE: state(
      formatLegalDate(values.effectiveDate, locale),
      placeholders.effectiveDate
    ),
    PILOT_PERIOD: state(template.describePilotPeriod(values.pilotPeriodMonths), ""),
    EVALUATION_PURPOSE: state(values.evaluationPurpose, placeholders.evaluationPurpose),
    GENERAL_CAP_AMOUNT: state(values.generalCapAmount, placeholders.generalCapAmount),
    GOVERNING_LAW: state(
      countryLabel(values.governingLawCountry, locale),
      placeholders.governingLaw
    ),
    JURISDICTION: state(values.jurisdiction, placeholders.jurisdiction),
  };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Same live-substitution pattern as frontend/lib/nda/fillTemplate.ts, adapted to the Pilot Agreement. */
export function fillStandardTermsHtml(values: PilotFormValues): string {
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
