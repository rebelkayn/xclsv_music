"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import AudioUpload from "@/components/dashboard/AudioUpload";

interface OrderDetail {
  id: string;
  collectorName: string;
  collectorEmail: string;
  status: string;
  vision: string;
  occasion: string;
  totalPrice: number;
  depositPaid: number;
  balancePaid: number;
  audioFile: string | null;
  previewFile: string | null;
  createdAt: string;
  estimatedDelivery: string;
  deliveredAt: string | null;
}

const statusColors: Record<string, string> = {
  DEPOSITED: "bg-yellow-500/10 text-yellow-500",
  IN_PROGRESS: "bg-blue-500/10 text-blue-500",
  DELIVERED: "bg-green-500/10 text-green-500",
  UNLOCKED: "bg-accent-from/10 text-accent-from",
};

export default function OrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [delivering, setDelivering] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/orders/${orderId}`)
      .then((r) => r.json())
      .then(setOrder);
  }, [orderId]);

  async function handleDeliver() {
    if (!audioUrl || !orderId) return;
    setDelivering(true);

    const res = await fetch(`/api/orders/${orderId}/deliver`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ audioFile: audioUrl }),
    });

    if (res.ok) {
      const updated = await res.json();
      setOrder({
        ...order!,
        status: updated.status,
        audioFile: updated.audioFile,
        deliveredAt: updated.deliveredAt,
      });
    }
    setDelivering(false);
  }

  if (!order) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-text-secondary">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <Link
        href="/dashboard/orders"
        className="text-text-secondary text-sm hover:text-text-primary transition-colors mb-6 inline-block"
      >
        &larr; Back to Orders
      </Link>

      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl text-text-primary">
          Order from {order.collectorName}
        </h1>
        <span
          className={`text-xs px-3 py-1 rounded-full uppercase tracking-wider ${
            statusColors[order.status] || "bg-surface-3 text-text-secondary"
          }`}
        >
          {order.status.replace("_", " ")}
        </span>
      </div>

      <div className="space-y-6">
        <div className="bg-surface-1 border border-border rounded-xl p-6">
          <h3 className="text-text-secondary text-xs uppercase tracking-wider mb-3">
            Brief
          </h3>
          <p className="text-text-primary text-sm leading-relaxed mb-4">
            {order.vision}
          </p>
          <div className="flex gap-6 text-sm">
            <div>
              <span className="text-text-secondary">Occasion: </span>
              <span className="text-text-primary capitalize">
                {order.occasion}
              </span>
            </div>
            <div>
              <span className="text-text-secondary">Email: </span>
              <span className="text-text-primary">{order.collectorEmail}</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-1 border border-border rounded-xl p-6">
          <h3 className="text-text-secondary text-xs uppercase tracking-wider mb-3">
            Payment
          </h3>
          <div className="flex gap-6 text-sm">
            <div>
              <span className="text-text-secondary">Total: </span>
              <span className="text-text-primary">
                ${(order.totalPrice / 100).toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-text-secondary">Deposit: </span>
              <span className="text-text-primary">
                ${(order.depositPaid / 100).toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-text-secondary">Balance: </span>
              <span className="text-text-primary">
                ${(order.balancePaid / 100).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {order.status === "IN_PROGRESS" && (
          <div className="bg-surface-1 border border-border rounded-xl p-6">
            <h3 className="text-text-secondary text-xs uppercase tracking-wider mb-4">
              Deliver Song
            </h3>
            <AudioUpload onUpload={(url) => setAudioUrl(url)} />
            {audioUrl && (
              <button
                onClick={handleDeliver}
                disabled={delivering}
                className="mt-4 bg-gradient-to-r from-accent-from to-accent-to text-bg font-semibold px-8 py-3 rounded-lg text-sm uppercase tracking-wider hover:shadow-[0_0_24px_rgba(198,165,92,0.3)] transition-all disabled:opacity-40 cursor-pointer"
              >
                {delivering ? "Delivering..." : "Mark as Delivered"}
              </button>
            )}
          </div>
        )}

        {(order.status === "DELIVERED" || order.status === "UNLOCKED") && (
          <div className="bg-surface-1 border border-border rounded-xl p-6">
            <h3 className="text-text-secondary text-xs uppercase tracking-wider mb-2">
              Delivery
            </h3>
            <p className="text-success text-sm">
              Song delivered
              {order.deliveredAt &&
                ` on ${new Date(order.deliveredAt).toLocaleDateString()}`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
