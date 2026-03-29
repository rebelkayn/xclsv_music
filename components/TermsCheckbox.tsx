"use client";

import { SITE } from "@/lib/constants";

interface TermsCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function TermsCheckbox({
  checked,
  onChange,
}: TermsCheckboxProps) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <div className="relative mt-0.5">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-5 h-5 rounded border border-border bg-surface-2 peer-checked:bg-accent-from peer-checked:border-accent-from transition-all flex items-center justify-center">
          {checked && (
            <svg
              className="w-3 h-3 text-bg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
      </div>
      <span className="text-text-secondary text-sm leading-relaxed group-hover:text-text-primary transition-colors">
        {SITE.termsText}
      </span>
    </label>
  );
}
