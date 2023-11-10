<script setup lang="ts">
import OnboardingNav from '@/components/OnboardingNav.vue'
import OnboardingImage1 from '@/assets/img/illustrations/activar-tutoriales 1.svg?component'
import OnboardingImage2 from '@/assets/img/illustrations/activar-tutoriales 2.svg?component'
import OnboardingImage3 from '@/assets/img/illustrations/activar-tutoriales 3.svg?component'
import OnboardingImage4 from '@/assets/img/illustrations/activar-tutoriales 4.svg?component'

import {useAppNavStore} from '@/stores/app-nav.js'
import type {Onboarding} from '@/types/onboarding'

const appNav = useAppNavStore()

const sequence: Array<Onboarding> = [
  {
    title: 'Activa el audio',
    body: 'Si tienes dificultad o no quieres leer, no te preocupes. Puedes <b>activar la opción de sonido, pulsando el ícono de altavoz</b>.',
    image: OnboardingImage1
  },
  {
    title: '¿Para qué sirve PICTOS?',
    body: 'Pictos te ayudará a realizar tareas en distintos servicios, mostrándote una lista de todas las cosas que puedes hacer en cada lugar.',
    image: OnboardingImage2
  },
  {
    title: '¿Cómo funciona?',
    body: 'Pictos te explica paso a paso qué puedes hacer en cada lugar, a través de pictogramas.',
    image: OnboardingImage3
  },
  {
    title: '¡Tú nos puedes ayudar!',
    body: 'Queremos entregar a la comunidad las herramientas para apoyarnos entre todos.',
    image: OnboardingImage4
  }
]
</script>

<template>
  <main class="page">
    <OnboardingNav :sequence="sequence" onboarding-key="welcome" :redirect-to="appNav.redirectTo" />
  </main>
</template>

<style lang="scss" scoped>
.page {
  display: flex;
  align-items: stretch;
  grid-row: 1/-1;
}
</style>
