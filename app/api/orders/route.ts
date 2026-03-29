import { NextRequest, NextResponse } from "next/server";

// Order CRUD endpoint
// POST: Create new order with commission brief
// GET: Retrieve order by ID (auth-gated)

export async function POST(request: NextRequest) {
  // TODO: Verify auth
  // TODO: Validate commission brief
  // TODO: Create Stripe checkout session for 50% deposit
  // TODO: Store order in database
  // TODO: Return order ID + Stripe checkout URL

  const body = await request.json();

  return NextResponse.json({
    orderId: `order_${Date.now()}`,
    message: "Order created",
    brief: body,
  });
}

export async function GET(request: NextRequest) {
  // TODO: Verify auth
  // TODO: Return order details for authenticated user

  const orderId = request.nextUrl.searchParams.get("id");

  return NextResponse.json({
    orderId,
    message: "Order retrieval stub",
  });
}
