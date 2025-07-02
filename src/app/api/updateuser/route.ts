import { db } from "@/lib/index";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";

export async function POST(req: Request) {
  const session = await getServerSession(options);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 200 });
  }

  try {
    const { username, email, password } = await req.json();

    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!password) {
      return NextResponse.json({ error: "Password required" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const typingTestResult = await db.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      message: "User Credentials updated successfully",
      typingTestResult,
    });
  } catch (error) {
    console.error("Error Updating User Credentials: ", error);
    return NextResponse.json(
      {
        error: "Error Updating User Credentials:",
      },
      { status: 500 }
    );
  }
}
