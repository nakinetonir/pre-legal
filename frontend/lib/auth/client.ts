import type { AuthUser } from "./types";

/**
 * In `next dev` (port 3000) the API lives on the separate backend dev server
 * (port 8000). In the packaged app, FastAPI serves the static export and the
 * API from the same origin, so relative paths are used.
 */
function apiBase(): string {
  if (typeof window !== "undefined" && window.location.port === "3000") {
    return "http://localhost:8000";
  }
  return "";
}

export async function fetchCurrentUser(): Promise<AuthUser | null> {
  const res = await fetch(`${apiBase()}/api/auth/me`, {
    credentials: "include",
  });
  if (!res.ok) return null;
  return (await res.json()) as AuthUser;
}

async function authRequest(path: string, email: string, password: string): Promise<AuthUser> {
  const res = await fetch(`${apiBase()}${path}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const message =
      res.status === 409
        ? "Ese email ya está registrado."
        : res.status === 401
          ? "Email o contraseña incorrectos."
          : res.status === 422
            ? "Revisa el email y que la contraseña tenga al menos 8 caracteres."
            : "No se pudo completar la operación.";
    throw new Error(message);
  }
  return (await res.json()) as AuthUser;
}

export function signUp(email: string, password: string): Promise<AuthUser> {
  return authRequest("/api/auth/signup", email, password);
}

export function signIn(email: string, password: string): Promise<AuthUser> {
  return authRequest("/api/auth/signin", email, password);
}

export async function signOut(): Promise<void> {
  await fetch(`${apiBase()}/api/auth/signout`, {
    method: "POST",
    credentials: "include",
  });
}
