import { defineEventHandler, getCookie, setCookie, createError } from "h3";
import { $fetch } from "ofetch";
import { refreshGoogleAccessToken } from "../../utils/refreshGoogleToken";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    let accessToken = event.node.req.headers["x-google-access-token"];
    const refreshToken = getCookie(event, "google_refresh_token");

    if (!accessToken && !refreshToken) {
        return {
            error: "Google Calendar not connected",
            status: 401
        };
    }

    const now = new Date();

    // Get 30 days before
    const startDate = new Date();
    startDate.setDate(now.getDate() - 30);

    // Get 30 days after
    const endDate = new Date();
    endDate.setDate(now.getDate() + 30);

    const timeMin = startDate.toISOString();
    const timeMax = endDate.toISOString();

    const fetchEvents = async (token) => {
        return await $fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`,
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