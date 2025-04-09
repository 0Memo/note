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
  modules: ["@prisma/nuxt", "@vueuse/nuxt"],
  build: {
    // Ensure Prisma is not bundled for client-side
    transpile: ["@prisma/client"],
    // Exclude Prisma from the client bundle if not SSR
    extend(config, { isServer }) {
      if (!isServer) {
        config.externals = config.externals || {};
        config.externals["@prisma/client"] = "commonjs @prisma/client";
      }
    },
    vite: {
      optimizeDeps: {
        exclude: ["@prisma/client"], // Ensure Prisma is not bundled
      },
    },
  },
});