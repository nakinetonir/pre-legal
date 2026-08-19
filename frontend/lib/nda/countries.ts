/**
 * Closed catalog of countries for the "Governing Law" field (AG-9).
 *
 * This is a starting list scoped to the jurisdictions the Common Paper
 * Mutual NDA is realistically used under (EU + a few common cross-border
 * counterparties). Pending confirmation from the legal/business team —
 * do not treat this as exhaustive.
 */
export type CountryOption = {
  code: string;
  label: string;
};

export const GOVERNING_LAW_COUNTRIES: CountryOption[] = [
  { code: "ES", label: "España" },
  { code: "FR", label: "Francia" },
  { code: "DE", label: "Alemania" },
  { code: "IT", label: "Italia" },
  { code: "PT", label: "Portugal" },
  { code: "NL", label: "Países Bajos" },
  { code: "IE", label: "Irlanda" },
  { code: "BE", label: "Bélgica" },
  { code: "GB", label: "Reino Unido" },
  { code: "US", label: "Estados Unidos" },
  { code: "MX", label: "México" },
];

export function countryLabel(code: string): string {
  return GOVERNING_LAW_COUNTRIES.find((c) => c.code === code)?.label ?? "";
}
