export const PILOT_PERIOD_MONTH_RANGE = { min: 1, max: 12 } as const;

export function monthOptions(range: { min: number; max: number }): number[] {
  const options: number[] = [];
  for (let month = range.min; month <= range.max; month++) options.push(month);
  return options;
}

export function isValidPilotPeriodMonths(months: number): boolean {
  return (
    Number.isInteger(months) &&
    months >= PILOT_PERIOD_MONTH_RANGE.min &&
    months <= PILOT_PERIOD_MONTH_RANGE.max
  );
}
