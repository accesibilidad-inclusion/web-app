<script setup lang="ts">
import {ref} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {useEventBus, useFetch} from '@vueuse/core'

import BlockHeader from '@/components/BlockHeader.vue'
import CategoryIcon from '@/components/CategoryIcon.vue'
import ItemClickable from '@/components/ItemClickable.vue'
import TextToSpeech from '@/components/TextToSpeech.vue'
import {Category} from '@/model/category'
import {Service} from '@/model/service'
import {PresentialVenue} from '@/model/presential_venue.js'
import {OnlineVenue} from '@/model/online_venue.js'
import {useAppDataStore} from '@/stores/app-data.js'
import {useAppNavStore} from '@/stores/app-nav.js'
import IconPlus from '@/assets/img/app-icons/plus.svg?component'
import IconLocationPin from '@/assets/img/app-icons/support/lugar.svg?component'
import InternetPlaceIcon from '@/assets/img/app-icons/support/lugares-internet.svg?component'

const router = useRouter()
const route = useRoute()

const appData = useAppDataStore()
const appNav = useAppNavStore()

const category = ref<Category>()
const service = ref<Service>()
const venues_presential = ref<Array<PresentialVenue>>([])
const venues_online = ref<Array<OnlineVenue>>([])

const setVenue = (venue: PresentialVenue | OnlineVenue) => {
  router.push(`/${route.params.categorySlug}/${route.params.serviceSlug}/${venue.slug}`)
}

const {data} = await useFetch(
  `${import.meta.env.VITE_APP_API_DOMAIN}api/services/nearVenues?category=${
    route.params.categorySlug
  }&service=${route.params.serviceSlug}&lat=${appData.location.getCoordinates().lat}&lng=${
    appData.location.getCoordinates().lng
  }`
)
  .get()
  .json()

venues_presential.value = data.value.venues.map((v: PresentialVenue) => new PresentialVenue(v))
venues_online.value = data.value.venues_online.map((v: OnlineVenue) => new OnlineVenue(v))
category.value = new Category(data.value.category)
service.value = new Service(data.value.service)
appNav.setSelecteds(category.value, service.value)
document.title = `Lugares de ${data.value.service.name} | Pictos`

const bus = useEventBus('back')
const listener = () => {
  router.push('/' + appNav.selected.category?.slug)
}
bus.on(listener)
</script>

<template>
  <div class="service">
    <template v-if="category && service">
      <BlockHeader :title="service.name" description="Lugares del servicio" compact>
        <template #icon>
          <CategoryIcon v-bind:category="category.slug"></CategoryIcon>
        </template>
      </BlockHeader>
      <main class="service__items venues">
        <template v-if="venues_online.length">
          <div class="items-title"><InternetPlaceIcon /> Lugares en internet</div>
          <template v-for="venue in venues_online" :key="venue.id">
            <ItemClickable :title="venue.name" @click="setVenue(venue)">
              <template #meta>
                <div class="venue-block__distance">{{ venue.url }}</div>
                <div
                  v-if="venue.evaluation && venue.show_evaluation"
                  class="venue-block__evaluation">
                  <span class="venue-block__evaluation-grade" :data-grade="venue.evaluation.score">
                    {{ venue.evaluation.score }}
                  </span>
                  <span class="venue-block__evaluation-description">
                    {{ venue.evaluation.calification }}
                  </span>
                </div>
              </template>
            </ItemClickable>
          </template>
        </template>
        <template v-if="venues_presential.length">
          <div class="items-title">
            <IconLocationPin class="icon-location" /> Lugares presenciales
          </div>
          <template v-for="venue in venues_presential" :key="venue.id">
            <ItemClickable :title="venue.name" @click="setVenue(venue)">
              <template #meta>
                <div>a {{ venue.distanceToText() }} de distancia</div>
                <div
                  v-if="venue.evaluation && venue.show_evaluation"
                  class="venue-block__evaluation">
                  <span class="venue-block__evaluation-grade" :data-grade="venue.evaluation.score">
                    {{ venue.evaluation.score }}
                  </span>
                  <span class="venue-block__evaluation-description">
                    {{ venue.evaluation.calification }}
                  </span>
                </div>
              </template>
            </ItemClickable>
          </template>
        </template>
      </main>
      <aside class="actions actions--category">
        <p class="actions__title">
          ¿No encuentras el lugar que estás buscando?
          <text-to-speech
            :text-audio="'¿No encuentras el lugar que estás buscando? Agregar un lugar nuevo'" />
        </p>
        <router-link
          :to="'/sugerir-lugar/' + service.id"
          class="btn btn--primary btn--large btn--block btn--icon">
          <IconPlus /> Agregar un lugar nuevo
        </router-link>
      </aside>
    </template>
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/rfs.scss';
.service {
  display: flex;
  flex-flow: column nowrap;
  padding: var(--spacer--400) var(--spacer--400) var(--spacer--500);
  background-color: var(--color--skyblue);
  padding-top: calc(var(--spacer--400) + 50px);
  height: 100%;
  min-height: 100dvh;
  @media screen and (min-width: 540px) {
    padding-top: calc(var(--spacer--400) + 62px);
  }
  .block-header {
    padding-top: var(--spacer);
    text-align: left;
    display: grid;
    grid-template-areas: 'icon name' 'icon description';
    grid-template-columns: 55px auto;
    grid-template-rows: auto;
    gap: var(--spacer--200) var(--spacer--300);
    .tts {
      right: var(--spacer--400);
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
  .actions {
    padding-left: 0;
    padding-right: 0;
  }
}
.service__items {
  flex-grow: 1;
}
.items-title {
  @include rfs($font-size-18);
  font-weight: 700;
  text-align: center;
  margin-top: var(--spacer--600);
  margin-bottom: var(--spacer--500);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacer--200);
}
.venue-block {
  cursor: pointer;
  .tts {
    grid-column: 3/4;
    grid-row: 1/3;
  }
}
.venue-block__name {
  grid-column: 1/3;
  grid-row: 1/2;
}
.venue-block__distance {
  @include rfs($font-size-14);
  grid-column: 1/3;
  grid-row: 2/3;
  line-height: 1.33333;
  color: var(--color--blue-gray);
}
.venue-block__evaluation {
  margin-top: var(--spacer--200);
  align-items: center !important;
}
.venue-block__evaluation-grade {
  @include rfs($font-size-14);
  width: 1.563rem;
  height: 1.563rem;
  color: var(--color--blue-dark);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  text-align: center;
  border-radius: var(--spacer--300);
  &[data-grade='5'] {
    background: var(--color-grade-5);
  }
  &[data-grade='4'] {
    background: var(--color-grade-4);
  }
  &[data-grade='3'] {
    background: var(--color-grade-3);
  }
  &[data-grade='2'] {
    background: var(--color-grade-2);
  }
  &[data-grade='1'] {
    background: var(--color-grade-1);
  }
  &[data-grade='0'] {
    background: var(--color-grade-0);
  }
}
.venue-block__evaluation-description {
  @include rfs($font-size-14);
  color: var(--color--blue-dark);
}
.icon-location {
  height: 16px;
  width: auto;
  margin-top: 2px;
}
</style>
