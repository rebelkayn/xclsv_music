export interface Artist {
  name: string;
  slug: string;
  genre: string;
  tagline: string;
  price: number;
  image: string;
}

export interface Step {
  title: string;
  description: string;
  icon: string;
}

export type OrderStatus = "DEPOSITED" | "IN_PROGRESS" | "DELIVERED" | "UNLOCKED";

export interface CommissionBrief {
  collectorName: string;
  email: string;
  vision: string;
  occasion: "celebration" | "tribute" | "personal" | "gift" | "other";
}

export interface Order {
  id: string;
  artistSlug: string;
  status: OrderStatus;
  brief: CommissionBrief;
  totalPrice: number;
  depositPaid: number;
  balancePaid: number;
  createdAt: string;
  estimatedDelivery: string;
  deliveredAt?: string;
}

export interface StreamToken {
  token: string;
  orderId: string;
  userId: string;
  expiresAt: number;
  isPreview: boolean;
}
