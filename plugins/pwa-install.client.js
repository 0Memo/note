import { ref } from "vue";

export const deferredPrompt = ref(null);
export const showInstall = ref(false);

export default defineNuxtPlugin(() => {
    if (import.meta.client) {
        window.addEventListener("beforeinstallprompt", (e) => {
            e.preventDefault();
            deferredPrompt.value = e;
            showInstall.value = true;
        });

        window.addEventListener("appinstalled", () => {
            console.log("PWA was installed");
            deferredPrompt.value = null;
            showInstall.value = false;
        });
    }
});