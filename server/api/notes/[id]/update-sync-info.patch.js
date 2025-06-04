import { getRouterParam, readBody, createError, parseCookies } from "h3";
import { jwtVerify } from "jose";
import prisma from "../../../utils/db";

export default defineEventHandler(async (event) => {
    try {
        const id = getRouterParam(event, "id");
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

        const note = await prisma.note.findUnique({
        where: { id: Number(id) },
        });

        if (!note || note.userId !== userId) {
        throw createError({ statusCode: 403, statusMessage: "Accès refusé" });
        }

        const updated = await prisma.note.update({
        where: { id: Number(id) },
        data: {
            lastSyncedText: body.lastSyncedText,
            lastSyncedDate: new Date(body.lastSyncedDate),
        },
        });

        return { success: true };
    } catch (error) {
        console.error("Update sync info error:", error);
        return {
        error: error.message || "Erreur",
        status: error.status || 500,
        };
    }
});