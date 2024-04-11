<script setup lang="ts">
import {computed, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useEventBus, useFetch} from '@vueuse/core'

import BlockHeader from '@/components/BlockHeader.vue'
import TextToSpeech from '@/components/TextToSpeech.vue'
import TaskBlock from '@/components/TaskBlock.vue'
import {Service} from '@/model/service'
import {PresentialVenue} from '@/model/presential_venue'
import {OnlineVenue} from '@/model/online_venue'
import {PresentialTask} from '@/model/presential_task'
import {useAppDataStore} from '@/stores/app-data'
import {useAppNavStore} from '@/stores/app-nav'
import {Category} from '@/model/category'
import IconPlus from '@/assets/img/app-icons/plus.svg?component'

const route = useRoute()
const router = useRouter()

const appData = useAppDataStore()
const appNav = useAppNavStore()

const category = ref<Category>()
const service = ref<Service>()
const venue = ref<PresentialVenue | OnlineVenue>()
const type = ref<'online' | 'presential'>('presential')

const {data} = await useFetch(
  `${import.meta.env.VITE_APP_API_DOMAIN}api/slugs/getElements?category=${
    route.params.categorySlug
  }&service=${route.params.serviceSlug}&venue=${route.params.venueSlug}`
)
  .get()
  .json()

type.value = data.value.type
appNav.theme = type.value
category.value = new Category(data.value.category)
service.value = new Service(data.value.service)
delete Object.assign(data.value.venue, {['tasks']: data.value.venue['published_tasks']})[
  'published_tasks'
]
venue.value =
  data.value.type === 'online'
    ? new OnlineVenue(data.value.venue)
    : new PresentialVenue(data.value.venue)

appNav.setSelecteds(category.value, service.value, venue.value)
document.title = `Tareas de ${data.value.venue.name} (${data.value.service.name}) | Pictos`

const evaluation = computed(() => {
  if (venue.value !== undefined) {
    const score =
      venue.value.show_evaluation && venue.value.evaluation ? venue.value.evaluation.score : 0
    return appData.evaluations.find((evaluation) => evaluation.grade === score)
  }
  return null
})

const bus = useEventBus('back')
const listener = () => {
  router.push('/' + appNav.selected.category?.slug + '/' + appNav.selected.service?.slug)
}
bus.on(listener)
</script>

<template>
  <div :class="type + '-venue'">
    <template v-if="service && venue">
      <BlockHeader
        :title="venue.name"
        description="Listado de tareas en:"
        :link="{
          text: venue instanceof PresentialVenue ? 'Ver en el Mapa' : 'Ir a sitio web',
          url: venue instanceof PresentialVenue ? venue.mapLink : venue.url
        }"
        :first-description="true">
      </BlockHeader>
      <template v-if="venue.tasks !== undefined && venue.tasks.length">
        <main class="venue__tasks">
          <p class="venue__tasks-description">
            <span>Selecciona lo que necesites hacer en este lugar</span>
            <text-to-speech :text-audio="'Selecciona lo que necesites hacer en este lugar'" />
          </p>
          <task-block
            v-for="task in venue.tasks"
            :key="task.id"
            :task="task"
            :preview="task instanceof PresentialTask" />
        </main>
        <aside class="actions actions--venue" v-if="venue instanceof PresentialVenue">
          <div class="actions__header">
            <text-to-speech
              :text-audio="'¿No encuentras lo que estabas buscando?. Agrega otra cosa que puedas hacer en este lugar. Agregar una tarea nueva'" />
            <p class="actions__title">¿No encuentras lo que estabas buscando?</p>
            <p class="actions__description">Agrega otra cosa que puedas hacer en este lugar</p>
          </div>
          <router-link to="/agregar-tarea" class="btn btn--primary btn--large btn--block btn--icon">
            <IconPlus /> Agregar una tarea nueva
          </router-link>
        </aside>
        <footer class="venue__footer">
          <router-link
            v-if="evaluation"
            :to="'/definir-evaluacion/' + evaluation.grade"
            class="venue__evaluation">
            <text-to-speech
              :text-audio="`Nivel de accesibilidad de ${venue.name}: ${evaluation.grade}, ${evaluation.title}`" />
            <div class="venue__evaluation-title">{{ evaluation.title }}</div>
            <div
              class="venue__evaluation-grade venue__evaluation-grade--lg"
              :data-grade="evaluation.grade">
              <span v-if="evaluation.grade">{{ evaluation.grade }}</span>
              <span v-else>?</span>
            </div>
            <p class="venue__evaluation-description">Nivel de accesibilidad de {{ venue.name }}</p>
            <p class="venue__evaluation-question">¿Qué significa esto?</p>
          </router-link>
          <div class="venue__evaluation-actions">
            <router-link
              :to="`/evaluar-lugar/${venue instanceof OnlineVenue ? 'en-internet' : 'presencial'}/${
                venue.id
              }`"
              class="btn btn--secondary btn--outlined--white btn--large btn--block">
              Evaluar este lugar
            </router-link>
          </div>
        </footer>
      </template>
      <template v-else>
        <div class="venue__no-information">
          <main class="venue__no-information-content">
            <text-to-speech :text-audio="'Este lugar no tiene información, ayúdanos a mejorar'" />
            <div class="venue__no-information-icon">
              <span>!</span>
            </div>
            <p class="venue__no-information-desc">
              Este lugar no tiene información, <span>ayúdanos a mejorar</span>
            </p>
          </main>
          <aside class="actions actions--venue" v-if="venue instanceof PresentialVenue">
            <router-link
              to="/agregar-tarea"
              class="btn btn--primary btn--large btn--block btn--icon"
              style="color: var(--color--white)">
              <IconPlus /> Agregar tareas a este lugar
            </router-link>
          </aside>
          <footer class="venue__footer">
            <router-link
              v-if="evaluation"
              :to="'/definir-evaluacion/' + evaluation.grade"
              class="venue__evaluation">
              <text-to-speech
                :text-audio="`Nivel de accesibilidad de ${venue.name}: ${evaluation.grade}, ${evaluation.title}`" />
              <div class="venue__evaluation-title">{{ evaluation.title }}</div>
              <div
                class="venue__evaluation-grade venue__evaluation-grade--lg"
                :data-grade="evaluation.grade">
                <span v-if="evaluation.grade">{{ evaluation.grade }}</span>
                <span v-else>?</span>
              </div>
              <p class="venue__evaluation-description">
                Nivel de accesibilidad de {{ venue.name }}
              </p>
              <p class="venue__evaluation-question">¿Qué significa esto?</p>
            </router-link>
            <div class="venue__evaluation-actions">
              <router-link
                :to="`/evaluar-lugar/${
                  venue instanceof OnlineVenue ? 'en-internet' : 'presencial'
                }/${venue.id}`"
                class="btn btn--secondary btn--outlined--white btn--large btn--block">
                Evaluar este lugar
              </router-link>
            </div>
          </footer>
        </div>
      </template>
    </template>
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/rfs.scss';

.presential-venue {
  position: relative;
}
.presential-venue,
.online-venue {
  display: flex;
  flex-direction: column;
  padding-top: calc(var(--spacer--400) + 50px);
  @media screen and (min-width: 540px) {
    padding-top: calc(var(--spacer--400) + 62px);
  }
  .block-header {
    margin-top: var(--spacer--300);
  }
  .venue__footer {
    margin-top: auto;
  }
}

.venue__header {
  position: relative;
  margin-bottom: var(--spacer);
  padding: var(--spacer);
  text-align: center;
  line-height: calc(22 / 16);
  color: var(--color--white);
  background: var(--color--blue-dark);
  @media screen and (min-width: 540px) {
    margin-left: 0;
    margin-right: 0;
    padding: var(--spacer-lg);
  }
  @media screen and (min-width: 1280px) {
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
    background: var(--color--white);
    z-index: 1;
  }
  &::after {
    left: calc(var(--spacer) * -1);
    right: calc(var(--spacer) * -1);
    background: var(--color--blue-dark);
    border-radius: 50% 50% 50% 50% / 0% 0% 100% 100%;
    z-index: 2;
  }
}
.venue__service {
  @include rfs($font-size-14);
  display: inline-block;
  padding: var(--spacer-sm);
  text-decoration: none;
  color: var(--color--white);
  &:hover {
    text-decoration: underline;
  }
}
.venue__name {
  @include rfs($font-size-18);
  margin-bottom: var(--spacer-sm);
  font-weight: bold;
  line-height: calc(25 / 18);
  z-index: 2;
  position: relative;
}
.venue__map-link {
  @include rfs($font-size-14);
  position: relative;
  font-weight: bold;
  color: var(--color--white);
  z-index: 10;
  svg {
    position: relative;
    width: 0.85rem;
    height: 1rem;
    top: 3px;
    path {
      fill: var(--color--white);
    }
  }
}
.venue__header .tts {
  position: absolute;
  top: calc(var(--spacer) + (var(--spacer) / 2));
  right: var(--spacer);
  z-index: 10;
  @media screen and (min-width: 540px) {
    top: calc(var(--spacer-lg) + (var(--spacer) / 2));
    right: var(--spacer-lg);
  }
  @media screen and (min-width: 1280px) {
    right: var(--spacer-xl);
  }
  svg path {
    fill: var(--color--white);
  }
}
.venue__tasks {
  padding: var(--spacer--600) var(--spacer--400);
}
.venue__tasks-description {
  @include rfs($font-size-16);
  font-weight: 700;
  margin: 0 0 var(--spacer--500);
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: var(--spacer);
  align-items: flex-start;
  .tts {
    position: relative;
    top: var(--spacer-xs);
  }
}
.actions--venue {
  padding-top: var(--spacer-lg);
  padding-bottom: var(--spacer-lg);
  background-color: var(--color-brand-lighter);
  @media screen and (min-width: 540px) {
    padding-top: calc(var(--spacer-lg) * 1.25);
    padding-bottom: calc(var(--spacer-lg) * 1.25);
  }
  .theme-online & {
    background-color: var(--color--yellow-light);
  }
  .actions__header {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto;
    grid-gap: var(--spacer-sm);
    .tts {
      grid-column: 2/3;
    }
  }
  .actions__title {
    margin-bottom: 0;
    grid-column: 1/2;
    grid-row: 1/2;
  }
  .actions__description {
    grid-column: 1/2;
    grid-row: 2/3;
  }
}
.venue__footer {
  position: relative;
  padding: var(--spacer--700) var(--spacer--400);
  text-align: center;
  color: var(--color--white);
  background-color: var(--color--blue);
  .theme-online & {
    background-color: var(--color--yellow);
    color: var(--color--blue-dark);
    .btn--outlined--white {
      color: initial;
      &:hover {
        color: var(--color--white);
      }
    }
  }
}
.venue__evaluation {
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: var(--spacer--400);
  text-decoration: none;
  color: var(--color--white);
  .theme-online & {
    color: var(--color--blue-dark);
  }
}
.venue__footer .tts {
  path {
    fill: var(--color--white);
    .theme-online & {
      fill: var(--color--blue-dark);
    }
  }
}
.venue__evaluation-title {
  @include rfs($font-size-21);
  font-weight: bold;
}
.venue__evaluation-grade--lg {
  width: 3.125rem;
  height: 3.125rem;
  margin-left: auto;
  margin-right: auto;
  font-size: 2rem;
  line-height: 3.125rem;
  color: var(--color--blue-dark);
  @media screen and (min-width: 540px) {
    width: 3.5rem;
    height: 3.5rem;
    font-size: 2.5rem;
  }
  .theme-online & {
    border: 1px solid var(--color--blue);
  }
}
.venue__evaluation-description {
  @include rfs($font-size-16);
  max-width: 30rem;
  margin-left: auto;
  margin-right: auto;
  font-weight: 600;
}
.venue__evaluation-question {
  @include rfs($font-size-16);
  padding: calc(var(--spacer--400) + var(--spacer--400));
  font-weight: 600;
  line-height: 1.33333;
  color: var(--color--white);
  display: block;
  text-decoration: underline;
  .theme-online & {
    color: var(--color--blue-dark);
  }
}
.venue__no-information {
  display: flex;
  flex-direction: column;
  .actions--venue {
    padding-top: 0;
    .actions__title {
      color: var(--color--white);
    }
    .btn {
      font-weight: 700;
    }
  }
}
.venue__no-information-content {
  padding: var(--spacer--700) var(--spacer--500) var(--spacer--600);
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: var(--spacer--500);
  min-height: 300px;
  .tts {
    path {
      fill: var(--color--blue-dark);
    }
  }
}
.venue__no-information-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color--skyblue);
  border-radius: var(--spacer--300);
  width: 55px;
  height: 55px;
  .theme-online & {
    background-color: var(--color--yellow);
  }
  span {
    font-size: 2.5rem;
    color: var(--color--blue-dark);
    font-weight: 700;
  }
}
.venue__no-information-desc {
  @include rfs($font-size-18);
  color: var(--color--blue-dark);
  text-align: center;
  font-weight: 800;
  span {
    font-weight: 700;
  }
}
.service__items {
  flex-grow: 1;
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
.venue__evaluation-grade {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 800;
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
</style>
