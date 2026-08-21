import { describe, expect, it } from "vitest";
import { applyChatFields } from "./chatFields";
import { emptyGenericFormValues } from "./types";

describe("applyChatFields (generic)", () => {
  it("applies new fields onto the empty form", () => {
    const next = applyChatFields(emptyGenericFormValues, {
      partyA: { name: "Acme, Inc." },
      purpose: "Joint marketing program",
      governingLawCountry: "FR",
    });
    expect(next.partyA.name).toBe("Acme, Inc.");
    expect(next.purpose).toBe("Joint marketing program");
    expect(next.governingLawCountry).toBe("FR");
  });

  it("keeps existing values when the chat sends nothing new for a field", () => {
    const current = {
      ...emptyGenericFormValues,
      partyA: { ...emptyGenericFormValues.partyA, name: "Acme, Inc." },
    };
    const next = applyChatFields(current, { partyB: { name: "Northwind" } });
    expect(next.partyA.name).toBe("Acme, Inc.");
    expect(next.partyB.name).toBe("Northwind");
  });

  it("does not overwrite a field with an empty string", () => {
    const current = { ...emptyGenericFormValues, purpose: "Existing purpose" };
    const next = applyChatFields(current, { purpose: "" });
    expect(next.purpose).toBe("Existing purpose");
  });
});
