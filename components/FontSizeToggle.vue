<template>
    <div class="font-size-controls flex items-center gap-2 mb-4">
        <button
            @click="decreaseFontSize"
            :disabled="currentFontSize <= minFontSize"
            class="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-500 text-white p-2 rounded-full transition-colors duration-200"
            :title="$t('accessibility.decreaseFont')"
        >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 13H5v-2h14v2z"/>
            </svg>
        </button>
        
        <span class="text-white text-sm font-medium min-w-[60px] text-center">
            {{ Math.round((currentFontSize / baseFontSize) * 100) }}%
        </span>
        
        <button
            @click="increaseFontSize"
            :disabled="currentFontSize >= maxFontSize"
            class="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-500 text-white p-2 rounded-full transition-colors duration-200"
            :title="$t('accessibility.increaseFont')"
        >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
        </button>
        
        <button
            @click="resetFontSize"
            class="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-xs transition-colors duration-200"
            :title="$t('accessibility.resetFont')"
        >
            {{ $t('accessibility.reset') }}
        </button>
    </div>
</template>

<script setup>
    import { ref, onMounted, watch } from 'vue'

    const baseFontSize = 16
    const minFontSize = 12
    const maxFontSize = 24
    const currentFontSize = ref(baseFontSize)

    onMounted(() => {
        const savedSize = localStorage.getItem('userFontSize')
        if (savedSize) {
            currentFontSize.value = parseInt(savedSize)
            applyFontSize()
        }
    })

    watch(currentFontSize, (newSize) => {
        localStorage.setItem('userFontSize', newSize.toString())
        applyFontSize()
    })

    function increaseFontSize() {
        if (currentFontSize.value < maxFontSize) {
            currentFontSize.value += 2
        }
    }

    function decreaseFontSize() {
        if (currentFontSize.value > minFontSize) {
            currentFontSize.value -= 2
        }
    }

    function resetFontSize() {
        currentFontSize.value = baseFontSize
    }

    function applyFontSize() {
        document.documentElement.style.setProperty('--user-font-size', `${currentFontSize.value}px`)
        
        const elements = document.querySelectorAll('.scalable-text')
        elements.forEach(el => {
            el.style.fontSize = `${currentFontSize.value}px`
        })
        
        const noteElements = document.querySelectorAll('.note-content, .font-bodyTest')
        noteElements.forEach(el => {
            const scale = currentFontSize.value / baseFontSize
            el.style.fontSize = `${14 * scale}px`
        })
        
        const headings = document.querySelectorAll('.font-h1, h1, h2, h3')
        headings.forEach(el => {
            const scale = currentFontSize.value / baseFontSize
            const baseSize = parseFloat(getComputedStyle(el).fontSize) || 18
            el.style.fontSize = `${baseSize * scale}px`
        })
    }
</script>