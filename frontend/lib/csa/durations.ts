export const SUBSCRIPTION_PERIOD_YEAR_RANGE = { min: 1, max: 5 } as const;

export function yearOptions(range: { min: number; max: number }): number[] {
  const options: number[] = [];
  for (let year = range.min; year <= range.max; year++) options.push(year);
  return options;
}

export function isValidSubscriptionPeriodYears(years: number): boolean {
  return (
    Number.isInteger(years) &&
    years >= SUBSCRIPTION_PERIOD_YEAR_RANGE.min &&
    years <= SUBSCRIPTION_PERIOD_YEAR_RANGE.max
  );
}
