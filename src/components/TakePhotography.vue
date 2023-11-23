<script setup lang="ts">
import IconCamera from '@/assets/img/app-icons/camera.svg?component'
import QuestionInstruction from '@/components/QuestionInstruction.vue'

defineProps<{
  text: string
  photography: string
}>()
defineEmits(['change'])
</script>

<template>
  <div class="page__photo-block">
    <template v-if="photography === ''">
      <QuestionInstruction :text="text" icon="camara" />
    </template>
    <template v-else>
      <div class="page__photo-wrapper">
        <img id="photo" class="photo" :src="photography" />
      </div>
      <div class="page__photo-edit">
        <span class="page__photo-change" @click="$emit('change')"><IconCamera />Reemplazar</span>
      </div>
    </template>
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/rfs.scss';
.page__photo-block {
  display: grid;
  grid-template-columns: 45% 55%;
  height: 8.5rem;
  overflow: hidden;
  align-items: center;
  @media screen and (min-width: 640px) {
    height: 10rem;
  }
}
.page__photo-wrapper {
  overflow: hidden;
  img {
    width: 100%;
  }
}
.page__photo-edit {
  background-color: var(--color-neutral-lightest);
  padding: 0 var(--spacer-sm);
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 8.5rem;
  @media screen and (min-width: 640px) {
    height: 10rem;
  }
  span {
    @include rfs($font-size-16);
    font-weight: 600;
    display: block;
    color: var(--color-neutral);
    padding: var(--spacer) var(--spacer-xs);
    margin: 0 var(--spacer-sm);
    text-align: center;
    cursor: pointer;
    svg {
      margin-right: var(--spacer-xs);
      path {
        fill: var(--color-neutral);
      }
    }
  }
}
.page__photo-change {
  border-bottom: 1px solid var(--color-neutral-lighter);
  svg {
    width: 1rem;
    height: auto;
  }
}
.page__photo-delete {
  svg {
    width: 0.6rem;
    height: auto;
  }
}
</style>
