import type { OrderStatus as OrderStatusType } from "@/types";

interface OrderStatusProps {
  status: OrderStatusType;
}

const statusConfig: Record<
  OrderStatusType,
  { label: string; color: string; bgColor: string }
> = {
  DEPOSITED: {
    label: "Deposit Received",
    color: "text-accent-from",
    bgColor: "bg-accent-from/10",
  },
  IN_PROGRESS: {
    label: "In Progress",
    color: "text-accent-from",
    bgColor: "bg-accent-from/10",
  },
  DELIVERED: {
    label: "Delivered — Preview Available",
    color: "text-accent-to",
    bgColor: "bg-accent-to/10",
  },
  UNLOCKED: {
    label: "Unlocked — Stream Anytime",
    color: "text-success",
    bgColor: "bg-success/10",
  },
};

const allStatuses: OrderStatusType[] = [
  "DEPOSITED",
  "IN_PROGRESS",
  "DELIVERED",
  "UNLOCKED",
];

export default function OrderStatusBadge({ status }: OrderStatusProps) {
  const config = statusConfig[status];
  const currentIndex = allStatuses.indexOf(status);

  return (
    <div>
      <div
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${config.bgColor} ${config.color} text-sm font-medium mb-6`}
      >
        <span className="w-2 h-2 rounded-full bg-current" />
        {config.label}
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-1">
        {allStatuses.map((s, i) => (
          <div
            key={s}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i <= currentIndex ? "bg-accent-from" : "bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
