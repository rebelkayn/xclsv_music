import Link from "next/link";

interface OrderCardProps {
  order: {
    id: string;
    collectorName: string;
    status: string;
    occasion: string;
    vision: string;
    totalPrice: number;
    createdAt: string;
  };
}

const statusColors: Record<string, string> = {
  DEPOSITED: "bg-yellow-500/10 text-yellow-500",
  IN_PROGRESS: "bg-blue-500/10 text-blue-500",
  DELIVERED: "bg-green-500/10 text-green-500",
  UNLOCKED: "bg-accent-from/10 text-accent-from",
};

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <Link
      href={`/dashboard/orders/${order.id}`}
      className="block bg-surface-1 border border-border rounded-xl p-6 hover:border-accent-from/40 transition-colors"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-text-primary font-medium">{order.collectorName}</h3>
        <span
          className={`text-xs px-3 py-1 rounded-full uppercase tracking-wider ${
            statusColors[order.status] || "bg-surface-3 text-text-secondary"
          }`}
        >
          {order.status.replace("_", " ")}
        </span>
      </div>
      <p className="text-text-secondary text-sm line-clamp-2 mb-3">
        {order.vision}
      </p>
      <div className="flex items-center justify-between text-xs text-text-secondary">
        <span className="capitalize">{order.occasion}</span>
        <span>
          ${(order.totalPrice / 100).toLocaleString()}
        </span>
      </div>
    </Link>
  );
}
