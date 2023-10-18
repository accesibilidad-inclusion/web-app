<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TextToSpeech from '@/components/TextToSpeech.vue'

const router = useRouter()

const filterSelected = ref<string | null>(null)
const query = ref('')

const doSearch = () => {
  if (query.value === '') {
    return
  }
  router.push({
    path: 'buscar',
    query: {
      s: query.value,
      t: filterSelected.value
    }
  })
}
</script>

<template>
  <form class="main-search" @submit.prevent="doSearch">
    <label class="main-search__label" for="s">
      <span>Encuentra ayuda para tareas en internet o presenciales</span>
      <TextToSpeech :text-audio="'Encuentra ayuda para tareas en internet o presenciales'" />
    </label>
    <div>
      <div :class="filterSelected == 'online' ? 'active' : ''" @click="filterSelected = 'online'">
        Buscar tareas en internet
      </div>
      <div
        :class="filterSelected == 'presential' ? 'active' : ''"
        @click="filterSelected = 'presential'"
      >
        Buscar tareas presenciales
      </div>
    </div>
    <div v-if="filterSelected">
      <div class="main-search__group">
        <input
          id="s"
          v-model="query"
          class="main-search__input"
          type="search"
          placeholder="Ejemplo: Viajar en metro"
        />
        <div class="main-search__button">
          <icon-search />
        </div>
      </div>
      <button class="btn btn-primary" :disabled="query.trim() == ''" type="submit">
        Ver resultados
      </button>
    </div>
  </form>
</template>

<style lang="scss">
@import '@/assets/scss/rfs.scss';
.main-search {
  position: relative;
  margin-left: calc(var(--spacer) * -1);
  margin-right: calc(var(--spacer) * -1);
  margin-bottom: var(--spacer-lg);
  padding: calc(var(--spacer) / 2) var(--spacer) var(--spacer-xl);
  background: var(--color-brand-lighter);
  @media screen and (min-width: 640px) {
    margin-left: calc(var(--spacer-lg) * -1);
    margin-right: calc(var(--spacer-lg) * -1);
    padding: calc(var(--spacer-lg) / 2) var(--spacer-lg) var(--spacer-xl);
  }
  @media screen and (min-width: 1280px) {
    margin-left: calc(var(--spacer-xl) * -1);
    margin-right: calc(var(--spacer-xl) * -1);
    padding-left: var(--spacer-xl);
    padding-right: var(--spacer-xl);
  }
  &::before,
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    height: 30px;
  }
  &::before {
    width: 100%;
    left: 0;
    background: #fff;
    z-index: 1;
  }
  &::after {
    left: calc(var(--spacer) * -1);
    right: calc(var(--spacer) * -1);
    background: var(--color-brand-lighter);
    border-radius: 50% 50% 50% 50% / 0% 0% 100% 100%;
    z-index: 10;
  }
}
.main-search__group {
  position: relative;
}
.main-search__input {
  @include rfs($font-size-14);
  width: 100%;
  padding: var(--spacer-sm) var(--spacer-lg) var(--spacer-sm) calc(var(--spacer-lg) / 3);
  border: none;
  border-radius: var(--border-radius);
  &::placeholder {
    color: #848484;
    opacity: 1;
    font-style: italic;
    font-family: var(--font-family);
  }
}
.main-search__button {
  position: absolute;
  top: 55%;
  right: calc(var(--spacer-lg) / 3);
  margin-top: -0.625rem;
  background: none;
  border: none;
  z-index: 10;
  width: 1rem;
  height: 1rem;
  svg {
    width: 1rem;
    height: 1rem;
    path {
      fill: var(--color-brand);
      opacity: 0.7;
    }
  }
}
.main-search__label {
  @include rfs($font-size-18);
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: var(--spacer);
  margin-bottom: var(--spacer);
  line-height: calc(25 / 18);
  font-weight: bold;
}

@media screen and (max-width: 640px) {
  input[type='email'],
  input[type='search'],
  input[type='text'],
  select:focus,
  textarea {
    font-size: 16px;
  }
}
</style>
