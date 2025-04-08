<template>
    <div class="h-screen bg-[#1c044f]">
        <h1 class="text-3xl text-gray-200 font-bold font-h1 p-8">Index</h1>
    </div>
</template>

<script setup>
    definePageMeta({
        middleware: ['auth'],
    })
</script>