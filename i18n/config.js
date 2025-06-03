export default defineI18nConfig(() => ({
    legacy: false,
    locale: "en",
    fallbackLocale: "en",
    messages: {
        fr: {
            homepage: {
                title: "Page d'accueil",
                welcome: "Bienvenue sur Memo's Notes !",
                app: "Une application personnelle pour écrire ou dicter des notes grâce à la reconnaissance vocale. Vous pouvez aussi activer un effet visuel de la souris.",
                actions: "Créez, modifiez ou supprimez des notes, organisées par date de création ou de mise à jour.",
                calendar: "Synchronisez facilement vos notes avec Google Calendar, où elles apparaîtront comme des événements modifiables.",
                organize: "Sur mobile, balayez une note vers la gauche pour la synchroniser ou la supprimer rapidement.",
                access: "Consultez notre Politique de Confidentialité et nos Conditions d'Utilisation à tout moment depuis l'application."
            },
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
                no: "Non",
                privacy: {
                    title: "Politique de confidentialité",
                    explanation: "Cette politique de confidentialité explique comment Notes collecte, utilise et stocke les données des utilisateurs.",
                    collect: "1. Quelles informations nous collectons",
                    choice: "Si vous choisissez de connecter votre Google Agenda, nous demandons l'accès à votre compte Google via OAuth. Plus précisément, nous demandons la portée Google suivante : https://www.googleapis.com/auth/calendar.events",
                    data: "2. Comment nous utilisons vos données",
                    permission: "Nous utilisons cette autorisation uniquement pour créer, mettre à jour ou supprimer des événements de calendrier représentant vos notes personnelles. Nous n'accédons pas, ne stockons pas et n'analysons pas d'autres événements de votre calendrier.",
                    storage: "3. Stockage des données",
                    token: "Vos jetons OAuth sont stockés en toute sécurité sur nos serveurs ou dans des cookies sécurisés, et ne sont jamais partagés avec des tiers.",
                    compliance: "4. Conformité à l'utilisation limitée",
                    requirements: "L'utilisation des API Google par notre application respecte les exigences d'utilisation limitée de Google : nous accédons uniquement aux informations nécessaires pour fournir les fonctionnalités que vous demandez explicitement, et nous ne partageons jamais vos données.",
                    contact: "5. Contact",
                    questions: "Si vous avez des questions concernant cette politique de confidentialité, vous pouvez nous contacter à",
                    back: "Retour"
                },
                terms: {
                    title: "Conditions d'utilisation",
                    use: "En utilisant Notes, vous acceptez d'utiliser le service de manière responsable et de ne pas abuser de ses fonctionnalités à des fins non autorisées ou nuisibles.",
                    features: "Nous nous réservons le droit de modifier ou d'interrompre des fonctionnalités à tout moment. L'utilisation continue de l'application après des mises à jour implique l'acceptation des modifications.",
                    app: "Notre application est fournie « telle quelle » sans aucune garantie. Vous utilisez notre application à vos propres risques.",
                    back: "Retour"
                }
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
                listening: "À l'écoute... 🎤 Veuillez parler clairement.",
                transcribed: "Discours transcrit avec succès!",
                speechRecognition: "La reconnaissance vocale n'est pas prise en charge dans ce navigateur.",
                calendar: {
                    warning: "Votre consentement sera requis pour connecter Google Agenda",
                    connectFirst: "Veuillez d'abord vous connecter à Google Agenda.",
                    expired: "La connexion à l'agenda a expiré. Veuillez vous reconnecter.",
                    sync: "Note synchronisée avec Google Agenda",
                    failed: "Échec de la synchronisation de la note avec Google Agenda : ",
                    connectionFailed: "Échec de la connexion à Google Agenda. Veuillez réessayer.",
                    checkFailed: "Échec de la vérification des événements du calendrier : ",
                    notConnected: "Agenda non connecté",
                    token: "Le jeton Google Agenda a expiré. Veuillez vous reconnecter.",
                    refreshToken: "Jeton de rafraîchissement manquant. Veuillez révoquer l'accès et vous reconnecter.",
                    success: "Connexion réussie à Google Agenda !",
                    updated: "Note mise à jour dans Google Agenda!",
                    alreadySynced: "Note déjà synchronisée avec le calendrier"
                },
            },
            easter: "Joyeuses Pâques!",
            halloween: "Joyeux Halloween!",
            xmas: "Joyeux Noël!",
            newYear: "Bonne Année!"
        },
        es: {
            homepage: {
                title: "Página principal",
                welcome: "¡Bienvenido a Memo's Notes!",
                app: "Una app personal para tomar notas escribiendo o dictando mediante reconocimiento de voz. También puede activar un efecto visual del mouse.",
                actions: "Cree, edite o elimine notas, organizadas por fecha de creación o última actualización.",
                calendar: "Sincronice notas seleccionadas con su Google Calendar con facilidad, donde aparecerán como eventos editables.",
                organize: "En el celular, deslice una nota hacia la izquierda para sincronizarla o eliminarla rápidamente.",
                access: "Consulte nuestra Política de Privacidad y Términos del Servicio en cualquier momento desde la app."
            },
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
                no: "No",
                privacy: {
                    title: "Política de privacidad",
                    explanation: "Esta Política de Privacidad explica cómo Notes recopila, utiliza y almacena los datos del usuario.",
                    collect: "1. Qué información recopilamos",
                    choice: "Si decides conectar tu Google Calendar, solicitamos acceso a tu cuenta de Google a través de OAuth. Específicamente, solicitamos el siguiente alcance de Google: https://www.googleapis.com/auth/calendar.events",
                    data: "2. Cómo usamos tus datos",
                    permission: "Usamos este permiso solo para crear, actualizar o eliminar eventos del calendario que representan tus notas personales. No accedemos, almacenamos ni analizamos ningún otro evento en tu calendario.",
                    storage: "3. Almacenamiento de datos",
                    token: "Tus tokens OAuth se almacenan de forma segura en nuestros servidores o en cookies seguras, y nunca se comparten con terceros.",
                    compliance: "4. Cumplimiento de uso limitado",
                    requirements: "El uso de las API de Google por parte de nuestra aplicación se adhiere a los requisitos de uso limitado de Google: solo accedemos a la información necesaria para proporcionar las funciones que solicitas explícitamente, y nunca compartimos tus datos.",
                    contact: "5. Contacto",
                    questions: "Si tienes preguntas sobre esta Política de Privacidad, puedes contactarnos en",
                    back: "Volver"
                },
                terms: {
                    title: "Términos de servicio",
                    use: "Al usar Notes, aceptas utilizar el servicio de manera responsable y no hacer un uso indebido de ninguna función para fines no autorizados o perjudiciales.",
                    features: "Nos reservamos el derecho de modificar o descontinuar funciones en cualquier momento. El uso continuado de la aplicación después de las actualizaciones implica la aceptación de los cambios.",
                    app: "Nuestra aplicación se proporciona “tal cual” sin garantías de ningún tipo. El uso de nuestra aplicación es bajo tu propio riesgo.",
                    back: "Volver"
                }
            },
            toast: {
                register: "El usuario ha sido creado",
                language: "El idioma ha sido cambiado a: ",
                welcome: "¡Bienvenido!",
                passwordChange: "¡La contraseña ha sido cambiada con éxito!",
                linkError: "Enlace inválido o expirado",
                resetLink: "Se te ha enviado al correo un enlace para restablecer la contraseña",
                noteDeletion: "¡Se ha eliminado la nota con éxito!",
                deletionError: "Error al eliminar la nota",
                speechError: "El reconocimiento de voz falló",
                noSpeech: "No se detectó voz. Inténtalo de nuevo",
                audioError: "No se encontró micrófono",
                permissionError: "Acceso al micrófono denegado.",
                listening: "Escuchando... 🎤 Por favor habla claramente.",
                transcribed: "¡Voz transcrita con éxito!",
                speechRecognition: "El reconocimiento de voz no es compatible con este navegador.",
                calendar: {
                    warning: "Se requerirá tu consentimiento para conectar con Google Calendar",
                    connectFirst: "Por favor, conéctate primero a Google Calendar.",
                    expired: "La conexión al calendario ha expirado. Por favor, vuelve a conectar.",
                    sync: "Nota sincronizada con Google Calendar",
                    failed: "No se pudo sincronizar la nota con Google Calendar: ",
                    connectionFailed: "No se pudo conectar con Google Calendar. Por favor, inténtalo de nuevo.",
                    checkFailed: "No se pudieron comprobar los eventos del calendario: ",
                    notConnected: "Calendario no conectado",
                    token: "El token de Google Calendar ha expirado. Por favor, vuelve a conectar.",
                    refreshToken: "Falta el token de actualización. Por favor, revoca el acceso y vuelve a conectar.",
                    success: "¡Conexión exitosa con Google Calendar!",
                    updated: "¡Nota actualizada en Google Calendar!",
                    alreadySynced: "Nota ya actualizada con el calendario"
                },
            },
            easter: "¡Felices Pascuas!",
            halloween: "¡Feliz Halloween!",
            xmas: "¡Feliz Navidad!",
            newYear: "¡Feliz Año Nuevo!"
        },
        pt: {
            homepage: {
                title: "Página inicial",
                welcome: "Bem-vindo ao Memo's Notes!",
                app: "Um app pessoal para escrever ou ditar anotações com reconhecimento de voz. Também é possível ativar um efeito visual do cursor.",
                actions: "Crie, edite ou exclua anotações, organizadas por data de criação ou última atualização.",
                calendar: "Sincronize facilmente notas selecionadas com seu Google Agenda, onde aparecerão como eventos editáveis.",
                organize: "No celular, deslize a nota para a esquerda para sincronizar ou excluir rapidamente.",
                access: "Acesse nossa Política de Privacidade e Termos de Uso em qualquer momento pelo app."
            },
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
                no: "Não",
                privacy: {
                    title: "Política de Privacidade",
                    explanation: "Esta Política de Privacidade explica como o Notes coleta, usa e armazena os dados dos usuários.",
                    collect: "1. Quais informações coletamos",
                    choice: "Se você optar por conectar seu Google Agenda, solicitamos acesso à sua conta do Google via OAuth. Especificamente, solicitamos o seguinte escopo do Google: https://www.googleapis.com/auth/calendar.events",
                    data: "2. Como usamos seus dados",
                    permission: "Usamos essa permissão apenas para criar, atualizar ou excluir eventos de calendário que representem suas notas pessoais. Não acessamos, armazenamos ou analisamos quaisquer outros eventos em seu calendário.",
                    storage: "3. Armazenamento de dados",
                    token: "Seus tokens OAuth são armazenados com segurança em nossos servidores ou em cookies seguros, e nunca são compartilhados com terceiros.",
                    compliance: "4. Conformidade com uso limitado",
                    requirements: "O uso das APIs do Google por nosso aplicativo está em conformidade com os requisitos de uso limitado do Google: acessamos apenas as informações necessárias para fornecer os recursos que você solicita explicitamente e nunca compartilhamos seus dados.",
                    contact: "5. Contato",
                    questions: "Se você tiver dúvidas sobre esta Política de Privacidade, pode nos contatar em",
                    back: "Voltar"
                },
                terms: {
                    title: "Termos de Serviço",
                    use: "Ao usar o Notes, você concorda em utilizar o serviço de forma responsável e não abusar de nenhum recurso para fins não autorizados ou prejudiciais.",
                    features: "Reservamo-nos o direito de modificar ou descontinuar recursos a qualquer momento. O uso contínuo do aplicativo após atualizações implica aceitação das alterações.",
                    app: "Nosso aplicativo é fornecido \"como está\", sem garantias de qualquer tipo. O uso do nosso aplicativo é por sua conta e risco.",
                    back: "Voltar"
                }
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
                listening: "Ouvindo... 🎤 Por favor fale claramente.",
                transcribed: "Fala transcrita com sucesso!",
                speechRecognition: "Reconhecimento de voz não é compatível com este navegador.",
                calendar: {
                    warning: "Seu consentimento será necessário para conectar ao Google Agenda",
                    connectFirst: "Conecte-se primeiro ao Google Agenda.",
                    expired: "A conexão com o calendário expirou. Conecte-se novamente.",
                    sync: "Nota sincronizada com o Google Agenda",
                    failed: "Falha ao sincronizar a nota com o Google Agenda: ",
                    connectionFailed: "Falha ao conectar ao Google Agenda. Tente novamente.",
                    checkFailed: "Falha ao verificar os eventos do calendário: ",
                    notConnected: "Calendário não conectado",
                    token: "O token do Google Agenda expirou. Conecte-se novamente.",
                    refreshToken: "Token de atualização ausente. Revogue o acesso e conecte-se novamente.",
                    success: "Conectado com sucesso ao Google Agenda!",
                    updated: "Nota atualizada no Google Agenda!",
                    alreadySynced: "Nota já atualizada com o calendário"
                },
            },
            easter: "Feliz Páscoa!",
            halloween: "Feliz Halloween!",
            xmas: "Feliz Natal!",
            newYear: "Feliz Ano Novo!"
        },
        en: {
            homepage: {
                title: "Homepage",
                welcome: "Welcome to Memo's Notes!",
                app: "A personal note-taking app where you can write or dictate notes using speech-to-text, and optionally enable a fun mouse trail for visual feedback.",
                actions: "Create, edit, or delete notes, organized by date of creation or last update.",
                calendar: "Easily sync selected notes to your Google Calendar, where they appear as editable events.",
                organize: "On mobile, swipe left on a note to sync or delete it quickly without opening it.",
                access: "View our Privacy Policy and Terms of Service anytime within the app."
            },
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
                no: "No",
                privacy: {
                    title: "Privacy policy",
                    explanation: "This Privacy Policy explains how Notes collects, uses, and stores user data.",
                    collect: "1. What Information We Collect",
                    choice: "If you choose to connect your Google Calendar, we request access to your Google account via OAuth. Specifically, we request the following Google scope: https://www.googleapis.com/auth/calendar.events",
                    data: "2. How We Use Your Data",
                    permission: "We use this permission only to create, update, or delete calendar events that represent your personal notes. We do not access, store, or analyze any other events in your calendar.",
                    storage: "3. Data Storage",
                    token: "Your OAuth tokens are stored securely on our servers or in secure cookies, and are never shared with third parties.",
                    compliance: "4. Limited Use Compliance",
                    requirements: "Our app's use of Google APIs adheres to Google's Limited Use requirements: We only access information necessary to provide the features you explicitly request, and we never share your data.",
                    contact: "5. Contact",
                    questions: "If you have questions about this Privacy Policy, you can contact us at",
                    back: "Back"
                },
                terms: {
                    title: "Terms of service",
                    use: "By using Notes, you agree to use the service responsibly and not misuse any features for unauthorized or harmful purposes.",
                    features: "We reserve the right to modify or discontinue features at any time. Continued use of the app after updates implies acceptance of the changes.",
                    app: "Our app is provided “as is” without warranties of any kind. Your use of our app is at your own risk.",
                    back: "Back"
                }
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
                listening: "Listening... 🎤 Please speak clearly.",
                transcribed: "Speech successfully transcribed!",
                speechRecognition: "Speech recognition not supported in this browser.",
                calendar: {
                    warning: "Your consent will be required to connect to Google Calendar",
                    connectFirst: "Please connect to Google Calendar first.",
                    expired: "Calendar connection expired. Please reconnect.",
                    sync: "Note synced to Google Calendar",
                    failed: "Failed to sync note to Google Calendar: ",
                    connectionFailed: "Failed to connect to Google Calendar. Please try again.",
                    checkFailed: "Failed to check calendar events: ",
                    notConnected: "Calendar not connected",
                    token: "Google Calendar token expired. Please reconnect.",
                    refreshToken: "Missing refresh token. Please revoke access and reconnect.",
                    success: "Successfully connected to Google Calendar!",
                    updated: "Note updated in Google Calendar!",
                    alreadySynced: "Note has already been synced to calendar"
                },
            },
            easter: "Happy Easter!",
            halloween: "Happy Halloween!",
            xmas: "Merry Christmas!",
            newYear: "Happy New Year!"
        },
        it: {
            homepage: {
                title: "Pagina iniziale",
                welcome: "Benvenuto su Memo's Notes!",
                app: "Un'app personale per scrivere o dettare note tramite riconoscimento vocale. Puoi anche attivare un effetto visivo del cursore.",
                actions: "Crea, modifica o elimina note, organizzate per data di creazione o ultimo aggiornamento.",
                calendar: "Sincronizza facilmente le note selezionate con Google Calendar, dove appariranno come eventi modificabili.",
                organize: "Su mobile, scorri verso sinistra per sincronizzare o eliminare una nota rapidamente.",
                access: "Consulta la nostra Privacy Policy e i Termini di Servizio in qualsiasi momento dall'app."
            },
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
                no: "No",
                privacy: {
                    title: "Informativa sulla Privacy",
                    explanation: "Questa Informativa sulla Privacy spiega come Notes raccoglie, utilizza e conserva i dati degli utenti.",
                    collect: "1. Quali informazioni raccogliamo",
                    choice: "Se scegli di collegare il tuo Google Calendar, richiediamo l'accesso al tuo account Google tramite OAuth. In particolare, richiediamo il seguente ambito di Google: https://www.googleapis.com/auth/calendar.events",
                    data: "2. Come utilizziamo i tuoi dati",
                    permission: "Utilizziamo questa autorizzazione solo per creare, aggiornare o eliminare eventi del calendario che rappresentano le tue note personali. Non accediamo, memorizziamo o analizziamo altri eventi nel tuo calendario.",
                    storage: "3. Conservazione dei dati",
                    token: "I tuoi token OAuth sono conservati in modo sicuro sui nostri server o in cookie sicuri e non vengono mai condivisi con terze parti.",
                    compliance: "4. Conformità all'uso limitato",
                    requirements: "L'uso delle API di Google da parte della nostra applicazione è conforme ai requisiti di uso limitato di Google: accediamo solo alle informazioni necessarie per fornire le funzionalità che richiedi esplicitamente e non condividiamo mai i tuoi dati.",
                    "contact": "5. Contatto",
                    questions: "Se hai domande su questa Informativa sulla Privacy, puoi contattarci all'indirizzo",
                    back: "Indietro"
                },
                terms: {
                    title: "Termini di Servizio",
                    use: "Utilizzando Notes, accetti di utilizzare il servizio in modo responsabile e di non abusare di alcuna funzionalità per scopi non autorizzati o dannosi.",
                    features: "Ci riserviamo il diritto di modificare o interrompere le funzionalità in qualsiasi momento. L'uso continuato dell'app dopo gli aggiornamenti implica l'accettazione delle modifiche.",
                    app: "La nostra applicazione è fornita \"così com'è\" senza garanzie di alcun tipo. L'uso della nostra applicazione è a tuo rischio.",
                    back: "Indietro"
                }
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
                listening: "Ascoltando... 🎤 Per favore, parla chiaramente.",
                transcribed: "Voce trascritta con successo!",
                speechRecognition: "Il riconoscimento vocale non è supportato da questo browser.",
                calendar: {
                    warning: "Il tuo consenso sarà richiesto per connettersi a Google Calendar",
                    connectFirst: "Collegati prima a Google Calendar.",
                    "expired": "La connessione al calendario è scaduta. Riconnettiti.",
                    sync: "Nota sincronizzata con Google Calendar",
                    failed: "Impossibile sincronizzare la nota con Google Calendar: ",
                    connectionFailed: "Impossibile connettersi a Google Calendar. Riprova.",
                    checkFailed: "Impossibile controllare gli eventi del calendario: ",
                    notConnected: "Calendario non connesso",
                    token: "Il token di Google Calendar è scaduto. Riconnettiti.",
                    refreshToken: "Token di aggiornamento mancante. Revoca l'accesso e riconnettiti.",
                    success: "Connessione riuscita a Google Calendar!",
                    updated: "Nota aggiornata su Google Calendar!",
                    alreadySynced: "Nota già sincronizzata con il calendario"
                }
            },
            easter: "Buona Pasqua!",
            halloween: "Buon Halloween!",
            xmas: "Buon Natale!",
            newYear: "Felice Anno Nuovo!"
        },
        sv: {
            homepage: {
                title: "Startsida",
                welcome: "Välkommen till Memo's Notes!",
                app: "En personlig app för att skriva eller tala in anteckningar med tal-till-text. Du kan också aktivera en visuell muspekareffekt.",
                actions: "Skapa, redigera eller ta bort anteckningar, organiserade efter skapelse- eller uppdateringsdatum.",
                calendar: "Synkronisera enkelt valda anteckningar med Google Kalender, där de visas som redigerbara händelser.",
                organize: "På mobil kan du svepa vänster på en anteckning för att snabbt synka eller ta bort den.",
                access: "Du kan när som helst se vår integritetspolicy och användarvillkor i appen."
            },
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
                no: "Nej",
                privacy: {
                    title: "Integritetspolicy",
                    explanation: "Denna integritetspolicy förklarar hur Notes samlar in, använder och lagrar användardata.",
                    collect: "1. Vilken information vi samlar in",
                    choice: "Om du väljer att ansluta din Google Kalender begär vi åtkomst till ditt Google-konto via OAuth. Specifikt begär vi följande Google-behörighet: https://www.googleapis.com/auth/calendar.events",
                    data: "2. Hur vi använder dina data",
                    permission: "Vi använder denna behörighet endast för att skapa, uppdatera eller ta bort kalenderhändelser som representerar dina personliga anteckningar. Vi får inte åtkomst till, lagrar eller analyserar några andra händelser i din kalender.",
                    storage: "3. Datainlagring",
                    token: "Dina OAuth-token lagras säkert på våra servrar eller i säkra cookies och delas aldrig med tredje part.",
                    compliance: "4. Efterlevnad av begränsad användning",
                    requirements: "Vår apps användning av Googles API:er följer Googles krav för begränsad användning: Vi får endast åtkomst till den information som är nödvändig för att tillhandahålla de funktioner du uttryckligen begär och delar aldrig dina data.",
                    contact: "5. Kontakt",
                    questions: "Om du har frågor om denna integritetspolicy kan du kontakta oss på",
                    back: "Tillbaka"
                },
                terms: {
                    title: "Användarvillkor",
                    use: "Genom att använda Notes samtycker du till att använda tjänsten ansvarsfullt och att inte missbruka några funktioner för obehöriga eller skadliga ändamål.",
                    features: "Vi förbehåller oss rätten att ändra eller avbryta funktioner när som helst. Fortsatt användning av appen efter uppdateringar innebär att du accepterar ändringarna.",
                    app: "Vår app tillhandahålls \"i befintligt skick\" utan några garantier. Användningen av vår app sker på egen risk.",
                    back: "Tillbaka"
                }
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
                listening: "Lyssnar... 🎤 Tala tydligt.",
                transcribed: "Rösten transkriberades framgångsrikt!",
                speechRecognition: "Röstigenkänning stöds inte i den här webbläsaren.",
                calendar: {
                    warning: "Ditt samtycke krävs för att ansluta till Google Kalender",
                    connectFirst: "Anslut först till Google Kalender.",
                    expired: "Kalenderanslutningen har löpt ut. Anslut igen.",
                    sync: "Anteckning synkroniserad med Google Kalender",
                    failed: "Kunde inte synkronisera anteckningen med Google Kalender: ",
                    connectionFailed: "Kunde inte ansluta till Google Kalender. Försök igen.",
                    checkFailed: "Kunde inte kontrollera kalenderevenemang: ",
                    notConnected: "Kalendern är inte ansluten",
                    token: "Google Kalender-token har löpt ut. Anslut igen.",
                    refreshToken: "Uppdateringstoken saknas. Återkalla åtkomsten och anslut igen.",
                    success: "Ansluten till Google Kalender!",
                    updated: "Anteckning uppdaterad i Google Kalender!",
                    alreadySynced: "Anteckning redan synkats med kalendarn"
                },
            },
            easter: "Glad Påsk!",
            halloween: "Glad Halloween!",
            xmas: "God Jul!",
            newYear: "Gott Nytt År!"
        },
        ro: {
            homepage: {
                title: "Pagina principală",
                welcome: "Bine ai venit la Memo's Notes!",
                app: "O aplicație personală pentru a scrie sau dicta notițe folosind recunoaștere vocală. Poți activa și un efect vizual al cursorului.",
                actions: "Creează, editează sau șterge notițe, organizate după data creării sau ultimei modificări.",
                calendar: "Sincronizează cu ușurință notițele selectate în Google Calendar, unde apar ca evenimente editabile.",
                organize: "Pe mobil, glisează spre stânga pe o notiță pentru a o sincroniza sau șterge rapid.",
                access: "Accesează Politica de Confidențialitate și Termenii de Utilizare direct din aplicație."
            },
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
                no: "Nu",
                privacy: {
                    title: "Politica de Confidențialitate",
                    explanation: "Această Politică de Confidențialitate explică modul în care Notes colectează, utilizează și stochează datele utilizatorilor.",
                    collect: "1. Ce informații colectăm",
                    choice: "Dacă alegi să îți conectezi Google Calendar, solicităm acces la contul tău Google prin OAuth. Mai exact, solicităm următorul domeniu Google: https://www.googleapis.com/auth/calendar.events",
                    data: "2. Cum folosim datele tale",
                    permission: "Folosim această permisiune doar pentru a crea, actualiza sau șterge evenimente din calendar care reprezintă notele tale personale. Nu accesăm, stocăm sau analizăm alte evenimente din calendarul tău.",
                    storage: "3. Stocarea datelor",
                    token: "Token-urile tale OAuth sunt stocate în siguranță pe serverele noastre sau în cookie-uri securizate și nu sunt niciodată partajate cu terți.",
                    compliance: "4. Conformitate cu utilizarea limitată",
                    requirements: "Utilizarea API-urilor Google de către aplicația noastră respectă cerințele de utilizare limitată ale Google: accesăm doar informațiile necesare pentru a furniza funcțiile pe care le soliciți explicit și nu partajăm niciodată datele tale.",
                    contact: "5. Contact",
                    questions: "Dacă ai întrebări despre această Politică de Confidențialitate, ne poți contacta la",
                    back: "Înapoi"
                },
                terms: {
                    title: "Termeni de Serviciu",
                    use: "Prin utilizarea Notes, ești de acord să folosești serviciul în mod responsabil și să nu abuzezi de nicio funcționalitate în scopuri neautorizate sau dăunătoare.",
                    features: "Ne rezervăm dreptul de a modifica sau întrerupe funcționalitățile în orice moment. Continuarea utilizării aplicației după actualizări implică acceptarea modificărilor.",
                    app: "Aplicația noastră este oferită „ca atare”, fără garanții de niciun fel. Utilizarea aplicației este pe propriul tău risc.",
                    back: "Înapoi"
                }
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
                listening: "Ascultând... 🎤 Te rog să vorbești clar.",
                transcribed: "Vocea a fost transcrisă cu succes!",
                speechRecognition: "Recunoașterea vocală nu este compatibilă cu acest browser.",
                calendar: {
                    warning: "Consimțământul tău va fi necesar pentru a te conecta la Google Calendar",
                    connectFirst: "Te rugăm să te conectezi mai întâi la Google Calendar.",
                    expired: "Conexiunea cu calendarul a expirat. Te rugăm să te reconectezi.",
                    sync: "Notiță sincronizată cu Google Calendar",
                    failed: "Nu s-a putut sincroniza nota cu Google Calendar: ",
                    connectionFailed: "Conectarea la Google Calendar a eșuat. Încearcă din nou.",
                    checkFailed: "Nu s-au putut verifica evenimentele din calendar: ",
                    notConnected: "Calendarul nu este conectat",
                    token: "Tokenul Google Calendar a expirat. Te rugăm să te reconectezi.",
                    refreshToken: "Lipsește tokenul de reîmprospătare. Revocă accesul și reconectează-te.",
                    success: "Conectare reușită la Google Calendar!",
                    updated: "Notiță actualizată în Google Calendar!",
                    alreadySynced: "Notiță deja sincronizată cu calendarul"
                },
            },
            easter: "Paște Fericit!",
            halloween: "Halloween Fericit!",
            xmas: "Crăciun Fericit!",
            newYear: "An Nou Fericit!"
        },
    },
}));