<script setup lang="ts">
import { reactive, onBeforeMount, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import DrawPictogram from '@/components/DrawPictogram.vue'
import ImageFocus from '@/components/ImageFocus.vue'
import TextToSpeech from '@/components/TextToSpeech.vue'
import { useAppNavStore } from '@/stores/app-nav'
import { Service } from '@/model/service.js'
import { PresentialVenue } from '@/model/presential_venue.js'
import { OnlineVenue } from '@/model/online_venue.js'
import { PresentialTask } from '@/model/presential_task'
import { OnlineTask } from '@/model/online_task'

const router = useRouter()
const route = useRoute()

const appNav = useAppNavStore()

const type = ref<'online'|'presential'>();

const state = reactive({
  active_step: 0,
  active_helpful: false,
  was_helpful: false,
  was_liked: false,
  was_disliked: false,
  shown_modal: false,
  opened_modal: false,
  closed_modal: false,
  submitting_feedback: false,
  submitted_feedback: false,
  error_feedback: false,
})

const show_prerequisites = ref(false)
const loading = ref(true)
const service = ref<Service>()
const venue = ref<PresentialVenue | OnlineVenue>()
const task = ref<PresentialTask | OnlineTask>()
const feedback  = reactive({
  body: '',
})

const prerequisitesText = computed( () => {
  return task.value !== undefined ? task.value.prerequisites.replace(/(<([^>]+)>)/gi, '!') : null;
})

const advanceStep = () => {
  state.active_step++;
  if (task.value !== undefined && state.active_step === task.value.steps.length) {
    state.active_helpful = true;
  }
}

const rewindStep = () => {
  if (state.active_step === 0) {
    show_prerequisites.value = true;
  } else {
    state.active_step--;
    if (task.value !== undefined && state.active_step < task.value.steps.length) {
      state.active_helpful = false;
    }
  }
}
    
const likedStep = () => {
  state.was_helpful = true;
  if (!state.was_liked) {
    // this.$http.post(`${process.env.VUE_APP_API_DOMAIN}api/tasks/liked`, {
    //   id: this.$store.state.selected.task.id,
    //   was_disliked: state.was_disliked,
    // }).then((result) => {
    //   state.was_liked = true;
    //   state.was_disliked = null;
    // });
  }
}
    
const dislikedStep = () => {
  state.was_helpful = false;
  if (!state.was_disliked) {
    // this.$http.post(`${process.env.VUE_APP_API_DOMAIN}api/tasks/disliked`, {
    //   id: this.$store.state.selected.task.id,
    //   was_liked: state.was_liked,
    // }).then((result) => {
    //   state.was_disliked = true;
    //   state.was_liked = null;
    // });
  }
}

const openFeedback = () => {
  state.shown_modal = true;
  state.opened_modal = true;
  state.closed_modal = false;
}

const closeFeedback = () => {
  state.opened_modal = false;
  state.closed_modal = true;
}

const submitFeedback = () => {
  state.submitting_feedback = true;
  // this.$http.post(`${process.env.VUE_APP_API_DOMAIN}api/reports/store`, {
  //   report: this.feedback.body,
  //   task: this.$store.state.selected.task,
  // }).then((result) => {
  //   state.submitted_feedback = true;
  //   state.submitting_feedback = false;
  // });
}

onBeforeMount(() => {
  fetch(`${import.meta.env.VITE_APP_API_DOMAIN}api/slugs/getElements`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      category: route.params.categorySlug,
      service: route.params.serviceSlug,
      venue: route.params.venueSlug,
      task: route.params.taskSlug
    })
  })
  .then(async (response) => {
    const data = await response.json()
    type.value = data.type
    task.value = data.type === 'online' ? new OnlineTask(data.task) : new PresentialTask(data.task)
    service.value = new Service(data.service)
    venue.value = data.type === 'online' ? new OnlineVenue(data.venue) : new PresentialVenue(data.venue)
    appNav.selected.category = data.category
    appNav.selected.service = data.service
    appNav.selected.venue = data.type === 'online' ? new OnlineVenue(data.venue) : new PresentialVenue(data.venue)
    if (data.task.prerequisites.trim() !== '') {
      show_prerequisites.value = true;
    }
    document.title = `${task.value.title} en ${venue.value.name} (${service.value.name}) | Pictos`
    loading.value = false
  })
  .catch((err) => {
    if (err.response.status === 404) {
      router.push('/')
    }
  })
})
</script>

<template>
  <div class="task__single">
    <template v-if="loading || task === undefined || venue === undefined || service === undefined">
      <clip-loader :loading="loading" :color="'#CAE0FF'" :size="'3rem'" class="mt-auto mb-auto"></clip-loader>
    </template>
    <template v-else>
      <header :class="{'header--prerequisites': show_prerequisites}" class="task__header entries-list__header">
        <p class="entries-list__description task__description">
          <router-link :to="{ name: 'venue-screen', params: { 'placeId': venue.id } }">{{ venue.name }}</router-link>
          en
          <router-link :to="{ name: 'service-screen', params: { 'serviceId': service.id } }">{{ service.name }}</router-link>
        </p>
        <h1 class="task__title entries-list__title">{{ task.title }}</h1>
        <text-to-speech :text-audio="`${task.title}.\n\n\n\n\n ${venue.name}, en ${service.name}`" />
      </header>
      <template v-if="show_prerequisites">
        <div class="task__prerequisites">
          <div class="task__header">
            <text-to-speech :text-audio="`${prerequisitesText}`" />
            <div class="text-formatted" v-html="task.prerequisites"></div>
          </div>
        </div>
          <footer class="page__footer">
            <button class="btn btn--large btn--block btn--primary" @click="show_prerequisites = false">
              Siguiente
            </button>
          </footer>
      </template>
      <template v-else>
        <main class="task__main">
          <ol v-touch:swipe.left="advanceStep"
            v-touch:swipe.right="rewindStep"
            class="task__steps"
            :class="!task.steps.filter( s => s.pictogram ).length ? 'task-steps--without-pictogram' : ''"
          >
            <li v-for="(step, index) in task.steps"
              :key="step.id"
              :step="step"
              :class="'task-step'+ ( index === state.active_step ?
              ' task-step--active' : '')"
            >
            <figure v-if="(task instanceof PresentialTask)" class="task-step__figure" :class="{'task-step__figure--without-pictogram' : !step.pictogram || !step.pictogram.images.filter( (i: any) => i.layout <= 3).length}">
                <div v-if="step.pictogram && step.pictogram.images.filter( (i: any) => i.layout <= 3).length" class="step-canvas">
                  <DrawPictogram :layers="step.pictogram.images.filter( (i: any) => i.layout <= 3)" />
                </div>
                <div>Paso {{ state.active_step + 1 }} de {{ task.steps.length }}</div>
                <figcaption class="task-step__legend">
                  <div class="task-step__legend-text">
                    <span v-if="step.pictogram && step.pictogram.images.find( (i: any) => i.layout == 4)">
                      <img :src="`${step.pictogram.images.find( (i: any) => i.layout == 4)?.path}${step.pictogram.images.find( (i: any) => i.layout == 4)?.filename}`" class="pictogram__layer--action">
                    </span>
                    {{ step.label }}
                  </div>
                  <text-to-speech :text-audio="step.label" />
                </figcaption>
              </figure>
              <figure v-if="(task instanceof OnlineTask)" class="task-step__figure" :class="{'task-step__figure--without-pictogram' : !step.image }">
                <div v-if="step.screenshot">
                  <ImageFocus :image="step.screenshot" :focus-size="step.focus_size" :focus-x="step.focus_x" :focus-y="step.focus_y" />
                </div>
                <div>Paso {{ state.active_step + 1 }} de {{ task.steps.length }}</div>
                <figcaption class="task-step__legend">
                  <div class="task-step__legend-text">
                    <span v-if="step.image">
                      <img :src="`${step.image.path}${step.image.filename}`" class="pictogram__layer--action">
                    </span>
                    {{ step.label }}
                  </div>
                  <div v-html="step.details"></div>
                  <text-to-speech :text-audio="step.label" />
                </figcaption>
              </figure>
            </li>
            <li :class="'task-step task-helpful'+ ( state.active_helpful ? ' task-step--active' : '')">
              <h2 class="task-helpful__title">¿Te ha servido este apoyo?</h2>
              <div class="task-helpful__answers">
                <button :class="'task-helpful__answer' + ( state.was_helpful == true ? ' task-helpful__answer--active' : '' )" @click="likedStep">
                  <icon-like class="task-helpful__answer__icon--like"></icon-like>
                </button>
                <button :class="'task-helpful__answer' + ( state.was_helpful == false ? ' task-helpful__answer--active' : '' )" @click="dislikedStep">
                  <icon-dislike class="task-helpful__answer__icon--like"></icon-dislike>
                </button>
              </div>
              <template v-if="task.steps.length && !task.steps.filter( s => s.pictogram && s.pictogram.images.filter( (i: any) => i.layout <= 3).length ).length">
                <p class="task-helpful__label">Esta tarea aún no tiene apoyo gráfico</p>
                <router-link
                  :to="appNav.onboarding.pictogram ? '/nuevo-apoyo/intro' : '/nuevo-apoyo/' + task.steps[0].id"
                  class="btn btn--large btn--block btn--ghost"
                >
                  Crear el apoyo gráfico
                </router-link>
              </template>
              <template v-else>
                <router-link
                  :to="{ name: 'venue-screen', params: { 'placeId': venue.id } }"
                  class="btn btn--large btn--block btn--ghost"
                >
                  Volver a {{ venue.name }}
                </router-link>
              </template>
              <button :class="'btn--as-link' + ( state.was_helpful == false ? '' : ' task-helpful__toggle-feedback--hidden' )" @click="openFeedback">Reportar un problema</button>
            </li>
          </ol>
          <div v-if="!task.steps.filter( s => s.label ).length" :class="'task-empty'
              + ( state.active_step < 0 ? '' : ' task-step--active')">
            <icon-no-information class="task-empty__icon" />
            <h2 class="task-empty__title">Esta tarea todavía no tiene pasos ni apoyos gráficos.</h2>
            <p class="task-empty__description">Si sabes cómo hacer esta tarea puedes ayudarnos a crear una nueva con sus pasos y apoyos.</p>
            <router-link :to="appNav.onboarding.task ? '/nueva-tarea/intro' : '/nueva-tarea'" class="btn btn--primary btn--large btn--block">
              &plus; Crear una tarea nueva
            </router-link>
          </div>
          <div class="task__nav">
            <button class="btn btn--large btn--primary" :class="{'btn--hidden': state.active_step === 0 && task.prerequisites.trim() === '' && !show_prerequisites}" @click="rewindStep">
              Anterior
            </button>
            <button :class="'btn btn--large btn--primary'
              + ( state.active_step + 1 < task.steps.length + 1 ? '' : ' btn--hidden' )"
              @click="advanceStep">
              Siguiente
            </button>
          </div>
          <!-- <div v-if="!steps.filter( s => s.pictogram && s.pictogram.images.filter( i => i.layout <= 3).length ).length" :class="'without-pictogram' + ( state.active_helpful === true ? ' without-pictogram--hidden' : '' )">
            <h2 class="without-pictogram__title">Esta tarea aún no tiene apoyo gráfico</h2>
            <p class="without-pictogram__description">Al terminar la tarea podrás colaborar en la creación del apoyo gráfico</p>
          </div> -->
        </main>
        <!-- Pestaña inferior para feedback -->
        <button :class="'task__step-feedback' +
          ( state.active_helpful === true || state.opened_modal === true ?
            ' task__step-feedback--hidden' : '' )" @click="openFeedback">
          Reportar un problema con esta tarea
        </button>
        <!-- Bloque y formulario para feedback -->
        <div :class="'modal' + ( state.shown_modal ? ' modal--fade' : '' ) + ( state.closed_modal ? ' modal--fade-out' : '' )">
          <div class="modal__backdrop">
            <div :class="'task-feedback' + ( state.submitted_feedback ? ' task-feedback--submitted' : '' )">
              <button type="button" class="modal__close" @click="closeFeedback"><icon-error></icon-error></button>
              <form v-if="!state.submitted_feedback" class="task-feedback__form" @submit.prevent="submitFeedback">
                <h2 class="task-feedback__title">Reportar un problema con esta tarea</h2>
                <textarea v-model="feedback.body" class="task-feedback__control"
                  placeholder="Ejemplo: El pictograma no coincide con la instrucción" required></textarea>
                <button :class="'task-feedback__submit btn btn--large btn--block' +
                  ( feedback.body === '' ? ' btn--ghost' : ' btn--primary' ) +
                  ( state.submitting_feedback ? ' btn--loading' : '' )"
                >
                  Enviar
                  <clip-loader :loading="false" :color="'#fff'" :size="'1rem'"></clip-loader>
                </button>
              </form>
              <div v-if="state.submitted_feedback" class="task-feedback__response">
                <p class="task-feedback__response-message">¡Gracias!<br> tu comentario ha sido enviado</p>
                <button type="button" class="task-feedback__response-close btn btn--large btn--block btn--light" @click="closeFeedback">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<style lang="scss">
  @import '@/assets/scss/rfs.scss';
  .task__single {
    display: flex;
    flex-flow: column nowrap;
    overflow-x: hidden;
  }
  .task__header {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    text-align: left;
    background: var(--color-background);
  }
  .task__title {
    grid-column: 1/2;
    margin-bottom: 0;
  }
  .task__description {
    @include rfs($font-size-12);
    grid-column: 1/2;
    grid-row: 1/2;
    margin-bottom: var(--spacer-xs);
    line-height: 1.35;
  }
  .tts {
    .task__header & {
      align-self: flex-start;
      grid-column: 2/3;
      grid-row: 1/2;
      path {
        fill: var(--color-brand);
      }
    }
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
    background: var(--color-brand-lightest);
    // max-height: 55vh;
    // Hack Safari
    @media not all and (min-resolution:.001dpcm) {
      @supports (-webkit-appearance:none) {
        height: 100%;
      }
    }
  }
  .task-step__figure {
    display: grid;
    grid-template-rows: auto 1fr;
    flex-grow: 1;
    border-top: 1px solid var(--color-brand-light);
    border-bottom: 1px solid var(--color-brand-light);
    // Hack Safari
    @media not all and (min-resolution:.001dpcm) {
      @supports (-webkit-appearance:none) {
        position: absolute;
        display: flex;
        flex-flow: column nowrap;
        flex-grow: unset;
        width: 100%;
        height: 100%;
      }
    }
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
    background: var(--color-brand-lightest);
    min-height: 13rem;
    max-height: 41vh;
    height: 100%;
    // Hack Safari
    @media not all and (min-resolution:.001dpcm) {
      @supports (-webkit-appearance:none) {
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
    transform: translateX( 100% );
    transition: opacity .25s .25s ease-out, transform 0 0;
    list-style: none;
    opacity: 0;
  }
  .task-step--active {
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    flex-grow: 1;
    transform: translateX( 0% );
    transition: opacity .25s ease-in, transform 0 .5s;
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
  .task-step__legend {
    @include rfs($font-size-16);
    display: flex;
    align-items: center;
    padding: calc( var(--spacer) * .75 ) var(--spacer);
    line-height: calc( 22/16 );
    font-weight: bold;
    background: var(--color-background);
    justify-content: space-between;
    min-height: 14vh;
    @media screen and ( min-width: 640px ) {
      padding: calc( var(--spacer-lg) * .75 ) var(--spacer-lg);
    }
    @media screen and ( min-width: 1280px ) {
      padding-left: var(--spacer-xl);
      padding-right: var(--spacer-xl);
    }
    // Hack Safari
    @media not all and (min-resolution:.001dpcm) {
      @supports (-webkit-appearance:none) {
        height: 100%;
      }
    }
    .tts {
      margin-left: var(--spacer);
      align-self: flex-start;
    }
  }
  .task-step__legend-text {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  // Último paso, donde se pregunta si fue de ayuda
  .task-helpful {
    display: flex;
    flex: column nowrap;
    justify-content: center;
    align-items: center;
    padding: var(--spacer);
    color: #fff;
    background-color: var(--color-brand-darker);
    height: 55vh;
    @media screen and ( min-width: 640px ) {
      padding-left: var(--spacer-lg);
      padding-right: var(--spacer-lg);
    }
    @media screen and ( min-width: 1280px ) {
      padding-left: var(--spacer-xl);
      padding-right: var(--spacer-xl);
    }
  }
  .task-helpful__title {
    @include rfs($font-size-18);
    margin-bottom: var(--spacer);
  }
  .task-helpful__answers {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacer);
    width: 100%;
    margin-bottom: var(--spacer-lg);
    @media screen and ( max-width: 400px ) {
    // Hack Safari
      @media not all and (min-resolution:.001dpcm) {
        @supports (-webkit-appearance:none) {
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
    padding: var(--spacer-sm);
    text-align: center;
    color: var(--color-brand-darker);
    background-color: var(--color-brand-light);
    border: 1px solid var(--color-brand-light);
    border-radius: var(--border-radius);
    box-shadow: 4px 4px 10px rgba(0, 0, 0, .25);
    &:hover {
      background-color: var(--color-brand-lighter);
      transition: var(--transition-base);
    }
    &.task-helpful__answer--active {
      background-color: var(--color-highlight);
      border-color: var(--color-highlight);
    }
    @media screen and ( max-width: 400px ) {
    // Hack Safari
      @media not all and (min-resolution:.001dpcm) {
        @supports (-webkit-appearance:none) {
          flex: 0 1 47%;
        }
      }
    }
  }
  .task-helpful__label {
    @include rfs(14px);
    margin-bottom: var(--spacer);
    font-weight: bold;
  }
  [class^="task-helpful__answer__icon"] {
    width: 25px;
    height: 25px
  }
  .btn--as-link {
    margin-top: var(--spacer);
    color: #fff;
    &.task-helpful__toggle-feedback--hidden {
      display: none;
    }
  }
  // Navegación
  .task__nav {
    display: grid;
    gap: 0 var(--spacer-sm);
    grid-template-columns: 1fr 1fr;
    padding: var(--spacer) var(--spacer) var(--spacer-lg);
    @media screen and ( min-width: 640px ) {
      padding: var(--spacer-lg) var(--spacer-lg) calc( var(--spacer-lg) + 1.5rem );
    }
    @media screen and ( min-width: 1280px ) {
      padding-left: var(--spacer-xl);
      padding-right: var(--spacer-xl);
    }
  }
  .task__steps-indicator {
    margin-top: var(--spacer-xs);
    margin-bottom: var(--spacer-xs);
    text-align: center;
    grid-column: 1/3;
    li {
      display: inline-block;
      width: calc( var(--spacer) * .35 );
      height: calc( var(--spacer) * .35 );
      margin: 0 calc( var(--spacer) * .125 );
      list-style: none;
      text-indent: -9999em;
      line-height: calc( var(--spacer) * .35 );
      background: #e1e1e1;
      border-radius: var(--spacer);
    }
  }
  li.task__step-indicator--active {
    background: var(--color-brand);
  }
  // Botón de feedback
  .task__step-feedback {
    @include rfs($font-size-12);
    cursor: pointer;
    position: fixed;
    display: block;
    width: calc( 100% - var(--spacer) );
    max-width: calc( 640px - var(--spacer) );
    bottom: 0;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    padding: calc( var(--spacer) * .65 );
    font-weight: 600;
    background: var( --color-brand-lighter );
    border-top-left-radius: var( --border-radius );
    border-top-right-radius: var( --border-radius );
    border: 0;
    transition: var(--transition-base);
    &.task__step-feedback--hidden {
      bottom: -100%;
      opacity: 0;
    }
    @media screen and ( min-width: 1280px ) {
      max-width: calc(750px - ( var(--spacer-lg) * 2 ) );
    }
  }
  // Modal de feedback
  .task-feedback {
    position: absolute;
    width: calc(100vw - var(--spacer) );
    height: 100%;
    top: 100%;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    padding: var(--spacer);
    background-color: var(--color-brand-lighter);
    transition: top .35s ease;
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
        animation: quickScaleDown 0s .5s linear forwards;
      }
    }
    @media screen and ( min-width: 640px ) {
      max-width: calc(640px - var(--spacer));
      margin-left: auto;
      margin-right: auto;
      padding: var(--spacer-lg);
    }
    @media screen and ( min-width: 1280px ) {
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
      top: calc( var(--spacer-lg) * -1 );
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
    @include rfs($font-size-16);
    margin-bottom: var(--spacer);
  }
  .task-feedback__control {
    @include rfs($font-size-14);
    width: 100%;
    height: 40vh;
    min-height: 80px;
    max-height: 250px;
    margin-bottom: var(--spacer);
    padding: var(--spacer);
    font-family: var(--font-family);
    border: none;
    border-radius: var(--border-radius);
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

  /*Tarea sin pictogramas*/
  .without-pictogram {
    color: #727272;
    grid-row: 1/3;
    grid-column: 1/3;
    justify-content: center;
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-bottom: 5rem;
    & + .task-step__legend {
      grid-column: 1/3;
    }
    // Hack Safari
    @media not all and (min-resolution:.001dpcm) {
      @supports (-webkit-appearance:none) {
        height: 100%;
        min-height: 41vh;
      }
    }
  }
  .without-pictogram__title {
    @include rfs($font-size-16);
    margin-bottom: var(--spacer-sm);
  }
  .without-pictogram__description {
    @include rfs($font-size-14);
    max-width: 300px;
    margin: 0 auto;
    @media screen and ( min-width: 640px ) {
      max-width: 400px;
    }
  }
  .without-pictogram--hidden {
    display: none;
  }
  .task-steps--without-pictogram {
    .step-canvas {
    display: none;
    }
  }

  /*Tarea sin pasos*/
  .task-empty--hidden {
    display: none;
  }
  .task-empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 90%;
    width: 100%;
    margin: 0 auto;
    padding: 0 var(--spacer);
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    background-color: var(--color-background);
    .btn {
      max-width: 500px;
    }
  }
  .task-empty__icon {
    width: var(--spacer-lg);
    height: var(--spacer-lg);
    margin: var(--spacer-sm) auto var(--spacer);
    path {
      fill: var(--color-brand);
    }
  }
  .task-empty__title {
    @include rfs($font-size-16);
    color: var(--color-brand);
    margin-bottom: var(--spacer-sm);
    padding: 0 var(--spacer-sm);
    text-transform: uppercase;
    font-weight: 800;
    text-align: center;
    max-width: 400px;
    @media screen and ( min-width: 640px ) {
      margin-bottom: var(--spacer);
    }
  }
  .task-empty__description {
    @include rfs($font-size-14);
    text-align: center;
    margin-bottom: var(--spacer-xl);
    max-width: 400px;
  }
  .task-empty + .task__nav {
    display: none;
  }
  .pictogram__layer--action {
    height: 44px;
    margin-right: var(--spacer-sm)/2;
    padding: 0 var(--spacer-sm);
  }

  .text-formatted * {
    all: revert !important;
  }
  .task__prerequisites {
    padding: 0 var(--spacer);
    @media screen and ( min-width: 640px ) {
      padding: 0 var(--spacer-xl);
    }
  }
  .task__single .page__footer {
      padding: var(--spacer-lg);
  }
  .header--prerequisites {
    padding-bottom: var(--spacer-sm) !important;
  }
</style>