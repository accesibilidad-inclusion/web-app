<script setup lang="ts">
import {ref, type Component, nextTick} from 'vue'
import OnboardingItem from '@/components/OnboardingItem.vue'
import type {Onboarding, OnboardingOrComponent} from '@/types/onboarding'

defineProps<{
  sequence: Array<OnboardingOrComponent>
  finishButtonText?: string
}>()
defineEmits(['finished'])

const currentStep = ref(0)
const comp = ref<any>(null)

function isOnboarding(element: OnboardingOrComponent): element is Onboarding {
  if ((element as Onboarding).title) {
    return true
  }
  return false
}

const rewindStep = async () => {
  currentStep.value = currentStep.value - 1
  await nextTick()
  if (comp.value && comp.value.byPass) rewindStep()
}
const advanceStep = async () => {
  currentStep.value = currentStep.value + 1
  await nextTick()
  if (comp.value && comp.value.byPass) advanceStep()
}
</script>

<template>
  <div class="onboarding-nav">
    <div class="onboarding-nav__body">
      <OnboardingItem
        v-if="isOnboarding(sequence[currentStep])"
        :data="sequence[currentStep] as Onboarding" />
      <component
        v-if="!isOnboarding(sequence[currentStep])"
        :is="sequence[currentStep] as Component"
        ref="comp" />
    </div>
    <footer class="onboarding__footer">
      <button class="btn btn--large btn--secondary" v-if="currentStep > 0" @click="rewindStep">
        Atrás
      </button>
      <button
        class="btn btn--large btn--primary"
        v-if="currentStep < sequence.length - 1"
        :disabled="!!comp && !comp.canContinue"
        @click="advanceStep">
        Siguiente
      </button>
      <button
        class="btn btn--large btn--primary"
        v-if="currentStep === sequence.length - 1"
        @click="$emit('finished')">
        {{ finishButtonText !== undefined ? finishButtonText : 'Finalizar' }}
      </button>
    </footer>
  </div>
</template>

<style lang="scss">
.onboarding-nav {
  display: flex;
  flex-flow: column;
  background-color: var(--color--white);
  width: 100%;
}
.onboarding-nav__body {
  flex-grow: 1;
}
.onboarding__footer {
  display: flex;
  gap: var(--spacer--300);
  padding: 0 var(--spacer--400) var(--spacer--400);
  @media screen and (min-width: 640px) {
    padding: 0 var(--spacer--500) var(--spacer--400);
  }
  button {
    flex-basis: 50%;
    flex-grow: 1;
  }
}
</style>
