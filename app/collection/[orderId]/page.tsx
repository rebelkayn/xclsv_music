"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

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
  artist: {
    name: string;
    slug: string;
    image: string | null;
    genre: string;
  };
}

const statusConfig: Record<
  string,
  { label: string; description: string; className: string }
> = {
  DEPOSITED: {
    label: "Pending",
    description: "Your commission has been received. The artist will begin working on your song soon.",
    className: "bg-yellow-500/10 text-yellow-500",
  },
  IN_PROGRESS: {
    label: "In Progress",
    description: "The artist is crafting your exclusive song. You'll be notified when it's ready.",
    className: "bg-blue-500/10 text-blue-500",
  },
  DELIVERED: {
    label: "Delivered",
    description: "Your song has been delivered. Press play to listen.",
    className: "bg-green-500/10 text-green-500",
  },
  UNLOCKED: {
    label: "Ready to Stream",
    description: "Your exclusive song is unlocked and ready to stream anytime.",
    className: "bg-accent-from/10 text-accent-from",
  },
};

export default function CollectionOrderPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/orders/${orderId}`)
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then(async (orderData) => {
        // Fetch artist info separately
        const artistRes = await fetch(`/api/artists`);
        const artists = await artistRes.json();
        const artist = artists.find(
          (a: { id: string }) => a.id === orderData.artistId
        ) || { name: "Artist", slug: "", image: null, genre: "" };

        setOrder({ ...orderData, artist });
      })
      .catch(() => setError(true));
  }, [orderId]);

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-text-secondary">Order not found.</p>
        <Link
          href="/collection"
          className="text-accent-from text-sm mt-2 inline-block hover:underline"
        >
          Back to Collection
        </Link>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-text-secondary">Loading...</p>
      </div>
    );
  }

  const status = statusConfig[order.status] || {
    label: order.status,
    description: "",
    className: "bg-surface-3 text-text-secondary",
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        href="/collection"
        className="text-text-secondary text-sm hover:text-text-primary transition-colors mb-8 inline-block"
      >
        &larr; Back to Collection
      </Link>

      {/* Artist Header */}
      <div className="flex items-center gap-5 mb-8">
        <div className="w-16 h-16 rounded-xl bg-surface-3 border border-border overflow-hidden flex-shrink-0">
          {order.artist?.image ? (
            <img
              src={order.artist.image}
              alt={order.artist.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-xl text-accent-from font-display">
                {order.artist?.name?.charAt(0)}
              </span>
            </div>
          )}
        </div>
        <div>
          <h1 className="font-display text-2xl text-text-primary">
            {order.artist?.name}
          </h1>
          <p className="text-text-secondary text-sm">{order.artist?.genre}</p>
        </div>
        <div className="ml-auto">
          <span
            className={`text-xs px-3 py-1.5 rounded-full uppercase tracking-wider ${status.className}`}
          >
            {status.label}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Status Message */}
        <div className="bg-surface-1 border border-border rounded-xl p-6">
          <h3 className="text-text-secondary text-xs uppercase tracking-wider mb-2">
            Status
          </h3>
          <p className="text-text-primary text-sm leading-relaxed">
            {status.description}
          </p>
        </div>

        {/* Audio Player */}
        {(order.status === "DELIVERED" || order.status === "UNLOCKED") &&
          order.audioFile && (
            <div className="bg-surface-1 border border-accent-from/20 rounded-xl p-6">
              <h3 className="text-accent-from text-xs uppercase tracking-wider mb-4">
                Your Exclusive Song
              </h3>
              <audio
                controls
                className="w-full"
                controlsList="nodownload"
                src={order.audioFile}
              >
                Your browser does not support audio playback.
              </audio>
            </div>
          )}

        {/* Brief */}
        <div className="bg-surface-1 border border-border rounded-xl p-6">
          <h3 className="text-text-secondary text-xs uppercase tracking-wider mb-3">
            Your Brief
          </h3>
          <p className="text-text-primary text-sm leading-relaxed mb-4">
            {order.vision}
          </p>
          <span className="capitalize bg-surface-3 text-text-secondary text-xs px-2.5 py-0.5 rounded-full">
            {order.occasion}
          </span>
        </div>

        {/* Payment */}
        <div className="bg-surface-1 border border-border rounded-xl p-6">
          <h3 className="text-text-secondary text-xs uppercase tracking-wider mb-3">
            Payment
          </h3>
          <div className="flex gap-6 text-sm">
            <div>
              <span className="text-text-secondary">Total: </span>
              <span className="text-text-primary font-display">
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

        {/* Timeline */}
        <div className="bg-surface-1 border border-border rounded-xl p-6">
          <h3 className="text-text-secondary text-xs uppercase tracking-wider mb-3">
            Timeline
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Commissioned</span>
              <span className="text-text-primary">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>
            {order.estimatedDelivery && (
              <div className="flex justify-between">
                <span className="text-text-secondary">Est. Delivery</span>
                <span className="text-text-primary">
                  {new Date(order.estimatedDelivery).toLocaleDateString()}
                </span>
              </div>
            )}
            {order.deliveredAt && (
              <div className="flex justify-between">
                <span className="text-text-secondary">Delivered</span>
                <span className="text-success">
                  {new Date(order.deliveredAt).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
