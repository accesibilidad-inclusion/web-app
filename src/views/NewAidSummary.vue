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
      <template v-for="proposal in proposal">
        <step-block v-bind:key="proposal.step.id" v-bind:proposal="proposal"></step-block>
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
import Task from '@/models/Task';

export default {
  name: 'NewAidSummary',
  components: {
    TextToSpeech,
    StepBlock,
  },
  data() {
    return {
      task: new Task(this.$store.state.selected.task),
      proposal: this.$store.state.proposalPictos,
    };
  },
  methods: {
    createAid() {
      this.$router.push({
        name: 'new-aid-complete',
      });
    },
  },
};
</script>

<style lang="scss">
</style>
