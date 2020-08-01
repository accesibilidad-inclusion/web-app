<!-- eslint-disable max-len -->
<template>
  <div class="onboarding--inside">
    <div class="container">
      <form>
        <template v-if="showStep == 1">
          <h2 class="onboarding__title">
            Agregar una nueva tarea
            <text-to-speech :text-audio="'Agregar una nueva tarea'" />
          </h2>
          <div class="form-group">
            <input type="text" value="" v-model="task" placeholder="Ejemplo: Comprar tarjeta" /> <span @click="showStep = 2" v-if="task.trim() != ''">+</span>
          </div>
        </template>
        <template v-else-if="showStep == 2">
          <h2 class="onboarding__title">
            {{ task }}
          </h2>
          <p>Enumera los pasos requeridos para completar esta acción</p>
          <p>Mínimo 3 y máximo 9 pasos</p>
          <div class="form-group" v-for="(step, index) in steps" v-bind:key="index">
            {{ index + 1 }} <input type="text" value="" v-model="steps[index]" :placeholder="'Escribe el paso ' + parseInt(index+1)" />
            <span @click="steps.splice(index,1)" v-if="steps.length > 3">X</span>
          </div>
          <div @click="steps.push('')" v-if="addStep">
            Agregar otro paso
          </div>
        </template>
        <template v-else-if="showStep == 3">
          <h2 class="onboarding__title">
            {{ task }}
          </h2>
          <p>Revisa los pasos ingresados</p>
          <p>Edita o reordena los pasos en caso de ser necesario</p>
          <div class="form-group" v-for="(step, index) in steps" v-bind:key="index">
            {{ index + 1 }} <template v-if="editing != index">{{ step }} <span @click="editStep(index)">Editar</span></template>
            <template v-else><input type="text" v-model="stepEdit" /><span @click="steps[index] = stepEdit; editing = null">Listo</span><span @click="editing = null">Cancelar</span></template>
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
      <footer class="onboarding__footer">
        <div v-if="showStep == 4">
          <p>¿Quieres que te avisemos cuando publiquemos tu aporte?</p>
          <button v-if="!showEmailConfirm" class="btn btn--large btn--block btn--primary" @click="showEmailConfirm = true">Sí, avísame</button>
          <div v-else>
            <input type="text" value="" v-model="emailConfirm" placeholder="Escribe tu e-mail aquí" />
            <button class="btn btn--primary">Enviar</button>
          </div>
        </div>
        <button v-else :tag="'button'" class="btn btn--large btn--block btn--primary" @click="showStep < 3 ? showStep = 3 : sendTask()" :disabled="!addStep">
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

export default {
  name: 'NewTask',
  components: {
    OnboardingNext,
    TextToSpeech,
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
