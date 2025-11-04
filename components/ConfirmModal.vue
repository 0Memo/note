<template>
    <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-[#030303] p-6 rounded-lg shadow-lg w-96">
            <p class="text-lg font-semibold mb-4 text-zinc-100">{{ title }}</p>
            <p class="mb-6 text-zinc-100">{{ message }}</p>
            <div class="flex justify-center gap-3 text-zinc-50">
                
                <button @click="$emit('cancel')" class="pill-button no-pill-button mt-6 text-white w-50">
                    <div class="pill-wrap">
                        <p>
                            <span>✧</span>
                            <span>✦</span>
                            {{ $t('modal.no')}}
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
                    @click="$emit('confirm')"
                    class="px-4 py-2 border-2 border-transparent rounded bg-green-600
                    hover:bg-zinc-50 hover:text-green-600 hover:border-green-600"
                >
                    {{ $t('modal.yes')}}
                </button> -->
                <button @click="$emit('confirm')" class="pill-button yes-pill-button mt-6 text-white w-50">
                    <div class="pill-wrap">
                        <p>
                            <span>✧</span>
                            <span>✦</span>
                            {{ $t('modal.yes')}}
                        </p>
                    </div>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useI18n } from 'vue-i18n'
    const { t } = useI18n()

    defineProps({
        visible: Boolean,
        title: {
            type: String,
            default: "Confirmation"
        },
        message: {
            type: String,
            default: "Êtes-vous sûr de vouloir continuer ?"
        }
    })
    defineEmits(['confirm', 'cancel'])
</script>