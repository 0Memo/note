import { defineEventHandler, readBody, getCookie } from "h3"
import { $fetch } from "ofetch"
import { jwtVerify } from "jose"
import prisma from "../../utils/db"

export default defineEventHandler(async (event) => {
    try {
        // Get the note data from the request body
        const body = await readBody(event);
        const { note } = body; // note.title, note.content, note.date

        // Get the access token from the cookie or localStorage
        // In Nuxt server routes, we need to get it from the cookie
        const jwtCookie = getCookie(event, "NoteJWT");
        if (!jwtCookie) {
            return { error: "Not authenticated" };
        }

        const { payload } = await jwtVerify(
            jwtCookie,
            new TextEncoder().encode(process.env.JWT_SECRET)
        );
        const userId = payload.userId;

        // Get the Google access token from localStorage
        // Since localStorage is client-side only, we need to pass the token in the request
        // We'll modify our client-side code to include the token in the request
        const googleAccessToken = event.node.req.headers["x-google-access-token"];
        if (!googleAccessToken) {
            return { error: "Google Calendar not connected", status: 401 };
        }

        const dbNote = await prisma.note.findUnique({
            where: {
                id: Number(note.id),
            },
            select: {
                id: true,
                text: true,
                updatedAt: true,
                lastSyncedText: true,
                lastSyncedDate: true,
                calendarEventId: true,
                userId: true,
            },
        });

        if (!dbNote || dbNote.userId !== userId) {
            return { error: "Note not found or unauthorized", status: 403 };
        }

        // ✅ Compare DB values to see if sync is needed
        const alreadySynced =
            dbNote.calendarEventId &&
            dbNote.lastSyncedText === dbNote.text &&
            dbNote.lastSyncedDate &&
            new Date(dbNote.lastSyncedDate).toISOString() === new Date(dbNote.updatedAt).toISOString()

        if (alreadySynced) {
            return { success: false, alreadySynced: true }
        }

        // Prepare Google Calendar event
        const start = new Date(dbNote.updatedAt)
        const end = new Date(start.getTime() + 30 * 60 * 1000)

        const eventPayload = {
            summary: dbNote.text?.substring(0, 50) || "Untitled Note",
            description: dbNote.text,
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

        // 🔁 Update if eventId exists, otherwise insert new
        if (dbNote.calendarEventId) {
            // Update existing event
            response = await $fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${dbNote.calendarEventId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${googleAccessToken}`,
                    "Content-Type": "application/json"
                },
                body: eventPayload
            });
            updated = true;
        } else {
            // Create new event
            response = await $fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${googleAccessToken}`,
                    "Content-Type": "application/json"
                },
                body: eventPayload
            });
        }

        // ✅ Update the synced values in your DB
        await prisma.note.update({
            where: {
                id: Number(note.id),
            },
            data: {
                lastSyncedText: dbNote.text,
                lastSyncedDate: dbNote.updatedAt,
                ...(dbNote.calendarEventId ? {} : { calendarEventId: response.id })
            }
        });

        return {
            success: true,
            updated,
            eventLink: response.htmlLink, // Direct link to the event
            eventId: response.id
        };
    } catch (error) {
        console.error("Calendar sync error:", error);

        // Log more details about the error
        if (error.data) {
            console.error('Error details:', error.data)
        }
        return {
            error: error.message || "Failed to sync with Google Calendar",
            status: error.status || 500,
            details: error.data || null
        };
    }
});