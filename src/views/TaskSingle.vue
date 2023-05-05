<!-- eslint-disable max-len -->
<template>
  <div class="task__single">
    <template v-if="loading">
      <clip-loader :loading="loading" :color="'#CAE0FF'" :size="'3rem'" class="mt-auto mb-auto"></clip-loader>
    </template>
    <template v-else>
      <header :class="{'header--prerequisites': show_prerequisites}" class="task__header entries-list__header">
        <p class="entries-list__description task__description">
          <router-link :to="{ name: 'place-single', params: { 'placeId': venue.id } }">{{ venue.name }}</router-link>
          en
          <router-link :to="{ name: 'service-single', params: { 'serviceId': service.id } }">{{ service.name }}</router-link>
        </p>
        <h1 class="task__title entries-list__title">{{ task.title }}</h1>
        <text-to-speech :text-audio="`${this.task.title}.\n\n\n\n\n ${this.venue.name}, en ${this.service.name}`" />
      </header>
      <template v-if="show_prerequisites">
        <div class="task__prerequisites">
          <div class="task__header">
            <text-to-speech :text-audio="`${this.prerequisitesText}`" />
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
          <ol class="task__steps"
            v-touch:swipe.left="advanceStep"
            v-touch:swipe.right="rewindStep"
            v-bind:class="!steps.filter( s => s.pictogram ).length ? 'task-steps--without-pictogram' : ''"
          >
            <li v-for="(step, index) in steps"
              v-bind:step="step"
              v-bind:key="step.id"
              v-bind:class="'task-step'+ ( index === state.active_step ?
              ' task-step--active' : '')"
            >
              <figure class="task-step__figure" v-bind:class="{'task-step__figure--without-pictogram' : !step.pictogram || !step.pictogram.images.filter( i => i.layout <= 3).length}">
                <div class="step-canvas" v-if="step.pictogram && step.pictogram.images.filter( i => i.layout <= 3).length">
                  <pictogram :layers="step.pictogram.images.filter( i => i.layout <= 3)"></pictogram>
                </div>
                <figcaption class="task-step__legend">
                  <div class="task-step__legend-text">
                    <text-to-speech :text-audio="step.label" />
                    <span v-if="step.pictogram && step.pictogram.images.find( i => i.layout == 4)">
                      <img v-bind:src="`${step.pictogram.images.find( i => i.layout == 4).path}${step.pictogram.images.find( i => i.layout == 4).filename}`" class="pictogram__layer--action">
                    </span>
                    {{ step.label }}
                  </div>
                </figcaption>
              </figure>
            </li>
            <li v-bind:class="'task-step task-helpful'+ ( state.active_helpful ? ' task-step--active' : '')">
              <h2 class="task-helpful__title">¿Te ha servido este apoyo?</h2>
              <div class="task-helpful__answers">
                <button v-bind:class="'task-helpful__answer' + ( state.was_helpful == true ? ' task-helpful__answer--active' : '' )" @click="likedStep">
                  <icon-like class="task-helpful__answer__icon--like"></icon-like> Sí
                </button>
                <button v-bind:class="'task-helpful__answer' + ( state.was_helpful == false ? ' task-helpful__answer--active' : '' )" @click="dislikedStep">
                  <icon-dislike class="task-helpful__answer__icon--like"></icon-dislike> No
                </button>
              </div>
              <template v-if="steps.length && !steps.filter( s => s.pictogram && s.pictogram.images.filter( i => i.layout <= 3).length ).length">
                <p class="task-helpful__label">Esta tarea aún no tiene apoyo gráfico</p>
                <router-link
                  :to="$store.state.tutorial.pictogram ? '/nuevo-apoyo/intro' : '/nuevo-apoyo/' + steps[0].id"
                  class="btn btn--large btn--block btn--ghost"
                >
                  Crear el apoyo gráfico
                </router-link>
              </template>
              <template v-else>
                <router-link
                  :to="{ name: 'place-single', params: { 'placeId': venue.id } }"
                  class="btn btn--large btn--block btn--ghost"
                >
                  Volver a {{ venue.name }}
                </router-link>
              </template>
              <button v-bind:class="'btn--as-link' + ( state.was_helpful == false ? '' : ' task-helpful__toggle-feedback--hidden' )" @click="openFeedback">Reportar un problema</button>
            </li>
          </ol>
          <div v-if="!steps.filter( s => s.label ).length" v-bind:class="'task-empty'
              + ( state.active_step < 0 ? '' : ' task-step--active')">
            <icon-no-information class="task-empty__icon" />
            <h2 class="task-empty__title">Esta tarea todavía no tiene pasos ni apoyos gráficos.</h2>
            <p class="task-empty__description">Si sabes cómo hacer esta tarea puedes ayudarnos a crear una nueva con sus pasos y apoyos.</p>
            <router-link :to="$store.state.tutorial.task ? '/nueva-tarea/intro' : '/nueva-tarea'" class="btn btn--primary btn--large btn--block" tag="button">
              &plus; Crear una tarea nueva
            </router-link>
          </div>
          <div class="task__nav">
            <button class="btn btn--large btn--primary" :class="{'btn--hidden': state.active_step === 0 && task.prerequisites.trim() === '' && !show_prerequisites}" @click="rewindStep">
              Anterior
            </button>
            <button v-bind:class="'btn btn--large btn--primary'
              + ( state.active_step + 1 < steps.length + 1 ? '' : ' btn--hidden' )"
              @click="advanceStep">
              Siguiente
            </button>
            <ol class="task__steps-indicator">
              <li v-for="(step, index) in steps" v-bind:step="step" v-bind:key="step.id"
                v-bind:class="state.active_step >= index ?
                  'task__step-indicator--active' : 'task__step-indicator'">
                {{ index }}
              </li>
              <li v-bind:class="state.active_helpful ? 'task__step-indicator--active' : 'task__step-indicator'">
                {{ steps.length }}
              </li>
            </ol>
          </div>
          <div v-if="!steps.filter( s => s.pictogram && s.pictogram.images.filter( i => i.layout <= 3).length ).length" v-bind:class="'without-pictogram' + ( state.active_helpful === true ? ' without-pictogram--hidden' : '' )">
            <h2 class="without-pictogram__title">Esta tarea aún no tiene apoyo gráfico</h2>
            <p class="without-pictogram__description">Al terminar la tarea podrás colaborar en la creación del apoyo gráfico</p>
          </div>
        </main>
        <!-- Pestaña inferior para feedback -->
        <button @click="openFeedback" v-bind:class="'task__step-feedback' +
          ( state.active_helpful === true || state.opened_modal === true ?
            ' task__step-feedback--hidden' : '' )">
          Reportar un problema con esta tarea
        </button>
        <!-- Bloque y formulario para feedback -->
        <div v-bind:class="'modal' + ( state.shown_modal ? ' modal--fade' : '' ) + ( state.closed_modal ? ' modal--fade-out' : '' )">
          <div class="modal__backdrop">
            <div v-bind:class="'task-feedback' + ( state.submitted_feedback ? ' task-feedback--submitted' : '' )">
              <button type="button" class="modal__close" @click="closeFeedback"><icon-error></icon-error></button>
              <form class="task-feedback__form" @submit.prevent="submitFeedback" v-if="!state.submitted_feedback">
                <h2 class="task-feedback__title">Reportar un problema con esta tarea</h2>
                <textarea class="task-feedback__control" v-model="feedback.body"
                  placeholder="Ejemplo: El pictograma no coincide con la instrucción" required></textarea>
                <button v-bind:class="'task-feedback__submit btn btn--large btn--block' +
                  ( feedback.body === '' ? ' btn--ghost' : ' btn--primary' ) +
                  ( state.submitting_feedback ? ' btn--loading' : '' )"
                >
                  Enviar
                  <clip-loader :loading="false" :color="'#fff'" :size="'1rem'"></clip-loader>
                </button>
              </form>
              <div class="task-feedback__response" v-if="state.submitted_feedback">
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

<script>
import Service from '@/models/Service';
import Venue from '@/models/Venue';
// eslint-disable-next-line import/no-named-as-default-member
import Task from '@/models/Task';
import TextToSpeech from '@/components/TextToSpeech.vue';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import Pictogram from '@/components/Pictogram.vue';
import IconLike from 'pictos/src/4-icons/check.svg?inline';
import IconDislike from 'pictos/src/4-icons/cancel.svg?inline';
import IconError from '../../public/img/app-icons/error.svg?inline';
import IconNoInformation from '../../public/img/app-icons/no-information.svg?inline';

export default {
  name: 'taskSingle',
  components: {
    TextToSpeech,
    ClipLoader,
    Pictogram,
    IconLike,
    IconDislike,
    IconError,
    IconNoInformation,
  },
  computed: {
    prerequisitesText() {
      return this.task.prerequisites.replace(/(<([^>]+)>)/gi, '!');
    },
  },
  methods: {
    advanceStep() {
      // eslint-disable-next-line no-plusplus
      this.$data.state.active_step++;
      if (this.$data.state.active_step === this.$data.steps.length) {
        this.$data.state.active_helpful = true;
      }
    },
    rewindStep() {
      if (this.$data.state.active_step === 0) {
        this.show_prerequisites = true;
      } else {
      // eslint-disable-next-line no-plusplus
        this.$data.state.active_step--;
        if (this.$data.state.active_step < this.$data.steps.length) {
          this.$data.state.active_helpful = false;
        }
      }
    },
    likedStep() {
      this.$data.state.was_helpful = true;
      if (!this.$data.state.was_liked) {
        this.$http.post(`${process.env.VUE_APP_API_DOMAIN}api/tasks/liked`, {
          id: this.$store.state.selected.task.id,
          was_disliked: this.$data.state.was_disliked,
        }).then((result) => {
          this.$data.state.was_liked = true;
          this.$data.state.was_disliked = null;
        });
      }
    },
    dislikedStep() {
      this.$data.state.was_helpful = false;
      if (!this.$data.state.was_disliked) {
        this.$http.post(`${process.env.VUE_APP_API_DOMAIN}api/tasks/disliked`, {
          id: this.$store.state.selected.task.id,
          was_liked: this.$data.state.was_liked,
        }).then((result) => {
          this.$data.state.was_disliked = true;
          this.$data.state.was_liked = null;
        });
      }
    },
    openFeedback() {
      this.$data.state.shown_modal = true;
      this.$data.state.opened_modal = true;
      this.$data.state.closed_modal = false;
    },
    closeFeedback() {
      this.$data.state.opened_modal = false;
      this.$data.state.closed_modal = true;
    },
    submitFeedback() {
      this.$data.state.submitting_feedback = true;
      this.$http.post(`${process.env.VUE_APP_API_DOMAIN}api/reports/store`, {
        report: this.feedback.body,
        task: this.$store.state.selected.task,
      }).then((result) => {
        this.$data.state.submitted_feedback = true;
        this.$data.state.submitting_feedback = false;
      });
    },
  },
  beforeMount() {
    this.$http.post(`${process.env.VUE_APP_API_DOMAIN}api/tasks/getTask`, {
      category: this.$route.params.categorySlug,
      service: this.$route.params.serviceSlug,
      venue: this.$route.params.venueSlug,
      task: this.$route.params.taskSlug,
    }).then((response) => {
      this.task.set(response.data.task);
      this.service.set(response.data.service);
      this.venue.set(response.data.venue);
      this.$store.dispatch('setSelectedItem', {
        object: 'category',
        item: response.data.category,
      });
      this.$store.dispatch('setSelectedItem', {
        object: 'service',
        item: response.data.service,
      });
      this.$store.dispatch('setSelectedItem', {
        object: 'venue',
        item: response.data.venue,
      });
      this.$store.dispatch('setSelectedItem', {
        object: 'task',
        item: response.data.task,
      });
      this.steps = response.data.task.the_steps;
      if (response.data.task.prerequisites.trim() !== '') {
        this.show_prerequisites = true;
      }
      this.loading = false;
    }).catch((err) => {
      if (err.response.status === 404) {
        this.$router.push('/');
      }
    });
  },
  data() {
    return {
      state: {
        active_step: 0,
        active_helpful: false,
        was_helpful: null,
        was_liked: null,
        was_disliked: null,
        shown_modal: false,
        opened_modal: false,
        closed_modal: null,
        submitting_feedback: false,
        submitted_feedback: false,
        error_feedback: false,
      },
      show_prerequisites: false,
      loading: true,
      task: new Task(),
      service: new Service(),
      venue: new Venue(),
      steps: [],
      feedback: {
        body: '',
      },
      embedded: {
        'pictos:place': [
          {
            id: 1,
            name: 'Estación Metro Miramar',
          },
        ],
        'pictos:service': [
          {
            id: 1,
            name: 'Metro de Valparaíso',
          },
        ],
      },
    };
  },
};
</script>

<style lang="scss">
  @import '@/assets/scss/rfs.scss';
  .task__single {
    display: flex;
    flex-flow: column nowrap;
    overflow-x: hidden;
    padding-bottom: calc( ( 0.9rem * 2 ) + 2rem );
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
  }
  .task__steps {
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    // flex-grow: 1;
    // background: var(--color-brand-lightest);
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
    // border-bottom: 1px solid var(--color-brand-light);
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
      min-height: 30vh;
      // @include rfs($font-size-18);
      font-size: var( --font-size-400 );
      .pictogram__layer--action {
        height: 2.5rem;
        padding: 0;
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
      margin-top: 3px;
      margin-left: var(--spacer-sm);
      margin-bottom: var(--spacer-sm);
      float: right;
    }
  }
  .task-step__legend-text {
    align-items: center;
    min-height: 44px;
    position: relative;
    padding-left: 54px;
    width: 100%;
    .pictogram__layer--action {
      position: absolute;
      margin: 0;
      padding: 0;
      left: 0;
      top: 50%;
      margin-top: -32px;
    }
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
    display: flex;
    padding: var(--spacer-sm);
    text-align: center;
    color: var(--color-brand-darker);
    background-color: var(--color-brand-light);
    border: 1px solid var(--color-brand-light);
    border-radius: var(--border-radius);
    box-shadow: 4px 4px 10px rgba(0, 0, 0, .25);
    justify-content: center;
    align-items: center;
    font-weight: bold;
    svg {
      margin-right: .5em;
    }
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
    padding: var(--spacer-sm);
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: var( --app-width );
    button {
      border-radius: var( --border-radius );
      cursor: pointer;
    }
    @media screen and ( min-width: 640px ) {
      margin-left: 0;
      margin-right: 0;
    }
  }
  .task__steps-indicator {
    display: none;
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
    display: block;
    max-width: 640px;
    margin: var( --spacer ) var( --spacer-sm ) var( --spacer-sm );
    padding: calc( var(--spacer) * .5 ) var( --spacer );
    font-weight: 600;
    background: var( --color-brand-lighter );
    border-radius: var( --border-radius );
    border: 0;
    transition: var(--transition-base);
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
