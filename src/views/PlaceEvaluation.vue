<!-- eslint-disable max-len -->
<template>
  <div class="onboarding--inside">
    <div class="container">
      <h2 class="onboarding__title">
      {{ question.text }}
        <text-to-speech :text-audio="question" />
      </h2>
      <template v-if="question.answer_type == 'Dicotomico'">
        <div class="custom-control custom-control--radio">
          <input type="radio" name="dicotopico" id="dicotomico_si" value="Si" class="custom-control__input" @change="setAnswer">
          <label for="dicotomico_si" class="custom-control__label">Si</label>
        </div>
        <div class="custom-control custom-control--radio">
          <input type="radio" name="dicotopico" id="dicotomico_no" value="No" class="custom-control__input" @change="setAnswer">
          <label for="dicotomico_no" class="custom-control__label">No</label>
        </div>
      </template>
      <template v-if="question.answer_type == 'Opciones'">
        <div class="custom-control custom-control--radio" v-for="option in question.options" v-bind:key="option.id">
          <input type="radio" name="gender" :id="'opt'+option.id" :value="option.name" class="custom-control__input" @change="setAnswer">
          <label :for="'opt'+option.id" class="custom-control__label">{{ option.name }}</label>
        </div>
      </template>
      <template v-if="question.answer_type == 'Texto'">
        <div class="custom-control custom-control--text">
          <input type="text">
        </div>
      </template>
      <footer class="onboarding__footer">
        <button class="btn btn--large btn--block btn--primary" :disabled="!canAdvance" @click="next()">Siguiente</button>
      </footer>
    </div>
  </div>
</template>

<script>
import TextToSpeech from '@/components/TextToSpeech.vue';

export default {
  name: 'PlaceEvaluation',
  components: {
    TextToSpeech,
  },
  data() {
    return {
      n: 0,
      subn: null,
      questions: this.$store.state.questions,
      answers: []
    }
  },
  computed: {
    question() {
      let q
      if(this.subn !== null)
        q = this.questions[this.n].questions[this.subn]
      else
        q = this.questions[this.n]
      q.text = q.text.replace(/{{ service\.name }}/g, this.$store.state.selected.venue.name)
      return q
    },
    canAdvance() {
      return this.question.answer_type == 'Instrucción' || this.question.answer_type == 'Texto' ? true : this.isResponsed
    },
    isResponsed() {
      return this.answers.filter( a => a.question_id == this.question.id ).length
    }
  },
  methods: {
    next() {
      if(this.question.answer_type == 'Dicotomico' && this.answers.find( a => a.question_id == this.question.id ).answer == 'Si')
        this.subn = 0
      else
        this.n++
    },
    setAnswer(event) {
      if( this.answers.find( a => a.question_id == this.question.id ) ) {
        this.answers.splice(this.answers.findIndex( a => a.question_id == this.question.id ), 1)
      }
      this.answers.push({
        question_id: this.question.id,
        answer: event.target.value
      })
    }
  }
};
</script>
