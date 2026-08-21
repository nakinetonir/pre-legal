import type { Locale } from "@/lib/i18n/locale";
import { de } from "./de";
import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import { it } from "./it";
import { nl } from "./nl";
import { pt } from "./pt";
import type { PilotTemplateModule } from "./types";

/** Same per-locale lookup pattern as frontend/lib/nda/templates/index.ts. */
const TEMPLATES: Record<Locale, PilotTemplateModule> = { en, es, fr, de, it, pt, nl };

export function getTemplate(locale: Locale): PilotTemplateModule {
  return TEMPLATES[locale];
}

export type { PilotTemplateModule } from "./types";
