<script setup lang="ts">
import FormSelect from './FormSelect.vue'
import TextToSpeech from './TextToSpeech.vue'
import BlockHeader from './BlockHeader.vue'
import {useAppSessionStore} from '@/stores/app-session'
import {computed, watch} from 'vue'

const appSession = useAppSessionStore()

const setBirthDate = () => {
  if (canContinue.value) {
    appSession.user.birthday = birthday.value
  }
}

const days = computed(() => {
  return Array.from({length: 31}, (_, index) => index + 1).map((i: number) => {
    return {value: i < 10 ? '0' + i : i, text: i}
  })
})
const months = computed(() => {
  return [
    {value: '01', text: 'Enero'},
    {value: '02', text: 'Febrero'},
    {value: '03', text: 'Marzo'},
    {value: '04', text: 'Abril'},
    {value: '05', text: 'Mayo'},
    {value: '06', text: 'Junio'},
    {value: '07', text: 'Julio'},
    {value: '08', text: 'Agosto'},
    {value: '09', text: 'Septiembre'},
    {value: '10', text: 'Octubre'},
    {value: '11', text: 'Noviembre'},
    {value: '12', text: 'Diciembre'}
  ]
})
const years = computed(() => {
  const end = new Date().getFullYear()
  return Array.from({length: 100}, (_, index) => end - 99 + index)
    .reverse()
    .map((i: number) => {
      return {value: i, text: i}
    })
})
const birthday = computed((): string => {
  if (appSession.user.yearBirth && appSession.user.monthBirth && appSession.user.dayBirth) {
    return `${appSession.user.yearBirth}-${appSession.user.monthBirth}-${appSession.user.dayBirth}`
  }
  return ''
})
const canContinue = computed((): boolean => {
  return !!appSession.user.dayBirth && !!appSession.user.monthBirth && !!appSession.user.yearBirth
})

watch(appSession.user, () => {
  setBirthDate()
})

defineExpose({
  canContinue
})
</script>

<template>
  <div class="onboarding-skyblue">
    <BlockHeader description="Sobre ti"> </BlockHeader>
    <div class="onboarding-item__container">
      <h2 class="onboarding__title">
        Fecha de nacimiento <TextToSpeech :text-audio="`Fecha de nacimiento: Día, Mes y Año`" />
      </h2>
      <form>
        <div class="form-group">
          <label for="day">Día</label>
          <FormSelect
            :id="'day'"
            :options="days"
            :optionDefault="'Selecciona el día'"
            v-model="appSession.user.dayBirth" />
        </div>
        <div class="form-group">
          <label for="month">Mes</label>
          <FormSelect
            :id="'month'"
            :options="months"
            :optionDefault="'Selecciona el mes'"
            v-model="appSession.user.monthBirth" />
        </div>
        <div class="form-group">
          <label for="ano">Año</label>
          <FormSelect
            :id="'year'"
            :options="years"
            :optionDefault="'Selecciona el año'"
            v-model="appSession.user.yearBirth" />
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
  @media screen and (min-width: 640px) {
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
  font-weight: 700;
  @include rfs(0.3125rem, margin-bottom);
  display: block;
}
.form-group {
  @include rfs(1.25rem, margin-bottom);
}
</style>
