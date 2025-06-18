// /api/user POST
import bcrypt from 'bcryptjs';
import validator from 'validator';
import prisma from "../utils/db";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        console.log("Request body:", body);

        // Validate email format
        if (!validator.isEmail(body.email)) {
            throw createError({
                statusCode: 400,
                message: "Invalid email",
            });
        }

        // Validate password length and allowed characters
        const allowedCharsRegex = /^[A-Za-z0-9!@#$%^&*()_\-+=\[\]{};:'",.<>/?\\|`~€£¤§]*$/;

        if (!body.password || body.password.length < 8 || !allowedCharsRegex.test(body.password)) {
            throw createError({
                statusCode: 401,
                message: "Password must contain at least 8 characters and may include symbols, uppercase, lowercase and numbers.",
            });
        }

        // Check if the email already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: body.email },
        });

        if (existingUser) {
            throw createError({
                statusCode: 409,
                message: "This email is already in use.",
            });
        }

        // Hash the password before storing
        const passwordHash = await bcrypt.hash(body.password, 10);

        // Ensure resetToken and resetTokenExpiry are null if undefined
        const userData = {
            email: body.email,
            password: passwordHash,
            resetToken: body.resetToken || null,  // Handle undefined values
            resetTokenExpiry: body.resetTokenExpiry || null,  // Handle undefined values
        };

        console.log("User data being created:", userData);  // Debugging log to check the data

        // Create the user in the database
        const user = await prisma.user.create({
            data: userData,
        });

        return {
            data: "User created successfully!",
            user: {
                id: user.id,
                email: user.email,
            },
        };
    } catch (error) {
        console.log(error.code);

        if (error.code === 'P2002') {
            throw createError({
                statusCode: 409,
                message: 'An email with this address already exists.',
            });
        }

        throw error;  // Propagate other errors
    }
});