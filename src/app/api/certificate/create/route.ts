import { NextResponse } from "next/server";
import { db } from "@/lib";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, title, isCompleted = false } = body;

    if (!userId || !title) {
      return NextResponse.json(
        { messge: "userId and title are required" },
        { status: 400 }
      );
    }

    const user = await db.user.findUnique({
      where: { id: userId },
      select: { username: true },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    const existing = await db.certificate.findUnique({
      where: { userId },
      include: {
        user: {
          select: { username: true },
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        {
          message: "Certificate already exists.",
          certificate: {
            ...existing,
            userName: existing.user.username,
          },
        },
        {
          status: 409,
        }
      );
    }

    const certificate = await db.certificate.create({
      data: {
        userId,
        title,
        isCompleted,
      },
    });

    return NextResponse.json({ message: "Certificate created.", certificate });
  } catch (error) {
    console.error("Error creating certificate:", error);
    return NextResponse.json(
      { message: "Failed to create certificate." },
      { status: 500 }
    );
  }
}
