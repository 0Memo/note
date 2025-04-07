import "vue-toast-notification/dist/theme-sugar.css";
import VueToast from "vue-toast-notification";

export default defineNuxtPlugin((nuxtApp) => {
    // Register plugin with Vue app
    nuxtApp.vueApp.use(VueToast, {
        position: "top-left",
        duration: 6000,
    });

    // Inject the toast instance to Nuxt context
    // We grab it off of the global Vue instance
    nuxtApp.provide("toast", nuxtApp.vueApp.config.globalProperties.$toast);
});