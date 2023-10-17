<template>
  <OnboardingSequence :sequence="sequence" set-state="tutorialOnboarding" :redirect-to="$store.state.redirectTo"></OnboardingSequence>
</template>

<script>
import OnboardingSequence from '@/components/OnboardingSequence.vue';

export default {
  name: 'WelcomeOnboarding',
  components: {
    OnboardingSequence
  },
  data() {
    return {
      sequence: [{
        title: 'Activa el audio',
        body: 'Si tienes dificultad o no quieres leer, no te preocupes. Puedes <b>activar la opción de sonido, pulsando el ícono de altavoz</b>.',
        image: () => import(`../../../public/img/illustrations/activar-tutoriales 1.svg?inline`),
      },{
        title: '¿Para qué sirve PICTOS?',
        body: 'Pictos te ayudará a realizar tareas en distintos servicios, mostrándote una lista de todas las cosas que puedes hacer en cada lugar.',
        image: () => import(`../../../public/img/illustrations/activar-tutoriales 2.svg?inline`),
      },{
        title: '¿Cómo funciona?',
        body: 'Pictos te explica paso a paso qué puedes hacer en cada lugar, a través de pictogramas.',
        image: () => import(`../../../public/img/illustrations/activar-tutoriales 3.svg?inline`),
      },{
        title: '¡Tú nos puedes ayudar!',
        body: 'Queremos entregar a la comunidad las herramientas para apoyarnos entre todos.',
        image: () => import(`../../../public/img/illustrations/activar-tutoriales 4.svg?inline`),
      }] 
    };
  },
  
};
</script>
