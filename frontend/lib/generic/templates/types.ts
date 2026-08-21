/**
 * Template module for the 8 catalog document types (AG-64) that share the
 * generic Cover Page (frontend/lib/generic/types.ts) instead of a bespoke
 * one. English only - no per-locale variants, unlike the NDA/CSA/Pilot
 * TemplateModule shapes.
 */
export type GenericTemplateModule = {
  STANDARD_TERMS_TEMPLATE: string;
};
