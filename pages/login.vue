<template>
    <div class="h-screen bg-[#1c044f] flex font-h1">
        <div class="bg-[#030303] w-full md:w-[516px] p-12 flex flex-col justify-center">
            <Logo />
            <div class="text-white -ml-16 md:-ml-32 flex flex-wrap justify-center gap-2 mt-8 md:mt-6">
                <button @click="changeLocale('en')">
                    <img
                        src="https://flagcdn.com/w20/us.png"
                        srcset="https://flagcdn.com/w40/us.png 2x"
                        width="20"
                        height="13"
                        alt="United States"
                    >
                </button>
                <button @click="changeLocale('es')">
                    <img
                        src="https://flagcdn.com/w20/es.png"
                        srcset="https://flagcdn.com/w40/es.png 2x"
                        width="20"
                        height="13"
                        alt="Spain"
                    >
                </button>
                <button @click="changeLocale('fr')">
                    <img
                        src="https://flagcdn.com/w20/fr.png"
                        srcset="https://flagcdn.com/w40/fr.png 2x"
                        width="20"
                        height="13"
                        alt="France"
                    >
                </button>
                <button @click="changeLocale('it')">
                    <img
                        src="https://flagcdn.com/w20/it.png"
                        srcset="https://flagcdn.com/w40/it.png 2x"
                        width="20"
                        height="13"
                        alt="Italy"
                    >
                </button>
                <button @click="changeLocale('pt')">
                    <img
                        src="https://flagcdn.com/w20/br.png"
                        srcset="https://flagcdn.com/w40/br.png 2x"
                        width="20"
                        height="13"
                        alt="Brazil"
                    >
                </button>
                <button @click="changeLocale('ro')">
                    <img
                        src="https://flagcdn.com/w20/ro.png"
                        srcset="https://flagcdn.com/w40/ro.png 2x"
                        width="20"
                        height="13"
                        alt="Romania"
                    >
                </button>
                <button @click="changeLocale('sv')">
                    <img
                        src="https://flagcdn.com/w20/se.png"
                        srcset="https://flagcdn.com/w40/se.png 2x"
                        width="20"
                        height="13"
                        alt="Sweden"
                    >
                </button>
            </div>
            <h1 class="font-h1 mt-8 md:text-2xl font-bold text-zinc-50">{{ $t('login.connection') }}</h1>
            <p class="mt-2 text-md text-zinc-200">
                {{ $t('login.subscribed') }}
                <nuxt-link
                    :to="localePath('/register')"
                    class="text-purple-700 shadow-2xl shadow-green-700 font-semibold transform cursor-pointer hover:text-purple-300">
                    {{ $t('login.creation') }}
                </nuxt-link>
            </p>

            <form @submit.prevent="submit" >
                <div class="mt-10">
                    <label for="" class="text-zinc-200 mr-8 block mb-0.5">{{ $t('login.email') }}</label>
                    <input
                        v-model="email"
                        type="email"
                        class="w-full border-2 border-zinc-500
                        rounded-lg h-10 placeholder:text-zinc-500
                        px-3 bg-zinc-800 text-zinc-100"
                        placeholder="email@example.com"
                    >
                </div>

                <div class="mt-8">
                    <label for="" class="text-zinc-200 mr-8 block mb-0.5">{{ $t('login.password') }}</label>
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
                        <span>{{ $t('login.connect') }}</span>
                        <span>➤</span>
                    </button>
                </div>
            </form>

            <p class="mt-6 ml-1 text-md text-zinc-300">
                <nuxt-link
                    :to="localePath('/forgot-password')"
                    class="text-purple-700 shadow-2xl shadow-green-700 font-semibold
                    transform cursor-pointer hover:text-purple-300">
                    {{ $t('login.forgottenPassword') }}
                </nuxt-link>
            </p>

            <div
                v-if="isLoading"
                class="absolute inset-0 flex items-center
                justify-center bg-black bg-opacity-50 z-50
                transition-opacity duration-500 ease-in-out"
            >
                <div id="loader"></div>
            </div>
        </div>

        <div class="bg-purple-900 w-full text-zinc-100 hidden md:block">
        </div>
    </div>
</template>

<script setup>
    import { useI18n } from 'vue-i18n'
    import { useRouter } from 'vue-router'
    import { useLocalePath } from '#i18n'

    const { t, locale } = useI18n()
    const localePath = useLocalePath()
    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const { $toast } = useNuxtApp()
    const isLoading = ref(false)

    function changeLocale(newLocale) {
        locale.value = newLocale
        localStorage.setItem('locale', newLocale)
        $toast.success(`${t('toast.language')}${newLocale}`)

        const path = `/${newLocale}/login`
        router.push({ path })
    }

    async function submit() {
        isLoading.value = true

        try {
            const response = await $fetch('/api/login', {
                method: 'POST',
                body: {
                    email: email.value,
                    password: password.value,
                },
            })

            $toast.success(t('toast.welcome'))
            setTimeout(() => {
                navigateTo(localePath('/'))
            }, 2000) 

        } catch (error) {
            console.log('error: ', error.response?._data?.message)
            $toast.error(error.response?._data?.message)
        } finally {
            isLoading.value = false
        }
    }
</script>