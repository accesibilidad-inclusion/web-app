<script setup lang="ts">
defineProps<{
  selected: string
}>()
defineEmits(['reply'])
</script>

<template>
  <ul class="evaluation-block">
    <li
      class="evaluation-block__item"
      :class="{active: selected === '5'}"
      @click="$emit('reply', '5')">
      <span
        class="evaluation-block__grade"
        data-grade="5"
        >5</span
      >
      <span class="evaluation-block__description"
        ><strong>Excelente:</strong> No necesita mejoras.</span
      >
    </li>
    <li
      class="evaluation-block__item"
      :class="{active: selected === '4'}"
      @click="$emit('reply', '4')">
      <span
        class="evaluation-block__grade"
        data-grade="4"
        >4</span
      >
      <span class="evaluation-block__description"
        ><strong>Bueno:</strong> Necesita pocas mejoras.</span
      >
    </li>
    <li
      class="evaluation-block__item"
      :class="{active: selected === '3'}"
      @click="$emit('reply', '3')">
      <span
        class="evaluation-block__grade"
        data-grade="3"
        >3</span
      >
      <span class="evaluation-block__description"
        ><strong>Regular:</strong> Ni bueno Ni malo.</span
      >
    </li>
    <li
      class="evaluation-block__item"
      :class="{active: selected === '2'}"
      @click="$emit('reply', '2')">
      <span
        class="evaluation-block__grade"
        data-grade="2"
        >2</span
      >
      <span class="evaluation-block__description"
        ><strong>Malo:</strong> Necesita muchas mejoras.</span
      >
    </li>
    <li
      class="evaluation-block__item"
      :class="{active: selected === '1'}"
      @click="$emit('reply', '1')">
      <span
        class="evaluation-block__grade"
        data-grade="1"
        >1</span
      >
      <span class="evaluation-block__description"
        ><strong>Pésimo:</strong> Tiene que mejorar todo.</span
      >
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/rfs.scss';
.evaluation-block {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--spacer--300);
  margin-bottom: var(--spacer--500);
}
.evaluation-block__item {
  display: flex;
  align-items: center;
  gap: var(--spacer--300);
  padding: var(--spacer--500) var(--spacer--400);
  border-radius: var(--spacer--500);
  background-color: var(--color--white);
  border: 1px solid var(--color--blue);
  transition: var(--transition-base);
  cursor: pointer;
  &.active {
    background-color: var(--color--skyblue);
    .theme-online & {
      background-color: var(--color--yellow);
    }
  }
}
.evaluation-block__grade {
  @include rfs($font-size-38);
  font-weight: 800;
  line-height: 1.1;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  width: 44px;
  padding: 0 var(--spacer--300);
  border: 1px solid var(--color--blue);
  border-radius: var(--border-radius-lg);
  &[data-grade='5'] {
    background: var(--color-grade-5);
  }
  &[data-grade='4'] {
    background: var(--color-grade-4);
  }
  &[data-grade='3'] {
    background: var(--color-grade-3);
  }
  &[data-grade='2'] {
    background: var(--color-grade-2);
  }
  &[data-grade='1'] {
    background: var(--color-grade-1);
  }
  &[data-grade='0'] {
    background: var(--color-grade-0);
  }
}
.evaluation-block__description {
  @include rfs($font-size--400);
  font-weight: 600;
  color: var(--color--blue-light);
  display: block;
  strong {
    @include rfs($font-size-16);
    font-weight: 700;
    display: block;
    color: var(--color--blue-dark);
  }
}
</style>
