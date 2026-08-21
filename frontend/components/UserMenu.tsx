"use client";

import { useAuth } from "@/lib/auth/AuthContext";
import type { UiDictionary } from "@/lib/i18n/ui";

const buttonClass =
  "rounded-md border border-black/15 px-3 py-1.5 hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10";

export function UserMenu({
  dict,
  onOpenMyDocuments,
  onNewDocument,
}: {
  dict: UiDictionary;
  onOpenMyDocuments: () => void;
  onNewDocument: () => void;
}) {
  const { user, signOut } = useAuth();

  return (
    <div className="flex flex-wrap items-center gap-3 text-sm">
      <span className="text-gray-text">{user.email}</span>
      <button onClick={onNewDocument} className={buttonClass}>
        {dict.app.newDocumentButton}
      </button>
      <button onClick={onOpenMyDocuments} className={buttonClass}>
        {dict.app.myDocumentsButton}
      </button>
      <button onClick={() => void signOut()} className={buttonClass}>
        {dict.app.signOutButton}
      </button>
    </div>
  );
}
