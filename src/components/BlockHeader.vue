<script setup lang="ts">
import IconExternalLink from '@/assets/img/app-icons/support/link-externo.svg?component'
import LocationSelector from '@/components/LocationSelector.vue'
import TextToSpeech from '@/components/TextToSpeech.vue'
import {useAppNavStore} from '@/stores/app-nav'

const appNav = useAppNavStore()

defineProps<{
  title?: string
  description: string
  link?: {text: string; url: string}
  compact?: boolean
  location?: boolean
  firstDescription?: boolean
}>()
</script>

<template>
  <header
    class="block-header"
    :class="[{'block-header__compact': compact}, `block-header__${appNav.theme}`]">
    <slot name="icon" class="block-header__icon"></slot>
    <template v-if="firstDescription">
      <p class="block-header__description">
        {{ description }}
      </p>
      <h1 class="block-header__title" v-if="title !== undefined">{{ title }}</h1>
    </template>
    <template v-else>
      <h1 class="block-header__title" v-if="title !== undefined">{{ title }}</h1>
      <p class="block-header__description">
        {{ description }}
      </p>
    </template>

    <a v-if="link !== undefined" :href="link.url" class="block-header__link" target="_blank">
      {{ link.text }}
      <IconExternalLink />
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
  padding: var(--spacer--500) var(--spacer--600);
  border-radius: var(--spacer--500);
  background-color: var(--color--carolinablue);
  margin: var(--spacer--600) var(--spacer--400) 0;
  font-weight: 600;
  @media screen and (min-width: 640px) {
    margin-left: var(--spacer--400);
    margin-right: var(--spacer--400);
  }
  .theme-online & {
    background-color: var(--color--yellow);
  }
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
    top: calc(var(--spacer--500) + 2px);
    right: var(--spacer--400);
  }
}
.block-header__online {
  background-color: var(--color--yellow);
}
.block-header__title {
  @include rfs($font-size-21);
  margin-bottom: var(--spacer--200);
  line-height: calc(25 / 18);
  color: var(--color--blue-dark);
}
.block-header__description {
  @include rfs($font-size-14);
  color: var(--color--blue-dark);
  margin: var(--spacer--200) 0;
  font-weight: 600;
}
.block-header__link {
  color: var(--color--blue-dark);
  display: flex;
  justify-content: center;
  align-items: end;
  line-height: 1;
  gap: 4px;
  svg {
    width: 10px;
    height: 10px;
    margin-bottom: 3px;
  }
}
.block-header__compact {
  margin: 0;
  padding: var(--spacer--500) var(--spacer--600) var(--spacer--500) var(--spacer--400);
}

</style>
