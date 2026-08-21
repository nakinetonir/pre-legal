"use client";

import { useMemo, useState } from "react";
import { AuthProvider } from "@/lib/auth/AuthContext";
import { DocumentChat } from "@/components/DocumentChat";
import { DocumentPreview } from "@/components/DocumentPreview";
import { MyDocumentsModal } from "@/components/MyDocumentsModal";
import { UserMenu } from "@/components/UserMenu";
import type { SavedDocument } from "@/lib/documents/client";
import { EMPTY_DOCUMENT_STATE, type DocumentState } from "@/lib/documents/types";
import { isDocumentStateValid } from "@/lib/documents/validation";
import { localeForCountry } from "@/lib/i18n/locale";
import { getUiDictionary } from "@/lib/i18n/ui";

/**
 * Loading a saved document trusts its own shape (AG-65): it was written by
 * this same app's save flow (SaveDocumentButton -> lib/documents/client.ts),
 * so `documentType` and `values` are always a matching pair.
 */
function toDocumentState(document: SavedDocument): DocumentState {
  return { documentType: document.documentType, values: document.values } as DocumentState;
}

export default function Home() {
  const [documentId, setDocumentId] = useState<number | null>(null);
  const [state, setState] = useState<DocumentState>(EMPTY_DOCUMENT_STATE);
  const [showMyDocuments, setShowMyDocuments] = useState(false);

  const isValid = useMemo(() => isDocumentStateValid(state), [state]);

  const locale = localeForCountry(state.values?.governingLawCountry ?? "");
  const dict = getUiDictionary(locale);

  function handleNewDocument() {
    setDocumentId(null);
    setState(EMPTY_DOCUMENT_STATE);
  }

  function handleOpenDocument(document: SavedDocument) {
    setDocumentId(document.id);
    setState(toDocumentState(document));
    setShowMyDocuments(false);
  }

  function handleSaved(document: SavedDocument) {
    setDocumentId(document.id);
  }

  return (
    <AuthProvider>
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-10 sm:px-6">
        <header className="flex flex-wrap items-start justify-between gap-4 print:hidden">
          <div>
            <h1 className="text-2xl font-bold text-dark-navy">{dict.page.title}</h1>
            <p className="mt-1 text-sm text-black/60 dark:text-white/60">
              {dict.page.introBefore}
              <a
                href="https://commonpaper.com/standards"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                {dict.page.introLinkText}
              </a>
              {dict.page.introAfter}
            </p>
          </div>
          <UserMenu
            dict={dict}
            onOpenMyDocuments={() => setShowMyDocuments(true)}
            onNewDocument={handleNewDocument}
          />
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 print:block">
          <div className="print:hidden">
            <DocumentChat state={state} onChange={setState} />
          </div>
          <div className="lg:sticky lg:top-6 lg:self-start lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto">
            <DocumentPreview
              state={state}
              isValid={isValid}
              onAttemptInvalidAction={() => {}}
              documentId={documentId}
              onSaved={handleSaved}
            />
          </div>
        </div>
      </main>

      {showMyDocuments && (
        <MyDocumentsModal
          dict={dict}
          onClose={() => setShowMyDocuments(false)}
          onOpen={handleOpenDocument}
        />
      )}
    </AuthProvider>
  );
}
