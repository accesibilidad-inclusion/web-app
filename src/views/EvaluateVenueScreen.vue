<script setup lang="ts">
import {computed, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'

import BlockHeader from '@/components/BlockHeader.vue'
import OptionsQuestion from '@/components/OptionsQuestion.vue'
import DichotomousQuestion from '@/components/DichotomousQuestion.vue'
import QuestionInstruction from '@/components/QuestionInstruction.vue'
import TakePhotography from '@/components/TakePhotography.vue'
import IndicatorQuestion from '@/components/IndicatorQuestion.vue'
import TextQuestion from '@/components/TextQuestion.vue'
import {useAppNavStore} from '@/stores/app-nav.js'
import {useAppSessionStore} from '@/stores/app-session.js'
import {useAppDataStore} from '@/stores/app-data'
import type {Answer} from '@/model/answer'
import {useFetch} from '@vueuse/core'
import {OnlineVenue} from '@/model/online_venue'
import {PresentialVenue} from '@/model/presential_venue'

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

const questionsType = route.params.type === 'presencial' ? 'presential' : 'online'
appNav.theme = questionsType

const {data} = await useFetch(
  `${import.meta.env.VITE_APP_API_DOMAIN}api/${questionsType}_venues/getById/${route.params.id}`
)
  .get()
  .json()

const venue =
  questionsType === 'online' ? new OnlineVenue(data.value) : new PresentialVenue(data.value)

const started = ref(false)
const finished = ref(false)
const currentQuestion = ref(0)
const currentSubQuestion = ref<number | null>(null)
const answers = ref<Array<Answer>>([])

const back = () => {
  const preQuestion =
    appData.questions[questionsType][
      appData.questions[questionsType].findIndex((q) => q.id === question.value.id) - 1
    ]
  if (currentSubQuestion.value !== null) {
    if (currentSubQuestion.value > 0) {
      currentSubQuestion.value--
    } else {
      currentSubQuestion.value = null
    }
  } else if (preQuestion.answer_type === 'Dicotomico' && answer.value === 'Si') {
    currentSubQuestion.value = preQuestion.questions.length - 1
    currentQuestion.value--
  } else {
    currentQuestion.value--
  }
}
const next = () => {
  if (question.value.answer_type === 'Dicotomico' && answer.value === 'Si') {
    currentSubQuestion.value = 0
  } else if (currentSubQuestion.value !== null) {
    if (
      currentSubQuestion.value ===
      appData.questions[questionsType][currentQuestion.value].questions.length - 1
    ) {
      currentSubQuestion.value = null
      currentQuestion.value++
    } else {
      currentSubQuestion.value++
    }
  } else {
    currentQuestion.value++
  }
}

const takePhoto = () => {
  const camera = document.querySelector('#camera') as HTMLInputElement
  camera.click()
}

const setPicture = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const reader = new FileReader()
    reader.onloadend = (e: ProgressEvent<FileReader>) => {
      if (e?.target?.result) {
        setAnswer(e.target.result.toString())
      }
    }
    reader.readAsDataURL(input.files[0])
  }
}

const setAnswer = (answr: string) => {
  const a = {
    question_id: question.value.id,
    type: question.value.answer_type,
    answer: answr
  }
  const i = answers.value.findIndex((answer) => answer.question_id === question.value.id)
  if (i > -1) answers.value[i] = a
  else answers.value.push(a)
}

const sendEvaluation = async () => {
  /* const {data} = await useFetch(`${import.meta.env.VITE_APP_API_DOMAIN}api/services/nearVenues`)
  .post({
    ...appData.location.getCoordinates(),
    category: route.params.categorySlug,
    service: route.params.serviceSlug
  })
  .json() */
  finished.value = true
}

const question = computed(() => {
  return currentSubQuestion.value === null
    ? appData.questions[questionsType][currentQuestion.value]
    : appData.questions[questionsType][currentQuestion.value].questions[currentSubQuestion.value]
})

const answer = computed(() => {
  const a = answers.value.find((a: Answer) => a.question_id === question.value.id)
  return a === undefined ? '' : a.answer
})

const lastQuestion = computed(() => {
  return appData.questions[questionsType].length - 1
})
</script>

<template>
  <div :class="questionsType + '-evaluation'">
    <template v-if="!started">
      <BlockHeader
        :title="venue.name"
        description="Evaluación"
        :link="{
          text: venue instanceof PresentialVenue ? 'Ver en el Mapa' : 'Ir a sitio web',
          url: venue instanceof PresentialVenue ? venue.mapLink : venue.url
        }" />
    </template>
    <template v-else-if="finished">
      <div>Gracias por tu aporte</div>
      <div>Estás ayudando al mundo a ser un lugar más accesible</div>
    </template>
    <template v-else>
      <BlockHeader
        description="Evaluación"
        v-if="!['Instrucción', 'Fotografía'].includes(question.answer_type)" />
      <div
        v-if="!['Instrucción', 'Fotografía'].includes(question.answer_type)"
        v-html="question.text"></div>
      <QuestionInstruction
        v-if="question.answer_type === 'Instrucción'"
        :text="question.text"
        :icon="question.icon" />
      <OptionsQuestion
        v-if="question.answer_type === 'Opciones'"
        :options="question.options"
        :selected="answer"
        @reply="setAnswer" />
      <DichotomousQuestion
        v-if="question.answer_type === 'Dicotomico'"
        :selected="answer"
        @reply="setAnswer" />
      <TakePhotography
        v-if="question.answer_type === 'Fotografía'"
        :text="question.text"
        :photography="answer"
        @change="takePhoto" />
      <IndicatorQuestion
        v-if="['Indicador', 'Global'].includes(question.answer_type)"
        :selected="answer"
        @reply="setAnswer" />
      <TextQuestion v-if="question.answer_type === 'Texto'" :selected="answer" @reply="setAnswer" />
    </template>
    <input
      id="camera"
      type="file"
      accept="image/*"
      capture
      @change="setPicture"
      style="display: none" />
    <footer>
      <template v-if="!started">
        <button class="btn btn--large btn--primary" @click="started = true">
          Comenzar evaluación
        </button>
      </template>
      <template v-else-if="finished">
        <button class="btn btn--large btn--primary" @click="started = true">Atras</button>
      </template>
      <template v-else>
        <button class="btn btn--large btn--secondary" v-if="currentQuestion > 0" @click="back">
          Atrás
        </button>
        <button
          class="btn btn--large btn--primary"
          v-if="question.answer_type === 'Fotografía' && answer === ''"
          @click="takePhoto">
          Tomar foto
        </button>
        <button
          class="btn btn--large btn--primary"
          v-else-if="currentQuestion < lastQuestion"
          :disabled="
            ['Opciones', 'Dicotomico', 'Indicador', 'Global'].includes(question.answer_type) &&
            answer === ''
          "
          @click="next">
          Siguiente
        </button>
        <button
          class="btn btn--large btn--primary"
          v-if="currentQuestion === lastQuestion"
          @click="sendEvaluation">
          Finalizar evaluación
        </button>
      </template>
    </footer>
  </div>
</template>

<style lang="scss" scoped></style>
