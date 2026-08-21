import { isValidPilotPeriodMonths } from "./durations";
import { governingLawCountries } from "@/lib/nda/countries";
import { localeForCountry } from "@/lib/i18n/locale";
import { getUiDictionary, type UiDictionary } from "@/lib/i18n/ui";
import type { PilotFormValues, PilotParty } from "./types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type PartyFieldErrors = Partial<Record<keyof PilotParty, string>>;

export type PilotFormErrors = {
  provider: PartyFieldErrors;
  customer: PartyFieldErrors;
  effectiveDate?: string;
  pilotPeriodMonths?: string;
  evaluationPurpose?: string;
  generalCapAmount?: string;
  governingLawCountry?: string;
  jurisdiction?: string;
};

function validateParty(party: PilotParty, v: UiDictionary["validation"]): PartyFieldErrors {
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

/** Same shape/contract as lib/nda/validation.ts, adapted to the Pilot field set. */
export function validatePilotForm(values: PilotFormValues): PilotFormErrors {
  const locale = localeForCountry(values.governingLawCountry);
  const v = getUiDictionary(locale).validation;

  const errors: PilotFormErrors = {
    provider: validateParty(values.provider, v),
    customer: validateParty(values.customer, v),
  };

  if (!values.effectiveDate.trim()) errors.effectiveDate = v.effectiveDate;
  if (!isValidPilotPeriodMonths(values.pilotPeriodMonths)) {
    errors.pilotPeriodMonths = v.invalidDuration;
  }
  if (!values.evaluationPurpose.trim()) errors.evaluationPurpose = v.requiredField;
  if (!values.generalCapAmount.trim()) errors.generalCapAmount = v.requiredField;
  if (
    !values.governingLawCountry ||
    !governingLawCountries(locale).some((c) => c.code === values.governingLawCountry)
  ) {
    errors.governingLawCountry = v.governingLawCountry;
  }
  if (!values.jurisdiction.trim()) errors.jurisdiction = v.jurisdiction;

  return errors;
}

export function isPilotFormValid(errors: PilotFormErrors): boolean {
  return (
    Object.keys(errors.provider).length === 0 &&
    Object.keys(errors.customer).length === 0 &&
    !errors.effectiveDate &&
    !errors.pilotPeriodMonths &&
    !errors.evaluationPurpose &&
    !errors.generalCapAmount &&
    !errors.governingLawCountry &&
    !errors.jurisdiction
  );
}
