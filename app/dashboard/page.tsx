import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function DashboardHome() {
  const session = await auth();
  const artistId = session!.user!.id;

  const [artist, orderCounts] = await Promise.all([
    prisma.artist.findUnique({
      where: { id: artistId },
      select: { name: true, image: true, genre: true },
    }),
    prisma.order.groupBy({
      by: ["status"],
      where: { artistId },
      _count: true,
    }),
  ]);

  const counts = {
    total: 0,
    active: 0,
    delivered: 0,
  };

  for (const g of orderCounts) {
    counts.total += g._count;
    if (g.status === "DEPOSITED" || g.status === "IN_PROGRESS") {
      counts.active += g._count;
    }
    if (g.status === "DELIVERED" || g.status === "UNLOCKED") {
      counts.delivered += g._count;
    }
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-text-primary mb-2">
        Welcome back, {artist?.name}
      </h1>
      <p className="text-text-secondary text-sm mb-10">
        Manage your profile and orders from here.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard label="Total Orders" value={counts.total} />
        <StatCard label="Active" value={counts.active} />
        <StatCard label="Delivered" value={counts.delivered} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/dashboard/profile"
          className="bg-surface-1 border border-border rounded-xl p-6 hover:border-accent-from/40 transition-colors group"
        >
          <h3 className="font-display text-lg text-text-primary mb-2 group-hover:text-accent-from transition-colors">
            Edit Profile
          </h3>
          <p className="text-text-secondary text-sm">
            Update your name, genre, tagline, price, and profile image.
          </p>
        </Link>
        <Link
          href="/dashboard/orders"
          className="bg-surface-1 border border-border rounded-xl p-6 hover:border-accent-from/40 transition-colors group"
        >
          <h3 className="font-display text-lg text-text-primary mb-2 group-hover:text-accent-from transition-colors">
            View Orders
          </h3>
          <p className="text-text-secondary text-sm">
            See incoming commissions and deliver songs.
          </p>
        </Link>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-surface-1 border border-border rounded-xl p-6">
      <p className="text-text-secondary text-xs uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="font-display text-3xl bg-gradient-to-r from-accent-from to-accent-to bg-clip-text text-transparent">
        {value}
      </p>
    </div>
  );
}
