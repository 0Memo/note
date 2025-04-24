export default defineNuxtPlugin((nuxtApp) => {
    const { $i18n } = nuxtApp;
    const route = useRoute();

    const savedLocale = localStorage.getItem("locale");
    const routeLocale = route.params.locale;

    if (routeLocale && $i18n.locale.value !== routeLocale) {
        $i18n.locale.value = routeLocale;
        localStorage.setItem("locale", routeLocale);
    } else if (savedLocale && $i18n.locale.value !== savedLocale) {
        $i18n.locale.value = savedLocale;
    }
});