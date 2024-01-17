<script setup lang="ts">
import LikeIcon from '@/assets/img/app-icons/instructions/like.svg?component'
import TextToSpeech from '@/components/TextToSpeech.vue'
</script>

<template>
  <div class="instruction">
    <TextToSpeech text-audio="Gracias por la información" />
    <span class="instruction__icon">
      <LikeIcon />
    </span>
    <div class="instruction__title">¡Gracias por la información!</div>
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/rfs.scss';

.instruction {
  background-color: var(--color--skyblue);
  border-radius: var(--border-radius-md);
  flex-grow: 1;
  padding: var(--spacer--500);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacer--500);
  height: 100%;
  .theme-online & {
    background-color: var(--color--yellow);
  }
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
  @include rfs($font-size--600);
  font-weight: 700;
  text-align: center;
}
</style>
