<template>
  <div class="onboarding--inside">
    <div class="container">
      <page-image alt="Persona junto a una tabla de evaluación" class="onboarding__welcome-image"></page-image>
      <ol class="onboarding__list">
        <li class="onboarding__list-item onboarding__text-audio">Debes estar en el lugar o servicio a evaluar.
          <text-to-speech :text-audio="'1\n\nDebes estar en el lugar o servicio a evaluar.\n\n\n\n\n'
          + '2\n\nObserva atentamente tu entorno.\n\n\n\n\n'
          + '3\n\nResponde todas las preguntas.\n\n\n\n\n'
          + '4\n\nEvalúa poniendo nota. Atención al método de puntuación.\n\n\n\n\n'
        " /></li>
        <li class="onboarding__list-item">Observa atentamente tu entorno.</li>
        <li class="onboarding__list-item">Responde todas las preguntas.</li>
        <li class="onboarding__list-item">Evalúa poniendo nota. Atención al método de puntuación.</li>
      </ol>
      <footer class="onboarding__footer">
        <ol class="onboarding__steps">
          <li class="onboarding__step-indicator--active"></li>
          <li class="onboarding__step-indicator--active"></li>
          <li></li>
        </ol>
        <OnboardingNext :link-to="'/evaluacion-lugar/intro3'" />
      </footer>
    </div>
  </div>
</template>

<script>
import OnboardingNext from '@/components/OnboardingNext.vue';
import TextToSpeech from '@/components/TextToSpeech.vue';
import PageImage from '../../public/img/illustrations/epica-5-evaluacion.svg?inline';

export default {
  name: 'PlaceEvaluationIntro2',
  components: {
    OnboardingNext,
    TextToSpeech,
    PageImage,
  },
};
</script>
