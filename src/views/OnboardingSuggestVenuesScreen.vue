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
    title: 'onboardingSuggestVenues.title1',
    body: 'onboardingSuggestVenues.desc1',
    image: OnboardingImage1
  },
  {
    title: 'onboardingSuggestVenues.title2',
    body: 'onboardingSuggestVenues.desc2',
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
