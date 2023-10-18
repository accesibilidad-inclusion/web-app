<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Category } from '@/types/category'
import { useAppDataStore } from '@/stores/app-data'
import TextToSpeech from '@/components/TextToSpeech.vue'
import IconFormalities from '@/assets/img/app-icons/formalities.svg?component'
import IconHealth from '@/assets/img/app-icons/health.svg?component'
import IconTransport from '@/assets/img/app-icons/transport.svg?component'
import IconLeisure from '@/assets/img/app-icons/leisure.svg?component'

const appData = useAppDataStore()
const router = useRouter()

const setCategory = (category: Category) => {
  router.push(`/${category.slug}`)
}
</script>

<template>
  <section class="main-categories container">
    <div class="main-categories__header">
      <h2 class="main-categories__title">Facilitamos tu vida en pasos simples</h2>
      <p class="main-categories__description">Encuentra ayuda por categoría</p>
      <TextToSpeech
        :text-audio="'Facilitamos tu vida en pasos simples. Encuentra ayuda por categoría'"
      />
    </div>
    <ul class="main-categories__list">
      <li v-for="category in appData.categories" :key="category.id">
        <a @click="setCategory(category)">
          <IconTransport v-if="category.slug == 'transporte'" />
          <IconHealth v-if="category.slug == 'salud'" />
          <IconLeisure v-if="category.slug == 'ocio'" />
          <IconFormalities v-if="category.slug == 'tramites'" />
          {{ category.name }}
        </a>
      </li>
    </ul>
  </section>
</template>

<style lang="scss">
@import '@/assets/scss/rfs.scss';
.your-location {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: calc(var(--spacer-lg) / 3);
  border-radius: 5px;
  background-color: var(--color-illustration-bg);
  margin-bottom: var(--spacer);
  color: #1a4571;
  .your-location__change {
    @include rfs($font-size-14);
    font-weight: 700;
    color: var(--color-brand-dark);
    padding: calc(var(--spacer-lg) / 3);
  }
  .your-location__content {
    display: flex;
    align-items: center;
    width: 100%;
    gap: var(--spacer-sm);
    padding-right: var(--spacer-sm);
    border-right: 1px solid var(--color-brand-lighter);
    span {
      @include rfs($font-size-14);
    }
    svg {
      width: 11px;
      height: 15px;
      @media screen and (min-width: 640px) {
        width: var(--spacer);
        height: var(--spacer);
      }
      path {
        fill: var(--color-brand-dark);
      }
    }
  }
}
</style>
