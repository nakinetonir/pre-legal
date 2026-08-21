import { isValidSubscriptionPeriodYears } from "./durations";
import type { CsaFormValues, CsaParty } from "./types";

type PartyChatFields = Partial<CsaParty>;

export type CsaChatFields = {
  provider?: PartyChatFields;
  customer?: PartyChatFields;
  effectiveDate?: string;
  subscriptionPeriodYears?: number;
  paymentProcess?: string;
  generalCapAmount?: string;
  governingLawCountry?: string;
  jurisdiction?: string;
};

function mergeParty(current: CsaParty, fields?: PartyChatFields): CsaParty {
  if (!fields) return current;
  const next = { ...current };
  for (const key of Object.keys(fields) as (keyof CsaParty)[]) {
    const value = fields[key];
    if (value) next[key] = value;
  }
  return next;
}

/** Same merge contract as lib/nda/chatFields.ts: only non-empty, valid fields overwrite. */
export function applyChatFields(current: CsaFormValues, fields: CsaChatFields): CsaFormValues {
  const next: CsaFormValues = {
    ...current,
    provider: mergeParty(current.provider, fields.provider),
    customer: mergeParty(current.customer, fields.customer),
  };

  if (fields.effectiveDate) next.effectiveDate = fields.effectiveDate;
  if (fields.paymentProcess) next.paymentProcess = fields.paymentProcess;
  if (fields.generalCapAmount) next.generalCapAmount = fields.generalCapAmount;
  if (fields.jurisdiction) next.jurisdiction = fields.jurisdiction;
  if (fields.governingLawCountry) next.governingLawCountry = fields.governingLawCountry;

  if (
    fields.subscriptionPeriodYears !== undefined &&
    isValidSubscriptionPeriodYears(fields.subscriptionPeriodYears)
  ) {
    next.subscriptionPeriodYears = fields.subscriptionPeriodYears;
  }

  return next;
}
