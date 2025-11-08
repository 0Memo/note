<template>
    <div class="min-h-screen bg-secondary flex items-center justify-center">
        <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
            <div v-if="isProcessing" class="space-y-4">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto"></div>
            <h2 class="text-xl font-semibold text-gray-800">{{ $t('toast.calendar.connecting') }}</h2>
            <p class="text-gray-600">{{ $t('toast.calendar.wait') }}</p>
            </div>
            
            <div v-else-if="success" class="space-y-4">
            <div class="text-green-600">
                <svg class="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
            </div>
            <h2 class="text-xl font-semibold text-gray-800">{{ $t('toast.calendar.connected') }}</h2>
            <p class="text-gray-600">{{ $t('toast.calendar.confirmation') }}</p>
            <button 
                @click="goToNotes" 
                class="bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
            >
            {{ $t('toast.calendar.toNotes') }}
            </button>
            </div>
            
            <div v-else class="space-y-4">
            <div class="text-red-600">
                <svg class="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
            </div>
            <h2 class="text-xl font-semibold text-gray-800">{{ $t('toast.calendar.connectionFailed') }}</h2>
            <p class="text-gray-600">{{ errorMessage }}</p>
            <div class="space-x-4">
                <button 
                @click="retryConnection" 
                class="bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
                >
                {{ $t('toast.calendar.tryAgain') }}
                </button>
                <button 
                @click="goToNotes" 
                class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
                >
                {{ $t('toast.calendar.toNotes') }}
                </button>
            </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import { useI18n } from 'vue-i18n'
    import { useRoute, useRouter } from 'vue-router'
    import { useToast } from 'vue-toast-notification'
    import { useLocalePath } from '#i18n'
    import { useCookie } from '#app'

    const route = useRoute()
    const router = useRouter()
    const { t } = useI18n()
    const localePath = useLocalePath()
    const $toast = useToast()

    const isProcessing = ref(true)
    const success = ref(false)
    const errorMessage = ref('')

    const accessTokenCookie = useCookie('google_access_token', { readonly: true })

    // Make sure user is logged in
    definePageMeta({
        middleware: ['auth'],
    })

    const code = ref(null)
    const error = ref(null)

    onMounted(async () => {
        const urlError = route.query.error
        const connected = route.query.calendar_connected === 'true'

        if (urlError) {
            isProcessing.value = false
            errorMessage.value = urlError === 'no_code' ? 'No authorization code' : 'Token exchange failed'
            return
        }

        if (connected) {
            // Success: cookies were set by callback.get.js
            if (accessTokenCookie.value) {
            success.value = true
            $toast.success(t('toast.calendar.success'))
            setTimeout(() => goToNotes(), 2000)
            } else {
            // Fallback: should not happen, but just in case
            errorMessage.value = 'Connection succeeded but token missing'
            }
        } else {
            // No success flag → something went wrong
            errorMessage.value = 'Connection failed or was cancelled'
        }

        isProcessing.value = false
    })

    const goToNotes = () => {
        router.push(localePath('/dashboard'))
    }

    const retryConnection = () => {
        router.push(localePath('/dashboard'))
    }
</script>