"use client";

import { useState } from "react";
import Link from "next/link";
import type { Order } from "@/types";
import { formatPrice } from "@/lib/constants";
import OrderStatusBadge from "@/components/OrderStatus";
import AudioPlayer from "@/components/AudioPlayer";
import Button from "@/components/Button";
import { use } from "react";

// Mock order for demo — in production this comes from API/DB
function getMockOrder(orderId: string): Order & { artistName: string; artistGenre: string } {
  return {
    id: orderId,
    artistSlug: "rza",
    status: "DELIVERED",
    brief: {
      collectorName: "Alex Chen",
      email: "alex@example.com",
      vision:
        "A celebration of my daughter's graduation — triumphant, emotional, with a hip-hop edge.",
      occasion: "celebration",
    },
    totalPrice: 95000,
    depositPaid: 47500,
    balancePaid: 0,
    createdAt: "2026-03-21T00:00:00Z",
    estimatedDelivery: "2026-03-28T00:00:00Z",
    deliveredAt: "2026-03-27T00:00:00Z",
    artistName: "RZA",
    artistGenre: "Hip-Hop",
  };
}

export default function OrderPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = use(params);
  const [order, setOrder] = useState(() => getMockOrder(orderId));
  const balance = order.totalPrice - order.depositPaid;

  const handlePayBalance = () => {
    // In production: Stripe checkout for balance
    setOrder((prev) => ({
      ...prev,
      status: "UNLOCKED",
      balancePaid: balance,
    }));
  };

  return (
    <main className="min-h-screen bg-bg">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link
          href="/"
          className="text-text-secondary text-sm hover:text-text-primary transition-colors mb-8 inline-block"
        >
          &larr; Back to Home
        </Link>

        {/* Artist + Status Header */}
        <div className="flex items-start justify-between mb-10 flex-wrap gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-surface-3 border border-border flex items-center justify-center">
              <span className="text-xl text-accent-from font-display">
                {order.artistName.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="font-display text-2xl text-text-primary">
                {order.artistName}
              </h1>
              <span className="text-accent-from/80 text-xs tracking-widest uppercase">
                {order.artistGenre}
              </span>
            </div>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>

        {/* Status-dependent content */}
        {(order.status === "DEPOSITED" || order.status === "IN_PROGRESS") && (
          <div className="bg-surface-1 border border-border rounded-2xl p-8 mb-8">
            <h2 className="font-display text-xl text-text-primary mb-6">
              Your song is being crafted
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <span className="text-text-secondary block mb-1">
                  Deposit Paid
                </span>
                <span className="text-text-primary font-display text-lg">
                  {formatPrice(order.depositPaid)}
                </span>
              </div>
              <div>
                <span className="text-text-secondary block mb-1">
                  Estimated Delivery
                </span>
                <span className="text-text-primary font-display text-lg">
                  {new Date(order.estimatedDelivery).toLocaleDateString(
                    "en-US",
                    { month: "long", day: "numeric", year: "numeric" }
                  )}
                </span>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-border">
              <span className="text-text-secondary text-xs tracking-widest uppercase block mb-2">
                Your Brief
              </span>
              <p className="text-text-primary text-sm leading-relaxed">
                {order.brief.vision}
              </p>
            </div>
          </div>
        )}

        {order.status === "DELIVERED" && (
          <>
            <div className="mb-8">
              <AudioPlayer mode="preview" orderId={order.id} />
            </div>
            <div className="bg-surface-1 border border-accent-from/20 rounded-2xl p-8 text-center">
              <h2 className="font-display text-2xl text-text-primary mb-2">
                Unlock Your Full Song
              </h2>
              <p className="text-text-secondary text-sm mb-6">
                Pay the remaining balance to stream the complete track. Forever
                yours. Streaming only — no downloads.
              </p>
              <Button onClick={handlePayBalance}>
                Pay Balance &middot; {formatPrice(balance)}
              </Button>
            </div>
          </>
        )}

        {order.status === "UNLOCKED" && (
          <>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-success text-lg">&#10003;</span>
                <span className="font-display text-lg text-text-primary">
                  Owned — Stream Anytime
                </span>
              </div>
              <AudioPlayer mode="full" orderId={order.id} />
            </div>
            <div className="bg-surface-1 border border-border rounded-2xl p-6 text-sm text-text-secondary">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <span className="block text-xs tracking-widest uppercase mb-1">
                    Commissioned
                  </span>
                  <span className="text-text-primary">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div>
                  <span className="block text-xs tracking-widest uppercase mb-1">
                    Delivered
                  </span>
                  <span className="text-text-primary">
                    {order.deliveredAt &&
                      new Date(order.deliveredAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                  </span>
                </div>
                <div>
                  <span className="block text-xs tracking-widest uppercase mb-1">
                    Total Paid
                  </span>
                  <span className="text-text-primary">
                    {formatPrice(order.totalPrice)}
                  </span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <span className="block text-xs tracking-widest uppercase mb-1">
                  Original Brief
                </span>
                <p className="text-text-primary leading-relaxed">
                  {order.brief.vision}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
