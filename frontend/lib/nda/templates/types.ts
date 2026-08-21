import type { ConfidentialityYears } from "../durations";

/**
 * Per-locale legal template module (AG-77): the Standard Terms body plus the
 * duration phrases substituted into its {{MNDA_TERM}} / {{TERM_OF_CONFIDENTIALITY}}
 * tokens, since those phrases are grammatically part of the legal text and
 * must be translated together with it rather than as generic UI copy.
 */
export type TemplateModule = {
  STANDARD_TERMS_TEMPLATE: string;
  describeMndaTerm: (years: number) => string;
  describeConfidentiality: (years: ConfidentialityYears) => string;
};
