import { NextRequest, NextResponse } from "next/server";

// Stripe webhook handler
// Listens for: checkout.session.completed, payment_intent.succeeded
// Updates order status: DEPOSITED → IN_PROGRESS, DELIVERED → UNLOCKED

export async function POST(request: NextRequest) {
  // TODO: Verify Stripe webhook signature
  // const sig = request.headers.get("stripe-signature");
  // const body = await request.text();
  // const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);

  // TODO: Handle event types
  // switch (event.type) {
  //   case "checkout.session.completed":
  //     // Check metadata for deposit vs balance
  //     // Update order status accordingly
  //     break;
  // }

  return NextResponse.json({ received: true });
}
