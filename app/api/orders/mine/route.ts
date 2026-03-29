import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await auth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const s = session as any;

  if (!session?.user?.id || s.role !== "collector") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orders = await prisma.order.findMany({
    where: { collectorId: session.user.id },
    include: {
      artist: {
        select: {
          name: true,
          slug: true,
          image: true,
          genre: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const result = orders.map((order) => ({
    id: order.id,
    artistName: order.artist.name,
    artistSlug: order.artist.slug,
    artistImage: order.artist.image,
    artistGenre: order.artist.genre,
    status: order.status,
    vision: order.vision,
    occasion: order.occasion,
    totalPrice: order.totalPrice / 100,
    audioFile: order.audioFile,
    createdAt: order.createdAt.toISOString(),
    deliveredAt: order.deliveredAt?.toISOString() || null,
  }));

  return NextResponse.json(result);
}
