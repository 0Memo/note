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
                password: "Mot de passe (min 8 car.)",
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
                upcoming: "Proch.",
                tomorrow: "Demain",
                today: "Aujourd'hui",
                yesterday: "Hier",
                previous: "Préc.",
                change: "Changer",
                cancel: "Annuler",
                confirm: "Confirmer"
            },
            tooltip: {
                createNote: "Créer nouvelle note",
                deleteNote: "Supprimer note actuelle",
                dictateNote: "Dicter votre note",
                listenNote: "Écouter votre note",
                activate: "Activer traînée de souris",
                deactivate: "Désactiver traînée de souris",
                logout: "Déconnexion"
            },
            modal: {
                definitive: "Suppression définitive",
                confirm: "Confirmer?",
                yes: "Oui",
                no: "Non",
                privacy: {
                    title: "Politique de confidentialité",
                    explanation: "Cette politique de confidentialité explique comment Memo's Notes collecte, utilise, protège et stocke les données des utilisateurs.",                    
                    collect: "1. Quelles informations nous collectons",
                    choice: "Si vous choisissez de connecter votre Google Agenda, nous demandons l'accès à votre compte Google via OAuth. Nous demandons spécifiquement la portée suivante : https://www.googleapis.com/auth/calendar.events",                    
                    data: "2. Comment nous utilisons vos données",
                    permission: "Cette autorisation est utilisée uniquement pour créer, modifier ou supprimer des événements de calendrier correspondant à vos notes personnelles. Nous n'accédons pas, ne stockons pas et n'analysons pas les autres événements de votre calendrier.",                    
                    storage: "3. Stockage et protection des données",
                    token: "Les jetons OAuth sont stockés en toute sécurité sur nos serveurs avec chiffrement et transmis via HTTPS. L'accès est limité aux fonctions autorisées côté serveur. Nous ne partageons jamais vos jetons ou vos données avec des tiers.",                    
                    retention: "4. Conservation et suppression des données",
                    deletion: "Nous conservons vos jetons OAuth tant que votre compte reste connecté à Google Agenda. Vous pouvez déconnecter votre compte à tout moment, ce qui supprimera immédiatement les jetons. Vous pouvez aussi demander la suppression complète de vos données en nous contactant.",                    
                    compliance: "5. Conformité aux exigences Limited Use",
                    requirements: "L'utilisation des API Google par notre application respecte strictement les exigences de Limited Use : nous accédons uniquement aux informations nécessaires aux fonctionnalités demandées, sans jamais partager ou utiliser vos données à des fins publicitaires ou analytiques.",                    
                    contact: "6. Contact",
                    questions: "Pour toute question concernant cette politique de confidentialité ou vos données, vous pouvez nous contacter à",                    
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
            accessibility: {
                readNote: "Lire la note à haute voix"
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
                readingNote: "Lecture de la note...",
                saved: "Note enregistrée",
                calendar: {
                    warning: "Votre consentement sera requis pour connecter Google Agenda",
                    connectCalendar: "Connecter Google Agenda",
                    connecting: "Connexion à Google Agenda...",
                    wait: "Veuillez patienter pendant que nous configurons l'intégration de votre agenda.",
                    connected: "Connexion réussie !",
                    calendarConnected: "Agenda Connecté",
                    checkEvents: "Vérifier Évènements",
                    reconnect: "Reconnecter Agenda",
                    confirmation: "Votre Google Agenda a été connecté à Memo's Notes.",
                    toNotes: "Aller aux Notes",
                    connectFirst: "Veuillez d'abord vous connecter à Google Agenda.",
                    connectionFailed: "Échec de la connexion",
                    tryAgain: "Réessayer",
                    expired: "La connexion à l'agenda a expiré. Veuillez vous reconnecter.",
                    sync: "Note synchronisée avec Google Agenda",
                    syncToCalendar: "Sync Agenda",
                    failed: "Échec de la synchronisation de la note avec Google Agenda : ",
                    connectionFailed: "Échec de la connexion à Google Agenda. Veuillez réessayer.",
                    checkFailed: "Échec de la vérification des événements du calendrier : ",
                    notConnected: "Agenda non connecté",
                    token: "Le jeton Google Agenda a expiré. Veuillez vous reconnecter.",
                    refreshToken: "Jeton de rafraîchissement manquant. Veuillez révoquer l'accès et vous reconnecter.",
                    success: "Connexion réussie à Google Agenda !",
                    updated: "Note mise à jour dans Google Agenda!",
                    alreadySynced: "Note déjà synchronisée avec le calendrier",
                    error: "Erreur",
                    eventsFound: "{count} évènements trouvés dans Google Agenda"
                },
            },
            common: {
                installApp: "Installer App"
            },
            pwa: {
                iosPrompt: "Pour installer l'application, appuyer sur Partager → Ajouter à l'écran d'accueil",
                dismiss: "Fermer"
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
                password: "Contraseña (min 8 car)",
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
                upcoming: "Próx.",
                tomorrow: "Mañ.",
                today: "Hoy",
                yesterday: "Ayer",
                previous: "Prev.",
                change: "Cambiar",
                cancel: "Cancelar",
                confirm: "Confirmar"
            },
            tooltip: {
                createNote: "Crear nueva nota",
                deleteNote: "Eliminar nota actual",
                dictateNote: "Dictar su nota",
                listenNote: "Escuchar su nota",
                activate: "Activar estela del mouse",
                deactivate: "Desactivar estela del mouse",
                logout: "Cerrar sesión"
            },
            modal: {
                definitive: "Supresión definitiva",
                confirm: "¿Confirmar?",
                yes: "Sí",
                no: "No",
                privacy: {
                    title: "Política de privacidad",
                    explanation: "Esta Política de Privacidad explica cómo Memo's Notes recopila, utiliza, protege y almacena los datos de los usuarios.",                    
                    collect: "1. Qué información recopilamos",
                    choice: "Si elige conectar tu Calendario de Google, solicitamos acceso astu cuenta de Google mediante OAuth. Específicamente, solicitamos el siguiente alcance: https://www.googleapis.com/auth/calendar.events",                    
                    data: "2. Cómo usamos sus datos",
                    permission: "Usamos este permiso únicamente para crear, actualizar o eliminar eventos del calendario que representen sus notas personales. No accedemos, almacenamos ni analizamos ningún otro evento de su calendario.",                    
                    storage: "3. Almacenamiento y protección de datos",
                    token: "Los tokens OAuth se almacenan de forma segura en nuestros servidores utilizando cifrado y se transmiten mediante HTTPS. El acceso está restringido a funciones autorizadas del servidor. Nunca compartimos sus tokens ni sus datos con terceros.",                    
                    retention: "4. Conservación y eliminación de datos",
                    deletion: "Conservamos sus tokens OAuth solo mientras su cuenta esté conectada a Google Calendar. Puedes desconectar su cuenta en cualquier momento, lo cual eliminará los tokens de inmediato. También puede solicitar la eliminación completa de sus datos contactándonos.",                    
                    compliance: "5. Cumplimiento de uso limitado",
                    requirements: "El uso que hace nuestra app de las APIs de Google cumple estrictamente con los requisitos de Limited Use: solo accedemos a la información necesaria para las funciones solicitadas y nunca compartimos ni usamos sus datos con fines publicitarios o analíticos.",                    
                    contact: "6. Contacto",
                    questions: "Si tiene preguntas sobre esta política de privacidad o sus datos, puede escribirnos a",                    
                    back: "Volver"
                },
                terms: {
                    title: "Términos de servicio",
                    use: "Al usar Notes, acepta utilizar el servicio de manera responsable y no hacer un uso indebido de ninguna función para fines no autorizados o perjudiciales.",
                    features: "Nos reservamos el derecho de modificar o descontinuar funciones en cualquier momento. El uso continuado de la aplicación después de las actualizaciones implica la aceptación de los cambios.",
                    app: "Nuestra aplicación se proporciona “tal cual” sin garantías de ningún tipo. El uso de nuestra aplicación es bajo su propio riesgo.",
                    back: "Volver"
                }
            },
            accessibility: {
                readNote: "Leer la nota en voz alta"
            },
            toast: {
                register: "El usuario ha sido creado",
                language: "El idioma ha sido cambiado a: ",
                welcome: "¡Bienvenido!",
                passwordChange: "¡La contraseña ha sido cambiada con éxito!",
                linkError: "Enlace inválido o expirado",
                resetLink: "Se le ha enviado al correo un enlace para restablecer la contraseña",
                noteDeletion: "¡Se ha eliminado la nota con éxito!",
                deletionError: "Error al eliminar la nota",
                speechError: "El reconocimiento de voz falló",
                noSpeech: "Voz no detectada. Inténtelo de nuevo",
                audioError: "No se encontró micrófono",
                permissionError: "Acceso al micrófono denegado.",
                listening: "Escuchando... 🎤 Por favor hable claramente.",
                transcribed: "¡Voz transcrita con éxito!",
                speechRecognition: "El reconocimiento de voz no es compatible con este navegador.",
                readingNote: "Leyendo la nota...",
                saved: "Nota guardada",
                calendar: {
                    warning: "Se requerirá su consentimiento para conectar con Google Calendar",
                    connectCalendar: "Conectar Google Calendar",
                    connecting: "Conectando con Google Calendar...",
                    wait: "Por favor, espere mientras configuramos la integración de su calendario.",
                    connected: "¡Conectado con éxito!",
                    calendarConnected: "Calendar Conectado",
                    checkEvents: "Verificar Eventos",
                    reconnect: "Reconectar Calendar",
                    confirmation: "Su Google Calendar ha sido conectado a Memo's Notes.",
                    toNotes: "Ir a Notas",
                    connectFirst: "Por favor, conéctese primero a Google Calendar.",
                    connectionFailed: "Error de conexión",
                    tryAgain: "Intentar de nuevo",
                    expired: "La conexión al calendario ha expirado. Por favor, vuelva a conectar.",
                    sync: "Nota sincronizada con Google Calendar",
                    syncToCalendar: "Sync Calendar",
                    failed: "No se pudo sincronizar la nota con Google Calendar: ",
                    connectionFailed: "No se pudo conectar con Google Calendar. Por favor, inténtelo de nuevo.",
                    checkFailed: "No se pudieron comprobar los eventos del calendario: ",
                    notConnected: "Calendario no conectado",
                    token: "El token de Google Calendar ha expirado. Por favor, vuelva a conectar.",
                    refreshToken: "Falta el token de actualización. Por favor, revoque el acceso y vuelva a conectar.",
                    success: "¡Conexión exitosa con Google Calendar!",
                    updated: "¡Nota actualizada en Google Calendar!",
                    alreadySynced: "Nota ya actualizada con el calendario",
                    error: "Error",
                    eventsFound: "Se encontraron {count} eventos en Google Calendar"
                },
            },
            common: {
                installApp: "Instalar App"
            },
            pwa: {
                iosPrompt: "Para instalar la app, toque Compartir → Añadir a la pantalla de inicio",
                dismiss: "Cerrar"
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
                password: "Senha (min 8 car.)",
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
                upcoming: "Próx.",
                tomorrow: "Amanh.",
                today: "Hoje",
                yesterday: "Ontem",
                previous: "Prev.",
                change: "Alterar",
                cancel: "Cancelar",
                confirm: "Confirmar"
            },
            tooltip: {
                createNote: "Criar nova nota",
                deleteNote: "Excluir nota atual",
                dictateNote: "Dictar sua nota",
                listenNote: "Ouvir sua nota",
                activate: "Ativar trilha do mouse",
                deactivate: "Desativar trilha do mouse",
                logout: "Sair"
            },
            modal: {
                definitive: "Supressão definitiva",
                confirm: "Confirmar?",
                yes: "Sim",
                no: "Não",
                privacy: {
                    title: "Política de Privacidade",
                    explanation: "Esta Política de Privacidade explica como o Memo's Notes coleta, usa, protege e armazena os dados dos usuários.",                    
                    collect: "1. Quais informações coletamos",
                    choice: "Se você optar por conectar seu Google Agenda, solicitamos acesso à sua conta Google via OAuth. Solicitamos especificamente o seguinte escopo: https://www.googleapis.com/auth/calendar.events",                    
                    data: "2. Como usamos seus dados",
                    permission: "Utilizamos essa permissão apenas para criar, atualizar ou excluir eventos de calendário que representem suas anotações pessoais. Não acessamos, armazenamos nem analisamos outros eventos do seu calendário.",                    
                    storage: "3. Armazenamento e proteção de dados",
                    token: "Os tokens OAuth são armazenados com segurança em nossos servidores usando criptografia e transmitidos por HTTPS. O acesso é restrito a funções autorizadas no servidor. Nunca compartilhamos seus tokens ou dados com terceiros.",                    
                    retention: "4. Retenção e exclusão de dados",
                    deletion: "Mantemos seus tokens OAuth apenas enquanto sua conta estiver conectada ao Google Agenda. Você pode desconectar a conta a qualquer momento, o que excluirá os tokens imediatamente. Também pode solicitar a exclusão completa dos seus dados entrando em contato conosco.",                    
                    compliance: "5. Conformidade com o uso limitado",
                    requirements: "O uso das APIs do Google por nosso aplicativo está em total conformidade com os requisitos de uso limitado: acessamos apenas os dados necessários para os recursos solicitados, sem jamais compartilhar ou usar seus dados para publicidade ou análises.",                    
                    contact: "6. Contato",
                    questions: "Se você tiver dúvidas sobre esta Política de Privacidade ou sobre seus dados, entre em contato conosco",                    
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
            accessibility: {
                readNote: "Ler a nota em voz alta"
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
                readingNote: "Lendo a nota...",
                saved: "Nota salva",
                calendar: {
                    warning: "Seu consentimento será necessário para conectar ao Google Agenda",
                    connectCalendar: "Conectar o Google Agenda",
                    connecting: "Conectando ao Google Agenda...",
                    wait: "Por favor, aguarde enquanto configuramos a integração do seu calendário.",
                    connected: "Conectado com sucesso!",
                    calendarConnected: "Agenda Conectado",
                    checkEvents: "Verificar Eventos",
                    reconnect: "Reconectar o Agenda",
                    confirmation: "Seu Google Agenda foi conectado ao Memo's Notes.",
                    toNotes: "Ir para Notas",
                    connectFirst: "Por favor, conecte-se primeiro ao Google Agenda.",
                    connectionFailed: "Falha na conexão",
                    tryAgain: "Tentar novamente",
                    expired: "A conexão com o calendário expirou. Conecte-se novamente.",
                    sync: "Nota sincronizada com o Google Agenda",
                    syncToCalendar: "Sync Agenda",
                    failed: "Falha ao sincronizar a nota com o Google Agenda: ",
                    connectionFailed: "Falha ao conectar ao Google Agenda. Tente novamente.",
                    checkFailed: "Falha ao verificar os eventos do calendário: ",
                    notConnected: "Calendário não conectado",
                    token: "O token do Google Agenda expirou. Conecte-se novamente.",
                    refreshToken: "Token de atualização ausente. Revogue o acesso e conecte-se novamente.",
                    success: "Conectado com sucesso ao Google Agenda!",
                    updated: "Nota atualizada no Google Agenda!",
                    alreadySynced: "Nota já atualizada com o calendário",
                    error: "Erro",
                    eventsFound: "Foram encontrados {count} eventos no Google Agenda"
                },
            },
            common: {
                installApp: "Instalar App"
            },
            pwa: {
                iosPrompt: "Para instalar o app, toque em Compartilhar → Adicionar à Tela de Início",
                dismiss: "Fechar"
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
                password: "Password (min 8 char.)",
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
                upcoming: "Next",
                tomorrow: "Tomorr.",
                today: "Today",
                yesterday: "Yesterday",
                previous: "Prev.",
                change: "Change",
                cancel: "Cancel",
                confirm: "Confirm"
            },
            tooltip: {
                createNote: "Create new note",
                deleteNote: "Delete current note",
                dictateNote: "Dictate your note",
                listenNote: "Listen to your note",
                activate: "Activate mouse trail",
                deactivate: "Deactivate mouse trail",
                logout: "Log out"
            },
            modal: {
                definitive: "Definitive deletion",
                confirm: "Confirm?",
                yes: "Yes",
                no: "No",
                privacy: {
                    title: "Privacy Policy",
                    explanation: "This Privacy Policy explains how Memo's Notes collects, uses, protects, and stores user data.",                    
                    collect: "1. What Information We Collect",
                    choice: "If you choose to connect your Google Calendar, we request access to your Google account via OAuth. Specifically, we request the following Google scope: https://www.googleapis.com/auth/calendar.events",                    
                    data: "2. How We Use Your Data",
                    permission: "We use this permission only to create, update, or delete calendar events that represent your personal notes. We do not access, store, or analyze any other events in your calendar.",                    
                    storage: "3. Data Storage and Protection",
                    token: "OAuth tokens are stored securely on our servers using encryption and are transmitted over HTTPS. Access to these tokens is restricted to authorized server-side functions only. We do not share your tokens or data with any third parties.",                    
                    retention: "4. Data Retention and Deletion",
                    deletion: "We retain your OAuth tokens only as long as your account remains connected to Google Calendar. You may disconnect your account at any time, which deletes the tokens immediately. You may also request full deletion of your data by contacting us.",                    
                    compliance: "5. Limited Use Compliance",
                    requirements: "Our app's use of Google APIs strictly adheres to Google's Limited Use requirements: We only access the information necessary to provide the features you request, and we never share or use your data for advertising or analytics.",                    
                    contact: "6. Contact",
                    questions: "If you have any questions about this Privacy Policy or your data, you can contact us at",                    
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
            accessibility: {
                readNote: "Read note aloud"
            },
            toast: {
                register: "User has been created",
                language: "Language has been changed to: ",
                welcome: "Welcome!",
                passwordChange: "Password has been changed successful!",
                linkError: "Invalid or expired link",
                resetLink: "A reset link has been sent to your e-mail",
                noteDeletion: "Note has been successfully deleted!",
                deletionError: "Error deleting the note",
                speechError: "Speech recognition failed.",
                noSpeech: "No speech detected. Please try again.",
                audioError: "No microphone was found.",
                permissionError: "Microphone access was denied.",
                listening: "Listening... 🎤 Please speak clearly.",
                transcribed: "Speech successfully transcribed!",
                speechRecognition: "Speech recognition not supported in this browser.",
                readingNote: "Reading note...",
                saved: "Note saved",
                calendar: {
                    warning: "Your consent will be required to connect to Google Calendar",
                    connectCalendar: "Connect Google Calendar",
                    connecting: "Connecting to Google Calendar...",
                    wait: "Please wait while we set up your calendar integration.",
                    connected: "Successfuly Connected!",
                    calendarConnected: "Calendar Connected",
                    checkEvents: "Check Events",
                    reconnect: "Reconnect Calendar",
                    confirmation: "Your Google Calendar has been connected to Memo's Notes.",
                    toNotes: "Go to Notes",
                    connectFirst: "Please connect to Google Calendar first.",
                    connectionFailed: "Connection Failed",
                    tryAgain: "Try Again",
                    expired: "Calendar connection expired. Please reconnect.",
                    sync: "Note synced to Google Calendar",
                    syncToCalendar: "Sync Calendar",
                    failed: "Failed to sync note to Google Calendar: ",
                    connectionFailed: "Failed to connect to Google Calendar. Please try again.",
                    checkFailed: "Failed to check calendar events: ",
                    notConnected: "Calendar not connected",
                    token: "Google Calendar token expired. Please reconnect.",
                    refreshToken: "Missing refresh token. Please revoke access and reconnect.",
                    success: "Successfully connected to Google Calendar!",
                    updated: "Note updated in Google Calendar!",
                    alreadySynced: "Note has already been synced to calendar",
                    error: "Error",
                    eventsFound: "Found {count} events in Google Calendar"
                },
            },
            common: {
                installApp: "Install App"
            },
            pwa: {
                iosPrompt: "To install the app, tap Share → Add to Home Screen",
                dismiss: "Dismiss"
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
                password: "Password (min 8 car.)",
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
                upcoming: "Pross.",
                tomorrow: "Domani",
                today: "Oggi",
                yesterday: "Ieri",
                previous: "Prec.",
                change: "Modifica",
                cancel: "Annulla",
                confirm: "Conferma"
            },
            tooltip: {
                createNote: "Crea nuova nota",
                deleteNote: "Elimina nota corrente",
                dictateNote: "Detta la tua nota",
                listenNote: "Ascolta la tua nota",
                activate: "Attiva scia del mouse",
                deactivate: "Disattiva scia del mouse",
                logout: "Disconnetti"
            },
            modal: {
                definitive: "Eliminazione definitiva",
                confirm: "Confermi?",
                yes: "Sì",
                no: "No",
                privacy: {
                    title: "Informativa sulla privacy",
                    explanation: "Questa Informativa sulla Privacy spiega come Memo's Notes raccoglie, utilizza, protegge e conserva i dati degli utenti.",                    
                    collect: "1. Quali informazioni raccogliamo",
                    choice: "Se scegli di collegare il tuo Google Calendar, richiediamo l'accesso al tuo account Google tramite OAuth. Richiediamo specificamente il seguente scope: https://www.googleapis.com/auth/calendar.events",                    
                    data: "2. Come utilizziamo i tuoi dati",
                    permission: "Utilizziamo questo permesso solo per creare, aggiornare o eliminare eventi del calendario che rappresentano le tue note personali. Non accediamo, memorizziamo o analizziamo altri eventi nel tuo calendario.",                    
                    storage: "3. Archiviazione e protezione dei dati",
                    token: "I token OAuth sono archiviati in modo sicuro nei nostri server usando la crittografia e trasmessi tramite HTTPS. L'accesso è limitato alle funzioni autorizzate lato server. Non condividiamo mai i tuoi token o dati con terze parti.",                    
                    retention: "4. Conservazione e cancellazione dei dati",
                    deletion: "Conserviamo i token OAuth solo finché il tuo account resta collegato a Google Calendar. Puoi disconnettere l'account in qualsiasi momento, e i token verranno cancellati immediatamente. Puoi anche richiedere la cancellazione completa dei tuoi dati contattandoci.",                    
                    compliance: "5. Conformità ai requisiti Limited Use",
                    requirements: "L'utilizzo delle API di Google da parte della nostra app è pienamente conforme ai requisiti Limited Use: accediamo solo ai dati necessari per fornire le funzionalità richieste e non condividiamo né utilizziamo mai i tuoi dati per pubblicità o analisi.",                    
                    contact: "6. Contatto",
                    questions: "Per qualsiasi domanda su questa Informativa sulla Privacy o sui tuoi dati, puoi contattarci a",                    
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
            accessibility: {
                readNote: "Leggi la nota ad alta voce"
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
                readingNote: "Lettura della nota...",
                saved: "Nota salvata",
                calendar: {
                    warning: "Il tuo consenso sarà richiesto per connettersi a Google Calendar",
                    connectCalendar: "Connetti Google Calendar",
                    connecting: "Connessione a Google Calendar...",
                    wait: "Attendere mentre configuriamo l'integrazione del calendario.",
                    connected: "Connesso con successo!",
                    calendarConnected: "Calendar Connesso",
                    checkEvents: "Controlla Eventi",
                    reconnect: "Riconnetti Calendar",
                    confirmation: "Il tuo Google Calendar è stato collegato a Memo's Notes.",
                    toNotes: "Vai alle Note",
                    connectFirst: "Per favore, connettiti prima a Google Calendar.",
                    connectionFailed: "Connessione fallita",
                    tryAgain: "Riprova",
                    expired: "La connessione al calendario è scaduta. Riconnettiti.",
                    sync: "Nota sincronizzata con Google Calendar",
                    syncToCalendar: "Sync Calendar",
                    failed: "Impossibile sincronizzare la nota con Google Calendar: ",
                    connectionFailed: "Impossibile connettersi a Google Calendar. Riprova.",
                    checkFailed: "Impossibile controllare gli eventi del calendario: ",
                    notConnected: "Calendario non connesso",
                    token: "Il token di Google Calendar è scaduto. Riconnettiti.",
                    refreshToken: "Token di aggiornamento mancante. Revoca l'accesso e riconnettiti.",
                    success: "Connessione riuscita a Google Calendar!",
                    updated: "Nota aggiornata su Google Calendar!",
                    alreadySynced: "Nota già sincronizzata con il calendario",
                    error: "Errore",
                    eventsFound: "Trovati {count} eventi in Google Calendar"
                }
            },
            common: {
                installApp: "Installa l'App"
            },
            pwa: {
                iosPrompt: "Per installare l'app, tocca Condividi → Aggiungi a Home",
                dismiss: "Chiudi"
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
                password: "Lösenord (min 8 tkn)",
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
                upcoming: "Nästa",
                tomorrow: "I morg.",
                today: "Idag",
                yesterday: "Igår",
                previous: "Föreg.",
                change: "Ändra",
                cancel: "Avbryt",
                confirm: "Bekräfta"
            },
            tooltip: {
                createNote: "Skapa ny anteckning",
                deleteNote: "Radera aktuell anteckning",
                dictateNote: "Diktera din anteckning",
                listenNote: "Lyssna på din anteckning",
                activate: "Aktivera musspår",
                deactivate: "Inaktivera musspår",
                logout: "Logga ut"
            },
            modal: {
                definitive: "Slutgiltig radering",
                confirm: "Bekräfta?",
                yes: "Ja",
                no: "Nej",
                privacy: {
                    title: "Integritetspolicy",
                    explanation: "Denna integritetspolicy förklarar hur Memo's Notes samlar in, använder, skyddar och lagrar användardata.",                    
                    collect: "1. Vilken information vi samlar in",
                    choice: "Om du väljer att ansluta din Google Kalender begär vi åtkomst till ditt Google-konto via OAuth. Vi begär särskilt följande behörighet: https://www.googleapis.com/auth/calendar.events",                    
                    data: "2. Hur vi använder din data",
                    permission: "Denna behörighet används endast för att skapa, uppdatera eller ta bort kalenderhändelser som representerar dina personliga anteckningar. Vi har inte åtkomst till eller lagrar några andra händelser i din kalender.",                    
                    storage: "3. Lagring och skydd av data",
                    token: "OAuth-token lagras säkert på våra servrar med kryptering och överförs via HTTPS. Endast auktoriserade serverfunktioner har åtkomst till dessa tokens. Vi delar aldrig dina tokens eller data med tredje part.",                    
                    retention: "4. Databevarande och radering",
                    deletion: "Vi lagrar dina OAuth-token endast så länge ditt konto är anslutet till Google Kalender. Du kan när som helst koppla från kontot och token tas bort omedelbart. Du kan också begära fullständig radering av din data genom att kontakta oss.",                    
                    compliance: "5. Efterlevnad av Limited Use",
                    requirements: "Vår app följer Googles krav för Limited Use: vi får endast åtkomst till information som krävs för att leverera funktionerna du begär och vi delar aldrig din data för annonsering eller analys.",                    
                    contact: "6. Kontakt",
                    questions: "Om du har frågor om denna integritetspolicy eller om dina uppgifter, kontakta oss på",                    
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
            accessibility: {
                readNote: "Läs anteckningen högt"
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
                readingNote: "Läser anteckningen...",
                saved: "Anteckning sparad",
                calendar: {
                    warning: "Ditt samtycke krävs för att ansluta till Google Kalender",
                    connectCalendar: "Anslut Google Kalender",
                    connecting: "Ansluter till Google Kalender...",
                    wait: "Vänligen vänta medan vi ställer in din kalenderintegration.",
                    connected: "Ansluten framgångsrikt!",
                    calendarConnected: "Kalender Ansluten",
                    checkEvents: "Kontrollera Händelser",
                    reconnect: "Återanslut Kalender",
                    confirmation: "Din Google Kalender har anslutits till Memo's Notes.",
                    toNotes: "Gå till Anteckningar",
                    connectFirst: "Vänligen anslut till Google Kalender först.",
                    connectionFailed: "Anslutning misslyckades",
                    tryAgain: "Försök igen",
                    expired: "Kalenderanslutningen har löpt ut. Anslut igen.",
                    sync: "Anteckning synkroniserad med Google Kalender",
                    syncToCalendar: "Sync Kalender",
                    failed: "Kunde inte synkronisera anteckningen med Google Kalender: ",
                    connectionFailed: "Kunde inte ansluta till Google Kalender. Försök igen.",
                    checkFailed: "Kunde inte kontrollera kalenderevenemang: ",
                    notConnected: "Kalendern är inte ansluten",
                    token: "Google Kalender-token har löpt ut. Anslut igen.",
                    refreshToken: "Uppdateringstoken saknas. Återkalla åtkomsten och anslut igen.",
                    success: "Ansluten till Google Kalender!",
                    updated: "Anteckning uppdaterad i Google Kalender!",
                    alreadySynced: "Anteckning redan synkats med kalendarn",
                    error: "Fel",
                    eventsFound: "Hittade {count} händelser i Google Kalender"
                },
            },
            common: {
                installApp: "Installera Appen"
            },
            pwa: {
                iosPrompt: "För att installera appen, tryck på Dela → Lägg till på hemskärmen",
                dismiss: "Stäng"
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
                password: "Parolă (min 8 car.)",
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
                upcoming: "Următ.",
                tomorrow: "Mâine",
                today: "Astăzi",
                yesterday: "Ieri",
                previous: "Anter.",
                change: "Schimbă",
                cancel: "Anulează",
                confirm: "Confirmă"
            },
            tooltip: {
                createNote: "Creează notă nouă",
                deleteNote: "Șterge nota curentă",
                dictateNote: "Dictează nota ta",
                listenNote: "Ascultă nota ta",
                activate: "Activează urma mouse-ului",
                deactivate: "Dezactivează mouse-ului",
                logout: "Deconectează-te"
            },
            modal: {
                definitive: "Ștergere definitivă",
                confirm: "Confirmi?",
                yes: "Da",
                no: "Nu",
                privacy: {
                    title: "Politica de confidențialitate",
                    explanation: "Această Politică de Confidențialitate explică modul în care Memo's Notes colectează, utilizează, protejează și stochează datele utilizatorilor.",                    
                    collect: "1. Ce informații colectăm",
                    choice: "Dacă alegi să îți conectezi Google Calendar, vom solicita acces la contul tău Google prin OAuth. Solicităm în mod specific următorul scop: https://www.googleapis.com/auth/calendar.events",                    
                    data: "2. Cum folosim datele tale",
                    permission: "Folosim această permisiune doar pentru a crea, actualiza sau șterge evenimente din calendar care reprezintă notițele tale personale. Nu accesăm, nu stocăm și nu analizăm alte evenimente din calendarul tău.",                    
                    storage: "3. Stocarea și protecția datelor",
                    token: "Tokenurile OAuth sunt stocate în siguranță pe serverele noastre, criptate și transmise prin HTTPS. Accesul este permis doar funcțiilor autorizate din backend. Nu partajăm niciodată tokenurile sau datele tale cu terți.",                    
                    retention: "4. Păstrarea și ștergerea datelor",
                    deletion: "Păstrăm tokenurile OAuth doar cât timp contul tău este conectat la Google Calendar. Poți deconecta contul în orice moment, iar tokenurile vor fi șterse imediat. Poți de asemenea solicita ștergerea completă a datelor contactându-ne.",                    
                    compliance: "5. Conformitate cu cerințele Limited Use",
                    requirements: "Utilizarea API-urilor Google de către aplicația noastră respectă pe deplin cerințele Limited Use: accesăm doar informațiile necesare pentru funcțiile solicitate și nu partajăm sau folosim datele tale în scopuri publicitare sau analitice.",                    
                    contact: "6. Contact",
                    questions: "Pentru întrebări privind această politică de confidențialitate sau datele tale, ne poți contacta la",                    
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
            accessibility: {
                readNote: "Citește notița cu voce tare"
            },
            toast: {
                register: "Utilizatorul a fost creat",
                language: "Limba a fost schimbată în: ",
                welcome: "Bine ai venit!",
                passwordChange: "Parola a fost schimbată cu succes!",
                linkError: "Link invalid sau expirat",
                resetLink: "Un link de resetare a fost trimit pe adresa ta de e-mail",
                noteDeletion: "Notița a fost ștearsă cu succes!",
                deletionError: "Eroare la ștergerea notei",
                speechError: "Recunoașterea vocală a eșuat",
                noSpeech: "Nu a fost detectată nicio voce. Încearcă din nou",
                audioError: "Nu a fost găsit niciun microfon",
                permissionError: "Accesul la microfon a fost refuzat",
                listening: "Ascultând... 🎤 Te rog să vorbești clar.",
                transcribed: "Vocea a fost transcrisă cu succes!",
                speechRecognition: "Recunoașterea vocală nu este compatibilă cu acest browser.",
                readingNote: "Se citește notița...",
                saved: "Notiță salvată",
                calendar: {
                    warning: "Consimțământul tău va fi necesar pentru a te conecta la Google Calendar",
                    connectCalendar: "Conectează Google Calendar",
                    connecting: "Se conectează la Google Calendar...",
                    wait: "Te rugăm să aștepți în timp ce configurăm integrarea calendarului.",
                    connected: "Conectare reușită!",
                    calendarConnected: "Calendar Conectat",
                    checkEvents: "Verifică Evenimentele",
                    reconnect: "Reconectează Calendarul",
                    confirmation: "Calendarul Google a fost conectat la Memo's Notes.",
                    toNotes: "Mergi la Note",
                    connectFirst: "Te rugăm să te conectezi mai întâi la Google Calendar.",
                    connectionFailed: "Conectare eșuată",
                    tryAgain: "Încearcă din nou",
                    expired: "Conexiunea cu calendarul a expirat. Te rugăm să te reconectezi.",
                    sync: "Notiță sincronizată cu Google Calendar",
                    syncToCalendar: "Sync Calendar",
                    failed: "Nu s-a putut sincroniza notița cu Google Calendar: ",
                    connectionFailed: "Conectarea la Google Calendar a eșuat. Încearcă din nou.",
                    checkFailed: "Nu s-au putut verifica evenimentele din calendar: ",
                    notConnected: "Calendarul nu este conectat",
                    token: "Tokenul Google Calendar a expirat. Te rugăm să te reconectezi.",
                    refreshToken: "Lipsește tokenul de reîmprospătare. Revocă accesul și reconectează-te.",
                    success: "Conectare reușită la Google Calendar!",
                    updated: "Notiță actualizată în Google Calendar!",
                    alreadySynced: "Notiță deja sincronizată cu calendarul",
                    error: "Eroare",
                    eventsFound: "Am găsit {count} evenimente în Google Calendar"
                },
            },
            common: {
                installApp: "Instalează App"
            },
            pwa: {
                iosPrompt: "Pentru a instala aplicația, atinge Partajare → Adaugă pe ecranul de pornire",
                dismiss: "Închide"
            },
            easter: "Paște Fericit!",
            halloween: "Halloween Fericit!",
            xmas: "Crăciun Fericit!",
            newYear: "An Nou Fericit!"
        },
    },
}));