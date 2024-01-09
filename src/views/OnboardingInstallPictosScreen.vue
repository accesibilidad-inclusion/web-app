<script setup lang="ts">
import {useRouter} from 'vue-router'

import OnboardingNav from '@/components/OnboardingNav.vue'
import InstalaPictos from '@/assets/img/illustrations/instala-pictos.svg?component'
import InstalaIphone1 from '@/assets/img/illustrations/instala-iphone1.svg?component'
import InstalaIphone2 from '@/assets/img/illustrations/instala-iphone2.svg?component'
import InstalaIphone3 from '@/assets/img/illustrations/instala-iphone3.svg?component'
import InstalaAndroid1 from '@/assets/img/illustrations/instala-android1.svg?component'
import InstalaAndroid2 from '@/assets/img/illustrations/instala-android2.svg?component'
import InstalaAndroid3 from '@/assets/img/illustrations/instala-android3.svg?component'
import {useAppNavStore} from '@/stores/app-nav.js'
import {useEventBus} from '@vueuse/core'
import DeviceSelector from '@/components/DeviceSelector.vue'
import {useAppSessionStore} from '@/stores/app-session'
import {computed} from 'vue'

const appSession = useAppSessionStore()
const appNav = useAppNavStore()
const router = useRouter()

const sequence = computed(() => [
  {
    title: 'Instala PICTOS en tu dispositivo',
    body: 'Te ayudamos a instalar un acceso directo a PICTOS en tu dispositivo',
    image: InstalaPictos
  },
  DeviceSelector,
  {
    title:
      appSession.user.device == 'Iphone' ? 'Instala PICTOS en Iphone' : 'Instala PICTOS en Android',
    body:
      appSession.user.device == 'Iphone'
        ? 'Cuando estés en PICTOS presiona el botón central del menú inferior'
        : 'Cuando estés en PICTOS presiona los tres puntos que se encuentran a la derecha en el menú superior',
    image: appSession.user.device == 'Iphone' ? InstalaIphone1 : InstalaAndroid1
  },
  {
    title: appSession.user.device == 'Iphone' ? 'Agregar a Inicio' : 'Instalar Aplicación',
    body:
      appSession.user.device == 'Iphone'
        ? 'Cuando se abra el menú inferior, presiona la opción Agregar a Inicio'
        : 'Cuando se abra el menú lateral, presiona la opción Instalar aplicación',
    image: appSession.user.device == 'Iphone' ? InstalaIphone2 : InstalaAndroid2
  },
  {
    title: appSession.user.device == 'Iphone' ? 'Agregar a Inicio' : 'Confirma la instalación',
    body:
      appSession.user.device == 'Iphone'
        ? 'Cuando se abra la opción Agregar a Inicio, presiona el botón “Agregar” en la esquina superior derecha'
        : 'Cuando se abra la opción Instalar aplicación, presiona el botón “Instalar”',
    image: appSession.user.device == 'Iphone' ? InstalaIphone3 : InstalaAndroid3
  }
])

const finishing = () => {
  appNav.onboarding.newTask = false
  router.push(appNav.redirectTo)
}

const bus = useEventBus('close')
const listener = () => {
  finishing()
}
bus.on(listener)
</script>

<template>
  <main class="page">
    <OnboardingNav :sequence="sequence" @finished="finishing()" />
  </main>
</template>

<style lang="scss" scoped>
.page {
  display: flex;
  align-items: stretch;
  grid-row: 2/-1;
}
</style>
