import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function seedUsers() {
    const user = await prisma.user.create({
        data: {
            username: "testuser",
            email: "test@example.com",
            password: "hashed_password_would_go_here"
        }
    });
    return user;
}
