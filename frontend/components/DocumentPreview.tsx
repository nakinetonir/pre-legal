import { NdaPreview } from "./NdaPreview";
import { CsaPreview } from "./CsaPreview";
import { PilotPreview } from "./PilotPreview";
import { GenericPreview } from "./GenericPreview";
import type { SavedDocument } from "@/lib/documents/client";
import type { DocumentState } from "@/lib/documents/types";
import { localeForCountry } from "@/lib/i18n/locale";
import { getUiDictionary } from "@/lib/i18n/ui";

/** Dispatches to the right dedicated/generic preview component by document type (AG-64). */
export function DocumentPreview({
  state,
  isValid,
  onAttemptInvalidAction,
  documentId,
  onSaved,
}: {
  state: DocumentState;
  isValid: boolean;
  onAttemptInvalidAction: () => void;
  documentId: number | null;
  onSaved: (document: SavedDocument) => void;
}) {
  if (state.documentType === null) {
    const dict = getUiDictionary(localeForCountry(""));
    return (
      <div className="flex h-[70vh] items-center justify-center rounded-lg border border-black/10 dark:border-white/15 p-8 text-center text-sm text-black/50 dark:text-white/50">
        {dict.app.noDocumentSelected}
      </div>
    );
  }

  switch (state.documentType) {
    case "Mutual-NDA":
      return (
        <NdaPreview
          values={state.values}
          isValid={isValid}
          onAttemptInvalidAction={onAttemptInvalidAction}
          documentId={documentId}
          onSaved={onSaved}
        />
      );
    case "CSA":
      return (
        <CsaPreview
          values={state.values}
          isValid={isValid}
          onAttemptInvalidAction={onAttemptInvalidAction}
          documentId={documentId}
          onSaved={onSaved}
        />
      );
    case "Pilot-Agreement":
      return (
        <PilotPreview
          values={state.values}
          isValid={isValid}
          onAttemptInvalidAction={onAttemptInvalidAction}
          documentId={documentId}
          onSaved={onSaved}
        />
      );
    default:
      return (
        <GenericPreview
          documentType={state.documentType}
          values={state.values}
          isValid={isValid}
          onAttemptInvalidAction={onAttemptInvalidAction}
          documentId={documentId}
          onSaved={onSaved}
        />
      );
  }
}
