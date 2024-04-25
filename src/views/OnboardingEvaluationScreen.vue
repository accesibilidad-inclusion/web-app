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
    title: 'onboardingEvaluation.title1',
    body: 'onboardingEvaluation.desc1',
    image:
      route.params.type === 'presencial' ? OnboardingPresencialImage1 : OnboardingInternetImage1
  },
  {
    title: 'onboardingEvaluation.title2',
    body: 'onboardingEvaluation.desc2',
    image:
      route.params.type === 'presencial' ? OnboardingPresencialImage2 : OnboardingInternetImage2
  },
  {
    title: 'onboardingEvaluation.title3',
    body: 'onboardingEvaluation.desc3',
    image: OnboardingPresencialImage3
  },
  {
    title: 'onboardingEvaluation.title4',
    body: 'onboardingEvaluation.desc4',
    image: OnboardingPresencialImage4
  }
]

const finishing = () => {
  if (route.params.type === 'presencial') appNav.onboarding.presentialEvaluation = false
  if (route.params.type === 'en-internet') appNav.onboarding.onlineEvaluation = false
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
