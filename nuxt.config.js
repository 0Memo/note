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
    // Optional: Ensuring proper static deployment for Nuxt 3
    prerender: {
      // Add any routes you want to be prerendered here
      routes: ["/"],
    },
  },
  // Optionally, set server-side configurations or routes
  server: {
    // Ensure Nuxt is properly running on Vercel's serverless environment
    port: process.env.PORT || 3000,
  },

  // Optional: Build configurations for optimizations
  build: {
    // Example to optimize the build
    analyze: process.env.NODE_ENV === "production",
    transpile: ["@prisma/client"], // Ensure Prisma is transpiled on serverless environments
  },
});