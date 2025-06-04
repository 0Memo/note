import {
    getGoogleAccessTokenFromCookies,
    refreshGoogleAccessToken,
} from "../../utils/googleTokenUtils";
import { google } from "googleapis";
import { parseCookies } from "h3";
import { jwtVerify } from "jose";
import prisma from "../../utils/db";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const { id } = body;
        const cookies = parseCookies(event);

        const token = cookies.NoteJWT;
        if (!token) {
        throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
        }

        const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
        );
        const userId = payload.userId;

        const note = await prisma.note.findUnique({
        where: { id: Number(id) },
        });

        if (!note || note.userId !== userId) {
        throw createError({ statusCode: 403, statusMessage: "Access denied" });
        }

        // 🛑 Already synced and not changed — return early
        if (note.lastSyncedText === note.text) {
        return {
            alreadySynced: true,
            lastSyncedDate: note.lastSyncedDate,
        };
        }

        // ✅ Get access token from cookies and refresh if needed
        const { accessToken } = await getGoogleAccessTokenFromCookies(event);

        const calendar = google.calendar({ version: "v3", auth: accessToken });

        // 🗓️ Create calendar event
        const now = new Date();
        const eventStart = new Date(now);
        const eventEnd = new Date(now);
        eventEnd.setMinutes(eventEnd.getMinutes() + 5);

        const response = await calendar.events.insert({
        calendarId: "primary",
        requestBody: {
            summary: note.text.slice(0, 80),
            description: note.text,
            start: { dateTime: eventStart.toISOString() },
            end: { dateTime: eventEnd.toISOString() },
        },
        });

        // ✅ Update note with sync info
        await prisma.note.update({
        where: { id: Number(id) },
        data: {
            lastSyncedText: note.text,
            lastSyncedDate: new Date(),
            calendarEventId: response.data.id,
            calendarEventLink: response.data.htmlLink, // optional
        },
        });

        return {
        success: true,
        syncedAt: new Date(),
        htmlLink: response.data.htmlLink,
        };
    } catch (error) {
        console.error("Sync error:", error);
        throw createError({
        statusCode: 500,
        statusMessage: "Calendar sync failed",
        });
    }
});