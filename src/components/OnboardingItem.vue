<script setup lang="ts">
import type {Onboarding} from '@/types/onboarding'
import TextToSpeech from '@/components/TextToSpeech.vue'

defineProps<{
  data: Onboarding
}>()
</script>

<template>
  <div class="onboarding-item">
    <div class="onboarding-item__content-image">
      <component :is="data.image" class="onboarding-item__image" />
    </div>
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
@import '@/assets/scss/rfs.scss';

.onboarding-item {
  width: 100%;
  line-height: 1.25rem;
  margin-top: -50px;
  @media screen and (min-width: 640px) {
    margin-top: -61px;
  }
}
.onboarding-item__content-image {
  width: 100%;
  max-height: 500px;
  overflow: hidden;
  position: relative;
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
  // height: 100%;
  @media screen and (min-width: 640px) {
    padding: var(--spacer--600) var(--spacer--500);
    gap: var(--spacer--400);
  }
  .onboarding-item__title {
    font-weight: 700;
    @include rfs($font-size-16);
    color: var(--color--blue-dark);
    display: flex;
    justify-content: space-between;
    @media screen and (min-width: 640px) {
      @include rfs($font-size-21);
      line-height: 1.3rem;
    }
  }
  .onboarding-item__text {
    @include rfs($font-size-14);
    font-weight: 600;
    ul {
      padding-left: var(--spacer--500);
      li {
        margin-bottom: var(--spacer--300);
      }
    }
    p {
      margin-bottom: var(--spacer--400);
    }
    ol {
      padding-left: var(--spacer--500);
      @include rfs($font-size-16);
      li {
        margin-bottom: var(--spacer--300);
      }
    }
    @media screen and (min-width: 640px) {
      @include rfs($font-size-18);
      line-height: 1.5;
    }
  }
}

</style>
