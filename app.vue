<template>
  <div>
    <!-- 🐿️ Spinner stays visible while loading -->
    <Transition name="preloader">
      <div v-if="globalLoading" class="preloader">
        <SquirrelSpinner />
      </div>
    </Transition>

    <!-- Main app content -->
    <NuxtPage v-show="!globalLoading" />
  </div>
</template>

<script setup>
  import { ref, onMounted, nextTick } from 'vue'
  import SquirrelSpinner from '@/components/SquirrelSpinner.vue'
  import '~/assets/styles/global.css';

  useHead({
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  })

  const globalLoading = useState('globalLoading', () => true)

  onMounted(async () => {
    await nextTick()
    // Optional fallback timeout
    setTimeout(() => {
      if (globalLoading.value) globalLoading.value = false
    }, 4000)
  })

</script>
