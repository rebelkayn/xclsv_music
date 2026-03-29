"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";
import Button from "./Button";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  artistSlug?: string;
}

export default function AuthModal({ isOpen, onClose, artistSlug }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setMode("login");
    setName("");
    setEmail("");
    setPassword("");
    setError("");
    setLoading(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    if (mode === "signup") {
      if (!name.trim() || !email.trim() || !password.trim()) {
        setError("All fields are required");
        setLoading(false);
        return;
      }

      // Create account
      const res = await fetch("/api/auth/collector/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to create account");
        setLoading(false);
        return;
      }
    }

    // Sign in via NextAuth
    const result = await signIn("credentials", {
      email: email.toLowerCase(),
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    // Success — navigate appropriately
    if (artistSlug) {
      window.location.href = `/commission/${artistSlug}`;
    } else {
      window.location.reload();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-md bg-surface-1 border border-border rounded-2xl p-8 max-h-[90vh] overflow-y-auto"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="font-display text-2xl text-text-primary mb-2">
                {mode === "signup" ? "Create Your Account" : "Access Your Account"}
              </h2>
              <p className="text-text-secondary text-sm">
                {mode === "signup"
                  ? "Sign up to commission your exclusive song"
                  : "Sign in to access your music"}
              </p>
            </div>

            {/* Form */}
            <div className="space-y-4">
              {mode === "signup" && (
                <div>
                  <label className="block text-text-secondary text-xs tracking-widest uppercase mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full bg-surface-2 border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-accent-from/40 transition-colors"
                  />
                </div>
              )}

              <div>
                <label className="block text-text-secondary text-xs tracking-widest uppercase mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-surface-2 border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-accent-from/40 transition-colors"
                />
              </div>

              <div>
                <label className="block text-text-secondary text-xs tracking-widest uppercase mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  className="w-full bg-surface-2 border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-accent-from/40 transition-colors"
                />
              </div>

              {error && (
                <p className="text-error text-sm text-center">{error}</p>
              )}

              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full"
              >
                {loading
                  ? "Please wait..."
                  : mode === "signup" ? "Create Account" : "Sign In"}
              </Button>
            </div>

            {/* Toggle */}
            <div className="text-center mt-6">
              <button
                onClick={() => {
                  setMode(mode === "signup" ? "login" : "signup");
                  setError("");
                }}
                className="text-text-secondary text-sm hover:text-accent-from transition-colors cursor-pointer"
              >
                {mode === "signup" ? (
                  <>Already have an account? <span className="underline">Log in</span></>
                ) : (
                  <>Don&apos;t have an account? <span className="underline">Sign up</span></>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
