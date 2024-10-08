<script setup lang="ts">
import {reactive, ref, computed} from 'vue'
import {RouterLink, useRoute, useRouter} from 'vue-router'
import {useEventBus, useFetch} from '@vueuse/core'

import DrawPictogram from '@/components/DrawPictogram.vue'
import ImageFocus from '@/components/ImageFocus.vue'
import TextToSpeech from '@/components/TextToSpeech.vue'
import {Service} from '@/model/service.js'
import {PresentialVenue} from '@/model/presential_venue.js'
import {OnlineVenue} from '@/model/online_venue.js'
import {PresentialTask} from '@/model/presential_task'
import {OnlineTask} from '@/model/online_task'
import {useAppNavStore} from '@/stores/app-nav'
import IconError from '@/assets/img/app-icons/error.svg?component'
import IconLike from '@/assets/img/app-icons/instructions/like.svg?component'
import IconDislike from '@/assets/img/app-icons/instructions/dislike.svg?component'
import {Category} from '@/model/category'
import IconPlus from '@/assets/img/app-icons/plus.svg?component'
import SpinnerLoader from '@/components/SpinnerLoader.vue'
import {useAppDataStore} from '@/stores/app-data'
import {useI18n} from 'vue-i18n'

const route = useRoute()
const router = useRouter()

const appNav = useAppNavStore()
const appData = useAppDataStore()

const type = ref<'online' | 'presential'>('presential')

const api_domain = import.meta.env.VITE_APP_API_DOMAIN

const state = reactive({
  active_step: route.hash === '' ? 0 : parseInt(route.hash.replace('#', '')) - 1,
  active_helpful: false,
  was_helpful: null as boolean | null,
  was_liked: null as boolean | null,
  was_disliked: null as boolean | null,
  shown_modal: false,
  opened_modal: false,
  closed_modal: false,
  submitting_feedback: false,
  submitted_feedback: false,
  error_feedback: false
})

const show_prerequisites = ref(false)
const category = ref<Category>()
const service = ref<Service>()
const venue = ref<PresentialVenue | OnlineVenue>()
const task = ref<PresentialTask | OnlineTask>()
const feedback = reactive({
  body: ''
})

const prerequisitesText = computed(() => {
  return task.value !== undefined ? task.value.prerequisites.replace(/(<([^>]+)>)/gi, '!') : null
})

const advanceStep = () => {
  state.active_step++
  if (task.value !== undefined && state.active_step === task.value.steps.length) {
    state.active_helpful = true
  }
}

const rewindStep = () => {
  if (state.active_step === 0 && task.value?.prerequisites.trim() !== '') {
    show_prerequisites.value = true
  } else if (state.active_step >= 1) {
    state.active_step--
    if (task.value !== undefined && state.active_step < task.value.steps.length) {
      state.active_helpful = false
    }
  }
}

const likedStep = async () => {
  state.was_helpful = true
  if (!state.was_liked) {
    await useFetch(`${import.meta.env.VITE_APP_API_DOMAIN}api/${type.value}_tasks/liked`)
      .patch({
        id: appNav.selected.task?.id,
        was_disliked: state.was_disliked
      })
      .json()
    state.was_liked = true
    state.was_disliked = false
  }
}

const dislikedStep = async () => {
  state.was_helpful = false
  if (!state.was_disliked) {
    await useFetch(`${import.meta.env.VITE_APP_API_DOMAIN}api/${type.value}_tasks/disliked`)
      .patch({
        id: appNav.selected.task?.id,
        was_liked: state.was_liked
      })
      .json()
    state.was_disliked = true
    state.was_liked = false
  }
}

const openFeedback = () => {
  state.shown_modal = true
  state.opened_modal = true
  state.closed_modal = false
}

const closeFeedback = () => {
  state.opened_modal = false
  state.closed_modal = true
}

const submitFeedback = async () => {
  state.submitting_feedback = true
  await useFetch(`${import.meta.env.VITE_APP_API_DOMAIN}api/reports/store`)
    .post({
      presential_task_id: type.value === 'presential' ? appNav.selected.task?.id : null,
      online_task_id: type.value === 'online' ? appNav.selected.task?.id : null,
      report: feedback.body
    })
    .json()
  state.submitted_feedback = true
  state.submitting_feedback = false
}

const {data} = await useFetch(
  `${import.meta.env.VITE_APP_API_DOMAIN}api/slugs/getElements?category=${
    route.params.categorySlug
  }&service=${route.params.serviceSlug}&venue=${route.params.venueSlug}&task=${
    route.params.taskSlug
  }&commune_id=${appData.location.commune?.id}`
)
  .get()
  .json()

type.value = data.value.type
appNav.theme = type.value
task.value =
  data.value.type === 'online'
    ? new OnlineTask(data.value.task)
    : new PresentialTask(data.value.task)
category.value = new Category(data.value.category)
service.value = new Service(data.value.service)
venue.value =
  data.value.type === 'online'
    ? new OnlineVenue(data.value.venue)
    : new PresentialVenue(data.value.venue)
appNav.setSelecteds(category.value, service.value, venue.value, task.value)
if (data.value.task.prerequisites.trim() !== '') {
  show_prerequisites.value = true
}
if (task.value.steps.length <= state.active_step) state.active_step = 0

const { t } = useI18n({ useScope: 'global' })
document.title = `${t('titles.taskIn', {
  service: service.value.name,
  venue: venue.value.name,
  task: task.value.title
})} | Pictos`

const bus = useEventBus('close')
const listener = () => {
  router.push(
    '/' +
      appNav.selected.category?.slug +
      '/' +
      appNav.selected.service?.slug +
      '/' +
      appNav.selected.venue?.slug
  )
}
bus.on(listener)
</script>

<template>
  <div class="task__single">
    <template v-if="task && venue && service">
      <header :class="{'header--prerequisites': show_prerequisites}" class="task__header">
        <text-to-speech :text-audio="`${task.title}.`" />
        <h1 class="task__title">{{ task.title }}</h1>
      </header>
      <template v-if="show_prerequisites">
        <div class="task__prerequisites">
          <div class="task__header">
            <text-to-speech :text-audio="`${prerequisitesText}`" />
            <div class="text-formatted" v-html="task.prerequisites"></div>
          </div>
        </div>
        <footer class="page__footer">
          <button
            class="btn btn--large btn--block btn--primary"
            @click="show_prerequisites = false">
            {{ $t('general.next') }}
          </button>
        </footer>
      </template>
      <template v-else>
        <main class="task__main">
          <ol
            v-touch:swipe.left="advanceStep"
            v-touch:swipe.right="rewindStep"
            class="task__steps"
            :class="
              !task.steps.filter((s) => s.pictogram).length ? 'task-steps--without-pictogram' : ''
            ">
            <li
              v-for="(step, index) in task.steps"
              :key="step.id"
              :step="step"
              :class="'task-step' + (index === state.active_step ? ' task-step--active' : '')">
              <figure
                v-if="task instanceof PresentialTask"
                class="task-step__figure"
                :class="{
                  'task-step__figure--without-pictogram':
                    !step.pictogram ||
                    !step.pictogram.images.filter((i: any) => i.layout <= 3).length
                }">
                <div
                  v-if="
                    step.pictogram && step.pictogram.images.filter((i: any) => i.layout <= 3).length
                  "
                  class="step-canvas">
                  <DrawPictogram
                    :layers="step.pictogram.images.filter((i: any) => i.layout <= 3)" />
                </div>
                <div
                  v-if="
                    task instanceof PresentialTask &&
                    task.steps.length &&
                    !task.steps.filter(
                      (s) =>
                        s.pictogram && s.pictogram.images.filter((i: any) => i.layout <= 3).length
                    ).length
                  "
                  :class="
                    'without-pictogram' +
                    (state.active_helpful === true ? ' without-pictogram--hidden' : '')
                  ">
                  <h2 class="without-pictogram__title">{{ $t('task.withoutPictos') }}</h2>
                  <router-link
                    :to="'/crear-pictogramas/' + task.id"
                    class="btn btn--block btn--as-link">
                    {{ $t('task.createPictos') }}
                  </router-link>
                </div>
                <div class="task-step-main">
                  <figcaption class="task-step__legend">
                    <span
                      v-if="step.pictogram && step.pictogram.images.find((i: any) => i.layout == 4)"
                      class="task-action">
                      <img
                        :src="`${step.pictogram.images.find((i: any) => i.layout == 4)?.path}${
                          step.pictogram.images.find((i: any) => i.layout == 4)?.filename
                        }`"
                        class="pictogram__layer--action" />
                    </span>
                    <div class="task-text__number">
                      {{
                        $t('task.stepOf', {
                          activeStep: state.active_step + 1,
                          countSteps: task.steps.length
                        })
                      }}
                    </div>
                    <div class="task-text__description">{{ step.label }}</div>
                    <text-to-speech :text-audio="step.label" />
                  </figcaption>
                </div>
              </figure>
              <figure
                v-if="task instanceof OnlineTask"
                class="task-step__figure task-step__figure--online-focus"
                :class="{'task-step__figure--without-pictogram': !step.image}">
                <div v-if="step.screenshot_url" class="step-canvas">
                  <ImageFocus
                    :lazy="state.active_step > 0"
                    :alt="'Captura de pantalla de ' + task.title"
                    :image="api_domain + step.screenshot_url"
                    :thumbnails="step.thumbnails"
                    :focus-size="step.focus_size"
                    :focus-x="step.focus_x"
                    :focus-y="step.focus_y" />
                </div>
                <div class="task-step-main">
                  <figcaption class="task-step__legend">
                    <span v-if="step.image" class="task-action">
                      <img
                        :src="`${step.image.path}${step.image.filename}`"
                        class="pictogram__layer--action" />
                    </span>
                    <div class="task-text__number">
                      {{
                        $t('task.stepOf', {
                          activeStep: state.active_step + 1,
                          countSteps: task.steps.length
                        })
                      }}
                    </div>
                    <div class="task-text__description">
                      <span>{{ step.label }}</span>
                      <div v-html="step.details" class="task-text__details"></div>
                    </div>
                    <text-to-speech :text-audio="step.label" />
                  </figcaption>
                </div>
              </figure>
            </li>
            <li
              :class="
                'task-step task-helpful' + (state.active_helpful ? ' task-step--active' : '')
              ">
              <h2 class="task-helpful__title">{{ $t('task.thisHelpedYou') }}</h2>
              <div class="task-helpful__answers">
                <button
                  :class="
                    'task-helpful__answer' +
                    (state.was_helpful == true ? ' task-helpful__answer--active' : '')
                  "
                  @click="likedStep">
                  <icon-like class="task-helpful__answer__icon--like"></icon-like>
                </button>
                <button
                  :class="
                    'task-helpful__answer' +
                    (state.was_helpful == false ? ' task-helpful__answer--active' : '')
                  "
                  @click="dislikedStep">
                  <icon-dislike class="task-helpful__answer__icon--like"></icon-dislike>
                </button>
              </div>
              <template
                v-if="
                  task instanceof PresentialTask &&
                  task.steps.length &&
                  !task.steps.filter(
                    (s) =>
                      s.pictogram && s.pictogram.images.filter((i: any) => i.layout <= 3).length
                  ).length
                ">
                <p class="task-helpful__label">{{ $t('task.withoutPictos') }}</p>
                <router-link
                  :to="'/crear-pictogramas/' + task.id"
                  class="btn btn--large btn--block btn--primary btn--filled--skyblue-light">
                  {{ $t('task.createPictos') }}
                </router-link>
              </template>
              <template v-else>
                <router-link
                  :to="{name: 'venue-screen', params: {placeId: venue.id}}"
                  class="btn btn--large btn--block btn--primary btn--filled--skyblue-light">
                  {{
                    $t('general.comebackTo', {
                      name: venue.name
                    })
                  }}
                </router-link>
              </template>
              <button
                :class="
                  'btn--as-link' +
                  (state.was_helpful == false ? '' : ' task-helpful__toggle-feedback--hidden')
                "
                @click="openFeedback">
                {{ $t('task.reportIssue') }}
              </button>
            </li>
          </ol>
          <div
            v-if="!task.steps.length"
            :class="'task-empty' + (state.active_step < 0 ? '' : ' task-step--active')">
            <div class="task-empty__icon">
              <span>!</span>
            </div>
            <h2 class="task-empty__title">{{ $t('task.withoutSteps') }}</h2>
            <template v-if="task instanceof PresentialTask">
              <p class="task-empty__description">
                {{ $t('task.createWithSteps') }}
              </p>
              <router-link
                to="/agregar-tarea"
                class="btn btn--primary btn--large btn--block btn--icon">
                <IconPlus /> {{ $t('task.createNewTask') }}
              </router-link>
            </template>
          </div>
          <div class="task__nav">
            <button
              class="btn btn--large btn--secondary"
              :class="{
                'btn--hidden':
                  state.active_step === 0 && task.prerequisites.trim() === '' && !show_prerequisites
              }"
              @click="rewindStep">
              {{ $t('general.previous') }}
            </button>
            <button
              :class="
                'btn btn--large btn--primary' +
                (state.active_step + 1 < task.steps.length + 1 ? '' : ' btn--hidden')
              "
              @click="advanceStep">
              {{ $t('general.next') }}
            </button>
          </div>
        </main>
        <!-- Pestaña inferior para feedback -->
        <button
          :class="
            'task__step-feedback' +
            (state.active_helpful === true || state.opened_modal === true
              ? ' task__step-feedback--hidden'
              : '')
          "
          @click="openFeedback">
          {{ $t('task.reportIssueWith') }}
        </button>
        <!-- Bloque y formulario para feedback -->
        <div
          :class="
            'modal' +
            (state.shown_modal ? ' modal--fade' : '') +
            (state.closed_modal ? ' modal--fade-out' : '')
          ">
          <div class="modal__backdrop">
            <div
              :class="
                'task-feedback' + (state.submitted_feedback ? ' task-feedback--submitted' : '')
              ">
              <button type="button" class="modal__close" @click="closeFeedback">
                <icon-error></icon-error>
              </button>
              <form
                v-if="!state.submitted_feedback"
                class="task-feedback__form custom-control--text"
                @submit.prevent="submitFeedback">
                <h2 class="task-feedback__title">{{ $t('task.reportIssueWith') }}</h2>
                <textarea
                  v-model="feedback.body"
                  class="task-feedback__control"
                  :placeholder="$t('task.exampleIssue')"
                  required></textarea>
                <button
                  :disabled="state.submitting_feedback"
                  :class="
                    'task-feedback__submit btn btn--large btn--block' +
                    (feedback.body === '' ? ' btn--ghost-primary' : ' btn--primary')
                  ">
                  {{ $t('general.send') }}
                  <SpinnerLoader v-if="state.submitting_feedback" />
                </button>
              </form>
              <div v-if="state.submitted_feedback" class="thanks-message">
                <text-to-speech :text-audio="$t('task.thanks')" />
                <span class="thanks-message__icon">
                  <icon-like></icon-like>
                </span>
                <p class="thanks-message__title">{{ $t('task.thanks') }}</p>
                <button
                  type="button"
                  class="btn btn--large btn--primary btn--block"
                  @click="closeFeedback">
                  {{ $t('general.close') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/rfs.scss';
.task__single {
  display: flex;
  flex-flow: column nowrap;
  overflow-x: hidden;
  background-color: var(--color--skyblue-light);
  padding-top: 50px;
  min-height: 100dvh;
  @media screen and (min-width: 540px) {
    padding-top: 62px;
  }
  .theme-online & {
    background-color: var(--color--yellow-light);
  }
}
.task__header {
  position: relative;
  text-align: center;
  padding: var(--spacer--200) var(--spacer--400) var(--spacer--400);
  border-radius: var(--spacer--500);
  font-weight: 600;
}
.task__title {
  @include rfs($font-size-16);
  margin-bottom: var(--spacer--200);
  line-height: 1.3888888889;
  color: var(--color--blue-dark);
  padding-left: var(--spacer--500);
  padding-right: var(--spacer--500);
}
.task__description {
  @include rfs($font-size-14);
  color: var(--color--blue-dark);
  margin: var(--spacer--200) 0;
  a {
    color: var(--color--blue-dark);
  }
}
.tts {
  position: absolute;
  top: var(--spacer--200);
  right: var(--spacer--400);
  path {
    fill: var(--color--blue-dark);
  }
}
.task__main {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;
  justify-content: space-between;
}
.task__steps {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 0;
  // Hack Safari
  padding: 0 var(--spacer--400);
  .step-canvas {
    .container-img-preview {
      min-height: 13rem;
      max-height: 41vh;
    }
  }
}
.task-step__figure {
  display: grid;
  grid-template-rows: auto 1fr;
  flex-grow: 1;
  background-color: var(--color--white);
  border-radius: var(--spacer--500);
  overflow: hidden;
  grid-template-columns: 1fr;
}
.task-step__figure--without-pictogram {
  .task-step__legend {
    height: 30vh;
    @include rfs($font-size-18);
    .pictogram__layer--action {
      height: 75px;
      margin-right: var(--spacer-sm);
    }
  }
}
.step-canvas {
  position: relative;
  width: 100%;
  height: 100%;
  // Hack Safari
  @media not all and (min-resolution: 0.001dpcm) {
    @supports (-webkit-appearance: none) {
      width: 100%;
      height: 100%;
    }
  }
}
.task-step {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  transform: translateX(100%);
  transition:
    opacity 0.25s 0.25s ease-out,
    transform 0 0;
  list-style: none;
  opacity: 0;
  border-radius: var(--spacer--500);
}
.task-step--active {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;
  transform: translateX(0%);
  transition:
    opacity 0.25s ease-in,
    transform 0 0.5s;
  opacity: 1;
}
.task-step__layer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
}
.task-step__layer--subject {
  z-index: 3;
}
.task-step__layer--context {
  z-index: 2;
}
.task-step__layer--landmark {
  z-index: 1;
}
.task-step-main {
  position: relative;
  padding: var(--spacer--500) var(--spacer--400) var(--spacer--600);
}
.task-step__legend {
  min-height: 8vh;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-auto-rows: auto 1fr;
  column-gap: var(--spacer--300);
  row-gap: var(--spacer--200);
  // Hack Safari
  @media not all and (min-resolution: 0.001dpcm) {
    @supports (-webkit-appearance: none) {
      height: 100%;
    }
  }
  .tts {
    margin-left: var(--spacer);
    position: absolute;
    right: var(--spacer--400);
    top: var(--spacer--500);
  }
}
.task-action {
  grid-column: 1/2;
  grid-row: 2/3;
}
.task-text__number {
  font-size: 0.75rem;
  opacity: 0.7;
  font-weight: 700;
  color: var(--color--blue-dark);
  text-transform: uppercase;
  grid-column: 2/3;
  grid-row: 1/2;
}
.task-text__description {
  @include rfs($font-size-14);
  font-weight: 700;
  grid-column: 2/3;
  grid-row: 2/3;
}
.task-text__details {
  @include rfs($font-size-14);
  font-weight: 600;
  grid-column: 2/3;
  grid-row: 3;
}

// Último paso, donde se pregunta si fue de ayuda
.task-helpful {
  display: flex;
  flex: column nowrap;
  justify-content: center;
  align-items: center;
  padding: var(--spacer);
  color: var(--color--blue-dark);
  background-color: var(--color--carolinablue);
  height: 55vh;
  .theme-online & {
    background-color: var(--color--yellow);
  }
  @media screen and (min-width: 540px) {
    padding-left: var(--spacer--600);
    padding-right: var(--spacer--600);
  }
  @media screen and (min-width: 1280px) {
    padding-left: var(--spacer-xl);
    padding-right: var(--spacer-xl);
  }
  .btn--as-link {
    margin-top: var(--spacer--500);
  }
}
.task-helpful__title {
  @include rfs($font-size-18);
  margin-bottom: var(--spacer);
  text-align: center;
}
.task-helpful__answers {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacer);
  width: 100%;
  margin-bottom: var(--spacer--600);
  @media screen and (max-width: 400px) {
    // Hack Safari
    @media not all and (min-resolution: 0.001dpcm) {
      @supports (-webkit-appearance: none) {
        display: flex;
        justify-content: space-between;
        gap: normal;
      }
    }
  }
}
.task-helpful__answer {
  cursor: pointer;
  display: block;
  padding: var(--spacer--400);
  text-align: center;
  background-color: transparent;
  border: 1px solid var(--color--blue);
  border-radius: var(--spacer--300);
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: var(--color--skyblue);
    .theme-online & {
      background-color: var(--color--yellow);
    }
  }
  &.task-helpful__answer--active {
    background: var(--color--skyblue-light);
    color: var(--color--blue-dark);
    .theme-online & {
      background-color: var(--color--yellow-light);
    }
  }
  @media screen and (max-width: 400px) {
    // Hack Safari
    @media not all and (min-resolution: 0.001dpcm) {
      @supports (-webkit-appearance: none) {
        flex: 0 1 47%;
      }
    }
  }
}
.task-helpful__label {
  @include rfs($font-size-14);
  margin-bottom: var(--spacer);
  font-weight: 700;
}
[class^='task-helpful__answer__icon'] {
  width: 27px;
  height: 27px;
}
.btn--as-link {
  color: var(--color--blue-dark);
  font-weight: 600;
  &.task-helpful__toggle-feedback--hidden {
    display: none;
  }
}
// Navegación
.task__nav {
  display: grid;
  gap: 0 var(--spacer-sm);
  grid-template-columns: 1fr 1fr;
  padding: var(--spacer--600) var(--spacer--400) var(--spacer--500);
  margin-bottom: var(--spacer--700);
}
.task__steps-indicator {
  margin-top: var(--spacer-xs);
  margin-bottom: var(--spacer-xs);
  text-align: center;
  grid-column: 1/3;
  li {
    display: inline-block;
    width: calc(var(--spacer) * 0.35);
    height: calc(var(--spacer) * 0.35);
    margin: 0 calc(var(--spacer) * 0.125);
    list-style: none;
    text-indent: -9999em;
    line-height: calc(var(--spacer) * 0.35);
    background: #e1e1e1;
    border-radius: var(--spacer);
  }
}
li.task__step-indicator--active {
  background: var(--color--blue);
}
// Botón de feedback
.task__step-feedback {
  @include rfs($font-size-14);
  font-weight: 700;
  cursor: pointer;
  position: fixed;
  display: block;
  width: calc(100% - var(--spacer));
  bottom: 0;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  padding: calc(var(--spacer) * 0.65);
  background: var(--color--skyblue);
  border-top-left-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius);
  border: 0;
  transition: var(--transition-base);
  &.task__step-feedback--hidden {
    bottom: -100%;
    opacity: 0;
  }
  .theme-online & {
    background-color: var(--color--yellow);
  }
  @media screen and (min-width: 620px) {
    max-width: calc(620px - var(--spacer--400));
  }
  @media screen and (min-width: 1280px) {
    max-width: calc(560px - var(--spacer--600));
  }
}
// Modal de feedback
.task-feedback {
  position: absolute;
  width: calc(100vw - var(--spacer--400));
  height: 100%;
  top: 100%;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  padding: var(--spacer--400);
  background-color: var(--color--skyblue-light);
  transition: top 0.35s ease;
  border-top-left-radius: var(--spacer--400);
  border-top-right-radius: var(--spacer--400);
  overflow: hidden;
  .theme-online & {
    background-color: var(--color--yellow-light);
  }
  .modal--fade:not(.modal--fade-out) & {
    top: var(--spacer--700);
    overflow: unset;
  }
  &.task-feedback--submitted {
    transition: var(--transition-base);
    .task-feedback__form {
      animation: quickScaleDown 0s 0.5s linear forwards;
    }
  }
  @media screen and (min-width: 620px) {
    max-width: calc(620px - var(--spacer--400));
    margin-left: auto;
    margin-right: auto;
    padding: var(--spacer--600) var(--spacer--400) var(--spacer--400);
  }
  @media screen and (min-width: 1280px) {
    max-width: calc(560px - var(--spacer--600));
  }
  .modal__close {
    cursor: pointer;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--spacer--700);
    height: var(--spacer--700);
    top: calc(var(--spacer--700) * -1);
    right: var(--spacer-xs);
    line-height: 0;
    background: none;
    border: none;
    svg {
      width: 1rem;
      height: 1rem;
      :deep(path) {
        fill: var(--color--white);
      }
    }
  }
}
.task-feedback__form {
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  padding-bottom: var(--spacer--700);
  @media screen and (min-width: 540px) {
    padding-bottom: 0;
  }
}
.task-feedback__title {
  @include rfs($font-size-16);
  margin-bottom: var(--spacer);
}
.task-feedback__control {
  height: 40vh;
  min-height: 80px;
  max-height: 250px;
}
.task-feedback__submit {
  margin-top: auto;
  margin-bottom: var(--spacer--700);
}
.task-feedback__response {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
}
.task-feedback__response-message {
  @include rfs($font-size-18);
  max-width: 75%;
  margin-top: auto;
  margin-bottom: var(--spacer--600);
  font-weight: bold;
  line-height: calc(25 / 18);
  text-transform: uppercase;
}

/*Tarea sin pictogramas*/
.without-pictogram {
  color: var(--color--blue-dark);
  grid-row: 1/3;
  grid-column: 1/3;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacer--300);
  padding: var(--spacer--500) var(--spacer--400);
  background-color: var(--color--skyblue);
  min-height: 41vh;
  & + .task-step__legend {
    grid-column: 1/3;
  }
  .theme-online & {
    background-color: var(--color--yellow);
  }
}
.without-pictogram__title {
  @include rfs($font-size-18);
  line-height: 1.3rem;
  font-weight: 700;
  text-align: center;
}
.without-pictogram--hidden {
  display: none;
}
.task-steps--without-pictogram {
  flex-grow: initial;
  .step-canvas {
    display: none;
  }
  .task-step__legend {
    height: auto;
  }
}

/*Tarea sin pasos*/
.task-empty--hidden {
  display: none;
}
.task-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color--skyblue-light);
  padding: var(--spacer--700) var(--spacer--500) var(--spacer--600);
  flex-grow: 1;
  gap: var(--spacer--400);
  .btn {
    max-width: 500px;
  }
}
.task-empty__icon {
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
.task-empty__title {
  @include rfs($font-size-18);
  color: var(--color--blue-dark);
  text-align: center;
  font-weight: 800;
  @media screen and (min-width: 540px) {
    margin-bottom: var(--spacer);
  }
}
.task-empty__description {
  @include rfs($font-size-16);
  color: var(--color--blue-dark);
  text-align: center;
  font-weight: 600;
  margin-bottom: var(--spacer-xl);
}
.task-empty + .task__nav {
  display: none;
}
.pictogram__layer--action {
  height: 30px;
}

// .text-formatted * {
//   all: revert !important;
// }
.task__prerequisites {
  .task__header {
    background-color: var(--color--white);
    text-align: left;
    margin: 0 var(--spacer--400);
    padding-top: var(--spacer--500);
    .tts {
      top: var(--spacer--500);
    }
  }
  :deep(.text-formatted) {
    h2 {
      @include rfs($font-size-16);
      font-weight: 700;
      color: var(--color--blue-dark);
      margin-bottom: var(--spacer--500);
    }
    h3 {
      @include rfs($font-size-16);
      font-weight: 700;
      color: var(--color--blue-dark);
      margin-bottom: var(--spacer--500);
    }
    ul,
    ol {
      @include rfs($font-size-14);
      color: var(--color--blue-dark);
      margin-left: var(--spacer--500);
      li {
        margin-bottom: var(--spacer--300);
      }
    }
  }
}
.task__single .page__footer {
  padding: var(--spacer--600) var(--spacer--400) var(--spacer--400);
}
.task-feedback--submitted {
  .thanks-message {
    position: relative;
    .tts {
      position: relative;
      top: initial;
      right: initial;
      margin-bottom: var(--spacer--500);
    }
  }
}

.task-step__figure--online-focus {
  .step-canvas {
    display: block;
  }
  .task-text__description {
    span {
      display: block;
      margin-bottom: var(--spacer--200);
    }
    .task-text__details {
      font-weight: 600;
    }
  }
}
</style>
