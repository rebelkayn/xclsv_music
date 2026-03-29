"use client";

import { useState, useEffect } from "react";
import ImageUpload from "@/components/dashboard/ImageUpload";

interface ArtistProfile {
  id: string;
  name: string;
  genre: string;
  tagline: string;
  price: number;
  image: string | null;
}

export default function ProfilePage() {
  const [artist, setArtist] = useState<ArtistProfile | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/artists/me")
      .then((r) => r.json())
      .then(setArtist);
  }, []);

  async function handleSave() {
    if (!artist) return;
    setSaving(true);
    setSaved(false);

    await fetch("/api/artists/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: artist.name,
        genre: artist.genre,
        tagline: artist.tagline,
        price: artist.price,
        image: artist.image,
      }),
    });

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (!artist) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-text-secondary">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl text-text-primary mb-8">
        Edit Profile
      </h1>

      <div className="space-y-8">
        <div>
          <label className="block text-text-secondary text-xs uppercase tracking-wider mb-3">
            Profile Image
          </label>
          <div className="max-w-sm">
            <ImageUpload
              currentImage={artist.image}
              onUpload={(url) => setArtist({ ...artist, image: url })}
            />
          </div>
        </div>

        <div>
          <label className="block text-text-secondary text-xs uppercase tracking-wider mb-2">
            Name
          </label>
          <input
            type="text"
            value={artist.name}
            onChange={(e) => setArtist({ ...artist, name: e.target.value })}
            className="w-full bg-surface-2 border border-border rounded-lg px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-accent-from/60 transition-colors"
          />
        </div>

        <div>
          <label className="block text-text-secondary text-xs uppercase tracking-wider mb-2">
            Genre
          </label>
          <input
            type="text"
            value={artist.genre}
            onChange={(e) => setArtist({ ...artist, genre: e.target.value })}
            className="w-full bg-surface-2 border border-border rounded-lg px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-accent-from/60 transition-colors"
          />
        </div>

        <div>
          <label className="block text-text-secondary text-xs uppercase tracking-wider mb-2">
            Tagline
          </label>
          <textarea
            value={artist.tagline}
            onChange={(e) => setArtist({ ...artist, tagline: e.target.value })}
            rows={3}
            className="w-full bg-surface-2 border border-border rounded-lg px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-accent-from/60 transition-colors resize-none"
          />
        </div>

        <div>
          <label className="block text-text-secondary text-xs uppercase tracking-wider mb-2">
            Price ($)
          </label>
          <input
            type="number"
            value={artist.price}
            onChange={(e) =>
              setArtist({ ...artist, price: Number(e.target.value) })
            }
            className="w-full bg-surface-2 border border-border rounded-lg px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-accent-from/60 transition-colors"
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-gradient-to-r from-accent-from to-accent-to text-bg font-semibold px-8 py-3 rounded-lg text-sm uppercase tracking-wider hover:shadow-[0_0_24px_rgba(198,165,92,0.3)] transition-all disabled:opacity-40 cursor-pointer"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          {saved && (
            <span className="text-success text-sm">Profile updated!</span>
          )}
        </div>
      </div>
    </div>
  );
}
