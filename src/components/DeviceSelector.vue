<script setup lang="ts">
import BlockHeader from './BlockHeader.vue'
import TextToSpeech from './TextToSpeech.vue'
import {useAppSessionStore} from '@/stores/app-session'
import {computed} from 'vue'

const appSession = useAppSessionStore()

const canContinue = computed((): boolean => {
  return !!appSession.user.device
})

defineExpose({
  canContinue
})
</script>

<template>
  <div class="onboarding-skyblue">
    <BlockHeader description="Instalando PICTOS"> </BlockHeader>
    <div class="onboarding-item__container">
      <h2 class="onboarding__title">
        {{ $t('onboardingInstallPictos.selectDevice') }}
        <text-to-speech
          :text-audio="'Selecciona tu dispositivo\n\n\n\n\n\n' + 'Iphone\n\n\n\n\n' + 'Android'" />
      </h2>
      <form class="form-radio">
        <div class="custom-control custom-control--radio">
          <input
            type="radio"
            name="device"
            id="iphone"
            value="Iphone"
            class="custom-control__input"
            v-model="appSession.user.device"
            :checked="appSession.user.device == 'Iphone'" />
          <label for="iphone" class="custom-control__label">Iphone</label>
        </div>
        <div class="custom-control custom-control--radio">
          <input
            type="radio"
            name="device"
            id="android"
            value="Android"
            class="custom-control__input"
            v-model="appSession.user.device"
            :checked="appSession.user.device == 'Android'" />
          <label for="android" class="custom-control__label">Android</label>
        </div>
      </form>
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
.custom-control__input:checked ~ .custom-control__label {
  background-color: var(--color--skyblue-light);
}

label {
  @include rfs(0.3125rem, margin-bottom);
  display: block;
}
.form-group {
  @include rfs(1.25rem, margin-bottom);
}
</style>
