import { db } from "@/lib/index";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();
    console.log("username: ", username, "emai: ", email, "password: ", password);

    // Validate user input (example)
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    const exists = await db.user.findFirst({ where: { email: email } });

    if (exists) {
      return NextResponse.json(
        { message: "Username already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "User registered.", user: { id: user.id, username: user.username, email: user.email } },
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error from api/signup:", error);

    return NextResponse.json(
      { message: "Error occured while registering." },
      { status: 500 }
    );
  }
}
