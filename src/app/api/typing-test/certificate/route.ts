import { db } from "@/lib/index";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, wpm, accuracy, level } = await req.json();

    console.log("userId typing-test/certificate/route.ts: ", userId);
    console.log("wpm typing-test/certificate/route.ts: ", wpm);
    console.log("accuracy typing-test/certificate/route.ts: ", accuracy);
    console.log("level typing-test/certificate/route.ts: ", level);

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    if (!wpm) {
      return NextResponse.json({ error: "WPM is required" }, { status: 400 });
    }

    if (!accuracy) {
      return NextResponse.json(
        { error: "Accuracy are required" },
        { status: 400 }
      );
    }

    const existing = await db.typingTestCertificate.findFirst({
      where: { userId, level },
    });

    if (existing) {
      return NextResponse.json(
        { message: "Certificate already exists for this level." },
        { status: 200 }
      );
    }

    const typingTestResult = await db.typingTestCertificate.create({
      data: {
        userId,
        wpm,
        accuracy,
        level,
      },
    });

    return NextResponse.json({
      message: "Typing test Certificate created successfully",
      typingTestResult,
    });
  } catch (error) {
    console.error("Error creating Typing test Certificate: ", error);
    return NextResponse.json(
      { error: "Error saving typing test Certificate" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");

  console.log("req typing-test/certificate/route.ts GET: ", req);
  console.log("url typing-test/certificate/route.ts GET: ", url);
  console.log("userId typing-test/certificate/route.ts GET: ", userId);

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    // Fetching typing test results for the given userId
    const typingTestCertificate = await db.typingTestCertificate.findFirst({
      where: {
        userId: userId,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    if (!typingTestCertificate) {
      return NextResponse.json(
        { message: "No typing test Certificate found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ typingTestCertificate }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching typing test Certificate: ", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error("Unknown error fetching typing test Certificate: ", error);
      return NextResponse.json(
        { error: "Unknown error occured" },
        { status: 500 }
      );
    }
  }
}
