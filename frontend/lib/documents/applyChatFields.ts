import { applyChatFields as applyNdaChatFields } from "@/lib/nda/chatFields";
import { emptyNdaFormValues, type NdaFormValues } from "@/lib/nda/types";
import { applyChatFields as applyCsaChatFields } from "@/lib/csa/chatFields";
import { emptyCsaFormValues, type CsaFormValues } from "@/lib/csa/types";
import { applyChatFields as applyPilotChatFields } from "@/lib/pilot/chatFields";
import { emptyPilotFormValues, type PilotFormValues } from "@/lib/pilot/types";
import { applyChatFields as applyGenericChatFields } from "@/lib/generic/chatFields";
import { emptyGenericFormValues, type GenericFormValues } from "@/lib/generic/types";
import type { DocumentState, DocumentTypeId } from "./types";

export function emptyStateForType(documentType: DocumentTypeId): DocumentState {
  switch (documentType) {
    case "Mutual-NDA":
      return { documentType, values: emptyNdaFormValues };
    case "CSA":
      return { documentType, values: emptyCsaFormValues };
    case "Pilot-Agreement":
      return { documentType, values: emptyPilotFormValues };
    default:
      return { documentType, values: emptyGenericFormValues };
  }
}

/**
 * Dispatches a chat turn's extracted fields to the right per-type merge
 * (lib/{nda,csa,pilot,generic}/chatFields.ts). If `documentType` differs
 * from `state.documentType` - the turn where the backend's router just
 * detected it (backend/app/chat.py) - starts from that type's empty
 * defaults instead of carrying over unrelated values.
 *
 * The `as` casts below are safe: each apply*ChatFields only reads its own
 * type's keys by name, so a mismatched shape is simply ignored rather than
 * misapplied, and `currentValues` is only ever non-null when `state`'s own
 * discriminant already equals `documentType`.
 */
export function applyChatFieldsForType(
  state: DocumentState,
  documentType: DocumentTypeId,
  fields: Record<string, unknown>
): DocumentState {
  const currentValues = state.documentType === documentType ? state.values : null;

  switch (documentType) {
    case "Mutual-NDA":
      return {
        documentType,
        values: applyNdaChatFields((currentValues as NdaFormValues) ?? emptyNdaFormValues, fields),
      };
    case "CSA":
      return {
        documentType,
        values: applyCsaChatFields((currentValues as CsaFormValues) ?? emptyCsaFormValues, fields),
      };
    case "Pilot-Agreement":
      return {
        documentType,
        values: applyPilotChatFields(
          (currentValues as PilotFormValues) ?? emptyPilotFormValues,
          fields
        ),
      };
    default:
      return {
        documentType,
        values: applyGenericChatFields(
          (currentValues as GenericFormValues) ?? emptyGenericFormValues,
          fields
        ),
      };
  }
}
