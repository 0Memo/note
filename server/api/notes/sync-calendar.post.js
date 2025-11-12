import { defineEventHandler, readBody, getCookie } from "h3"
import { $fetch } from "ofetch"
import prisma from "../../utils/db";

export default defineEventHandler(async (event) => {
    try {
        // Get the note data from the request body
        const body = await readBody(event);
        const { note } = body;
        console.log("🔍 Incoming note for sync:", note);

        if (!note.text?.trim()) {
            return { success: false, error: "Note is empty" };
        }

        const dbNote = await prisma.note.findUnique({
            where: { id: note.id },
            select: { calendarEventId: true },
        });

        const eventId =
            note.eventId ||
            note.calendarEventId ||
            dbNote?.calendarEventId ||
            null;

        const jwtCookie = getCookie(event, "NoteJWT");
        if (!jwtCookie) {
            return { error: "Not authenticated" };
        }

        const googleAccessToken = event.node.req.headers["x-google-access-token"];
        if (!googleAccessToken) {
            return { error: "Google Calendar not connected", status: 401 };
        }

        const start = new Date(note.date)
        const end = new Date(start.getTime() + 30 * 60 * 1000)

        const eventPayload = {
            summary: note.title,
            description: note.text,
            start: {
                dateTime: start.toISOString(),
                timeZone: "UTC",
            },
            end: {
                dateTime: end.toISOString(),
                timeZone: "UTC",
            },
            visibility: "default",
            status: "confirmed",
        };

        let response, updated = false;

        if (eventId) {
            // Update existing event
            response = await $fetch(
                `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`,
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
            // Create new event
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

        try {
            await prisma.note.update({
                where: { id: note.id },
                data: {
                    calendarEventId: response.id || eventId,
                    lastSyncedText: note.text,
                    lastSyncedDate: new Date(note.date),
                },
            });
            console.log(`✅ Note ${note.id} synced and updated.`);
        } catch (dbError) {
            console.error("❌ Failed to update note in DB:", dbError);
            console.error("⚠️ Note update data:", {
                id: note.id,
                calendarEventId: response.id,
                lastSyncedText: note.text,
                lastSyncedDate: note.date,
            });
        }

        return {
            success: true,
            updated,
            eventLink: response.htmlLink,
            eventId: response.id || eventId,
            calendarId: "primary",
        };
    } catch (error) {
        console.error("Calendar sync error:", error);
        if (error.data) console.error('Error details:', error.data)

        return {
            error: error.message || "Failed to sync with Google Calendar",
            status: error.status || 500,
            details: error.data || null
        };
    }
});