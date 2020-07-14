<!-- eslint-disable max-len -->
<template>
  <div class="page">
    <div class="container">
      <page-image alt="Persona activando el audio en la aplicación" class="onboarding__welcome-image"></page-image>
      <h2 class="page__title">
        Título
        <text-to-speech :text-audio="'Audio'" />
      </h2>
      <p>Contenido</p>
      <footer class="page__footer">
        <OnboardingNext :linkTo="'/path/'" />
      </footer>
    </div>
  </div>
</template>

<script>
import OnboardingNext from '@/components/OnboardingNext.vue';
import TextToSpeech from '@/components/TextToSpeech.vue';
import PageImage from '../../public/img/illustrations/onboarding-activar-audio.svg?inline';

export default {
  name: 'NewAidIntro4',
  components: {
    OnboardingNext,
    TextToSpeech,
    PageImage,
  },
};
</script>
