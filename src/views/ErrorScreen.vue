<script setup lang="ts">
import {useRouter} from 'vue-router'

import TextToSpeech from '@/components/TextToSpeech.vue'
import ErrorImage from '@/assets/img/illustrations/error.svg?component'

const router = useRouter()
</script>

<template>
  <div class="onboarding-error">
    <div class="onboarding-error__body">
      <div class="onboarding-error-item">
        <ErrorImage class="onboarding-error-item__image" />
        <div class="onboarding-error-item__container">
          <h2 class="onboarding-error-item__title">
            {{ $t('error.title') }}
            <TextToSpeech :text-audio="$t('error.title') + '.\n\n\n\n\n\n' + $t('error.body')" />
          </h2>
          <p class="onboarding-error-item__text">{{ $t('error.body') }}</p>
        </div>
      </div>
    </div>
    <footer class="onboarding__footer">
      <button class="btn btn--large btn--primary" @click="router.push('/inicio')">
        {{ $t('error.btn') }}
      </button>
    </footer>
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/rfs.scss';

.onboarding-error {
  display: flex;
  flex-flow: column;
  background-color: var(--color--skyblue);
  padding-top: 50px;
  min-height: 100dvh;
  @media screen and (min-width: 540px) {
    padding-top: 62px;
  }
}
.onboarding-error__body {
  flex-grow: 1;
}
.onboarding__footer {
  display: flex;
  gap: var(--spacer--300);
  padding: 0 var(--spacer--400) var(--spacer--400);
  @media screen and (min-width: 540px) {
    padding: 0 var(--spacer--500) var(--spacer--400);
  }
  button {
    flex-basis: 50%;
    flex-grow: 1;
  }
}
.onboarding-error-item {
  width: 100%;
  line-height: 1.25rem;
}
.onboarding-error-item__image {
  width: 100%;
  height: auto;
}
.onboarding-error-item__container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: center;
  gap: var(--spacer--300);
  padding: var(--spacer--500) var(--spacer--400);
  width: 100%;
  height: 100%;
  @media screen and (min-width: 540px) {
    padding: var(--spacer--600) var(--spacer--500);
    gap: var(--spacer--400);
  }
  .onboarding-error-item__title {
    font-weight: 800;
    @include rfs($font-size-18);
    color: var(--color--blue-dark);
    position: relative;
    .tts {
      position: absolute;
      top: var(--spacer--200);
      right: 0;
    }
  }
  .onboarding-error-item__text {
    @include rfs($font-size-16);
    font-weight: 600;
    line-height: 1.5;
  }
}
</style>
