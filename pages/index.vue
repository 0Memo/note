<template>
    <div class="min-h-screen bg-[#1c044f] flex font-h1">
        <div class="bg-[#030303] w-full md:w-[516px] p-12 flex flex-col justify-center">
            <Logo class="mx-auto" />
            <div class="text-white flex flex-wrap justify-center gap-2 mt-8">
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
            <h1 class="my-5 md:my-8 text-2xl font-bold text-zinc-50 text-center">{{ $t('homepage.title') }}</h1>
            <div class="mt-2 space-y-2 text-[15.5px] text-zinc-200">
                <p>{{ $t('homepage.welcome') }}</p>
                <p>{{ $t('homepage.app') }}</p>
                <p>{{ $t('homepage.actions') }}</p>
                <p>{{ $t('homepage.calendar') }}</p>
                <p>{{ $t('homepage.organize') }}</p>
                <p>{{ $t('homepage.access') }}</p>
            </div>

            <div class="flex justify-between w-full mt-6 relative z-50">
                <nuxt-link
                    :to="localePath('/register')"
                    class="text-purple-700 shadow-2xl shadow-green-700 font-semibold
                    transform cursor-pointer hover:text-purple-300">
                    {{ $t('login.creation') }}
                </nuxt-link>
                <nuxt-link
                    :to="localePath('/login')"
                    class="text-purple-700 shadow-2xl shadow-green-700 font-semibold
                    transform cursor-pointer hover:text-purple-300">
                    {{ $t('register.login') }}
                </nuxt-link>
            </div>

            <div class="mt-6 text-white flex justify-center relative z-50">
                <button
                    @click="goBack"
                    class="inline-flex items-center justify-center bg-purple-900 hover:bg-purple-800 transition text-lg px-6 py-2 rounded-2xl font-bold space-x-2"
                >
                    <span>{{ $t('modal.terms.back')}}</span>
                    <span>➤</span>
                </button>
            </div>

            <footer class="mt-10 sm:mt-14 md:mt-20 sm:-mb-2 md:-mb-0 w-full flex justify-between text-white bg-transparent text-sm md:text-md relative z-50">
                <nuxt-link
                    :to="localePath('/privacy')"
                    class="whitespace-nowrap hover:underline"
                >
                    {{ $t('modal.privacy.title') }}
                </nuxt-link>
                <nuxt-link
                    :to="localePath('/terms')"
                    class="whitespace-nowrap hover:underline"
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
                <div id="loader"></div>
            </div>
        </div>

        <div class="bg-[#1d073a] w-full text-zinc-100 hidden md:block">
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
    const { $toast } = useNuxtApp()
    const isLoading = ref(false)

    function changeLocale(newLocale) {
        locale.value = newLocale
        localStorage.setItem('locale', newLocale)
        $toast.success(`${t('toast.language')}${newLocale}`)

        const path = `/${newLocale}/`
        router.push({ path })
    }

    const goBack = () => {
        if (import.meta.client) {
            if (window.history.length > 1) {
                window.history.back()
            } else {
                window.location.href = localePath('/') // fallback to homepage
            }
        }
    }
</script>