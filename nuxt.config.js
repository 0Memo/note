export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@vueuse/nuxt"],
  nitro: {
    externals: {
      external: ["@prisma/client", ".prisma/client"],
    },
    moduleSideEffects: ["@prisma/client"],
  },
});