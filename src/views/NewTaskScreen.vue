<script setup lang="ts">
import {useAppNavStore} from '@/stores/app-nav'
import {ref} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {computed} from 'vue'

import IconAdd from '@/assets/img/app-icons/add.svg?component'
import IconCheck from '@/assets/img/app-icons/check.svg?component'
import IconDelete from '@/assets/img/app-icons/error.svg?component'
import IconMenu from '@/assets/img/app-icons/drag-light.svg?component'
import IconPlus from '@/assets/img/app-icons/plus.svg?component'
import TextToSpeech from '@/components/TextToSpeech.vue'
import {useEventBus, useFetch} from '@vueuse/core'

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
const submitting_subscription = ref(false)
const subscription_email = ref('')
const id = ref<number | null>(null)

const sendTask = async () => {
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
}
const editStep = (i: number) => {
  editing.value = i
  stepEdit.value = steps.value[i]
}
const submitSubscription = async (event: Event) => {
  event.preventDefault()
  submitting_subscription.value = true
  await useFetch(`${import.meta.env.VITE_APP_API_DOMAIN}api/presential_tasks/addNotification`)
    .post({
      id: id.value,
      email: subscription_email.value
    })
    .json()

  submited.value = true
  submitting_subscription.value = false
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
  <div class="page">
    <div class="container">
      <form>
        <template v-if="showStep == 1">
          <h2 class="page__title">
            Agregar una nueva tarea
            <text-to-speech :text-audio="'Agregar una nueva tarea'" />
          </h2>
          <div class="form-group page__search">
            <input v-model="task" type="text" placeholder="Ejemplo: Comprar tarjeta" />
            <span v-if="task.trim() != ''" @click="showStep = 2"><icon-plus /></span>
          </div>
        </template>
        <template v-else-if="showStep == 2">
          <h2 class="page__title-new-task">
            {{ task }}
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
          <div v-for="(step, index) in steps" :key="index" class="form-group page__new-steps">
            {{ index + 1 }}
            <input
              v-model="steps[index]"
              type="text"
              :placeholder="'Escribe el paso ' + (index + 1)" />
            <span
              v-if="steps.length > 3"
              class="page__delete-new-steps"
              @click="steps.splice(index, 1)"
              ><icon-delete
            /></span>
          </div>
          <div v-if="addStep" class="page__add-new-steps" @click="steps.push('')">
            <icon-add />Agregar otro paso
          </div>
        </template>
        <template v-else-if="showStep == 3">
          <h2 class="page__title-new-task">
            {{ task }}
          </h2>
          <p class="page__subtitle page__text-audio">
            Revisa los pasos ingresados
            <text-to-speech
              :text-audio="
                'Revisa los pasos ingresados\n\n\n\n\n\n' +
                'Edita o reordena los pasos en caso de ser necesario'
              " />
          </p>
          <p class="page__indication">Edita o reordena los pasos en caso de ser necesario</p>
          <div v-for="(step, index) in steps" :key="index" class="step-block-inserted">
            {{ index + 1 }}
            <template v-if="editing != index"
              ><p class="step-block-inserted__title">{{ step }}</p>
              <span @click="editStep(index)"><icon-menu class="step-block-inserted__edit" /></span
            ></template>
            <template v-else
              ><input v-model="stepEdit" type="text" />
              <div class="step-block-inserted__actions">
                <span class="step-block-inserted__btn" @click="setStep(index)"
                  ><icon-check class="step-block-inserted__icon-check" />Listo</span
                >
                <span class="step-block-inserted__btn" @click="editing = null"
                  ><icon-delete class="step-block-inserted__icon-cancel" />Cancelar</span
                >
              </div>
            </template>
          </div>
        </template>
        <template v-else-if="showStep == 4">
          <div class="thanks-message">
            <div class="thanks-message__container">
              <text-to-speech
                :text-audio="
                  'Gracias por tu aporte\n\n\n\n\n\n' +
                  'Estas ayudando al mundo a ser un lugar más accesible\n\n\n\n\n\n' +
                  'Volver\n\n\n\n\n\n' +
                  '¿Quieres que te avisemos cuando publiquemos tu aporte?'
                " />
              <h2 class="thanks-message__title">
                Gracias por<br />
                tu aporte
              </h2>
              <p class="thanks-message__description">
                Estás ayudando al mundo a<br />
                ser un lugar más accesible
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
                class="thanks-message__back"
                >Volver a {{ appNav.selected.venue?.name }}</router-link
              >
            </div>
          </div>
        </template>
      </form>
      <footer class="page__footer">
        <template v-if="showStep == 4">
          <div class="thanks-message__footer">
            <template v-if="submited">
              <p class="thanks-message__footer-description">
                Muchas gracias, te avisaremos cuando tu aporte sea aprobado.
              </p>
            </template>
            <template v-else>
              <p class="thanks-message__footer-description">
                ¿Quieres que te avisemos cuando publiquemos tu aporte?
              </p>
              <button
                v-if="!show_subscription_form"
                class="btn btn--white btn--large btn--block"
                style="color: var(--color-brand-darker)"
                @click="show_subscription_form = true">
                Sí, avísame
              </button>
              <div v-else class="thanks-message__form">
                <form class="subscription-form" @submit="submitSubscription">
                  <input
                    v-model="subscription_email"
                    type="email"
                    class="thanks-message__email"
                    placeholder="Escribe tu email aquí" />
                  <button
                    type="submit"
                    class="btn btn--large btn--ghost"
                    :disabled="submitting_subscription">
                    Enviar
                    <template v-if="submitting_subscription">
                      <clip-loader
                        :loading="submitting_subscription"
                        :color="'#fff'"
                        :size="'1rem'"></clip-loader>
                    </template>
                  </button>
                </form>
              </div>
            </template>
          </div>
        </template>
        <button
          v-else
          :tag="'button'"
          class="btn btn--large btn--block btn--primary page__footer"
          :disabled="!addStep"
          @click="showStep < 3 ? (showStep = 3) : sendTask()">
          <span v-if="showStep < 3">Listo</span>
          <span v-else>Confirmar</span>
        </button>
      </footer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/rfs.scss';

input {
  @include rfs($font-size-16);
  width: 100%;
  padding: var(--spacer-sm) var(--spacer-lg) var(--spacer-sm) var(--spacer-sm);
  border: 1px solid var(--color-neutral-light);
  border-radius: var(--border-radius);
  &::placeholder {
    color: #848484;
    opacity: 1;
    font-style: italic;
    font-family: var(--font-family);
  }
}
.page__title-new-task {
  @include rfs($font-size-16);
  color: var(--color-background);
  background-color: var(--color-brand-dark);
  padding: var(--spacer-sm) var(--spacer);
}

.page .page__new-steps {
  @include rfs($font-size-16);
  font-weight: 700;
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: var(--spacer-sm);
  align-items: center;
  margin-bottom: var(--spacer-sm);
  position: relative;
  input {
    border: none;
    border-bottom: 1px solid var(--color-neutral-light);
    border-radius: 0;
    padding-left: 0;
    &::placeholder {
      color: var(--color-neutral-light);
    }
  }
}
.page__delete-new-steps {
  position: absolute;
  right: var(--spacer-xs);
  svg {
    width: 10px;
    height: 10px;
    path {
      fill: var(--color-neutral-light);
    }
  }
}
.page__add-new-steps {
  padding-top: var(--spacer-sm);
  font-weight: 600;
  color: var(--color-brand-darkest);
  padding-bottom: var(--spacer);
  svg {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    margin-right: var(--spacer-sm);
  }
}
//bloque pasos
.step-block-inserted {
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto auto;
  column-gap: var(--spacer-sm);
  align-items: center;
  margin: calc(var(--spacer) / 1.5) 0;
  border: 2px solid var(--color-brand-lighter);
  border-radius: var(--border-radius);
  box-shadow: 0px 1px 5px rgba(148, 148, 148, 0.25);
  transition: var(--transition-base);
  padding: var(--spacer-sm);
  font-weight: 700;
  @media screen and (min-width: 640px) {
    padding: calc(var(--spacer) / 2) calc(var(--spacer) * 0.75);
  }
  &:hover {
    cursor: pointer;
    border-color: var(--color-brand-light);
    box-shadow: 0px 1px 5px rgba(148, 148, 148, 0.5);
  }
  input {
    border: none;
    border-bottom: 1px solid var(--color-neutral-light);
    border-radius: 0;
    padding: 0 0 var(--spacer-xs) 0;
    color: var(--color-neutral-light);
    font-style: italic;
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  }
}
.step-block-inserted__title {
  font-weight: normal;
}
.step-block-inserted__edit {
  width: var(--spacer);
  height: auto;
}
.step-block-inserted__actions {
  grid-column: 1/3;
  display: flex;
  justify-content: center;
  margin-top: var(--spacer-sm);
}
.step-block-inserted__btn {
  @include rfs($font-size-14);
  color: var(--color-brand-darkest);
  font-weight: 600;
  text-decoration: underline;
  padding: var(--spacer-sm) var(--spacer) var(--spacer-xs) var(--spacer);
  svg {
    margin-right: var(--spacer-xs);
    path {
      fill: var(--color-brand-darkest);
    }
  }
}
.step-block-inserted__icon-check {
  width: 0.6rem;
  height: auto;
}
.step-block-inserted__icon-cancel {
  width: 0.5rem;
  height: auto;
}
//agradecimiento aporte
.thanks-message {
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-brand-lightest);
  z-index: 10000;
  .thanks-message__container {
    //background-image: url('../../public/img/illustrations/background.svg');
    background-size: cover;
    background-repeat: no-repeat;
    color: var(--color-highlight);
    background-color: var(--color-brand-darkest);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    padding: var(--spacer);
    overflow-x: hidden;
    overflow-y: auto;

    @media screen and (min-width: 640px) {
      max-width: 640px;
      margin-left: auto;
      margin-right: auto;
      padding: var(--spacer-lg);
    }
    @media screen and (min-width: 1288px) {
      max-width: 750px;
      padding: var(--spacer-xl);
    }
    .tts {
      margin-left: auto;
    }
    .tts ::v-deep path {
      fill: var(--color-brand-light);
    }
  }
}
.thanks-message__title {
  margin-top: var(--spacer);
  text-transform: uppercase;
  color: var(--color-highlight);
}
.thanks-message__description {
  @include rfs($font-size-16);
  font-weight: bold;
  color: var(--color-background);
  margin-top: var(--spacer);
}
.thanks-message__back {
  @include rfs($font-size-16);
  color: var(--color-highlight);
  padding: var(--spacer) 0;
  font-weight: bold;
}
.thanks-message__footer {
  z-index: 100000;
  position: relative;
  padding-top: var(--spacer);
  background-color: var(--color-brand-darkest);
}
.thanks-message__footer-description {
  @include rfs($font-size-16);
  font-weight: bold;
  color: var(--color-highlight);
  margin-bottom: var(--spacer);
}
.thanks-message__form {
  .subscription-form {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: var(--spacer-sm);
  }
  .btn {
    display: flex;
    align-items: center;
    .v-spinner {
      margin-left: var(--spacer-sm);
    }
  }
}
.thanks-message__email {
  @include rfs($font-size-14);
  padding: var(--spacer-sm) var(--spacer-sm) var(--spacer-sm) var(--spacer-sm);
  border: 2px solid var(--color-background);
  border-radius: var(--border-radius);
  &::placeholder {
    color: #848484;
    opacity: 1;
    font-style: italic;
    font-family: var(--font-family);
  }
}
</style>
