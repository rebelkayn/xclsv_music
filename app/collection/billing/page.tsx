import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

function shortPrice(cents: number) {
  const dollars = cents / 100;
  if (dollars >= 1_000_000) return `$${(dollars / 1_000_000).toFixed(dollars % 1_000_000 === 0 ? 0 : 1)}M`;
  if (dollars >= 1_000) return `$${(dollars / 1_000).toFixed(dollars % 1_000 === 0 ? 0 : 1)}k`;
  return `$${dollars.toLocaleString()}`;
}

export default async function BillingPage() {
  const session = await auth();
  const collectorId = session!.user!.id;

  const orders = await prisma.order.findMany({
    where: { collectorId },
    include: {
      artist: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const totalSpent = orders.reduce((sum, o) => sum + o.depositPaid + o.balancePaid, 0);
  const totalPending = orders.reduce((sum, o) => sum + (o.totalPrice - o.depositPaid - o.balancePaid), 0);

  return (
    <div>
      <div className="mb-10">
        <h1 className="font-display text-3xl text-text-primary mb-2">Billing</h1>
        <p className="text-text-secondary text-sm">
          Payment history and balances.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-surface-1 border border-border rounded-xl p-6">
          <p className="text-text-secondary text-xs uppercase tracking-wider mb-2">Total Spent</p>
          <p className="font-display text-2xl bg-gradient-to-r from-accent-from to-accent-to bg-clip-text text-transparent">
            ${(totalSpent / 100).toLocaleString()}
          </p>
        </div>
        <div className="bg-surface-1 border border-border rounded-xl p-6">
          <p className="text-text-secondary text-xs uppercase tracking-wider mb-2">Outstanding Balance</p>
          <p className="font-display text-2xl text-text-primary">
            ${(totalPending / 100).toLocaleString()}
          </p>
        </div>
        <div className="bg-surface-1 border border-border rounded-xl p-6">
          <p className="text-text-secondary text-xs uppercase tracking-wider mb-2">Commissions</p>
          <p className="font-display text-2xl text-text-primary">
            {orders.length}
          </p>
        </div>
      </div>

      {/* Transaction History */}
      {orders.length === 0 ? (
        <div className="bg-surface-1 border border-border rounded-2xl p-16 text-center">
          <p className="text-text-secondary">No transactions yet.</p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-surface-1 border border-border rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <h2 className="text-text-primary text-sm font-medium">Transaction History</h2>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-text-secondary text-xs uppercase tracking-wider">
                  <th className="text-left px-6 py-3">Date</th>
                  <th className="text-left px-6 py-3">Description</th>
                  <th className="text-right px-6 py-3">Deposit</th>
                  <th className="text-right px-6 py-3">Balance Paid</th>
                  <th className="text-right px-6 py-3">Remaining</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const remaining = order.totalPrice - order.depositPaid - order.balancePaid;
                  return (
                    <tr
                      key={order.id}
                      className="border-b border-border last:border-0 hover:bg-surface-2/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-text-secondary">
                        {order.createdAt.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-text-primary">
                        Commission — {order.artist.name}
                      </td>
                      <td className="px-6 py-4 text-right text-text-primary">
                        ${(order.depositPaid / 100).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right text-text-primary">
                        ${(order.balancePaid / 100).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {remaining > 0 ? (
                          <span className="text-yellow-500">${(remaining / 100).toLocaleString()}</span>
                        ) : (
                          <span className="text-green-500">Paid</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile List */}
          <div className="md:hidden bg-surface-1 border border-border rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <h2 className="text-text-primary text-sm font-medium">Transaction History</h2>
            </div>

            {orders.map((order) => {
              const remaining = order.totalPrice - order.depositPaid - order.balancePaid;
              return (
                <div
                  key={order.id}
                  className="flex items-center justify-between px-4 py-3.5 border-b border-border last:border-0"
                >
                  <div className="min-w-0 flex-1 mr-4">
                    <p className="text-text-secondary text-xs">
                      {order.createdAt.toLocaleDateString()}
                    </p>
                    <p className="text-text-primary text-sm truncate">
                      Commission — {order.artist.name}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-text-primary text-sm font-display">
                      {shortPrice(order.depositPaid)}
                    </p>
                    {remaining > 0 ? (
                      <p className="text-yellow-500 text-xs">
                        {shortPrice(remaining)} due
                      </p>
                    ) : (
                      <p className="text-green-500 text-xs">Paid</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
