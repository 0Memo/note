export default defineNuxtConfig({
  css: [
    "~/assets/main.css",
  ],
  head: {
    link: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Homemade+Apple&family=Kalam:wght@300;400;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap",
      },
    ],
  },
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