<script setup lang="ts">
import {useAppNavStore} from '@/stores/app-nav'
import {useRoute, useRouter} from 'vue-router'
import {useEventBus} from '@vueuse/core'
import {useAppDataStore} from '@/stores/app-data'
import {OnlineVenue} from '@/model/online_venue'

const appData = useAppDataStore()
const appNav = useAppNavStore()
const route = useRoute()
const router = useRouter()

const evaluation = appData.evaluations.find(
  (evaluation) => evaluation.grade === parseInt(String(route.params.score), 10)
)
if (evaluation === undefined) router.push('/inicio')

const bus = useEventBus('close')
const listener = () => {
  router.push(
    '/' +
      appNav.selected.category?.slug +
      '/' +
      appNav.selected.service?.slug +
      '/' +
      appNav.selected.venue?.slug
  )
}
bus.on(listener)
</script>

<template>
  <div class="evaluation" v-if="evaluation !== undefined">
    <header class="evaluation__header">
      <span class="evaluation__service">{{ appNav.selected.service?.name }}</span>
      <h1 class="evaluation__place">{{ appNav.selected.venue?.name }}</h1>
      <text-to-speech
        :text-audio="`${appNav.selected.venue?.name}, en ${appNav.selected.service?.name}`" />
    </header>
    <div class="evaluation__summary">
      <div
        class="place__evaluation-grade place__evaluation-grade--lg"
        :data-grade="evaluation.grade">
        <span v-if="evaluation.grade">{{ evaluation.grade }}</span>
        <span v-else>?</span>
      </div>
      <p class="evaluation__text">{{ $t('defineEvaluations.accesibilityLevel') }}</p>
      <h2 class="place__evaluation-title">{{ $t(evaluation.title) }}</h2>
    </div>
    <div class="evaluation__body">
      <h3 class="evaluation__explanation">¿Qué significa esto?</h3>
      <p class="evaluation__longdesc">{{ $t(evaluation.longdesc) }}</p>
      <p class="evaluation__longdesc">{{ $t(evaluation.change) }}</p>
      <p class="evaluation__feature">
        <span class="evaluation__feature-name">{{ $t(evaluation.feature1) }}</span
        >{{ $t(evaluation.visibility) }}
      </p>
      <p class="evaluation__feature">
        <span class="evaluation__feature-name">{{ $t(evaluation.feature2) }}</span
        >{{ $t(evaluation.understanding) }}
      </p>
      <p class="evaluation__feature">
        <span class="evaluation__feature-name">{{ $t(evaluation.feature3) }}</span
        >{{ $t(evaluation.spatiality) }}
      </p>
      <text-to-speech
        :text-audio="`¿Qué significa esto?.\n\n${evaluation.longdesc}\n\n${evaluation.change}
      \n\n${evaluation.feature1}\n\n${evaluation.visibility}\n\n${evaluation.feature2}\n\n${evaluation.understanding}
      \n\n${evaluation.feature3}\n\n${evaluation.spatiality}`" />
    </div>
    <div class="actions">
      <router-link
        :to="`/evaluar-lugar/${
          appNav.selected.venue instanceof OnlineVenue ? 'en-internet' : 'presencial'
        }/${appNav.selected.venue?.id}`"
        class="btn btn--large btn--block btn--primary">
        Evaluar este lugar
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/rfs.scss';

.evaluation {
  display: flex;
  flex-direction: column;
  padding-top: calc(var(--spacer--200) + 50px);
  height: 100%;
  min-height: 100dvh;
  @media screen and (min-width: 540px) {
    padding-top: calc(var(--spacer--200) + 62px);
  }
  .actions {
    margin-top: auto;
    padding-bottom: var(--spacer--400);
    @media screen and (min-width: 540px) {
      padding-bottom: 0;
    }
  }
}
.evaluation__header {
  position: relative;
  padding: var(--spacer);
  text-align: center;
  line-height: calc(22 / 16);
  background-color: var(--color--skyblue);
  margin: var(--spacer--300) var(--spacer--400) 0;
  border-radius: var(--spacer--500);
  padding: var(--spacer--500) var(--spacer--400);
  .theme-online & {
    background-color: var(--color--yellow);
  }
}
.evaluation__service {
  @include rfs($font-size-14);
  margin-bottom: var(--spacer-sm);
}
.evaluation__place {
  @include rfs($font-size-21);
}
.evaluation__header .tts {
  position: absolute;
  top: var(--spacer);
  right: var(--spacer);
  @media screen and (min-width: 540px) {
    top: var(--spacer-lg);
    right: var(--spacer-lg);
  }
  @media screen and (min-width: 1280px) {
    right: var(--spacer-xl);
  }
}

.evaluation__summary {
  padding: var(--spacer--600) var(--spacer--400) var(--spacer--700);
  text-align: center;
  .place__evaluation-grade--lg {
    width: 3.125rem;
    height: 3.125rem;
    margin-left: auto;
    margin-right: auto;
    font-size: 2rem;
    line-height: 3.125rem;
    color: var(--color--blue-dark);
    @media screen and (min-width: 540px) {
      width: 3.5rem;
      height: 3.5rem;
      font-size: 2.5rem;
    }
    .theme-online & {
      border: 1px solid var(--color--blue);
    }
  }
  .place__evaluation-grade {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 800;
    text-align: center;
    border-radius: var(--spacer--300);
    margin-bottom: var(--spacer--400);
    &[data-grade='5'] {
      background: var(--color-grade-5);
    }
    &[data-grade='4'] {
      background: var(--color-grade-4);
    }
    &[data-grade='3'] {
      background: var(--color-grade-3);
    }
    &[data-grade='2'] {
      background: var(--color-grade-2);
    }
    &[data-grade='1'] {
      background: var(--color-grade-1);
    }
    &[data-grade='0'] {
      background: var(--color-grade-0);
    }
  }
}
.evaluation__text {
  @include rfs($font-size-14);
  line-height: calc(19 / 14);
  font-weight: 600;
}
.evaluation__body {
  position: relative;
  padding: 0 var(--spacer--400);
  line-height: calc(22 / 16);
  @media screen and (min-width: 500px) {
    padding-left: var(--spacer--600);
    padding-right: var(--spacer--600);
  }
  @media screen and (min-width: 540px) {
    padding-left: var(--spacer--700);
    padding-right: var(--spacer--700);
  }
}
.evaluation__explanation {
  @include rfs($font-size-21);
  margin-bottom: var(--spacer--500);
  color: var(--color--blue-dark);
}
.evaluation__longdesc {
  @include rfs($font-size-18);
  margin-bottom: var(--spacer--600);
}
.evaluation__body .tts {
  position: absolute;
  top: var(--spacer);
  right: var(--spacer);
  @media screen and (min-width: 540px) {
    top: var(--spacer-lg);
    right: var(--spacer-lg);
  }
  @media screen and (min-width: 1280px) {
    right: var(--spacer-xl);
  }
}
.evaluation__feature {
  @include rfs($font-size-18);
  color: var(--color--blue-dark);
  margin-bottom: var(--spacer);
}
.evaluation__feature-name {
  font-weight: 700;
}
</style>
