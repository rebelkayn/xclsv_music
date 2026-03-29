import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { orderId } = await params;
  const body = await request.json();
  const { audioFile, previewFile } = body;

  if (!audioFile) {
    return NextResponse.json({ error: "Audio file required" }, { status: 400 });
  }

  const order = await prisma.order.findUnique({ where: { id: orderId } });

  if (!order || order.artistId !== session.user.id) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  if (order.status !== "IN_PROGRESS") {
    return NextResponse.json(
      { error: "Order is not in progress" },
      { status: 400 }
    );
  }

  const updated = await prisma.order.update({
    where: { id: orderId },
    data: {
      status: "DELIVERED",
      audioFile,
      previewFile: previewFile || null,
      deliveredAt: new Date(),
    },
  });

  return NextResponse.json(updated);
}
