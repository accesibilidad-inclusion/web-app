<script setup lang="ts">
import OnboardingItem from '@/components/OnboardingItem.vue'
import ColaboraImage from '@/assets/img/illustrations/colabora.svg?component'
import {useEventBus} from '@vueuse/core'
import {useRouter} from 'vue-router'

const router = useRouter()

const data = {
  title: 'colaborateWithUs.title',
  body: 'colaborateWithUs.body',
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
