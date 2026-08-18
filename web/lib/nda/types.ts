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
  mndaTerm: string;
  termOfConfidentiality: string;
  governingLaw: string;
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
  mndaTerm: "",
  termOfConfidentiality: "",
  governingLaw: "",
  jurisdiction: "",
};
