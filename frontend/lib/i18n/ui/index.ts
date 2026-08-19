import type { Locale } from "@/lib/i18n/locale";
import { de } from "./de";
import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import { it } from "./it";
import { nl } from "./nl";
import { pt } from "./pt";
import type { UiDictionary } from "./types";

const UI_DICTIONARIES: Record<Locale, UiDictionary> = { en, es, fr, de, it, pt, nl };

export function getUiDictionary(locale: Locale): UiDictionary {
  return UI_DICTIONARIES[locale];
}

export type { UiDictionary } from "./types";
