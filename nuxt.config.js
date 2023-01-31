export default defineNuxtConfig({
    app: {
        pageTransition: { name: 'page', mode: 'out-in' }
    },
    css: [
        "primevue/resources/themes/saga-blue/theme.css",
        "primevue/resources/primevue.css",
        "primeicons/primeicons.css",
        "primeflex/primeflex.css",
        "assets/global.scss",


    ],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@use "@/assets/variables.scss" as *;`,
                },
            },
        },
    },
    modules: ["nuxt-graphql-client",

    ],

    runtimeConfig: {
        public: {
            GQL_HOST: "https://staging-api.tatmeen.sa/graphql", // overwritten by process.env.GQL_HOST
        },
    },
    build: {
        transpile: ["primevue"],
    },
    ssr: false,
});