<template>
    <div class="h-screen bg-primary flex font-h1">
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
                <button @click="changeLocale('hy')">
                    <img
                        src="https://flagcdn.com/w20/am.png"
                        srcset="https://flagcdn.com/w40/am.png 2x"
                        width="20"
                        height="13"
                        alt="Armenia"
                    >
                </button>
            </div>
            <h1 class="font-h1 mt-8 md:text-2xl font-bold text-zinc-50">{{ $t('resetPassword.reset') }}</h1>

            <form @submit.prevent="submit">
                <div class="mt-10">
                    <label for="password" class="text-zinc-200 mr-8 block mb-0.5">{{ $t('resetPassword.newPassword') }}</label>
                    <input
                        v-model="password"
                        type="password"
                        class="w-full border-2 border-zinc-500
                        h-10 placeholder:text-zinc-500
                        px-3 bg-zinc-800 text-zinc-100"
                        placeholder="********"
                        :style="{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }"
                    >
                </div>

                <div class="text-zinc-100 mt-3">
                    <button class="w-full mt-4 bg-purple-900 text-lg px-4 py-2 rounded-2xl font-bold space-x-3 flex items-center justify-center">
                        <span>{{ $t('resetPassword.validate') }}</span>
                        <Send class="w-6 h-6" />
                    </button>
                </div>
            </form>

            <p class="mt-6 ml-1 text-md text-zinc-300">
                <nuxt-link
                    :to="localePath('/')"
                    class="text-purple-700 shadow-2xl shadow-green-700 font-semibold
                    transform cursor-pointer hover:text-purple-300">
                    {{ $t('homepage.title') }}
                </nuxt-link>
            </p>

            <footer class="fixed bottom-0 md:bottom-8 left-10 gap-8 py-1 w-full flex items-center text-white bg-transparent text-sm md:text-md">
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
                class="absolute inset-0 flex items-center
                justify-center bg-black bg-opacity-50 z-50
                transition-opacity duration-500 ease-in-out"
            >
                <Transition name="preloader">
                    <SquirrelSpinner />
                </Transition>
            </div>
        </div>

        <div class="bg-secondary w-full text-zinc-100 hidden md:block">
        </div>
    </div>
</template>

<script setup>
    import { useI18n } from 'vue-i18n'
    import { useRouter, useRoute } from 'vue-router'
    import { useLocalePath } from '#i18n'

    const { t, locale } = useI18n()
    const localePath = useLocalePath()
    const router = useRouter()
    const route = useRoute()
    const token = computed(() => route.query.token)
    const password = ref('')
    const { $toast } = useNuxtApp()
    const isLoading = ref(false)

    function changeLocale(newLocale) {
        locale.value = newLocale
        localStorage.setItem('locale', newLocale)
        $toast.success(`${t('toast.language')}${newLocale}`)

        const path = `/${newLocale}/reset-password`
        router.push({ path })
    }

    async function submit() {
        isLoading.value = true

        try {
            await $fetch('/api/reset-password', {
            method: 'POST',
            body: {
                token: token.value,
                newPassword: password.value,
            },
            })

            $toast.success(t('toast.passwordChange'))
            navigateTo(localePath('/login'))
        } catch (error) {
            console.error(error)
            $toast.error(t('toast.noteDeletion'))
        } finally {
            isLoading.value = false
        }
    }
</script>