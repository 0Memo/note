export default defineNuxtPlugin(async (nuxtApp) => {
    if (typeof window === "undefined") return;

    try {
        const { Capacitor } = await import("@capacitor/core");
        if (!Capacitor.isNativePlatform()) return;

        const { WebView } = await import("@capacitor/browser");
        WebView.clearCache();
    } catch (e) {
        console.warn("Capacitor WebView clearCache skipped:", e);
    }
});