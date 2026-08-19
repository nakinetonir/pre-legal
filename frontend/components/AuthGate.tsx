"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { fetchCurrentUser } from "@/lib/auth/client";

/** Redirects to /login when there is no session; renders children once authed. */
export function AuthGate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [status, setStatus] = useState<"checking" | "authed">("checking");

  useEffect(() => {
    let cancelled = false;
    fetchCurrentUser().then((user) => {
      if (cancelled) return;
      if (user) {
        setStatus("authed");
      } else {
        router.replace("/login");
      }
    });
    return () => {
      cancelled = true;
    };
  }, [router]);

  if (status === "checking") {
    return (
      <main className="flex flex-1 items-center justify-center px-4 py-10 text-sm text-gray-text">
        Cargando…
      </main>
    );
  }

  return <>{children}</>;
}
