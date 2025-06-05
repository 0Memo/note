import prisma from "../../utils/db";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const { id, eventDate } = body;

        if (!id || !eventDate) {
        throw createError({
            statusCode: 400,
            statusMessage: "Missing note ID or eventDate",
        });
        }

        const updatedNote = await prisma.note.update({
        where: { id },
        data: {
            eventDate: new Date(eventDate),
        },
        });

        return updatedNote;
    } catch (err) {
        console.error("Error updating note date:", err);
        throw createError({
        statusCode: 500,
        statusMessage: "Failed to update note date",
        });
    }
});