import { describe, expect, it } from "vitest";
import { applyChatFields } from "./chatFields";
import { CONFIDENTIALITY_INDEFINITE, emptyNdaFormValues } from "./types";

describe("applyChatFields", () => {
  it("applies new fields onto the empty form", () => {
    const next = applyChatFields(emptyNdaFormValues, {
      partyA: { name: "Acme, Inc." },
      governingLawCountry: "ES",
      mndaTermYears: 3,
    });
    expect(next.partyA.name).toBe("Acme, Inc.");
    expect(next.governingLawCountry).toBe("ES");
    expect(next.mndaTermYears).toBe(3);
  });

  it("keeps existing values when the chat sends nothing new for a field", () => {
    const current = {
      ...emptyNdaFormValues,
      partyA: { ...emptyNdaFormValues.partyA, name: "Acme, Inc." },
    };
    const next = applyChatFields(current, { partyB: { name: "Northwind" } });
    expect(next.partyA.name).toBe("Acme, Inc.");
    expect(next.partyB.name).toBe("Northwind");
  });

  it("ignores out-of-range durations instead of applying them", () => {
    const next = applyChatFields(emptyNdaFormValues, {
      mndaTermYears: 99,
      confidentialityYears: 0,
    });
    expect(next.mndaTermYears).toBe(emptyNdaFormValues.mndaTermYears);
    expect(next.confidentialityYears).toBe(emptyNdaFormValues.confidentialityYears);
  });

  it("maps confidentialityIndefinite to the indefinite sentinel", () => {
    const next = applyChatFields(emptyNdaFormValues, {
      confidentialityIndefinite: true,
    });
    expect(next.confidentialityYears).toBe(CONFIDENTIALITY_INDEFINITE);
  });

  it("does not overwrite a field with an empty string", () => {
    const current = {
      ...emptyNdaFormValues,
      purpose: "Evaluate a partnership",
    };
    const next = applyChatFields(current, { purpose: "" });
    expect(next.purpose).toBe("Evaluate a partnership");
  });
});
