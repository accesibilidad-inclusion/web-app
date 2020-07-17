<!-- eslint-disable max-len -->
<template>
  <div class="new-aid">
    <header class="new-aid__header entries-list__header">
      <h1 class="new-aid__title entries-list__title">{{ task.title }}</h1>
      <text-to-speech :text-audio="task.title" />
    </header>
    <form class="new-aid__main">
      <header class="new-aid__main__header">
        <h2 class="new-aid__main__title">Selecciona los elementos para armar este paso</h2>
        <text-to-speech :text-audio="'Revisa que los pictogramas estén correctos'" />
      </header>
      <!-- Loop de pasos -->
      <template v-for="step in task.steps">
        <step-block v-bind:key="step.id" v-bind:step="step"></step-block>
      </template>
    </form>
    <div class="new-aid__actions">
      <button
        type="button"
        class="btn btn--large btn--block btn--primary"
        @click="createAid"
      >
        Confirmar
      </button>
    </div>
  </div>
</template>

<script>
import TextToSpeech from '@/components/TextToSpeech.vue';
import StepBlock from '@/components/StepBlock.vue';

export default {
  name: 'NewAidSummary',
  components: {
    TextToSpeech,
    StepBlock,
  },
  data() {
    return {
      task: {
        id: 1,
        title: 'Viajar de un punto a otro',
        place: 'Estación Viña del Mar',
        place_id: 1,
        service: 'Metro de Valparaíso',
        service_id: 1,
        aids: [
          {
            type: 'graphic',
            enabled: true,
          },
          {
            type: 'written',
            enabled: true,
          },
          {
            type: 'aural',
            enabled: true,
          },
        ],
        steps: [
          {
            id: 1,
            order: 0,
            legend: 'Pasa tu tarjeta por el sensor del torniquete',
            layers: {
              subject: {
                img: '1-subject/handle--third-quadrant.svg',
              },
              landmark: {
                img: '2-landmarks/turnstile.svg',
              },
              context: {
                img: '3-context/sign-center.svg',
              },
            },
          },
          {
            id: 2,
            order: 1,
            legend: 'Baja al andén correspondiente',
            layers: {
              subject: {
                img: '1-subject/go-down--third-quadrant.svg',
              },
              landmark: {
                img: '2-landmarks/exit.svg',
              },
            },
          },
          {
            id: 3,
            order: 2,
            legend: 'Espera el metro detrás de la línea',
            layers: {
              subject: {
                img: '1-subject/wait-side--first-quadrant.svg',
              },
              landmark: {
                img: '2-landmarks/metro--front.svg',
              },
            },
          },
        ],
      },
    };
  },
  methods: {
    createAid() {
    },
  },
};
</script>

<style lang="scss">
</style>
