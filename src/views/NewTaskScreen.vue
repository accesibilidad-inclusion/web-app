<script setup lang="ts">
import {useAppNavStore} from '@/stores/app-nav'
import {ref} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {computed} from 'vue'

import IconCheck from '@/assets/img/app-icons/support/check2.svg?component'
import IconDelete from '@/assets/img/app-icons/support/error.svg?component'
import IconMenu from '@/assets/img/app-icons/support/menu.svg?component'
import IconPlus from '@/assets/img/app-icons/plus.svg?component'
import SpinnerLoader from '@/components/SpinnerLoader.vue'
import TextToSpeech from '@/components/TextToSpeech.vue'
import {useEventBus, useFetch} from '@vueuse/core'
import IconLike from '@/assets/img/app-icons/instructions/like.svg?component'

const router = useRouter()
const route = useRoute()

const appNav = useAppNavStore()

if (appNav.onboarding.newTask) {
  appNav.redirectTo = route.fullPath
  router.push('/aprende-a-agregar-tareas')
}

const task = ref('')
const steps = ref(['', '', ''])
const showStep = ref(1)
const stepEdit = ref('')
const editing = ref<number | null>(null)
const submited = ref(false)
const show_subscription_form = ref(false)
const submitting = ref(false)
const subscription_email = ref('')
const id = ref<number | null>(null)

const sendTask = async () => {
  submitting.value = true
  const {data} = await useFetch(
    `${import.meta.env.VITE_APP_API_DOMAIN}api/presential_tasks/contribution`
  )
    .post({
      task: task.value,
      steps: steps.value,
      venue: appNav.selected.venue?.id
    })
    .json()

  id.value = data.value.id
  showStep.value = 4
  submitting.value = false
}
const editStep = (i: number) => {
  editing.value = i
  stepEdit.value = steps.value[i]
}
const submitSubscription = async (event: Event) => {
  event.preventDefault()
  submitting.value = true
  await useFetch(`${import.meta.env.VITE_APP_API_DOMAIN}api/presential_tasks/addNotification`)
    .post({
      id: id.value,
      email: subscription_email.value
    })
    .json()

  submited.value = true
  submitting.value = false
}

const setStep = (i: number) => {
  steps.value[i] = stepEdit.value
  editing.value = null
}

const addStep = computed(() => {
  return steps.value.length < 9 && !steps.value.filter((s) => s.trim() === '').length
})

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
  <div class="page-task">
    <form>
      <template v-if="showStep == 1">
        <h2 class="page__title">
          Agregar una nueva tarea
          <text-to-speech :text-audio="'Agregar una nueva tarea'" />
        </h2>
        <div class="custom-control custom-control--with-btn">
          <input v-model="task" type="text" placeholder="Ejemplo: Comprar tarjeta" />
          <span
            v-if="task.trim() != ''"
            @click="showStep = 2"
            class="btn btn--primary btn--block btn--large btn--icon"
            ><icon-plus /> Agregar</span
          >
        </div>
      </template>
      <template v-else-if="showStep == 2">
        <h2 class="page__title-new-task">
          {{ task }}
          <TextToSpeech :text-audio="task" />
        </h2>
        <p class="page__subtitle page__text-audio">
          Enumera los pasos requeridos para completar esta acción
          <text-to-speech
            :text-audio="
              'Enumera los pasos requeridos para completar esta acción\n\n\n\n\n\n' +
              'Mínimo 3 y máximo 9 pasos'
            " />
        </p>
        <p class="page__indication">Mínimo 3 y máximo 9 pasos</p>
        <div v-for="(step, index) in steps" :key="index" class="custom-control page__new-steps">
          <span>{{ index + 1 }}</span>
          <input
            v-model="steps[index]"
            type="text"
            :placeholder="'Escribe el paso ' + (index + 1)" />
          <span
            v-if="steps.length > 3"
            class="btn btn--large btn--icon btn--as-link page__delete-new-steps"
            @click="steps.splice(index, 1)"
            ><icon-delete /> Eliminar</span
          >
        </div>
        <div
          v-if="addStep"
          class="btn btn--large btn--primary btn--filled--skyblue btn--icon page__add-new-steps"
          @click="steps.push('')">
          <icon-plus /> Agregar otro paso
        </div>
      </template>
      <template v-else-if="showStep == 3">
        <h2 class="page__title-new-task">
          {{ task }}
          <TextToSpeech :text-audio="task" />
        </h2>
        <p class="page__subtitle page__text-audio">
          Revisa los pasos ingresados
          <text-to-speech
            :text-audio="
              'Revisa los pasos ingresados\n\n\n\n\n\n' +
              'Edita los pasos en caso de ser necesario'
            " />
        </p>
        <p class="page__indication">Edita los pasos en caso de ser necesario</p>
        <div
          v-for="(step, index) in steps"
          @click="editing ? () => {} : editStep(index)"
          :key="index"
          class="step-block-inserted">
          {{ index + 1 }}
          <template v-if="editing != index"
            ><p class="step-block-inserted__title">{{ step }}</p>
          </template>
          <template v-else>
            <div class="custom-control">
              <input v-model="stepEdit" type="text" />
            </div>
            <div class="step-block-inserted__actions">
              <span class="step-block-inserted__btn" @click.stop="setStep(index)"
                ><icon-check class="step-block-inserted__icon-check" />Listo</span
              >
              <span class="step-block-inserted__btn" @click.stop="editing = null"
                ><icon-delete class="step-block-inserted__icon-cancel" />Cancelar</span
              >
            </div>
          </template>
        </div>
      </template>
      <template v-else-if="showStep == 4">
        <div class="thanks-message">
          <text-to-speech
            :text-audio="
              'Gracias por tu aporte\n\n\n\n\n\n' +
              'Estas ayudando al mundo a ser un lugar más accesible\n\n\n\n\n\n' +
              'Volver\n\n\n\n\n\n' +
              '¿Quieres que te avisemos cuando publiquemos tu aporte?'
            " />
          <span class="thanks-message__icon">
            <icon-like></icon-like>
          </span>
          <h2 class="thanks-message__title">Gracias por tu aporte</h2>
          <p class="thanks-message__description">
            Estás ayudando al mundo a ser un lugar más accesible
          </p>
          <router-link
            :to="
              '/' +
              appNav.selected.category?.slug +
              '/' +
              appNav.selected.service?.slug +
              '/' +
              appNav.selected.venue?.slug
            "
            class="btn btn--primary btn--block btn--large btn--filled--skyblue"
            >Volver a {{ appNav.selected.venue?.name }}</router-link
          >
        </div>
      </template>
    </form>
    <footer class="thanks-message-footer">
      <template v-if="showStep == 4">
        <template v-if="submited">
          <p class="thanks-message__description">
            Muchas gracias, te avisaremos cuando tu aporte sea aprobado.
          </p>
        </template>
        <template v-else>
          <p class="thanks-message__description">
            ¿Quieres que te avisemos cuando publiquemos tu aporte?
          </p>
          <button
            v-if="!show_subscription_form"
            class="btn btn--large btn--block btn--primary"
            @click="show_subscription_form = true">
            Sí, avísame
          </button>
          <div v-else class="thanks-message__form">
            <form class="subscription-form custom-control" @submit="submitSubscription">
              <input
                v-model="subscription_email"
                type="email"
                class="thanks-message__email"
                placeholder="Escribe tu email aquí" />
              <button
                type="submit"
                class="btn btn--large btn--primary btn--icon"
                :disabled="submitting">
                Enviar
                <SpinnerLoader v-if="submitting" />
              </button>
            </form>
          </div>
        </template>
      </template>
      <button
        v-else
        :tag="'button'"
        class="btn btn--large btn--block btn--primary page__footer"
        :disabled="!addStep || submitting"
        @click="showStep < 3 ? (showStep = 3) : sendTask()">
        <span v-if="showStep < 3">Listo</span>
        <span v-else>Confirmar <SpinnerLoader v-if="submitting" /></span>
      </button>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/rfs.scss';
.page-task {
  padding-top: calc(var(--spacer--500) + 50px);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-bottom: var(--spacer--700);
  @media screen and (min-width: 640px) {
    padding-top: calc(var(--spacer--500) + 62px);
    padding-bottom: 0;
  }
  form {
    height: 100%;
  }
}
.page__title {
  margin-left: var(--spacer--400);
  margin-right: var(--spacer--400);
}
.page__subtitle {
  margin-left: var(--spacer--400);
  margin-right: var(--spacer--400);
}
.page__indication {
  margin-left: var(--spacer--400);
  margin-right: var(--spacer--400);
}
.btn--filled--skyblue {
  margin-left: var(--spacer--400);
  margin-right: var(--spacer--400);
}
.page__title-new-task {
  @include rfs($font-size-16);
  text-align: center;
  color: var(--color--blue-dark);
  border-radius: var(--spacer--500);
  background-color: var(--color--skyblue);
  padding: var(--spacer--500);
  position: relative;
  margin-left: var(--spacer--400);
  margin-right: var(--spacer--400);
  .theme-online & {
    background-color: var(--color--yellow);
  }
  .tts {
    position: absolute;
    top: var(--spacer--500);
    right: var(--spacer--500);
  }
}
.custom-control {
  margin-left: var(--spacer--400);
  margin-right: var(--spacer--400);
}
.page__new-steps {
  @include rfs($font-size-16);
  font-weight: 700;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  column-gap: var(--spacer--300);
  align-items: center;
  margin-bottom: var(--spacer--400);
  position: relative;
}
.page__add-new-steps {
  width: 250px;
  margin-left: auto;
}
.page__delete-new-steps {
  grid-column: 2/3;
  width: 130px;
  margin-left: auto;
  justify-content: flex-end;
  padding-top: var(--spacer--200);
}

//bloque pasos
.step-block-inserted {
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto auto;
  column-gap: var(--spacer--200);
  align-items: center;
  margin-bottom: var(--spacer--400);
  margin-left: var(--spacer--400);
  margin-right: var(--spacer--400);
  border: 1px solid transparent;
  background-color: var(--color--white);
  border-radius: var(--spacer--500);
  box-shadow: 0px 1px 5px rgba(148, 148, 148, 0.25);
  transition: var(--transition-base);
  padding: var(--spacer--400) var(--spacer--400);
  font-weight: 700;
  position: relative;
  &:hover {
    cursor: pointer;
    border: 1px solid var(--color--blue-dark);
    box-shadow: 0px 1px 5px rgba(148, 148, 148, 0.5);
  }
  .custom-control {
    grid-column: 2 / -1;
    grid-row: 1 / 2;
    input {
      padding: var(--spacer--300);
      border-color: var(--color--blue-light);
      border-radius: var(--spacer--300);
      color: var(--color--blue-light);
      font-weight: 700;
      font-style: italic;
    }
  }
}
.step-block-inserted__title {
  @include rfs($font-size-16);
  font-weight: 700;
  color: var(--color--blue-dark);
}
.step-block-inserted__edit {
  display: block;
  height: 16px;
  width: 16px;
  &::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
  }
  svg {
    height: 100%;
    width: 100%;
    path {
      fill: var(--color--blue-dark);
    }
  }
}
.step-block-inserted__actions {
  grid-column: 1/3;
  display: flex;
  justify-content: center;
  margin-top: var(--spacer-sm);
}
.step-block-inserted__btn {
  @include rfs($font-size-14);
  color: var(--color--blue-dark);
  font-weight: 600;
  text-decoration: underline;
  padding: var(--spacer-sm) var(--spacer) var(--spacer-xs) var(--spacer);
  &:hover {
    color: var(--color--blue);
  }
  svg {
    margin-right: var(--spacer-xs);
    path {
      fill: var(--color--blue-dark);
    }
  }
}
.step-block-inserted__icon-check {
  width: auto;
  height: 13px;
}
.step-block-inserted__icon-cancel {
  width: auto;
  height: 11px;
}
</style>
