"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import type { Artist } from "@/types";
import { formatPrice } from "@/lib/constants";
import Button from "./Button";
import AuthModal from "./AuthModal";

interface ArtistCardProps {
  artist: Artist;
  index: number;
}

export default function ArtistCard({ artist, index }: ArtistCardProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [showAuth, setShowAuth] = useState(false);

  const handleCommission = () => {
    if (session) {
      router.push(`/commission/${artist.slug}`);
    } else {
      setShowAuth(true);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -4 }}
        className="group bg-surface-1 border border-border rounded-2xl p-6 transition-all duration-300 hover:border-accent-from/40 hover:shadow-[0_0_40px_rgba(198,165,92,0.08)]"
      >
        {/* Artist image */}
        <div className="w-full aspect-[4/3] rounded-xl bg-surface-3 border border-border mb-5 flex items-center justify-center overflow-hidden">
          {artist.image ? (
            <img
              src={artist.image}
              alt={artist.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <svg
              className="w-10 h-10 text-text-secondary/30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.04l-.821 1.315Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z"
              />
            </svg>
          )}
        </div>

        <div className="flex items-center gap-3 mb-4">
          <h3 className="font-display text-xl text-text-primary">
            {artist.name}
          </h3>
          <span className="inline-block text-xs tracking-widest uppercase text-accent-from/80 bg-accent-from/10 px-3 py-1 rounded-full">
            {artist.genre}
          </span>
        </div>
        <p className="text-text-secondary text-sm leading-relaxed mb-6">
          {artist.tagline}
        </p>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-display bg-gradient-to-r from-accent-from to-accent-to bg-clip-text text-transparent">
            {formatPrice(artist.price)}
          </div>
          <Button
            variant="secondary"
            className="text-xs px-5 py-2"
            onClick={handleCommission}
          >
            Commission
          </Button>
        </div>
      </motion.div>

      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        artistSlug={artist.slug}
      />
    </>
  );
}
