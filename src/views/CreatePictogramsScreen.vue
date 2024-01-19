<script setup lang="ts">
import {computed, defineComponent, reactive, ref} from 'vue'
import {useRouter} from 'vue-router'
import {useEventBus, useFetch} from '@vueuse/core'

import DrawPictogram from '@/components/DrawPictogram.vue'
import SpinnerLoader from '@/components/SpinnerLoader.vue'
import TextToSpeech from '@/components/TextToSpeech.vue'
import {PresentialTask} from '@/model/presential_task'
import {useAppNavStore} from '@/stores/app-nav'
import type {Image} from '@/model/image'
import IconLike from '@/assets/img/app-icons/instructions/like.svg?component'
import IconCheck from '@/assets/img/app-icons/support/check2.svg?component'

const router = useRouter()

const appNav = useAppNavStore()

const proposalId = ref<number>(0)
const submitted = ref<boolean>(false)
const task = ref<PresentialTask>(appNav.selected.task as PresentialTask)
const images = ref<Array<Image>>([])
const pictograms = reactive<
  Array<{
    subject: number | null
    context: number | null
    landmark: number | null
  }>
>(
  Array(task.value.steps.length)
    .fill(null)
    .map(() => ({subject: null, context: null, landmark: null}))
)

const show_subscription_form = ref<boolean>(false)
const submitting = ref<boolean>(false)
const notification_submitted = ref<boolean>(false)
const subscription_email = ref<string>('')

const {data} = await useFetch(`${import.meta.env.VITE_APP_API_DOMAIN}api/images`)
  .get()
  .json()

images.value = data.value

const active_step = ref(0)
const tab = ref<'subject' | 'landmark' | 'context'>('subject')

const advanceStep = () => {
  if (active_step.value < task.value.steps.length - 1) {
    active_step.value++
    tab.value = 'subject'
  }
}
const rewindStep = () => {
  if (active_step.value > 0) {
    active_step.value--
    tab.value = 'subject'
  }
}

const setImage = (image: Image) => {
  pictograms[active_step.value][tab.value] = image.id
}

const canContinue = () => {
  return (
    pictograms[active_step.value].subject !== null &&
    pictograms[active_step.value].context !== null &&
    pictograms[active_step.value].landmark !== null
  )
}

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

const showImages = computed(() => {
  return images.value.filter((i: Image) =>
    tab.value === 'subject'
      ? i.layout === 1
      : tab.value === 'landmark'
      ? i.layout === 2
      : i.layout === 3
  )
})

const getImages = computed(() => {
  return images.value.filter(
    (i: Image) =>
      i.id === pictograms[active_step.value].subject ||
      i.id === pictograms[active_step.value].context ||
      i.id === pictograms[active_step.value].landmark
  )
})

const saveProposal = async () => {
  submitting.value = true
  const {data} = await useFetch(`${import.meta.env.VITE_APP_API_DOMAIN}api/proposal_tasks/store`)
    .post({
      presential_task_id: task.value.id,
      proposal: task.value.steps.map((step, index) => {
        return {
          step_id: step.id,
          layers: [pictograms[index].subject, pictograms[index].context, pictograms[index].landmark]
        }
      })
    })
    .json()
  proposalId.value = data.value.id
  submitted.value = true
  submitting.value = false
}

const submitSubscription = async () => {
  submitting.value = true
  await useFetch(`${import.meta.env.VITE_APP_API_DOMAIN}api/proposal_tasks/addNotification`)
    .post({
      id: proposalId.value,
      email: subscription_email.value
    })
    .json()
  notification_submitted.value = true
  submitting.value = false
}
</script>

<template>
  <div class="task__single">
    <header class="task__header">
      <text-to-speech :text-audio="`${task.title}.`" />
      <h1 class="task__title">{{ task.title }}</h1>
    </header>
    <template v-if="!submitted">
      <main class="task__main">
        <ol v-touch:swipe.left="advanceStep" v-touch:swipe.right="rewindStep" class="task__steps">
          <li
            v-for="(step, index) in task.steps"
            :key="step.id"
            :step="step"
            :class="'task-step' + (index === active_step ? ' task-step--active' : '')">
            <figure class="task-step__figure">
              <div class="step-canvas">
                <DrawPictogram :layers="getImages" />
              </div>
              <div class="task-step-main">
                <figcaption class="task-step__legend">
                  <div class="task-step__number">
                    Paso {{ active_step + 1 }} de {{ task.steps.length }}
                  </div>
                  <div class="task-text__description">{{ step.label }}</div>
                  <text-to-speech :text-audio="step.label" />
                </figcaption>
              </div>
            </figure>
          </li>
        </ol>
        <div class="select-pictogram">
          <div class="select-pictogram__filter">
            <button
              class="btn btn--primary btn--block btn--filled--skyblue-light"
              :class="{
                'btn--active': tab === 'subject'
              }"
              @click="tab = 'subject'">
              Persona <icon-check class="select-pictogram__check" />
            </button>
            <button
              class="btn btn--primary btn--block btn--filled--skyblue-light"
              :class="{
                'btn--active': tab === 'landmark'
              }"
              @click="tab = 'landmark'">
              Objeto <icon-check class="select-pictogram__check" />
            </button>
            <button
              class="btn btn--primary btn--block btn--filled--skyblue-light"
              :class="{
                'btn--active': tab === 'context'
              }"
              @click="tab = 'context'">
              Espacio <icon-check class="select-pictogram__check" />
            </button>
          </div>
          <h2 class="select-pictogram__title">Elige una persona para esta capa</h2>
          <div class="select-pictogram__img">
            <div
              v-for="(image, index) in showImages"
              :key="index"
              @click="setImage(image)"
              :class="{
                image__active: image.id === pictograms[active_step][tab]
              }">
              <img :src="`${image.path}${image.filename}`" style="width: 40%" />
              <!-- <component :is="image.component" /> -->
              <div class="select-pictogram__label">{{ image.label }}</div>
            </div>
          </div>
        </div>
        <div class="task__nav">
          <span class="task__nav-selection">Capa <strong>1</strong> de <strong>3</strong> seleccionada</span>
          <button
            class="btn btn--large btn--secondary"
            :class="{
              'btn--hidden': active_step === 0 && task.prerequisites.trim() === ''
            }"
            @click="rewindStep">
            Anterior
          </button>
          <button
            v-if="active_step < task.steps.length - 1"
            :disabled="!canContinue()"
            class="btn btn--large btn--primary btn--block"
            @click="advanceStep">
            Siguiente
          </button>
          <button
            v-if="active_step === task.steps.length - 1"
            :disabled="!canContinue() || submitting"
            class="btn btn--large btn--primary btn--block"
            @click="saveProposal">
            Guardar
            <SpinnerLoader v-if="submitting" />
          </button>
        </div>
      </main>
    </template>
    <template v-else>
      <div class="thanks-message">
        <text-to-speech
          :text-audio="
            'Gracias por tu aporte\n\n\n\n\n\n' +
            'Estas ayudando al mundo a ser un lugar más accesible\n\n\n\n\n\n' +
            'Volver\n\n\n\n\n\n' +
            '¿Quieres que te avisemos cuando publiquemos tu aporte?'
          " />
        <span class="thanks-message__icon">
          <icon-like></icon-like>
        </span>
        <h2 class="thanks-message__title">Gracias por tu aporte</h2>
        <p class="thanks-message__description">
          Estás ayudando al mundo a ser un lugar más accesible
        </p>
        <router-link
          :to="
            '/' +
            appNav.selected.category?.slug +
            '/' +
            appNav.selected.service?.slug +
            '/' +
            appNav.selected.venue?.slug
          "
          class="btn btn--primary btn--block btn--large btn--filled--skyblue">
          Volver a {{ appNav.selected.venue?.name }}
        </router-link>
      </div>
      <footer class="thanks-message-footer">
        <template v-if="notification_submitted">
          <p class="thanks-message__description">
            Muchas gracias, te avisaremos cuando tu aporte sea aprobado.
          </p>
        </template>
        <template v-else>
          <p class="thanks-message__description">
            ¿Quieres que te avisemos cuando publiquemos tu aporte?
          </p>
          <template v-if="!show_subscription_form">
            <button
              type="button"
              class="btn btn--large btn--block btn--primary"
              @click="show_subscription_form = true">
              Sí, avísame
            </button>
          </template>
          <template v-else>
            <div class="thanks-message__form">
              <div class="subscription-form custom-control">
                <input
                  v-model="subscription_email"
                  type="email"
                  class="thanks-message__email"
                  placeholder="Escribe tu email aquí" />
                <button
                  class="btn btn--large btn--primary btn--icon"
                  @click="submitSubscription"
                  :disabled="submitting">
                  Enviar
                  <SpinnerLoader v-if="submitting" />
                </button>
              </div>
            </div>
          </template>
        </template>
      </footer>
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
  padding-bottom: var(--spacer--700);
}
.task__single--pictogram {
  background-color: var(--color--skyblue);
}
.task__main {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;
}
.task__steps {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;
  max-height: 55vh;
  // Hack Safari
  padding: 0 var(--spacer--400) var(--spacer--400);
  @media not all and (min-resolution: 0.001dpcm) {
    @supports (-webkit-appearance: none) {
      height: 100%;
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
  // Hack Safari
  @media not all and (min-resolution: 0.001dpcm) {
    @supports (-webkit-appearance: none) {
      position: absolute;
      display: flex;
      flex-flow: column nowrap;
      flex-grow: unset;
      width: 100%;
      height: 100%;
    }
  }
}
.step-canvas {
  position: relative;
  width: 100%;
  min-height: 13rem;
  max-height: 41vh;
  height: 100%;
  // Hack Safari
  @media not all and (min-resolution: 0.001dpcm) {
    @supports (-webkit-appearance: none) {
      min-height: 13rem;
      max-height: 41vh;
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
  background-color: var(--color--carolinablue);
  padding: var(--spacer--400) var(--spacer--400) var(--spacer--500);
}
.task-step__legend {
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
    top: var(--spacer--400);
  }
}
.task-action {
  grid-column: 1/2;
  grid-row: 2/3;
}
.task-step__number {
  font-size: 0.625rem;
  opacity: 0.7;
  font-weight: 700;
  color: var(--color--blue-dark);
  letter-spacing: 0.0625rem;
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

// Navegación
.task__nav {
  display: grid;
  gap: var(--spacer--300);
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  padding: var(--spacer--400) var(--spacer--400) var(--spacer--400);
  background-color: var(--color--skyblue-light);
  position: fixed;
  width: 100%;
  right: 0;
  left: 0;
  bottom: 0;
  margin: 0 auto;
  box-shadow: 0px -4px 30px 0px rgba(4, 28, 66, 0.40);
  aspect-ratio: 320/568;
  max-width: 568px;
  max-height: 112px;
  @media screen and (min-width: 560px) {
    padding: var(--spacer--400) var(--spacer--400) var(--spacer--400);
    max-width: 640px;
  }
  @media screen and (min-width: 1280px) {
    max-width: 495px;
  }
  .btn {
    grid-row: 2;
  }
  .task__nav-selection {
    @include rfs($font-size-14);
    font-weight: 600;
    color: var(--color--blue-dark);
    grid-row: 1;
    grid-column: 1/3;
    display: block;
    text-align: center;
  }
}

.pictogram__layer--action {
  height: 30px;
  @media screen and (min-width: 640px) {
    height: 40px;
  }
}

.task__single .page__footer {
  padding: var(--spacer-lg);
}

// Filtrar pictograma
.select-pictogram__filter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacer--300);
  padding: var(--spacer--300) var(--spacer--400) var(--spacer--500);
  .btn {
    padding-left: var(--spacer--200);
    padding-right: var(--spacer--200);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacer--200);
    &.btn--active {
      :deep(path) {
        fill: var(--color--white);
      }
    }
  }
}
.select-pictogram__check {
  width: auto;
  height: 11px;
  @media screen and (min-width: 640px) {
    height: 14px;
    margin-left: var(--spacer--200);
  }
  :deep(path) {
    fill: var(--color--blue-dark);
  }
}
.select-pictogram__title {
  @include rfs($font-size-16);
  font-weight: 700;
  color: var(--color--blue-dark);
  text-align: center;
  margin-top: var(--spacer--200);
}
.select-pictogram__img {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--spacer--400);
  padding: var(--spacer--500) var(--spacer--400) var(--spacer--700);
  margin-bottom: var(--spacer--700);
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: var(--spacer--300);
    cursor: pointer;
    img {
      width: 100% !important;
      background-color: var(--color--white);
      border: 1px solid var(--color--blue-dark);
      border-radius: var(--spacer--500);
    }
  }
  .image__active {
    position: relative;
    img {
      border-width: 2px;
    }
    &::before {
      content: '';
      background-image: url("data:image/svg+xml,%0A%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='15' cy='15' r='14.5' fill='%23F6C254' stroke='%23041C42'/%3E%3Cpath d='M12.3464 21.3786L12.7 21.7321L13.0536 21.3786L23.6536 10.7786L24.0071 10.425L23.6536 10.0714L22.2286 8.64645L21.875 8.29289L21.5214 8.64645L12.7 17.4679L8.77855 13.5464L8.425 13.1929L8.07145 13.5464L6.64645 14.9714L6.29289 15.325L6.64645 15.6786L12.3464 21.3786Z' fill='%23CAE0FF' stroke='%23041C42'/%3E%3C/svg%3E%0A");
      background-repeat: no-repeat;
      position: absolute;
      top: var(--spacer--400);
      right: var(--spacer--400);
      width: 2rem;
      height: 2rem;
    }
  }
}
.select-pictogram__label {
  @include rfs($font-size-14);
  font-weight: 600;
}
</style>
