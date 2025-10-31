<template>
    <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-[#030303] p-6 rounded-lg shadow-lg w-96">
            <p class="text-lg font-semibold mb-4 text-zinc-100">{{ $t('modal.settings')}}</p>
            <div class="mb-6">
                <label class="block text-zinc-100 mb-2 text-sm">{{ $t('modal.nickname')}}</label>
                <input
                    v-model="localNickname"
                    type="text"
                    :placeholder="$t('modal.nicknameHere')"
                    class="w-full px-3 py-2 bg-zinc-800 text-zinc-100 rounded border-2 border-zinc-500 focus:border-zinc-500 focus:outline-none"
                    :style="{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }"
                />
            </div>

            <div class="mb-6">
                <label class="block text-zinc-100 mb-2 text-sm">{{ $t('modal.textIconColor') }}</label>
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
                        ? 'mt-2 text-xs text-zinc-100 border border-white bg-black p-1 rounded w-40'
                        : 'mt-2 text-xs text-black border border-black bg-white p-1 rounded w-40'"
                >
                    {{ localTextColor === 'white' ? $t('modal.whiteText') : $t('modal.blackText') }}
                </div>
            </div>

            <div class="mb-6">
                <label class="block text-zinc-100 mb-2 text-sm">{{ $t('modal.bgSecondaryColor') }}</label>
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
                    class="mt-2 text-xs text-zinc-50 hover:text-zinc-200 whitespace-nowrap custom-underline"
                >
                    {{ $t('modal.resetDefault') }}
                </button>
            </div>

            <p class="mb-6 text-zinc-100">{{ message }}</p>
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
    </div>
</template>

<script setup>
    import { ref, watch } from 'vue'
    import { useI18n } from 'vue-i18n'
    const { t } = useI18n()

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

    const handleSave = () => {
        emit('save', {
            nickname: localNickname.value,
            bgSecondary: localBgSecondary.value,
            textColor: localTextColor.value
        })
    }
</script>