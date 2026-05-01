import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../utils/supabase";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtener sesión actual
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    // Escuchar cambios de sesión (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return <p>Cargando...</p>;

  // Si no hay sesión → fuera
  if (!session) {
    return <Navigate to="/" replace />;
  }

  // Si hay sesión → pasa
  return children;
}