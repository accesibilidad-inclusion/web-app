<!-- eslint-disable max-len -->
<template>
  <div class="onboarding--inside">
    <div class="container">
      <page-image alt="Flechas indicando botón listo" class="onboarding__welcome-image"></page-image>
      <h2 class="onboarding__title">
        Listo
        <text-to-speech :text-audio="'Listo\n\n\n\n\n\n'
          + 'Cuando esté listo, pincha el botón “Listo”.'" />
      </h2>
      <p>Cuando esté listo, pincha el botón “Listo”.</p>
      <footer class="onboarding__footer">
        <ol class="onboarding__steps">
          <li class="onboarding__step-indicator--active"></li>
          <li class="onboarding__step-indicator--active"></li>
          <li class="onboarding__step-indicator--active"></li>
          <li class="onboarding__step-indicator--active"></li>
          <li></li>
        </ol>
        <OnboardingNext :linkTo="'/agregar-tareas-intro5/'" />
      </footer>
    </div>
  </div>
</template>

<script>
import OnboardingNext from '@/components/OnboardingNext.vue';
import TextToSpeech from '@/components/TextToSpeech.vue';
import PageImage from '../../public/img/illustrations/epica-11-muy-facil.svg?inline';

export default {
  name: 'AddTasksIntro4',
  components: {
    OnboardingNext,
    TextToSpeech,
    PageImage,
  },
};
</script>
