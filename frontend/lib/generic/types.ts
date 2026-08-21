export type GenericParty = {
  name: string;
  address: string;
  signatoryName: string;
  signatoryTitle: string;
  signatoryEmail: string;
};

/**
 * Shared shape for the 8 catalog document types (AG-64) that do not get a
 * dedicated component: same reduced field set for all of them, English
 * only. See frontend/lib/generic/templates/ for the per-type standard
 * terms body rendered alongside these fields.
 */
export type GenericFormValues = {
  partyA: GenericParty;
  partyB: GenericParty;
  effectiveDate: string;
  purpose: string;
  governingLawCountry: string;
  jurisdiction: string;
};

export const emptyGenericParty: GenericParty = {
  name: "",
  address: "",
  signatoryName: "",
  signatoryTitle: "",
  signatoryEmail: "",
};

export const emptyGenericFormValues: GenericFormValues = {
  partyA: { ...emptyGenericParty },
  partyB: { ...emptyGenericParty },
  effectiveDate: "",
  purpose: "",
  governingLawCountry: "",
  jurisdiction: "",
};
