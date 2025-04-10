// server/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const prisma = globalThis.prisma || new PrismaClient();

// Ensure single instance in development mode
if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = prisma; // Use global for dev to avoid multiple instances
}

export default prisma;