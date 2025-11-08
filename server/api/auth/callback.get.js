import { defineEventHandler, getQuery, sendRedirect, setCookie } from 'h3'
import { $fetch } from 'ofetch'

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const config = useRuntimeConfig(); // Moved to top to satisfy hook rule

    if (!query.code) {
        return sendRedirect(event, "/auth/callback?error=no_code");
    }

    const redirectUri = `${config.public.baseURL}/auth/callback`; // Note: baseURL not baseUrl

    try {
        // Exchange code for tokens
        const tokenRes = await $fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        body: {
            code: query.code,
            client_id: config.public.googleClientId,
            client_secret: config.googleClientSecret,
            redirect_uri: redirectUri,
            grant_type: "authorization_code",
        },
        headers: {
            "Content-Type": "application/json",
        },
        });

        // Store tokens in cookies
        setCookie(event, "google_access_token", tokenRes.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: tokenRes.expires_in || 3600, // Use the actual expiry time
        });

        // Store refresh token if available
        if (tokenRes.refresh_token) {
            setCookie(event, "google_refresh_token", tokenRes.refresh_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
                maxAge: 60 * 60 * 24 * 30, // 30 days
            });
        }

        // Redirect to app homepage with success indicator
        return sendRedirect(event, "/auth/callback?calendar_connected=true");
    } catch (error) {
        console.error("OAuth token exchange error:", error);
        const msg =
            error?.response?._data?.error_description ||
            error.message ||
            "unknown";
        return sendRedirect(
            event,
            `/auth/callback?error=${encodeURIComponent(msg)}`
        );
    }
});