import { getTemplate } from "./templates";
import { countryLabel } from "@/lib/nda/countries";
import { formatLegalDate } from "@/lib/nda/formatDate";
import { localeForCountry } from "@/lib/i18n/locale";
import { getUiDictionary } from "@/lib/i18n/ui";
import type { CsaFormValues } from "./types";

export type TokenKey =
  | "EFFECTIVE_DATE"
  | "SUBSCRIPTION_PERIOD"
  | "PAYMENT_PROCESS"
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

/** Same token-resolution pattern as frontend/lib/nda/fillTemplate.ts, adapted to CSA. */
export function resolveTokens(values: CsaFormValues): Record<TokenKey, TokenState> {
  const locale = localeForCountry(values.governingLawCountry);
  const template = getTemplate(locale);
  const placeholders = getUiDictionary(locale).csaDocument.placeholders;

  return {
    EFFECTIVE_DATE: state(
      formatLegalDate(values.effectiveDate, locale),
      placeholders.effectiveDate
    ),
    SUBSCRIPTION_PERIOD: state(
      template.describeSubscriptionPeriod(values.subscriptionPeriodYears),
      ""
    ),
    PAYMENT_PROCESS: state(values.paymentProcess, placeholders.paymentProcess),
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

/** Same live-substitution pattern as frontend/lib/nda/fillTemplate.ts, adapted to CSA. */
export function fillStandardTermsHtml(values: CsaFormValues): string {
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
