import { describe, expect, it } from "vitest";
import { isNdaFormValid, validateNdaForm } from "./validation";
import { emptyNdaFormValues, type NdaFormValues } from "./types";

const filled: NdaFormValues = {
  ...emptyNdaFormValues,
  partyA: {
    name: "Acme, Inc.",
    address: "1 Main St",
    signatoryName: "Jane Doe",
    signatoryTitle: "CEO",
    signatoryEmail: "jane@acme.com",
  },
  partyB: {
    name: "Northwind Corp",
    address: "2 Side St",
    signatoryName: "John Smith",
    signatoryTitle: "COO",
    signatoryEmail: "john@northwind.com",
  },
  effectiveDate: "2026-08-18",
  purpose: "Evaluating a potential partnership",
  governingLawCountry: "ES",
  jurisdiction: "Madrid, España",
};

describe("validateNdaForm", () => {
  it("reports no errors for a fully filled, valid form", () => {
    const errors = validateNdaForm(filled);
    expect(isNdaFormValid(errors)).toBe(true);
  });

  it("flags every required field as missing on the empty form", () => {
    const errors = validateNdaForm(emptyNdaFormValues);
    expect(isNdaFormValid(errors)).toBe(false);
    expect(errors.partyA.name).toBeDefined();
    expect(errors.partyB.signatoryEmail).toBeDefined();
    expect(errors.effectiveDate).toBeDefined();
    expect(errors.purpose).toBeDefined();
    expect(errors.governingLawCountry).toBeDefined();
    expect(errors.jurisdiction).toBeDefined();
  });

  it("rejects a malformed signatory email", () => {
    const errors = validateNdaForm({
      ...filled,
      partyA: { ...filled.partyA, signatoryEmail: "not-an-email" },
    });
    expect(errors.partyA.signatoryEmail).toBeDefined();
  });

  it("rejects a governing law country outside the closed catalog", () => {
    const errors = validateNdaForm({ ...filled, governingLawCountry: "ZZ" });
    expect(errors.governingLawCountry).toBeDefined();
  });

  it("rejects term years outside the parametrized range", () => {
    const errors = validateNdaForm({ ...filled, mndaTermYears: 99 });
    expect(errors.mndaTermYears).toBeDefined();

    const errors2 = validateNdaForm({ ...filled, confidentialityYears: 0 });
    expect(errors2.confidentialityYears).toBeDefined();
  });

  it("accepts an indefinite confidentiality term", () => {
    const errors = validateNdaForm({ ...filled, confidentialityYears: "indefinite" });
    expect(errors.confidentialityYears).toBeUndefined();
  });

  it("localizes error messages to the locale of the selected country (AG-66)", () => {
    const esErrors = validateNdaForm({ ...emptyNdaFormValues, governingLawCountry: "ES" });
    expect(esErrors.purpose).toBe("Describe la finalidad del acuerdo.");

    const usErrors = validateNdaForm({ ...emptyNdaFormValues, governingLawCountry: "US" });
    expect(usErrors.purpose).toBe("Describe the purpose of the agreement.");
  });
});
