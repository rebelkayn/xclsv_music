import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { supabase } from "@/lib/supabase";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const { orderId } = await params;

  // 1. Verify auth
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Fetch order and verify ownership
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    select: {
      id: true,
      status: true,
      audioFile: true,
      collectorId: true,
      artistId: true,
    },
  });

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  // Allow access to the buyer who owns it or the artist who created it
  const userId = session.user.id;
  const role = (session as any).role;
  const isOwner =
    (role === "collector" && order.collectorId === userId) ||
    (role === "artist" && order.artistId === userId);

  if (!isOwner) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // 3. Check order has audio and is delivered
  if (!order.audioFile) {
    return NextResponse.json({ error: "No audio available" }, { status: 404 });
  }

  if (order.status !== "DELIVERED") {
    return NextResponse.json(
      { error: "Order not yet delivered" },
      { status: 403 }
    );
  }

  // 4. Generate a signed URL (expires in 5 minutes)
  const { data, error } = await supabase.storage
    .from("music")
    .createSignedUrl(order.audioFile, 300); // 300 seconds = 5 min

  if (error || !data?.signedUrl) {
    return NextResponse.json(
      { error: "Failed to generate stream URL" },
      { status: 500 }
    );
  }

  // 5. Fetch the audio from Supabase and stream it through our server
  // This way we never expose the signed URL to the client
  const audioResponse = await fetch(data.signedUrl);

  if (!audioResponse.ok || !audioResponse.body) {
    return NextResponse.json(
      { error: "Failed to fetch audio" },
      { status: 500 }
    );
  }

  // Support Range requests for seeking
  const rangeHeader = request.headers.get("range");
  const contentLength = audioResponse.headers.get("content-length");

  const headers = new Headers({
    "Content-Type": "audio/mpeg",
    "Cache-Control": "no-store, no-cache, must-revalidate",
    "X-Content-Type-Options": "nosniff",
    "Content-Disposition": "inline",
    "Accept-Ranges": "bytes",
  });

  if (contentLength) {
    headers.set("Content-Length", contentLength);
  }

  // If Range request, re-fetch with range from Supabase
  if (rangeHeader) {
    const rangeResponse = await fetch(data.signedUrl, {
      headers: { Range: rangeHeader },
    });

    const crHeader = rangeResponse.headers.get("content-range");
    if (crHeader) headers.set("Content-Range", crHeader);

    const clHeader = rangeResponse.headers.get("content-length");
    if (clHeader) headers.set("Content-Length", clHeader);

    return new NextResponse(rangeResponse.body, {
      status: 206,
      headers,
    });
  }

  return new NextResponse(audioResponse.body, {
    status: 200,
    headers,
  });
}
