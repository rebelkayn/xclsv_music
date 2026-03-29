import { formatPrice } from "@/lib/constants";

interface PriceBreakdownProps {
  totalPrice: number;
  showBalance?: boolean;
}

export default function PriceBreakdown({
  totalPrice,
  showBalance = true,
}: PriceBreakdownProps) {
  const deposit = totalPrice / 2;
  const balance = totalPrice / 2;

  return (
    <div className="bg-surface-2 border border-border rounded-xl p-6">
      <h3 className="text-text-secondary text-xs tracking-widest uppercase mb-4">
        Price Breakdown
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-text-secondary text-sm">Total</span>
          <span className="font-display text-lg text-text-primary">
            {formatPrice(totalPrice)}
          </span>
        </div>
        <div className="h-px bg-border" />
        <div className="flex justify-between items-center">
          <span className="text-text-secondary text-sm">Deposit now (50%)</span>
          <span className="font-display text-lg bg-gradient-to-r from-accent-from to-accent-to bg-clip-text text-transparent">
            {formatPrice(deposit)}
          </span>
        </div>
        {showBalance && (
          <div className="flex justify-between items-center">
            <span className="text-text-secondary text-sm">
              Balance on delivery
            </span>
            <span className="font-display text-lg text-text-secondary">
              {formatPrice(balance)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
