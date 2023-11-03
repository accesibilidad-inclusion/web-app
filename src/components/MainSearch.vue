<script setup lang="ts">
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import TextToSpeech from '@/components/TextToSpeech.vue'
import IconSearch from '@/assets/img/app-icons/search.svg'

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
    <div class="main-search__types">
      <div
        :class="
          filterSelected == 'online'
            ? 'main-search__type main-search__type--active'
            : 'main-search__type'
        "
        @click="filterSelected = 'online'">
        Buscar tareas en internet
      </div>
      <div
        :class="
          filterSelected == 'presential'
            ? 'main-search__type main-search__type--active'
            : 'main-search__type'
        "
        @click="filterSelected = 'presential'">
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
          placeholder="Ejemplo: Viajar en metro" />
        <icon-search class="main-search__icon" />
      </div>
      <button class="main-search__button" :disabled="query.trim() == ''" type="submit">
        Ver resultados
      </button>
    </div>
  </form>
</template>

<style lang="scss">
@import '@/assets/scss/rfs.scss';
.main-search {
  position: relative;
  padding: calc(var(--spacer--400) * 3) var(--spacer--400);
  background: var(--color--blue);
  color: var(--color--white);
  margin-bottom: calc(var(--spacer--700) * 0.5);
  // @media screen and (min-width: 640px) {
  //   margin-left: calc(var(--spacer-lg) * -1);
  //   margin-right: calc(var(--spacer-lg) * -1);
  //   padding: calc(var(--spacer-lg) / 2) var(--spacer-lg) var(--spacer-xl);
  // }
  // @media screen and (min-width: 1280px) {
  //   margin-left: calc(var(--spacer-xl) * -1);
  //   margin-right: calc(var(--spacer-xl) * -1);
  //   padding-left: var(--spacer-xl);
  //   padding-right: var(--spacer-xl);
  // }
}
.main-search__label {
  display: flex;
  flex-flow: column-reverse;
  gap: var(--spacer--300);
  > span {
    font-weight: 700;
    font-size: var(--font-size--600);
    margin: 0 0 calc(var(--spacer--700) * 0.5);
    display: block;
    text-align: center;
  }
  .tts {
    svg path {
      fill: var(--color--white);
    }
  }
}
.main-search__types {
  display: flex;
  gap: var(--spacer--300);
}
.main-search__type {
  background: var(--color--white);
  font-weight: 700;
  color: var(--color--blue-dark);
  text-align: center;
  padding: var(--spacer--400);
  border-radius: var(--spacer--500);
  border: 1px solid var(--color--blue-dark);
  font-size: var(--font-size--500);
  line-height: 125%;
}
.main-search__type--active {
  background: var(--color--skyblue-light);
}
.main-search__group {
  position: relative;
  margin: var(--spacer--500) 0;
}
.main-search__input {
  font-size: var(--font-size--500);
  width: 100%;
  padding: var(--spacer--500);
  border: 1px solid var(--color--blue-dark);
  border-radius: var(--spacer--500);
  &::placeholder {
    color: #848484;
    opacity: 1;
    font-style: italic;
    font-family: inherit;
  }
}
.main-search__icon {
  position: absolute;
  top: 50%;
  right: var(--spacer--500);
  background: none;
  border: none;
  z-index: 9;
  width: var(--font-size--500);
  height: var(--font-size--500);
  transform: translateY(-50%);
  path {
    fill: var(--color--blue);
  }
}
.main-search__button {
  width: 100%;
  border: 1px solid var(--color--skyblue-light);
  border-radius: var(--spacer--700);
  color: var(--color--skyblue-light);
  background: transparent;
  padding: var(--spacer--400);
  font-weight: 700;
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
