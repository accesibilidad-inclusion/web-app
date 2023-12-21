<script setup lang="ts">
import {computed, reactive, ref} from 'vue'
import {useRouter} from 'vue-router'
import {useEventBus, useFetch} from '@vueuse/core'

import DrawPictogram from '@/components/DrawPictogram.vue'
import TextToSpeech from '@/components/TextToSpeech.vue'
import {PresentialTask} from '@/model/presential_task'
import {useAppNavStore} from '@/stores/app-nav'
import type {Image} from '@/model/image'

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
const submitting_subscription = ref<boolean>(false)
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
}

const submitSubscription = async () => {
  submitting_subscription.value = true
  await useFetch(`${import.meta.env.VITE_APP_API_DOMAIN}api/proposal_tasks/addNotification`)
    .post({
      id: proposalId.value,
      email: subscription_email.value
    })
    .json()
  notification_submitted.value = true
  submitting_subscription.value = false
}
</script>

<template>
  <div class="task__single">
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
                <div class="task-step__number">
                  Paso {{ active_step + 1 }} de {{ task.steps.length }}
                </div>
                <figcaption class="task-step__legend">
                  <div class="task-step__legend-text">
                    <!-- <span
                      v-if="
                        step.pictogram && step.pictogram.images.find((i: any) => i.layout == 4)
                      ">
                      <img
                        :src="`${step.pictogram.images.find((i: any) => i.layout == 4)?.path}${
                          step.pictogram.images.find((i: any) => i.layout == 4)?.filename
                        }`"
                        class="pictogram__layer--action" />
                    </span> -->
                    {{ step.label }}
                  </div>
                  <text-to-speech :text-audio="step.label" />
                </figcaption>
              </div>
            </figure>
          </li>
        </ol>
        <div>
          <div>
            <button
              class="btn btn--large btn--secondary"
              :class="{
                'btn--active': tab === 'subject'
              }"
              @click="tab = 'subject'">
              Persona
            </button>
            <button
              class="btn btn--large btn--secondary"
              :class="{
                'btn--active': tab === 'landmark'
              }"
              @click="tab = 'landmark'">
              Objeto
            </button>
            <button
              class="btn btn--large btn--secondary"
              :class="{
                'btn--active': tab === 'context'
              }"
              @click="tab = 'context'">
              Espacio
            </button>
          </div>
          <div>
            <div
              v-for="(image, index) in showImages"
              :key="index"
              @click="setImage(image)"
              :class="{
                image__active: image.id === pictograms[active_step][tab]
              }">
              <img :src="`${image.path}${image.filename}`" style="width: 40%" />
              <div>{{ image.label }}</div>
            </div>
          </div>
        </div>
        <div class="task__nav">
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
            class="btn btn--large btn--primary"
            @click="advanceStep">
            Siguiente
          </button>
          <button
            v-if="active_step === task.steps.length - 1"
            :disabled="!canContinue()"
            class="btn btn--large btn--primary"
            @click="saveProposal">
            Guardar
          </button>
        </div>
      </main>
    </template>
    <template v-else>
      <text-to-speech
        :text-audio="
          'Gracias por tu aporte\n\n\n\n\n\n' +
          'Estas ayudando al mundo a ser un lugar más accesible\n\n\n\n\n\n' +
          'Volver\n\n\n\n\n\n' +
          '¿Quieres que te avisemos cuando publiquemos tu aporte?'
        " />
      <h2 class="onboarding__title">
        Gracias por<br />
        tu aporte
      </h2>
      <p class="onboarding__description">
        Estás ayudando al mundo a<br />
        ser un lugar más accesible
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
        class="onboarding__link">
        Volver a {{ appNav.selected.venue?.name }}
      </router-link>
      <footer class="onboarding__footer">
        <template v-if="notification_submitted">
          <p class="onboarding__description subscription-form__description">
            Muchas gracias, te avisaremos cuando tu aporte sea aprobado.
          </p>
        </template>
        <template v-else>
          <p class="onboarding__description subscription-form__description">
            ¿Quieres que te avisemos cuando publiquemos tu aporte?
          </p>
          <template v-if="!show_subscription_form">
            <button
              type="button"
              class="btn btn--block btn--ghost subscription-form__submit"
              @click="show_subscription_form = true">
              Sí, avísame
            </button>
          </template>
          <template v-else>
            <form class="subscription-form" @submit="submitSubscription">
              <input
                v-model="subscription_email"
                type="email"
                class="subscription-form__control"
                placeholder="Escribe tu email aquí" />
              <button
                type="submit"
                class="btn btn--ghost subscription-form__submit"
                :disabled="submitting_subscription">
                Enviar
                <template v-if="submitting_subscription">
                  <clip-loader
                    :loading="submitting_subscription"
                    :color="'#fff'"
                    :size="'1rem'"></clip-loader>
                </template>
              </button>
            </form>
          </template>
        </template>
      </footer>
    </template>
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/rfs.scss';
.task__single {
  display: flex;
  flex-flow: column nowrap;
  overflow-x: hidden;
  background-color: var(--color--skyblue-light);
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
  // flex-grow: 1;
  // max-height: 55vh;
  // Hack Safari
  padding: var(--spacer--400) var(--spacer--500);
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
  background-color: var(--color--white);
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
}
.task-step__number {
  font-size: 0.625rem;
  opacity: 0.7;
  font-weight: 700;
  color: var(--color-blue-dark);
  letter-spacing: 0.0625rem;
  text-transform: uppercase;
  position: absolute;
  left: 56px;
  top: var(--spacer--400);
}
.task-step__legend {
  @include rfs($font-size-16);
  display: flex;
  align-items: center;
  padding: var(--spacer--500) var(--spacer--300) var(--spacer--400);
  line-height: calc(22 / 16);
  font-weight: bold;
  justify-content: space-between;
  min-height: 14vh;
  @media screen and (min-width: 640px) {
    padding: var(--spacer--600) var(--spacer--400) var(--spacer--500);
  }
  // Hack Safari
  @media not all and (min-resolution: 0.001dpcm) {
    @supports (-webkit-appearance: none) {
      height: 100%;
    }
  }
  .tts {
    margin-left: var(--spacer);
    align-self: flex-start;
  }
}
.task-step__legend-text {
  font-size: var(--font-size--400);
  display: flex;
  align-items: center;
  gap: 1rem;
}
// Navegación
.task__nav {
  display: grid;
  gap: 0 var(--spacer-sm);
  grid-template-columns: 1fr 1fr;
  padding: var(--spacer) var(--spacer) var(--spacer-lg);
  @media screen and (min-width: 640px) {
    padding: var(--spacer-lg) var(--spacer-lg) calc(var(--spacer-lg) + 1.5rem);
  }
  @media screen and (min-width: 1280px) {
    padding-left: var(--spacer-xl);
    padding-right: var(--spacer-xl);
  }
}
// Modal de feedback
.task-feedback {
  position: absolute;
  width: calc(100vw - var(--spacer));
  height: 100%;
  top: 100%;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  padding: var(--spacer);
  background-color: var(--color-brand-lighter);
  transition: top 0.35s ease;
  border-top-left-radius: var(--spacer);
  border-top-right-radius: var(--spacer);
  overflow: hidden;
  .modal--fade:not(.modal--fade-out) & {
    top: var(--spacer-lg);
    overflow: unset;
  }
  &.task-feedback--submitted {
    color: var(--color-highlight);
    background-color: var(--color-brand-darkest);
    transition: var(--transition-base);
    .task-feedback__form {
      animation: quickScaleDown 0s 0.5s linear forwards;
    }
  }
  @media screen and (min-width: 640px) {
    max-width: calc(640px - var(--spacer));
    margin-left: auto;
    margin-right: auto;
    padding: var(--spacer-lg);
  }
  @media screen and (min-width: 1280px) {
    max-width: calc(750px - var(--spacer-lg));
    padding-left: var(--spacer-xl);
    padding-right: var(--spacer-xl);
  }
  .modal__close {
    cursor: pointer;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--spacer-lg);
    height: var(--spacer-lg);
    top: calc(var(--spacer-lg) * -1);
    right: var(--spacer-xs);
    line-height: 0;
    background: none;
    border: none;
    svg {
      width: 1rem;
      height: 1rem;
    }
    path {
      fill: #fff;
    }
  }
}
.task-feedback__form {
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
}
.task-feedback__title {
  font-size: var(--font-size--500);
  margin-bottom: var(--spacer);
}
.task-feedback__control {
  font-size: var(--font-size--400);
  width: 100%;
  height: 40vh;
  min-height: 80px;
  max-height: 250px;
  margin-bottom: var(--spacer);
  padding: var(--spacer);
  font-family: var(--font-family);
  border: none;
  border-radius: var(--spacer--500);
}
.task-feedback__submit {
  margin-top: auto;
  margin-bottom: var(--spacer-lg);
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
  margin-bottom: var(--spacer-lg);
  font-weight: bold;
  line-height: calc(25 / 18);
  text-transform: uppercase;
}
.task-feedback__response-close {
  margin-top: auto;
  margin-bottom: var(--spacer-lg);
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
</style>
