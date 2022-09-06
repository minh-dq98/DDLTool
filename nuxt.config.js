import dotenv from 'dotenv'

dotenv.config()

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,
  telemetry: true,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s',
    title: '',
    meta: [{ charset: 'utf-8' }],
    // link: [{ rel: 'icon', type: 'image/x-icon', href: '180x180.png' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@fontsource/m-plus-1p',
    '@fortawesome/fontawesome-free/css/all.css',
    '~/assets/css/style.css',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/moment-timezone.js',
    '~/plugins/axios.js',
    '~/plugins/modal.js',
    '~/plugins/mixins-global.js',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: [
    // '~/components/student/layouts/',
    '~/components/globals/',
  ],

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    'nuxt-moment',
    ['@nuxtjs/toast'],
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.BASE_API_URL,
    timeout: 60000,
  },

  toast: {
    position: 'bottom-right',
    fullWidth: false,
    duration: 3500,
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: ['vee-validate/dist/rules'],
    extend(config, { isDev, isClient }) {
      config.resolve.alias.vue = 'vue/dist/vue.common'
    },
  },

  // listen port
  server: {
    port: process.env.SERVER_LISTEN_PORT | 3000, // default: 3000
  },

  target: 'static',
}
