import {createApp} from 'vue'
import {createPinia} from 'pinia'
import {createI18n} from 'vue-i18n'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

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

app.use(pinia)
app.use(router)
app.use(i18n)

app.mount('#app')
