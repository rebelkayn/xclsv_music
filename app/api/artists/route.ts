import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const artists = await prisma.artist.findMany({
    where: { isActive: true },
    select: {
      id: true,
      slug: true,
      name: true,
      genre: true,
      tagline: true,
      price: true,
      image: true,
    },
    orderBy: { createdAt: "asc" },
  });

  // Convert price from cents to dollars for display
  const formatted = artists.map((a) => ({
    ...a,
    price: a.price / 100,
  }));

  return NextResponse.json(formatted);
}
