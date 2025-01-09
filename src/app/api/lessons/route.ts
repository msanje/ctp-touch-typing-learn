// app/api/lessons/route.ts
import { db } from "@/lib/index";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { title, exercises } = await req.json();

    // Create a new lesson and its associated exercises
    const newLesson = await db.lesson.create({
        data: {
            title,
            exercises: {
                create: exercises.map((content: string, index: number) => ({
                    index,
                    content: content.trim(),
                }))
            },
        },
    });

    return NextResponse.json(newLesson);
}

export async function PUT(req: Request) {
    const { id, title, exercises } = await req.json();

    // Ensure that `id` is provided for the update request
    if (!id) {
        return NextResponse.json({ error: "Lesson ID is required to update." }, { status: 400 });
    }

    // Update the lesson and its associated exercises
    const updatedLesson = await db.lesson.update({
        where: { id },
        data: {
            title,
            exercises: {
                deleteMany: {}, // Delete old exercises
                create: exercises.map((content: string, index: number) => ({
                    index,
                    content: content.trim(),
                }))
            },
        },
    });

    return NextResponse.json(updatedLesson);
}

export async function GET() {
    const lessons = await db.lesson.findMany({
        include: {
            exercises: true
        }
    });

    return NextResponse.json(lessons);
}

