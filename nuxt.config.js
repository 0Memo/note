export default defineNuxtConfig({
  app: {
    head: {
      title: "Memo's Notes",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "Best app ever built with Nuxt 3",
        },
      ],
    },
  },

  css: ["@/assets/styles/global.css"],

  modules: ["@vueuse/nuxt"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  nitro: {
    preset: "vercel",
  },

  compatibilityDate: "2025-04-14",
});