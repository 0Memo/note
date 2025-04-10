export default defineNuxtConfig({
  css: ["~/assets/main.css"],
  modules: ["@vueuse/nuxt"],
  nitro: {
    externals: {
      external: ["@prisma/client", ".prisma/client"],
    },
  },
  build: {
    transpile: ["@prisma/client"],
  },
});