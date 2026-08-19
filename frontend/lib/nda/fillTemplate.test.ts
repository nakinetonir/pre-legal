import { describe, expect, it } from "vitest";
import { fillStandardTermsHtml, resolveTokens } from "./fillTemplate";
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
  mndaTermYears: 2,
  confidentialityYears: 3,
  governingLawCountry: "ES",
  jurisdiction: "Madrid, España",
};

describe("resolveTokens", () => {
  it("resolves every token to its display text when the form is filled", () => {
    const tokens = resolveTokens(filled);
    expect(tokens.PURPOSE).toEqual({
      text: "Evaluating a potential partnership",
      isPlaceholder: false,
    });
    expect(tokens.EFFECTIVE_DATE.text).toBe("August 18, 2026");
    expect(tokens.MNDA_TERM.text).toBe("2 years from the Effective Date");
    expect(tokens.TERM_OF_CONFIDENTIALITY.text).toBe(
      "3 years after the expiration or termination of this MNDA"
    );
    expect(tokens.GOVERNING_LAW).toEqual({ text: "España", isPlaceholder: false });
    expect(tokens.JURISDICTION).toEqual({
      text: "Madrid, España",
      isPlaceholder: false,
    });
  });

  it("falls back to a bracketed placeholder for empty fields", () => {
    const tokens = resolveTokens(emptyNdaFormValues);
    expect(tokens.PURPOSE).toEqual({ text: "[Purpose]", isPlaceholder: true });
    expect(tokens.EFFECTIVE_DATE).toEqual({
      text: "[Effective Date]",
      isPlaceholder: true,
    });
    expect(tokens.GOVERNING_LAW).toEqual({
      text: "[Governing Law]",
      isPlaceholder: true,
    });
    // Selects always carry a valid default, so these are never placeholders.
    expect(tokens.MNDA_TERM.isPlaceholder).toBe(false);
    expect(tokens.TERM_OF_CONFIDENTIALITY.isPlaceholder).toBe(false);
  });
});

describe("fillStandardTermsHtml", () => {
  it("substitutes every {{TOKEN}} placeholder in the template", () => {
    const html = fillStandardTermsHtml(filled);
    expect(html).not.toMatch(/\{\{\w+\}\}/);
    expect(html).toContain("Evaluating a potential partnership");
    expect(html).toContain("España");
  });

  it("marks unfilled fields with the empty-token class instead of leaving them blank", () => {
    const html = fillStandardTermsHtml(emptyNdaFormValues);
    expect(html).toContain('class="nda-token nda-token--empty"');
    expect(html).toContain("[Purpose]");
  });

  it("escapes HTML special characters in user input instead of injecting markup", () => {
    const withHtml: NdaFormValues = {
      ...filled,
      purpose: '<img src=x onerror="alert(1)">',
    };
    const html = fillStandardTermsHtml(withHtml);
    expect(html).not.toContain("<img");
    expect(html).toContain("&lt;img src=x onerror=");
  });
});
