<script setup lang="ts">
import OnboardingItem from '@/components/OnboardingItem.vue'
import ColaboraImage from '@/assets/img/illustrations/colabora.svg?component'
import {useEventBus} from '@vueuse/core'
import {useRouter} from 'vue-router'

const router = useRouter()

const data = {
  title: '¡Qué bueno que quieras colaborar!',
  body: '<p>Tu ayuda es muy importante para hacer entre todos una ciudad más fácil y amigable.</p> <p>Las ayudas que puedes darnos son:</p><ol><li>Si falta un lugar, lo puedes agregar.</li><li>Si falta una tarea de un lugar, la puedes agregar.</li><li>Si no hay pictogramas, los puedes crear.</li><li>Puedes evaluar la accesibilidad de un lugar.</li></ol>',
  image: ColaboraImage
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
  </main>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/rfs.scss';
.page {
  display: flex;
  align-items: stretch;
  grid-row: 2/-1;
  flex-direction: column;
}
.page:deep(.onboarding-item) {
  display: flex;
  flex-direction: column;
}
.page:deep(.onboarding-item__container) {
  background-color: var(--color--white);
  padding-bottom: var(--spacer--700);
  .onboarding-item__title {
    font-weight: 800;
  }
}
</style>
