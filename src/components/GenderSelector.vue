<script setup lang="ts">
import BlockHeader from './BlockHeader.vue'
import TextToSpeech from './TextToSpeech.vue'
import {useAppSessionStore} from '@/stores/app-session'
import {computed} from 'vue'

const appSession = useAppSessionStore()

const canContinue = computed((): boolean => {
  return !!appSession.user.gender
})

defineExpose({
  canContinue
})
</script>

<template>
  <BlockHeader description="Sobre ti"> </BlockHeader>
  <h2 class="onboarding__title">
    Indica tu género
    <text-to-speech
      :text-audio="
        'Indica tu género\n\n\n\n\n\n' +
        'Masculino\n\n\n\n\n' +
        'Femenino\n\n\n\n\n' +
        'No binario\n\n\n\n\n' +
        'Prefiero no decirlo'
      " />
  </h2>
  <div class="custom-control custom-control--radio">
    <input
      type="radio"
      name="gender"
      id="man"
      value="Masculino"
      class="custom-control__input"
      v-model="appSession.user.gender"
      :checked="appSession.user.gender == 'Masculino'" />
    <label for="man" class="custom-control__label">Masculino</label>
  </div>
  <div class="custom-control custom-control--radio">
    <input
      type="radio"
      name="gender"
      id="woman"
      value="Femenino"
      class="custom-control__input"
      v-model="appSession.user.gender"
      :checked="appSession.user.gender == 'Femenino'" />
    <label for="woman" class="custom-control__label">Femenino</label>
  </div>
  <div class="custom-control custom-control--radio">
    <input
      type="radio"
      name="gender"
      id="non-binary"
      value="No binario"
      class="custom-control__input"
      v-model="appSession.user.gender"
      :checked="appSession.user.gender == 'No binario'" />
    <label for="non-binary" class="custom-control__label">No binario</label>
  </div>
  <div class="custom-control custom-control--radio">
    <input
      type="radio"
      name="gender"
      id="prefer-not-to-say"
      value="Prefiero no decirlo"
      class="custom-control__input"
      v-model="appSession.user.gender"
      :checked="appSession.user.gender == 'Prefiero no decirlo'" />
    <label for="prefer-not-to-say" class="custom-control__label">Prefiero no decirlo</label>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/rfs.scss';
label {
  @include rfs(0.3125rem, margin-bottom);
  display: block;
}
.form-group {
  @include rfs(1.25rem, margin-bottom);
}
</style>
