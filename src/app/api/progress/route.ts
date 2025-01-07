import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/index";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
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