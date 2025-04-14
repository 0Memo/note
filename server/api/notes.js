import { jwtVerify } from 'jose'

export default defineEventHandler(async(event) => {
    const { getPrisma } = await import("../lib/prisma");
    const prisma = await getPrisma();

    try {
        const cookies = parseCookies(event)
        const token = cookies.NoteJWT

        if(!token) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Non connecté'
            })
        }

        const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode(process.env.JWT_SECRET)
        );
        const userId = payload.userId;

        const notes = await prisma.note.findMany({
            where: {
            userId,
            },
        });
        return notes

    } catch (error) {
        console.error("Prisma error:", error.code);

        throw error;
    }
}) 