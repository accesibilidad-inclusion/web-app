import {createApp} from 'vue'
import {createPinia} from 'pinia'
import {createI18n} from 'vue-i18n'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import * as Sentry from '@sentry/vue'

import App from './App.vue'
import router from './router'
import langSPA from './l10n/es.json'

const app = createApp(App)

const i18n = createI18n({
  locale: 'es',
  legacy: false,
  messages: {
    es: langSPA
  }
})

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

Sentry.init({
  dsn: 'https://a1b0ebf4bf574f1809cb589f2683bda8@o236494.ingest.sentry.io/4506593433092096',
  integrations: [
    new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/]
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
app.use(router)
app.use(i18n)

app.config.errorHandler = (err, instance, info) => {
  /* console.log(err)
  console.log(instance)
  console.log(info) */
  router.push('/error')
}

app.mount('#app')
