<script setup lang="ts">
import BlockHeader from './BlockHeader.vue'
import TextToSpeech from './TextToSpeech.vue'
import {useAppSessionStore} from '@/stores/app-session'
import {computed} from 'vue'

const appSession = useAppSessionStore()

const canContinue = computed((): boolean => {
  return appSession.user.disabilities.length > 0
})

const byPass = appSession.user.disability === 'no'

defineExpose({
  canContinue,
  byPass
})
</script>

<template>
  <div class="onboarding-skyblue">
    <BlockHeader description="Sobre ti"> </BlockHeader>
    <div class="onboarding-item__container">
      <h2 class="onboarding__title">
        ¿Qué tipo de discapacidad tienes? Selecciona 1 o mas
        <text-to-speech
          :text-audio="
            '¿Qué tipo de discapacidad tienes? Selecciona 1 o mas\n\n\n\n\n\n' +
            'Intelectual\n\n\n\n\n' +
            'Física\n\n\n\n\n' +
            'Visual\n\n\n\n\n' +
            'Auditiva\n\n\n\n\n' +
            'Otra'
          " />
      </h2>
      <div class="custom-control custom-control--checkbox">
        <input
          type="checkbox"
          name="disabilities"
          id="intelectual"
          value="Intelectual"
          class="custom-control__input"
          v-model="appSession.user.disabilities" />
        <label for="intelectual" class="custom-control__label">Intelectual</label>
      </div>
      <div class="custom-control custom-control--checkbox">
        <input
          type="checkbox"
          name="disabilities"
          id="fisica"
          value="Fisica"
          class="custom-control__input"
          v-model="appSession.user.disabilities" />
        <label for="fisica" class="custom-control__label">Física</label>
      </div>
      <div class="custom-control custom-control--checkbox">
        <input
          type="checkbox"
          name="disabilities"
          id="visual"
          value="Visual"
          class="custom-control__input"
          v-model="appSession.user.disabilities" />
        <label for="visual" class="custom-control__label">Visual</label>
      </div>
      <div class="custom-control custom-control--checkbox">
        <input
          type="checkbox"
          name="disabilities"
          id="auditiva"
          value="Auditiva"
          class="custom-control__input"
          v-model="appSession.user.disabilities" />
        <label for="auditiva" class="custom-control__label">Auditiva</label>
      </div>
      <div class="custom-control custom-control--checkbox">
        <input
          type="checkbox"
          name="disabilities"
          id="otra"
          value="Otra"
          class="custom-control__input"
          v-model="appSession.user.disabilities" />
        <label for="otra" class="custom-control__label">Otra</label>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.onboarding-skyblue {
  background-color: var(--color--skyblue);
  margin-top: -50px;
  padding-top: 50px;
  flex-grow: 1;
  @media screen and (min-width: 640px) {
    margin-top: -62px;
    padding-top: 62px;
  }
  .block-header {
    margin-top: var(--spacer--300);
    font-weight: 600;
    p {
      margin: 0;
    }
  }
}
.custom-control__input:checked ~ .custom-control__label {
  background-color: var(--color--skyblue-light);
}
</style>
