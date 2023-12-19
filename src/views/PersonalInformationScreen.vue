<script setup lang="ts">
import PerfilImage from '@/assets/img/illustrations/perfil.svg?component'
import OnboardingNav from '@/components/OnboardingNav.vue'
import BirthDay from '@/components/BirthDay.vue'
import GenderSelector from '@/components/GenderSelector.vue'
import HasDisability from '@/components/HasDisability.vue'
import DisabilityDetails from '@/components/DisabilityDetails.vue'
import type {OnboardingOrComponent} from '@/types/onboarding'
import {useAppNavStore} from '@/stores/app-nav.js'
import {useAppSessionStore} from '@/stores/app-session.js'
import {useRouter} from 'vue-router'
import {useEventBus, useFetch} from '@vueuse/core'

const appNav = useAppNavStore()
const appSession = useAppSessionStore()
const router = useRouter()

const sequence: Array<OnboardingOrComponent> = [
  {
    title: 'Cuéntanos un poco de ti',
    body: 'Registra tu fecha de nacimiento, género y si tienes algún tipo de discapacidad. Toda la información será estrictamente confidencial.',
    image: PerfilImage
  },
  BirthDay,
  GenderSelector,
  HasDisability,
  DisabilityDetails,
  {
    title: 'Cuéntanos un poco de ti',
    body: 'Registra tu fecha de nacimiento, género y si tienes algún tipo de discapacidad. Toda la información será estrictamente confidencial.',
    image: PerfilImage
  }
]
const finishing = async () => {
  const {data} = await useFetch(`${import.meta.env.VITE_APP_API_DOMAIN}api/app_users/store`)
    .post({
      birthday: appSession.user.birthday,
      sex: appSession.user.gender,
      impairments: JSON.stringify(appSession.user.disabilities)
    })
    .json()
  appSession.user.id = data.value.id
  router.push(appNav.redirectTo)
}
const bus = useEventBus('close')
const listener = () => {
  router.push(
    '/' +
      appNav.selected.category?.slug +
      '/' +
      appNav.selected.service?.slug +
      '/' +
      appNav.selected.venue?.slug
  )
}
bus.on(listener)
</script>

<template>
  <main class="page">
    <OnboardingNav
      :sequence="sequence"
      finish-button-text="Empezar a usar PICTOS"
      @finished="finishing()" />
  </main>
</template>

<style lang="scss" scoped>
.page {
  display: flex;
  align-items: stretch;
  grid-row: 1/-1;
}
</style>
