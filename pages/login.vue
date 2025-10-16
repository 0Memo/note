<template>
    <div class="flex h-screen bg-primary font-h1">
        <div class="bg-[#030303] w-full md:w-[516px] p-12 flex flex-col justify-center">
            <Logo />
            <div class="flex flex-wrap justify-center gap-2 mt-8 -ml-16 text-white md:-ml-32 md:mt-6">
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
            <h1 class="mt-8 font-bold font-h1 md:text-2xl text-zinc-50">{{ $t('login.connection') }}</h1>
            <p class="mt-2 text-md text-zinc-200">
                {{ $t('login.subscribed') }}
                <nuxt-link
                    :to="localePath('/register')"
                    class="font-semibold text-purple-700 transform shadow-2xl cursor-pointer shadow-green-700 hover:text-purple-300">
                    {{ $t('login.creation') }}
                </nuxt-link>
            </p>

            <form @submit.prevent="submit" >
                <div class="mt-10">
                    <label for="" class="text-zinc-200 mr-8 block mb-0.5">{{ $t('login.email') }}</label>
                    <input
                        v-model="email"
                        type="email"
                        class="w-full h-10 px-3 border-2 border-zinc-500 placeholder:text-zinc-500 bg-zinc-800 text-zinc-100"
                        placeholder="email@example.com"
                        :style="{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }"
                    >
                </div>

                <div class="mt-8">
                    <label for="" class="text-zinc-200 mr-8 block mb-0.5">{{ $t('login.password') }}</label>
                    <input
                        v-model="password"
                        type="password"
                        class="w-full h-10 px-3 border-2 border-zinc-500 placeholder:text-zinc-500 bg-zinc-800 text-zinc-100"
                        placeholder="*******************"
                        :style="{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }"
                    >
                </div>

                <div class="mt-6 text-zinc-100">
                    <button class="w-full px-4 py-2 mt-4 space-x-4 text-lg font-bold bg-purple-900 rounded-2xl">
                        <span>{{ $t('login.connect') }}</span>
                        <span>➤</span>
                    </button>
                </div>
            </form>

            <div class="flex flex-row gap-8">
                <p class="mt-6 ml-1 text-md text-zinc-300">
                    <nuxt-link
                        :to="localePath('/forgot-password')"
                        class="font-semibold text-purple-700 transform shadow-2xl cursor-pointer shadow-green-700 hover:text-purple-300">
                        {{ $t('login.forgottenPassword') }}
                    </nuxt-link>
                </p>
                <p class="mt-6 ml-1 text-md text-zinc-300">
                    <nuxt-link
                        :to="localePath('/')"
                        class="font-semibold text-purple-700 transform shadow-2xl cursor-pointer shadow-green-700 hover:text-purple-300">
                        {{ $t('homepage.title') }}
                    </nuxt-link>
                </p>
            </div>

            <footer class="fixed bottom-0 flex items-center w-full gap-8 py-1 text-sm text-white bg-transparent md:bottom-8 left-10 md:text-md">
                <nuxt-link
                    :to="localePath('/privacy')"
                    class="whitespace-nowrap custom-underline underline-purple"
                >
                    {{ $t('modal.privacy.title') }}
                </nuxt-link>
                <nuxt-link
                    :to="localePath('/terms')"
                    class="whitespace-nowrap custom-underline underline-purple"
                >
                    {{ $t('modal.terms.title') }}
                </nuxt-link>
            </footer>

            <div
                v-if="isLoading"
                class="absolute inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ease-in-out bg-black bg-opacity-50"
            >
                <div id="loader"></div>
            </div>
        </div>

        <div class="hidden w-full bg-secondary text-zinc-100 md:block">
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
                navigateTo(localePath('/dashboard'))
            }, 2000) 

        } catch (error) {
            console.log('error: ', error.response?._data?.message)
            $toast.error(error.response?._data?.message)
        } finally {
            isLoading.value = false
        }
    }
</script>