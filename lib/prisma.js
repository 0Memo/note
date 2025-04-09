import { PrismaClient } from "@prisma/client";

let prisma;

// Only create Prisma client in the server-side environment (Node.js)
if (typeof window === "undefined") {
  if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient(); // Create a new Prisma client instance for production
  } else {
    // Use a global instance in development to avoid re-initializing Prisma client on every request
    if (!global.prisma) {
      global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
  }
}

export default prisma;