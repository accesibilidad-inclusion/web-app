<!-- eslint-disable max-len -->
<template>
  <div class="onboarding--inside">
    <div class="container">
      <h2 class="onboarding__title">
        Has evaluado este servicio
        <text-to-speech text-audio="Has evaluado este servicio " />
      </h2>
      <p>Promedio de evaluación</p>
      {{ score }}
      {{ $store.state.evaluations.find(e => e.grade == score ).desc }}
      <footer class="onboarding__footer">
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
