import {
  isValidConfidentialityYears,
  isValidMndaTermYears,
} from "./durations";
import { governingLawCountries } from "./countries";
import { localeForCountry } from "@/lib/i18n/locale";
import { getUiDictionary, type UiDictionary } from "@/lib/i18n/ui";
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

function validateParty(party: NdaParty, v: UiDictionary["validation"]): PartyFieldErrors {
  const errors: PartyFieldErrors = {};
  if (!party.name.trim()) errors.name = v.partyName;
  if (!party.address.trim()) errors.address = v.partyAddress;
  if (!party.signatoryName.trim()) errors.signatoryName = v.partySignatoryName;
  if (!party.signatoryTitle.trim()) errors.signatoryTitle = v.partySignatoryTitle;
  if (!party.signatoryEmail.trim()) {
    errors.signatoryEmail = v.partySignatoryEmail;
  } else if (!EMAIL_RE.test(party.signatoryEmail.trim())) {
    errors.signatoryEmail = v.invalidEmail;
  }
  return errors;
}

/** Validation messages follow the locale derived from the selected "Governing Law" country (AG-79). */
export function validateNdaForm(values: NdaFormValues): NdaFormErrors {
  const locale = localeForCountry(values.governingLawCountry);
  const v = getUiDictionary(locale).validation;

  const errors: NdaFormErrors = {
    partyA: validateParty(values.partyA, v),
    partyB: validateParty(values.partyB, v),
  };

  if (!values.effectiveDate.trim()) {
    errors.effectiveDate = v.effectiveDate;
  }
  if (!values.purpose.trim()) {
    errors.purpose = v.purpose;
  }
  if (!isValidMndaTermYears(values.mndaTermYears)) {
    errors.mndaTermYears = v.invalidDuration;
  }
  if (!isValidConfidentialityYears(values.confidentialityYears)) {
    errors.confidentialityYears = v.invalidDuration;
  }
  if (
    !values.governingLawCountry ||
    !governingLawCountries(locale).some((c) => c.code === values.governingLawCountry)
  ) {
    errors.governingLawCountry = v.governingLawCountry;
  }
  if (!values.jurisdiction.trim()) {
    errors.jurisdiction = v.jurisdiction;
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
