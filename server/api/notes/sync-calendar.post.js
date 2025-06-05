import { defineEventHandler, readBody, getCookie } from "h3"
import { $fetch } from "ofetch"
import prisma from "../../utils/db";

export default defineEventHandler(async (event) => {
    try {
        // Get the note data from the request body
        const body = await readBody(event);
        const { note } = body; // note.title, note.content, note.date
        console.log("🔍 Incoming note for sync:", note);

        // Get the access token from the cookie or localStorage
        // In Nuxt server routes, we need to get it from the cookie
        const jwtCookie = getCookie(event, "NoteJWT");
        if (!jwtCookie) {
            return { error: "Not authenticated" };
        }

        // Get the Google access token from localStorage
        // Since localStorage is client-side only, we need to pass the token in the request
        // We'll modify our client-side code to include the token in the request
        const googleAccessToken = event.node.req.headers["x-google-access-token"];
        if (!googleAccessToken) {
            return { error: "Google Calendar not connected", status: 401 };
        }

        // Prepare Google Calendar event
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

        // 🔁 Update if eventId exists, otherwise insert new
        if (note.eventId) {
            // Update existing event
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
                    calendarEventId: response.id,
                    lastSyncedText: note.text,
                    lastSyncedDate: new Date(note.date),
                },
            });
            console.log(`✅ Note ${note.id} synced and updated.`);
        } catch (dbError) {
            console.error("❌ Failed to update note in DB:", dbError);
        }

        return {
            success: true,
            updated,
            eventLink: response.htmlLink, // Direct link to the event
            eventId: response.id,
            calendarId: "primary",
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