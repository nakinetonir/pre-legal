import type { Locale } from "@/lib/i18n/locale";
import { de } from "./de";
import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import { it } from "./it";
import { nl } from "./nl";
import { pt } from "./pt";
import type { TemplateModule } from "./types";

/**
 * How fillTemplate.ts selects the legal body (AG-78): each locale owns one
 * module with its own STANDARD_TERMS_TEMPLATE and duration phrases, and
 * getTemplate() below is the single lookup point every consumer (the live
 * preview and the .docx export) goes through.
 */
const TEMPLATES: Record<Locale, TemplateModule> = { en, es, fr, de, it, pt, nl };

export function getTemplate(locale: Locale): TemplateModule {
  return TEMPLATES[locale];
}

export type { TemplateModule } from "./types";
