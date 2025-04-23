<template>
    <div class="h-screen bg-[#1c044f] flex font-h1">
        <div class="bg-[#030303] md:w-[516px] p-12 flex flex-col justify-center">
            <Logo />
            <h1 class="font-h1 mt-8 md:text-2xl font-bold text-zinc-50">Changer votre mot de passe</h1>

            <form @submit.prevent="submit">
                <div class="mt-10">
                    <label for="password" class="text-zinc-200 mr-8 block mb-0.5">Nouveau mot de passe</label>
                    <input
                        v-model="password"
                        type="password"
                        class="w-full border-2 border-zinc-500
                        rounded-lg h-10 placeholder:text-zinc-500
                        px-3 bg-zinc-800 text-zinc-100"
                        placeholder="********"
                    >
                </div>

                <div class="text-zinc-100 mt-3">
                    <button class="w-full mt-4 bg-purple-900 text-lg px-4 py-2 rounded-2xl font-bold space-x-4">
                        <span>Réinitialiser</span>
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
    const route = useRoute()
    const token = computed(() => route.query.token)
    const password = ref('')
    const { $toast } = useNuxtApp()

    async function submit() {
    try {
        await $fetch('/api/reset-password', {
        method: 'POST',
        body: {
            token: token.value,
            newPassword: password.value,
        },
        })

        $toast.success('Mot de passe changé avec succès !')
        navigateTo('/login')
    } catch (error) {
        console.error(error)
        $toast.error("Le lien est invalide ou a expiré.")
    }
    }
</script>