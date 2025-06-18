import prisma from "../utils/db"
import bcrypt from "bcryptjs"
import validator from 'validator'

export default defineEventHandler(async (event) => {
    const { token, newPassword } = await readBody(event);

    // Custom password check: min 8 chars and only allowed symbols
    const allowedCharsRegex = /^[A-Za-z0-9!@#$%^&*()_\-+=\[\]{};:'",.<>/?\\|`~€£¤§]*$/;
    if (!newPassword || newPassword.length < 8 || !allowedCharsRegex.test(newPassword)) {
        throw createError({
        statusCode: 400,
        message: "Password must contain at least 8 characters and may include symbols, uppercase, lowercase and numbers.",
        });
    }

    const user = await prisma.user.findFirst({
        where: {
            resetToken: token,
            resetTokenExpiry: {
                gte: new Date(),
            },
        },
    });

    if (!user) throw createError({ statusCode: 400, message: "Expired or invalid reset link" });

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

    return { message: "Password updated!" };
});