<script setup lang="ts">
import PerfilImage from '@/assets/img/illustrations/perfil.svg?component'
import OnboardingNav from '@/components/OnboardingNav.vue'
import BirthDay from '@/components/BirthDay.vue'
import GenderSelector from '@/components/GenderSelector.vue'
import HasDisability from '@/components/HasDisability.vue'
import type {OnboardingOrComponent} from '@/types/onboarding'
import {useAppNavStore} from '@/stores/app-nav.js'

const appNav = useAppNavStore()

const sequence: Array<OnboardingOrComponent> = [
  {
    title: 'Cuéntanos un poco de ti',
    body: 'Registra tu fecha de nacimiento, género y si tienes algún tipo de discapacidad. Toda la información será estrictamente confidencial.',
    image: PerfilImage
  },
  BirthDay,
  GenderSelector,
  HasDisability,
  {
    title: 'Cuéntanos un poco de ti',
    body: 'Registra tu fecha de nacimiento, género y si tienes algún tipo de discapacidad. Toda la información será estrictamente confidencial.',
    image: PerfilImage
  }
]
</script>

<template>
  <main class="page">
    <OnboardingNav :sequence="sequence" :redirect-to="appNav.redirectTo" />
  </main>
</template>

<style lang="scss" scoped>
.page {
  display: flex;
  align-items: stretch;
  grid-row: 1/-1;
}
</style>
