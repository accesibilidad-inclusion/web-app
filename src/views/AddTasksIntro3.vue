<!-- eslint-disable max-len -->
<template>
  <div class="onboarding--inside">
    <div class="container">
      <page-image alt="Una mano señalando un signo más junto al campo de búsqueda" class="onboarding__welcome-image"></page-image>
      <h2 class="onboarding__title">
        Agrega una tarea
        <text-to-speech :text-audio="'Agrega una tarea\n\n\n\n\n\n'
          + 'Puedes agregar tareas apretando el signo +.\n\n\n\n\n\n'
          + 'Ten cuidado de escribir claramente y sin errores.'" />
      </h2>
      <p>Puedes agregar tareas apretando el signo +.</p>
      <p>Ten cuidado de escribir claramente y sin errores.</p>
      <footer class="onboarding__footer">
        <ol class="onboarding__steps">
          <li class="onboarding__step-indicator--active"></li>
          <li class="onboarding__step-indicator--active"></li>
          <li class="onboarding__step-indicator--active"></li>
          <li></li>
          <li></li>
        </ol>
        <OnboardingNext :linkTo="'/agregar-tareas-intro4/'" />
      </footer>
    </div>
  </div>
</template>

<script>
import OnboardingNext from '@/components/OnboardingNext.vue';
import TextToSpeech from '@/components/TextToSpeech.vue';
import PageImage from '../../public/img/illustrations/epica-3-agrega-una-tarea.svg?inline';

export default {
  name: 'AddTasksIntro3',
  components: {
    OnboardingNext,
    TextToSpeech,
    PageImage,
  },
};
</script>
