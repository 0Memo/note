import prisma from '~/server/lib/prisma'
import { jwtVerify } from "jose"

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export default defineEventHandler(async (event) => {
    try {
        const cookies = parseCookies(event)
        const token = cookies.NoteJWT

        if(!token) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Édition non autorisée'
            })
        }

        const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode(process.env.JWT_SECRET)
        );
        const userId = payload.userId;

        const newNote = await prisma.note.create({
            data: {
                text: '',
                userId,
            }
        })

        return newNote
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: "Impossible de vérifier JWT",
        });
    }
})