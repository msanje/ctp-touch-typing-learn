import { db } from "@/lib";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    context: { params: Promise<{ lessonId: string; exercisesId: string }> }
) {
    // const lessonId = context.params.lessonId;
    // const exercisesId = context.params.exercisesId;
    const lessonId = (await context.params).lessonId;
    const exerciseId = (await context.params).exercisesId;

    const lessonIdNum = parseInt(lessonId, 10);
    // we are doing this because we can't rely on exerciseId which is global(autoincrement's) not based on the lesson that it belongs to.
    const exerciseIndexNum = parseInt(exerciseId, 10) - 1;

    const lesson = await db.lesson.findUnique({
        where: { id: lessonIdNum }
    });

    if (!lesson) {
        return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    const exercise = await db.exercise.findUnique({
        where: {
            lessonId_exerciseIndex: {
                lessonId: lessonIdNum,
                exerciseIndex: exerciseIndexNum,
            },
        },
    });

    if (!exercise) {
        return NextResponse.json({ error: "Exercise not found" }, { status: 404 });
    }

    return NextResponse.json(exercise); // Send back the specific exercise
}
