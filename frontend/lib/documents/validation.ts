import { isNdaFormValid, validateNdaForm } from "@/lib/nda/validation";
import { isCsaFormValid, validateCsaForm } from "@/lib/csa/validation";
import { isPilotFormValid, validatePilotForm } from "@/lib/pilot/validation";
import { isGenericFormValid, validateGenericForm } from "@/lib/generic/validation";
import type { DocumentState } from "./types";

/** Dispatches to the right per-type validator (lib/{nda,csa,pilot,generic}/validation.ts). */
export function isDocumentStateValid(state: DocumentState): boolean {
  switch (state.documentType) {
    case null:
      return false;
    case "Mutual-NDA":
      return isNdaFormValid(validateNdaForm(state.values));
    case "CSA":
      return isCsaFormValid(validateCsaForm(state.values));
    case "Pilot-Agreement":
      return isPilotFormValid(validatePilotForm(state.values));
    default:
      return isGenericFormValid(validateGenericForm(state.values));
  }
}
