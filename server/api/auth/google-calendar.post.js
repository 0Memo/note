import {
    defineEventHandler,
    readBody,
    createError
} from "h3";
import { $fetch } from "ofetch";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { code } = body;

    if (!code) {
        throw createError({
            statusCode: 400,
            statusMessage: "Authorization code is required",
        });
    }

    const config = useRuntimeConfig();

    try {
        // Exchange authorization code for access token
        const tokenResponse = await $fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                client_id: config.public.googleClientId,
                client_secret: config.googleClientSecret,
                code: code,
                grant_type: "authorization_code",
                redirect_uri: `${config.public.baseURL}/auth/callback`,
            }).toString(),
        });

        // Set cookies
        setCookie(event, "google_access_token", tokenResponse.access_token, {
            httpOnly: true,
            path: "/",
            maxAge: tokenResponse.expires_in || 3600,
        });
    
        if (tokenResponse.refresh_token) {
            setCookie(event, "google_refresh_token", tokenResponse.refresh_token, {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24 * 30,
            });
        }

        return {
            access_token: tokenResponse.access_token,
            refresh_token: tokenResponse.refresh_token,
            expires_in: tokenResponse.expires_in,
            token_type: tokenResponse.token_type,
        };
    } catch (error) {
        console.error("Token exchange error:", error);
        throw createError({
            statusCode: 500,
            statusMessage: "Failed to exchange authorization code for access token",
        });
    }
});