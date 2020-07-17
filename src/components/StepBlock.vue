<template>
  <div class="step-block">
    <div class="step-block__header">
      <span class="step-block__number">Paso 1</span>
      <button class="step-block__edit"><icon-edit class="step-block__edit-icon" />Editar</button>
    </div>
    <div class="step-block__body">
      <pictogram v-bind:layers="state.layers"></pictogram>
      <p>Pasa tu tarjeta por el sensor del torniquete</p>
    </div>
  </div>
</template>

<script>
import IconEdit from '../../public/img/app-icons/edit.svg?inline';

export default {
  name: 'StepBlock',
  components: {
    IconEdit,
  },
};
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/rfs.scss';

  .step-block {
    border-radius: calc(var(--border-radius) * 2);
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
    color: var(--color-background);
    font-weight: bold;
    background-color: var(--blue-medium-light);
    padding: calc(var(--spacer-sm) / 2)  calc(var(--spacer) / 2);
    border-top-left-radius: calc(var(--border-radius) * 2);
    border-bottom-right-radius: calc(var(--border-radius) * 2);
    width: auto;
    line-height: 1.6;
  }
  .step-block__edit {
    @include rfs($font-size-14);
    color: var(--color-brand-darkest);
    font-weight: 600;
    background: none;
    border: 0;
    cursor: pointer;
    padding: var(--spacer-sm) calc(var(--spacer) / 2);
    text-decoration: underline;
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
    grid-column: 1/3;
    display: grid;
    grid-gap: calc(var(--spacer) / 1.5);
    grid-template-columns: 1fr 2fr;
    align-items: center;
    padding: var(--spacer-xs) var(--spacer) var(--spacer) var(--spacer);
    .pictogram {
      border: 1px solid var(--blue-medium-light);
      background-color: var(--color-background);
      min-width: 100px;
    }
  }
  .step-block__title {
    @include rfs($font-size-16);
    font-weight: 600;
  }
</style>
