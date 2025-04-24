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
                message: "E-mail invalide",
            });
        }

        // Validate password strength
        if (!validator.isStrongPassword(body.password, {
            minLength: 8,
            minLowerCase: 0,
            minUpperCase: 0,
            minNumbers: 0,
            minSymbols: 0,
        })) {
            throw createError({
                statusCode: 401,
                message: "Le mot de passe doit avoir 8 caractères min.",
            });
        }

        // Check if the email already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: body.email },
        });

        if (existingUser) {
            throw createError({
                statusCode: 409,
                message: "Cet email est déjà utilisé.",
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