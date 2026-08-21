"use client";

import { useState } from "react";
import { createDocument, updateDocument, type SavedDocument } from "@/lib/documents/client";
import type { DocumentTypeId } from "@/lib/documents/types";
import type { UiDictionary } from "@/lib/i18n/ui";

/** Shared Save button (AG-65) embedded in each dedicated/generic preview's toolbar. */
export function SaveDocumentButton({
  dict,
  documentId,
  documentType,
  title,
  values,
  onSaved,
}: {
  dict: UiDictionary;
  documentId: number | null;
  documentType: DocumentTypeId;
  title: string;
  values: unknown;
  onSaved: (document: SavedDocument) => void;
}) {
  const [isSaving, setIsSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  async function handleSave() {
    setIsSaving(true);
    try {
      const saved = documentId
        ? await updateDocument(documentId, documentType, title, values)
        : await createDocument(documentType, title, values);
      onSaved(saved);
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2000);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <button
      onClick={() => void handleSave()}
      disabled={isSaving}
      className="rounded-md border border-purple-secondary px-4 py-2 font-medium text-purple-secondary hover:bg-purple-secondary/10 disabled:opacity-60"
    >
      {isSaving ? dict.app.savingButton : justSaved ? dict.app.savedNotice : dict.app.saveButton}
    </button>
  );
}
