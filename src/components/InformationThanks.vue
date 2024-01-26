<script setup lang="ts">
import LikeIcon from '@/assets/img/app-icons/instructions/like.svg?component'
import TextToSpeech from '@/components/TextToSpeech.vue'
</script>

<template>
  <div class="onboarding-skyblue">
    <div class="instruction">
      <TextToSpeech text-audio="Gracias por la información" />
      <span class="instruction__icon">
        <LikeIcon />
      </span>
      <div class="instruction__title">¡Gracias por la información!</div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/rfs.scss';

.onboarding-skyblue {
  background-color: var(--color--skyblue);
  padding-top: 50px;
  flex-grow: 1;
  @media screen and (min-width: 640px) {
    padding-top: 62px;
  }
  .block-header {
    margin-top: var(--spacer--300);
    font-weight: 600;
    p {
      margin: 0;
    }
  }
}
.instruction {
  padding: var(--spacer--400);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacer--500);
  height: 100%;
}
.instruction__icon {
  background: var(--color--yellow);
  border: 1px solid var(--color--blue);
  border-radius: var(--spacer--300);
  width: 55px;
  height: 55px;
  display: grid;
  align-items: center;
  justify-content: center;
  .theme-online & {
    background-color: var(--color--yellow-light);
  }
}
.instruction__title {
  @include rfs($font-size-18);
  font-weight: 700;
  text-align: center;
}
</style>
