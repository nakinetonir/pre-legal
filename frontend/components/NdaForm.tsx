"use client";

import { useState } from "react";
import { governingLawCountries } from "@/lib/nda/countries";
import {
  CONFIDENTIALITY_INDEFINITE,
  CONFIDENTIALITY_YEAR_RANGE,
  MNDA_TERM_YEAR_RANGE,
  yearOptions,
} from "@/lib/nda/durations";
import { localeForCountry } from "@/lib/i18n/locale";
import { getUiDictionary, type UiDictionary } from "@/lib/i18n/ui";
import type { NdaFormErrors, PartyFieldErrors } from "@/lib/nda/validation";
import type { NdaFormValues, NdaParty } from "@/lib/nda/types";

type PartyFieldKey = keyof NdaParty;
type PartyKey = "partyA" | "partyB";

function partyFields(
  dict: UiDictionary
): { key: PartyFieldKey; label: string; placeholder: string }[] {
  const f = dict.form;
  return [
    { key: "name", label: f.nameLabel, placeholder: f.namePlaceholder },
    { key: "address", label: f.addressLabel, placeholder: f.addressPlaceholder },
    {
      key: "signatoryName",
      label: f.signatoryNameLabel,
      placeholder: f.signatoryNamePlaceholder,
    },
    {
      key: "signatoryTitle",
      label: f.signatoryTitleLabel,
      placeholder: f.signatoryTitlePlaceholder,
    },
    {
      key: "signatoryEmail",
      label: f.signatoryEmailLabel,
      placeholder: f.signatoryEmailPlaceholder,
    },
  ];
}

const inputClass =
  "rounded-md border bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 border-black/15 dark:border-white/20 aria-[invalid=true]:border-red-500";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <span className="text-xs text-red-600 dark:text-red-400">{message}</span>;
}

function PartyFieldset({
  title,
  party,
  errors,
  touched,
  forceShowErrors,
  fields,
  onChange,
  onBlur,
}: {
  title: string;
  party: NdaParty;
  errors: PartyFieldErrors;
  touched: Set<PartyFieldKey>;
  forceShowErrors: boolean;
  fields: { key: PartyFieldKey; label: string; placeholder: string }[];
  onChange: (field: PartyFieldKey, value: string) => void;
  onBlur: (field: PartyFieldKey) => void;
}) {
  return (
    <fieldset className="rounded-lg border border-black/10 dark:border-white/15 p-4">
      <legend className="px-1 font-medium">{title}</legend>
      <div className="grid gap-3 sm:grid-cols-2">
        {fields.map((field) => {
          const showError = forceShowErrors || touched.has(field.key);
          const errorMessage = errors[field.key];
          return (
            <label key={field.key} className="flex flex-col gap-1 text-sm">
              <span>{field.label}</span>
              <input
                type={field.key === "signatoryEmail" ? "email" : "text"}
                value={party[field.key]}
                placeholder={field.placeholder}
                aria-invalid={showError && !!errorMessage}
                onChange={(e) => onChange(field.key, e.target.value)}
                onBlur={() => onBlur(field.key)}
                className={inputClass}
              />
              {showError && <FieldError message={errorMessage} />}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export function NdaForm({
  values,
  errors,
  forceShowErrors,
  onChange,
}: {
  values: NdaFormValues;
  errors: NdaFormErrors;
  forceShowErrors: boolean;
  onChange: (values: NdaFormValues) => void;
}) {
  const [touchedA, setTouchedA] = useState<Set<PartyFieldKey>>(new Set());
  const [touchedB, setTouchedB] = useState<Set<PartyFieldKey>>(new Set());
  const [touchedTerms, setTouchedTerms] = useState<Set<string>>(new Set());

  const locale = localeForCountry(values.governingLawCountry);
  const dict = getUiDictionary(locale);
  const fields = partyFields(dict);

  function updateParty(party: PartyKey, field: PartyFieldKey, value: string) {
    onChange({ ...values, [party]: { ...values[party], [field]: value } });
  }

  function blurParty(party: PartyKey, field: PartyFieldKey) {
    const setter = party === "partyA" ? setTouchedA : setTouchedB;
    setter((prev) => new Set(prev).add(field));
  }

  function updateField<K extends keyof NdaFormValues>(field: K, value: NdaFormValues[K]) {
    onChange({ ...values, [field]: value });
  }

  function blurField(field: string) {
    setTouchedTerms((prev) => new Set(prev).add(field));
  }

  const showTermError = (field: string) =>
    forceShowErrors || touchedTerms.has(field);

  return (
    <div className="flex flex-col gap-6">
      <PartyFieldset
        title={dict.form.partyA}
        party={values.partyA}
        errors={errors.partyA}
        touched={touchedA}
        forceShowErrors={forceShowErrors}
        fields={fields}
        onChange={(field, value) => updateParty("partyA", field, value)}
        onBlur={(field) => blurParty("partyA", field)}
      />
      <PartyFieldset
        title={dict.form.partyB}
        party={values.partyB}
        errors={errors.partyB}
        touched={touchedB}
        forceShowErrors={forceShowErrors}
        fields={fields}
        onChange={(field, value) => updateParty("partyB", field, value)}
        onBlur={(field) => blurParty("partyB", field)}
      />

      <fieldset className="rounded-lg border border-black/10 dark:border-white/15 p-4">
        <legend className="px-1 font-medium">{dict.form.termsTitle}</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm">
            <span>{dict.form.effectiveDateLabel}</span>
            <input
              type="date"
              value={values.effectiveDate}
              aria-invalid={showTermError("effectiveDate") && !!errors.effectiveDate}
              onChange={(e) => updateField("effectiveDate", e.target.value)}
              onBlur={() => blurField("effectiveDate")}
              className={inputClass}
            />
            {showTermError("effectiveDate") && (
              <FieldError message={errors.effectiveDate} />
            )}
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span>{dict.form.mndaTermLabel}</span>
            <select
              value={values.mndaTermYears}
              onChange={(e) => updateField("mndaTermYears", Number(e.target.value))}
              onBlur={() => blurField("mndaTermYears")}
              className={inputClass}
            >
              {yearOptions(MNDA_TERM_YEAR_RANGE).map((year) => (
                <option key={year} value={year}>
                  {year} {year === 1 ? dict.form.yearSingular : dict.form.yearPlural}
                </option>
              ))}
            </select>
            {showTermError("mndaTermYears") && (
              <FieldError message={errors.mndaTermYears} />
            )}
          </label>

          <label className="flex flex-col gap-1 text-sm sm:col-span-2">
            <span>{dict.form.purposeLabel}</span>
            <textarea
              rows={2}
              placeholder={dict.form.purposePlaceholder}
              value={values.purpose}
              aria-invalid={showTermError("purpose") && !!errors.purpose}
              onChange={(e) => updateField("purpose", e.target.value)}
              onBlur={() => blurField("purpose")}
              className={inputClass}
            />
            {showTermError("purpose") && <FieldError message={errors.purpose} />}
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span>{dict.form.confidentialityLabel}</span>
            <select
              value={values.confidentialityYears}
              onChange={(e) =>
                updateField(
                  "confidentialityYears",
                  e.target.value === CONFIDENTIALITY_INDEFINITE
                    ? CONFIDENTIALITY_INDEFINITE
                    : Number(e.target.value)
                )
              }
              onBlur={() => blurField("confidentialityYears")}
              className={inputClass}
            >
              {yearOptions(CONFIDENTIALITY_YEAR_RANGE).map((year) => (
                <option key={year} value={year}>
                  {year} {year === 1 ? dict.form.yearSingular : dict.form.yearPlural}
                </option>
              ))}
              <option value={CONFIDENTIALITY_INDEFINITE}>{dict.form.indefiniteLabel}</option>
            </select>
            {showTermError("confidentialityYears") && (
              <FieldError message={errors.confidentialityYears} />
            )}
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span>{dict.form.governingLawLabel}</span>
            <select
              value={values.governingLawCountry}
              aria-invalid={
                showTermError("governingLawCountry") && !!errors.governingLawCountry
              }
              onChange={(e) => updateField("governingLawCountry", e.target.value)}
              onBlur={() => blurField("governingLawCountry")}
              className={inputClass}
            >
              <option value="">{dict.form.countryPlaceholder}</option>
              {governingLawCountries(locale).map((country) => (
                <option key={country.code} value={country.code}>
                  {country.label}
                </option>
              ))}
            </select>
            {showTermError("governingLawCountry") && (
              <FieldError message={errors.governingLawCountry} />
            )}
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span>{dict.form.jurisdictionLabel}</span>
            <input
              type="text"
              placeholder={dict.form.jurisdictionPlaceholder}
              value={values.jurisdiction}
              aria-invalid={showTermError("jurisdiction") && !!errors.jurisdiction}
              onChange={(e) => updateField("jurisdiction", e.target.value)}
              onBlur={() => blurField("jurisdiction")}
              className={inputClass}
            />
            {showTermError("jurisdiction") && (
              <FieldError message={errors.jurisdiction} />
            )}
          </label>
        </div>
      </fieldset>
    </div>
  );
}
