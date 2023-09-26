<template>
  <div class="onboarding">
    <header class="onboarding__navbar">
      <back-button></back-button>
    </header>
    <div class="container">
      <!-- eslint-disable-next-line max-len -->
      <h2 class="onboarding__title">
        ¿Tienes alguna discapacidad?
        <text-to-speech :text-audio="
          '¿Tienes alguna discapacidad?\n\n\n\n\n\n\n'
          + 'Sí\n\n\n\n\n\n'
          + 'No'
        " />
      </h2>
      <div class="custom-control custom-control--radio">
        <input type="radio" name="disability" id="yes" value="yes" class="custom-control__input"
          v-model="disability" @change="disabilityChange" :checked="disability == 'yes'">
        <label for="yes" class="custom-control__label">Sí</label>
      </div>
      <div class="custom-control custom-control--radio">
        <input type="radio" name="disability" id="no" value="no" class="custom-control__input"
          v-model="disability" @change="disabilityChange" :checked="disability == 'no'">
        <label for="no" class="custom-control__label">No</label>
      </div>
      <footer class="onboarding__footer">
        <onboarding-next :linkTo="linkTo" :isDisabled="!canContinue"></onboarding-next>
      </footer>
    </div>
  </div>
</template>

<script>
import BackButton from '@/components/BackButton.vue';
import OnboardingNext from '@/components/OnboardingNext.vue';
import TextToSpeech from '@/components/TextToSpeech.vue';

export default {
  name: 'Disability',
  components: {
    BackButton,
    OnboardingNext,
    TextToSpeech,
  },
  data() {
    return {
      disability: this.$store.state.user.disability,
    };
  },
  methods: {
    disabilityChange(event) {
      this.$store.commit('disability', event.target.value);
    },
  },
  computed: {
    linkTo() {
      return this.disability === 'yes' ? '/personal-information/disability-details' : '/personal-information/complete';
    },
    canContinue() {
      return this.disability !== null;
    },
  },
};
</script>
