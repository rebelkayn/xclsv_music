import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";
import CollectionCard from "@/components/collector/CollectionCard";

export default async function CollectionPage() {
  const session = await auth();
  const collectorId = session!.user!.id;

  const orders = await prisma.order.findMany({
    where: { collectorId },
    include: {
      artist: {
        select: { name: true, slug: true, image: true, genre: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-10">
        <h1 className="font-display text-3xl text-text-primary mb-2">
          My Collection
        </h1>
        <p className="text-text-secondary text-sm">
          Your commissioned songs and their status.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-surface-1 border border-border rounded-2xl p-16 text-center">
          <div className="mb-4">
            <svg
              className="w-12 h-12 text-text-secondary/20 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"
              />
            </svg>
          </div>
          <p className="text-text-secondary mb-1">No commissions yet.</p>
          <p className="text-text-secondary/50 text-sm mb-6">
            Commission an exclusive song from a world-class artist.
          </p>
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-accent-from to-accent-to text-bg font-semibold px-8 py-3 rounded-lg text-sm uppercase tracking-wider hover:shadow-[0_0_24px_rgba(198,165,92,0.3)] transition-all"
          >
            Browse Artists
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <CollectionCard
              key={order.id}
              order={{
                id: order.id,
                artistName: order.artist.name,
                artistImage: order.artist.image,
                artistGenre: order.artist.genre,
                status: order.status,
                vision: order.vision,
                totalPrice: order.totalPrice / 100,
                createdAt: order.createdAt.toISOString(),
                deliveredAt: order.deliveredAt?.toISOString() || null,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
