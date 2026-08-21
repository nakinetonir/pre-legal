/**
 * Per-locale legal template module for the Cloud Service Agreement (AG-64),
 * mirroring frontend/lib/nda/templates/types.ts: the Standard Terms body
 * plus the phrase substituted into its {{SUBSCRIPTION_PERIOD}} token, since
 * it is grammatically part of the legal text.
 */
export type CsaTemplateModule = {
  STANDARD_TERMS_TEMPLATE: string;
  describeSubscriptionPeriod: (years: number) => string;
};
