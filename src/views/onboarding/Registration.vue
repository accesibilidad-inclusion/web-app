<template>
  <div class="onboarding">
    <header class="onboarding__navbar">
      <back-button></back-button>
    </header>
    <div class="container">
      <!-- eslint-disable-next-line max-len -->
      <h2 class="onboarding__title">Cuéntanos un poco de ti <text-to-speech :text-audio="'Cuéntanos un poco de ti'" /></h2>
      <!-- eslint-disable-next-line max-len -->
      <p>Registra tu fecha de nacimiento, sexo y si tienes algún tipo de discapacidad. Toda la información será estrictamente confidencial.</p>
      <footer class="onboarding__footer">
        <onboarding-next :linkTo="'/onboarding/birthday'"></onboarding-next>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import BackButton from '@/components/BackButton.vue';
import TextToSpeech from '@/components/TextToSpeech.vue';
import OnboardingNext from '@/components/OnboardingNext.vue';

export default {
  name: 'Registration',
  components: {
    BackButton,
    TextToSpeech,
    OnboardingNext,
  },
};
</script>
