export default defineNuxtPlugin((nuxtApp) => {
    const { $i18n } = nuxtApp;
    const route = useRoute();

    const localeCookie = useCookie("locale", {
        default: () => "en",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
        secure: true,
    });

    const routeLocale = route.params.locale;

    if (routeLocale && $i18n.locale.value !== routeLocale) {
        $i18n.locale.value = routeLocale;
        localeCookie.value = routeLocale;
    } else if (localeCookie.value && $i18n.locale.value !== localeCookie.value) {
        $i18n.locale.value = savedLocale;
    }
});