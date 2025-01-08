import { db } from "@/lib";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { lessonId: string, exerciseIndex: string } }) {
    const lessonId = params.lessonId;
    const exerciseIndex = params.exerciseIndex;  // This is still the index of the exercise in the array

    const lesson = await db.lesson.findUnique({
        where: { id: parseInt(lessonId, 10) },
        include: {
            exercises: true // Fetch all exercises related to this lesson
        }
    });

    if (!lesson) {
        return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    const exerciseId = lesson.exercises[parseInt(exerciseIndex, 10)]?.id; // Get exercise ID based on the index

    if (!exerciseId) {
        return NextResponse.json({ error: "Exercise not found" }, { status: 404 });
    }

    const exercise = await db.exercise.findUnique({
        where: { id: exerciseId }
    });

    if (!exercise) {
        return NextResponse.json({ error: "Exercise not found" }, { status: 404 });
    }

    return NextResponse.json(exercise); // Send back the specific exercise
}
