/**
 * Per-locale legal template module for the Pilot Agreement (AG-64),
 * mirroring frontend/lib/nda/templates/types.ts: the Standard Terms body
 * plus the phrase substituted into its {{PILOT_PERIOD}} token, since it is
 * grammatically part of the legal text.
 */
export type PilotTemplateModule = {
  STANDARD_TERMS_TEMPLATE: string;
  describePilotPeriod: (months: number) => string;
};
