<script setup lang="ts">
import {ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useFetch} from '@vueuse/core'

import LocationSelector from '@/components/LocationSelector.vue'
import TaskBlock from '@/components/TaskBlock.vue'
import {OnlineTask} from '@/model/online_task'
import {PresentialTask} from '@/model/presential_task'
import {useAppDataStore} from '@/stores/app-data'

const appData = useAppDataStore()
const route = useRoute()
const router = useRouter()

const tasks = ref<Array<PresentialTask | OnlineTask>>([])

if (route.query.t !== 'online' && route.query.t !== 'presential') {
  router.push('/inicio')
} else {
  const {data} = await useFetch(
    `${import.meta.env.VITE_APP_API_DOMAIN}api/${route.query.t}_tasks/search`
  )
    .post({
      query: route.query.s,
      ...appData.location.getCoordinates()
    })
    .json()
  tasks.value =
    route.query.s === 'online'
      ? data.value.map((task: OnlineTask) => new OnlineTask(task))
      : data.value.map((task: PresentialTask) => new PresentialTask(task))
}
</script>

<template>
  <div class="search-results" :class="$route.query.t">
    <header class="search-results__description">
      <div>
        <h1 class="search-results__title">Resultados</h1>
        <text-to-speech :text-audio="'Resultados'" />
      </div>
      <p class="search-results__help">
        <span v-if="route.query.t == 'presential'">Tareas presenciales cerca de</span>
        <span v-if="route.query.t == 'online'">Tareas en internet cerca de</span>
      </p>
      <LocationSelector :dense="true" />
    </header>
    <main class="search-results__hits">
      <template v-if="!tasks.length">
        <div class="search-no-results">
          <div class="search-no-results__content">
            <icon-no-results class="search-no-results__icon" />
            <h2 class="search-no-results__title">Búsqueda sin resultados</h2>
            <p class="search-no-results__description">
              Prueba buscando con <strong>otras palabras</strong> o usando las
              <strong>categorías</strong> disponibles
            </p>
          </div>
          <router-link to="/inicio" class="btn btn--primary btn--large btn--block"
            >Volver a Inicio</router-link
          >
        </div>
      </template>
      <template v-else>
        <TaskBlock v-for="task in tasks" :key="task.id" :task="task" show-parents />
      </template>
    </main>
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/rfs.scss';
.search-results {
  position: relative;
}
.search-results__description {
  margin-bottom: var(--spacer);
  padding: var(--spacer-sm) var(--spacer) var(--spacer);
  background: var(--color-brand-lighter);
  @media screen and (min-width: 640px) {
    margin-bottom: var(--spacer-lg);
    padding: var(--spacer) var(--spacer-lg) var(--spacer-lg);
  }
  @media screen and (min-width: 1280px) {
    padding-left: var(--spacer-xl);
    padding-right: var(--spacer-xl);
  }
}
.search-results__title,
.search-results__hits__title {
  @include rfs($font-size-18);
  margin-bottom: var(--spacer-sm);
  line-height: var(--subtitle-line-height);
}
.search-results__query {
  font-weight: normal;
}
.search-results__help {
  @include rfs($font-size-14);
  .tts {
    position: relative;
    top: 3px;
  }
}
.search-results__hits {
  padding-left: var(--spacer);
  padding-right: var(--spacer);
  @media screen and (min-width: 640px) {
    padding-left: var(--spacer-lg);
    padding-right: var(--spacer-lg);
  }
  @media screen and (min-width: 1280px) {
    padding-left: var(--spacer-xl);
    padding-right: var(--spacer-xl);
  }
}
/*sin resultados*/
.search-no-results {
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: var(--spacer);
  width: 100%;
  padding: 0 var(--spacer);
  left: 0;
  top: 100px;
  @media screen and (min-width: 640px) {
    max-width: 560px;
    left: auto;
    right: auto;
    padding: 0;
    top: 130px;
  }
  @media screen and (min-width: 1280px) {
    max-width: 630px;
    top: 140px;
  }
}
.search-no-results__content {
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
}
.search-no-results__icon {
  width: var(--spacer-lg);
  height: var(--spacer-lg);
  margin: var(--spacer) auto;
  display: block;
}
.search-no-results__title {
  @include rfs($font-size-18);
  color: var(--color-brand);
  margin-bottom: var(--spacer-sm);
  text-transform: uppercase;
  font-weight: 800;
  text-align: center;
}
.search-no-results__description {
  @include rfs($font-size-14);
  text-align: center;
  max-width: 240px;
  @media screen and (min-width: 640px) {
    max-width: 350px;
  }
}
</style>
