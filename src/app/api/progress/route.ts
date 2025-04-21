import { db } from "@/lib/index";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      email,
      lessonId,
      exerciseId,
      completed,
      accuracy,
      speed,
      lessThenTwoTypos,
    } = await req.json();

    // Fetch the user ID based on the email
    const user = await db.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("userId: ", user.id);
    console.log("lessonId: ", lessonId);
    console.log("exerciseId: ", exerciseId);

    const existingProgress = await db.progress.findFirst({
      where: {
        userId: user.id,
        lessonId,
        exerciseId,
      },
    });

    console.log("existingProgress: ", existingProgress);

    if (existingProgress) {
      const updatedProgress = await db.progress.update({
        where: { id: existingProgress.id },
        data: {
          accuracy: existingProgress.accuracy || accuracy,
          lessThenTwoTypos: existingProgress.accuracy || accuracy,
          speed: existingProgress.speed || speed,
          completed,
        },
      });

      return NextResponse.json({
        message: "Progress updated successfully",
        progress: updatedProgress,
      });
    }

    const progress = await db.progress.create({
      data: {
        userId: user.id,
        lessonId,
        exerciseId,
        completed,
        accuracy,
        speed,
        lessThenTwoTypos,
      },
    });

    return NextResponse.json({
      message: "Progress created successfully",
      progress,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error updating progress: ", error);
      console.error("Stack:", error.stack);
    } else {
      console.error("Unknown error updating progress:", error);
    }

    return NextResponse.json(
      { error: "Error updating progress" },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");
  const includeMetrics = url.searchParams.get("detailed") === "true";

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const progress = await db.progress.findMany({
      where: { userId },
      include: {
        lesson: true,
      },
    });

    if (progress.length === 0) {
      return NextResponse.json(
        { progress: [], message: "You have not started any lessons yet." },
        { status: 200 },
      );
    }

    const groupedProgress = progress.reduce(
      (acc, entry) => {
        if (!acc[entry.lessonId]) {
          acc[entry.lessonId] = {
            lesson: {
              id: entry.lesson.id,
              title: entry.lesson.title,
            },
            exercisesCompleted: [],
          };
        }

        const exerciseData = includeMetrics
          ? {
              exerciseId: entry.exerciseId,
              accuracy: entry.accuracy,
              speed: entry.speed,
              lessThenTwoTypos: entry.lessThenTwoTypos,
            }
          : entry.exerciseId;

        acc[entry.lessonId].exercisesCompleted.push(exerciseData);
        return acc;
      },
      {} as Record<
        number,
        {
          lesson: { id: number; title: string };
          exercisesCompleted: (
            | number
            | {
                exerciseId: number;
                accuracy: boolean | null;
                speed: boolean | null;
                lessThenTwoTypos: boolean | null;
              }
          )[];
        }
      >,
    );

    return NextResponse.json(
      { progress: Object.values(groupedProgress) },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Error fetching progress: ", error);
    return NextResponse.json(
      { error: "Error fetching progress" },
      { status: 500 },
    );
  }
}
