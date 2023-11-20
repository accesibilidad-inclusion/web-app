<script setup lang="ts">
import {ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'

import BlockHeader from '@/components/BlockHeader.vue'
import OptionsQuestion from '@/components/OptionsQuestion.vue'
import DichotomousQuestion from '@/components/DichotomousQuestion.vue'
import QuestionInstruction from '@/components/QuestionInstruction.vue'
import {useAppNavStore} from '@/stores/app-nav.js'
import {useAppSessionStore} from '@/stores/app-session.js'
import {useAppDataStore} from '@/stores/app-data'

const router = useRouter()
const route = useRoute()

const appData = useAppDataStore()
const appNav = useAppNavStore()
const appSession = useAppSessionStore()

if (route.params.type === 'presencial' && appNav.onboarding.presentialEvaluation) {
  appNav.redirectTo = route.fullPath
  router.push('/aprende-a-evaluar/presencial')
} else if (route.params.type === 'en-internet' && appNav.onboarding.onlineEvaluation) {
  appNav.redirectTo = route.fullPath
  router.push('/aprende-a-evaluar/en-internet')
} else if (!appSession.user.isRegistered()) {
  appNav.redirectTo = route.fullPath
  router.push('/informacion-personal')
}

const currentQuestion = ref(0)
const back = () => {
  currentQuestion.value--
}
const next = () => {
  currentQuestion.value++
}
</script>

<template>
  <BlockHeader
    description="Evaluación"
    v-if="appData.questions.presential[currentQuestion].answer_type !== 'Instrucción'" />
  <div v-if="appData.questions.presential[currentQuestion].answer_type !== 'Instrucción'">
    {{ appData.questions.presential[currentQuestion].text }}
  </div>
  <QuestionInstruction
    v-if="appData.questions.presential[currentQuestion].answer_type === 'Instrucción'"
    :text="appData.questions.presential[currentQuestion].text"
    icon="lookup" />
  <OptionsQuestion
    v-if="appData.questions.presential[currentQuestion].answer_type === 'Opciones'"
    :options="appData.questions.presential[currentQuestion].options" />
  <DichotomousQuestion
    v-if="appData.questions.presential[currentQuestion].answer_type === 'Dicotomico'" />
  <footer>
    <button class="btn btn--large btn--secondary" v-if="currentQuestion > 0" @click="back()">
      Atrás
    </button>
    <button
      class="btn btn--large btn--primary"
      v-if="currentQuestion < appData.questions.presential.length - 1"
      @click="next()">
      Siguiente
    </button>
    <button
      class="btn btn--large btn--primary"
      v-if="currentQuestion === appData.questions.presential.length - 1">
      Finalizar
    </button>
  </footer>
</template>

<style lang="scss" scoped></style>
