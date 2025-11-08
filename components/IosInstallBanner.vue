<template>
    <transition name="fade">
        <div v-if="shouldShow" class="fixed bottom-0 inset-x-0 bg-purple-800 text-white p-4 text-center z-50">
            <p class="text-sm">
            {{ $t('pwa.iosPrompt') }}
            </p>
            <button @click="dismiss" class="mt-2 text-xs underline hover:text-purple-300">
            {{ $t('pwa.dismiss') }}
            </button>
        </div>
    </transition>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import { useI18n } from 'vue-i18n'
    import { useLocalePath } from '#i18n'
    
    const shouldShow = ref(false)
    const { t, locale } = useI18n()
    const localePath = useLocalePath()

    const dismissedCookie = useCookie('ios-pwa-dismissed', {
        default: () => 'false',
        maxAge: 60 * 60 * 24 * 30,
        sameSite: 'lax',
        secure: true,
    })
    
    const isIos = () => {
        const userAgent = window.navigator.userAgent.toLowerCase()
        return /iphone|ipad|ipod/.test(userAgent)
    }
    
    const isInStandaloneMode = () => ('standalone' in window.navigator) && window.navigator.standalone
    
    const dismiss = () => {
        shouldShow.value = false
        dismissedCookie.value = 'true'
    }
    
    onMounted(() => {
        if (isIos() && !isInStandaloneMode() && dismissedCookie.value !== 'true') {
            shouldShow.value = true
        }
    })
    </script>
    
    <style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.5s ease;
    }
    .fade-enter-from, .fade-leave-to {
        opacity: 0;
    }
</style>