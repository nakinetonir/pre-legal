import { STANDARD_TERMS_TEMPLATE } from "./standardTermsTemplate";
import type { NdaFormValues } from "./types";

/**
 * Escapes characters that are meaningful to Markdown/HTML so that free-text
 * user input is always rendered as literal text, never as markup, when the
 * filled template is parsed by `marked`.
 */
export function escapeForMarkdown(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/[\\`*_{}[\]()#+\-.!]/g, (char) => `\\${char}`);
}

/** Escapes only the characters that would break the `**bold**` run parser used for .docx export. */
export function escapeForPlainToken(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/\*/g, "\\*");
}

function buildTokenValues(
  values: NdaFormValues,
  escape: (value: string) => string
): Record<string, string> {
  const fallback = (value: string, placeholder: string) => {
    const trimmed = value.trim();
    return trimmed.length > 0 ? escape(trimmed) : `[${placeholder}]`;
  };

  return {
    PURPOSE: fallback(values.purpose, "Purpose"),
    EFFECTIVE_DATE: fallback(values.effectiveDate, "Effective Date"),
    MNDA_TERM: fallback(values.mndaTerm, "MNDA Term"),
    TERM_OF_CONFIDENTIALITY: fallback(
      values.termOfConfidentiality,
      "Term of Confidentiality"
    ),
    GOVERNING_LAW: fallback(values.governingLaw, "Governing Law"),
    JURISDICTION: fallback(values.jurisdiction, "Jurisdiction"),
  };
}

function fillTemplate(
  values: NdaFormValues,
  escape: (value: string) => string
): string {
  const tokens = buildTokenValues(values, escape);
  return STANDARD_TERMS_TEMPLATE.replace(
    /\{\{(\w+)\}\}/g,
    (match, key: string) => `**${tokens[key] ?? match}**`
  );
}

/** Standard Terms with cover-page tokens filled in, safe to pass to a Markdown renderer. */
export function fillStandardTermsMarkdown(values: NdaFormValues): string {
  return fillTemplate(values, escapeForMarkdown);
}

/** Standard Terms with cover-page tokens filled in as plain text, for the .docx export. */
export function fillStandardTermsPlain(values: NdaFormValues): string {
  return fillTemplate(values, escapeForPlainToken);
}
