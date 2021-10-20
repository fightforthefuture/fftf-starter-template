import config from './config'

module.exports = {
  target: 'static',

  /*
  ** Headers of the page
  */
  head: {
    title: '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Open+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' }, // TODO: choose theme color

  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/main.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/analytics.js', ssr: false },
    { src: '~/plugins/components.js', ssr: true },
    { src: '~/plugins/hash-link-fix.js', ssr: false },
    { src: '~/plugins/scroll-to.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    'bootstrap-vue/nuxt',
    ['nuxt-i18n', {
      seo: true,
      locales: [
        {
          code: 'en',
          iso: 'en-US'
        }
      ],
      parsePages: false,
      defaultLocale: 'en',
      vueI18n: {
        fallbackLocale: 'en'
      },
      vueI18nLoader: true
    }]
  ],

  bootstrapVue: {
    css: false,
    bvCSS: false,
    components: [
      'BModal',
      'BCarousel',
      'BCarouselSlide',
      'BCollapse'
     ],
    directives: [
      'VBToggle'
    ]
  },

  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  styleResources: {
    scss: [
      '~assets/css/_header.scss'
    ]
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Parse yaml in i18n blocks
      config.module.rules.push({
        resourceQuery: /blockType=i18n/,
        type: "javascript/auto",
        loader: ["@intlify/vue-i18n-loader", "yaml-loader"]
      })
    }
  },
  vendor: [
    'babel-polyfill'
  ],
  babel: {
    presets: [
      ['vue-app', {
        useBuiltIns: true,
        targets: { ie: 11, uglify: true }
      }]
    ]
  },

  /*
  ** Generate Routes
  */
  generate: {
    fallback: "error.html"
  }
}
