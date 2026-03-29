"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "⌂" },
  { href: "/dashboard/profile", label: "Profile", icon: "◉" },
  { href: "/dashboard/orders", label: "Orders", icon: "♫" },
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
                <span className="text-base">{item.icon}</span>
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
