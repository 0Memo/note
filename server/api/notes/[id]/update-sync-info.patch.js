import { getRouterParam, readBody, createError, parseCookies } from "h3";
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

        const note = await prisma.note.findUnique({
            where: { id },
        });

        if (!note || note.userId !== userId) {
            throw createError({ statusCode: 403, statusMessage: "Access denied" });
        }

        console.log("🛠️ Update sync info request for note ID:", id);
        console.log("Body:", body);
        console.log("lastSyncedText type:", typeof body.lastSyncedText);
        console.log("lastSyncedDate raw:", body.lastSyncedDate);
        console.log("lastSyncedDate as Date:", new Date(body.lastSyncedDate));

        const data = {};
        if (typeof body.lastSyncedText === "string") {
            data.lastSyncedText = body.lastSyncedText;
        }
        if (body.lastSyncedDate) {
            const d = new Date(body.lastSyncedDate);
            if (!isNaN(d.getTime())) data.lastSyncedDate = d;
        }
        if ("calendarEventId" in body) {
            // allow setting to null to clear it if needed
            data.calendarEventId = body.calendarEventId ?? null;
        }

        let updated;
        try {
            updated = await prisma.note.update({
                where: { id },
                data,
            });
        } catch (updateError) {
            console.error("❌ Prisma update error:", updateError);
            throw createError({
                statusCode: 500,
                statusMessage: "DB update failed: " + updateError.message,
            });
        }

        return {
            success: true,
            note: {
                id: updated.id,
                calendarEventId: updated.calendarEventId,
                lastSyncedText: updated.lastSyncedText,
                lastSyncedDate: updated.lastSyncedDate,
            },
        };
    } catch (error) {
        console.error("❌ Update sync info error:", error);
        return {
            error: error.message || "Error",
            status: error.status || 500,
        };
    }
});