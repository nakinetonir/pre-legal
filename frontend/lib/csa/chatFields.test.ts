import { describe, expect, it } from "vitest";
import { applyChatFields } from "./chatFields";
import { emptyCsaFormValues } from "./types";

describe("applyChatFields (CSA)", () => {
  it("applies new fields onto the empty form", () => {
    const next = applyChatFields(emptyCsaFormValues, {
      provider: { name: "Cloudy Inc." },
      subscriptionPeriodYears: 2,
      governingLawCountry: "ES",
    });
    expect(next.provider.name).toBe("Cloudy Inc.");
    expect(next.subscriptionPeriodYears).toBe(2);
    expect(next.governingLawCountry).toBe("ES");
  });

  it("keeps existing values when the chat sends nothing new for a field", () => {
    const current = {
      ...emptyCsaFormValues,
      customer: { ...emptyCsaFormValues.customer, name: "Acme, Inc." },
    };
    const next = applyChatFields(current, { provider: { name: "Cloudy Inc." } });
    expect(next.customer.name).toBe("Acme, Inc.");
    expect(next.provider.name).toBe("Cloudy Inc.");
  });

  it("ignores an out-of-range subscription period instead of applying it", () => {
    const next = applyChatFields(emptyCsaFormValues, { subscriptionPeriodYears: 99 });
    expect(next.subscriptionPeriodYears).toBe(emptyCsaFormValues.subscriptionPeriodYears);
  });

  it("does not overwrite a field with an empty string", () => {
    const current = { ...emptyCsaFormValues, paymentProcess: "Monthly invoicing in USD" };
    const next = applyChatFields(current, { paymentProcess: "" });
    expect(next.paymentProcess).toBe("Monthly invoicing in USD");
  });
});
