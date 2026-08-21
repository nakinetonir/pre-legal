import type { GenericFormValues, GenericParty } from "./types";

type PartyChatFields = Partial<GenericParty>;

export type GenericChatFields = {
  partyA?: PartyChatFields;
  partyB?: PartyChatFields;
  effectiveDate?: string;
  purpose?: string;
  governingLawCountry?: string;
  jurisdiction?: string;
};

function mergeParty(current: GenericParty, fields?: PartyChatFields): GenericParty {
  if (!fields) return current;
  const next = { ...current };
  for (const key of Object.keys(fields) as (keyof GenericParty)[]) {
    const value = fields[key];
    if (value) next[key] = value;
  }
  return next;
}

/** Same merge contract as lib/nda/chatFields.ts: only non-empty fields overwrite. */
export function applyChatFields(
  current: GenericFormValues,
  fields: GenericChatFields
): GenericFormValues {
  const next: GenericFormValues = {
    ...current,
    partyA: mergeParty(current.partyA, fields.partyA),
    partyB: mergeParty(current.partyB, fields.partyB),
  };

  if (fields.effectiveDate) next.effectiveDate = fields.effectiveDate;
  if (fields.purpose) next.purpose = fields.purpose;
  if (fields.jurisdiction) next.jurisdiction = fields.jurisdiction;
  if (fields.governingLawCountry) next.governingLawCountry = fields.governingLawCountry;

  return next;
}
