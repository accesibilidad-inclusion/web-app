<template>
  <div class="onboarding">
    <header class="onboarding__navbar">
      <back-button></back-button>
    </header>
    <div class="container">
      <!-- eslint-disable-next-line max-len -->
      <h2 class="onboarding__title">¿Tienes alguna discapacidad? <text-to-speech :text-audio="'¿Tienes alguna discapacidad?'" /></h2>
      <div class="custom-control custom-control--radio">
        <input type="radio" name="disability" id="yes" value="yes" class="custom-control__input">
        <label for="yes" class="custom-control__label">Sí</label>
      </div>
      <div class="custom-control custom-control--radio">
        <input type="radio" name="disability" id="no" value="no" class="custom-control__input">
        <label for="no" class="custom-control__label">No</label>
      </div>
      <footer class="onboarding__footer">
        <onboarding-next :linkTo="'disability-details'" :disabled="true"></onboarding-next>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
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
};
</script>
