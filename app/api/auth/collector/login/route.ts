import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email?.trim() || !password?.trim()) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  const collector = await prisma.collector.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!collector) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  const isValid = await compare(password, collector.password);

  if (!isValid) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    id: collector.id,
    email: collector.email,
    name: collector.name,
  });
}
