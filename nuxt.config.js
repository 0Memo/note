import { fileURLToPath } from "url";
import { defineNuxtConfig } from "nuxt/config";

const isClient = process.env.NUXT_TARGET === "client";

const emptyPrisma = fileURLToPath(
  new URL("./utils/empty-prisma.js", import.meta.url)
);

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
  compatibilityDate: "2024-11-01",
  css: ["@/assets/styles/global.css"],
  modules: ["@vueuse/nuxt"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  alias: isClient
    ? {
        "@prisma/client": emptyPrisma,
        ".prisma/client": emptyPrisma,
      }
    : {},

  nitro: {
    externals: {
      inline: ["@prisma/client", ".prisma/client"],
      external: ["@prisma/client", ".prisma/client"],
    },
    includeFiles: ["prisma/**", "node_modules/.prisma/**"],
  },

  build: {
    publicPath: '/_nuxt/',
  },

  vite: {
    ssr: {
      noExternal: ["@prisma/client", ".prisma/client"],
    },
    optimizeDeps: {
      exclude: ["@prisma/client", ".prisma/client"],
    },
    define: {
      __PRISMA_CLIENT__: true,
    },
  },
});