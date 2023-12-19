<script setup lang="ts">
import {ref} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {useFetch} from '@vueuse/core'

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

const {data} = await useFetch(`${import.meta.env.VITE_APP_API_DOMAIN}api/services/nearVenues`)
  .post({
    ...appData.location.getCoordinates(),
    category: route.params.categorySlug,
    service: route.params.serviceSlug
  })
  .json()

venues_presential.value = data.value.venues.map((v: PresentialVenue) => new PresentialVenue(v))
venues_online.value = data.value.venues_online.map((v: OnlineVenue) => new OnlineVenue(v))
category.value = new Category(data.value.category)
service.value = new Service(data.value.service)
appNav.setSelecteds(category.value, service.value)
document.title = `Lugares de ${data.value.service.name} | Pictos`
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
          <div class="items-title">Lugares en internet</div>
          <template v-for="venue in venues_online" :key="venue.id">
            <ItemClickable :title="venue.name" @click="setVenue(venue)">
              <template #meta>
                <div class="venue-block__distance">{{ venue.url }}</div>
                <div
                  v-if="venue.evaluation && venue.show_evaluation"
                  class="venue-block__evaluation">
                  <span
                    class="venue-grade venue-block__evaluation-grade"
                    :data-grade="venue.evaluation.score">
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
          <div class="items-title">Lugares presenciales</div>
          <template v-for="venue in venues_presential" :key="venue.id">
            <ItemClickable :title="venue.name" @click="setVenue(venue)">
              <template #meta>
                <div>a {{ venue.distanceToText() }} de distancia</div>
                <div
                  v-if="venue.evaluation && venue.show_evaluation"
                  class="venue-block__evaluation">
                  <span
                    class="venue-grade venue-block__evaluation-grade"
                    :data-grade="venue.evaluation.score">
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
          class="btn btn--primary btn--large btn--block">
          &plus; Agregar un lugar nuevo
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
}
.service__header {
  padding: var(--spacer--500) var(--spacer--400);
  background: var(--color-brand-lighter);
  border-radius: var(--spacer--500);
  color: var(--color--blue-dark);
  display: grid;
  grid-template-areas: 'icon name' 'icon description';
  grid-template-columns: 55px auto;
  grid-template-rows: auto 1fr;
  gap: var(--spacer--200) var(--spacer--300);
  position: relative;
}
.service-icon {
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
.service__title {
  grid-area: name;
  display: block;
  font-size: var(--font-size--700);
  font-weight: 700;
}
.service__description {
  grid-area: description;
  font-size: var(--font-size--400);
  font-weight: 600;
}
.service__header .tts {
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
.service__items {
  flex-grow: 1;
}
.items-title {
  font-size: var(--font-size--600);
  font-weight: 700;
  text-align: center;
  margin-top: var(--spacer--600);
  margin-bottom: var(--spacer--500);
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
  font-size: var(--font-size--400);
  grid-column: 1/3;
  grid-row: 2/3;
  line-height: 1.33333;
  color: var(--color-neutral);
}
.venue-block__evaluation {
  font-size: var(--font-size--400);
  grid-column: 1/4;
  margin-top: var(--spacer-sm);
  line-height: 1.33333;
  text-transform: uppercase;
  color: var(--color-text);
}
.venue__evaluation-grade {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  text-align: center;
  border-radius: 50%;
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
.venue-block__evaluation-grade {
  display: inline-block;
  width: 1.1875rem;
  height: 1.1875rem;
  margin-right: 0.15rem;
  line-height: 1.1875rem;
  color: var(--color-brand-darker);
}
</style>
