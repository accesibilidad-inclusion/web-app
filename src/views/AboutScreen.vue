<script setup lang="ts">
import OnboardingItem from '@/components/OnboardingItem.vue'
import AboutImage from '@/assets/img/illustrations/acerca.svg?component'
import LogoAccesibilidadInclusionImage from '@/assets/img/app-icons/logo-accesibilidad-inclusion.svg?component'
import LogoPucvImage from '@/assets/img/app-icons/logo-pucv.svg?component'
import LogoUandesImage from '@/assets/img/app-icons/logo-uandes.svg?component'
import LogoGobiernoImage from '@/assets/img/app-icons/logo-gobierno.svg?component'
import {useEventBus} from '@vueuse/core'
import {useRouter} from 'vue-router'

const router = useRouter()

const data = {
  title: 'Acerca de PICTOS',
  body: '<ul><li>PICTOS es una aplicación para hacer el mundo inclusivo y accesible.</li><li>PICTOS es una aplicación de uso gratuito.</li><li>Todos pueden aportar en PICTOS.</li><li>Tú participación es importante, ayuda a construir PICTOS.</li><li>Para hacer esta app, trabajaron investigadores, diseñadores y desarrolladores con y sin discapacidad.</li><li>Este es un proyecto del Núcleo de Accesibilidad e Inclusión de la Pontificia Universidad Católica de Valparaíso.</li><li>Este proyecto fue financiado por SENADIS y FONDEF IT.</li></ul>',
  image: AboutImage
}

const bus = useEventBus('close')
const listener = () => {
  router.back()
}
bus.on(listener)
</script>

<template>
  <main class="page">
  <OnboardingItem :data="data" />
  <div class="onboarding__logos">
    <LogoAccesibilidadInclusionImage class="logo-inclusion" />
    <LogoPucvImage class="logo-pucv" />
    <LogoUandesImage class="logo-uandes" />
    <LogoGobiernoImage class="logo-gobierno" />
  </div>
</main>
</template>

<style lang="scss" scoped>
.page {
  display: flex;
  align-items: stretch;
  grid-row: 2/-1;
  flex-direction: column;
}
.page:deep(.onboarding-item__container) {
  background-color: var(--color--white);
  padding-bottom: var(--spacer--700);
  .onboarding-item__title {
    font-weight: 800;
  }
}
.onboarding__logos {
  background-color: var(--color--blue);
  display: flex;
  align-items: center;
  gap: var(--spacer--600);
  flex-direction: column;
  padding: var(--spacer--700) var(--spacer--400);
  @media screen and (min-width: 640px) {
    gap: var(--spacer--700);
  }
}
.onboarding__logo image {
  width: 100px;
}
.logo-inclusion {
  width: 141px;
  height: auto;
  @media screen and (min-width: 640px) {
    width: 190px;
  }
}
.logo-pucv {
  width: 135px;
  height: auto;
  @media screen and (min-width: 640px) {
    width: 190px;
  }
}
.logo-uandes {
  width: 179px;
  height: auto;
  @media screen and (min-width: 640px) {
    width: 250px;
  }
}
.logo-gobierno {
  width: 154px;
  height: auto;
  @media screen and (min-width: 640px) {
    width: 200px;
  }
}
</style>
