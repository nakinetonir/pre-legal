import type { NdaFormValues } from "./types";
import type { NdaChatFields } from "./chatFields";

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type ChatTurn = {
  reply: string;
  fields: NdaChatFields;
  readyToGenerate: boolean;
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

export async function sendChatMessage(
  messages: ChatMessage[],
  values: NdaFormValues,
  locale: string
): Promise<ChatTurn> {
  const res = await fetch(`${apiBase()}/api/chat/message`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, values, locale }),
  });
  if (!res.ok) {
    throw new Error("No se pudo enviar el mensaje al chat");
  }
  return (await res.json()) as ChatTurn;
}
