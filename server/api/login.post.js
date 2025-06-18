// /api/user POST
import bcrypt from 'bcryptjs'
import validator from 'validator'
import { SignJWT } from "jose"
import prisma from "../utils/db"

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        console.log("Request body:", body);

        if (!validator.isEmail(body.email)) {
            throw createError({
                statusCode: 400,
                message: "Invalid email",
            })
        }

        // Validate password length and allowed characters
        const allowedCharsRegex = /^[A-Za-z0-9!@#$%^&*()_\-+=\[\]{};:'",.<>/?\\|`~€£¤§]*$/;

        if (!body.password || body.password.length < 8 || !allowedCharsRegex.test(body.password)) {
            throw createError({
                statusCode: 401,
                message: "Password must contain at least 8 characters and may include symbols, uppercase, lowercase and numbers.",
            });
        }

        const user = await prisma.user.findUnique({
            where: { email: body.email },
            select: {
                id: true,
                email: true,
                password: true,
            },
        });

        if (!user) {
            throw createError({
                statusCode: 400,
                message: "Incorrect login or password",
            });
        }

        const isValid = await bcrypt.compare(body.password, user.password);
        
        console.log('isValid:', isValid);
        console.log("Stored password hash from DB:", user?.password);

        if(!isValid) {
            throw createError({
                statusCode: 400,
                message: "Incorrect login or password",
            });
        }

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
        console.log(error.code)

        if (error.code === 'P2002') {
            throw createError({
                statusCode: 409,
                message: 'An email with this address already exists.',
            })
        }

        throw error
    }
})