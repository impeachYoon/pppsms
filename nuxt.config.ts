// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false,

  app: {
    head: {
      charset: 'utf-8',
      meta: [
        {
          name: "title",
          content: "국민의힘 단체문자 매크로"
        },
        {
          name: "og:title",
          content: "국민의힘 단체문자 매크로"
        },
        {
          name: "description",
          content: "국민의힘 의원들에게 우리 같이 윤석열을 탄핵시킬 용기를 불어넣어줘요."
        },
        {
          name: "og:description",
          content: "국민의힘 의원들에게 우리 같이 윤석열을 탄핵시킬 용기를 불어넣어줘요."
        }
      ]
    }
  },

  modules: ["@nuxt/ui"],

  colorMode: {
    preference: "dark"
  },
  ui: {
    primary: "neutral",
    gray: "neutral"
  }
})
