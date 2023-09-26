<template>
  <div class="onboarding--inside">
    <div class="container">
      <page-image alt="Persona siguiendo indicación de un pictograma" class="onboarding__welcome-image"></page-image>
      <h2 class="onboarding__title">
        Agregar una nueva tarea
        <text-to-speech :text-audio="'Agregar una nueva tarea\n\n\n\n\n\n'
          + 'Las tareas deben estar descritas paso a paso y de forma clara y sencilla.\n\n\n\n\n\n'
          + 'Acá te explicamos cómo hacerlo..'" />
      </h2>
      <p>Las tareas deben estar <strong>descritas</strong> paso a paso y de forma <strong>clara</strong> y <strong>sencilla.</strong></p>
      <p>Acá te explicamos cómo hacerlo.</p>
      <footer class="onboarding__footer">
        <ol class="onboarding__steps">
          <li class="onboarding__step-indicator--active"></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ol>
        <OnboardingNext :link-to="'/nueva-tarea/intro2/'" />
      </footer>
    </div>
  </div>
</template>

<script>
import OnboardingNext from '@/components/OnboardingNext.vue';
import TextToSpeech from '@/components/TextToSpeech.vue';
import PageImage from '../../public/img/illustrations/epica-10-agregar-nueva-tarea.svg?inline';

export default {
  name: 'NewTaskIntro',
  components: {
    OnboardingNext,
    TextToSpeech,
    PageImage,
  },
};
</script>
