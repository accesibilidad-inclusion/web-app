<script setup lang="ts">
import IconCamera from '@/assets/img/app-icons/camera-filled.svg?component'
import QuestionInstruction from '@/components/QuestionInstruction.vue'

defineProps<{
  text: string
  photography: string
}>()
defineEmits(['change'])
</script>

<template>
  <div class="photo-block">
    <template v-if="photography === ''">
      <QuestionInstruction :text="text" icon="camara" />
    </template>
    <template v-else>
      <div class="photo-block__content">
        <div class="photo-block__wrapper">
          <img id="photo" class="photo" :src="photography" />
        </div>
        <div class="photo-block__edit">
          <button
            class="btn btn--large btn--block btn--primary btn--filled--skyblue btn--icon"
            @click="$emit('change')">
            <IconCamera />
            Reemplazar
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/rfs.scss';

.photo-block {
  height: 100%;
}
.photo-block__content {
  height: 100%;
  position: relative;
  @media screen and (min-width: 540px) {
  }
}
.photo-block__wrapper {
  height: 100%;
  display: block;
  overflow: hidden;
  position: relative;
  border-radius: var(--border-radius-md);
  background-color: var(--color--skyblue);
  .theme-online & {
    background-color: var(--color--yellow);
  }
  img {
    height: 100%;
    -o-object-fit: contain;
    object-fit: contain;
    width: 100%;
  }
}
.photo-block__edit {
  position: absolute;
  right: var(--spacer--300);
  left: var(--spacer--300);
  bottom: var(--spacer--300);
  svg {
    width: 15px;
    height: auto;
  }
}
</style>
