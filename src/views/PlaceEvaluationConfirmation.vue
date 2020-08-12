<!-- eslint-disable max-len -->
<template>
  <div class="page">
    <div class="container">
      <header class="place__header">
        <router-link :to="'/servicios/'" class="place__service">service.name</router-link>
        <h1 class="place__name">place.name</h1>
        <text-to-speech :text-audio="''" />
      </header>
      <h2 class="page__evaluation-title">
        Has evaluado este servicio
        <text-to-speech text-audio="Has evaluado este servicio " />
      </h2>
      <p class="page__evaluation-subtitle">Promedio de evaluación</p>
      <div class="place__evaluation-grade place__evaluation-grade--xl" v-bind:data-grade="score">
        <span>{{ score }}</span>
        <h3 class="page__evaluation-name">Excelente</h3>
      </div>
      <p class="page__evaluation-description">{{ $store.state.evaluations.find(e => e.grade == score ).desc }}</p>
      <footer class="page__footer">
        <button class="btn btn--large btn--block btn--primary" @click="next">
          <span>Terminar evaluación</span>
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import TextToSpeech from '@/components/TextToSpeech.vue';

export default {
  name: 'PlaceEvaluationConfirmation',
  components: {
    TextToSpeech,
  },
  data() {
    return {
      answers: [],
    };
  },
  beforeMount() {
    if (!this.$route.params.answers) {
      this.$router.push({
        name: 'place-evaluation',
      });
    } else {
      this.answers = this.$route.params.answers;
    }
  },
  computed: {
    score() {
      let countIndicator = this.$store.state.questions.filter(q => q.answer_type === 'Indicador').length;
      this.$store.state.questions.forEach((question) => {
        countIndicator += question.questions.filter(q => q.answer_type === 'Indicador').length;
      });
      let points = 0;
      this.answers.filter(a => a.type === 'Indicador').forEach((answer) => {
        points += answer.answer;
      });
      let score = 1;
      for (let i = 1; i <= 5; i += 1) {
        if (points <= countIndicator * i) {
          score = i;
          break;
        }
      }
      return score;
    },
  },
  methods: {
    next() {
      this.$router.push({
        name: 'place-evaluation-complete',
        params: { answers: this.answers },
      });
    },
  },
};
</script>
<style lang="scss">
  @import '@/assets/scss/rfs.scss';

  .page__evaluation-title {
    @include rfs($font-size-18);
    color: var(--color-text);
    margin-bottom: var(--spacer);
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: var(--spacer);
    align-items: flex-start;
    text-align: center;
    @media screen and ( min-width: 640px ) {
        margin-bottom: var(--spacer-lg);
    }
    .tts {
        position: relative;
        top: var(--spacer-xs);
    }
  }
  .page__evaluation-subtitle {
    @include rfs($font-size-13);
    color: var(--color-neutral);
    text-align: center;
    text-transform: uppercase;
    font-weight: 600;
    padding-bottom: var(--spacer);
  }
  .place__evaluation-grade--xl {
    grid-column: 1/3;
    grid-row: 2/3;
    width: 9rem;
    height: 9rem;
    margin-left: auto;
    margin-right: auto;
    font-size: 5.5rem;
    line-height: 5.5rem;
    color: var(--color-brand-darker);
    flex-direction: column;
    @media screen and ( min-width: 640px ) {
      width: 14rem;
      height: 14rem;
      font-size: 9rem;
      line-height: 9rem;
    }
  }
  .page__evaluation-name {
    @include rfs($font-size-16);
    grid-column: 1/3;
    grid-row: 1/2;
    font-weight: bold;
    line-height: calc( 25/13 );
    text-transform: uppercase;
  }
  .page__evaluation-description {
    @include rfs($font-size-16);
    text-align: center;
    color: var(--color-brand-darkest);
    font-weight: bold;
    padding-top: var(--spacer);
  }
</style>
