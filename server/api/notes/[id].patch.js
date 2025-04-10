import prisma from '~/server/lib/prisma'
import { jwtVerify } from "jose"

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        const id = getRouterParam(event, 'id')

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

        const noteToUpdate = await prisma.note.findUnique({
            where: {
                id: Number(id),
            }
        })

        if(!noteToUpdate) {
            throw createError({
                status: 401,
                statusMessage: 'Note inexistante',
            })
        }

        if(noteToUpdate.userId !== userId) {
            throw createError({
                status: 401,
                statusMessage: "Permission refusée",
            })
        }

        await prisma.note.update({
            where: {
                id: Number(id),
            },
            data: {
                text: body.updatedNote,
            }
        })
    } catch (error) {
        throw error
    }
})