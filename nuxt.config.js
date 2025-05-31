import { resolve } from "path";
import { defineNuxtConfig } from "nuxt/config";

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

  modules: ["@vueuse/nuxt", "@nuxtjs/i18n"],

  i18n: {
    strategy: "prefix",
    defaultLocale: "en",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
    locales: [
      { code: "es", language: "es-ES", name: "Español" },
      { code: "fr", language: "fr-FR", name: "Français" },
      { code: "pt", language: "pt-BR", name: "Português" },
      { code: "en", language: "en-US", name: "English" },
      { code: "it", language: "it-IT", name: "Italiano" },
      { code: "sv", language: "sv-SE", name: "Svenska" },
      { code: "ro", language: "ro-RO", name: "Română" },
    ],
    lazy: false,
    vueI18n: resolve("i18n/config.js"),
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  nitro: {
    preset: "vercel",
  },

  plugins: ["~/plugins/init-locale.client.js"],

  compatibilityDate: "2025-04-14",

  runtimeConfig: {
    googleClientSecret: process.env.NUXT_GOOGLE_CLIENT_SECRET || "",
    public: {
      googleClientId: process.env.NUXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      baseURL: process.env.NUXT_PUBLIC_BASE_URL || "",
    },
  },
});