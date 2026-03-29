import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name, email, genre, instagram, spotify, message } = await req.json();

    if (!name || !email || !genre) {
      return NextResponse.json(
        { error: "Name, email, and genre are required" },
        { status: 400 }
      );
    }

    const inquiry = await prisma.artistInquiry.create({
      data: {
        name,
        email: email.toLowerCase().trim(),
        genre,
        instagram: instagram?.trim() || null,
        spotify: spotify?.trim() || null,
        message: message?.trim() || null,
      },
    });

    return NextResponse.json({ success: true, id: inquiry.id });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
