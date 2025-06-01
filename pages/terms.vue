<template>
    <div class="bg-[#1d073a] text-white min-h-screen px-4 py-8
    block md:flex md:items-center md:justify-center">
        <!-- Outer card: hidden on mobile, visible on md+ -->
        <div class="hidden md:block bg-[#2a1051] rounded-2xl p-8 max-w-xl w-full text-center shadow-md mx-auto">
            <Logo class="mx-auto mb-6" />

            <h1 class="text-3xl font-bold mb-4">
            {{ $t('modal.terms.title') }}
            </h1>

            <p class="mb-4">{{ $t('modal.terms.use') }}</p>
            <p class="mb-4">{{ $t('modal.terms.features') }}</p>
            <p class="mb-4">{{ $t('modal.terms.app') }}</p>

            <div class="mt-6 relative z-50">
                <nuxt-link
                    :to="localePath('/')"
                    class="inline-flex items-center justify-center bg-purple-900 hover:bg-purple-800 transition text-lg px-6 py-2 rounded-2xl font-bold space-x-2"
                >
                    <span>{{ $t('modal.terms.back')}}</span>
                    <span>➤</span>
                </nuxt-link>
            </div>
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
                <nuxt-link
                    :to="localePath('/')"
                    class="inline-flex items-center justify-center bg-purple-900 hover:bg-purple-800 transition text-lg px-6 py-2 rounded-2xl font-bold space-x-2"
                >
                    <span>{{ $t('modal.terms.back')}}</span>
                    <span>➤</span>
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useI18n } from 'vue-i18n'
    import { useLocalePath } from '#i18n'
    
    const { t } = useI18n()
    const localePath = useLocalePath()
</script>  