import { defineEventHandler, getCookie } from "h3";
import { $fetch } from "ofetch";

export default defineEventHandler(async (event) => {
    const accessToken = getCookie(event, "google_access_token");

    if (!accessToken) {
        return { connected: false };
    }

    try {
        // Test the token by making a simple API call
        await $fetch("https://www.googleapis.com/calendar/v3/calendars/primary", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        });

        return { connected: true };
    } catch (error) {
        // Token is invalid or expired
        return { connected: false };
    }
});