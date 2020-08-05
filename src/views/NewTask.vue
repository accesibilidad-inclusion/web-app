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
            {{ index + 1 }} <template v-if="editing != index">{{ step }} <span @click="editStep(index)"><icon-menu class="step-block-inserted__edit" /></span></template>
            <template v-else><input type="text" v-model="stepEdit" /><span @click="steps[index] = stepEdit; editing = null"><icon-check class="step-block-inserted__icon" />Listo</span><span @click="editing = null"><icon-delete class="step-block-inserted__icon" />Cancelar</span></template>
          </div>
        </template>
        <template v-else-if="showStep == 4">
          <h2 class="onboarding__title">
            Gracias por tu aporte
          </h2>
          <p>Estás ayudando al mundo a ser un lugar más accesible</p>
          <router-link :to="'/lugares/' + venue.id">Volver a {{ venue.name }}</router-link>
        </template>
      </form>
      <footer class="page__footer">
        <div v-if="showStep == 4">
          <p>¿Quieres que te avisemos cuando publiquemos tu aporte?</p>
          <button v-if="!showEmailConfirm" class="btn btn--large btn--block btn--primary" @click="showEmailConfirm = true">Sí, avísame</button>
          <div v-else>
            <input type="text" value="" v-model="emailConfirm" placeholder="Escribe tu e-mail aquí" />
            <button class="btn btn--primary">Enviar</button>
          </div>
        </div>
        <button v-else :tag="'button'" class="btn btn--large btn--block btn--primary page__footer" @click="showStep < 3 ? showStep = 3 : sendTask()" :disabled="!addStep">
          <span v-if="showStep < 3">Listo</span>
          <span v-else>Confirmar</span>
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import OnboardingNext from '@/components/OnboardingNext.vue';
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
    OnboardingNext,
    TextToSpeech,
    IconDelete,
    IconAdd,
    IconPlus,
    IconMenu,
    IconCheck,
  },
  computed: {
    addStep() {
      return this.steps.length < 9 && !this.steps.filter( s => s.trim() == '').length
    }
  },
  beforeMount() {
    this.venue.set(this.$store.state.selected.venue)
  },
  data() {
    return {
      task: '',
      steps: ['', '', ''],
      showStep: 1,
      stepEdit: '',
      editing: null,
      venue: new Venue(),
      showEmailConfirm: false,
      emailConfirm: ''
    }
  },
  methods: {
    sendTask() {
      this.$http.post(process.env.VUE_APP_API_DOMAIN + 'api/tasks/contribution', {
        task: this.task,
        steps: this.steps,
        venue: this.venue.id
      }).then( result => {
        this.showStep = 4;
      });
    },
    editStep(i) {
      this.editing = i
      this.stepEdit = this.steps[i]
    }
  }
};
</script>
<style lang="scss">
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

  .page__new-steps {
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
  .step-block-inserted {
    display: grid;
    grid-template-columns: 1fr auto;
    margin: var(--spacer) 0;
    border: 2px solid var(--color-brand-lighter);
    border-radius: var( --border-radius );
    box-shadow: 0px 1px 5px rgba(148, 148, 148, 0.25);
    transition: var(--transition-base);
    padding: var(--spacer-sm);
    &:hover {
      cursor: pointer;
      border-color: var(--color-brand-light);
      box-shadow: 0px 1px 5px rgba(148, 148, 148, 0.5);
    }
  }
  .step-block-inserted__edit {
    width: 1rem;
    height: auto;
  }
  .step-block-inserted {
    .step-block-inserted__icon {
      width: 10px;
      path {
        fill: var(--color-brand-darkest);
      }
    }
  }
</style>
