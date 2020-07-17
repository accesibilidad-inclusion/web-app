<template>
  <div class="step-block">
    <div class="step-block__header">
      <span class="step-block__number">Paso {{ step.id }}</span>
      <button class="step-block__edit"><icon-edit class="step-block__edit-icon" />Editar</button>
    </div>
    <div class="step-block__body">
      <pictogram v-bind:layers="step.layers"></pictogram>
      <p>{{ step.legend }}</p>
    </div>
  </div>
</template>

<script>
import Pictogram from '@/components/Pictogram.vue';
import IconEdit from '../../public/img/app-icons/edit.svg?inline';

export default {
  name: 'StepBlock',
  props: {
    step: {
      type: Object,
    },
  },
  components: {
    Pictogram,
    IconEdit,
  },
};
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/rfs.scss';

  .step-block {
    border-radius: var(--border-radius-lg);
    background-color: var(--color-brand-lighter);
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.05);
    & + .step-block {
      margin-top: var(--spacer);
    }
  }
  .step-block__header {
    display: grid;
    grid-template-columns: auto auto;
    justify-content: space-between;
    align-items: flex-start;
  }
  .step-block__number {
    @include rfs($font-size-14);
    width: auto;
    padding: var(--spacer-xs) var(--spacer-sm);
    font-weight: bold;
    line-height: 1.6;
    color: var(--color-background);
    background-color: var(--blue-medium-light);
    border-top-left-radius: var(--border-radius-lg);
    border-bottom-right-radius: var(--border-radius-lg);
  }
  .step-block__edit {
    @include rfs($font-size-14);
    cursor: pointer;
    padding: var(--spacer-sm);
    font-weight: 600;
    text-decoration: underline;
    color: var(--color-brand-darkest);
    background: none;
    border: 0;
    @media screen and ( min-width: 640px ) {
      padding: var(--spacer-sm) var(--spacer);
    }
  }
  .step-block__edit-icon {
    width: 20px;
    height: 10px;
    margin-left: .2rem;
    @media screen and ( min-width: 640px ) {
      width: 25px;
      height: 12px;
    }
  }
  .step-block__body {
    display: grid;
    grid-column: 1/3;
    grid-gap: calc(var(--spacer) / 1.5);
    grid-template-columns: 1fr 2fr;
    align-items: center;
    padding: var(--spacer-xs) var(--spacer) var(--spacer);
    font-weight: 600;
    .pictogram {
      min-width: 100px;
      border: 1px solid var(--blue-medium-light);
      background-color: var(--color-background);
    }
  }
  .step-block__title {
    @include rfs($font-size-16);
    font-weight: 600;
  }
</style>
