export type CsaParty = {
  name: string;
  address: string;
  signatoryName: string;
  signatoryTitle: string;
  signatoryEmail: string;
};

export type CsaFormValues = {
  provider: CsaParty;
  customer: CsaParty;
  effectiveDate: string;
  subscriptionPeriodYears: number;
  paymentProcess: string;
  generalCapAmount: string;
  governingLawCountry: string;
  jurisdiction: string;
};

export const emptyCsaParty: CsaParty = {
  name: "",
  address: "",
  signatoryName: "",
  signatoryTitle: "",
  signatoryEmail: "",
};

export const emptyCsaFormValues: CsaFormValues = {
  provider: { ...emptyCsaParty },
  customer: { ...emptyCsaParty },
  effectiveDate: "",
  subscriptionPeriodYears: 1,
  paymentProcess: "",
  generalCapAmount: "",
  governingLawCountry: "",
  jurisdiction: "",
};
