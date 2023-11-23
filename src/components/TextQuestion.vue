<script setup lang="ts">
defineProps<{
  selected: string
}>()
defineEmits(['reply'])
</script>

<template>
  <div class="custom-control custom-control--text">
    <input
      type="text"
      placeholder="Escribe aquí tu respuesta"
      class="custom-control__answer"
      :value="selected"
      @change="$emit('reply', ($event.target as HTMLInputElement).value)" />
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/rfs.scss';
.page__evaluation {
  list-style: none;
  margin: var(--spacer-sm) calc(var(--spacer) * -1) var(--spacer) calc(var(--spacer) * -1);
  @media screen and (min-width: 640px) {
    margin-right: calc(var(--spacer-lg) * -1);
    margin-left: calc(var(--spacer-lg) * -1);
  }
  @media screen and (min-width: 1288px) {
    margin-right: calc(var(--spacer-xl) * -1);
    margin-left: calc(var(--spacer-xl) * -1);
  }
  .place__evaluation-grade--lg {
    width: 4rem;
    height: 4rem;
    font-size: calc(var(--spacer-lg) * 1.2);
    display: inherit;
    margin: 0 0 0 var(--spacer);
    @media screen and (min-width: 640px) {
      margin-left: var(--spacer-lg);
    }
    @media screen and (min-width: 1288px) {
      margin-left: var(--spacer-xl);
    }
  }
  .place-block__evaluation-description {
    @include rfs($font-size-16);
    color: var(--color-neutral);
    margin-left: var(--spacer-sm);
    strong {
      text-transform: uppercase;
      display: block;
      color: var(--color-brand-darkest);
    }
  }
}
.page__evaluation-grade {
  display: flex;
  align-items: center;
  border-top: 1px solid var(--color-neutral-lightest);
  padding-top: var(--spacer-sm);
  padding-bottom: var(--spacer-sm);
  transition: var(--transition-base);
  &:last-child {
    border-bottom: 1px solid var(--color-neutral-lightest);
  }
  @media screen and (min-width: 640px) {
    padding-top: var(--spacer);
    padding-bottom: var(--spacer);
    column-gap: var(--spacer);
  }
  &.active {
    .place-block__evaluation-description {
      color: var(--color-brand-darkest);
    }
    &:nth-child(1) {
      background: var(--color-grade-5);
    }
    &:nth-child(2) {
      background: var(--color-grade-4);
    }
    &:nth-child(3) {
      background: var(--color-grade-3);
    }
    &:nth-child(4) {
      background: var(--color-grade-2);
    }
    &:nth-child(5) {
      background: var(--color-grade-1);
    }
  }
}
</style>
