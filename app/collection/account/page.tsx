"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function AccountPage() {
  const { data: session, update } = useSession();

  // Name
  const [name, setName] = useState(session?.user?.name || "");
  const [nameLoading, setNameLoading] = useState(false);
  const [nameMsg, setNameMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Password
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);
  const [pwMsg, setPwMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleUpdateName = async () => {
    setNameMsg(null);
    if (!name.trim()) {
      setNameMsg({ type: "error", text: "Name is required" });
      return;
    }
    setNameLoading(true);
    try {
      const res = await fetch("/api/auth/collector/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setNameMsg({ type: "error", text: data.error || "Failed to update" });
      } else {
        setNameMsg({ type: "success", text: "Name updated" });
        update();
      }
    } catch {
      setNameMsg({ type: "error", text: "Something went wrong" });
    } finally {
      setNameLoading(false);
    }
  };

  const handleChangePassword = async () => {
    setPwMsg(null);
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPwMsg({ type: "error", text: "All fields are required" });
      return;
    }
    if (newPassword.length < 6) {
      setPwMsg({ type: "error", text: "New password must be at least 6 characters" });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwMsg({ type: "error", text: "New passwords don't match" });
      return;
    }
    setPwLoading(true);
    try {
      const res = await fetch("/api/auth/collector/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPwMsg({ type: "error", text: data.error || "Failed to update password" });
      } else {
        setPwMsg({ type: "success", text: "Password updated successfully" });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch {
      setPwMsg({ type: "error", text: "Something went wrong" });
    } finally {
      setPwLoading(false);
    }
  };

  const EyeIcon = ({ visible }: { visible: boolean }) =>
    visible ? (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </svg>
    ) : (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );

  const inputCls =
    "w-full bg-surface-2 border border-border rounded-lg px-4 py-3 text-text-primary text-sm placeholder:text-text-secondary/40 focus:outline-none focus:border-accent-from/40 transition-colors";

  const btnCls =
    "bg-gradient-to-r from-accent-from to-accent-to text-bg font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all disabled:opacity-30 disabled:cursor-default disabled:shadow-none enabled:hover:shadow-[0_0_24px_rgba(198,165,92,0.3)] enabled:cursor-pointer";

  const nameChanged = name.trim() !== "" && name !== (session?.user?.name || "");
  const pwReady = currentPassword.length > 0 && newPassword.length >= 6 && confirmPassword.length > 0;

  return (
    <div>
      <div className="mb-10">
        <h1 className="font-display text-3xl text-text-primary mb-2">Account</h1>
        <p className="text-text-secondary text-sm">
          Manage your profile and security.
        </p>
      </div>

      <div className="space-y-8 max-w-lg">
        {/* Profile Section */}
        <section className="bg-surface-1 border border-border rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-text-primary text-sm font-medium">Profile</h2>
          </div>

          <div className="p-6 space-y-5">
            {/* Email — read only */}
            <div>
              <label className="block text-text-secondary text-xs mb-2">Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={session?.user?.email || ""}
                  disabled
                  className={`${inputCls} opacity-50 cursor-not-allowed pr-12`}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary/40">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Name — editable */}
            <div>
              <label className="block text-text-secondary text-xs mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className={inputCls}
              />
            </div>

            {nameMsg && (
              <p className={`text-xs ${nameMsg.type === "success" ? "text-success" : "text-error"}`}>
                {nameMsg.text}
              </p>
            )}

            <button
              onClick={handleUpdateName}
              disabled={nameLoading || !nameChanged}
              className={btnCls}
            >
              {nameLoading ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </section>

        {/* Security Section */}
        <section className="bg-surface-1 border border-border rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-text-primary text-sm font-medium">Security</h2>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-text-secondary text-xs mb-2">Current password</label>
              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`${inputCls} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                >
                  <EyeIcon visible={showCurrent} />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-text-secondary text-xs mb-2">New password</label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`${inputCls} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                >
                  <EyeIcon visible={showNew} />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-text-secondary text-xs mb-2">Confirm new password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                onKeyDown={(e) => e.key === "Enter" && handleChangePassword()}
                className={inputCls}
              />
            </div>

            {pwMsg && (
              <p className={`text-xs ${pwMsg.type === "success" ? "text-success" : "text-error"}`}>
                {pwMsg.text}
              </p>
            )}

            <button
              onClick={handleChangePassword}
              disabled={pwLoading || !pwReady}
              className={btnCls}
            >
              {pwLoading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
