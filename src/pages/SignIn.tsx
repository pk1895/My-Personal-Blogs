import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If OAuth fragment or PKCE is in URL, let Supabase handle it
    supabase.auth.getSession(); // triggers parsing
  }, []);

  const send = async () => {
    setError(null);
    if (!email) return setError("Enter your email");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin + "/signin" },
    });
    if (error) setError(error.message);
    else setSent(true);
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-2">Sign in</h1>
      <p className="text-sm text-gray-500 mb-4">
        We’ll send you a magic link to your email.
      </p>
      {sent ? (
        <div className="p-3 rounded border bg-green-50 border-green-200 text-green-700">
          Check your inbox for the magic link.
        </div>
      ) : (
        <>
          <input
            type="email"
            className="border rounded p-2 w-full bg-transparent mb-2"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
          <button
            onClick={send}
            className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Send link
          </button>
        </>
      )}
    </div>
  );
}
