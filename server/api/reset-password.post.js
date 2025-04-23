import prisma from "../utils/db"
import bcrypt from "bcryptjs"
import validator from 'validator'

export default defineEventHandler(async (event) => {
    const { token, newPassword } = await readBody(event);

    if (!validator.isStrongPassword(newPassword, {
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

    const user = await prisma.user.findFirst({
        where: {
            resetToken: token,
            resetTokenExpiry: {
                gte: new Date(),
            },
        },
    });

    if (!user) throw createError({ statusCode: 400, message: "Lien expiré ou invalide" });

    console.log("User before password update:", user);

    const hashed = await bcrypt.hash(newPassword, 10);
    console.log("New password hash:", hashed);

    try {
        console.log("Updating user with ID:", user.id);

        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashed,
                resetToken: null,
                resetTokenExpiry: null,
            },
            select: {
                id: true,
                password: true,
            }
        });

        console.log("✅ Password updated");
        console.log("🧠 Updated user password in DB:", updatedUser.password);
    } catch (err) {
        console.error("❌ Error updating password:", err);
    }

    const confirm = await prisma.user.findUnique({ where: { id: user.id } });
    console.log("✅ Confirm DB password after update:", confirm.password);

    return { message: "Mot de passe mis à jour !" };
});