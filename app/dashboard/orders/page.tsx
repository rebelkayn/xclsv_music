import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import OrderCard from "@/components/dashboard/OrderCard";

export default async function OrdersPage() {
  const session = await auth();
  const artistId = session!.user!.id;

  const orders = await prisma.order.findMany({
    where: { artistId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-display text-3xl text-text-primary mb-8">Orders</h1>

      {orders.length === 0 ? (
        <div className="bg-surface-1 border border-border rounded-xl p-12 text-center">
          <p className="text-text-secondary">No orders yet.</p>
          <p className="text-text-secondary/50 text-sm mt-1">
            When collectors commission you, their orders will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={{
                id: order.id,
                collectorName: order.collectorName,
                status: order.status,
                occasion: order.occasion,
                vision: order.vision,
                totalPrice: order.totalPrice,
                createdAt: order.createdAt.toISOString(),
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
