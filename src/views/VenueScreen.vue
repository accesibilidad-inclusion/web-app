<script setup lang="ts">
import {computed, ref} from 'vue'
import {useRoute} from 'vue-router'
import {useFetch} from '@vueuse/core'

import BlockHeader from '@/components/BlockHeader.vue'
import TextToSpeech from '@/components/TextToSpeech.vue'
import TaskBlock from '@/components/TaskBlock.vue'
import {Service} from '@/model/service'
import {PresentialVenue} from '@/model/presential_venue.js'
import {OnlineVenue} from '@/model/online_venue.js'
import {PresentialTask} from '@/model/presential_task'
import {useAppDataStore} from '@/stores/app-data'
import {useAppNavStore} from '@/stores/app-nav'

const route = useRoute()

const appData = useAppDataStore()
const appNav = useAppNavStore()

const service = ref<Service>()
const venue = ref<PresentialVenue | OnlineVenue>()
const type = ref<'online' | 'presential'>('presential')

const {data} = await useFetch(`${import.meta.env.VITE_APP_API_DOMAIN}api/slugs/getElements`)
  .post({
    category: route.params.categorySlug,
    service: route.params.serviceSlug,
    venue: route.params.venueSlug
  })
  .json()

type.value = data.value.type
appNav.theme = type.value
service.value = data.value.service
venue.value =
  data.value.type === 'online'
    ? new OnlineVenue(data.value.venue)
    : new PresentialVenue(data.value.venue)
appNav.selected.category = data.value.category
appNav.selected.service = data.value.service
appNav.selected.venue =
  data.value.type === 'online'
    ? new OnlineVenue(data.value.venue)
    : new PresentialVenue(data.value.venue)
document.title = `Tareas de ${data.value.venue.name} (${data.value.service.name}) | Pictos`

const evaluation = computed(() => {
  if (venue.value !== undefined) {
    const score =
      venue.value.show_evaluation && venue.value.evaluation ? venue.value.evaluation.score : 0
    return appData.evaluations.find((evaluation) => evaluation.grade === score)
  }
  return null
})
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
        }">
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
        <aside class="actions actions--venue">
          <div class="actions__header">
            <text-to-speech
              :text-audio="'¿No encuentras lo que estabas buscando?. Agrega otra cosa que puedas hacer en este lugar. Agregar una tarea nueva'" />
            <p class="actions__title">¿No encuentras lo que estabas buscando?</p>
            <p class="actions__description">Agrega otra cosa que puedas hacer en este lugar</p>
          </div>
          <router-link
            :to="appNav.onboarding.task ? '/nueva-tarea/intro' : '/nueva-tarea'"
            class="btn btn--primary btn--large btn--block">
            &plus; Agregar una tarea nueva
          </router-link>
        </aside>
        <footer class="venue__footer">
          <router-link
            v-if="evaluation"
            :to="'/evaluacion/' + evaluation.grade"
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
              class="btn btn--ghost btn--large btn--block">
              Evaluar este lugar
            </router-link>
          </div>
        </footer>
      </template>
      <template v-else>
        <div class="venue__no-information">
          <main class="venue__no-information-content">
            <p class="venue__no-information-desc">
              <icon-no-information />
              <span>Este lugar no tiene información, ayúdanos a mejorar</span>
              <text-to-speech :text-audio="'Este lugar no tiene información, ayúdanos a mejorar'" />
            </p>
          </main>
          <aside class="actions actions--venue">
            <router-link
              :to="appNav.onboarding.task ? '/nueva-tarea/intro' : '/nueva-tarea'"
              class="btn btn--white btn--large btn--block"
              style="color: var(--color-brand-darker)">
              &plus; Agregar tareas a este lugar
            </router-link>
          </aside>
          <footer class="venue__footer">
            <router-link
              v-if="evaluation"
              :to="'/evaluacion/' + evaluation.grade"
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
                class="btn btn--ghost btn--large btn--block">
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
.venue__header {
  position: relative;
  margin-bottom: var(--spacer);
  padding: var(--spacer);
  text-align: center;
  line-height: calc(22 / 16);
  color: var(--color-background);
  background: var(--color-brand-darkest);
  @media screen and (min-width: 640px) {
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
    background: #fff;
    z-index: 1;
  }
  &::after {
    left: calc(var(--spacer) * -1);
    right: calc(var(--spacer) * -1);
    background: var(--color-brand-darkest);
    border-radius: 50% 50% 50% 50% / 0% 0% 100% 100%;
    z-index: 2;
  }
}
.venue__service {
  @include rfs($font-size-12);
  display: inline-block;
  padding: var(--spacer-sm);
  text-decoration: none;
  color: #fff;
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
  @include rfs($font-size-12);
  position: relative;
  font-weight: bold;
  color: var(--color-background);
  z-index: 10;
  svg {
    position: relative;
    width: 0.85rem;
    height: 1rem;
    top: 3px;
    path {
      fill: #fff;
    }
  }
}
.venue__header .tts {
  position: absolute;
  top: calc(var(--spacer) + (var(--spacer) / 2));
  right: var(--spacer);
  z-index: 10;
  @media screen and (min-width: 640px) {
    top: calc(var(--spacer-lg) + (var(--spacer) / 2));
    right: var(--spacer-lg);
  }
  @media screen and (min-width: 1280px) {
    right: var(--spacer-xl);
  }
  svg path {
    fill: #fff;
  }
}
.venue__tasks {
  padding: var(--spacer--600) var(--spacer--400);
  @media screen and (min-width: 640px) {
    padding-left: var(--spacer--500);
    padding-right: var(--spacer--500);
  }
}
.venue__tasks-description {
  font-size: var(--font-size--500);
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
  @media screen and (min-width: 640px) {
    padding-top: calc(var(--spacer-lg) * 1.25);
    padding-bottom: calc(var(--spacer-lg) * 1.25);
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
  padding: var(--spacer-lg) var(--spacer);
  text-align: center;
  color: var(--color-background);
  background: var(--color-brand-darkest);
  @media screen and (min-width: 640px) {
    padding-left: var(--spacer-lg);
    padding-right: var(--spacer-lg);
  }
  @media screen and (min-width: 1280px) {
    padding: var(--spacer-xl);
  }
}
.venue__evaluation {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto auto;
  row-gap: var(--spacer-sm);
  text-decoration: none;
  color: #fff;
  @media screen and (min-width: 1280px) {
    row-gap: var(--spacer);
  }
}
.venue__footer .tts {
  grid-column: 2/3;
  grid-row: 1/2;
  // position: absolute;
  // top: calc( var(--spacer-lg) * 1.125 );
  // right: var(--spacer);
  // @media screen and ( min-width: 640px ) {
  //   top: calc( var(--spacer-lg) * 1.25 );
  //   right: var(--spacer-lg);
  // }
  // @media screen and ( min-width: 1280px ) {
  //   top: calc( var(--spacer-xl) * 1.25 );
  //   right: var(--spacer-xl);
  // }
  path {
    fill: #fff;
  }
}
.venue__evaluation-title {
  @include rfs($font-size-18);
  grid-column: 1/3;
  grid-row: 1/2;
  font-weight: bold;
  line-height: calc(25 / 18);
  text-transform: uppercase;
}
.venue__evaluation-grade--lg {
  grid-column: 1/3;
  grid-row: 2/3;
  width: 3.125rem;
  height: 3.125rem;
  margin-left: auto;
  margin-right: auto;
  font-size: 2rem;
  line-height: 3.125rem;
  color: var(--color-brand-darker);
  @media screen and (min-width: 640px) {
    width: 3.5rem;
    height: 3.5rem;
    font-size: 2.5rem;
  }
}
.venue__evaluation-description {
  @include rfs($font-size-14);
  grid-column: 1/3;
  grid-row: 3/4;
  max-width: 15rem;
  margin-left: auto;
  margin-right: auto;
  font-weight: 600;
  line-height: calc(19 / 14);
}
.venue__evaluation-question {
  @include rfs($font-size-16);
  padding: calc(var(--spacer) + var(--spacer-sm));
  font-weight: 600;
  line-height: 1.33333;
  color: var(--color-background);
  display: block;
  text-decoration: underline;
}
.btn--large {
  display: block;
}
.venue__no-information {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  left: auto;
  right: auto;
  margin-top: -50px;
  background-color: var(--color-brand-darkest);
  z-index: 1;
  @media screen and (min-width: 640px) {
    max-width: 640px;
    margin-top: -50px;
    min-height: 500px;
  }
  @media screen and (min-width: 1280px) {
    max-width: 750px;
  }
  .actions--venue {
    padding-top: 0;
    background-color: var(--color-brand-darkest);
    .actions__title {
      color: var(--color-background);
    }
  }
}
.venue__no-information-content {
  padding: var(--spacer-lg) 0 var(--spacer);
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  .tts {
    position: absolute;
    right: var(--spacer);
    z-index: 10;
    @media screen and (min-width: 640px) {
      top: calc(var(--spacer-lg) + (var(--spacer) / 2));
      right: var(--spacer-lg);
    }
    @media screen and (min-width: 1280px) {
      right: var(--spacer-xl);
    }
    path {
      fill: #fff;
    }
  }
}
.venue__no-information-desc {
  padding: 0 var(--spacer);
  display: flex;
  flex-direction: column;
  span {
    @include rfs($font-size-18);
    color: var(--color-highlight);
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
  }
  svg {
    width: var(--spacer-lg);
    height: var(--spacer-lg);
    margin: var(--spacer-sm) auto;
    path {
      fill: var(--color-highlight);
    }
  }
}
</style>

<style lang="scss">
@import '@/assets/scss/rfs.scss';
.service {
  display: flex;
  flex-flow: column nowrap;
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
.service__icon {
  width: 1rem;
  height: 1rem;
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
  @include rfs($font-size-12);
  grid-column: 1/3;
  grid-row: 2/3;
  line-height: 1.33333;
  color: var(--color-neutral);
}
.venue-block__evaluation {
  @include rfs($font-size-12);
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
