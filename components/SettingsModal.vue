<template>
    <div v-if="visible" class="fixed inset-0 z-[100] flex items-start md:items-center overflow-y-auto justify-center bg-black md:bg-opacity-50 p-4">
        <div class="settings-modal bg-[#030303] p-6 rounded-lg shadow-lg w-full max-w-md md:max-w-lg max-h-[calc(100vh-2rem)] md:max-h-[calc(100vh-4rem)] relative overflow-y-auto">
            <button
                @click="$emit('cancel')"
                class="absolute top-3 right-6 text-zinc-200 hover:text-white text-lg font-bold"
                aria-label="Close modal"
            >
                <Close class="w-5 h-5" />
            </button>

            <p class="text-lg font-bold mb-4 text-zinc-100">{{ $t('modal.settings')}}</p>
            <div class="mb-6">
                <label class="block text-zinc-100 mb-2 text-md font-semibold">{{ $t('modal.nickname')}}</label>
                <input
                    v-model="localNickname"
                    type="text"
                    :placeholder="$t('modal.nicknameHere')"
                    class="w-full px-3 py-2 bg-zinc-800 text-zinc-100 rounded border-2 border-zinc-500 focus:border-zinc-500 focus:outline-none"
                    :style="{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }"
                />
            </div>

            <div class="mb-6">
                <label class="block text-zinc-100 mb-2 text-md font-semibold">{{ $t('modal.textIconColor') }}</label>
                <div class="flex items-center justify-between">
                    <span class="text-sm text-zinc-100">{{ $t('modal.colorMode') }}</span>
                    <button
                        @click="toggleTextColor"
                        :class="['transition-transform duration-300 focus:outline-none']"
                        :aria-label="$t('modal.textIconColor')"
                    >
                        <ToggleRight 
                            v-if="localTextColor === 'white'" 
                            class="w-14 h-14 text-white transition-transform duration-300"
                        />
                        <ToggleLeft 
                            v-else 
                            class="w-14 h-14 text-white transition-transform duration-300"
                        />
                    </button>
                </div>
                <div
                    :class="localTextColor === 'white'
                        ? 'mt-2 text-xs text-zinc-100 border border-x-white border-y-black bg-black p-1 rounded w-40'
                        : 'mt-2 text-xs text-black border border-black bg-white p-1 rounded w-40'"
                >
                    {{ localTextColor === 'white' ? $t('modal.whiteText') : $t('modal.blackText') }}
                </div>
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

            <div class="flex justify-between gap-3 px-6 py-4 border-b-4 border-zinc-700">
                <p class="text-zinc-100">{{ message }}</p>
                <div class="flex justify-end gap-3 text-zinc-50">
                    <button
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
                    </button>
                </div>
            </div>

            <div class="w-full mt-10 mb-6">
                <p class="text-lg font-bold mb-4 text-zinc-100">Click & Action</p>
                <button
                    @click="connectGoogleCalendar"
                    :disabled="isConnectingCalendar"
                    class="flex items-center justify-center w-full gap-2 px-4 py-2 font-bold text-white transition-colors duration-200 bg-blue-600 rounded hover:bg-blue-700 disabled:bg-gray-500"
                    :aria-label="$t('toast.calendar.connectCalendar')"
                >
                    <Calendar v-if="!isConnectingCalendar" class="w-5 h-5" />
                    <div v-else class="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
                    {{ isConnectingCalendar ? t('toast.calendar.connecting') : (calendarConnected ? t('toast.calendar.calendarConnected') : t('toast.calendar.connectCalendar')) }}
                </button>
                <div v-if="calendarConnected" class="flex items-center gap-1 mt-2 text-sm text-green-400">
                    <Validate class="w-4 h-4" />
                    {{ $t('toast.calendar.calendarConnected') }}
                    <Calendar v-if="!isConnectingCalendar" class="w-4 h-4" />
                </div>
            </div>

            <!-- Added reconnect button from dashboard -->
            <button
                v-if="!calendarConnected && savedToken"
                @click="reconnectGoogleCalendar"
                class="px-3 py-1 ml-2 text-sm text-white bg-orange-600 rounded hover:bg-orange-700"
                :aria-label="$t('toast.calendar.reconnect')"
            >
                {{ $t('toast.calendar.reconnect') }}
            </button>

            <div class="p-4 mt-6 rounded-lg bg-secondary mb-6">
                <h3 class="mb-3 font-semibold text-white scalable-text">
                    {{ $t('accessibility.accessibility') }}
                </h3>
                <FontSizeToggle />
                
                <!-- High Contrast Toggle -->
                <div class="flex items-center justify-between mb-3">
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

            <div class="flex justify-around w-full py-2 text-md mb-6">
                <nuxt-link :to="localePath('/privacy')" class="whitespace-nowrap custom-underline">
                    {{ $t('modal.privacy.title') }}
                </nuxt-link>
                <nuxt-link :to="localePath('/terms')" class="whitespace-nowrap custom-underline">
                    {{ $t('modal.terms.title') }}
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, watch } from 'vue'
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
        textColor: {
            type: String,
            default: 'white'
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
    const localTextColor = ref(props.textColor)

    const calendarConnected = ref(false)
    const isConnectingCalendar = ref(false)
    const savedToken = ref(null)

    const highContrast = ref(false)

    // Update local values when props change
    watch(() => props.visible, (newVal) => {
        if (newVal) {
            localNickname.value = props.nickname
            localBgSecondary.value = props.bgSecondary
            localTextColor.value = props.textColor
        }
    })

    const toggleTextColor = () => {
        localTextColor.value = localTextColor.value === 'white' ? 'black' : 'white'
    }

    const resetBgSecondary = () => {
        localBgSecondary.value = '#1d073a'
    }

    const connectGoogleCalendar = async () => {
        isConnectingCalendar.value = true
        try {
            const response = await fetch(`${config.public.apiBaseUrl}/api/auth/google`, {
            credentials: 'include',
            })
            const data = await response.json()
            if (data.url) {
            window.location.href = data.url
            }
        } catch (error) {
            console.error('Error connecting to Google Calendar:', error)
            $toast.error(t('toast.calendar.errorConnecting'))
        } finally {
            isConnectingCalendar.value = false
        }
    }

    const reconnectGoogleCalendar = async () => {
        isConnectingCalendar.value = true
        try {
            const response = await fetch(`${config.public.apiBaseUrl}/api/auth/google/reconnect`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: savedToken.value }),
            })
            const data = await response.json()
            if (data.success) {
            calendarConnected.value = true
            $toast.success(t('toast.calendar.reconnected'))
            }
        } catch (error) {
            console.error('Error reconnecting to Google Calendar:', error)
            $toast.error(t('toast.calendar.errorReconnecting'))
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
            bgSecondary: localBgSecondary.value,
            textColor: localTextColor.value
        })
    }
</script>