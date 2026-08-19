export type AuthUser = {
  id: number;
  name: string;
};

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

export async function signIn(name: string): Promise<AuthUser> {
  const res = await fetch(`${apiBase()}/api/auth/signin`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) {
    throw new Error("No se pudo iniciar sesión");
  }
  return (await res.json()) as AuthUser;
}

export async function signOut(): Promise<void> {
  await fetch(`${apiBase()}/api/auth/signout`, {
    method: "POST",
    credentials: "include",
  });
}
