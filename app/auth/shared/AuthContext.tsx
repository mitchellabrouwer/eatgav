"use client";

import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { createClient } from "../../utils/supabase/client";

// import { Database } from "../../../lib/types/database.types";

interface AuthContextType {
  userSession: Session | null;
  loading: boolean;
  error: string | null;
  signOut: () => Promise<void>;
}
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userSession, setUserSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const supabase = createClientComponentClient<Database>();
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      setLoading(true);
      setError(null);
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
      setLoading(false);
      if (sessionError) {
        console.error("Error fetching session:", sessionError.message);
        setError(sessionError.message);
        return;
      }
      setUserSession(session);
    };

    fetchSession();
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setError(error.message);
      console.error("Error signing out:", error.message);
      return;
    }
    setUserSession(null);
    router.push("/");
  }, [router]);

  return (
    <AuthContext.Provider value={{ userSession, loading, error, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("useAuth can't be used outside a ProvideAuth.");
  }
  return auth;
};
