// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  vite: {
    build: {
      sourcemap: true,
    },
  },
  runtimeConfig: {
    public: {
      transactionsApiUrl: process.env.PAGOS247_TRANSACTIONS_API_URL,
    },
  },
  devServer: {
    port: 3000,
  }
});
