<!-- eslint-disable max-len -->
<template>
  <div class="onboarding--inside">
    <div class="container">
      <page-image alt="Una mano indicando la lista de pasos" class="onboarding__welcome-image"></page-image>
      <p class="onboarding__text-audio">
        Verás una lista de pasos. En esta lista tu puedes:
        <text-to-speech :text-audio="'Verás una lista de pasos. En esta lista tu puedes:\n\n\n\n\n\n'
          + '1\n\nOrdenar los pasos de forma correcta.\n\n\n\n\n'
          + '2\n\nAgregar un nuevo paso faltante.\n\n\n\n\n'
          + '3\n\nVolver a escribir un paso de forma más clara y precisa.\n\n\n\n\n'" />
      </p>
      <ol class="onboarding__list">
        <li class="onboarding__list-item">Ordenar los pasos de forma correcta.</li>
        <li class="onboarding__list-item">Agregar un nuevo paso faltante.</li>
        <li class="onboarding__list-item">Volver a escribir un paso de forma más clara y precisa.</li>
      </ol>
      <footer class="onboarding__footer">
        <ol class="onboarding__steps">
          <li class="onboarding__step-indicator--active"></li>
          <li class="onboarding__step-indicator--active"></li>
          <li></li>
          <li></li>
          <li></li>
        </ol>
        <OnboardingNext :linkTo="'/nueva-tarea/intro3/'" />
      </footer>
    </div>
  </div>
</template>

<script>
import OnboardingNext from '@/components/OnboardingNext.vue';
import TextToSpeech from '@/components/TextToSpeech.vue';
import PageImage from '../../public/img/illustrations/epica-10-pasos.svg?inline';

export default {
  name: 'NewTaskIntro2',
  components: {
    OnboardingNext,
    TextToSpeech,
    PageImage,
  },
};
</script>
