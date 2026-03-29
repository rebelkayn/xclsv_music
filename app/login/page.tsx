"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <main className="min-h-screen bg-bg flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl bg-gradient-to-r from-accent-from to-accent-to bg-clip-text text-transparent mb-2">
            XCLSV
          </h1>
          <p className="text-text-secondary text-sm">Artist Dashboard</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-surface-1 border border-border rounded-2xl p-8 space-y-6"
        >
          <div>
            <label className="block text-text-secondary text-xs uppercase tracking-wider mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-surface-2 border border-border rounded-lg px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-accent-from/60 transition-colors"
              placeholder="artist@xclsv.com"
            />
          </div>

          <div>
            <label className="block text-text-secondary text-xs uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-surface-2 border border-border rounded-lg px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-accent-from/60 transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-error text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-accent-from to-accent-to text-bg font-semibold py-3 rounded-lg text-sm uppercase tracking-wider hover:shadow-[0_0_24px_rgba(198,165,92,0.3)] transition-all disabled:opacity-40 cursor-pointer"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}
