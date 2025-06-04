import { jwtVerify } from "jose"
import { readBody, getRouterParam, parseCookies, createError } from "h3";
import prisma from "../../utils/db"

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
                status: 404,
                statusMessage: 'Note inexistante',
            })
        }

        if(noteToUpdate.userId !== userId) {
            throw createError({
                status: 403,
                statusMessage: "Permission refusée",
            })
        }

        // ✅ Only update sync metadata
        if (body.syncMetaOnly) {
            if (!body.lastSyncedText || !body.lastSyncedDate) {
                throw createError({ statusCode: 400, statusMessage: "Missing sync metadata" })
            }

            console.log("lastSyncedDate received:", body.lastSyncedDate);
            console.log("parsedDate:", parsedDate, "typeof:", typeof parsedDate);

            const parsedDate = new Date(Date.parse(body.lastSyncedDate));
            if (isNaN(parsedDate.getTime())) {
                throw createError({
                    statusCode: 400,
                    statusMessage: "Invalid date format",
                });
            }

            try {
                const dataToUpdate = {
                    lastSyncedText: String(body.lastSyncedText),
                    lastSyncedDate: parsedDate,
                };
                console.log("Data passed to Prisma:", dataToUpdate);
                const updatedNote = await prisma.note.update({
                    where: { id: Number(id) },
                    data: dataToUpdate,
                });
    
                return { success: true, message: "Sync metadata updated", updatedNote };
            } catch (prismaErr) {
                console.error("Prisma update error:", prismaErr);
                throw createError({ statusCode: 500, statusMessage: "Prisma update failed" });
            }
        }
    
        await prisma.note.update({
            where: { id: Number(id) },
            data: {
                text: body.updatedNote,
                ...(body.updatedNote !== noteToUpdate.text && {
                    lastSyncedText: null,
                    lastSyncedDate: null,
                }),
            },
        });

        return { success: true, message: "Note updated" };
    } catch (error) {
        console.error("PATCH /notes/[id] error:", error);
        throw createError({ statusCode: 500, statusMessage: error.message || "Internal server error" });
    }
})