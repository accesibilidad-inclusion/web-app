<script setup lang="ts">
import {computed, ref} from 'vue'
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
const currentSubQuestion = ref(null)

const back = () => {
  currentQuestion.value--
}
const next = () => {
  currentQuestion.value++
}

const setAnswer = (event: any) => {
  console.log(event)
  question.value.answer = event
}

const question = computed(() => {
  return currentSubQuestion.value === null
    ? appData.questions.presential[currentQuestion.value]
    : appData.questions.presential[currentQuestion.value].questions[currentSubQuestion.value]
})
</script>

<template>
  <BlockHeader description="Evaluación" v-if="question.answer_type !== 'Instrucción'" />
  {{ appData.questions.presential[currentQuestion] }}
  <div v-if="question.answer_type !== 'Instrucción'">
    {{ question.text }}
  </div>
  <QuestionInstruction
    v-if="question.answer_type === 'Instrucción'"
    :text="question.text"
    icon="buscar" />
  <OptionsQuestion
    v-if="question.answer_type === 'Opciones'"
    :options="question.options"
    @reply="setAnswer" />
  <DichotomousQuestion v-if="question.answer_type === 'Dicotomico'" />
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
