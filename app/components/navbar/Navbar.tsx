"use client";

import Link from "next/link";
import { useAuth } from "../../auth/shared/AuthContext";
import Spinner from "../ui/Spinner";
import UserDropdown from "./UserDropdown";

export default function Navbar() {
  const { userSession, loading, error, signOut } = useAuth();

  if (loading)
    return (
      <header className="p-4 text-white">
        <nav className="container mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-semibold">
            Company
          </Link>
          <div>
            <Spinner size="10" />
          </div>
        </nav>
      </header>
    );

  if (error) return <div className="m-auto">Error: {error}</div>;

  return (
    <header className="p-4 text-white">
      <nav className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-semibold">
          Company Name
        </Link>
        <div>
          <div>
            {/* TODO: gets stuck loading on initial load */}
            {userSession ? (
              <UserDropdown userSession={userSession} handleSignOut={signOut} />
            ) : (
              <Link
                href="/auth/login"
                className="mr-4 text-white hover:underline"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
