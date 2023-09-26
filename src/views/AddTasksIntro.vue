<template>
  <div class="onboarding--inside">
    <div class="container">
      <page-image alt="Persona sonriendo" class="onboarding__welcome-image"></page-image>
      <h2 class="onboarding__title">
        ¡Qué bueno que quieras colaborar!
        <text-to-speech :text-audio="'¡Qué bueno que quieras colaborar!\n\n\n\n\n\n'
          + 'Si en este lugar no hay tareas tú puedes agregarlas.'" />
      </h2>
      <p>Si en este lugar no hay tareas tú puedes agregarlas.</p>
      <footer class="onboarding__footer">
        <ol class="onboarding__steps">
          <li class="onboarding__step-indicator--active"></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ol>
        <OnboardingNext :link-to="'/agregar-tareas-intro2/'" />
      </footer>
    </div>
  </div>
</template>

<script>
import OnboardingNext from '@/components/OnboardingNext.vue';
import TextToSpeech from '@/components/TextToSpeech.vue';
import PageImage from '../../public/img/illustrations/epica-3-que-bueno-que-quieras-colaborar.svg?inline';

export default {
  name: 'AddTasksIntro',
  components: {
    OnboardingNext,
    TextToSpeech,
    PageImage,
  },
};
</script>
