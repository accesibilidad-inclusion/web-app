<script setup lang="ts">
import {ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useEventBus, useFetch} from '@vueuse/core'

import BlockHeader from '@/components/BlockHeader.vue'
import InputSearch from '@/components/InputSearch.vue'
import TaskBlock from '@/components/TaskBlock.vue'
import {OnlineTask} from '@/model/online_task'
import {PresentialTask} from '@/model/presential_task'
import {useAppDataStore} from '@/stores/app-data'
import IconInternet from '@/assets/img/app-icons/instructions/internet.svg?component'

const appData = useAppDataStore()
const route = useRoute()
const router = useRouter()

const tasks = ref<Array<PresentialTask | OnlineTask>>([])

if (route.query.t !== 'online' && route.query.t !== 'presential') {
  router.push('/inicio')
} else {
  const {data} = await useFetch(
    route.query.t === 'presential'
      ? `${import.meta.env.VITE_APP_API_DOMAIN}api/presential_tasks/search?query=${
          route.query.s
        }&lat=${appData.location.getCoordinates().lat}&lng=${appData.location.getCoordinates().lng}&country_id=${appData.country?.id}`
      : `${import.meta.env.VITE_APP_API_DOMAIN}api/online_tasks/search?query=${
          route.query.s
        }&commune_id=${appData.location.commune?.id}&country_id=${appData.country?.id}`
  )
    .get()
    .json()
  tasks.value =
    route.query.t === 'online'
      ? data.value.map((task: OnlineTask) => new OnlineTask(task))
      : data.value.map((task: PresentialTask) => new PresentialTask(task))
}

const query = ref(route.query.s as string)
const type = route.query.t as string

const doSearch = () => {
  if (query.value === '') {
    return
  }
  router.push({
    path: 'busqueda',
    query: {
      s: query.value,
      t: route.query.t
    }
  })
}

const bus = useEventBus('back')
const listener = () => {
  router.push('/inicio')
}
bus.on(listener)
</script>

<template>
  <div class="search-results" :class="$route.query.t">
    <BlockHeader
      :title="$t('searchResults.results')"
      :description="
        route.query.t === 'online'
          ? $t('searchResults.onlineTasksNear')
          : $t('searchResults.presentialTasksNear')
      "
      location
      compact>
      <template #icon>
        <span class="category-icon">
          <IconInternet class="block-header__icon" />
        </span>
      </template>
    </BlockHeader>
    <main class="search-results__hits">
      <InputSearch :type="type" v-model="query" @search="doSearch" />
      <template v-if="!tasks.length">
        <div class="search-no-results">
          <div class="search-no-results__content">
            <div class="search-no-results__icon">
              <span>!</span>
            </div>
            <h2 class="search-no-results__title">{{ $t('searchResults.noResults') }}</h2>
            <p
              class="block-header__description search-no-results__description"
              v-html="$t('searchResults.testAnotherWords')"></p>
          </div>
          <div class="search-no-results__">
            <router-link to="/inicio" class="btn btn--primary btn--large btn--block">{{
              $t('searchResults.backToHome')
            }}</router-link>
          </div>
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
  padding: calc(var(--spacer--400) + 50px) var(--spacer--400);
  @media screen and (min-width: 540px) {
    padding-top: calc(var(--spacer--400) + 62px);
  }
  &:deep(.block-header) {
    position: relative;
    text-align: center;
    padding: var(--spacer--500) var(--spacer--400);
    border-radius: var(--spacer--500);
    background: var(--color--carolinablue);
    margin: 0;
    font-weight: 600;
    padding-top: var(--spacer);
    text-align: left;
    display: grid;
    grid-template-areas: 'icon name' 'icon description' 'icon location';
    grid-template-columns: 55px auto;
    grid-template-rows: auto;
    gap: var(--spacer--200) var(--spacer--300);

    // Ubicación
    .your-location {
      margin: 0;
      background: transparent;
      padding: 0;
      justify-content: flex-start;
      grid-area: location;
      .your-location__content {
        @include rfs($font-size-14);
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
      top: var(--spacer--400);
      right: var(--spacer--400);
      @media screen and (min-width: 1280px) {
        top: var(--spacer--500);
        right: var(--spacer--500);
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
      @include rfs($font-size-21);
      line-height: calc(25 / 18);
      color: var(--color--blue-dark);
      grid-area: name;
      margin: 0;
    }
    .block-header__description {
      @include rfs($font-size-14);
      color: var(--color--blue-dark);
      grid-area: description;
      margin: 0;
    }
    .block-header__compact {
      margin: 0;
      padding: var(--spacer--400);
      padding-top: var(--spacer--400);
      @media screen and (min-width: 540px) {
        padding: var(--spacer--500);
        padding-top: var(--spacer--500);
      }
    }
  }
}

.search-results__hits {
  margin-top: var(--spacer--600);
}

/*sin resultados*/
.search-no-results {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: var(--spacer--700);
}
.search-no-results__content {
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: var(--spacer--700) var(--spacer--400);
  gap: var(--spacer--400);
  height: 100%;
}
.search-no-results__icon {
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color--skyblue);
  border-radius: var(--spacer--300);
  width: 55px;
  height: 55px;
  span {
    font-size: 2.5rem;
    color: var(--color--blue-dark);
    font-weight: 700;
  }
}
.search-no-results__title {
  @include rfs($font-size-21);
  line-height: 1.3rem;
  color: var(--color--blue-dark);
  font-weight: 800;
  text-align: center;
}
.search-no-results__description {
  @include rfs($font-size-18);
  line-height: 1.5;
  text-align: center;
}
</style>
