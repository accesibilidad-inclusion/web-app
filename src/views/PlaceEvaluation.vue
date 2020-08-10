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
          <input type="radio" name="dicotomico_si" id="dicotomico_si" value="Si" class="custom-control__input" @change="setAnswer">
          <label for="dicotomico_si" class="custom-control__label">Si</label>
        </div>
        <div class="custom-control custom-control--radio">
          <input type="radio" name="dicotomico_no" id="dicotomico_no" value="No" class="custom-control__input" @change="setAnswer">
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
          <input type="text" @change="setAnswer" />
        </div>
      </template>
      <template v-if="question.answer_type == 'Fotografía'">
        <img id="photo" class="photo">
        <span @click="takePhoto" v-if="isResponsed">Cambiar foto</span>
        <span @click="deletePicture" v-if="isResponsed">Eliminar foto</span>
      </template>
      <template v-if="question.answer_type == 'Indicador'">
        <ul class="onboarding__evaluation">
          <li @click="setIndicator(5)">
            <span class="place__evaluation-grade place-block__evaluation-grade place__evaluation-grade--lg" data-grade="5">5</span>
            <span class="place-block__evaluation-description"><strong>Excelente:</strong> No necesita mejoras.</span>
          </li>
          <li @click="setIndicator(4)">
            <span class="place__evaluation-grade place-block__evaluation-grade place__evaluation-grade--lg" data-grade="4">4</span>
            <span class="place-block__evaluation-description"><strong>Bueno:</strong> Necesita pocas mejoras.</span>
          </li>
          <li @click="setIndicator(3)">
            <span class="place__evaluation-grade place-block__evaluation-grade place__evaluation-grade--lg" data-grade="3">3</span>
            <span class="place-block__evaluation-description"><strong>Regular:</strong> Ni bueno Ni malo.</span>
          </li>
          <li @click="setIndicator(2)">
            <span class="place__evaluation-grade place-block__evaluation-grade place__evaluation-grade--lg" data-grade="2">2</span>
            <span class="place-block__evaluation-description"><strong>Malo:</strong> Necesita muchas mejoras.</span>
          </li>
          <li @click="setIndicator(1)">
            <span class="place__evaluation-grade place-block__evaluation-grade place__evaluation-grade--lg" data-grade="1">1</span>
            <span class="place-block__evaluation-description"><strong>Pésimo:</strong> Tiene que mejorar todo.</span>
          </li>
        </ul>
      </template>
      <footer class="onboarding__footer">
        <input type="file" accept="image/*" capture="camera" id="camera" @change="setPicture" />
        <button v-if="btnPicture" class="btn btn--large btn--block btn--primary" @click="takePhoto">Tomar foto</button>
        <button v-else class="btn btn--large btn--block btn--primary" :disabled="!canAdvance" @click="next">
          <span v-if="isLast">Evaluar</span>
          <span v-else>Siguiente</span>
        </button>
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
      answers: [],
      factor: 0
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
    btnPicture() {
      return this.question.answer_type == 'Fotografía' && !this.isResponsed
    },
    canAdvance() {
      return this.question.answer_type == 'Instrucción' || this.question.answer_type == 'Texto' ? true : this.isResponsed
    },
    isResponsed() {
      return this.answers.filter( a => a.question_id == this.question.id ).length
    },
    isLast() {
      return this.questions.length - 1 == this.n
    },
    isPreLast() {
      return this.questions.length - 2 == this.n
    },
    score() {
      let points = 0
      this.answers.filter( a => a.type == 'Indicador').forEach( answer => {
        points += answer.answer
      })
      let score = 1
      for( let i = 1; i <= 5; i++ ) {
        if( points <= this.factor * i ) {
          score = i;
          break;
        }
      }
      return score
    }
  },
  mounted() {
    let countIndicator = this.$store.state.questions.filter( q => q.answer_type == 'Indicador' ).length
    this.$store.state.questions.forEach( question => {
      countIndicator += question.questions.filter( q => q.answer_type == 'Indicador' ).length
    } )
    this.factor = countIndicator
  },
  methods: {
    next() {
      if(this.isLast) {
        this.$router.push({
          name: 'place-evaluation-confirmation',
          params: { answers: this.answers }
        });
      }
      else {
        if(this.question.answer_type == 'Dicotomico' && this.answers.find( a => a.question_id == this.question.id ).answer == 'Si') 
          this.subn = 0
        else {
          if(this.subn !== null) {
            if(this.subn == this.questions[this.n].questions.length - 1)
            {
              this.subn = null
              this.n++
            }
            else
              this.subn++
          }
          else
            this.n++
        }
      }
      if(document.querySelector('input[name="dicotomico_no"]:checked'))
        document.querySelector('input[name="dicotomico_no"]:checked').checked = false;
    },
    setAnswer(event) {
      if( this.answers.find( a => a.question_id == this.question.id ) ) {
        this.answers.splice(this.answers.findIndex( a => a.question_id == this.question.id ), 1)
      }
      if(event.target.value.trim() !== '') {
        this.answers.push({
          question_id: this.question.id,
          type: this.question.answer_type,
          answer: event.target.value
        })
      }
    },
    setIndicator(indicator) {
      if( this.answers.find( a => a.question_id == this.question.id ) ) {
        this.answers.splice(this.answers.findIndex( a => a.question_id == this.question.id ), 1)
      }
      this.answers.push({
        question_id: this.question.id,
          type: this.question.answer_type,
        answer: indicator
      })
    },
    takePhoto() {
      document.querySelector('#camera').click()
    },
    setPicture() {
      var file = document.querySelector('#camera').files[0]
      var reader = new FileReader()
      reader.onload = (e) => {
        if( this.answers.find( a => a.question_id == this.question.id ) ) {
          this.answers.splice(this.answers.findIndex( a => a.question_id == this.question.id ), 1)
        }
        document.querySelector('#photo').src = e.target.result
        this.answers.push({
          question_id: this.question.id,
          type: this.question.answer_type,
          answer: e.target.result
        })      
      };
      reader.onerror = (error) => {
        console.log(error)
      };
      reader.readAsDataURL(file);
    },
    deletePicture() {
        this.answers.splice(this.answers.findIndex( a => a.question_id == this.question.id ), 1)
        document.querySelector('#photo').src = ''
    }
  }
};
</script>
<style lang="scss">
#camera {
  display: none;
}
</style>