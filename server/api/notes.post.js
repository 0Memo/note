import { jwtVerify } from "jose"
import prisma from "../utils/db"
import sanitizeHtml from "sanitize-html"

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export default defineEventHandler(async (event) => {    
    try {
        const cookies = parseCookies(event)
        const token = cookies.NoteJWT

        if(!token) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Non authorized edition'
            })
        }

        const { payload } = await jwtVerify(
            token,
            secret
        );
        const userId = payload.userId;

        // Use an empty sanitized string, or use initial content from the body if allowed later
        const cleanText = sanitizeHtml('', {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2']),
            allowedAttributes: {
                ...sanitizeHtml.defaults.allowedAttributes,
                img: ['src', 'alt'],
                a: ['href', 'name', 'target'],
            },
        });

        const newNote = await prisma.note.create({
            data: {
                text: cleanText,
                userId,
            }
        })

        return newNote
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: "JWT verification impossible",
        });
    }
})