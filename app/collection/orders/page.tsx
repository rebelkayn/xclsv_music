import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

function shortPrice(cents: number) {
  const dollars = cents / 100;
  if (dollars >= 1_000_000) return `$${(dollars / 1_000_000).toFixed(dollars % 1_000_000 === 0 ? 0 : 1)}M`;
  if (dollars >= 1_000) return `$${(dollars / 1_000).toFixed(dollars % 1_000 === 0 ? 0 : 1)}k`;
  return `$${dollars.toLocaleString()}`;
}

export default async function OrdersPage() {
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
        <h1 className="font-display text-3xl text-text-primary mb-2">Orders</h1>
        <p className="text-text-secondary text-sm">
          Full history of your commissions.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-surface-1 border border-border rounded-2xl p-16 text-center">
          <p className="text-text-secondary">No orders yet.</p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-surface-1 border border-border rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-text-secondary text-xs uppercase tracking-wider">
                  <th className="text-left px-6 py-4">Artist</th>
                  <th className="text-left px-6 py-4">Brief</th>
                  <th className="text-left px-6 py-4">Status</th>
                  <th className="text-right px-6 py-4">Amount</th>
                  <th className="text-right px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-border last:border-0 hover:bg-surface-2/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-surface-3 border border-border overflow-hidden flex-shrink-0">
                          {order.artist.image ? (
                            <img
                              src={order.artist.image}
                              alt={order.artist.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-xs text-accent-from font-display">
                                {order.artist.name.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>
                        <span className="text-text-primary font-medium">
                          {order.artist.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-text-secondary max-w-[200px] truncate">
                      {order.vision}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4 text-right font-display text-accent-from">
                      ${(order.totalPrice / 100).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right text-text-secondary">
                      {order.createdAt.toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile List */}
          <div className="md:hidden bg-surface-1 border border-border rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border text-text-secondary text-xs uppercase tracking-wider">
              <span>Artist</span>
              <span>Amount</span>
            </div>

            {orders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between px-4 py-3.5 border-b border-border last:border-0"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1 mr-4">
                  <div className="w-9 h-9 rounded-full bg-surface-3 border border-border overflow-hidden flex-shrink-0">
                    {order.artist.image ? (
                      <img
                        src={order.artist.image}
                        alt={order.artist.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-xs text-accent-from font-display">
                          {order.artist.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-text-primary text-sm font-medium truncate">
                      {order.artist.name}
                    </p>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={order.status} />
                    </div>
                  </div>
                </div>
                <span className="text-accent-from font-display text-sm flex-shrink-0">
                  {shortPrice(order.totalPrice)}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; className: string }> = {
    DEPOSITED: { label: "Pending", className: "text-yellow-500" },
    IN_PROGRESS: { label: "In Progress", className: "text-blue-500" },
    DELIVERED: { label: "Delivered", className: "text-green-500" },
    UNLOCKED: { label: "Unlocked", className: "text-accent-from" },
  };
  const c = config[status] || { label: status, className: "text-text-secondary" };
  return <span className={`text-xs ${c.className}`}>{c.label}</span>;
}
