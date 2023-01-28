export default defineNuxtConfig({
  css: [
    "primevue/resources/themes/saga-blue/theme.css",
    "primevue/resources/primevue.css",
    "primeicons/primeicons.css",
    "primeflex/primeflex.css",
  ],
  modules: ["nuxt-graphql-client"],
  runtimeConfig: {
    public: {
      GQL_HOST: "https://board.humm.world/graphql", // overwritten by process.env.GQL_HOST
    },
  },
  build: {
    transpile: ["primevue"],
  },
  ssr: false,
});
