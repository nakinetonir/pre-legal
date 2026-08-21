/**
 * Parametrized year ranges for the duration selects (AG-8), instead of
 * free-text term fields.
 */
export const MNDA_TERM_YEAR_RANGE = { min: 1, max: 10 } as const;
export const CONFIDENTIALITY_YEAR_RANGE = { min: 1, max: 15 } as const;

export const CONFIDENTIALITY_INDEFINITE = "indefinite" as const;
export type ConfidentialityYears =
  | number
  | typeof CONFIDENTIALITY_INDEFINITE;

export function yearOptions(range: { min: number; max: number }): number[] {
  const options: number[] = [];
  for (let year = range.min; year <= range.max; year++) options.push(year);
  return options;
}

export function isValidMndaTermYears(years: number): boolean {
  return (
    Number.isInteger(years) &&
    years >= MNDA_TERM_YEAR_RANGE.min &&
    years <= MNDA_TERM_YEAR_RANGE.max
  );
}

export function isValidConfidentialityYears(
  years: ConfidentialityYears
): boolean {
  if (years === CONFIDENTIALITY_INDEFINITE) return true;
  return (
    Number.isInteger(years) &&
    years >= CONFIDENTIALITY_YEAR_RANGE.min &&
    years <= CONFIDENTIALITY_YEAR_RANGE.max
  );
}
