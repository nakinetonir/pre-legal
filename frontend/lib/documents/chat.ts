import type { DocumentTypeId } from "./types";

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type ChatTurn = {
  reply: string;
  fields: Record<string, unknown>;
  readyToGenerate: boolean;
  documentType: DocumentTypeId | null;
};

/**
 * Mirrors lib/auth/client.ts: in `next dev` the API lives on the separate
 * backend dev server, while the packaged app serves both from one origin.
 */
function apiBase(): string {
  if (typeof window !== "undefined" && window.location.port === "3000") {
    return "http://localhost:8000";
  }
  return "";
}

export async function fetchGreeting(): Promise<string> {
  const res = await fetch(`${apiBase()}/api/chat/greeting`, {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("No se pudo cargar el saludo del chat");
  }
  const data = (await res.json()) as { reply: string };
  return data.reply;
}

/**
 * `documentType` is null until the backend's router turn detects it
 * (backend/app/chat.py); `values` travels as whatever shape the active
 * document type owns (or `{}` before a type is known).
 */
export async function sendChatMessage(
  messages: ChatMessage[],
  documentType: DocumentTypeId | null,
  values: unknown,
  locale: string
): Promise<ChatTurn> {
  const res = await fetch(`${apiBase()}/api/chat/message`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, documentType, values: values ?? {}, locale }),
  });
  if (!res.ok) {
    throw new Error("No se pudo enviar el mensaje al chat");
  }
  return (await res.json()) as ChatTurn;
}
