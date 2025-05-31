<template>
    <div
        class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        @click.self="$emit('close')"
    >
        <div class="relative bg-[#030303] rounded-lg shadow-lg max-w-3xl w-full p-6 overflow-auto max-h-[80vh]">
            <button
                class="absolute top-4 right-4 text-white hover:text-gray-700"
                @click="$emit('close')"
                aria-label="Close Privacy Policy modal"
            >
                ✕
            </button>
        
            <h1 class="text-3xl font-bold mb-4">{{ $t('modal.privacy.title')}}</h1>
            <p class="mb-4">
                {{ $t('modal.privacy.explanation')}}
            </p>
        
            <h2 class="text-2xl font-semibold mt-4">{{ $t('modal.privacy.collect')}}</h2>
            <p class="mb-4">
                {{ $t('modal.privacy.choice')}}
                <code>https://www.googleapis.com/auth/calendar.events</code>
            </p>
        
            <h2 class="text-2xl font-semibold mt-4">{{ $t('modal.privacy.data')}}</h2>
            <p class="mb-4">
                {{ $t('modal.privacy.permission')}}
            </p>
        
            <h2 class="text-2xl font-semibold mt-4">{{ $t('modal.privacy.storage')}}</h2>
            <p class="mb-4">
                {{ $t('modal.privacy.token')}}
            </p>
        
            <h2 class="text-2xl font-semibold mt-4">{{ $t('modal.privacy.compliance')}}</h2>
            <p class="mb-4">
                {{ $t('modal.privacy.requirements')}}
            </p>
        
            <h2 class="text-2xl font-semibold mt-4">{{ $t('modal.privacy.contact')}}</h2>
            <p class="mb-4">
                {{ $t('modal.privacy.questions')}}
            </p>
        </div>
    </div>
</template>

<script setup>
    import { useI18n } from 'vue-i18n'
    const { t } = useI18n()
</script>