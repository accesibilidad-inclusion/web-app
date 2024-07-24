<script setup lang="ts">
import {useRouter} from 'vue-router'
import {useEventBus} from '@vueuse/core'

import OnboardingNav from '@/components/OnboardingNav.vue'
import OnboardingImage1 from '@/assets/img/illustrations/activar-tutoriales 1.svg?component'
import OnboardingImage2 from '@/assets/img/illustrations/activar-tutoriales 2.svg?component'
import OnboardingImage3 from '@/assets/img/illustrations/activar-tutoriales 3.svg?component'
import OnboardingImage4 from '@/assets/img/illustrations/activar-tutoriales 4.svg?component'

import {useAppNavStore} from '@/stores/app-nav.js'
import type {Onboarding} from '@/types/onboarding'

const appNav = useAppNavStore()
const router = useRouter()
const bus = useEventBus('close')
const listener = () => {
  finishing()
}
bus.on(listener)

const sequence: Array<Onboarding> = [
  {
    title: 'welcome.title1',
    body: 'welcome.desc1',
    image: OnboardingImage1
  },
  {
    title: 'welcome.title2',
    body: 'welcome.desc2',
    image: OnboardingImage2
  },
  {
    title: 'welcome.title3',
    body: 'welcome.desc3',
    image: OnboardingImage3
  },
  {
    title: 'welcome.title4',
    body: 'welcome.desc4',
    image: OnboardingImage4
  }
]

const finishing = () => {
  appNav.onboarding.welcome = false
  router.push(appNav.redirectTo)
  appNav.redirectTo = '/inicio'
}

defineExpose({
  finishing
})
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
