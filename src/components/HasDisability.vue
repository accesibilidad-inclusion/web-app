<script setup lang="ts">
import BlockHeader from './BlockHeader.vue'
import TextToSpeech from './TextToSpeech.vue'
import {useAppSessionStore} from '@/stores/app-session'
import {computed} from 'vue'

const appSession = useAppSessionStore()

const canContinue = computed((): boolean => {
  return !!appSession.user.disability
})

const clearDisabilities = () => {
  appSession.user.disabilities = []
}

defineExpose({
  canContinue
})
</script>

<template>
  <BlockHeader description="Sobre ti"> </BlockHeader>
  <h2 class="onboarding__title">
    ¿Tienes alguna discapacidad?
    <text-to-speech
      :text-audio="'¿Tienes alguna discapacidad?\n\n\n\n\n\n\n' + 'Sí\n\n\n\n\n\n' + 'No'" />
  </h2>
  <div class="custom-control custom-control--radio">
    <input
      type="radio"
      name="disability"
      id="yes"
      value="yes"
      class="custom-control__input"
      v-model="appSession.user.disability"
      :checked="appSession.user.disability == 'yes'" />
    <label for="yes" class="custom-control__label">Sí</label>
  </div>
  <div class="custom-control custom-control--radio">
    <input
      type="radio"
      name="disability"
      id="no"
      value="no"
      class="custom-control__input"
      @input="clearDisabilities()"
      v-model="appSession.user.disability"
      :checked="appSession.user.disability == 'no'" />
    <label for="no" class="custom-control__label">No</label>
  </div>
</template>

<style lang="scss" scoped></style>
