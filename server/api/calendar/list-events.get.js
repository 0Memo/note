import { defineEventHandler, getCookie, setCookie, createError } from "h3";
import { $fetch } from "ofetch";
import { refreshGoogleAccessToken } from "../../utils/refreshGoogleToken";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    let accessToken = event.node.req.headers["x-google-access-token"];
    const refreshToken = getCookie(event, "google_refresh_token");

    console.log( "Received token (first 20 chars):", accessToken?.substring(0, 20) + "..." );

    if (!accessToken && !refreshToken) {
        return {
            error: "Google Calendar not connected",
            status: 401
        };
    }

    // Get today's events
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString();
    const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString();

    console.log("Fetching events from:", startOfDay, "to:", endOfDay);

    const fetchEvents = async (token) => {
        return await $fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${startOfDay}&timeMax=${endOfDay}&singleEvents=true&orderBy=startTime`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    };

    
    // First, let's test if the token is valid by checking user info
    try {
        const userInfo = await $fetch(
            "https://www.googleapis.com/oauth2/v2/userinfo",
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        console.log("Token is valid for user:", userInfo.email);
    } catch (tokenError) {
        console.error("Token validation failed:", tokenError);

        if (refreshToken) {
            try {
                const newTokenRes = await refreshGoogleAccessToken(refreshToken, config);
                accessToken = newTokenRes.access_token;

                setCookie(event, "google_access_token", accessToken, {
                    httpOnly: true,
                    path: "/",
                    maxAge: newTokenRes.expires_in || 3600,
                });

                console.log("Access token refreshed successfully.");
            } catch (refreshError) {
                console.error("Failed to refresh access token:", refreshError);
                return {
                    error: "Google Calendar token expired. Please reconnect.",
                    status: 401,
                    tokenError: true,
                };
            }
        } else {
            return {
                error: "Google Calendar token is invalid or expired. Please reconnect.",
                status: 401,
                tokenError: true,
            };
        }
    }

    try {
        const response = await fetchEvents(accessToken);
        console.log("Google Calendar API response:", response);

        return {
            success: true,
            events: response.items || [],
            count: (response.items || []).length,
            rawResponse: response,
        };
    } catch (error) {
        console.error("Error fetching calendar events:", error);
        return {
            error: error.message,
            status: error.status || 500,
            details: error.data || null,
        };
    }
});