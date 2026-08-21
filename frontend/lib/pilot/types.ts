export type PilotParty = {
  name: string;
  address: string;
  signatoryName: string;
  signatoryTitle: string;
  signatoryEmail: string;
};

export type PilotFormValues = {
  provider: PilotParty;
  customer: PilotParty;
  effectiveDate: string;
  pilotPeriodMonths: number;
  evaluationPurpose: string;
  generalCapAmount: string;
  governingLawCountry: string;
  jurisdiction: string;
};

export const emptyPilotParty: PilotParty = {
  name: "",
  address: "",
  signatoryName: "",
  signatoryTitle: "",
  signatoryEmail: "",
};

export const emptyPilotFormValues: PilotFormValues = {
  provider: { ...emptyPilotParty },
  customer: { ...emptyPilotParty },
  effectiveDate: "",
  pilotPeriodMonths: 3,
  evaluationPurpose: "",
  generalCapAmount: "",
  governingLawCountry: "",
  jurisdiction: "",
};
