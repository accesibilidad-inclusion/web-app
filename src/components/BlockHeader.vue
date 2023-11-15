<script setup lang="ts">
import IconLocationPin from '@/assets/img/app-icons/support/lugar.svg?component'
import LocationSelector from '@/components/LocationSelector.vue'
import TextToSpeech from '@/components/TextToSpeech.vue'

defineProps<{
  title?: string
  description: string
  link?: {text: string; url: string}
  compact?: boolean
  location?: boolean
}>()
</script>

<template>
  <header class="block-header entries-list__header" :class="{'block-header__compact': compact}">
    <slot name="icon" class="block-header__icon"></slot>
    <h1 class="block-header__title entries-list__title" v-if="title !== undefined">{{ title }}</h1>
    <p class="block-header__description entries-list__description">
      {{ description }}
    </p>
    <a v-if="link !== undefined" :href="link.url" class="block-header__link" target="_blank">
      {{ link.text }}
      <IconLocationPin />
    </a>
    <LocationSelector v-if="location" dense />
    <TextToSpeech :text-audio="title + '.\n\n ' + description" />
  </header>
</template>

<style lang="scss">
@import '@/assets/scss/rfs.scss';

.entries-list__header {
  position: relative;
  padding: var(--spacer);
  text-align: center;
  background-color: var(--color-brand-lighter);
  @media screen and (min-width: 640px) {
    padding: var(--spacer-lg);
  }
  @media screen and (min-width: 1280px) {
    padding-left: var(--spacer-xl);
    padding-right: var(--spacer-xl);
  }
}
.entries-list__title {
  font-size: var(--font-size--700);
  margin-bottom: var(--spacer--200);
  line-height: calc(25 / 18);
  color: var(--color-brand-darkest);
}
.block-header {
  border-radius: var(--spacer--500);
  background: var(--color--carolinablue);
  margin: var(--spacer--700) var(--spacer--400) 0;
  position: relative;
  padding-top: var(--spacer--600);
  font-weight: 600;
}
.block-header__description {
  font-size: var(--font-size--400);
  color: var(--color--blue-dark);
  margin: var(--spacer--200) 0;
}
.block-header :deep(.your-location) {
  margin: 0;
  background: transparent;
  padding: 0;
  justify-content: center;
  .your-location__content {
    width: auto;
    color: var(--color--blue-dark);
    gap: var(--spacer--200);
  }
  svg {
    position: relative;
    top: 1px;
    path {
      fill: var(--color--blue-dark) !important;
    }
  }

  .your-location__change {
    padding: var(--spacer--200);
    color: var(--color--blue);
  }
}
.block-header__icon {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
}
.block-header .tts {
  position: absolute;
  top: var(--spacer);
  right: var(--spacer);
  @media screen and (min-width: 640px) {
    right: var(--spacer-lg);
  }
  @media screen and (min-width: 1280px) {
    right: var(--spacer-xl);
  }
}
.block-header__link {
  @include rfs($font-size-12);
  position: relative;
  font-weight: bold;
  color: var(--color-background);
  z-index: 10;
  svg {
    position: relative;
    width: 0.85rem;
    height: 1rem;
    top: 3px;
    path {
      fill: #fff;
    }
  }
}
</style>
