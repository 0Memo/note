import { defineEventHandler, readBody, getCookie } from "h3";
import { $fetch } from "ofetch";

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

        // Get the Google access token from localStorage
        // Since localStorage is client-side only, we need to pass the token in the request
        // We'll modify our client-side code to include the token in the request
        const googleAccessToken = event.node.req.headers["x-google-access-token"];

        if (!googleAccessToken) {
            return { error: "Google Calendar not connected", status: 401 };
        }

        // Create calendar event (30 minutes duration)
        const start = new Date(note.date);
        const end = new Date(start.getTime() + 30 * 60 * 1000); // 30 mins later

        // Make the request to Google Calendar API
        const response = await $fetch(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${googleAccessToken}`,
                "Content-Type": "application/json",
            },
            body: {
                summary: note.title,
                description: note.content,
                start: { 
                    dateTime: start.toISOString(),
                    timeZone: 'UTC' // You might want to use user's timezone
                },
                end: { 
                    dateTime: end.toISOString(),
                    timeZone: 'UTC'
                },
                // Make sure the event is visible
                visibility: 'default',
                status: 'confirmed'
            },
        }
        );

        console.log("Google Calendar API response:", response);

        return {
            success: true,
            event: response,
            eventLink: response.htmlLink, // Direct link to the event
            calendarId: 'primary',
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