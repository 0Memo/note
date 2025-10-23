<template>
    <div class="h-full min-h-[100dvh] overflow-y-auto bg-secondary text-white px-4 py-8">
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

            <h2 class="text-2xl font-semibold mt-4">{{ $t('modal.privacy.retention') }}</h2>
            <p>{{ $t('modal.privacy.deletion') }}</p>

            <h2 class="text-2xl font-semibold mt-4">{{ $t('modal.privacy.compliance') }}</h2>
            <p class="mb-4">{{ $t('modal.privacy.requirements') }}</p>

            <h2 class="text-2xl font-semibold mt-4">{{ $t('modal.privacy.contact') }}</h2>
            <p class="mb-4">{{ $t('modal.privacy.questions') }}</p>
            <p>
            <a href="mailto:guillaume.mehats@gmail.com" class="custom-underline">
                guillaume.mehats@gmail.com
            </a>
            </p>

            <div class="mt-6 relative z-50">
                <button
                    @click="goBack"
                    class="w-full mt-4 bg-purple-900 hover:bg-purple-800 text-lg px-4 py-2 rounded-2xl font-bold space-x-4 inline-flex justify-center items-center relative z-50"
                >
                    <span>{{ $t('modal.privacy.back') }}</span>
                    <Back class="w-6 h-6" />
                </button>
            </div>

            <p class="mt-6 ml-1 text-md text-zinc-300">
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

            <h1 class="text-3xl font-bold my-4">{{ $t('modal.privacy.title') }}</h1>
            <p>{{ $t('modal.privacy.explanation') }}</p>

            <h2 class="text-2xl font-semibold mt-4">{{ $t('modal.privacy.collect') }}</h2>
            <p>{{ $t('modal.privacy.choice') }}</p>

            <h2 class="text-2xl font-semibold mt-4">{{ $t('modal.privacy.data') }}</h2>
            <p>{{ $t('modal.privacy.permission') }}</p>

            <h2 class="text-2xl font-semibold mt-4">{{ $t('modal.privacy.storage') }}</h2>
            <p>{{ $t('modal.privacy.token') }}</p>

            <h2 class="text-2xl font-semibold mt-4">{{ $t('modal.privacy.retention') }}</h2>
            <p>{{ $t('modal.privacy.deletion') }}</p>

            <h2 class="text-2xl font-semibold mt-4">{{ $t('modal.privacy.compliance') }}</h2>
            <p>{{ $t('modal.privacy.requirements') }}</p>

            <h2 class="text-2xl font-semibold mt-4">{{ $t('modal.privacy.contact') }}</h2>
            <p>{{ $t('modal.privacy.questions') }}</p>
            <p>
                <a href="mailto:guillaume.mehats@gmail.com" class="custom-underline">
                    guillaume.mehats@gmail.com
                </a>
            </p>

            <div class="mt-6 relative z-50">
                <button
                    @click="goBack"
                    class="inline-flex items-center justify-center bg-purple-900 hover:bg-purple-800 transition text-lg px-6 py-2 rounded-2xl font-bold space-x-2"
                >
                    <span>{{ $t('modal.privacy.back') }}</span>
                    <Back class="w-6 h-6" />
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