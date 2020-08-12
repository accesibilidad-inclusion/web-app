<!-- eslint-disable max-len -->
<template>
  <div class="onboarding onboarding--dark">
    <div class="container">
      <template v-if="state.submitting">
        <clip-loader :loading="state.submitting" :color="'#fff'" :size="'1rem'" class="mt-auto mb-auto"></clip-loader>
      </template>
      <template v-else>
        <h2 class="onboarding__title">Gracias por tu aporte</h2>
        <p class="onboarding__description">Estás ayudando al mundo a ser un lugar más accesible</p>
        <router-link :to="'/lugar/' + venue.id" class="onboarding__link">
          Volver a {{ venue.name }}
        </router-link>
        <footer class="onboarding__footer">
          <p class="onboarding__description subscription-form__description">
            ¿Quieres que te avisemos cuando publiquemos tu aporte?
          </p>
          <template v-if="!state.show_subscription_form">
            <button type="button" @click="state.show_subscription_form = true" class="btn btn--block btn--ghost subscription-form__submit">
              Sí, avísame
            </button>
          </template>
          <template v-else>
            <form class="subscription-form" @submit="submitSubscription">
              <input type="email" v-model="subscription_email" class="subscription-form__control" placeholder="Escribe tu email aquí">
              <button type="submit" class="btn btn--ghost subscription-form__submit" :disabled="state.submitting_subscription">
                Enviar
                <template v-if="state.submitting_subscription">
                  <clip-loader :loading="state.submitting_subscription" :color="'#fff'" :size="'1rem'"></clip-loader>
                </template>
              </button>
            </form>
          </template>
        </footer>
      </template>
    </div>
  </div>
</template>

<script>
import Venue from '@/models/Venue';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';

export default {
  name: 'NewAidConfirmation',
  components: {
    ClipLoader,
  },
  data() {
    return {
      state: {
        submitting: false,
        show_subscription_form: false,
        submitting_subscription: false,
      },
      subscription_email: null,
      venue: new Venue(this.$store.state.selected.venue),
    };
  },
  methods: {
    submitSubscription(event) {
      event.preventDefault();
      this.$data.state.submitting_subscription = true;
      // console.log(this.$data.subscription_email);
      // this.$http.post(`${process.env.VUE_APP_API_DOMAIN}api/`, {
      //   email: this.$data.state.submitting_subscription,
      // }).then((result) => {
      //   this.$data.state.submitting = false;
      // });
    },
  },
  created() {
    this.$data.state.submitting = false;
    // this.$http.post(`${process.env.VUE_APP_API_DOMAIN}api/`, {
    // }).then((result) => {
    //   this.$data.state.submitting = false;
    // });
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/rfs.scss';
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
  display: flex;
  flex-wrap: nowrap;
}
.subscription-form__description {
  margin-bottom: .75rem;
  color: var(--color-highlight);
}
.subscription-form__control {
  min-width: 100px;
  max-width: 100%;
  margin-right: .75rem;
  padding-right: 0;
  border: none;
}
.subscription-form__submit {
  @include rfs($font-size-14);
  padding-top: var(--spacer-sm);
  padding-bottom: var(--spacer-sm);
  .v-spinner {
    margin-left: var(--spacer-sm);
  }
}
</style>
