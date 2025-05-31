import { $fetch } from "ofetch";

export async function refreshGoogleAccessToken(refreshToken, config) {
    try {
        const tokenRes = await $fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            body: {
                client_id: config.public.googleClientId,
                client_secret: config.googleClientSecret,
                refresh_token: refreshToken,
                grant_type: "refresh_token",
            },
            headers: {
                "Content-Type": "application/json",
            },
        });

        return tokenRes;
    } catch (err) {
        console.error("Error refreshing Google token:", err);
        throw err;
    }
}