import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const artist = await prisma.artist.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      slug: true,
      name: true,
      email: true,
      genre: true,
      tagline: true,
      price: true,
      image: true,
    },
  });

  if (!artist) {
    return NextResponse.json({ error: "Artist not found" }, { status: 404 });
  }

  return NextResponse.json({ ...artist, price: artist.price / 100 });
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, genre, tagline, price, image } = body;

  const data: Record<string, unknown> = {};
  if (name !== undefined) data.name = name;
  if (genre !== undefined) data.genre = genre;
  if (tagline !== undefined) data.tagline = tagline;
  if (price !== undefined) data.price = Math.round(price * 100);
  if (image !== undefined) data.image = image;

  const artist = await prisma.artist.update({
    where: { id: session.user.id },
    data,
    select: {
      id: true,
      slug: true,
      name: true,
      genre: true,
      tagline: true,
      price: true,
      image: true,
    },
  });

  return NextResponse.json({ ...artist, price: artist.price / 100 });
}
