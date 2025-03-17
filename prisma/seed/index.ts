import { PrismaClient } from "@prisma/client";
import { seedLessons } from "./lessonsSeed";
import { seedProgress } from "./progressSeed";
import { seedUsers } from "./usersSeed";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Starting Database Seeding...");

    // Seed Lessons
    await seedLessons();
    console.log("✅ Lessons Seeded");

    // Seed Users
    await seedUsers();
    console.log("✅ Users Seeded");

    // Fetch lessons & users from DB
    const lessons = await prisma.lesson.findMany();
    const users = await prisma.user.findMany();

    for (const user of users) {
        for (const lesson of lessons) {
            await seedProgress(user.id, lesson.id);
        }
    }

    // Seed Progress (pass users & lessons)
    console.log("✅ Progress Seeded");
}

main()
    .then(() => {
        console.log("🌱 Database Seeding Completed Successfully.");
    })
    .catch((e) => {
        console.error("❌ Seeding Failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect()
    });
