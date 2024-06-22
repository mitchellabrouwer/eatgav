"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import Spinner from "../../components/ui/Spinner";
import { useAuth } from "./AuthContext";

export const ProtectedRoute: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { userSession, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !userSession) {
      router.replace("/auth/login");
    }
  }, [loading, userSession, router]);

  if (loading || !userSession) {
    return <Spinner fullscreen />;
  }

  // if (!userSession) {
  //   return null;
  // }

  return children;
};
