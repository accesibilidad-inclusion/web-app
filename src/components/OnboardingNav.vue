<script setup lang="ts">
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import OnboardingItem from '@/components/OnboardingItem.vue'
import {useAppNavStore} from '@/stores/app-nav.js'
import type {Onboarding} from '@/types/onboarding'

const router = useRouter()
const appNav = useAppNavStore()

const props = defineProps<{
  sequence: Array<Onboarding>
  redirectTo: string
  onboardingKey: string
}>()

const currentStep = ref(0)

const rewindStep = () => {
  currentStep.value = currentStep.value - 1
}
const advanceStep = () => {
  currentStep.value = currentStep.value + 1
}
const finishing = () => {
  appNav.onboarding[props.onboardingKey] = false
  router.push(props.redirectTo).catch(() => {})
}
</script>

<template>
  <div class="onboarding-nav">
    <div class="onboarding-nav__body">
      <!-- <a href="javascript:void(0)" @click="finishing">Cerrar</a> -->
      <OnboardingItem :data="sequence[currentStep]" />
    </div>
    <footer class="onboarding__footer">
      <button class="btn btn--large btn--secondary" v-if="currentStep > 0" @click="rewindStep">
        Atrás
      </button>
      <button
        class="btn btn--large btn--primary"
        v-if="currentStep < sequence.length - 1"
        @click="advanceStep">
        Siguiente
      </button>
      <button
        class="btn btn--large btn--primary"
        v-if="currentStep === sequence.length - 1"
        @click="finishing">
        Finalizar
      </button>
    </footer>
  </div>
</template>

<style lang="scss">
.onboarding-nav {
  display: flex;
  flex-flow: column;
}
.onboarding-nav__body {
  flex-grow: 1;
}
.onboarding__footer {
  display: flex;
  gap: var(--spacer--300);
  padding: 0 var(--spacer--400) var(--spacer--400);
  button {
    flex-basis: 50%;
    flex-grow: 1;
    border-radius: 50px;
  }
}
</style>
