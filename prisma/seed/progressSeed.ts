import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function seedProgress(userId: string, lessonId: number) {
    const exercises = await prisma.exercise.findMany({
        where: { lessonId }
    });

    for (let i = 0; i < exercises.length; i++) {
        await prisma.progress.create({
            data: {
                userId,
                lessonId,
                exerciseId: exercises[i].id,
                completed: i % 2 === 0 // Random: mark even exercises as completed
            }
        });
    }
}
