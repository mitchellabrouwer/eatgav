"use client";

import { FormEvent, useRef, useState } from "react";
import { MdEmail, MdOutlineLink } from "react-icons/md";
// import { Database } from "../../../lib/types/database.types";
import { LuPartyPopper } from "react-icons/lu";
import { createClientInBrowser } from "../../utils/supabase/client";
import { PublicRoute } from "../shared/PublicRoute";

function Login() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  // const supabase = createClient<Database>();
  const supabase = createClientInBrowser();

  const signInWithEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: "http://localhost:3000/auth/callback",
      },
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage("Check your email for the login link!");
    }

    setIsSubmitting(false);
    emailInputRef.current?.focus();
  };

  return (
    <PublicRoute>
      <div className="mt-2 flex items-center justify-center text-gray-700">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
          <form onSubmit={signInWithEmail}>
            <h2 className="text-center text-2xl font-semibold text-gray-700">
              Join | Login
            </h2>
            <p className="text-center text-sm italic text-gray-400">
              simple easy login, no passwords
            </p>
            <div className="mt-5 text-gray-700">
              <div className="flex items-center justify-center space-x-4 md:flex-row md:space-x-8 md:space-y-0">
                <div className="flex flex-col items-center text-red-500">
                  <MdEmail size={24} />
                  <span className="text-xs">
                    <strong>1.</strong> Email
                  </span>
                </div>
                <div className="flex flex-col items-center text-red-500">
                  <MdOutlineLink size={24} />
                  <span className="text-xs">
                    <strong>2.</strong> Follow Link
                  </span>
                </div>
                <div className="flex flex-col items-center text-red-500">
                  <LuPartyPopper size={24} />
                  <span className="text-xs">
                    <strong>3.</strong>Celebrate
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                ref={emailInputRef}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-red-800 focus:outline-none focus:ring-red-800"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className={`mt-4 bg-red-500 flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2 ${
                isSubmitting ? "opacity-75" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Link"}
            </button>
            {message && (
              <div
                className="mt-1 text-center text-sm text-red-600"
                role="alert"
              >
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </PublicRoute>
  );
}

export default Login;
