import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import CommissionForm from "@/components/CommissionForm";

export const dynamic = "force-dynamic";

export default async function CommissionPage({
  params,
}: {
  params: Promise<{ artistSlug: string }>;
}) {
  const { artistSlug } = await params;
  const dbArtist = await prisma.artist.findUnique({
    where: { slug: artistSlug },
    select: { slug: true, name: true, genre: true, tagline: true, price: true, image: true },
  });

  if (!dbArtist) {
    notFound();
  }

  const artist = { ...dbArtist, price: dbArtist.price / 100, image: dbArtist.image || "" };

  return (
    <main className="min-h-screen bg-bg">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <Link
          href="/"
          className="text-text-secondary text-sm hover:text-text-primary transition-colors mb-8 inline-block"
        >
          &larr; Back to Artists
        </Link>

        {/* Artist Summary */}
        <div className="flex items-center gap-5 mb-12">
          <div className="w-20 h-20 rounded-full bg-surface-3 border border-border flex-shrink-0 overflow-hidden">
            {artist.image ? (
              <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-2xl text-accent-from font-display">
                  {artist.name.charAt(0)}
                </span>
              </div>
            )}
          </div>
          <div>
            <h1 className="font-display text-3xl text-text-primary">
              Commission {artist.name}
            </h1>
            <span className="text-accent-from/80 text-xs tracking-widest uppercase">
              {artist.genre}
            </span>
          </div>
        </div>

        <CommissionForm artist={artist} />
      </div>
    </main>
  );
}
