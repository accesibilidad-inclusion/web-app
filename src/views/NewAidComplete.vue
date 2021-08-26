<!-- eslint-disable max-len -->
<template>
  <div class="onboarding onboarding--dark onboarding__background-image">
    <div class="container">
      <template v-if="state.submitting">
        <clip-loader :loading="state.submitting" :color="'#fff'" :size="'1rem'" class="mt-auto mb-auto"></clip-loader>
      </template>
      <template v-else>
        <text-to-speech :text-audio="'Gracias por tu aporte\n\n\n\n\n\n'
          + 'Estas ayudando al mundo a ser un lugar más accesible\n\n\n\n\n\n'
          + 'Volver\n\n\n\n\n\n'
          + '¿Quieres que te avisemos cuando publiquemos tu aporte?'" />
        <h2 class="onboarding__title">Gracias por<br> tu aporte</h2>
        <p class="onboarding__description">Estás ayudando al mundo a<br> ser un lugar más accesible</p>
        <router-link :to="'/'+ $store.state.selected.category.slug +'/'+ $store.state.selected.service.slug +'/' + $store.state.selected.venue.slug" class="onboarding__link">
          Volver a {{ venue.name }}
        </router-link>
        <footer class="onboarding__footer">
          <template v-if="submited">
            <p class="onboarding__description subscription-form__description">
              Muchas gracias, te avisaremos cuando tu aporte sea aprobado.
            </p>
          </template>
          <template v-else>
            <p class="onboarding__description subscription-form__description">
              ¿Quieres que te avisemos cuando publiquemos tu aporte?
            </p>
            <template v-if="!show_subscription_form">
              <button type="button" @click="show_subscription_form = true" class="btn btn--block btn--ghost subscription-form__submit">
                Sí, avísame
              </button>
            </template>
            <template v-else>
              <form class="subscription-form" @submit="submitSubscription">
                <input type="email" v-model="subscription_email" class="subscription-form__control" placeholder="Escribe tu email aquí">
                <button type="submit" class="btn btn--ghost subscription-form__submit" :disabled="submitting_subscription">
                  Enviar
                  <template v-if="submitting_subscription">
                    <clip-loader :loading="submitting_subscription" :color="'#fff'" :size="'1rem'"></clip-loader>
                  </template>
                </button>
              </form>
            </template>
          </template>
        </footer>
      </template>
    </div>
  </div>
</template>

<script>
import Venue from '@/models/Venue';
import Task from '@/models/Task';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import TextToSpeech from '@/components/TextToSpeech.vue';

export default {
  name: 'NewAidConfirmation',
  components: {
    ClipLoader,
    TextToSpeech,
  },
  data() {
    return {
      state: {
        submitting: false,
      },
      show_subscription_form: false,
      submitting_subscription: false,
      submited: false,
      id: null,
      subscription_email: '',
      venue: new Venue(this.$store.state.selected.venue),
      task: new Task(this.$store.state.selected.task),
      proposal: this.$store.state.proposalPictos,
    };
  },
  methods: {
    submitSubscription(event) {
      event.preventDefault();
      this.submitting_subscription = true;
      this.$http.post(`${process.env.VUE_APP_API_DOMAIN}api/proposal_tasks/addNotification`, {
        id: this.id,
        email: this.subscription_email,
      }).then((result) => {
        this.submited = true;
        this.submitting_subscription = false;
      });
    },
  },
  created() {
    this.$data.state.submitting = true;
    this.$http.post(`${process.env.VUE_APP_API_DOMAIN}api/proposal_tasks/store`, {
      task: this.task,
      proposal: this.proposal,
    }).then((result) => {
      this.$data.state.submitting = false;
      this.id = result.data.id;
    });
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/rfs.scss';
.onboarding__background-image {
  background-image: url('../../public/img/illustrations/background.svg');
  background-size: cover;
  background-repeat: no-repeat;
  .tts {
    text-align: right;
  }
  .tts ::v-deep path {
    fill: var(--color-brand-light);
  }
}
.onboarding__title {
  text-transform: uppercase;
}
.onboarding__description {
  @include rfs($font-size-16);
  font-weight: bold;
  line-height: calc(22/16);
  color: #fff;
}
.onboarding__link {
  @include rfs($font-size-16);
  font-weight: bold;
  color: var(--color-highlight);
}
.subscription-form {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: var(--spacer-sm);
}
.subscription-form__description {
  margin-bottom: var(--spacer);
  color: var(--color-highlight);
}
.subscription-form__control {
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
.subscription-form__submit {
  @include rfs($font-size-14);
  display: flex;
  align-items: center;
  justify-content: center;
  .v-spinner {
    margin-left: var(--spacer-sm);
  }
}
</style>
