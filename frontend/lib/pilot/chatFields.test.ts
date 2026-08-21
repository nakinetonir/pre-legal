import { describe, expect, it } from "vitest";
import { applyChatFields } from "./chatFields";
import { emptyPilotFormValues } from "./types";

describe("applyChatFields (Pilot)", () => {
  it("applies new fields onto the empty form", () => {
    const next = applyChatFields(emptyPilotFormValues, {
      customer: { name: "Acme, Inc." },
      pilotPeriodMonths: 6,
      governingLawCountry: "US",
    });
    expect(next.customer.name).toBe("Acme, Inc.");
    expect(next.pilotPeriodMonths).toBe(6);
    expect(next.governingLawCountry).toBe("US");
  });

  it("keeps existing values when the chat sends nothing new for a field", () => {
    const current = {
      ...emptyPilotFormValues,
      provider: { ...emptyPilotFormValues.provider, name: "Cloudy Inc." },
    };
    const next = applyChatFields(current, { customer: { name: "Acme, Inc." } });
    expect(next.provider.name).toBe("Cloudy Inc.");
    expect(next.customer.name).toBe("Acme, Inc.");
  });

  it("ignores an out-of-range pilot period instead of applying it", () => {
    const next = applyChatFields(emptyPilotFormValues, { pilotPeriodMonths: 99 });
    expect(next.pilotPeriodMonths).toBe(emptyPilotFormValues.pilotPeriodMonths);
  });

  it("does not overwrite a field with an empty string", () => {
    const current = { ...emptyPilotFormValues, evaluationPurpose: "Evaluate onboarding speed" };
    const next = applyChatFields(current, { evaluationPurpose: "" });
    expect(next.evaluationPurpose).toBe("Evaluate onboarding speed");
  });
});
