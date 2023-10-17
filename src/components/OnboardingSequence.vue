<template>
  <div>
    <div class="onboarding__body">
      <!-- <a href="javascript:void(0)" @click="finishing">Cerrar</a> -->
      <OnboardingStep :data="sequence[currentStep]"></OnboardingStep>
    </div>
    <footer class="onboarding__footer">
      <button class="btn btn--large btn--primary" v-if="currentStep > 0" @click="rewindStep">
        Atrás
      </button>
      <button class="btn btn--large btn--primary" v-if="currentStep < sequence.length - 1" @click="advanceStep">
        Siguiente
      </button>
      <button class="btn btn--large btn--primary" v-if="currentStep === sequence.length - 1" @click="finishing">
        Finalizar
      </button>
    </footer>
  </div>
</template>

<script>
import OnboardingStep from './OnboardingStep.vue';

export default {
  name: 'OnboardingSequence',
  components: {
    OnboardingStep
  },
  props: {
    sequence: {
      type: Array,
      required: true,
    },
    redirectTo: {
      type: String,
      required: true,
    },
    setState: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      currentStep: 0
    }
  },
  methods: {
    rewindStep() {
      this.currentStep = this.currentStep - 1;
    },
    advanceStep() {
      this.currentStep = this.currentStep + 1;
    },
    finishing() {
      this.$store.commit(this.setState);
      this.$router.push(this.redirectTo).catch(() => {});
    }
  }
};
</script>
<style lang="scss">
.onboarding__footer{
  display: flex;
  flex: 1 1;
}
</style>
