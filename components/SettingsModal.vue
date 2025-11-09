<template>
    <Teleport to="body">
        <div v-if="visible" class="fixed inset-0 z-[100] flex items-start md:items-center overflow-y-auto justify-center bg-black md:bg-opacity-50 p-4">
            <div class="bg-[#030303] p-6 rounded-lg shadow-lg w-full max-w-md md:max-w-lg max-h-[calc(100vh-2rem)] md:max-h-[calc(100vh-4rem)] relative">
                <button
                    @click="$emit('cancel')"
                    class="md:hidden absolute -top-1 right-6 text-zinc-200 hover:text-white text-lg font-bold"
                    aria-label="Close modal"
                >
                    <Close class="w-4 h-4" />
                </button>
        
                <p class="text-lg font-bold mb-6 -mt-6 md:mt-0 text-zinc-100">{{ $t('modal.settings')}}</p>
                <div class="mb-6 flex items-center gap-6">
                    <label class="block text-zinc-100 text-md font-semibold">{{ $t('modal.nickname')}}</label>
                    <input
                        v-model="localNickname"
                        type="text"
                        :placeholder="$t('modal.nicknameHere')"
                        class="w-full px-3 py-2 bg-zinc-800 text-zinc-100 rounded border-2 border-zinc-500 focus:border-zinc-500 focus:outline-none"
                        :style="{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }"
                    />
                </div>
        
                <div class="mb-6">
                    <label class="block text-zinc-100 mb-2 text-md font-semibold">{{ $t('modal.bgSecondaryColor') }}</label>
                    <div class="flex items-center gap-3">
                        <input
                            v-model="localBgSecondary"
                            type="color"
                            class="w-16 h-10 rounded cursor-pointer border border-zinc-700"
                        />
                        <input
                            v-model="localBgSecondary"
                            type="text"
                            class="flex-1 px-3 py-2 bg-zinc-800 text-zinc-100 rounded border-2 border-zinc-500 focus:border-zinc-500 focus:outline-none text-sm"
                            placeholder="#1d073a"
                            :style="{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }"
                        />
                    </div>
                    <button
                        @click="resetBgSecondary"
                        class="mt-2 text-xs text-zinc-100 hover:text-zinc-200 whitespace-nowrap custom-underline tracking-wide"
                    >
                        {{ $t('modal.resetDefault') }}
                    </button>
                </div>
        
                <div class="gap-3 py-6 border-b-4 md:border-none border-dashed border-zinc-700">
                    <p class="text-zinc-100 -my-3">{{ message }}</p>
                    <div class="flex justify-center gap-3 text-zinc-50 mb-2 text-md md:text-xl">
                        <button @click="$emit('cancel')" class="pill-button no-pill-button mt-6 text-white w-50">
                            <div class="pill-wrap">
                                <p>
                                    <span>✧</span>
                                    <span>✦</span>
                                    {{ $t('modal.no')}}
                                </p>
                            </div>
                        </button>
                        <button @click="handleSave" class="pill-button yes-pill-button mt-6 text-white w-50">
                            <div class="pill-wrap">
                                <p>
                                    <span>✧</span>
                                    <span>✦</span>
                                    {{ $t('modal.yes')}}
                                </p>
                            </div>
                        </button>
                        <!-- <button
                            @click="$emit('cancel')"
                            class="px-4 py-2 border-2 border-transparent rounded bg-red-600
                            hover:bg-zinc-50 hover:text-red-600 hover:border-red-600"
                        >
                            {{ $t('modal.no')}}
                        </button>
                        <button
                            @click="handleSave"
                            class="px-4 py-2 border-2 border-transparent rounded bg-green-600
                            hover:bg-zinc-50 hover:text-green-600 hover:border-green-600"
                        >
                            {{ $t('modal.yes')}}
                        </button> -->
                        
                    </div>
                </div>
        
                <div class="block md:hidden">
                    <div class="w-full mt-3 md:mt-6 mb-4">
                        <p class="text-lg font-bold text-zinc-100 mb-2">Click & Action</p>
                        <!-- <button
                            @click="connectGoogleCalendar"
                            :disabled="isConnectingCalendar"
                            class="flex items-center justify-center w-full gap-2 px-4 py-2 font-bold text-white transition-colors duration-200 bg-blue-600 rounded hover:bg-blue-700 disabled:bg-gray-500"
                            :aria-label="$t('toast.calendar.connectCalendar')"
                        >
                            <Calendar v-if="!isConnectingCalendar" class="w-5 h-5" />
                            <div v-else class="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
                            {{ isConnectingCalendar ? t('toast.calendar.connecting') : (calendarConnected ? t('toast.calendar.calendarConnected') : t('toast.calendar.connectCalendar')) }}
                        </button> -->
                        <button
                            @click="connectGoogleCalendar"
                            :disabled="isConnectingCalendar"
                            :class="[
                                calendarConnected ? 'pill-button connected-pill-button mt-0 text-white w-ful' : 'pill-button calendar-pill-button mt-0 text-white w-ful'
                            ]"
                            :aria-label="$t('toast.calendar.connectCalendar')"

                        >
                            <div class="pill-wrap">
                                <p>
                                    <Calendar v-if="!isConnectingCalendar" class="w-5 h-5" />
                                    <div v-else class="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
                                    {{ isConnectingCalendar ? t('toast.calendar.connecting') : (calendarConnected ? t('toast.calendar.calendarConnected') : t('toast.calendar.connectCalendar')) }}
                                </p>
                            </div>
                        </button>
                    </div>
                    
                    <!-- Added reconnect button from dashboard
                    <button
                        v-if="!calendarConnected && savedToken"
                        @click="reconnectGoogleCalendar"
                        class="px-3 py-1 ml-2 text-sm text-white bg-orange-600 rounded hover:bg-orange-700"
                        :aria-label="$t('toast.calendar.reconnect')"
                    >
                        {{ $t('toast.calendar.reconnect') }}
                    </button> -->
                    <button
                        v-if="!calendarConnected && savedToken"
                        @click="reconnectGoogleCalendar"
                        class="pill-button reconnect-pill-button mt-6 text-white w-full mb-4"
                        :aria-label="$t('toast.calendar.reconnect')"

                    >
                        <div class="pill-wrap">
                            <p>
                                <span>✧</span>
                                <span>✦</span>
                                {{ $t('toast.calendar.reconnect') }}
                            </p>
                        </div>
                    </button>
                    
                    <div class="px-4 py-6 md:mt-4 rounded-lg bg-secondary mb-4">
                        <h3 class="mb-3 font-semibold text-white scalable-text">
                            {{ $t('accessibility.accessibility') }}
                        </h3>
                        <FontSizeToggle />
                        
                        <!-- High Contrast Toggle -->
                        <div class="flex items-center justify-between md:my-4">
                            <label class="text-sm text-white scalable-text">
                                {{ $t('accessibility.highContrast') }}
                            </label>
                            <button
                                @click="toggleHighContrast"
                                :class="['transition-transform duration-300 focus:outline-none']"
                                :aria-label="$t('accessibility.highContrast')"
                            >
                                <ToggleRight v-if="highContrast" class="w-14 h-14 text-white transition-transform duration-300" />
                                <ToggleLeft v-else class="w-14 h-14 text-white transition-transform duration-300" />
                            </button>
                        </div>
                    </div>
                </div>
        
                <div class="flex justify-around w-full text-md text-white">
                    <nuxt-link :to="localePath('/privacy')" class="whitespace-nowrap custom-underline">
                        {{ $t('modal.privacy.title') }}
                    </nuxt-link>
                    <nuxt-link :to="localePath('/terms')" class="whitespace-nowrap custom-underline">
                        {{ $t('modal.terms.title') }}
                    </nuxt-link>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
    import { ref, watch, onMounted } from 'vue'
    import { useI18n } from 'vue-i18n'
    import { useLocalePath } from '#i18n'
    import { useRouter } from 'vue-router'
    import { useCookie, useRuntimeConfig } from '#app'
    import { useToast } from 'vue-toast-notification'
    import ToggleRight from './ToggleRight.vue'
    import ToggleLeft from './ToggleLeft.vue'
    import Calendar from './Calendar.vue'
    import Validate from './Validate.vue'
    import Close from './Close.vue'
    import FontSizeToggle from './FontSizeToggle.vue'

    const { t } = useI18n()
    const localePath = useLocalePath()
    const router = useRouter()
    const config = useRuntimeConfig()
    const $toast = useToast()

    const props = defineProps({
        visible: Boolean,
        nickname: {
            type: String,
            default: ''
        },
        bgSecondary: {
            type: String,
            default: '#1d073a'
        },
        title: {
            type: String,
            default: "Confirmation"
        },
        message: {
            type: String,
            default: "Êtes-vous sûr de vouloir continuer ?"
        }
    })
    const emit = defineEmits(['save', 'cancel'])

    const localNickname = ref(props.nickname)
    const localBgSecondary = ref(props.bgSecondary)

    const calendarConnected = ref(false)
    const isConnectingCalendar = ref(false)
    const savedToken = ref(null)

    const highContrast = ref(false)

    // Update local values when props change
    watch(() => props.visible, (newVal) => {
        if (newVal) {
            localNickname.value = props.nickname
            localBgSecondary.value = props.bgSecondary
        }
    })

    const resetBgSecondary = () => {
        localBgSecondary.value = '#1d073a'
    }

    onMounted(async () => {
        savedToken.value = localStorage.getItem('googleCalendarToken')
        if (savedToken.value) {
            try {
                await checkCalendarConnection()
            } catch (err) {
                console.warn('Could not verify calendar token:', err)
            }
        }
    })

    const checkCalendarConnection = async () => {
        const token = localStorage.getItem('googleCalendarToken')
        if (!token) {
            calendarConnected.value = false
            return
        }

        try {
            await $fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=1', {
            headers: {
                Authorization: `Bearer ${token}`
            }
            })
            calendarConnected.value = true
        } catch (error) {
            console.warn('❌ Google Calendar token expired or invalid:', error?.response?._data || error.message)
            calendarConnected.value = false
        }
    }

    if (calendarConnected.value) {
        savedToken.value = null
    }

    const reconnectGoogleCalendar = () => {
        localStorage.removeItem('googleCalendarToken')
        calendarConnected.value = false

        connectGoogleCalendar()
    }

    const isAccessTokenValid = async () => {
        try {
            const response = await $fetch('/api/auth/check-calendar-status');
            return response.status === 'connected';
        } catch (error) {
            console.error('Error checking token status:', error);
            return false;
        }
    };

    const connectGoogleCalendar = () => {
        isConnectingCalendar.value = true
        
        const clientId = config.public.googleClientId
        const redirectUri = encodeURIComponent(`${config.public.baseURL}/auth/callback`)
        const scope = encodeURIComponent('https://www.googleapis.com/auth/calendar.events')
        
        const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent&include_granted_scopes=true`
        
        $toast.info(t('toast.calendar.warning'), {
            duration: 8000
        })
        
        setTimeout(() => {
            window.location.href = url
        }, 2000)
    }

    const handleOAuthCallback = async (code) => {
        try {
            isConnectingCalendar.value = true
            
            // Exchange code for access token
            const response = await $fetch('/api/auth/google-calendar', {
                method: 'POST',
                body: { code }
            })
            
            if (response.access_token) {
                accessToken.value = response.access_token
                localStorage.setItem('googleCalendarToken', response.access_token)

                if (!response.refresh_token) {
                    calendarConnected.value = false;
                    $toast.error(t('toast.calendar.refreshToken'));
                    return;
                }

                calendarConnected.value = true                
                $toast.success(t('toast.calendar.success'))                
                // Clean up URL
                window.history.replaceState({}, document.title, window.location.pathname)
            }
        } catch (error) {
            console.error('Error handling OAuth callback:', error)
            $toast.error(t('toast.calendar.connectionFailed'))
        } finally {
            isConnectingCalendar.value = false
        }
    }

    const toggleHighContrast = () => {
        highContrast.value = !highContrast.value
        if (highContrast.value) {
            document.documentElement.classList.add('high-contrast')
        } else {
            document.documentElement.classList.remove('high-contrast')
        }
        const highContrastCookie = useCookie('highContrast', { maxAge: 60 * 60 * 24 * 365 })
        highContrastCookie.value = highContrast.value
    }

    const handleSave = () => {
        emit('save', {
            nickname: localNickname.value,
            bgSecondary: localBgSecondary.value
        })
    }
</script>