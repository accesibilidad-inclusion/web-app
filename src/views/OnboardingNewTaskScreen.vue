<script setup lang="ts">
import {useRouter} from 'vue-router'

import OnboardingNav from '@/components/OnboardingNav.vue'
import OnboardingImage1 from '@/assets/img/illustrations/nueva-tarea 1.svg?component'
import OnboardingImage2 from '@/assets/img/illustrations/nueva-tarea 2.svg?component'
import OnboardingImage3 from '@/assets/img/illustrations/nueva-tarea 3.svg?component'
import OnboardingImage4 from '@/assets/img/illustrations/nueva-tarea 4.svg?component'
import {useAppNavStore} from '@/stores/app-nav.js'
import type {Onboarding} from '@/types/onboarding'
import {useEventBus} from '@vueuse/core'

const appNav = useAppNavStore()
const router = useRouter()

const sequence: Array<Onboarding> = [
  {
    title: 'onboardingNewTask.title1',
    body: 'onboardingNewTask.desc1',
    image: OnboardingImage1
  },
  {
    title: 'onboardingNewTask.title2',
    body: 'onboardingNewTask.desc2',
    image: OnboardingImage2
  },
  {
    title: 'onboardingNewTask.title3',
    body: 'onboardingNewTask.desc3',
    image: OnboardingImage3
  },
  {
    title: 'onboardingNewTask.title4',
    body: 'onboardingNewTask.desc4',
    image: OnboardingImage4
  }
]

const finishing = () => {
  appNav.onboarding.newTask = false
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
