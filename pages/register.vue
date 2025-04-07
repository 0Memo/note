<template>
    <div class="h-screen bg-[#1c044f] flex font-h1">
        <div class="bg-slate-900 w-[516px] p-12 flex flex-col justify-center">
            <Logo />
            <h1 class="font-h1 mt-8 md:text-2xl font-bold text-zinc-50">Inscription gratuite</h1>
            <p class="mt-2 text-md text-zinc-200">
                Déjà inscrit?
                <span
                    class="text-purple-700 shadow-2xl shadow-green-700 font-semibold transform cursor-pointer hover:text-purple-300">
                    Connectez-vous
                </span>
                à votre compte
            </p>

            <form @submit.prevent="submit" >
                <div class="mt-10">
                    <label for="" class="text-zinc-200 mr-8 block mb-0.5">E-mail</label>
                    <input
                        v-model="email"
                        type="email"
                        class="w-full border-2 border-zinc-500
                        rounded-lg h-10 placeholder:text-zinc-500
                        px-3 bg-zinc-800 text-zinc-100"
                        placeholder="email@example.com">
                </div>

                <div class="mt-8">
                    <label for="" class="text-zinc-200 mr-8 block mb-0.5">Mot de passe</label>
                    <input
                        v-model="password"
                        type="password"
                        class="w-full border-2 border-zinc-500
                        rounded-lg h-10 placeholder:text-zinc-500
                        px-3 bg-zinc-800 text-zinc-100"
                        placeholder="*******************">
                </div>

                <div class="text-zinc-100 mt-6">
                    <button class="w-full mt-4 bg-purple-900 text-lg px-4 py-2 rounded-2xl font-bold space-x-4">
                        <span>Inscription</span>
                        <span>➤</span>
                    </button>
                </div>
            </form>
        </div>

        <div class="bg-purple-900 w-full text-zinc-100">
            <h1 class="text-3xl font-bold font-h1 p-8">Register</h1>
        </div>
    </div>
</template>

<script setup>
    const email = ref('')
    const password = ref('')

    async function submit() {
        console.log(email.value)
        console.log(password.value)

        const response = await $fetch('/api/user', {
            method: 'POST',
            body: {
                email: email.value,
                password: password.value,
            },
        })

        console.log('response', response)
    }
</script>