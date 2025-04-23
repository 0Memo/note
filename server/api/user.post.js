// /api/user POST
import bcrypt from 'bcryptjs'
import validator from 'validator'
import { SignJWT } from "jose"
import prisma from "../utils/db"

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        if (!validator.isEmail(body.email)) {
            throw createError({
                statusCode: 400,
                message: "E-mail invalide",
            })
        }

        if (!validator.isStrongPassword(body.password, {
            minLength: 8,
            minLowerCase: 0,
            minUpperCase: 0,
            minNumbers: 0,
            minSymbols: 0,
        })) {
            throw createError({
                statusCode: 400,
                message: "Le mot de passe doit avoir 8 caractères min.",
            })
        }

        const passwordHash = await bcrypt.hash(body.password, 10);

        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: passwordHash,
            },
        });

        const token = await new SignJWT({ userId: user.id })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('7d')
            .sign(secret);

        
        setCookie(event, 'NoteJWT', token)

        return {
            data: "success!",
            token,
            user: {
                id: user.id,
                email: user.email,
            }
        };
    } catch (error) {
        console.error("Prisma error:", error.code);

        if (error.code === 'P2002') {
            throw createError({
                statusCode: 409,
                message: 'Cet e-mail existe déjà.',
            })
        }
        throw error
    }
})