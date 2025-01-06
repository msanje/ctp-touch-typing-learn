// app/api/lessons/[id]/route.ts
import { db } from "@/lib/index";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const lessonId = params.id;

    const lesson = await db.lesson.findUnique({
        where: { id: parseInt(lessonId, 10) },
        include: { exercises: true }, // Include exercises for the lesson
    });

    if (!lesson) {
        return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    return NextResponse.json(lesson);
}
