<template>
    <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-[#030303] p-6 rounded-lg shadow-lg w-96">
            <p class="text-lg font-semibold mb-4 text-zinc-100">{{ $t('modal.settings')}}</p>
            <div class="mb-6">
                <label class="block text-zinc-300 mb-2 text-sm">{{ $t('modal.nickname')}}</label>
                <input
                    v-model="localNickname"
                    type="text"
                    :placeholder="$t('modal.nicknameHere')"
                    class="w-full px-3 py-2 bg-zinc-800 text-zinc-100 rounded border border-zinc-700 focus:border-zinc-500 focus:outline-none"
                />
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
        bgColor: {
            type: String,
            default: '#030303'
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
    const localBgColor = ref(props.bgColor)
    const localTextColor = ref(props.textColor)

    // Update local values when props change
    watch(() => props.visible, (newVal) => {
    if (newVal) {
        localNickname.value = props.nickname
        localBgColor.value = props.bgColor
        localTextColor.value = props.textColor
    }
    })

    const handleSave = () => {
    emit('save', {
        nickname: localNickname.value,
        bgColor: localBgColor.value,
        textColor: localTextColor.value
    })
    }
</script>