<template>
    <div class="bg-secondary text-white min-h-screen px-4 py-8
    block md:flex md:items-center md:justify-center">
        <!-- Outer card: hidden on mobile, visible on md+ -->
        <div class="hidden md:block bg-[#030303] rounded-2xl p-8 max-w-xl w-full text-center shadow-md mx-auto">
            <Logo class="mx-auto mb-6" />

            <h1 class="text-3xl font-bold mb-4">
            {{ $t('modal.terms.title') }}
            </h1>

            <p class="mb-4">{{ $t('modal.terms.use') }}</p>
            <p class="mb-4">{{ $t('modal.terms.features') }}</p>
            <p class="mb-4">{{ $t('modal.terms.app') }}</p>

            <div class="mt-6 relative z-50 overflow-visible">
                <!-- <button
                    @click="goBack"
                    class="inline-flex items-center justify-center bg-purple-900 hover:bg-purple-800 transition text-lg px-6 py-2 rounded-2xl font-bold space-x-2"
                >
                    <span>{{ $t('modal.terms.back')}}</span>
                    <Back class="w-6 h-6" />
                </button> -->
                <button @click="goBack" class="pill-button regular-pill-button mt-6 text-white w-full">
                    <div class="pill-wrap">
                        <p>
                            <span>✧</span>
                            <span>✦</span>
                            {{ $t('modal.terms.back') }}
                            <Back class="w-6 h-6" />
                        </p>
                    </div>
                </button>
            </div>

            <p class="mt-6 ml-1 text-md text-zinc-300 relative z-50 overflow-visible">
                <nuxt-link
                    :to="localePath('/')"
                    class="text-white shadow-2xl shadow-purple-900 font-semibold
                    transform cursor-pointer custom-underline">
                    {{ $t('homepage.title') }}
                </nuxt-link>
            </p>
        </div>

        <!-- Plain content visible on mobile -->
        <div class="md:hidden text-center max-w-xl mx-auto space-y-6">
            <Logo class="mx-auto mb-6" />

            <h1 class="text-3xl font-bold mb-4">
            {{ $t('modal.terms.title') }}
            </h1>

            <p class="mb-4">{{ $t('modal.terms.use') }}</p>
            <p class="mb-4">{{ $t('modal.terms.features') }}</p>
            <p class="mb-4">{{ $t('modal.terms.app') }}</p>

            <div class="mt-6 relative z-50">
                <!-- <button
                    @click="goBack"
                    class="inline-flex items-center justify-center bg-purple-900 hover:bg-purple-800 transition text-lg px-6 py-2 rounded-2xl font-bold space-x-2"
                >
                    <span>{{ $t('modal.terms.back')}}</span>
                    <Back class="w-6 h-6" />
                </button> -->
                <button @click="goBack" class="pill-button regular-pill-button mt-6 text-white w-full">
                    <div class="pill-wrap">
                        <p>
                            <span>✧</span>
                            <span>✦</span>
                            {{ $t('modal.terms.back') }}
                            <Back class="w-6 h-6" />
                        </p>
                    </div>
                </button>
            </div>

            <p class="mt-6 ml-1 text-md text-zinc-300 relative z-50">
                <nuxt-link
                    :to="localePath('/')"
                    class="text-white shadow-2xl shadow-purple-900 font-semibold
                    transform cursor-pointer custom-underline">
                    {{ $t('homepage.title') }}
                </nuxt-link>
            </p>
        </div>
    </div>
</template>

<script setup>
    import { useI18n } from 'vue-i18n'
    import { useLocalePath } from '#i18n'
    
    const { t } = useI18n()
    const localePath = useLocalePath()

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