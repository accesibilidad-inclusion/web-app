<template>
  <div class="page">
    <div class="container">
      <header class="place__header">
        <router-link :to="'/'+ $store.state.selected.category.slug +'/'+ $store.state.selected.service.slug" class="place__service">{{ service.name }}</router-link>
        <h1 class="place__name">{{ place.name }}</h1>
        <text-to-speech :text-audio="`Evaluando ${ place.name } de ${ service.name }`" />
        <span class="page__tag">Evaluando</span>
      </header>
      <h2 class="page__title">
      {{ question.text | replace(place.name) }}
        <text-to-speech :text-audio="$options.filters.replace(question.text, place.name)" />
      </h2>
      <template v-if="question.answer_type == 'Dicotomico'">
        <div class="custom-control custom-control--radio">
          <input id="dicotomico_si" type="radio" name="dicotomico" value="Si" class="custom-control__input" @change="setAnswer">
          <label for="dicotomico_si" class="custom-control__label">Si</label>
        </div>
        <div class="custom-control custom-control--radio">
          <input id="dicotomico_no" type="radio" name="dicotomico" value="No" class="custom-control__input" @change="setAnswer">
          <label for="dicotomico_no" class="custom-control__label">No</label>
        </div>
      </template>
      <template v-if="question.answer_type == 'Opciones'">
        <div v-for="option in question.options" :key="option.id" class="custom-control custom-control--radio">
          <input :id="'opt'+option.id" type="radio" name="gender" :value="option.name" class="custom-control__input" @change="setAnswer">
          <label :for="'opt'+option.id" class="custom-control__label">{{ option.name }}</label>
        </div>
      </template>
      <template v-if="question.answer_type == 'Texto'">
        <div class="custom-control custom-control--text">
          <input type="text" placeholder="Escribe aquí tu respuesta" class="custom-control__answer" @change="setAnswer" />
        </div>
      </template>
      <template v-if="question.answer_type == 'Fotografía'">
        <div class="page__photo-block">
          <div class="page__photo-wrapper">
            <img id="photo" class="photo">
          </div>
          <div v-if="isResponsed" class="page__photo-edit">
            <span v-if="isResponsed" class="page__photo-change" @click="takePhoto"><icon-camera />Cambiar foto</span>
            <span v-if="isResponsed" class="page__photo-delete" @click="deletePicture"><icon-delete />Eliminar foto</span>
          </div>
        </div>
      </template>
      <template v-if="question.answer_type == 'Indicador' || question.answer_type == 'Global'">
        <ul class="page__evaluation">
          <li class="page__evaluation-grade" :class="isActiveIndicator(5) ? 'active' : ''" @click="setIndicator(5)">
            <span class="place__evaluation-grade place-block__evaluation-grade place__evaluation-grade--lg" data-grade="5">5</span>
            <span class="place-block__evaluation-description"><strong>Excelente:</strong> No necesita mejoras.</span>
          </li>
          <li class="page__evaluation-grade" :class="isActiveIndicator(4) ? 'active' : ''" @click="setIndicator(4)">
            <span class="place__evaluation-grade place-block__evaluation-grade place__evaluation-grade--lg" data-grade="4">4</span>
            <span class="place-block__evaluation-description"><strong>Bueno:</strong> Necesita pocas mejoras.</span>
          </li>
          <li class="page__evaluation-grade" :class="isActiveIndicator(3) ? 'active' : ''" @click="setIndicator(3)">
            <span class="place__evaluation-grade place-block__evaluation-grade place__evaluation-grade--lg" data-grade="3">3</span>
            <span class="place-block__evaluation-description"><strong>Regular:</strong> Ni bueno Ni malo.</span>
          </li>
          <li class="page__evaluation-grade" :class="isActiveIndicator(2) ? 'active' : ''" @click="setIndicator(2)">
            <span class="place__evaluation-grade place-block__evaluation-grade place__evaluation-grade--lg" data-grade="2">2</span>
            <span class="place-block__evaluation-description"><strong>Malo:</strong> Necesita muchas mejoras.</span>
          </li>
          <li class="page__evaluation-grade" :class="isActiveIndicator(1) ? 'active' : ''" @click="setIndicator(1)">
            <span class="place__evaluation-grade place-block__evaluation-grade place__evaluation-grade--lg" data-grade="1">1</span>
            <span class="place-block__evaluation-description"><strong>Pésimo:</strong> Tiene que mejorar todo.</span>
          </li>
        </ul>
      </template>
      <footer class="page__footer">
        <input id="camera" type="file" accept="image/*" capture="camera" @change="setPicture" />
        <button v-if="btnPicture" class="btn btn--large btn--block btn--highlight" @click="takePhoto"><icon-camera />Tomar foto</button>
        <button v-else class="btn btn--large btn--block btn--primary" :disabled="!canAdvance" @click="next">
          <span v-if="isLast">Evaluar</span>
          <span v-else>Siguiente</span>
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import Service from '@/models/Service';
import Venue from '@/models/Venue';
import TextToSpeech from '@/components/TextToSpeech.vue';
import IconCamera from '../../public/img/app-icons/camera.svg?inline';
import IconDelete from '../../public/img/app-icons/error.svg?inline';

export default {
  name: 'PlaceEvaluation',
  components: {
    TextToSpeech,
    IconCamera,
    IconDelete,
  },
  filters: {
    replace(value, venue) {
      return value.replace(/{{ service\.name }}/g, venue);
    },
  },
  data() {
    return {
      n: 0,
      subn: null,
      questions: this.$store.state.questions,
      answers: [],
      factor: 0,
      service: new Service(this.$store.state.selected.service),
      place: new Venue(this.$store.state.selected.venue),
    };
  },
  computed: {
    question() {
      let q;
      if (this.subn !== null) {
        q = this.questions[this.n].questions[this.subn];
      } else {
        q = this.questions[this.n];
      }
      return q;
    },
    btnPicture() {
      return this.question.answer_type === 'Fotografía' && !this.isResponsed;
    },
    canAdvance() {
      return this.question.answer_type === 'Instrucción' || this.question.answer_type === 'Texto' ? true : this.isResponsed;
    },
    isResponsed() {
      return this.answers.filter(a => a.question_id === this.question.id).length;
    },
    isLast() {
      return this.questions.length - 1 === this.n;
    },
    isPreLast() {
      return this.questions.length - 2 === this.n;
    },
    score() {
      let points = 0;
      this.answers.filter(a => a.type === 'Indicador').forEach((answer) => {
        points += answer.answer;
      });
      let score = 1;
      for (let i = 1; i <= 5; i += 1) {
        if (points <= this.factor * i) {
          score = i;
          break;
        }
      }
      return score;
    },
  },
  mounted() {
    let countIndicator = this.$store.state.questions.filter(q => q.answer_type === 'Indicador').length;
    this.$store.state.questions.forEach((question) => {
      countIndicator += question.questions.filter(q => q.answer_type === 'Indicador').length;
    });
    this.factor = countIndicator;
    document.title = `Evaluando ${this.place.name} (${this.service.name}) | Pictos`;
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from.name === 'place-evaluation-confirmation') {
        this.n = this.questions.length - 1;
      }
    });
  },
  methods: {
    comeback() {
      if (this.n === 0) {
        this.$router.go(-1);
      } else {
        // eslint-disable-next-line max-len
        const preQuestion = this.questions[this.questions.findIndex(q => q.id === this.question.id) - 1];
        // eslint-disable-next-line no-lonely-if
        if (this.subn !== null) {
          if (this.subn > 0) {
            this.subn -= 1;
          } else {
            this.subn = null;
          }
        } else if (preQuestion.answer_type === 'Dicotomico' && this.answers.find(a => a.question_id === preQuestion.id).answer === 'Si') {
          this.subn = preQuestion.questions.length - 1;
          this.n -= 1;
        } else {
          this.n -= 1;
        }
      }
    },
    next() {
      if (this.isLast) {
        this.$router.push({
          name: 'place-evaluation-confirmation',
          params: { answers: this.answers },
        });
      } else {
        // eslint-disable-next-line no-lonely-if
        if (this.question.answer_type === 'Dicotomico' && this.answers.find(a => a.question_id === this.question.id).answer === 'Si') {
          this.subn = 0;
        } else if (this.subn !== null) {
          if (this.subn === this.questions[this.n].questions.length - 1) {
            this.subn = null;
            this.n += 1;
          } else {
            this.subn += 1;
          }
        } else {
          this.n += 1;
        }
      }
      if (document.querySelector('input[id="dicotomico_no"]:checked')) {
        document.querySelector('input[id="dicotomico_no"]:checked').checked = false;
      }
    },
    setAnswer(event) {
      if (this.answers.find(a => a.question_id === this.question.id)) {
        this.answers.splice(this.answers.findIndex(a => a.question_id === this.question.id), 1);
      }
      if (event.target.value.trim() !== '') {
        this.answers.push({
          question_id: this.question.id,
          type: this.question.answer_type,
          answer: event.target.value,
        });
      }
    },
    setIndicator(indicator) {
      if (this.answers.find(a => a.question_id === this.question.id)) {
        this.answers.splice(this.answers.findIndex(a => a.question_id === this.question.id), 1);
      }
      this.answers.push({
        question_id: this.question.id,
        type: this.question.answer_type,
        answer: indicator,
      });
    },
    takePhoto() {
      document.querySelector('#camera').click();
    },
    setPicture() {
      const file = document.querySelector('#camera').files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (this.answers.find(a => a.question_id === this.question.id)) {
          this.answers.splice(this.answers.findIndex(a => a.question_id === this.question.id), 1);
        }
        const byteString = atob(e.target.result.split(',')[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: 'image/jpeg' });
        document.querySelector('#photo').src = URL.createObjectURL(blob);
        this.answers.push({
          question_id: this.question.id,
          type: this.question.answer_type,
          answer: e.target.result,
        });
      };
      reader.onerror = (error) => {
        // console.log(error);
      };
      reader.readAsDataURL(file);
    },
    deletePicture() {
      this.answers.splice(this.answers.findIndex(a => a.question_id === this.question.id), 1);
      document.querySelector('#photo').src = '';
    },
    isActiveIndicator(i) {
      // eslint-disable-next-line max-len
      return this.answers.find(a => a.question_id === this.question.id) && this.answers.find(a => a.question_id === this.question.id).answer === i;
    },
  },
};
</script>
<style lang="scss">
@import '@/assets/scss/rfs.scss';

  .page {
    .custom-control__answer {
      @include rfs($font-size-16);
      width: 100%;
      padding: var(--spacer-sm);
      border: 1px solid var(--color-neutral-lighter);
      border-radius: var(--border-radius);
      &::placeholder {
        color: #848484;
        opacity: 1;
        font-style: italic;
        font-family: var(--font-family);
      }
    }
    .place__header {
      margin: calc( var(--spacer) * -1) calc( var(--spacer) * -1) var(--spacer);
      @media screen and ( min-width: 640px ) {
        margin: calc( var(--spacer-lg) * -1) calc( var(--spacer-lg) * -1) var(--spacer-lg);
      }
      @media screen and ( min-width: 1280px ) {
        margin: calc( var(--spacer-xl) * -1) calc( var(--spacer-xl) * -1) var(--spacer-xl);
      }
      .tts {
        top: calc(var(--spacer) + var(--spacer-sm));
        right: var(--spacer);
        @media screen and ( min-width: 640px ) {
          top: calc(var(--spacer) + var(--spacer-sm));
          right: var(--spacer-lg);
        }
        @media screen and ( min-width: 1280px ) {
          top: calc(var(--spacer) + var(--spacer-sm));
          right: var(--spacer-xl);
        }
      }
    }
  }
  .btn--highlight {
      svg {
      width: 1rem;;
      height: auto;
      margin-right: var(--spacer-xs);
      vertical-align: middle;
      path {
        fill: var(--color-brand-darkest);
      }
    }
  }
  .page__tag {
    @include rfs($font-size-14);
    color: var(--color-highlight);
    font-weight: 800;
    text-align: center;
    display: block;
    padding-bottom: var(--spacer-xs);
    z-index: 10;
    position: relative;
  }
  //Imagen
  #camera {
    display: none;
  }
  .page__photo-block {
    display: grid;
    grid-template-columns: 45% 55%;
    height: 8.5rem;
    overflow: hidden;
    align-items: center;
    @media screen and ( min-width: 640px ) {
      height: 10rem;
    }
  }
  .page__photo-wrapper {
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .page__photo-edit {
    background-color: var(--color-neutral-lightest);
    padding: 0 var(--spacer-sm);
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 8.5rem;
    @media screen and ( min-width: 640px ) {
      height: 10rem;
    }
    span {
      @include rfs($font-size-16);
      font-weight: 600;
      display: block;
      color: var(--color-neutral);
      padding: var(--spacer) var(--spacer-xs);
      margin: 0 var(--spacer-sm);
      text-align: center;
      cursor: pointer;
      svg {
        margin-right: var(--spacer-xs);
        path {
          fill: var(--color-neutral);
        }
      }
    }
  }
  .page__photo-change {
    border-bottom: 1px solid var(--color-neutral-lighter);
    svg {
      width: 1rem;
      height: auto;
    }
  }
  .page__photo-delete {
    svg {
      width: 0.6rem;
      height: auto;
    }
  }
  //Evaluación puntuación
  .page__evaluation {
    list-style: none;
    margin: var(--spacer-sm) calc( var(--spacer) * -1) var(--spacer) calc( var(--spacer) * -1);
    @media screen and ( min-width: 640px ) {
      margin-right: calc( var(--spacer-lg) * -1);
      margin-left: calc( var(--spacer-lg) * -1);
    }
    @media screen and ( min-width: 1288px ) {
      margin-right: calc( var(--spacer-xl) * -1);
      margin-left: calc( var(--spacer-xl) * -1);
    }
    .place__evaluation-grade--lg {
      width: 4rem;
      height: 4rem;
      font-size: calc(var(--spacer-lg) * 1.2);
      display: inherit;
      margin: 0 0 0 var(--spacer);
      @media screen and ( min-width: 640px ) {
        margin-left: var(--spacer-lg);
      }
      @media screen and ( min-width: 1288px ) {
        margin-left: var(--spacer-xl);
      }
    }
    .place-block__evaluation-description {
      @include rfs($font-size-16);
      color: var(--color-neutral);
      margin-left: var(--spacer-sm);
      strong {
        text-transform: uppercase;
        display: block;
        color: var(--color-brand-darkest);
      }
    }
  }
  .page__evaluation-grade{
    display: flex;
    align-items: center;
    border-top: 1px solid var(--color-neutral-lightest);
    padding-top: var(--spacer-sm);
    padding-bottom: var(--spacer-sm);
    transition: var(--transition-base);
    &:last-child {
      border-bottom: 1px solid var(--color-neutral-lightest);
    }
    @media screen and ( min-width: 640px ) {
      padding-top: var(--spacer);
      padding-bottom: var(--spacer);
      column-gap: var(--spacer);
    }
    &.active {
      .place-block__evaluation-description {
        color: var(--color-brand-darkest);
      }
      &:nth-child(1) {
        background: var(--color-grade-5);
      }
      &:nth-child(2) {
        background: var(--color-grade-4);
      }
      &:nth-child(3) {
        background: var(--color-grade-3);
      }
      &:nth-child(4) {
        background: var(--color-grade-2);
      }
      &:nth-child(5) {
        background: var(--color-grade-1);
      }
    }
  }


</style>
