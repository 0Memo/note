// /api/notes return all the notes

export default defineEventHandler(async(event) => {
    try {
        const notes = await prisma.note.findMany();

        return notes
    } catch (error) {
        console.error("Prisma error:", error.code);

        throw error;
    }
}) 