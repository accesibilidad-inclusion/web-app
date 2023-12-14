<script setup lang="ts">
import {useRouter} from 'vue-router'

import OnboardingNav from '@/components/OnboardingNav.vue'
import OnboardingImage1 from '@/assets/img/illustrations/nueva-tarea 1.svg?component'
import OnboardingImage2 from '@/assets/img/illustrations/nueva-tarea 2.svg?component'
import OnboardingImage3 from '@/assets/img/illustrations/nueva-tarea 3.svg?component'
import OnboardingImage4 from '@/assets/img/illustrations/nueva-tarea 4.svg?component'
import {useAppNavStore} from '@/stores/app-nav.js'
import type {Onboarding} from '@/types/onboarding'

const appNav = useAppNavStore()
const router = useRouter()

const sequence: Array<Onboarding> = [
  {
    title: 'Verás una lista de pasos. En esta lista tu puedes:',
    body: '<ul><li>Ordenar los pasos de forma correcta.</li><li>Agregar un nuevo paso.</li><li>Volver a escribir un paso de forma más clara y precisa</li></ul>',
    image: OnboardingImage1
  },
  {
    title: 'Ten en cuenta',
    body: '<ul><li>Una tarea no puede tener menos de 3 pasos, ni mas de 9 pasos.</li><li>Cuando ya los hayas escrito todos, presionas el botón “Listo”</li></ul>',
    image: OnboardingImage2
  },
  {
    title: 'Recuerda revisar',
    body: '<ul><li>Debes revisar que están bien, pensando en cómo los harías tú.</li><li>Si están bien, haz click en “Confirmar”</li></ul>',
    image: OnboardingImage3
  },
  {
    title: 'Avísame',
    body: '<ul><li>Si quieres que te avisen escribe tu correo electrónico</li><li>Luego haz click en “Enviar”</li></ul>',
    image: OnboardingImage4
  }
]

const finishing = () => {
  appNav.onboarding.newTask = false
  router.push(appNav.redirectTo)
}
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
  grid-row: 1/-1;
}
</style>
