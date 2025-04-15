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
    preset: "node-server",
    externals: {
      inline: [],
    },
    moduleSideEffects: ["@prisma/client"],
  },
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
    host: '0.0.0.0'
  },

  vite: {
    resolve: {
      alias: {
        ".prisma/client/index-browser":
          "./node_modules/.prisma/client/index-browser.js",
      },
    },
  },

  compatibilityDate: "2025-04-14",
});