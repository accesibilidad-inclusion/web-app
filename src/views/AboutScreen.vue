<script setup lang="ts">
import OnboardingItem from '@/components/OnboardingItem.vue'
import AboutImage from '@/assets/img/illustrations/acerca.svg?component'
import LogoAccesibilidadInclusionImage from '@/assets/img/app-icons/logo-accesibilidad-inclusion.svg?component'
import LogoPucvImage from '@/assets/img/app-icons/logo-pucv.svg?component'
import LogoUandesImage from '@/assets/img/app-icons/logo-uandes.svg?component'
import LogoGobiernoImage from '@/assets/img/app-icons/logo-gobierno.svg?component'

const data = {
  title: 'Acerca de PICTOS',
  body: '<ul><li>PICTOS es una aplicación para hacer el mundo inclusivo y accesible.</li><li>PICTOS es una aplicación de uso gratuito.</li><li>Todos pueden aportar en PICTOS.</li><li>Tú participación es importante, ayuda a construir PICTOS.</li><li>Para hacer esta app, trabajaron investigadores, diseñadores y desarrolladores con y sin discapacidad.</li><li>Este es un proyecto del Núcleo de Accesibilidad e Inclusión de la Pontificia Universidad Católica de Valparaíso.</li><li>Este proyecto fue financiado por SENADIS y FONDEF IT.</li></ul>',
  image: AboutImage
}
</script>

<template>
  <OnboardingItem :data="data" />
  <div>
    <LogoAccesibilidadInclusionImage />
    <LogoPucvImage />
    <LogoUandesImage />
    <LogoGobiernoImage />
  </div>
</template>

<style lang="scss" scoped></style>
