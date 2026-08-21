"use client";

import { useEffect, useState } from "react";
import {
  deleteDocument,
  getDocument,
  listDocuments,
  type DocumentSummary,
  type SavedDocument,
} from "@/lib/documents/client";
import type { UiDictionary } from "@/lib/i18n/ui";

export function MyDocumentsModal({
  dict,
  onClose,
  onOpen,
}: {
  dict: UiDictionary;
  onClose: () => void;
  onOpen: (document: SavedDocument) => void;
}) {
  const [documents, setDocuments] = useState<DocumentSummary[] | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);

  useEffect(() => {
    listDocuments()
      .then(setDocuments)
      .catch(() => setDocuments([]));
  }, []);

  async function handleOpen(id: number) {
    setBusyId(id);
    try {
      const document = await getDocument(id);
      onOpen(document);
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm(dict.app.deleteConfirm)) return;
    setBusyId(id);
    try {
      await deleteDocument(id);
      setDocuments((prev) => (prev ?? []).filter((doc) => doc.id !== id));
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6 dark:bg-neutral-900">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-dark-navy dark:text-white">
            {dict.app.myDocumentsTitle}
          </h2>
          <button
            onClick={onClose}
            className="text-sm text-black/60 hover:underline dark:text-white/60"
          >
            {dict.app.closeButton}
          </button>
        </div>

        {documents === null && <p className="text-sm text-gray-text">…</p>}
        {documents?.length === 0 && (
          <p className="text-sm text-gray-text">{dict.app.myDocumentsEmpty}</p>
        )}

        <ul className="flex flex-col gap-2">
          {documents?.map((document) => (
            <li
              key={document.id}
              className="flex items-center justify-between gap-3 rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/15"
            >
              <div className="min-w-0">
                <p className="truncate font-medium">{document.title}</p>
                <p className="text-xs text-gray-text">
                  {dict.documentTypeNames[document.documentType]}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => handleOpen(document.id)}
                  disabled={busyId === document.id}
                  className="rounded border border-blue-primary px-2 py-1 text-blue-primary hover:bg-blue-primary/10 disabled:opacity-60"
                >
                  {dict.app.openButton}
                </button>
                <button
                  onClick={() => handleDelete(document.id)}
                  disabled={busyId === document.id}
                  className="rounded border border-red-600 px-2 py-1 text-red-600 hover:bg-red-600/10 disabled:opacity-60"
                >
                  {dict.app.deleteButton}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
