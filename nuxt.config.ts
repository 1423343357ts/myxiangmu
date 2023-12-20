// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@element-plus/nuxt','@nuxtjs/i18n'],
  i18n: {
    vueI18n: './i18n.config.ts'
  }, 
  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no',
    }
  },

  nitro: {
    // 该配置用于服务端请求转发
    routeRules: {
      '/server/**': {
        proxy: 'https://jk.crdata.net/**'
      }
    }
  },
  // 配置通用BaseUrl
  runtimeConfig: {
    public: {
      baseUrl: '/server/'
    }
  },
  // plugins: [
  //   '@/utils/utils',
  // ],
  css: [
    '@/assets/css/main.css',
    'element-plus/dist/index.css',
    'element-plus/theme-chalk/display.css'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "assets/css/theme.scss";',
        }
      }
    }
  }

})
