import type { NdaFormValues } from "@/lib/nda/types";
import type { CsaFormValues } from "@/lib/csa/types";
import type { PilotFormValues } from "@/lib/pilot/types";
import type { GenericFormValues } from "@/lib/generic/types";

/**
 * Same 11 ids as the "file" stem of each entry in catalog.json (AG-64),
 * shared by the frontend and backend (backend/app/chat.py) so routing a
 * detected document type never needs a translation table.
 */
export const DOCUMENT_TYPE_IDS = [
  "Mutual-NDA",
  "CSA",
  "Design-Partner-Agreement",
  "SLA",
  "PSA",
  "DPA",
  "Software-License-Agreement",
  "Partnership-Agreement",
  "Pilot-Agreement",
  "BAA",
  "AI-Addendum",
] as const;

export type DocumentTypeId = (typeof DOCUMENT_TYPE_IDS)[number];

/** The 3 document types with a bespoke, fully localized preview/chat/docx. */
export const DEDICATED_DOCUMENT_TYPE_IDS = ["Mutual-NDA", "CSA", "Pilot-Agreement"] as const;
export type DedicatedDocumentTypeId = (typeof DEDICATED_DOCUMENT_TYPE_IDS)[number];

/** The remaining 8 types, rendered by the shared, English-only GenericPreview. */
export type GenericDocumentTypeId = Exclude<DocumentTypeId, DedicatedDocumentTypeId>;

export const GENERIC_DOCUMENT_TYPE_IDS = DOCUMENT_TYPE_IDS.filter(
  (id): id is GenericDocumentTypeId =>
    !(DEDICATED_DOCUMENT_TYPE_IDS as readonly string[]).includes(id)
);

export function isDedicatedDocumentType(id: DocumentTypeId): id is DedicatedDocumentTypeId {
  return (DEDICATED_DOCUMENT_TYPE_IDS as readonly string[]).includes(id);
}

/**
 * Top-level state for the active document (AG-64): replaces the single
 * fixed `NdaFormValues` page.tsx used to own. `documentType` is `null`
 * until the chat's router turn (backend/app/chat.py) detects it.
 */
export type DocumentState =
  | { documentType: null; values: null }
  | { documentType: "Mutual-NDA"; values: NdaFormValues }
  | { documentType: "CSA"; values: CsaFormValues }
  | { documentType: "Pilot-Agreement"; values: PilotFormValues }
  | { documentType: GenericDocumentTypeId; values: GenericFormValues };

export const EMPTY_DOCUMENT_STATE: DocumentState = { documentType: null, values: null };
