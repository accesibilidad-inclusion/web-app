import {createApp} from 'vue'
import {createPinia} from 'pinia'
import {createI18n} from 'vue-i18n'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import * as Sentry from '@sentry/vue'

import App from './App.vue'
import router from './router'
import langEs from './l10n/es.json'
import langEn from './l10n/en.json'

const app = createApp(App)

const i18n = createI18n({
  locale: 'es',
  legacy: false,
  fallbackLocale: 'es',
  messages: {
    es: langEs,
    en: langEn,
  }
})

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.config.errorHandler = () => {
  router.push('/error')
}

Sentry.init({
  app,
  dsn: 'https://a1b0ebf4bf574f1809cb589f2683bda8@o236494.ingest.sentry.io/4506593433092096',
  integrations: [
    new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: [
        /^https:\/\/local.app.pictos\.cl\//,
        /^https:\/\/dev.app.pictos\.cl\//
      ]
    }),
    new Sentry.Replay({
      maskAllText: false,
      blockAllMedia: false
    })
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0 // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
})

app.use(pinia)
app.use(i18n)
app.use(router)

app.mount('#app')
