// server/api/notes/[id].patch.js
import { getRouterParam, readBody, createError, parseCookies } from "h3";
import { jwtVerify } from "jose";
import prisma from "../../utils/db";
import sanitizeHtml from "sanitize-html";

export default defineEventHandler(async (event) => {
    try {
        const idParam = getRouterParam(event, "id");
        const id = Number(idParam);
        console.log("PATCH /api/notes/:id called", { idParam, id });

        if (!id || isNaN(id)) {
            throw createError({ statusCode: 400, statusMessage: "Invalid note id" });
        }

        const body = (await readBody(event)) || {};
        console.log("Request body:", body);

        const cookies = parseCookies(event);
        const token = cookies.NoteJWT;
        if (!token) {
            throw createError({ statusCode: 401, statusMessage: "Not connected" });
        }

        // verify token
        let payload;
        try {
            const verified = await jwtVerify(
                token,
                new TextEncoder().encode(process.env.JWT_SECRET)
            );
            payload = verified.payload;
        } catch (err) {
            console.error("JWT verification failed:", err);
            throw createError({ statusCode: 401, statusMessage: "Invalid token" });
        }
        const userId = payload.userId;
        console.log("User id from token:", userId);

        // fetch note
        const noteToUpdate = await prisma.note.findUnique({ where: { id } });
        if (!noteToUpdate) {
            throw createError({ statusCode: 404, statusMessage: "Note not found" });
        }
        console.log("Existing note:", {
            id: noteToUpdate.id,
            userId: noteToUpdate.userId,
        });

        // robust user check (coerce to string to avoid type mismatch)
        if (String(noteToUpdate.userId) !== String(userId)) {
            throw createError({
                statusCode: 403,
                statusMessage: "Permission denied",
            });
        }

        // Accept either body.updatedNote OR body.text (frontend inconsistency)
        const rawText = body.updatedNote ?? body.text ?? "";
        const cleanText = sanitizeHtml(String(rawText), {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat([
                "img",
                "h1",
                "h2",
            ]),
            allowedAttributes: {
                ...sanitizeHtml.defaults.allowedAttributes,
                img: ["src", "alt"],
                a: ["href", "name", "target"],
            },
        });

        // Normalize incoming eventDate (if provided), else fallback to existing
        let incomingEventDate = null;
        if (typeof body.eventDate === "string" && body.eventDate.trim() !== "") {
            const parsed = new Date(body.eventDate);
            if (!isNaN(parsed.getTime())) {
                incomingEventDate = parsed.toISOString();
            } else {
                // invalid date sent — treat as null and log
                console.warn("Invalid eventDate received:", body.eventDate);
                incomingEventDate = null;
            }
        } else if (noteToUpdate.eventDate) {
            // keep current DB value as ISO string for comparison
            incomingEventDate = new Date(noteToUpdate.eventDate).toISOString();
        } else {
            incomingEventDate = null;
        }

        // Determine whether text or date changed
        const prevText = noteToUpdate.text ?? "";
        const textChanged = cleanText !== prevText;

        const prevDateDay = noteToUpdate.eventDate
            ? new Date(noteToUpdate.eventDate).toISOString().slice(0, 10)
            : null;
        const newDateDay = incomingEventDate
            ? incomingEventDate.slice(0, 10)
            : null;
        const dateChanged = prevDateDay !== newDateDay;

        console.log("Change detection:", {
            textChanged,
            dateChanged,
            prevDateDay,
            newDateDay,
        });

        // Build update data only for changed fields (avoid saving undefined)
        const data = {};
        if (textChanged) data.text = cleanText;
        // If frontend purposely sent a different eventDate, update it; if not changed, skip
        if (dateChanged) data.eventDate = incomingEventDate;
        if (textChanged || dateChanged) {
            data.lastSyncedText = null;
            data.lastSyncedDate = null;
        }

        // If nothing actually changed, return success so frontend won't error
        if (Object.keys(data).length === 0) {
            return { success: true, message: "No changes" };
        }

        // perform update
        let updated;
        try {
            updated = await prisma.note.update({ where: { id }, data });
        } catch (updateErr) {
            console.error("Prisma update error:", updateErr);
            throw createError({
                statusCode: 500,
                statusMessage: "DB update failed: " + (updateErr.message || "unknown"),
            });
        }

        console.log("Note updated successfully:", { id: updated.id });
        return {
            success: true,
            note: {
                id: updated.id,
                text: updated.text,
                eventDate: updated.eventDate,
                updatedAt: updated.updatedAt,
            },
        };
    } catch (err) {
        // Log and rethrow (h3 will serialize createError correctly)
        console.error("[/api/notes/[id].patch] error:", err);
        throw err;
    }
});