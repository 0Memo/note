import {
    getRouterParam,
    readBody,
    createError,
    parseCookies,
    defineEventHandler,
} from "h3";
import { jwtVerify } from "jose";
import prisma from "../../../utils/db";

export default defineEventHandler(async (event) => {
    try {
        const id = Number(getRouterParam(event, "id"));
        const body = await readBody(event);
        const cookies = parseCookies(event);
        const token = cookies.NoteJWT;

        if (!token) {
        throw createError({ statusCode: 401, statusMessage: "Not connected" });
        }

        const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
        );
        const userId = payload.userId;

        console.log("🛠️ Update sync info request for note ID:", id);
        console.log("Body:", body);

        // Verify note exists and belongs to user
        const note = await prisma.note.findUnique({
        where: { id },
        });

        if (!note || note.userId !== userId) {
        throw createError({ statusCode: 403, statusMessage: "Access denied" });
        }

        console.log("🛠️ Updating sync info for note ID:", id);
        console.log("calendarEventId:", body.calendarEventId);
        console.log("lastSyncedText type:", typeof body.lastSyncedText);
        console.log("lastSyncedDate raw:", body.lastSyncedDate);
        console.log("lastSyncedDate as Date:", new Date(body.lastSyncedDate));

        // Prepare update data - only include fields that are provided
        const updateData = {};

        if (body.calendarEventId !== undefined) {
        updateData.calendarEventId = body.calendarEventId;
        }

        if (body.lastSyncedText !== undefined) {
        updateData.lastSyncedText = body.lastSyncedText;
        }

        if (body.lastSyncedDate !== undefined) {
        updateData.lastSyncedDate = new Date(body.lastSyncedDate);
        }

        console.log("📝 Update data:", updateData);

        try {
        const updated = await prisma.note.update({
            where: { id },
            data: updateData,
        });

        console.log("✅ Note updated successfully");

        // 🧪 Verify what was saved
        const recheck = await prisma.note.findUnique({
            where: { id },
            select: {
            id: true,
            calendarEventId: true,
            lastSyncedText: true,
            lastSyncedDate: true,
            text: true,
            updatedAt: true,
            },
        });
        console.log("📋 Note after update:", {
            id: recheck.id,
            calendarEventId: recheck.calendarEventId,
            lastSyncedText: recheck.lastSyncedText?.substring(0, 50) + "...",
            lastSyncedDate: recheck.lastSyncedDate,
            textLength: recheck.text?.length,
            updatedAt: recheck.updatedAt,
        });

        return {
            success: true,
            note: recheck,
        };
        } catch (updateError) {
        console.error("❌ Prisma update error:", updateError);
        throw createError({
            statusCode: 500,
            statusMessage: "DB update failed: " + updateError.message,
        });
        }
    } catch (error) {
        console.error("❌ Update sync info error:", error);

        // Return proper error response
        if (error.statusCode) {
        throw error; // Re-throw HTTP errors
        }

        throw createError({
        statusCode: 500,
        statusMessage: error.message || "Internal server error",
        });
    }
});