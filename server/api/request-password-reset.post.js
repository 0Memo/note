import prisma from "../utils/db";
import { sendMail } from "../utils/mailer";
import { v4 as uuidv4 } from "uuid";

export default defineEventHandler(async (event) => {
    const { email } = await readBody(event);

    // detect user language
    const locale = getPreferredLocale(event);
    const t = translations[locale];
    
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) throw createError({ statusCode: 404, message: t.notFound });

    const token = uuidv4();
    const expiry = new Date(Date.now() + 1000 * 60 * 15);

    await prisma.user.update({
        where: { email },
            data: {
            resetToken: token,
            resetTokenExpiry: expiry,
        },
    });

    const resetUrl =
        locale === "en"
            ? `https://notes-memo.vercel.app/reset-password?token=${token}`
            : `https://notes-memo.vercel.app/${locale}/reset-password?token=${token}`;

    await sendMail({
        to: email,
        subject: "Réinitialisation du mot de passe",
        html: `<p>Voici votre lien de réinitialisation :</p><a href="${resetUrl}">${resetUrl}</a>`,
    });

    return { message: t.response };
});

const getPreferredLocale = (event) => {
    const acceptLanguage = getHeader(event, "accept-language");
    const supportedLocales = ["en", "es", "pt", "it", "ro", "sv", "fr"];
    if (!acceptLanguage) return "en";
    const preferred = acceptLanguage
        .split(",")
        .map((lang) => lang.split(";")[0].trim());
    return preferred.find((lang) => supportedLocales.includes(lang)) || "en";
};

const translations = {
    en: {
        subject: "Password Reset",
        body: (url) =>
        `<p>Here is your password reset link:</p><a href="${url}">${url}</a>`,
        response: "Email sent!",
        notFound: "User not found",
    },
    fr: {
        subject: "Réinitialisation du mot de passe",
        body: (url) =>
        `<p>Voici votre lien de réinitialisation :</p><a href="${url}">${url}</a>`,
        response: "Email envoyé !",
        notFound: "Utilisateur non trouvé",
    },
    es: {
        subject: "Restablecimiento de contraseña",
        body: (url) =>
        `<p>Aquí está tu enlace para restablecer la contraseña:</p><a href="${url}">${url}</a>`,
        response: "¡Correo enviado!",
        notFound: "Usuario no encontrado",
    },
    pt: {
        subject: "Redefinição de senha",
        body: (url) =>
        `<p>Aqui está seu link para redefinir a senha:</p><a href="${url}">${url}</a>`,
        response: "Email enviado!",
        notFound: "Usuário não encontrado",
    },
    it: {
        subject: "Reimpostazione della password",
        body: (url) =>
        `<p>Ecco il tuo link per reimpostare la password:</p><a href="${url}">${url}</a>`,
        response: "Email inviata!",
        notFound: "Utente non trovato",
    },
    ro: {
        subject: "Resetare parolă",
        body: (url) =>
        `<p>Iată link-ul pentru resetarea parolei:</p><a href="${url}">${url}</a>`,
        response: "Email trimis!",
        notFound: "Utilizatorul nu a fost găsit",
    },
    sv: {
        subject: "Återställ lösenord",
        body: (url) =>
        `<p>Här är din länk för att återställa lösenordet:</p><a href="${url}">${url}</a>`,
        response: "E-post skickad!",
        notFound: "Användare hittades inte",
    },
};