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

.block-header {
  position: relative;
  text-align: center;
  padding: var(--spacer);
  border-radius: var(--spacer--500);
  background: var(--color--carolinablue);
  margin: var(--spacer--700) var(--spacer--400) 0;
  font-weight: 600;
  // Ubicación
  .your-location {
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
      top: 2px;
      width: 10px !important;
      height: 16px !important;
      path {
        fill: var(--color--blue-dark) !important;
      }
    }
    .your-location__change {
      padding: var(--spacer--200);
      color: var(--color--blue);
    }
  }
  // Audio
  .tts {
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
}
.block-header__title {
  font-size: var(--font-size--700);
  margin-bottom: var(--spacer--200);
  line-height: calc(25 / 18);
  color: var(--color-brand-darkest);
}
.block-header__description {
  font-size: var(--font-size--400);
  color: var(--color--blue-dark);
  margin: var(--spacer--200) 0;
}

.block-header__compact {
  margin: 0;
}

// Category
.category {
  .block-header {
    padding-top: var(--spacer-lg);
    @media screen and (min-width: 1280px) {
      padding-left: var(--spacer-xl);
      padding-right: var(--spacer-xl);
    }
    .category-icon {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
// Service
.service {
  .block-header {
    padding-top: var(--spacer);
    text-align: left;
    display: grid;
    grid-template-areas: 'icon name' 'icon description';
    grid-template-columns: 55px auto;
    grid-template-rows: auto;
    gap: var(--spacer--200) var(--spacer--300);
    .tts {
      right: var(--spacer);
      @media screen and (min-width: 1280px) {
        right: var(--spacer);
      }
    }
  }
  .category-icon {
    grid-area: icon;
  }
  .block-header__title {
    grid-area: name;
    margin: 0;
  }
  .block-header__description {
    grid-area: description;
    margin: 0;
  }
}
</style>
