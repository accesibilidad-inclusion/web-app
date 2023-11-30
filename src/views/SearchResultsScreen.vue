<script setup lang="ts">
import {ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useFetch} from '@vueuse/core'

import LocationSelector from '@/components/LocationSelector.vue'
import TaskBlock from '@/components/TaskBlock.vue'
import {OnlineTask} from '@/model/online_task'
import {PresentialTask} from '@/model/presential_task'
import {useAppDataStore} from '@/stores/app-data'
import TextToSpeech from '@/components/TextToSpeech.vue'
import IconInternet from '@/assets/img/app-icons/instructions/internet.svg?component'

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

    <header class="block-header block-header__compact">
      <span class="category-icon">
        <icon-internet class="block-header__icon" />
      </span>
      
      <h1 class="block-header__title search-results__title">Resultados</h1>
      <p class="block-header__description entries-list__description search-results__help">
        <span v-if="route.query.t == 'presential'">Tareas presenciales cerca de</span>
        <span v-if="route.query.t == 'online'">Tareas en internet cerca de</span>
      </p>
      <LocationSelector :dense="true" />
      <TextToSpeech :text-audio="'Resultados'" />
    </header>
    <main class="search-results__hits">
      <template v-if="!tasks.length">
        <div class="search-no-results">
          <div class="search-no-results__content">
            <icon-no-results class="search-no-results__icon" />
            <h2 class="search-no-results__title">Búsqueda sin resultados</h2>
            <p class="block-header__description search-no-results__description">
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

<style lang="scss" scoped>
@import '@/assets/scss/rfs.scss';
.search-results {
  position: relative;
  padding: calc(var(--spacer--700) * 0.5) var(--spacer--400);
  background-color: var(--color--skyblue);

  .block-header {
  position: relative;
  text-align: center;
  padding: var(--spacer--500);
  border-radius: var(--spacer--500);
  background: var(--color--carolinablue);
  margin: var(--spacer--600) var(--spacer--400) 0;
  font-weight: 600;
  padding-top: var(--spacer);
    text-align: left;
    display: grid;
    grid-template-areas: 'icon name' 'icon description' 'icon location';
    grid-template-columns: 55px auto;
    grid-template-rows: auto;
    gap: var(--spacer--200) var(--spacer--300);
  @media screen and (min-width: 640px) {
    margin-left: var(--spacer--500);
    margin-right: var(--spacer--500);
  }
  // Ubicación
  .your-location {
    margin: 0;
    background: transparent;
    padding: 0;
    justify-content: flex-start;
    grid-area: location;
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
    top: var(--spacer--400);
    right: var(--spacer--400);
      @media screen and (min-width: 1280px) {
        top: var(--spacer--500);
      right: var(--spacer--500);
    }
    }
  }
  .category-icon {
    background: var(--color--yellow);
    border: 1px solid var(--color--blue);
    border-radius: var(--spacer--300);
    width: 55px;
    height: 55px;
    display: grid;
    align-items: center;
    justify-content: center;
    grid-area: icon;
  }
  .block-header__title {
    font-size: var(--font-size--700);
    line-height: calc(25 / 18);
    color: var(--color-brand-darkest);
    grid-area: name;
    margin: 0;
  }
  .block-header__description {
    font-size: var(--font-size--400);
    color: var(--color--blue-dark);
    grid-area: description;
    margin: 0;
  }
  .block-header__compact {
    margin: 0;
    padding: var(--spacer--400);
    padding-top: var(--spacer--400);
    @media screen and (min-width: 640px) {
      padding: var(--spacer--500);
      padding-top: var(--spacer--500);
    }
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
