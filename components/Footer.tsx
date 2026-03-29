import { SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <div className="font-display text-xl bg-gradient-to-r from-accent-from to-accent-to bg-clip-text text-transparent">
            {SITE.name}
          </div>
          <p className="text-text-secondary text-xs mt-1">{SITE.tagline}</p>
        </div>
        <div className="flex gap-8 text-text-secondary text-xs tracking-wider uppercase">
          <a href="#" className="hover:text-text-primary transition-colors">
            About
          </a>
          <a href="#" className="hover:text-text-primary transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-text-primary transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-text-primary transition-colors">
            Contact
          </a>
        </div>
        <div className="text-text-secondary text-xs">
          &copy; 2026 {SITE.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
