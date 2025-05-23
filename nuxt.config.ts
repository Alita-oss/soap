// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxt/eslint', '@nuxt/test-utils'],

    css: ['@/assets/styles/main.scss'],

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
                        @use "@/assets/styles/functions.scss";
                        @use "@/assets/styles/typography.scss";
                    `,
                },
            },
        },
    },

    runtimeConfig: {
        MONGODB_URI: '',
    },

    compatibilityDate: '2025-05-15',
});
