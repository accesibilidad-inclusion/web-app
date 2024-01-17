<script setup lang="ts">
import {useRoute, useRouter} from 'vue-router'

import OnboardingNav from '@/components/OnboardingNav.vue'
import OnboardingInternetImage1 from '@/assets/img/illustrations/evaluación-internet 1.svg?component'
import OnboardingInternetImage2 from '@/assets/img/illustrations/evaluación-internet 2.svg?component'
import OnboardingPresencialImage1 from '@/assets/img/illustrations/evaluación-presencial 1.svg?component'
import OnboardingPresencialImage2 from '@/assets/img/illustrations/evaluación-presencial 2.svg?component'
import OnboardingPresencialImage3 from '@/assets/img/illustrations/evaluación-presencial 3.svg?component'
import OnboardingPresencialImage4 from '@/assets/img/illustrations/evaluación-presencial 4.svg?component'
import {useAppNavStore} from '@/stores/app-nav.js'
import type {Onboarding} from '@/types/onboarding'
import {useEventBus} from '@vueuse/core'

const appNav = useAppNavStore()
const route = useRoute()
const router = useRouter()

const sequence: Array<Onboarding> = [
  {
    title: '¡Hola!',
    body: 'Acá te explicamos cómo debes hacer la evaluación de un lugar con PICTOS. A continuación, encontrarás los pasos que debes seguir.',
    image:
      route.params.type === 'presencial' ? OnboardingPresencialImage1 : OnboardingInternetImage1
  },
  {
    title: '¿Qué necesitas para evaluar?',
    body: '<ul><li>Debes estar en el lugar o servicio a evaluar</li><li>Observa atentamente tu entorno</li><li>Responde todas las preguntas</li><li>Evalúa poniendo nota</li></ul><div class="text-center mt-3">Ahora te explicamos cómo funciona el <strong>método de puntuación</strong></div>',
    image:
      route.params.type === 'presencial' ? OnboardingPresencialImage2 : OnboardingInternetImage2
  },
  {
    title: 'Reglas de puntuación',
    body: '<div class="evaluation__grade-description"><span class="evaluation__grade-square" data-grade="5"></span><strong>Excelente: </strong> No necesita mejoras</div><div class="evaluation__grade-description"><span class="evaluation__grade-square" data-grade="4"></span><strong>Bueno: </strong> Necesita pocas mejoras</div><div class="evaluation__grade-description"><span class="evaluation__grade-square" data-grade="3"></span><strong>Regular: </strong> Ni bueno ni malo</div><div class="evaluation__grade-description"><span class="evaluation__grade-square" data-grade="2"></span><strong>Malo: </strong> Necesita muchas mejoras</div><div class="evaluation__grade-description"><span class="evaluation__grade-square" data-grade="1"></span><strong>Pésimo: </strong> Tiene que mejorar todo</div>',
    image: OnboardingPresencialImage3
  },
  {
    title: 'Activar permisos',
    body: 'Necesitamos que nos permitas acceder a la cámara de tu dispositivo para que puedas tomar fotos durante la evaluación',
    image: OnboardingPresencialImage4
  }
]

const finishing = () => {
  if (route.params.type === 'presencial') appNav.onboarding.presentialEvaluation = false
  if (route.params.type === 'en-internet') appNav.onboarding.onlineEvaluation = false
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
