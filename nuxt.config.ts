// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', 'nuxt-auth-utils', 'nuxt-api-shield'],

  nuxtApiShield: {
    limit: {
      max: 5,        // maximum requests per duration time, default is 12/duration
      duration: 108,   // duration time in seconds, default is 108 seconds
      ban: 300,      // 5 minutes ban time in seconds, default is 3600 seconds = 1 hour
    },
    delayOnBan: true , // delay every response with +1sec when the user is banned, default is true
    errorMessage: "Too Many Requests. Try again later",  // error message when the user is banned, default is "Too Many Requests"
    retryAfterHeader: true, // when the user is banned add the Retry-After header to the response, default is false
    log: {
      path: "logs", // path to the log file, every day a new log file will be created, use "" to disable logging
      attempts: 10,    // if an IP reach 100 requests, all the requests will be logged, can be used for further analysis or blocking for example with fail2ban, use 0 to disable logging
    },
     routes: ["/routes/login",]
  },

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },

  runtimeConfig: {
    mongoUri: process.env.MONGODB_URI, // only available server-side
  },

  nitro: {
    externals: {
      // 👇 tell nitro not to try and bundle this
      external: ['ua-parser-js'],
    },
  },
})