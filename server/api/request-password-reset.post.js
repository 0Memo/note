import prisma from "../utils/db";
import { sendMail } from "../utils/mailer";
import { v4 as uuidv4 } from "uuid";

export default defineEventHandler(async (event) => {
    const { email } = await readBody(event);
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) throw createError({ statusCode: 404, message: "Utilisateur non trouvé" });

    const token = uuidv4();
    const expiry = new Date(Date.now() + 1000 * 60 * 15);

    await prisma.user.update({
        where: { email },
            data: {
            resetToken: token,
            resetTokenExpiry: expiry,
        },
    });

    const resetUrl = `https://notes-memo.vercel.app/reset-password?token=${token}`;

    await sendMail({
        to: email,
        subject: "Réinitialisation du mot de passe",
        html: `<p>Voici votre lien de réinitialisation :</p><a href="${resetUrl}">${resetUrl}</a>`,
    });

    return { message: "Email envoyé !" };
});