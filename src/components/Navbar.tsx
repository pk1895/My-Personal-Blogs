import { Link, useLocation } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import { site } from "../site.config";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type NavLinkProps = { to: string; children: React.ReactNode };

function NavLink({ to, children }: NavLinkProps) {
  const { pathname } = useLocation();
  const active = pathname === to;
  return (
    <Link
      to={to}
      className={`px-2 py-1 rounded ${active ? "font-semibold underline" : ""}`}
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSignedIn(!!data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) =>
      setSignedIn(!!s)
    );
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <nav className="sticky top-0 z-10 flex justify-between items-center p-4 bg-gray-50/80 backdrop-blur dark:bg-gray-800/60 shadow-sm">
      <Link to="/" className="text-lg font-semibold">
        {site.name}
      </Link>
      <div className="flex items-center gap-3">
        <NavLink to="/">About</NavLink>
        <NavLink to="/blog">Blog</NavLink>
        <NavLink to="/admin">Admin</NavLink>
        {signedIn ? (
          <button
            onClick={() => supabase.auth.signOut()}
            className="px-2 py-1 rounded border"
          >
            Sign out
          </button>
        ) : (
          <NavLink to="/signin">Sign in</NavLink>
        )}
        <DarkModeToggle />
      </div>
    </nav>
  );
}
