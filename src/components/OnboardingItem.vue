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
    <div class="onboarding-item__container container">
      <h2 class="onboarding-item__title">
        {{ data.title }}
        <TextToSpeech
          :text-audio="data.title + '.\n\n\n\n\n\n' + data.body.replace(/(<([^>]+)>)/gi, '')" />
      </h2>
      <p v-html="data.body"></p>
    </div>
  </div>
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
