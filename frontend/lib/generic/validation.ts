import { governingLawCountries } from "@/lib/nda/countries";
import { localeForCountry } from "@/lib/i18n/locale";
import { getUiDictionary, type UiDictionary } from "@/lib/i18n/ui";
import type { GenericFormValues, GenericParty } from "./types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type PartyFieldErrors = Partial<Record<keyof GenericParty, string>>;

export type GenericFormErrors = {
  partyA: PartyFieldErrors;
  partyB: PartyFieldErrors;
  effectiveDate?: string;
  purpose?: string;
  governingLawCountry?: string;
  jurisdiction?: string;
};

function validateParty(party: GenericParty, v: UiDictionary["validation"]): PartyFieldErrors {
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

/** Same shape/contract as lib/nda/validation.ts, reduced to the generic field set. */
export function validateGenericForm(values: GenericFormValues): GenericFormErrors {
  const locale = localeForCountry(values.governingLawCountry);
  const v = getUiDictionary(locale).validation;

  const errors: GenericFormErrors = {
    partyA: validateParty(values.partyA, v),
    partyB: validateParty(values.partyB, v),
  };

  if (!values.effectiveDate.trim()) errors.effectiveDate = v.effectiveDate;
  if (!values.purpose.trim()) errors.purpose = v.purpose;
  if (
    !values.governingLawCountry ||
    !governingLawCountries(locale).some((c) => c.code === values.governingLawCountry)
  ) {
    errors.governingLawCountry = v.governingLawCountry;
  }
  if (!values.jurisdiction.trim()) errors.jurisdiction = v.jurisdiction;

  return errors;
}

export function isGenericFormValid(errors: GenericFormErrors): boolean {
  return (
    Object.keys(errors.partyA).length === 0 &&
    Object.keys(errors.partyB).length === 0 &&
    !errors.effectiveDate &&
    !errors.purpose &&
    !errors.governingLawCountry &&
    !errors.jurisdiction
  );
}
