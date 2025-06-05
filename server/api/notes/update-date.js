import prisma from "../../utils/db";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        let { id, eventDate } = body;
        console.log("🔧 Received date update:", { id, eventDate });

        // Check if id or eventDate is missing or undefined
        if (id == null || eventDate == null) {
            throw createError({
                statusCode: 400,
                statusMessage: "Missing or invalid note ID or eventDate",
            });
        }

        // Ensure ID is a number (Prisma expects Int)
        const numericId = Number(id);
        if (!Number.isInteger(numericId)) {
            throw createError({
                statusCode: 400,
                statusMessage: "Invalid note ID format",
            });
        }

        // Ensure date is valid
        let parsedDate;
        try {
            parsedDate = new Date(eventDate);
            if (isNaN(parsedDate.getTime())) throw new Error("Invalid date");
        } catch {
            throw createError({
                statusCode: 400,
                statusMessage: "Invalid eventDate format",
            });
        }

        const data = { eventDate: parsedDate };

        Object.keys(data).forEach((key) => {
            if (data[key] === undefined) {
                console.warn( `⚠️ Field ${key} is undefined, removing from update data` );
                delete data[key];
            }
        });

        console.log("🧮 Parsed numericId:", numericId, typeof numericId);

        console.log("📌 Final Prisma call payload:", {
            where: { id: numericId },
            data,
        });

        console.log("✅ Final inputs ready:");
        console.log("🔢 ID:", numericId);
        console.log("🗓️ eventDate:", parsedDate);
        console.log("📦 update data:", data);

        if (!prisma || typeof prisma.note.update !== "function") {
            console.error("❌ Prisma or prisma.note.update is not available!");
            throw createError({
                statusCode: 500,
                statusMessage: "Prisma client not initialized correctly",
            });
        }

        // ✅ Update only if both values are defined
        const updatedNote = await prisma.note.update({
            where: { id: numericId },
            data,
            select: {
                id: true,
                eventDate: true,
            },
        });

        console.log("✅ Note updated:", updatedNote);
        return updatedNote;
    } catch (err) {
        console.error("❌ Error updating note date (debug):", {
            message: err.message,
            stack: err.stack,
            cause: err.cause,
        });
        throw createError({
            statusCode: 500,
            statusMessage: err.message || "Failed to update note date",
        });
    }
});