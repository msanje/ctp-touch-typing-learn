import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { db } from "@/lib";

export async function GET() {
    const session = await getServerSession(options);

    if (!session?.user) {
        return NextResponse.json({ iscompleted: false }, { status: 401 });
    }

    const userId = session.user.id;

    const totalExercises = await db.exercise.count();
    const completedExercises = await db.progress.count({
        where: {
            userId,
            completed: true,
        }
    });

    const isCompleted = completedExercises === totalExercises && totalExercises > 0;

    return NextResponse.json({ isCompleted });
}