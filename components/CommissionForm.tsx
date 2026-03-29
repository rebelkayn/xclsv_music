"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import type { Artist } from "@/types";
import { formatPrice, occasions } from "@/lib/constants";
import Button from "./Button";
import PriceBreakdown from "./PriceBreakdown";
import TermsCheckbox from "./TermsCheckbox";

interface CommissionFormProps {
  artist: Artist;
}

export default function CommissionForm({ artist }: CommissionFormProps) {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (session?.user) {
      if (session.user.name && !name) setName(session.user.name);
      if (session.user.email && !email) setEmail(session.user.email);
    }
  }, [session]);
  const [vision, setVision] = useState("");
  const [occasion, setOccasion] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isValid =
    name.trim() && email.trim() && vision.trim() && occasion && termsAgreed;

  const handleSubmit = () => {
    if (!isValid) return;
    // In production: create Stripe checkout session via API
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-20">
        <div className="text-5xl mb-6">&#10003;</div>
        <h2 className="font-display text-3xl text-text-primary mb-4">
          Deposit Confirmed
        </h2>
        <p className="text-text-secondary text-lg max-w-md mx-auto mb-2">
          Your commission with {artist.name} is now in progress.
        </p>
        <p className="text-text-secondary text-sm">
          Deposit: {formatPrice(artist.price / 2)} &middot; Estimated delivery
          in 7 days
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
      <div className="lg:col-span-3 space-y-6">
        <div>
          <label className="block text-text-secondary text-xs tracking-widest uppercase mb-2">
            Your Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className="w-full bg-surface-2 border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-accent-from/40 transition-colors"
          />
        </div>
        <div>
          <label className="block text-text-secondary text-xs tracking-widest uppercase mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            readOnly={!!session?.user?.email}
            onChange={(e) => !session?.user?.email && setEmail(e.target.value)}
            placeholder="your@email.com"
            className={`w-full bg-surface-2 border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-accent-from/40 transition-colors ${session?.user?.email ? "opacity-60 cursor-not-allowed" : ""}`}
          />
        </div>
        <div>
          <label className="block text-text-secondary text-xs tracking-widest uppercase mb-2">
            Personalize Your Song
          </label>
          <textarea
            value={vision}
            onChange={(e) =>
              setVision(e.target.value.slice(0, 100))
            }
            placeholder="Include your name or a line that you want included in your song."
            rows={5}
            className="w-full bg-surface-2 border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-accent-from/40 transition-colors resize-none"
          />
          <div className="text-right text-text-secondary text-xs mt-1">
            {vision.length}/100
          </div>
        </div>
        <div>
          <label className="block text-text-secondary text-xs tracking-widest uppercase mb-2">
            Occasion
          </label>
          <select
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            className="w-full bg-surface-2 border border-border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-from/40 transition-colors appearance-none"
          >
            <option value="">Select an occasion</option>
            {occasions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <TermsCheckbox checked={termsAgreed} onChange={setTermsAgreed} />
        <Button onClick={handleSubmit} disabled={!isValid} className="w-full">
          Pay Deposit &middot; {formatPrice(artist.price / 2)}
        </Button>
      </div>
      <div className="lg:col-span-2 lg:mt-6">
        <PriceBreakdown totalPrice={artist.price} />
      </div>
    </div>
  );
}
