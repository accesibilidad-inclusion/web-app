<script setup lang="ts">
import {useRouter} from 'vue-router'

import OnboardingNav from '@/components/OnboardingNav.vue'
import OnboardingImage1 from '@/assets/img/illustrations/sugerir-lugar 1.svg?component'
import OnboardingImage2 from '@/assets/img/illustrations/sugerir-lugar 2.svg?component'
import {useAppNavStore} from '@/stores/app-nav.js'
import type {Onboarding} from '@/types/onboarding'
import {useEventBus} from '@vueuse/core'

const appNav = useAppNavStore()
const router = useRouter()

const sequence: Array<Onboarding> = [
  {
    title: 'Escribe el nombre del lugar',
    body: 'PICTOS  te mostrará los lugares similares a lo que buscaste',
    image: OnboardingImage1
  },
  {
    title: 'Guarda el lugar',
    body: 'Para guardar el lugar que elegiste, presiona “Listo”',
    image: OnboardingImage2
  }
]

const finishing = () => {
  appNav.onboarding.suggestVenue = false
  router.push(appNav.redirectTo)
  appNav.redirectTo = '/inicio'
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
