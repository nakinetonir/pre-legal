"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { fetchCurrentUser, signOut as signOutRequest } from "./client";
import type { AuthUser } from "./types";

type AuthContextValue = {
  user: AuthUser;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * Replaces AG-62's AuthGate (AG-65): same fetch-on-mount + redirect-to-
 * /login gating, but now also exposes the current user and a signOut
 * action to the rest of the tree via context instead of every consumer
 * refetching /api/auth/me on its own.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchCurrentUser().then((current) => {
      if (cancelled) return;
      if (current) {
        setUser(current);
      } else {
        router.replace("/login");
      }
      setChecked(true);
    });
    return () => {
      cancelled = true;
    };
  }, [router]);

  const signOut = useCallback(async () => {
    await signOutRequest();
    setUser(null);
    router.replace("/login");
  }, [router]);

  if (!checked || !user) {
    return (
      <main className="flex flex-1 items-center justify-center px-4 py-10 text-sm text-gray-text">
        Cargando…
      </main>
    );
  }

  return <AuthContext.Provider value={{ user, signOut }}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
