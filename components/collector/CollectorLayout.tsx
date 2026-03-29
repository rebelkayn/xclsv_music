"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { SITE } from "@/lib/constants";

interface CollectorLayoutProps {
  userName: string;
  children: React.ReactNode;
}

export default function CollectorLayout({
  userName,
  children,
}: CollectorLayoutProps) {
  return (
    <div className="min-h-screen bg-bg">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-surface-1 border-b border-border">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
          <Link
            href="/"
            className="font-display text-lg tracking-widest bg-gradient-to-r from-accent-from to-accent-to bg-clip-text text-transparent"
          >
            {SITE.name}
          </Link>

          <h1 className="hidden md:block text-text-secondary text-sm tracking-widest uppercase">
            My Collection
          </h1>

          <div className="flex items-center gap-4">
            <span className="hidden md:block text-text-secondary text-sm truncate max-w-[150px]">
              {userName}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-text-secondary text-xs tracking-widest uppercase hover:text-text-primary transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-10">{children}</main>
    </div>
  );
}
