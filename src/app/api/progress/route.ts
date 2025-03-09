import { db } from "@/lib/index";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { email, lessonId, exerciseIndex, completed } = await req.json();

        // Fetch the user ID based on the email
        const user = await db.user.findUnique({
            where: { email },
            select: { id: true },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const progress = await db.progress.upsert({
            where: {
                userId_lessonId: {
                    userId: user.id, // Use the fetched user ID
                    lessonId,
                },
            },
            update: {
                exerciseIndex,
                completed,
            },
            create: {
                userId: user.id, // Use the fetched user ID
                lessonId,
                exerciseIndex,
                completed,
            },
        });

        return NextResponse.json({ message: "Progress updated successfully", progress });
    } catch (error) {
        console.error("Error updating progress: ", error);
        return NextResponse.json({ error: "Error updating progress" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    try {
        // Fetch progress for the given userId
        const progress = await db.progress.findMany({
            where: {
                userId: userId, // Ensure the userId is a number
            },
            include: {
                lesson: true,
            },
        });

        if (progress.length === 0) {
            return NextResponse.json({ message: 'No progress found for this user' }, { status: 204 });
        }

        const exercises = await db.exercise.findMany({
            where: {
                lessonId: {
                    in: progress.map(p => p.lessonId)
                }
            }
        });

        const responseData = {
            progress,
            exercises
        }

        return NextResponse.json(responseData);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 });
    }
}

