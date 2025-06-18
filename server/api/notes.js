import { jwtVerify } from 'jose'
import prisma from '../utils/db'

export default defineEventHandler(async(event) => {
    try {
        const cookies = parseCookies(event)
        const token = cookies.NoteJWT

        if(!token) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Not connected'
            })
        }

        const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode(process.env.JWT_SECRET)
        );
        const userId = payload.userId;

        const notes = await prisma.note.findMany({
            where: { userId },
            orderBy: { updatedAt: "desc" },
            select: {
                id: true,
                text: true,
                createdAt: true,
                updatedAt: true,
                calendarEventId: true,
                lastSyncedText: true,
                lastSyncedDate: true,
            },
        });
        return notes

    } catch (error) {
        console.error("Prisma error:", error.code);

        throw error;
    }
}) 