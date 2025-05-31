<template>
    <div
        class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        @click.self="$emit('close')"
    >
        <div class="bg-[#030303] rounded-lg shadow-lg max-w-3xl w-full p-6 overflow-auto max-h-[80vh] relative">
            <button
                class="absolute top-4 right-4 text-white hover:text-gray-700"
                @click="$emit('close')"
                aria-label="Close Terms of Service modal"
            >
                ✕
            </button>
            <h1 class="text-3xl font-bold mb-4">{{ $t('modal.terms.title')}}</h1>
            <p class="mb-4">
                {{ $t('modal.terms.use')}}
            </p>
        
            <p class="mb-4">
                {{ $t('modal.terms.features')}}
            </p>
        
            <p class="mb-4">
                {{ $t('modal.terms.app')}}
            </p>
        </div>
    </div>
</template>

<script setup>
    import { useI18n } from 'vue-i18n'
    const { t } = useI18n()
</script>