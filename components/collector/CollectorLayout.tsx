"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/collection", label: "My Collection", icon: "collection" },
  { href: "/collection/orders", label: "Orders", icon: "orders" },
  { href: "/collection/billing", label: "Billing", icon: "billing" },
  { href: "/collection/account", label: "Account", icon: "account" },
];

interface CollectorLayoutProps {
  userName: string;
  children: React.ReactNode;
}

export default function CollectorLayout({
  userName,
  children,
}: CollectorLayoutProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isNavActive = (href: string) => {
    if (href === "/collection") {
      return (
        pathname === "/collection" ||
        (!!pathname.match(/^\/collection\/[^/]+$/) &&
          !pathname.startsWith("/collection/orders") &&
          !pathname.startsWith("/collection/billing") &&
          !pathname.startsWith("/collection/account"))
      );
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-surface-1 border-r border-border flex-col hidden md:flex">
        <div className="p-6 border-b border-border">
          <Link href="/">
            <span className="font-display text-xl tracking-widest bg-gradient-to-r from-accent-from to-accent-to bg-clip-text text-transparent">
              XCLSV
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                isNavActive(item.href)
                  ? "bg-accent-from/10 text-accent-from"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface-2"
              }`}
            >
              <NavIcon type={item.icon} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-4 px-4">
            <div className="w-8 h-8 rounded-full bg-surface-3 border border-border flex items-center justify-center flex-shrink-0">
              <span className="text-xs text-accent-from font-display">
                {userName.charAt(0)}
              </span>
            </div>
            <span className="text-sm text-text-primary truncate">
              {userName}
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

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-bg/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-6 h-16">
          <Link href="/">
            <span className="font-display text-xl tracking-widest bg-gradient-to-r from-accent-from to-accent-to bg-clip-text text-transparent">
              XCLSV
            </span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="w-9 h-9 rounded-full bg-surface-2 border border-border flex items-center justify-center hover:border-accent-from/40 transition-colors cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-secondary">
              <circle cx="12" cy="8" r="4" />
              <path d="M5 20c0-3 3-5 7-5s7 2 7 5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Side Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="md:hidden fixed top-0 right-0 bottom-0 z-50 w-72 bg-surface-1 border-l border-border flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <span className="font-display text-lg bg-gradient-to-r from-accent-from to-accent-to bg-clip-text text-transparent">
                  XCLSV
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-surface-2 border border-border flex items-center justify-center hover:border-accent-from/40 transition-colors cursor-pointer"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-secondary">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Nav */}
              <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                        isNavActive(item.href)
                          ? "bg-accent-from/10 text-accent-from"
                          : "text-text-secondary hover:text-text-primary hover:bg-surface-2"
                      }`}
                    >
                      <NavIcon type={item.icon} />
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Footer */}
              <div className="p-4 border-t border-border">
                <div className="flex items-center gap-3 mb-4 px-4">
                  <div className="w-8 h-8 rounded-full bg-surface-3 border border-border flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-accent-from font-display">
                      {userName.charAt(0)}
                    </span>
                  </div>
                  <span className="text-sm text-text-primary truncate">
                    {userName}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto md:pt-8 pt-22">{children}</main>
    </div>
  );
}

function NavIcon({ type }: { type: string }) {
  const cls = "w-[18px] h-[18px] flex-shrink-0";
  switch (type) {
    case "collection":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
          <path d="M19.5 2.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0L9 5.25" />
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
    case "billing":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <path d="M2 10h20" />
          <path d="M6 15h4" />
        </svg>
      );
    case "account":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="8" r="4" />
          <path d="M5 20c0-3 3-5 7-5s7 2 7 5" />
        </svg>
      );
    default:
      return null;
  }
}
