import { jwtVerify } from "jose"
import prisma from "../utils/db"

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
            new TextEncoder().encode(process.env.JWT_SECRET)
        );
        const userId = payload.userId;

        const newNote = await prisma.note.create({
            data: {
                text: '',
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