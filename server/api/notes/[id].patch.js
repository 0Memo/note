import { jwtVerify } from "jose"
import prisma from "../../utils/db"
import sanitizeHtml from "sanitize-html"

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        const id = getRouterParam(event, 'id')
        const cookies = parseCookies(event)
        const token = cookies.NoteJWT

        if(!token) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Non authorized edition'
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
                statusMessage: 'Non existing note',
            })
        }

        if(noteToUpdate.userId !== userId) {
            throw createError({
                status: 401,
                statusMessage: "Permission denied",
            })
        }

        const cleanText = sanitizeHtml(body.updatedNote, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat([
                "img",
                "h1",
                "h2",
            ]),
            allowedAttributes: {
                ...sanitizeHtml.defaults.allowedAttributes,
                img: ["src", "alt"],
                a: ["href", "name", "target"],
            },
        });

        const textChanged = cleanText !== noteToUpdate.text;
        const dateChanged =
            body.eventDate?.slice(0, 10) !== noteToUpdate.eventDate?.slice(0, 10);

        await prisma.note.update({
            where: {
                id: Number(id),
            },
            data: {
                text: cleanText,
                eventDate: body.eventDate,
                ...(textChanged || dateChanged ? {
                    lastSyncedText: null,
                    lastSyncedDate: null
                } : {})
            }
        })

        return { success: true };
    } catch (error) {
        console.error("Database error:", error);
        throw error
    }
})