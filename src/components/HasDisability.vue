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
  <div class="onboarding-skyblue">
    <BlockHeader description="Sobre ti"> </BlockHeader>
    <div class="onboarding-item__container">
      <h2 class="onboarding__title">
        ¿Tienes alguna discapacidad?
        <text-to-speech
          :text-audio="'¿Tienes alguna discapacidad?\n\n\n\n\n\n\n' + 'Sí\n\n\n\n\n\n' + 'No'" />
      </h2>
      <form class="form-radio">
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
.form-radio {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacer--400);
}
.custom-control__label {
  @include rfs($font-size-38);
  font-weight: 800;
  justify-content: center;
  padding: var(--spacer--500) var(--spacer--300);
  text-align: center;
}
.custom-control__input:checked ~ .custom-control__label {
  background-color: var(--color--skyblue-light);
}
</style>
