import type { GenericDocumentTypeId } from "@/lib/documents/types";
import { aiAddendum } from "./aiAddendum";
import { baa } from "./baa";
import { designPartner } from "./designPartner";
import { dpa } from "./dpa";
import { partnership } from "./partnership";
import { psa } from "./psa";
import { sla } from "./sla";
import { softwareLicense } from "./softwareLicense";
import type { GenericTemplateModule } from "./types";

const TEMPLATES: Record<GenericDocumentTypeId, GenericTemplateModule> = {
  "Design-Partner-Agreement": designPartner,
  SLA: sla,
  PSA: psa,
  DPA: dpa,
  "Software-License-Agreement": softwareLicense,
  "Partnership-Agreement": partnership,
  BAA: baa,
  "AI-Addendum": aiAddendum,
};

export function getTemplate(documentType: GenericDocumentTypeId): GenericTemplateModule {
  return TEMPLATES[documentType];
}

export type { GenericTemplateModule } from "./types";
