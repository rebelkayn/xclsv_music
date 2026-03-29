"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "home" },
  { href: "/dashboard/profile", label: "Profile", icon: "profile" },
  { href: "/dashboard/orders", label: "Orders", icon: "orders" },
];

export default function DashboardLayout({
  children,
  artistName,
  artistImage,
}: {
  children: React.ReactNode;
  artistName: string;
  artistImage: string | null;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Sidebar */}
      <aside className="w-64 bg-surface-1 border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <Link href="/">
            <span className="font-display text-xl bg-gradient-to-r from-accent-from to-accent-to bg-clip-text text-transparent">
              XCLSV
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-accent-from/10 text-accent-from"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-2"
                }`}
              >
                <NavIcon type={item.icon} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-4 px-4">
            <div className="w-8 h-8 rounded-full bg-surface-3 border border-border flex items-center justify-center overflow-hidden flex-shrink-0">
              {artistImage ? (
                <img
                  src={artistImage}
                  alt={artistName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs text-accent-from font-display">
                  {artistName.charAt(0)}
                </span>
              )}
            </div>
            <span className="text-sm text-text-primary truncate">
              {artistName}
            </span>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full text-left px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}

function NavIcon({ type }: { type: string }) {
  const cls = "w-[18px] h-[18px] flex-shrink-0";
  switch (type) {
    case "home":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 12l9-9 9 9" />
          <path d="M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10" />
        </svg>
      );
    case "profile":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="8" r="4" />
          <path d="M5 20c0-3 3-5 7-5s7 2 7 5" />
        </svg>
      );
    case "orders":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
          <rect x="9" y="3" width="6" height="4" rx="1" />
          <path d="M9 14l2 2 4-4" />
        </svg>
      );
    default:
      return null;
  }
}
