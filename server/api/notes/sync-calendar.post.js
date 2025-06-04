import { defineEventHandler, readBody, getCookie } from "h3";
import { $fetch } from "ofetch";
import prisma from "../../utils/db";
import { jwtVerify } from "jose";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const { note } = body;

        const jwtCookie = getCookie(event, "NoteJWT");
        if (!jwtCookie) return { error: "Not authenticated" };

        // Verify JWT to get user ID
        const { payload } = await jwtVerify(
            jwtCookie,
            new TextEncoder().encode(process.env.JWT_SECRET)
        );
        const userId = payload.userId;

        const googleAccessToken = event.node.req.headers["x-google-access-token"];
        if (!googleAccessToken) {
            return { error: "Google Calendar not connected", status: 401 };
        }

        const start = new Date(note.date);
        const end = new Date(start.getTime() + 30 * 60 * 1000);

        const eventPayload = {
            summary: note.title,
            description: note.content,
            start: { dateTime: start.toISOString(), timeZone: "UTC" },
            end: { dateTime: end.toISOString(), timeZone: "UTC" },
            visibility: "default",
            status: "confirmed",
        };

        let response, updated = false;

        if (note.eventId) {
            response = await $fetch(
                `https://www.googleapis.com/calendar/v3/calendars/primary/events/${note.eventId}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${googleAccessToken}`,
                        "Content-Type": "application/json",
                    },
                    body: eventPayload,
                }
            );
            updated = true;
        } else {
            response = await $fetch(
                "https://www.googleapis.com/calendar/v3/calendars/primary/events",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${googleAccessToken}`,
                        "Content-Type": "application/json",
                    },
                    body: eventPayload,
                }
            );
        }

        // 🔁 Persist sync metadata in DB
        await prisma.note.update({
            where: {
                id: Number(note.id),
                userId,
            },
            data: {
                calendarEventId: response.id,
                lastSyncedText: note.content,
                lastSyncedDate: new Date(note.date),
            },
        });

        return {
            success: true,
            updated,
            eventLink: response.htmlLink,
            eventId: response.id,
            calendarId: "primary",
        };
    } catch (error) {
        console.error("Calendar sync error:", error);
        if (error.data) console.error("Error details:", error.data);
        return {
            error: error.message || "Failed to sync with Google Calendar",
            status: error.status || 500,
            details: error.data || null,
        };
    }
});