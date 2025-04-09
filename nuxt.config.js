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
    // You can also exclude Prisma from the client bundle
    extend(config, { isServer }) {
      if (!isServer) {
        // Exclude Prisma client from client-side bundle
        config.externals = config.externals || {};
        config.externals["@prisma/client"] = "commonjs @prisma/client";
      }
    },
    vite: {
      optimizeDeps: {
        exclude: ["@prisma/client"],
      },
    },
  },
});