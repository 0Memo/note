import { refreshGoogleAccessToken } from "../utils/refreshGoogleToken";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const refreshToken = getCookie(event, "google_refresh_token");

    if (!refreshToken) {
        return { error: "No refresh token available" };
    }

    try {
        const newToken = await refreshGoogleAccessToken(refreshToken, config);

        // Update cookie
        setCookie(event, "google_access_token", newToken.access_token, {
            httpOnly: true,
            path: "/",
            maxAge: newToken.expires_in || 3600,
        });

        return newToken;
    } catch (err) {
        console.error("❌ Failed to refresh token:", err);
        return { error: "Token refresh failed" };
    }
});