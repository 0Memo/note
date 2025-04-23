<template>
    <div class="h-screen bg-[#1c044f] flex font-h1">
        <div class="bg-[#030303] md:w-[516px] p-12 flex flex-col justify-center">
            <Logo />
            <h1 class="font-h1 mt-8 md:text-2xl font-bold text-zinc-50">Mot de passe oublié ?</h1>
            <p class="mt-2 text-md text-zinc-200">Entrez votre adresse e-mail pour recevoir un lien de réinitialisation.</p>
            <p class="mt-2 text-md text-zinc-200">
                <nuxt-link
                    to="/login"
                    class="text-purple-700 shadow-2xl shadow-green-700 font-semibold transform cursor-pointer hover:text-purple-300">
                    Revenir à la page de connexion
                </nuxt-link>
                
            </p>

            <form @submit.prevent="handleSubmit">
                <div class="mt-10">
                    <label for="" class="text-zinc-200 mr-8 block mb-0.5">E-mail</label>
                    <input
                        v-model="email"
                        type="email"
                        class="w-full border-2 border-zinc-500
                        rounded-lg h-10 placeholder:text-zinc-500
                        px-3 bg-zinc-800 text-zinc-100"
                        placeholder="email@example.com"
                    >
                </div>

                <div class="text-zinc-100 mt-3">
                    <button class="w-full mt-4 bg-purple-900 text-lg px-4 py-2 rounded-2xl font-bold space-x-4">
                        <span>Envoyer</span>
                        <span>➤</span>
                    </button>
                </div>
            </form>
        </div>

        <div class="bg-purple-900 w-full text-zinc-100 hidden md:block">
        </div>
    </div>
</template>

<script setup>
    const email = ref('')
    const { $toast } = useNuxtApp()

    async function handleSubmit() {
        try {
            const response = await $fetch('/api/request-password-reset', {
                method: 'POST',
                body: {
                    email: email.value
                },
            })

            $toast.success("Un lien de réinitialisation a été envoyé à votre adresse mail.")
            setTimeout(() => {
                navigateTo('/login')
            }, 2000) 

        } catch (error) {
            console.log('error: ', error.response?._data?.message)
            $toast.error(error.response?._data?.message || 'Erreur lors de la demande.')
        }
    }
</script>
