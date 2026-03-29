import Link from "next/link";

interface CollectionCardProps {
  order: {
    id: string;
    artistName: string;
    artistImage: string | null;
    artistGenre: string;
    status: string;
    vision: string;
    totalPrice: number;
    createdAt: string;
    deliveredAt: string | null;
  };
}

const statusConfig: Record<string, { label: string; className: string }> = {
  DEPOSITED: { label: "Pending", className: "bg-yellow-500/10 text-yellow-500" },
  IN_PROGRESS: { label: "In Progress", className: "bg-blue-500/10 text-blue-500" },
  DELIVERED: { label: "Delivered", className: "bg-green-500/10 text-green-500" },
  UNLOCKED: { label: "Ready to Stream", className: "bg-accent-from/10 text-accent-from" },
};

export default function CollectionCard({ order }: CollectionCardProps) {
  const status = statusConfig[order.status] || {
    label: order.status,
    className: "bg-surface-3 text-text-secondary",
  };

  return (
    <Link
      href={`/collection/${order.id}`}
      className="block bg-surface-1 border border-border rounded-2xl overflow-hidden hover:border-accent-from/40 transition-colors group"
    >
      <div className="flex gap-5 p-5">
        {/* Artist Image */}
        <div className="w-20 h-20 rounded-xl bg-surface-3 border border-border overflow-hidden flex-shrink-0">
          {order.artistImage ? (
            <img
              src={order.artistImage}
              alt={order.artistName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-xl text-accent-from font-display">
                {order.artistName.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-display text-lg text-text-primary group-hover:text-accent-from transition-colors">
              {order.artistName}
            </h3>
            <span
              className={`text-xs px-3 py-1 rounded-full uppercase tracking-wider flex-shrink-0 ${status.className}`}
            >
              {status.label}
            </span>
          </div>

          <p className="text-text-secondary text-sm line-clamp-1 mb-2">
            {order.vision}
          </p>

          <div className="flex items-center gap-4 text-xs text-text-secondary">
            <span className="font-display text-base bg-gradient-to-r from-accent-from to-accent-to bg-clip-text text-transparent">
              ${order.totalPrice.toLocaleString()}
            </span>
            <span>{new Date(order.createdAt).toLocaleDateString()}</span>
            {order.deliveredAt && (
              <span className="text-success">
                Delivered {new Date(order.deliveredAt).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
