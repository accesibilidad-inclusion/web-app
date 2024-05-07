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
import {useEventBus, useFetch} from '@vueuse/core'
import {OnlineVenue} from '@/model/online_venue'
import {PresentialVenue} from '@/model/presential_venue'
import TextToSpeech from '@/components/TextToSpeech.vue'
import IconLike from '@/assets/img/app-icons/instructions/like.svg?component'
import IconInternet from '@/assets/img/app-icons/instructions/internet.svg?component'

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
  await useFetch(`${import.meta.env.VITE_APP_API_DOMAIN}api/evaluations/store`)
    .post({
      answers: answers.value,
      user_id: appSession.user.id,
      presential_venue_id: questionsType === 'presential' ? venue.id : null,
      online_venue_id: questionsType === 'online' ? venue.id : null
    })
    .json()
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

const bus = useEventBus('close')
const listener = () => {
  backToVenue()
}
bus.on(listener)

const backToVenue = () => {
  if(appNav.selected.category && appNav.selected.service && appNav.selected.venue)
  router.push(
      '/' +
        appNav.selected.category?.slug +
        '/' +
        appNav.selected.service?.slug +
        '/' +
        appNav.selected.venue?.slug
    )
  else
    router.push('/sin-ayuda-disponible')
}
</script>

<template>
  <div :class="questionsType + '-evaluation'">
    <template v-if="!started">
      <div class="first-step-evaluation">
        <BlockHeader
          :title="venue.name"
          :description="$t('evaluateVenue.title')"
          compact
          :link="{
            text:
              venue instanceof PresentialVenue
                ? $t('general.seeOnTheMap')
                : $t('general.goToWebsite'),
            url: venue instanceof PresentialVenue ? venue.mapLink : venue.url
          }">
          <template #icon>
            <span class="category-icon">
              <IconInternet class="block-header__icon" />
            </span>
          </template>
        </BlockHeader>
      </div>
    </template>
    <template v-else-if="finished">
      <div class="feedback-evaluation">
        <text-to-speech
          :text-audio="
            $t('general.thanksForYourContribution') + '\n\n\n\n\n ' + $t('general.youAreHelping')
          " />
        <span class="evaluation__icon">
          <icon-like></icon-like>
        </span>
        <p class="feedback-evaluation__title">{{ $t('general.thanksForYourContribution') }}</p>
        <p class="feedback-evaluation__description">
          {{ $t('general.youAreHelping') }}
        </p>
        <button
          class="btn btn--large btn--primary btn--block btn--filled--skyblue"
          @click="backToVenue">
          <template v-if="appNav.selected.category && appNav.selected.service && appNav.selected.venue">
            {{
              $t('general.comebackTo', {
                name: appNav.selected.venue?.name
              })
            }}
          </template>
          <template v-else>
            {{ $t('general.comebackToMenu') }}
          </template>
        </button>
      </div>
    </template>
    <template v-else>
      <BlockHeader
        compact
        :description="$t('evaluateVenue.title')"
        v-if="!['Instrucción', 'Fotografía'].includes(question.answer_type)" />
      <div
        v-if="!['Instrucción', 'Fotografía'].includes(question.answer_type)"
        v-html="question.text"
        class="evaluation__title"></div>
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
        <button class="btn btn--large btn--primary btn--block" @click="started = true">
          {{ $t('evaluateVenue.startEvaluation') }}
        </button>
      </template>
      <template v-else-if="!finished">
        <button
          class="btn btn--large btn--secondary btn--block"
          v-if="currentQuestion > 0"
          @click="back">
          {{ $t('general.back') }}
        </button>
        <button
          class="btn btn--large btn--primary btn--block"
          v-if="question.answer_type === 'Fotografía' && answer === ''"
          @click="takePhoto">
          {{ $t('evaluateVenue.takePhotography') }}
        </button>
        <button
          class="btn btn--large btn--primary btn--block"
          v-else-if="currentQuestion < lastQuestion"
          :disabled="
            ['Opciones', 'Dicotomico', 'Indicador', 'Global'].includes(question.answer_type) &&
            answer === ''
          "
          @click="next">
          {{ $t('general.next') }}
        </button>
        <button
          class="btn btn--large btn--primary btn--block"
          v-if="currentQuestion === lastQuestion"
          @click="sendEvaluation">
          {{ $t('evaluateVenue.finishEvaluation') }}
        </button>
      </template>
    </footer>
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/rfs.scss';

.presential-evaluation {
  background-color: var(--color--skyblue-light);
}
.online-evaluation {
  background-color: var(--color--yellow-light);
}
.presential-evaluation,
.online-evaluation {
  padding: var(--spacer--400) var(--spacer--400) var(--spacer--500);
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  height: 100dvh;
  @media screen and (min-width: 540px) {
    padding-top: 62px;
  }
  .block-header__compact {
    display: grid;
    background-color: var(--color--skyblue);
    .block-header__description {
      grid-row: 1;
    }
  }
  .first-step-evaluation {
    background-color: var(--color--skyblue);
    border-radius: var(--spacer--500);
    height: 100%;
    display: grid;
    justify-content: center;
    align-items: center;
    position: relative;
    .block-header__compact {
      position: initial;
      max-width: 500px;
      row-gap: var(--spacer--300);
      padding: var(--spacer--500);
      background-color: transparent;
      .category-icon {
        background: var(--color--yellow);
        border: 1px solid var(--color--blue);
        border-radius: var(--spacer--300);
        width: 55px;
        height: 55px;
        display: grid;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        .theme-online & {
          background-color: var(--color--yellow-light);
        }
      }
      .block-header__description {
        grid-row: 2;
      }
    }
    .theme-online & {
      background-color: var(--color--yellow);
    }
  }
  footer {
    margin-top: auto;
    display: flex;
    gap: var(--spacer--300);
    padding-top: var(--spacer--500);
  }
}
.evaluation__title {
  @include rfs($font-size-18);
  font-weight: 700;
  text-align: center;
  padding: var(--spacer--500) 0 var(--spacer--500);
  margin-top: var(--spacer--300);
  b {
    font-weight: 800;
  }
}
.evaluation__icon {
  background: var(--color--yellow);
  border: 1px solid var(--color--blue);
  border-radius: var(--spacer--300);
  width: 55px;
  height: 55px;
  display: grid;
  align-items: center;
  justify-content: center;
}

// Feedback evaluation
.feedback-evaluation {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacer--300);
  flex-direction: column;
  height: 100%;
  .btn {
    font-weight: 800;
  }
}
.feedback-evaluation__title {
  @include rfs($font-size-18);
  color: var(--color--blue-dark);
  text-align: center;
  font-weight: 800;
  @media screen and (min-width: 540px) {
    margin-bottom: var(--spacer);
  }
}
.feedback-evaluation__description {
  @include rfs($font-size-16);
  color: var(--color--blue-dark);
  text-align: center;
  font-weight: 600;
  margin-bottom: var(--spacer-xl);
}
</style>
