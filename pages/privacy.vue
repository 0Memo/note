<template>
    <div class="bg-[#1d073a] text-white min-h-screen px-4 py-8">
        <!-- Outer card: hidden on mobile, visible on md+ -->
        <div class="hidden md:block bg-[#2a1051] rounded-2xl p-8 max-w-xl w-full text-center shadow-md mx-auto">
            <Logo class="mx-auto mb-6" />

            <h1 class="text-3xl font-bold my-4">{{ $t('modal.privacy.title') }}</h1>
            <p class="mb-4">{{ $t('modal.privacy.explanation') }}</p>

            <h2 class="text-2xl font-semibold mt-4">{{ $t('modal.privacy.collect') }}</h2>
            <p class="mb-4">{{ $t('modal.privacy.choice') }}</p>

            <h2 class="text-2xl font-semibold mt-4">{{ $t('modal.privacy.data') }}</h2>
            <p class="mb-4">{{ $t('modal.privacy.permission') }}</p>

            <h2 class="text-2xl font-semibold mt-4">{{ $t('modal.privacy.storage') }}</h2>
            <p class="mb-4">{{ $t('modal.privacy.token') }}</p>

            <h2 class="text-2xl font-semibold mt-4">{{ $t('modal.privacy.compliance') }}</h2>
            <p class="mb-4">{{ $t('modal.privacy.requirements') }}</p>

            <h2 class="text-2xl font-semibold mt-4">{{ $t('modal.privacy.contact') }}</h2>
            <p class="mb-4">{{ $t('modal.privacy.questions') }}</p>
            <p>
            <a href="mailto:guillaume.mehats@gmail.com" class="underline hover:text-purple-300">
                guillaume.mehats@gmail.com
            </a>
            </p>

            <div class="text-zinc-100 mt-6">
            <nuxt-link
                :to="localePath('/')"
                class="w-full mt-4 bg-purple-900 text-lg px-4 py-2 rounded-2xl font-bold space-x-4 inline-flex justify-center items-center"
            >
                <span>{{ $t('modal.privacy.back') }}</span>
                <span>➤</span>
            </nuxt-link>
            </div>
        </div>

        <!-- Plain content visible on mobile -->
        <div class="md:hidden text-center max-w-xl mx-auto space-y-6">
            <Logo class="mx-auto mb-6" />

            <h1 class="text-3xl font-bold my-4">{{ $t('modal.privacy.title') }}</h1>
            <p>{{ $t('modal.privacy.explanation') }}</p>

            <h2 class="text-2xl font-semibold mt-4">{{ $t('modal.privacy.collect') }}</h2>
            <p>{{ $t('modal.privacy.choice') }}</p>

            <h2 class="text-2xl font-semibold mt-4">{{ $t('modal.privacy.data') }}</h2>
            <p>{{ $t('modal.privacy.permission') }}</p>

            <h2 class="text-2xl font-semibold mt-4">{{ $t('modal.privacy.storage') }}</h2>
            <p>{{ $t('modal.privacy.token') }}</p>

            <h2 class="text-2xl font-semibold mt-4">{{ $t('modal.privacy.compliance') }}</h2>
            <p>{{ $t('modal.privacy.requirements') }}</p>

            <h2 class="text-2xl font-semibold mt-4">{{ $t('modal.privacy.contact') }}</h2>
            <p>{{ $t('modal.privacy.questions') }}</p>
            <p>
                <a href="mailto:guillaume.mehats@gmail.com" class="underline hover:text-purple-300">
                    guillaume.mehats@gmail.com
                </a>
            </p>

            <div class="mt-6">
                <nuxt-link
                    :to="localePath('/')"
                    class="mx-auto mt-4 bg-purple-900 text-lg px-6 py-2 rounded-2xl font-bold space-x-4 inline-flex justify-center items-center mb-8 max-w-xs"
                >
                    <span>{{ $t('modal.privacy.back') }}</span>
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