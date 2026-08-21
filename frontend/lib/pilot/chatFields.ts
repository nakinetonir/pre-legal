import { isValidPilotPeriodMonths } from "./durations";
import type { PilotFormValues, PilotParty } from "./types";

type PartyChatFields = Partial<PilotParty>;

export type PilotChatFields = {
  provider?: PartyChatFields;
  customer?: PartyChatFields;
  effectiveDate?: string;
  pilotPeriodMonths?: number;
  evaluationPurpose?: string;
  generalCapAmount?: string;
  governingLawCountry?: string;
  jurisdiction?: string;
};

function mergeParty(current: PilotParty, fields?: PartyChatFields): PilotParty {
  if (!fields) return current;
  const next = { ...current };
  for (const key of Object.keys(fields) as (keyof PilotParty)[]) {
    const value = fields[key];
    if (value) next[key] = value;
  }
  return next;
}

/** Same merge contract as lib/nda/chatFields.ts: only non-empty, valid fields overwrite. */
export function applyChatFields(
  current: PilotFormValues,
  fields: PilotChatFields
): PilotFormValues {
  const next: PilotFormValues = {
    ...current,
    provider: mergeParty(current.provider, fields.provider),
    customer: mergeParty(current.customer, fields.customer),
  };

  if (fields.effectiveDate) next.effectiveDate = fields.effectiveDate;
  if (fields.evaluationPurpose) next.evaluationPurpose = fields.evaluationPurpose;
  if (fields.generalCapAmount) next.generalCapAmount = fields.generalCapAmount;
  if (fields.jurisdiction) next.jurisdiction = fields.jurisdiction;
  if (fields.governingLawCountry) next.governingLawCountry = fields.governingLawCountry;

  if (
    fields.pilotPeriodMonths !== undefined &&
    isValidPilotPeriodMonths(fields.pilotPeriodMonths)
  ) {
    next.pilotPeriodMonths = fields.pilotPeriodMonths;
  }

  return next;
}
