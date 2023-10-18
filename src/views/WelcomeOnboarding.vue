<script setup lang="ts">
import OnboardingNav from '@/components/OnboardingNav.vue'

import { useAppNavStore } from '@/stores/app-nav.js'
import type { Onboarding } from '@/types/onboarding'
import { defineAsyncComponent } from 'vue'

const appNav = useAppNavStore()

const sequence: Array<Onboarding> = [
  {
    title: 'Activa el audio',
    body: 'Si tienes dificultad o no quieres leer, no te preocupes. Puedes <b>activar la opción de sonido, pulsando el ícono de altavoz</b>.',
    image: defineAsyncComponent(
      () => import('@/assets/img/illustrations/activar-tutoriales 1.svg?component')
    )
  },
  {
    title: '¿Para qué sirve PICTOS?',
    body: 'Pictos te ayudará a realizar tareas en distintos servicios, mostrándote una lista de todas las cosas que puedes hacer en cada lugar.',
    image: defineAsyncComponent(
      () => import('@/assets/img/illustrations/activar-tutoriales 2.svg?component')
    )
  },
  {
    title: '¿Cómo funciona?',
    body: 'Pictos te explica paso a paso qué puedes hacer en cada lugar, a través de pictogramas.',
    image: defineAsyncComponent(
      () => import('@/assets/img/illustrations/activar-tutoriales 3.svg?component')
    )
  },
  {
    title: '¡Tú nos puedes ayudar!',
    body: 'Queremos entregar a la comunidad las herramientas para apoyarnos entre todos.',
    image: defineAsyncComponent(
      () => import('@/assets/img/illustrations/activar-tutoriales 4.svg?component')
    )
  }
]
</script>

<template>
  <main>
    <OnboardingNav :sequence="sequence" onboarding-key="welcome" :redirect-to="appNav.redirectTo" />
  </main>
</template>
