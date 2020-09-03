<!-- eslint-disable max-len -->
<template>
  <div class="page">
    <div class="container">
      <form>
        <template v-if="showStep == 1">
          <h2 class="page__title">
            Agregar una nueva tarea
            <text-to-speech :text-audio="'Agregar una nueva tarea'" />
          </h2>
          <div class="form-group page__search">
            <input type="text" value="" v-model="task" placeholder="Ejemplo: Comprar tarjeta" /> <span @click="showStep = 2" v-if="task.trim() != ''"><icon-plus /></span>
          </div>
        </template>
        <template v-else-if="showStep == 2">
          <h2 class="page__title-new-task">
            {{ task }}
          </h2>
          <p class="page__subtitle page__text-audio">Enumera los pasos requeridos para completar esta acción
            <text-to-speech :text-audio="'Enumera los pasos requeridos para completar esta acción\n\n\n\n\n\n'
            + 'Mínimo 3 y máximo 9 pasos'" /></p>
          <p class="page__indication">Mínimo 3 y máximo 9 pasos</p>
          <div class="form-group page__new-steps" v-for="(step, index) in steps" v-bind:key="index">
            {{ index + 1 }} <input type="text" value="" v-model="steps[index]" :placeholder="'Escribe el paso ' + parseInt(index+1)" />
            <span @click="steps.splice(index,1)" v-if="steps.length > 3" class="page__delete-new-steps"><icon-delete /></span>
          </div>
          <div @click="steps.push('')" v-if="addStep" class="page__add-new-steps">
            <icon-add />Agregar otro paso
          </div>
        </template>
        <template v-else-if="showStep == 3">
          <h2 class="page__title-new-task">
            {{ task }}
          </h2>
          <p class="page__subtitle page__text-audio">Revisa los pasos ingresados
            <text-to-speech :text-audio="'Revisa los pasos ingresados\n\n\n\n\n\n'
            + 'Edita o reordena los pasos en caso de ser necesario'" />
          </p>
          <p class="page__indication">Edita o reordena los pasos en caso de ser necesario</p>
          <div class="step-block-inserted" v-for="(step, index) in steps" v-bind:key="index">
            {{ index + 1 }} <template v-if="editing != index"><p class="step-block-inserted__title">{{ step }}</p> <span @click="editStep(index)"><icon-menu class="step-block-inserted__edit" /></span></template>
            <template v-else><input type="text" v-model="stepEdit" />
            <div class="step-block-inserted__actions">
              <span @click="steps[index] = stepEdit; editing = null" class="step-block-inserted__btn"><icon-check class="step-block-inserted__icon-check" />Listo</span>
              <span @click="editing = null" class="step-block-inserted__btn"><icon-delete class="step-block-inserted__icon-cancel" />Cancelar</span>
            </div>
            </template>
          </div>
        </template>
        <template v-else-if="showStep == 4">
          <div class="thanks-message">
            <div class="thanks-message__container">
              <text-to-speech :text-audio="'Gracias por tu aporte\n\n\n\n\n\n'
                + 'Estas ayudando al mundo a ser un lugar más accesible\n\n\n\n\n\n'
                + 'Volver\n\n\n\n\n\n'
                + '¿Quieres que te avisemos cuando publiquemos tu aporte?'" />
              <h2 class="thanks-message__title">
                Gracias por tu aporte
              </h2>
              <p class="thanks-message__description">Estás ayudando al mundo a ser un lugar más accesible</p>
              <router-link :to="'/lugares/' + venue.id" class="thanks-message__back">Volver a {{ venue.name }}</router-link>
            </div>
          </div>
        </template>
      </form>
      <footer class="page__footer">
        <template v-if="showStep == 4">
          <div class="thanks-message__footer">
            <template v-if="submited">
              <p class="thanks-message__footer-description">
                Muchas gracias, te avisaremos cuando tu aporte sea aprobado.
              </p>
            </template>
            <template v-else>
              <p class="thanks-message__footer-description">¿Quieres que te avisemos cuando publiquemos tu aporte?</p>
              <button v-if="!show_subscription_form" class="btn btn--large btn--block btn--ghost" @click="show_subscription_form = true">Sí, avísame</button>
              <div v-else class="thanks-message__form">
                <form class="subscription-form" @submit="submitSubscription">
                  <input type="email" v-model="subscription_email" class="thanks-message__email" placeholder="Escribe tu email aquí">
                  <button type="submit" class="btn btn--large btn--ghost" :disabled="submitting_subscription">
                    Enviar
                    <template v-if="submitting_subscription">
                      <clip-loader :loading="submitting_subscription" :color="'#fff'" :size="'1rem'"></clip-loader>
                    </template>
                  </button>
                </form>
              </div>
            </template>
          </div>
        </template>
        <button v-else :tag="'button'" class="btn btn--large btn--block btn--primary page__footer" @click="showStep < 3 ? showStep = 3 : sendTask()" :disabled="!addStep">
          <span v-if="showStep < 3">Listo</span>
          <span v-else>Confirmar</span>
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import TextToSpeech from '@/components/TextToSpeech.vue';
import Venue from '@/models/Venue';
import IconDelete from '../../public/img/app-icons/error.svg?inline';
import IconAdd from '../../public/img/app-icons/add.svg?inline';
import IconPlus from '../../public/img/app-icons/plus.svg?inline';
import IconMenu from '../../public/img/app-icons/drag-light.svg?inline';
import IconCheck from '../../public/img/app-icons/check.svg?inline';

export default {
  name: 'NewTask',
  components: {
    TextToSpeech,
    IconDelete,
    IconAdd,
    IconPlus,
    IconMenu,
    IconCheck,
    ClipLoader,
  },
  computed: {
    addStep() {
      return this.steps.length < 9 && !this.steps.filter(s => s.trim() === '').length;
    },
  },
  data() {
    return {
      task: '',
      steps: ['', '', ''],
      showStep: 1,
      stepEdit: '',
      editing: null,
      venue: new Venue(this.$store.state.selected.venue),
      submited: false,
      show_subscription_form: false,
      submitting_subscription: false,
      id: null,
      subscription_email: '',
    };
  },
  methods: {
    sendTask() {
      this.$http.post(`${process.env.VUE_APP_API_DOMAIN}api/tasks/contribution`, {
        task: this.task,
        steps: this.steps,
        venue: this.venue.id,
      }).then((result) => {
        this.id = result.data.id;
        this.showStep = 4;
      });
    },
    editStep(i) {
      this.editing = i;
      this.stepEdit = this.steps[i];
    },
    submitSubscription(event) {
      event.preventDefault();
      this.submitting_subscription = true;
      this.$http.post(`${process.env.VUE_APP_API_DOMAIN}api/tasks/addNotification`, {
        id: this.id,
        email: this.subscription_email,
      }).then((result) => {
        this.submited = true;
        this.submitting_subscription = false;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
  @import '@/assets/scss/rfs.scss';

  input {
    @include rfs($font-size-16);
    width: 100%;
    padding: var(--spacer-sm) var(--spacer-lg) var(--spacer-sm) var(--spacer-sm);
    border: 1px solid var(--color-neutral-light);
    border-radius: var(--border-radius);
    &::placeholder {
      color: #848484;
      opacity: 1;
      font-style: italic;
      font-family: var(--font-family);
    }
  }
  .page__title-new-task {
    @include rfs($font-size-16);
    color: var(--color-background);
    background-color: var(--color-brand-dark);
    padding: var(--spacer-sm) var(--spacer);
  }

  .page .page__new-steps {
    @include rfs($font-size-16);
    font-weight: 700;
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: var(--spacer-sm);
    align-items: center;
    margin-bottom: var(--spacer-sm);
    position: relative;
    input {
      border: none;
      border-bottom: 1px solid var(--color-neutral-light);
      border-radius: 0;
      padding-left: 0;
      &::placeholder {
        color: var(--color-neutral-light);
      }
    }
  }
  .page__delete-new-steps {
    position: absolute;
    right: var(--spacer-xs);
    svg {
      width: 10px;
      height: 10px;
      path {
        fill: var(--color-neutral-light);
      }
    }
  }
  .page__add-new-steps {
    padding-top: var(--spacer-sm);
    font-weight: 600;
    color: var(--color-brand-darkest);
    svg {
      width: 20px;
      height: 20px;
      vertical-align: middle;
      margin-right: var(--spacer-sm);
    }
  }
  //bloque pasos
  .step-block-inserted {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto auto;
    column-gap: var(--spacer-sm);
    align-items: center;
    margin: calc(var(--spacer) / 1.5) 0;
    border: 2px solid var(--color-brand-lighter);
    border-radius: var( --border-radius );
    box-shadow: 0px 1px 5px rgba(148, 148, 148, 0.25);
    transition: var(--transition-base);
    padding: var(--spacer-sm);
    font-weight: 700;
    @media screen and ( min-width: 640px ) {
      padding: calc(var(--spacer)/2) calc(var(--spacer)*0.75);
    }
    &:hover {
      cursor: pointer;
      border-color: var(--color-brand-light);
      box-shadow: 0px 1px 5px rgba(148, 148, 148, 0.5);
    }
    input {
      border: none;
      border-bottom: 1px solid var(--color-neutral-light);
      border-radius: 0;
      padding: 0 0 var(--spacer-xs) 0;
      color: var(--color-neutral-light);
      font-style: italic;
      grid-column: 2 / 3;
      grid-row: 1 / 2;
    }
  }
  .step-block-inserted__title {
    font-weight: normal;
  }
  .step-block-inserted__edit {
    width: var(--spacer);
    height: auto;
  }
  .step-block-inserted__actions {
    grid-column: 1/3;
    display: flex;
    justify-content: center;
    margin-top: var(--spacer-sm);
  }
  .step-block-inserted__btn {
    @include rfs($font-size-14);
    color: var(--color-brand-darkest);
    font-weight: 600;
    text-decoration: underline;
    padding: var(--spacer-sm) var(--spacer) var(--spacer-xs) var(--spacer);
    svg {
       margin-right: var(--spacer-xs);
      path {
        fill: var(--color-brand-darkest);
      }
    }
  }
  .step-block-inserted__icon-check {
    width: 0.6rem;
    height: auto;
  }
  .step-block-inserted__icon-cancel {
    width: 0.5rem;
    height: auto;
  }
  //agradecimiento aporte
  .thanks-message {
    position: fixed;
    display: flex;
    flex-direction: column;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: var(--color-brand-lightest);
    z-index: 10000;
    .thanks-message__container {
      //background-image: url('../../public/img/illustrations/background.svg');
      background-size: cover;
      background-repeat: no-repeat;
      color: var(--color-highlight);
      background-color: var(--color-brand-darkest);
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      width: 100%;
      height: 100%;
      padding: var(--spacer);
      overflow-x: hidden;
      overflow-y: auto;

      @media screen and ( min-width: 640px ) {
        max-width: 640px;
        margin-left: auto;
        margin-right: auto;
        padding: var(--spacer-lg);
      }
      @media screen and ( min-width: 1288px ) {
        max-width: 750px;
        padding: var(--spacer-xl);
      }
      .tts {
        margin-left: auto;
        path {
          fill: var(--color-brand-light);
        }
      }
    }
  }
  .thanks-message__title {
    margin-top: var(--spacer);
    text-transform: uppercase;
    max-width: 190px;
    color: var(--color-highlight);
  }
  .thanks-message__description {
    @include rfs($font-size-16);
    font-weight: bold;
    color: var(--color-background);
    max-width: 15rem;
    margin-top: var(--spacer);
  }
  .thanks-message__back {
    @include rfs($font-size-16);
    color: var(--color-highlight);
    padding: var(--spacer) 0;
    font-weight: bold;
  }
  .thanks-message__footer {
    z-index: 100000;
    position: relative;
  }
  .thanks-message__footer-description {
    @include rfs($font-size-16);
    font-weight: bold;
    color: var(--color-highlight);
    margin-bottom: var(--spacer);
  }
  .thanks-message__form {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: var(--spacer-sm);
  }
  .thanks-message__email {
    @include rfs($font-size-14);
    padding: var(--spacer-sm) var(--spacer-sm) var(--spacer-sm) var(--spacer-sm);
    border: 2px solid var(--color-background);
    border-radius: var(--border-radius);
    &::placeholder {
      color: #848484;
      opacity: 1;
      font-style: italic;
      font-family: var(--font-family);
    }
  }
</style>
