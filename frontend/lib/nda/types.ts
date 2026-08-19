import { CONFIDENTIALITY_INDEFINITE, type ConfidentialityYears } from "./durations";

export type NdaParty = {
  name: string;
  address: string;
  signatoryName: string;
  signatoryTitle: string;
  signatoryEmail: string;
};

export type NdaFormValues = {
  partyA: NdaParty;
  partyB: NdaParty;
  effectiveDate: string;
  purpose: string;
  mndaTermYears: number;
  confidentialityYears: ConfidentialityYears;
  governingLawCountry: string;
  jurisdiction: string;
};

export const emptyParty: NdaParty = {
  name: "",
  address: "",
  signatoryName: "",
  signatoryTitle: "",
  signatoryEmail: "",
};

export const emptyNdaFormValues: NdaFormValues = {
  partyA: { ...emptyParty },
  partyB: { ...emptyParty },
  effectiveDate: "",
  purpose: "",
  mndaTermYears: 2,
  confidentialityYears: 3,
  governingLawCountry: "",
  jurisdiction: "",
};

export { CONFIDENTIALITY_INDEFINITE };
