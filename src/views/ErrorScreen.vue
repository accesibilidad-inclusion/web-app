<script setup lang="ts">
import {useRouter} from 'vue-router'

import TextToSpeech from '@/components/TextToSpeech.vue'
import ErrorImage from '@/assets/img/illustrations/error.svg?component'

const router = useRouter()
</script>

<template>
  <div class="onboarding-item">
    <ErrorImage class="onboarding-item__image" />
    <div class="onboarding-item__container container">
      <h2 class="onboarding-item__title">
        ¡Lo sentimos!
        <TextToSpeech
          :text-audio="'¡Lo sentimos!.\n\n\n\n\n\n Ha ocurrido un error inesperado, puedes volver a Inicio o recargar la página'" />
      </h2>
      <p>Ha ocurrido un error inesperado, puedes volver a Inicio o recargar la página</p>
    </div>
  </div>
  <button class="btn btn--large btn--primary" @click="router.push('/inicio')">Ir a inicio</button>
</template>

<style lang="scss">
.onboarding-item {
  width: 100%;
  line-height: 20px;
}
.onboarding-item__image {
  width: 100%;
  height: auto;
}
.onboarding-item__title {
  font-weight: 700;
  font-size: var(--font-size--500);
  color: var(--color--blue-dark);
  margin-bottom: 10px;
}
</style>
