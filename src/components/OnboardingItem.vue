<script setup lang="ts">
import type {Onboarding} from '@/types/onboarding'
import TextToSpeech from '@/components/TextToSpeech.vue'

defineProps<{
  data: Onboarding
}>()
</script>

<template>
  <div class="onboarding-item">
    <component :is="data.image" class="onboarding-item__image" />
    <div class="onboarding-item__container">
      <h2 class="onboarding-item__title">
        {{ data.title }}
        <TextToSpeech
          :text-audio="data.title + '.\n\n\n\n\n\n' + data.body.replace(/(<([^>]+)>)/gi, '')" />
      </h2>
      <p v-html="data.body" class="onboarding-item__text"></p>
    </div>
  </div>
</template>

<style lang="scss">
.onboarding-item {
  width: 100%;
  line-height: 1.25rem;
}
.onboarding-item__image {
  width: 100%;
  height: auto;
}
.onboarding-item__container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: var(--spacer--300);
  padding: var(--spacer--500) var(--spacer--400);
  width: 100%;
  height: 100%;
  @media screen and (min-width: 640px) {
    padding: var(--spacer--600) var(--spacer--500);
    gap: var(--spacer--400);
  }
  .onboarding-item__title {
    font-weight: 700;
    font-size: var(--font-size--500);
    color: var(--color--blue-dark);
    display: flex;
    justify-content: space-between;
    @media screen and (min-width: 640px) {
      font-size: var(--font-size--700);
      line-height: 1.3rem;
    }
  }
  .onboarding-item__text {
    font-size: var(--font-size--400);
    font-weight: 600;
    @media screen and (min-width: 640px) {
      font-size: var(--font-size--600);
      line-height: 1.5;
    }
  }
}

</style>
