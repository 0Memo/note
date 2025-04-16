<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
  // You can directly import global CSS here as well if needed
  import '~/assets/styles/global.css';
  useHead({
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  })
</script>
