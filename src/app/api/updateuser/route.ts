import { db } from "@/lib/index";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { oldEmail, username, email, password } = await req.json();

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
        email: oldEmail,
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
