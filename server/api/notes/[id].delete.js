import { jwtVerify } from "jose"
import prisma from "../../utils/db"

export default defineEventHandler(async (event) => {
    try {
        const id = getRouterParam(event, "id")

        const cookies = parseCookies(event)
        const token = cookies.NoteJWT

        if (!token) {
            throw createError({
                statusCode: 401,
                statusMessage: "Non authorized update",
            })
        }

        const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode(process.env.JWT_SECRET)
        );
        const userId = payload.userId;

        const noteToDelete = await prisma.note.findUnique({
            where: {
                id: Number(id),
            },
        });

        if(!noteToDelete) {
            throw createError({
                statusCode: 401,
                statusMessage: "Non existing note",
            })
        }

        if(noteToDelete.userId !== userId) {
            throw createError({
                statusCode: 401,
                statusMessage: "Permission denied",
            })
        }

        await prisma.note.delete({
            where: {
                id: Number(id),
            },
        });

        return { success: true };
    } catch (error) {
        console.error("Database error:", error);
        throw error
    }
});