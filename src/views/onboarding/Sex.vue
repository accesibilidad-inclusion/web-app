<!-- eslint-disable max-len -->
<template>
  <div class="onboarding">
    <header class="onboarding__navbar">
      <back-button></back-button>
    </header>
    <div class="container">
      <h2 class="onboarding__title">Indica tu sexo <text-to-speech :text-audio="'Indica tu sexo'" /></h2>
      <div class="custom-control custom-control--radio">
        <input type="radio" name="sex" id="woman" value="woman" class="custom-control__input"
          v-model="sex" @change="sexChange" :checked="sex == 'woman'">
        <label for="woman" class="custom-control__label">Mujer</label>
      </div>
      <div class="custom-control custom-control--radio">
        <input type="radio" name="sex" id="man" value="man" class="custom-control__input"
          v-model="sex" @change="sexChange" :checked="sex == 'man'">
        <label for="man" class="custom-control__label">Hombre</label>
      </div>
      <footer class="onboarding__footer">
        <onboarding-next :linkTo="'/onboarding/disability'" :isDisabled="!canContinue"></onboarding-next>
      </footer>
    </div>
  </div>
</template>

<script>
import BackButton from '@/components/BackButton.vue';
import OnboardingNext from '@/components/OnboardingNext.vue';
import TextToSpeech from '@/components/TextToSpeech.vue';

export default {
  name: 'Sex',
  components: {
    BackButton,
    OnboardingNext,
    TextToSpeech,
  },
  data() {
    return {
      sex: this.$store.state.user.sex,
    };
  },
  methods: {
    sexChange(event) {
      this.$store.commit('sex', event.target.value);
    },
  },
  computed: {
    canContinue() {
      return this.sex !== null;
    },
  },
};
</script>
