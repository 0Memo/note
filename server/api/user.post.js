// /api/user POST
import prisma from "../utils/prisma";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    try {
        const user = await prisma.user.create({
            data: {
            email: body.email,
            password: body.password,
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