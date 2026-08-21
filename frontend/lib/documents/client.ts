import type { DocumentTypeId } from "./types";

export type DocumentSummary = {
  id: number;
  documentType: DocumentTypeId;
  title: string;
  updatedAt: string;
};

export type SavedDocument = DocumentSummary & {
  values: Record<string, unknown>;
  createdAt: string;
};

/** Mirrors lib/auth/client.ts: same dev-vs-packaged API base resolution. */
function apiBase(): string {
  if (typeof window !== "undefined" && window.location.port === "3000") {
    return "http://localhost:8000";
  }
  return "";
}

async function parseOrThrow<T>(res: Response, errorMessage: string): Promise<T> {
  if (!res.ok) throw new Error(errorMessage);
  return (await res.json()) as T;
}

export async function listDocuments(): Promise<DocumentSummary[]> {
  const res = await fetch(`${apiBase()}/api/documents`, { credentials: "include" });
  return parseOrThrow(res, "No se pudieron cargar los documentos");
}

export async function getDocument(id: number): Promise<SavedDocument> {
  const res = await fetch(`${apiBase()}/api/documents/${id}`, { credentials: "include" });
  return parseOrThrow(res, "No se pudo cargar el documento");
}

export async function createDocument(
  documentType: DocumentTypeId,
  title: string,
  values: unknown
): Promise<SavedDocument> {
  const res = await fetch(`${apiBase()}/api/documents`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ documentType, title, values }),
  });
  return parseOrThrow(res, "No se pudo guardar el documento");
}

export async function updateDocument(
  id: number,
  documentType: DocumentTypeId,
  title: string,
  values: unknown
): Promise<SavedDocument> {
  const res = await fetch(`${apiBase()}/api/documents/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ documentType, title, values }),
  });
  return parseOrThrow(res, "No se pudo guardar el documento");
}

export async function deleteDocument(id: number): Promise<void> {
  const res = await fetch(`${apiBase()}/api/documents/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("No se pudo eliminar el documento");
}
