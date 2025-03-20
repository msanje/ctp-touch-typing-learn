import { db } from "@/lib/index";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    console.log("hello from api/progress POST:")

    try {
        const {
            email,
            lessonId,
            exerciseId,
            completed,
            accuracy,
            speed,
            lessThanTwoTypos
        } = await req.json();

        // Fetch the user ID based on the email
        const user = await db.user.findUnique({
            where: { email },
            select: { id: true },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const existingProgress = await db.progress.findFirst({
            where: {
                userId: user.id,
                exerciseId

            }
        });

        if (existingProgress) {
            if (accuracy && !existingProgress.accuracy)
                return NextResponse.json({ message: "Exercise already completed" }, { status: 200 });
        }

        const progress = await db.progress.create({
            data: {
                userId: user.id,
                lessonId,
                exerciseId,
                completed,
                accuracy,
                speed,
                lessThanTwoTypos
            }
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
                userId: userId,
            },
            include: {
                lesson: true,
            },
        });

        if (progress.length === 0) {
            return NextResponse.json({ progress: [], message: 'You have not started any lessons yet.' }, { status: 200 });
        }

        // Group progress by lesson
        const groupedProgress = progress.reduce((acc, entry) => {
            if (!acc[entry.lessonId]) {
                acc[entry.lessonId] = {
                    lesson: entry.lesson,
                    exercisesCompleted: [],
                };
            }
            acc[entry.lessonId].exercisesCompleted.push(entry.exerciseId);
            return acc;
        }, {} as Record<number, {
            lesson: {
                id: number;
                title: string;
            }; exercisesCompleted: number[]
        }>);

        return NextResponse.json({ progress: Object.values(groupedProgress) }, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error fetching progress: ", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            console.error("Unknown error fetching progress: ", error);
            return NextResponse.json({ error: "Unknown error occured." }, { status: 500 });
        }
    }
}

