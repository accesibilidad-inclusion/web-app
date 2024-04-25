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
    <BlockHeader :description="$t('personalInformation.aboutYou')"> </BlockHeader>
    <div class="onboarding-item__container">
      <h2 class="onboarding__title">
        {{ $t('personalInformation.disabilityDetails.title') }}
        <text-to-speech
          :text-audio="
            $t('personalInformation.disabilityDetails.title') +
            '\n\n\n\n\n\n' +
            $t('personalInformation.disabilityDetails.intellectual') +
            '\n\n\n\n\n' +
            $t('personalInformation.disabilityDetails.physical') +
            '\n\n\n\n\n' +
            $t('personalInformation.disabilityDetails.visual') +
            '\n\n\n\n\n' +
            $t('personalInformation.disabilityDetails.auditory') +
            '\n\n\n\n\n' +
            $t('personalInformation.disabilityDetails.other')
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
        <label for="intelectual" class="custom-control__label">{{
          $t('personalInformation.disabilityDetails.intellectual')
        }}</label>
      </div>
      <div class="custom-control custom-control--checkbox">
        <input
          type="checkbox"
          name="disabilities"
          id="fisica"
          value="Fisica"
          class="custom-control__input"
          v-model="appSession.user.disabilities" />
        <label for="fisica" class="custom-control__label">{{
          $t('personalInformation.disabilityDetails.physical')
        }}</label>
      </div>
      <div class="custom-control custom-control--checkbox">
        <input
          type="checkbox"
          name="disabilities"
          id="visual"
          value="Visual"
          class="custom-control__input"
          v-model="appSession.user.disabilities" />
        <label for="visual" class="custom-control__label">{{
          $t('personalInformation.disabilityDetails.visual')
        }}</label>
      </div>
      <div class="custom-control custom-control--checkbox">
        <input
          type="checkbox"
          name="disabilities"
          id="auditiva"
          value="Auditiva"
          class="custom-control__input"
          v-model="appSession.user.disabilities" />
        <label for="auditiva" class="custom-control__label">{{
          $t('personalInformation.disabilityDetails.auditory')
        }}</label>
      </div>
      <div class="custom-control custom-control--checkbox">
        <input
          type="checkbox"
          name="disabilities"
          id="otra"
          value="Otra"
          class="custom-control__input"
          v-model="appSession.user.disabilities" />
        <label for="otra" class="custom-control__label">{{
          $t('personalInformation.disabilityDetails.other')
        }}</label>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.onboarding-skyblue {
  background-color: var(--color--skyblue);
  padding-top: 50px;
  flex-grow: 1;
  @media screen and (min-width: 540px) {
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
