import { PrismaClient } from "@prisma/client";
import "server-only";

declare global {
    // Add the cachedPrisma type to the global namespace
    // eslint-disable-next-line no-var
    var cachedPrisma: PrismaClient | undefined;
}

const prisma =
    global.cachedPrisma ||
    new PrismaClient({
        log: process.env.NODE_ENV === "development" ? ["query", "info", "warn"] : [], // Logs for debugging in development
    })

if (process.env.NODE_ENV !== "production") {
    global.cachedPrisma = prisma; // Cache Prisma client in development
}

export const db = prisma;
