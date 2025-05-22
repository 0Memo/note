export default defineI18nConfig(() => ({
    legacy: false,
    locale: "en",
    fallbackLocale: "en",
    messages: {
        fr: {
            register: {
                subscription: "Inscription gratuite",
                subscribed: "Déja inscrit?",
                login: "Connectez-vous",
                account: "à votre compte",
                email: "E-mail",
                password: "Mot de passe - min, MAJ, $ymboles, n°",
                subscribe: "Inscription"
            },
            login: {
                connection: "Connectez-vous à votre compte",
                subscribed: "Vous n'êtes pas inscrit?",
                creation: "Crééz votre compte",
                email: "E-mail",
                password: "Mot de passe",
                forgottenPassword: "Mot de passe oublié",
                connect: "Connexion"
            },
            forgotPassword: {
                forgotten: "Mot de passe oublié?",
                enterEmail: "Entrez votre adresse e-mail pour recevoir un lien de réinitialisation",
                backToLogin: "Revenir à la page de connexion",
                email: "E-mail",
                send: "Envoyer"
            },
            resetPassword: {
                reset: "Changer votre mot de passe",
                newPassword: "Nouveau mot de passe",
                validate: "Valider"
            },
            notes: {
                text: "༄ Veuillez saisir votre texte ici... ༄",
                nothing: "Pas de note encore...",
                today: "Aujourd'hui",
                yesterday: "Hier",
                previous: "Préc."
            },
            modal: {
                definitive: "Suppression définitive",
                confirm: "Confirmer?",
                yes: "Oui",
                no: "Non"
            },
            toast: {
                register: "L'utilisateur a été créé",
                language: "La langue a été changée: ",
                welcome: "Bienvenue!",
                passwordChange: "Mot de passe changé avec succès!",
                linkError: "Le lien est invalide ou a expiré",
                resetLink: "Un lien de rénitialisation a été envoyé à votre adresse mail",
                noteDeletion: "La note a été supprimée avec succès!",
                deletionError: "Erreur lors de la suppression",
                speechError: "La reconnaissance vocale a échoué",
                noSpeech: "Pas d'audio détecté. Veuillez réessayer.",
                audioError: "Aucun microphone n'a été trouvé.",
                permissionError: "Accès au microphone refusé.",
                transcribed: "Discours transcrit avec succès!"
            },
            easter: "Joyeuses Pâques!",
            halloween: "Joyeux Halloween!",
            xmas: "Joyeux Noël!",
            newYear: "Bonne Année!"
        },
        es: {
            register: {
                subscription: "Subscripción gratuita",
                subscribed: "¿Está suscrito?",
                login: "Conéctese",
                account: "a su cuenta",
                email: "Correo",
                password: "Contraseña - min, MAJ, $ímbolos, n°",
                subscribe: "Subscribir"
            },
            login: {
                connection: "Inicie sesión en su cuenta",
                subscribed: "¿No tiene sesión?",
                creation: "Cree su cuenta",
                email: "Correo",
                password: "Contraseña",
                forgottenPassword: "Contraseña olvidada",
                connect: "Conexión"
            },
            forgotPassword: {
                forgotten: "¿Contraseña olvidada?",
                enterEmail: "Ingrese su correo para recibir un enlace para restablecer su contraseña",
                backToLogin: "Volver a la página de inicio de sesión",
                email: "Correo",
                send: "Enviar"
            },
            resetPassword: {
                reset: "Restablecer su contraseña",
                newPassword: "Contraseña nueva",
                validate: "Validar"
            },
            notes: {
                text: "༄ Escriba su texto aquí... ༄",
                nothing: "Nada todavía...",
                today: "Hoy",
                yesterday: "Ayer",
                previous: "Prev."
            },
            modal: {
                definitive: "Supresión definitiva",
                confirm: "¿Confirmar?",
                yes: "Sí",
                no: "No"
            },
            toast: {
                register: "El usuario ha sido creado",
                language: "El idioma ha sido cambiado a: ",
                welcome: "¡Bienvenido!",
                passwordChange: "¡La contraseña ha sido cambiada con éxito!",
                linkError: "Enlace inválido o expirado",
                resetLink: "Se le ha enviado al correo un enlace para restablecer la contraseña",
                noteDeletion: "¡Se ha eliminado la nota con éxito!",
                deletionError: "Error al elimiar la nota",
                speechError: "El reconocimiento de voz falló",
                noSpeech: "No se detectó voz. Inténtelo de nuevo",
                audioError: "No se encontró micrófono",
                permissionError: "Acceso al micrófono denegado.",
                transcribed: "¡Voz transcrita con éxito!"
            },
            easter: "¡Felices Pascuas!",
            halloween: "¡Feliz Halloween!",
            xmas: "¡Feliz Navidad!",
            newYear: "¡Feliz Año Nuevo!"
        },
        pt: {
            register: {
                subscription: "Cadástre-se gratis",
                subscribed: "Já inscrito?",
                login: "Faça login",
                account: "na sua conta",
                email: "E-mail",
                password: "Senha - min, MAJ, $ímbolos, n°",
                subscribe: "Cadástre-se"
            },
            login: {
                connection: "Faça login na sua conta",
                subscribed: "Você não tem conta?",
                creation: "Cadastre sua conta",
                email: "E-mail",
                password: "Senha",
                forgottenPassword: "Senha esquecida",
                connect: "Conexão"
            },
            forgotPassword: {
                forgotten: "Senha esquecida?",
                enterEmail: "Digite seu e-mail para receber um link de redefinição",
                backToLogin: "Voltar à página de login",
                email: "E-mail",
                send: "Enviar"
            },
            resetPassword: {
                reset: "Redefinir sua senha",
                newPassword: "Nova senha",
                validate: "Validar"
            },
            notes: {
                text: "༄ Escreva seu texto aqui... ༄",
                nothing: "Nada ainda...",
                today: "Hoje",
                yesterday: "Ontem",
                previous: "Prev."
            },
            modal: {
                definitive: "Supressão definitiva",
                confirm: "Confirmar?",
                yes: "Sim",
                no: "Não"
            },
            toast: {
                register: "Usuário criado com sucesso",
                language: "Idioma alterado para: ",
                welcome: "Bem-vindo!",
                passwordChange: "Senha alterada com sucesso!",
                linkError: "Link inválido ou expirado",
                resetLink: "Um link de redefinição foi enviado para o seu e-mail",
                noteDeletion: "Nota excluída com sucesso!",
                deletionError: "Erro ao excluir a nota",
                speechError: "Falha no reconhecimento de voz",
                noSpeech: "Nenhuma fala detectada. Tente novamente",
                audioError: "Nenhum microfone encontrado",
                permissionError: "Accesso ao microphone negado",
                transcribed: "Fala transcrita com sucesso!"
            },
            easter: "Feliz Páscoa!",
            halloween: "Feliz Halloween!",
            xmas: "Feliz Natal!",
            newYear: "Feliz Ano Novo!"
        },
        en: {
            register: {
                subscription: "Free subscription",
                subscribed: "Already subscribed?",
                login: "Log in",
                account: "to your account",
                email: "Email",
                password: "Password - min, MAJ, $ymbols, n°",
                subscribe: "Subscribe"
            },
            login: {
                connection: "Log in to your account",
                subscribed: "You don't have an account?",
                creation: "Register",
                email: "Email",
                password: "Password",
                forgottenPassword: "Forgotten password",
                connect: "Connection"
            },
            forgotPassword: {
                forgotten: "Forgot your password?",
                enterEmail: "Enter your email address to receive a reset link",
                backToLogin: "Back to login",
                email: "E-mail",
                send: "Send"
            },
            resetPassword: {
                reset: "Reset password",
                newPassword: "New password",
                validate: "Validate"
            },
            notes: {
                text: "༄ Write your text here... ༄",
                nothing: "Nothing yet...",
                today: "Today",
                yesterday: "Yesterday",
                previous: "Prev."
            },
            modal: {
                definitive: "Definitive deletion",
                confirm: "Confirm?",
                yes: "Yes",
                no: "No"
            },
            toast: {
                register: "User has been created",
                language: "Language has been changed to: ",
                welcome: "Welcome!",
                passwordChange: "Password has been changed successful!",
                linkError: "Invalid or expired link",
                resetLink: "Un lien de rénitialisation a été envoyé à votre adresse mail",
                noteDeletion: "Note has been successfully deleted!",
                deletionError: "Error deleting the note",
                speechError: "Speech recognition failed.",
                noSpeech: "No speech detected. Please try again.",
                audioError: "No microphone was found.",
                permissionError: "Microphone access was denied.",
                transcribed: "Speech successfully transcribed!"
            },
            easter: "Happy Easter!",
            halloween: "Happy Halloween!",
            xmas: "Merry Christmas!",
            newYear: "Happy New Year!"
        },
        it: {
            register: {
                subscription: "Abbonamento gratuito",
                subscribed: "Già iscritto?",
                login: "Accedi",
                account: "al tuo account",
                email: "Email",
                password: "Password - min, MAI, $imboli, n°",
                subscribe: "Iscriviti"
            },
            login: {
                connection: "Accedi al tuo account",
                subscribed: "Non hai un account?",
                creation: "Registrati",
                email: "Email",
                password: "Password",
                forgottenPassword: "Password dimenticata",
                connect: "Accedi"
            },
            forgotPassword: {
                forgotten: "Hai dimenticato la password?",
                enterEmail: "Inserisci il tuo indirizzo email per ricevere un link di reimpostazione",
                backToLogin: "Torna al login",
                email: "Email",
                send: "Invia"
            },
            resetPassword: {
                reset: "Reimposta password",
                newPassword: "Nuova password",
                validate: "Conferma"
            },
            notes: {
                text: "༄ Scrivi qui il tuo testo... ༄",
                nothing: "Ancora niente...",
                today: "Oggi",
                yesterday: "Ieri",
                previous: "Prec."
            },
            modal: {
                definitive: "Eliminazione definitiva",
                confirm: "Confermi?",
                yes: "Sì",
                no: "No"
            },
            toast: {
                register: "Utente creato con successo",
                language: "Lingua cambiata in: ",
                welcome: "Benvenuto!",
                passwordChange: "Password cambiata con successo!",
                linkError: "Link non valido o scaduto",
                resetLink: "Un link per reimpostare la password è stato inviato al tuo indirizzo email",
                noteDeletion: "Nota eliminata con successo!",
                deletionError: "Errore durante l'eliminazione della nota",
                speechError: "Il riconoscimento vocale è fallito",
                noSpeech: "Nessun discorso rilevato. Riprova",
                audioError: "Nessun microfono trovato",
                permissionError: "Accesso al microfono negato",
                transcribed: "Voce trascritta con successo!"
            },
            easter: "Buona Pasqua!",
            halloween: "Buon Halloween!",
            xmas: "Buon Natale!",
            newYear: "Felice Anno Nuovo!"
        },
        sv: {
            register: {
                subscription: "Gratis prenumeration",
                subscribed: "Redan prenumererad?",
                login: "Logga in",
                account: "till ditt konto",
                email: "E-post",
                password: "Lösenord - min, MAJ, $ymboler, n°",
                subscribe: "Prenumerera"
            },
            login: {
                connection: "Logga in på ditt konto",
                subscribed: "Har du inget konto?",
                creation: "Registrera",
                email: "E-post",
                password: "Lösenord",
                forgottenPassword: "Glömt lösenord",
                connect: "Logga in"
            },
            forgotPassword: {
                forgotten: "Glömt ditt lösenord?",
                enterEmail: "Ange din e-postadress för att få en återställningslänk",
                backToLogin: "Tillbaka till inloggning",
                email: "E-post",
                send: "Skicka"
            },
            resetPassword: {
                reset: "Återställ lösenord",
                newPassword: "Nytt lösenord",
                validate: "Bekräfta"
            },
            notes: {
                text: "༄ Skriv in din text här... ༄",
                nothing: "Inget än...",
                today: "Idag",
                yesterday: "Igår",
                previous: "Föreg."
            },
            modal: {
                definitive: "Slutgiltig radering",
                confirm: "Bekräfta?",
                yes: "Ja",
                no: "Nej"
            },
            toast: {
                register: "Användare har skapats",
                language: "Språket har ändrats till: ",
                welcome: "Välkommen!",
                passwordChange: "Lösenordet har ändrats!",
                linkError: "Ogiltig eller utgången länk",
                resetLink: "En återställningslänk har skickats till din e-postadress",
                noteDeletion: "Anteckningen har raderats!",
                deletionError: "Fel vid radering av anteckningen",
                speechError: "Röstigenkänningen misslyckades",
                noSpeech: "Ingen röst upptäcktes. Försök igen",
                audioError: "Ingen mikrofon hittades",
                permissionError: "Åtkomst till mikrofon nekades",
                transcribed: "Rösten transkriberades framgångsrikt!"
            },
            easter: "Glad Påsk!",
            halloween: "Glad Halloween!",
            xmas: "God Jul!",
            newYear: "Gott Nytt År!"
        },
        ro: {
            register: {
                subscription: "Abonament gratuit",
                subscribed: "Deja abonat?",
                login: "Autentificare",
                account: "în contul tău",
                email: "Email",
                password: "Parolă - min, MAJ, $imboluri, n°",
                subscribe: "Înregistrează-te"
            },
            login: {
                connection: "Autentifică-te în contul tău",
                subscribed: "Nu ai cont?",
                creation: "Înregistrează-te",
                email: "Email",
                password: "Parolă",
                forgottenPassword: "Parolă uitată",
                connect: "Conectare"
            },
            forgotPassword: {
                forgotten: "Ai uitat parola?",
                enterEmail: "Introdu adresa de email pentru a primi un link de resetare",
                backToLogin: "Înapoi la autentificare",
                email: "Email",
                send: "Trimite"
            },
            resetPassword: {
                reset: "Resetează parola",
                newPassword: "Parolă nouă",
                validate: "Confirmă"
            },
            notes: {
                text: "༄ Scrie-ți textul aici... ༄",
                nothing: "Încă nimic...",
                today: "Astăzi",
                yesterday: "Ieri",
                previous: "Anter."
            },
            modal: {
                definitive: "Ștergere definitivă",
                confirm: "Confirmi?",
                yes: "Da",
                no: "Nu"
            },
            toast: {
                register: "Utilizatorul a fost creat",
                language: "Limba a fost schimbată în: ",
                welcome: "Bine ai venit!",
                passwordChange: "Parola a fost schimbată cu succes!",
                linkError: "Link invalid sau expirat",
                resetLink: "Un link de resetare a fost trimit pe adresa ta de e-mail",
                noteDeletion: "Nota a fost ștearsă cu succes!",
                deletionError: "Eroare la ștergerea notei",
                speechError: "Recunoașterea vocală a eșuat",
                noSpeech: "Nu a fost detectată nicio voce. Încearcă din nou",
                audioError: "Nu a fost găsit niciun microfon",
                permissionError: "Accesul la microfon a fost refuzat",
                transcribed: "Vocea a fost transcrisă cu succes!"
            },
            easter: "Paște Fericit!",
            halloween: "Halloween Fericit!",
            xmas: "Crăciun Fericit!",
            newYear: "An Nou Fericit!"
        },
    },
}));