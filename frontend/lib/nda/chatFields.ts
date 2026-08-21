import {
  CONFIDENTIALITY_INDEFINITE,
  isValidConfidentialityYears,
  isValidMndaTermYears,
} from "./durations";
import type { NdaFormValues, NdaParty } from "./types";

type PartyChatFields = Partial<NdaParty>;

export type NdaChatFields = {
  partyA?: PartyChatFields;
  partyB?: PartyChatFields;
  effectiveDate?: string;
  purpose?: string;
  mndaTermYears?: number;
  confidentialityYears?: number;
  confidentialityIndefinite?: boolean;
  governingLawCountry?: string;
  jurisdiction?: string;
};

function mergeParty(current: NdaParty, fields?: PartyChatFields): NdaParty {
  if (!fields) return current;
  const next = { ...current };
  for (const key of Object.keys(fields) as (keyof NdaParty)[]) {
    const value = fields[key];
    if (value) next[key] = value;
  }
  return next;
}

/**
 * Merges the fields the AI chat extracted this turn into the current form
 * state. A field is only applied when the backend sent a non-empty value;
 * anything missing or invalid keeps whatever the user/chat already had, so
 * this is safe whether the backend returns a delta or its full understanding.
 */
export function applyChatFields(
  current: NdaFormValues,
  fields: NdaChatFields
): NdaFormValues {
  const next: NdaFormValues = {
    ...current,
    partyA: mergeParty(current.partyA, fields.partyA),
    partyB: mergeParty(current.partyB, fields.partyB),
  };

  if (fields.effectiveDate) next.effectiveDate = fields.effectiveDate;
  if (fields.purpose) next.purpose = fields.purpose;
  if (fields.jurisdiction) next.jurisdiction = fields.jurisdiction;
  if (fields.governingLawCountry) next.governingLawCountry = fields.governingLawCountry;

  if (
    fields.mndaTermYears !== undefined &&
    isValidMndaTermYears(fields.mndaTermYears)
  ) {
    next.mndaTermYears = fields.mndaTermYears;
  }

  if (fields.confidentialityIndefinite) {
    next.confidentialityYears = CONFIDENTIALITY_INDEFINITE;
  } else if (
    fields.confidentialityYears !== undefined &&
    isValidConfidentialityYears(fields.confidentialityYears)
  ) {
    next.confidentialityYears = fields.confidentialityYears;
  }

  return next;
}
