"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/auth/client";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const action = mode === "signup" ? signUp : signIn;
      await action(email.trim(), password);
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo iniciar sesión.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center gap-6 px-4 py-10">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-dark-navy">Pre-Legal</h1>
        <p className="mt-1 text-sm text-gray-text">
          {mode === "signup"
            ? "Crea una cuenta para guardar tus documentos."
            : "Inicia sesión para continuar."}
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm font-medium">
          Email
          <input
            autoFocus
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="jane@acme.com"
            className="rounded-md border border-black/15 px-3 py-2 dark:border-white/20 dark:bg-transparent"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Contraseña
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Mínimo 8 caracteres"
            className="rounded-md border border-black/15 px-3 py-2 dark:border-white/20 dark:bg-transparent"
          />
        </label>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-purple-secondary px-4 py-2 font-medium text-white hover:opacity-90 disabled:opacity-60"
        >
          {isSubmitting
            ? "Un momento…"
            : mode === "signup"
              ? "Crear cuenta"
              : "Entrar"}
        </button>
        <button
          type="button"
          onClick={() => {
            setMode(mode === "signup" ? "signin" : "signup");
            setError(null);
          }}
          className="text-sm text-blue-primary hover:underline"
        >
          {mode === "signup"
            ? "¿Ya tienes cuenta? Inicia sesión"
            : "¿No tienes cuenta? Regístrate"}
        </button>
      </form>
    </main>
  );
}
