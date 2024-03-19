<script setup lang="ts">
import {useAppNavStore} from '@/stores/app-nav'
import {reactive, ref} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {computed} from 'vue'

import IconCheck from '@/assets/img/app-icons/support/check2.svg?component'
import IconDelete from '@/assets/img/app-icons/support/error.svg?component'
import IconPlus from '@/assets/img/app-icons/plus.svg?component'
import BlockHeader from '@/components/BlockHeader.vue'
import OnboardingItem from '@/components/OnboardingItem.vue'
import SpinnerLoader from '@/components/SpinnerLoader.vue'
import TextToSpeech from '@/components/TextToSpeech.vue'
import {useEventBus, useFetch} from '@vueuse/core'
import IconLike from '@/assets/img/app-icons/instructions/like.svg?component'
import IconEdit from '@/assets/img/app-icons/edit.svg?component'
import OnboardingImage from '@/assets/img/illustrations/nueva-tarea 1.svg?component'
import type {Image} from '@/model/image'

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
  console.log(editing.value)
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
  if (stepEdit.value.trim() === '') return
  steps.value[i] = stepEdit.value
  editing.value = null
}

const addStep = computed(() => {
  return steps.value.length < 9 && !steps.value.filter((s) => s.trim() === '').length
})

const canAdvance = computed(() => {
  switch (showStep.value) {
    case 1:
      return task.value.trim() !== ''
    case 2:
      return !steps.value.filter((s) => s.trim() === '').length
    default:
      return true
  }
})

const images = ref<Array<Image>>([])
const pictograms = reactive<
  Array<{
    subject: number | null
    context: number | null
    landmark: number | null
  }>
>(
  Array(steps.value.length)
    .fill(null)
    .map(() => ({subject: null, context: null, landmark: null}))
)

const {data} = await useFetch(`${import.meta.env.VITE_APP_API_DOMAIN}api/images`)
  .get()
  .json()

images.value = data.value

const active_step = ref(0)
const tab = ref<'subject' | 'landmark' | 'context'>('subject')

const showImages = computed(() => {
  return images.value.filter((i: Image) =>
    tab.value === 'subject'
      ? i.layout === 1
      : tab.value === 'landmark'
      ? i.layout === 2
      : i.layout === 3
  )
})

const setImage = (image: Image) => {
  pictograms[active_step.value][tab.value] = image.id
}

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
  <div :class="showStep !== 4 ? 'page-task' : 'onboarding-nav'">
    <form>
      <BlockHeader
        v-if="showStep !== 4"
        compact
        :first-description="true"
        description="Crear tarea"
        :title="showStep > 1 ? `&quot;${task}&quot;` : ''" />
      <template v-if="showStep == 1">
        <h2 class="page__title">
          Escribe el nombre de la tarea
          <text-to-speech :text-audio="'Escribe el nombre de la tarea'" />
        </h2>
        <div class="custom-control custom-control--with-btn">
          <input v-model="task" type="text" placeholder="Ejemplo: Comprar tarjeta" />
        </div>
      </template>
      <template v-else-if="showStep == 2">
        <p class="page__subtitle page__text-audio">
          Enumera los pasos requeridos para completar esta acción. Mínimo 3 y máximo 9 pasos
          <text-to-speech
            :text-audio="
              'Enumera los pasos requeridos para completar esta acción\n\n\n\n\n\n' +
              'Mínimo 3 y máximo 9 pasos'
            " />
        </p>
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
        <p class="page__subtitle page__text-audio">
          Revisa los pasos ingresados y edítalos en caso de ser necesario
          <text-to-speech
            :text-audio="'Revisa los pasos ingresados y edítalos en caso de ser necesario'" />
        </p>
        <div
          v-for="(step, index) in steps"
          @click="editing === index ? () => {} : editStep(index)"
          :key="index"
          class="step-block-inserted">
          {{ index + 1 }}
          <template v-if="editing != index"
            ><p class="step-block-inserted__title">{{ step }}</p>
            <IconEdit />
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
        <OnboardingItem
          :data="{
            title: 'Crear el apoyo gráfico',
            body: '<ul><li>Ahora debes seleccionar los 3 elementos que arman tu pictograma (persona, objeto y espacio)</li><li>Podrás previsualizar en la misma pantalla cómo se va armando cada uno</li><li>Una vez que selecciones todas las capas de los pasos podrás guardar y enviar el apoyo a revisión</li></ul>',
            image: OnboardingImage
          }" />
      </template>
      <template v-else-if="showStep == 5">
        <!-- <ol v-touch:swipe.left="advanceStep" v-touch:swipe.right="rewindStep" class="task__steps">
          <li
            v-for="(step, index) in task.steps"
            :key="step.id"
            :step="step"
            :class="'task-step' + (index === active_step ? ' task-step--active' : '')">
            <figure class="task-step__figure">
              <div class="step-canvas">
                <DrawPictogram :layers="getImages" />
              </div>
              <div class="task-step-main">
                <figcaption class="task-step__legend">
                  <div class="task-step__number">
                    Paso {{ active_step + 1 }} de {{ task.steps.length }}
                  </div>
                  <div class="task-text__description">{{ step.label }}</div>
                  <text-to-speech :text-audio="step.label" />
                </figcaption>
              </div>
            </figure>
          </li>
        </ol> -->
        <div class="select-pictogram">
          <div class="select-pictogram__filter">
            <button
              class="btn btn--primary btn--block btn--filled--skyblue-light"
              :class="{
                'btn--active': tab === 'subject'
              }"
              @click="tab = 'subject'">
              Persona
              <icon-check
                class="select-pictogram__check"
                v-if="pictograms[active_step]['subject']" />
            </button>
            <button
              class="btn btn--primary btn--block btn--filled--skyblue-light"
              :class="{
                'btn--active': tab === 'landmark'
              }"
              @click="tab = 'landmark'">
              Objeto
              <icon-check
                class="select-pictogram__check"
                v-if="pictograms[active_step]['landmark']" />
            </button>
            <button
              class="btn btn--primary btn--block btn--filled--skyblue-light"
              :class="{
                'btn--active': tab === 'context'
              }"
              @click="tab = 'context'">
              Espacio
              <icon-check
                class="select-pictogram__check"
                v-if="pictograms[active_step]['context']" />
            </button>
          </div>
          <h2 class="select-pictogram__title">Elige una persona para esta capa</h2>
          <div class="select-pictogram__img">
            <div
              v-for="(image, index) in showImages"
              :key="index"
              @click="setImage(image)"
              :class="{
                image__active: image.id === pictograms[active_step][tab]
              }">
              <img :src="`${image.path}${image.filename}`" style="width: 40%" />
              <!-- <component :is="image.component" /> -->
              <div class="select-pictogram__label">{{ image.label }}</div>
            </div>
          </div>
        </div>
        <!-- <div class="task__nav">
          <span class="task__nav-selection"
            >Capa
            <strong>{{
              Number(pictograms[active_step]['subject'] !== null) +
              Number(pictograms[active_step]['context'] !== null) +
              Number(pictograms[active_step]['landmark'] !== null)
            }}</strong>
            de <strong>3</strong> seleccionada</span
          >
          <button
            class="btn btn--large btn--secondary"
            :class="{
              'btn--hidden': active_step === 0 && task.prerequisites.trim() === ''
            }"
            @click="rewindStep">
            Anterior
          </button>
          <button
            v-if="active_step < task.steps.length - 1"
            :disabled="!canContinue()"
            class="btn btn--large btn--primary btn--block"
            @click="advanceStep">
            Siguiente
          </button>
          <button
            v-if="active_step === task.steps.length - 1"
            :disabled="!canContinue() || submitting"
            class="btn btn--large btn--primary btn--block"
            @click="saveProposal">
            Guardar
            <SpinnerLoader v-if="submitting" />
          </button>
        </div> -->
      </template>
      <template v-else-if="showStep == 6">
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

    <template v-if="showStep == 6">
      <footer class="thanks-message-footer">
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
      </footer>
    </template>
    <template v-else>
      <footer>
        <button
          v-if="showStep > 1"
          class="btn btn--large btn--secondary btn--block"
          @click="showStep--">
          Atras
        </button>
        <button
          class="btn btn--large btn--primary btn--block"
          :disabled="!canAdvance"
          @click="showStep++">
          <span v-if="![3, 5].includes(showStep)">Siguiente</span>
          <span v-else-if="showStep === 3">Ir a crear apoyo gráfico</span>
          <span v-else>Confirmar <SpinnerLoader v-if="submitting" /></span>
        </button>
      </footer>
    </template>

    <!-- <button
        v-else
        class="btn btn--large btn--block btn--primary page__footer"
        :disabled="!addStep || submitting"
        @click="showStep < 3 ? (showStep = 3) : sendTask()">
        <span v-if="showStep < 3">Siguiente</span>
        <span v-else>Confirmar <SpinnerLoader v-if="submitting" /></span>
      </button> -->
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/rfs.scss';
.page-task {
  padding-top: calc(var(--spacer--500) + 50px);
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 540px) {
    padding-top: calc(var(--spacer--500) + 62px);
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
footer {
  margin-top: auto;
  display: flex;
  gap: var(--spacer--300);
  padding-top: var(--spacer--500);
}
</style>
