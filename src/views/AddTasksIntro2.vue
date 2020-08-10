<!-- eslint-disable max-len -->
<template>
  <div class="onboarding--inside">
    <div class="container">
      <page-image alt="Persona señalando botón Agregar una tarea nueva" class="onboarding__welcome-image"></page-image>
      <h2 class="onboarding__title">
        No está la tarea que buscas
        <text-to-speech :text-audio="'No está la tarea que buscas\n\n\n\n\n\n'
          + 'O si hay tareas, pero no está la que tú quieres hacer, también puedes agregarla.'" />
      </h2>
      <p>O si hay tareas, pero no está la que tú quieres hacer, también puedes agregarla.</p>
      <footer class="onboarding__footer">
        <ol class="onboarding__steps">
          <li class="onboarding__step-indicator--active"></li>
          <li class="onboarding__step-indicator--active"></li>
          <li></li>
          <li></li>
          <li></li>
        </ol>
        <OnboardingNext :linkTo="'/agregar-tareas-intro3/'" />
      </footer>
    </div>
  </div>
</template>

<script>
import OnboardingNext from '@/components/OnboardingNext.vue';
import TextToSpeech from '@/components/TextToSpeech.vue';
import PageImage from '../../public/img/illustrations/epica-3-no-esta-la-tarea.svg?inline';

export default {
  name: 'AddTasksIntro2',
  components: {
    OnboardingNext,
    TextToSpeech,
    PageImage,
  },
};
</script>
