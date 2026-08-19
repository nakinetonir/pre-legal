import {
  isValidConfidentialityYears,
  isValidMndaTermYears,
} from "./durations";
import { GOVERNING_LAW_COUNTRIES } from "./countries";
import type { NdaFormValues, NdaParty } from "./types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type PartyFieldErrors = Partial<Record<keyof NdaParty, string>>;

export type NdaFormErrors = {
  partyA: PartyFieldErrors;
  partyB: PartyFieldErrors;
  effectiveDate?: string;
  purpose?: string;
  mndaTermYears?: string;
  confidentialityYears?: string;
  governingLawCountry?: string;
  jurisdiction?: string;
};

function validateParty(party: NdaParty): PartyFieldErrors {
  const errors: PartyFieldErrors = {};
  if (!party.name.trim()) errors.name = "Introduce el nombre legal.";
  if (!party.address.trim()) errors.address = "Introduce la dirección.";
  if (!party.signatoryName.trim())
    errors.signatoryName = "Introduce el nombre del firmante.";
  if (!party.signatoryTitle.trim())
    errors.signatoryTitle = "Introduce el cargo del firmante.";
  if (!party.signatoryEmail.trim()) {
    errors.signatoryEmail = "Introduce el email del firmante.";
  } else if (!EMAIL_RE.test(party.signatoryEmail.trim())) {
    errors.signatoryEmail = "El email no tiene un formato válido.";
  }
  return errors;
}

export function validateNdaForm(values: NdaFormValues): NdaFormErrors {
  const errors: NdaFormErrors = {
    partyA: validateParty(values.partyA),
    partyB: validateParty(values.partyB),
  };

  if (!values.effectiveDate.trim()) {
    errors.effectiveDate = "Selecciona la fecha efectiva.";
  }
  if (!values.purpose.trim()) {
    errors.purpose = "Describe la finalidad del acuerdo.";
  }
  if (!isValidMndaTermYears(values.mndaTermYears)) {
    errors.mndaTermYears = "Selecciona una duración válida.";
  }
  if (!isValidConfidentialityYears(values.confidentialityYears)) {
    errors.confidentialityYears = "Selecciona una duración válida.";
  }
  if (
    !values.governingLawCountry ||
    !GOVERNING_LAW_COUNTRIES.some((c) => c.code === values.governingLawCountry)
  ) {
    errors.governingLawCountry = "Selecciona un país.";
  }
  if (!values.jurisdiction.trim()) {
    errors.jurisdiction = "Introduce la jurisdicción (tribunales).";
  }

  return errors;
}

export function isNdaFormValid(errors: NdaFormErrors): boolean {
  return (
    Object.keys(errors.partyA).length === 0 &&
    Object.keys(errors.partyB).length === 0 &&
    !errors.effectiveDate &&
    !errors.purpose &&
    !errors.mndaTermYears &&
    !errors.confidentialityYears &&
    !errors.governingLawCountry &&
    !errors.jurisdiction
  );
}
