import { getRouterParam, readBody, createError, parseCookies } from "h3";
import { jwtVerify } from "jose";
import prisma from "../../../utils/db";

export default defineEventHandler(async (event) => {
    try {
        const id = Number(getRouterParam(event, "id"));
        const body = await readBody(event);
        const cookies = parseCookies(event);
        const token = cookies.NoteJWT;
        if (!token) {
            throw createError({ statusCode: 401, statusMessage: "Non connecté" });
        }

        const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode(process.env.JWT_SECRET)
        );
        const userId = payload.userId;

        console.log("🛠️ Update sync info request for note ID:", id);
        console.log("Body:", body);

        const note = await prisma.note.findUnique({
            where: { id },
        });

        if (!note || note.userId !== userId) {
            throw createError({ statusCode: 403, statusMessage: "Accès refusé" });
        }

        const updated = await prisma.note.update({
            where: { id },
            data: {
                lastSyncedText: body.lastSyncedText,
                lastSyncedDate: new Date(body.lastSyncedDate),
            },
        });

        console.log("✅ Note updated successfully:", updated);

        // 🧪 Add this block to verify what was saved
        const recheck = await prisma.note.findUnique({ where: { id } });
        console.log("📋 Note after update:", recheck);

        return { success: true };
    } catch (error) {
        console.error("❌ Update sync info error:", error);
        return {
            error: error.message || "Erreur",
            status: error.status || 500,
        };
    }
});