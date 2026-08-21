"use client";

import { useEffect, useRef, useState } from "react";
import { applyChatFieldsForType } from "@/lib/documents/applyChatFields";
import { fetchGreeting, sendChatMessage, type ChatMessage } from "@/lib/documents/chat";
import type { DocumentState } from "@/lib/documents/types";
import { localeForCountry } from "@/lib/i18n/locale";
import { getUiDictionary } from "@/lib/i18n/ui";

const inputClass =
  "flex-1 resize-none rounded-md border bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 border-black/15 dark:border-white/20";

/**
 * Generalizes the former NdaChat.tsx (AG-63) to all 11 catalog types
 * (AG-64): `state.documentType` starts null and is set once the backend's
 * router turn (backend/app/chat.py) detects it from the conversation.
 */
export function DocumentChat({
  state,
  onChange,
}: {
  state: DocumentState;
  onChange: (state: DocumentState) => void;
}) {
  const locale = localeForCountry(state.values?.governingLawCountry ?? "");
  const dict = getUiDictionary(locale);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(false);
  const [readyToGenerate, setReadyToGenerate] = useState(false);

  const stateRef = useRef(state);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    fetchGreeting()
      .then((reply) => setMessages([{ role: "assistant", content: reply }]))
      .catch(() => setError(true));
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, isSending]);

  useEffect(() => {
    if (!isSending) inputRef.current?.focus();
  }, [isSending]);

  async function submit(history: ChatMessage[]) {
    setIsSending(true);
    setError(false);
    try {
      const current = stateRef.current;
      const turn = await sendChatMessage(history, current.documentType, current.values, locale);
      setMessages((prev) => [...prev, { role: "assistant", content: turn.reply }]);
      if (turn.documentType) {
        onChange(applyChatFieldsForType(current, turn.documentType, turn.fields));
      }
      setReadyToGenerate(turn.readyToGenerate);
    } catch {
      setError(true);
    } finally {
      setIsSending(false);
    }
  }

  function handleSend() {
    const text = input.trim();
    if (!text || isSending) return;
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    void submit(next);
  }

  function handleRetry() {
    void submit(messages);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex h-[70vh] flex-col gap-3 rounded-lg border border-black/10 dark:border-white/15 p-4">
      <div ref={scrollRef} className="flex flex-1 flex-col gap-3 overflow-y-auto">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap ${
              m.role === "user"
                ? "self-end bg-blue-600 text-white"
                : "self-start bg-black/5 dark:bg-white/10"
            }`}
          >
            {m.content}
          </div>
        ))}
        {isSending && (
          <div className="self-start text-xs text-black/50 dark:text-white/50">
            {dict.chat.thinkingIndicator}
          </div>
        )}
      </div>

      {readyToGenerate && (
        <div className="rounded-md bg-green-600/10 px-3 py-2 text-xs text-green-700 dark:text-green-400">
          {dict.chat.readyBanner}
        </div>
      )}

      {error && (
        <div className="flex items-center justify-between gap-3 rounded-md bg-red-600/10 px-3 py-2 text-xs text-red-700 dark:text-red-400">
          <span>{dict.chat.errorMessage}</span>
          <button
            onClick={handleRetry}
            className="shrink-0 rounded border border-red-600/30 px-2 py-1 font-medium hover:bg-red-600/10"
          >
            {dict.chat.retryButton}
          </button>
        </div>
      )}

      <div className="flex gap-2">
        <textarea
          ref={inputRef}
          rows={2}
          value={input}
          disabled={isSending}
          placeholder={dict.chat.inputPlaceholder}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className={inputClass}
        />
        <button
          onClick={handleSend}
          disabled={isSending || !input.trim()}
          className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {dict.chat.sendButton}
        </button>
      </div>
    </div>
  );
}
