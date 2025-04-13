// server/lib/prisma.js
let prisma;

export async function getPrisma() {
    if (!import.meta.server) return {}; // return empty on client

    if (!prisma) {
        const { PrismaClient } = await import("@prisma/client");
        const globalForPrisma = globalThis;

        prisma = globalForPrisma.prisma ?? new PrismaClient();

        if (process.env.NODE_ENV !== "production") {
        globalForPrisma.prisma = prisma;
        }
    }

  return prisma;
}