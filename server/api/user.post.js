// /api/user POST
import prisma from "../utils/prisma";
import bcrypt from 'bcryptjs';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const salt = await bcrypt.genSalt(10);

    const passwordHash = await bcrypt.hash(body.password, salt);

    try {
        const user = await prisma.user.create({
            data: {
            email: body.email,
            password: passwordHash,
            salt: salt,
            },
        });

        return { data: "success!", user };
        } catch (error) {
        console.error("Prisma error:", error);
        return {
            statusCode: 500,
            statusMessage: "Internal Server Error",
        };
    }
});