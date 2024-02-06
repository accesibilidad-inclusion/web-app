<script setup lang="ts">
import TextToSpeech from '@/components/TextToSpeech.vue'

defineProps<{
  title: string
}>()

defineEmits(['click'])
</script>

<template>
  <a class="item-clickable entry-block" tag="article" @click="$emit('click')">
    <h2 class="item-clickable__title entry-block__name">{{ title }}</h2>
    <text-to-speech :text-audio="`${title}`" />
    <div class="item-clickable__meta">
      <slot name="meta"></slot>
    </div>
  </a>
</template>

<style lang="scss">
@import '@/assets/scss/rfs.scss';

.item-clickable {
  cursor: pointer;
  display: grid;
  border: 1px solid var(--color--blue);
  background: var(--color--white);
  padding: var(--spacer--500) var(--spacer--400);
  position: relative;
  border-radius: var(--spacer--500);
  margin-top: var(--spacer--300);
  grid-template-columns: 1fr auto;
  grid-template-areas: 'title tts' 'meta meta';
  gap: var(--spacer--300);
  &:hover {
    cursor: pointer;
  }
  .tts {
    top: var(--spacer--500);
    right: var(--spacer--400);
  }
}
.item-clickable__title {
  @include rfs($font-size-16);
  line-height: 1.25;
  color: var(--color--blue-dark);
  grid-area: title;
}
.item-clickable__meta {
  grid-area: meta;
  line-height: 1.2;
  @include rfs($font-size-14);
  display: flex;
  flex-flow: column;
  gap: var(--spacer--200);
}
.item-clickable__meta,
.item-clickable__meta div {
  color: var(--color--blue-gray);
  font-weight: 600;
}
.item-clickable__meta div {
  display: block;
  display: flex;
  align-items: flex-end;
  gap: var(--spacer--200);
}
.item-clickable__meta svg {
  width: 10px;
  height: 16px;
  path {
    fill: var(--color--blue-gray);
  }
}
</style>
