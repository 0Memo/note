export default defineNuxtPlugin(async () => {
    // ✅ Only run in browser (not during SSR)
    if (typeof window === "undefined") return;

    try {
        // ✅ Dynamically import Capacitor core
        const { Capacitor } = await import("@capacitor/core");

        // ✅ Only run if inside a native Android/iOS app
        if (!Capacitor.isNativePlatform()) return;

        // ✅ Safe dynamic import of Browser plugin
        const browserModule = await import("@capacitor/browser");
        const WebView = browserModule?.WebView;

        // ✅ Call only if function exists
        if (WebView?.clearCache) {
            await WebView.clearCache();
            console.log("✅ Capacitor WebView cache cleared");
        } else {
            console.warn("ℹ️ WebView.clearCache not available on this platform.");
        }
    } catch (e) {
        // ⚠️ Gracefully ignore on web
        console.warn("Capacitor WebView clearCache skipped:", e);
    }
});