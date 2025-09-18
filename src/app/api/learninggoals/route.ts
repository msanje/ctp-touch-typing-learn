import { db } from "@/lib/index";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";

export async function POST(req: Request) {
  const session = await getServerSession(options);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 200 });
  }

  console.log("-----Start-----");
  console.log("session: ", session);
  console.log("-----Stop-----");

  const user = session?.user;
  console.log("-----Start-----");
  console.log("user: ", user);
  console.log("-----Stop-----");

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 200 });
  }

  try {
    // const { dailyMinutes, targetWPM, accuracy } = await req.json();
    const {
      dailyPracticeTime: dailyMinutes,
      targetWpm: targetWPM,
      targetAccuracy: accuracy,
    } = await req.json();

    console.log("-----Start-----");
    console.log("dailyMinutes: ", dailyMinutes);
    console.log("targetWPM: ", targetWPM);
    console.log("accuracy: ", accuracy);
    console.log("-----Stop-----");

    // console.log("-----Start-----");
    // console.log("dailyMinutes: ", dailyPracticeTime);
    // console.log("targetWPM: ", targetWpm);
    // console.log("accuracy: ", targetAccuracy);
    // console.log("-----Stop-----");

    if (!dailyMinutes) {
      return NextResponse.json(
        { error: "Daily Minutes is required" },
        { status: 400 },
      );
    }

    if (!targetWPM) {
      return NextResponse.json(
        { error: "Target WPM is required" },
        { status: 400 },
      );
    }

    if (!accuracy) {
      return NextResponse.json(
        { error: "Accuracy are required" },
        { status: 400 },
      );
    }

    // const learningGoals = await db.learningGoal.create({
    const learningGoals = await db.learningGoal.upsert({
      where: { userId: user.id },
      update: {
        dailyMinutes,
        targetWPM,
        accuracy,
      },
      create: {
        user: { connect: { id: user.id } },
        dailyMinutes,
        targetWPM,
        accuracy,
      },
    });

    return NextResponse.json({
      message: "Learning Goals set successfully",
      learningGoals,
    });
  } catch (error) {
    console.error("Error saving Learning Goals: ", error);
    return NextResponse.json(
      { error: "Error saving Learning Goals" },
      { status: 500 },
    );
  }
}

export async function GET() {
  const session = await getServerSession(options);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 200 });
  }

  const userId = session.user.id;

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    // Fetching typing test results for the given userId
    const learningGoals = await db.learningGoal.findFirst({
      where: {
        userId: userId,
      },
    });

    if (!learningGoals) {
      return NextResponse.json(
        { message: "Learning Goals not found." },
        { status: 200 },
      );
    }

    return NextResponse.json({ learningGoals }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching Learning Goals: ", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error("Unknown error fetching Learning Goals: ", error);
      return NextResponse.json(
        { error: "Unknown error occured" },
        { status: 500 },
      );
    }
  }
}
