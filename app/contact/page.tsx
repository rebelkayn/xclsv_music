"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const genres = [
  "Hip-Hop", "R&B", "Pop", "Rock", "Country", "Jazz", "Latin", "Electronic",
  "Classical", "Gospel", "Reggae", "Soul", "Afrobeats", "Alternative", "Indie",
  "Metal", "Punk", "Blues", "Folk", "Dancehall",
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [genre, setGenre] = useState("");
  const [instagram, setInstagram] = useState("");
  const [spotify, setSpotify] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    setError("");

    if (!name.trim() || !email.trim() || !genre) {
      setError("Name, email, and genre are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, genre, instagram, spotify, message }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong.");
      } else {
        setSubmitted(true);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full bg-surface-2 border border-border rounded-lg px-4 py-3 text-text-primary text-sm placeholder:text-text-secondary/40 focus:outline-none focus:border-accent-from/40 transition-colors";

  return (
      <main className="max-w-4xl mx-auto px-6 py-16">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-lg mx-auto text-center py-20"
            >
              <div className="w-16 h-16 rounded-full bg-accent-from/10 flex items-center justify-center mx-auto mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C6A55C" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h1 className="font-display text-3xl text-text-primary mb-3">We&rsquo;ll Be in Touch</h1>
              <p className="text-text-secondary text-sm leading-relaxed mb-8">
                Thank you for your interest in joining XCLSV. Our team will review your submission and reach out if there&rsquo;s a fit. We work with a curated roster of artists to maintain the exclusivity our collectors expect.
              </p>
              <Link
                href="/"
                className="inline-block text-accent-from text-sm hover:text-accent-to transition-colors"
              >
                &larr; Back to XCLSV
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="mb-10">
                <h1 className="font-display text-4xl text-text-primary mb-3">Join XCLSV</h1>
                <p className="text-text-secondary text-sm leading-relaxed max-w-xl">
                  XCLSV is an invite-only platform for world-class artists to offer exclusive, custom-commissioned songs to collectors. If you&rsquo;re an established artist interested in joining our roster, register your interest below.
                </p>
              </div>

              <div className="max-w-lg">
                <div className="bg-surface-1 border border-border rounded-2xl overflow-hidden">
                  <div className="px-6 py-4 border-b border-border">
                    <h2 className="text-text-primary text-sm font-medium">Artist Information</h2>
                  </div>

                  <div className="p-6 space-y-5">
                    {/* Name */}
                    <div>
                      <label className="block text-text-secondary text-xs mb-2">
                        Artist / Stage Name <span className="text-accent-from">*</span>
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name or stage name"
                        className={inputCls}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-text-secondary text-xs mb-2">
                        Email <span className="text-accent-from">*</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className={inputCls}
                      />
                    </div>

                    {/* Genre */}
                    <div>
                      <label className="block text-text-secondary text-xs mb-2">
                        Primary Genre <span className="text-accent-from">*</span>
                      </label>
                      <select
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        className={`${inputCls} ${!genre ? "text-text-secondary/40" : ""}`}
                      >
                        <option value="" disabled>Select your genre</option>
                        {genres.map((g) => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                    </div>

                    {/* Instagram */}
                    <div>
                      <label className="block text-text-secondary text-xs mb-2">Instagram</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary/40 text-sm">@</span>
                        <input
                          type="text"
                          value={instagram}
                          onChange={(e) => setInstagram(e.target.value)}
                          placeholder="username"
                          className={`${inputCls} pl-8`}
                        />
                      </div>
                    </div>

                    {/* Spotify */}
                    <div>
                      <label className="block text-text-secondary text-xs mb-2">Spotify Artist Link</label>
                      <input
                        type="url"
                        value={spotify}
                        onChange={(e) => setSpotify(e.target.value)}
                        placeholder="https://open.spotify.com/artist/..."
                        className={inputCls}
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-text-secondary text-xs mb-2">Why XCLSV?</label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us about yourself and why you'd be a great fit for XCLSV..."
                        rows={4}
                        className={`${inputCls} resize-none`}
                      />
                    </div>

                    {/* Error */}
                    {error && (
                      <p className="text-error text-xs">{error}</p>
                    )}

                    {/* Submit */}
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-accent-from to-accent-to text-bg font-semibold py-3 rounded-lg text-sm uppercase tracking-wider hover:shadow-[0_0_24px_rgba(198,165,92,0.3)] transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {loading ? "Submitting..." : "Register Interest"}
                    </button>
                  </div>
                </div>

                <p className="text-text-secondary/40 text-xs text-center mt-6">
                  XCLSV is invite-only. Submitting this form does not guarantee acceptance.
                  <br />
                  We&rsquo;ll review your profile and reach out within 7 business days.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
  );
}
