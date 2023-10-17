<template>
  <OnboardingSequence :sequence="sequence" set-state="tutorialPlace" :redirect-to="`/nuevo-lugar/${this.$route.params.service_id ? this.$route.params.service_id : ''}`"></OnboardingSequence>
</template>

<script>
import OnboardingSequence from '@/components/OnboardingSequence.vue';

export default {
  name: 'NewPlaceOnboarding',
  components: {
    OnboardingSequence
  },
  data() {
    return {
      sequence: [{
        title: 'Escribe el nombre del lugar.',
        body: 'PICTOS  te mostrará los lugares similares a lo que buscaste.',
        image: () => import(`../../../public/img/illustrations/sugerir-lugar 1.svg?inline`),
      },{
        title: 'Guarda el lugar',
        body: 'Para guardar el lugar que elegiste, presiona “Listo”.',
        image: () => import(`../../../public/img/illustrations/sugerir-lugar 2.svg?inline`),
      }] 
    };
  },
  
};
</script>
