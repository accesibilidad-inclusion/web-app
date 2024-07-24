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
  <div class="onboarding-skyblue">
    <BlockHeader :description="$t('personalInformation.aboutYou')"> </BlockHeader>
    <div class="onboarding-item__container">
      <h2 class="onboarding__title">
        {{ $t('personalInformation.gender.title') }}
        <text-to-speech
          :text-audio="
            $t('personalInformation.gender.title') +
            '\n\n\n\n\n\n' +
            $t('personalInformation.gender.male') +
            '\n\n\n\n\n' +
            $t('personalInformation.gender.female') +
            '\n\n\n\n\n' +
            $t('personalInformation.gender.noBinary') +
            '\n\n\n\n\n' +
            $t('personalInformation.gender.preferNotToSay')
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
        <label for="man" class="custom-control__label">{{
          $t('personalInformation.gender.male')
        }}</label>
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
        <label for="woman" class="custom-control__label">{{
          $t('personalInformation.gender.female')
        }}</label>
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
        <label for="non-binary" class="custom-control__label">{{
          $t('personalInformation.gender.noBinary')
        }}</label>
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
        <label for="prefer-not-to-say" class="custom-control__label">{{
          $t('personalInformation.gender.preferNotToSay')
        }}</label>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/rfs.scss';

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
label {
  @include rfs(0.3125rem, margin-bottom);
  display: block;
}
.form-group {
  @include rfs(1.25rem, margin-bottom);
}
.custom-control__input:checked ~ .custom-control__label {
  background-color: var(--color--skyblue-light);
}
</style>
