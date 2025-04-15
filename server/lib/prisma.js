// server/lib/prisma.js
let prisma;

export async function getPrisma() {
    if (!prisma) {
        const { PrismaClient } = await import("@prisma/client");
        prisma = new PrismaClient();
    }
    return prisma;
}