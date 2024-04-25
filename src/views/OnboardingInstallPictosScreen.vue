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
    title: 'onboardingInstallPictos.title1',
    body: 'onboardingInstallPictos.desc1',
    image: InstalaPictos
  },
  DeviceSelector,
  {
    title:
      appSession.user.device == 'Iphone'
        ? 'onboardingInstallPictos.title2iphone'
        : 'onboardingInstallPictos.title2android',
    body:
      appSession.user.device == 'Iphone'
        ? 'onboardingInstallPictos.desc2iphone'
        : 'onboardingInstallPictos.desc2android',
    image: appSession.user.device == 'Iphone' ? InstalaIphone1 : InstalaAndroid1
  },
  {
    title:
      appSession.user.device == 'Iphone'
        ? 'onboardingInstallPictos.title3iphone'
        : 'onboardingInstallPictos.title3android',
    body:
      appSession.user.device == 'Iphone'
        ? 'onboardingInstallPictos.desc3iphone'
        : 'onboardingInstallPictos.desc3android',
    image: appSession.user.device == 'Iphone' ? InstalaIphone2 : InstalaAndroid2
  },
  {
    title:
      appSession.user.device == 'Iphone'
        ? 'onboardingInstallPictos.title4iphone'
        : 'onboardingInstallPictos.title4android',
    body:
      appSession.user.device == 'Iphone'
        ? 'onboardingInstallPictos.desc4iphone'
        : 'onboardingInstallPictos.desc4android',
    image: appSession.user.device == 'Iphone' ? InstalaIphone3 : InstalaAndroid3
  }
])

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
