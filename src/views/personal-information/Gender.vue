<template>
  <div class="onboarding">
    <header class="onboarding__navbar">
      <back-button></back-button>
    </header>
    <div class="container">
      <h2 class="onboarding__title">
        Indica tu género
        <text-to-speech :text-audio="
          'Indica tu género\n\n\n\n\n\n'
          + 'Masculino\n\n\n\n\n'
          + 'Femenino\n\n\n\n\n'
          + 'No binario\n\n\n\n\n'
          + 'Prefiero no decirlo'
        " />
      </h2>
      <div class="custom-control custom-control--radio">
        <input type="radio" name="gender" id="man" value="Masculino" class="custom-control__input" v-model="gender" @change="genderChange" :checked="gender == 'Masculino'">
        <label for="man" class="custom-control__label">Masculino</label>
      </div>
      <div class="custom-control custom-control--radio">
        <input type="radio" name="gender" id="woman" value="Femenino" class="custom-control__input" v-model="gender" @change="genderChange" :checked="gender == 'Femenino'">
        <label for="woman" class="custom-control__label">Femenino</label>
      </div>
      <div class="custom-control custom-control--radio">
        <input type="radio" name="gender" id="non-binary" value="No binario" class="custom-control__input" v-model="gender" @change="genderChange" :checked="gender == 'No binario'">
        <label for="non-binary" class="custom-control__label">No binario</label>
      </div>
      <div class="custom-control custom-control--radio">
        <input type="radio" name="gender" id="prefer-not-to-say" value="Prefiero no decirlo" class="custom-control__input" v-model="gender" @change="genderChange" :checked="gender == 'Prefiero no decirlo'">
        <label for="prefer-not-to-say" class="custom-control__label">Prefiero no decirlo</label>
      </div>
      <footer class="onboarding__footer">
        <onboarding-next :linkTo="'/personal-information/disability'" :isDisabled="!canContinue"></onboarding-next>
      </footer>
    </div>
  </div>
</template>

<script>
import BackButton from '@/components/BackButton.vue';
import OnboardingNext from '@/components/OnboardingNext.vue';
import TextToSpeech from '@/components/TextToSpeech.vue';

export default {
  name: 'gender',
  components: {
    BackButton,
    OnboardingNext,
    TextToSpeech,
  },
  data() {
    return {
      gender: this.$store.state.user.gender,
    };
  },
  methods: {
    genderChange(event) {
      this.$store.commit('gender', event.target.value);
    },
  },
  computed: {
    canContinue() {
      return this.gender !== null;
    },
  },
};
</script>
