"use client";

import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { SITE } from "@/lib/constants";
import AuthModal from "./AuthModal";

export default function Navbar() {
  const { data: session } = useSession();
  const [showAuth, setShowAuth] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-40 bg-bg/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="font-display text-xl tracking-widest bg-gradient-to-r from-accent-from to-accent-to bg-clip-text text-transparent">
            {SITE.name}
          </a>

          {/* Desktop — Avatar */}
          <div className="hidden md:block relative" ref={dropdownRef}>
            {session ? (
              <div
                className="relative"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <button className="w-9 h-9 rounded-full bg-surface-2 border border-border flex items-center justify-center hover:border-accent-from/40 transition-colors cursor-pointer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-secondary">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M5 20c0-3 3-5 7-5s7 2 7 5" />
                  </svg>
                </button>

                {/* Dropdown */}
                {showDropdown && (
                  <div className="absolute right-0 top-full mt-1 w-56 bg-surface-1 border border-border rounded-xl shadow-xl py-2">
                    <div className="px-4 py-2 border-b border-border">
                      <p className="text-text-primary text-sm truncate">{session.user?.name || "Account"}</p>
                      <p className="text-text-secondary text-xs truncate">{session.user?.email}</p>
                    </div>
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="w-full text-left px-4 py-2.5 text-text-secondary text-sm hover:text-text-primary hover:bg-surface-2 transition-colors cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="flex items-center gap-2 h-9 pl-4 pr-1.5 rounded-full bg-surface-2 border border-border hover:border-accent-from/40 transition-colors cursor-pointer"
              >
                <span className="text-text-secondary text-xs tracking-widest uppercase">Sign In</span>
                <div className="w-6 h-6 rounded-full bg-surface-3 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-secondary">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M5 20c0-3 3-5 7-5s7 2 7 5" />
                  </svg>
                </div>
              </button>
            )}
          </div>

          {/* Mobile — Sign In pill or Avatar */}
          <div className="md:hidden relative" ref={dropdownRef}>
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="w-9 h-9 rounded-full bg-surface-2 border border-border flex items-center justify-center hover:border-accent-from/40 transition-colors cursor-pointer"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-secondary">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M5 20c0-3 3-5 7-5s7 2 7 5" />
                  </svg>
                </button>

                {mobileOpen && (
                  <div className="absolute right-0 top-full mt-1 w-56 bg-surface-1 border border-border rounded-xl shadow-xl py-2">
                    <div className="px-4 py-2 border-b border-border">
                      <p className="text-text-primary text-sm truncate">{session.user?.name || "Account"}</p>
                      <p className="text-text-secondary text-xs truncate">{session.user?.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        signOut({ callbackUrl: "/" });
                        setMobileOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-text-secondary text-sm hover:text-text-primary hover:bg-surface-2 transition-colors cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="flex items-center gap-2 h-9 pl-4 pr-1.5 rounded-full bg-surface-2 border border-border hover:border-accent-from/40 transition-colors cursor-pointer"
              >
                <span className="text-text-secondary text-xs tracking-widest uppercase">Sign In</span>
                <div className="w-6 h-6 rounded-full bg-surface-3 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-secondary">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M5 20c0-3 3-5 7-5s7 2 7 5" />
                  </svg>
                </div>
              </button>
            )}
          </div>
        </div>
      </nav>

      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </>
  );
}
