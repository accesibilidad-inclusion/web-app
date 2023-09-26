<template>
  <div class="onboarding onboarding--dark">
    <header class="onboarding__navbar">
    </header>
    <div class="container">
      <template v-if="submitting">
        <clip-loader :loading="submitting" :color="'#fff'" :size="'1rem'" class="mt-auto mb-auto"></clip-loader>
      </template>
      <template v-else>
        <h2 class="onboarding__title">Gracias por<br> tu aporte</h2>
        <p class="onboarding__description">Estás ayudando al mundo a<br> ser un lugar más accesible</p>
        <router-link :to="'/home'" class="onboarding__link">
          Volver
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
              <button type="button" class="btn btn--light btn--large btn--block subscription-form__submit" @click="show_subscription_form = true">
                Sí, avísame
              </button>
            </template>
            <template v-else>
              <form class="subscription-form" @submit="submitSubscription">
                <input v-model="subscription_email" type="email" class="subscription-form__control" placeholder="Escribe tu email aquí">
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
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';

export default {
  name: 'PlaceEvaluationComplete',
  components: {
    ClipLoader,
  },
  data() {
    return {
      submitting: true,
      submited: false,
      show_subscription_form: false,
      submitting_subscription: false,
      id: null,
      subscription_email: '',
    };
  },
  beforeMount() {
    if (!this.$route.params.place) {
      this.$router.push('/home');
    } else {
      this.$http.post(`${process.env.VUE_APP_API_DOMAIN}api/venues/store_by_user`, {
        name: this.$route.params.place.name,
        service_id: this.$route.params.service_id,
        lat: this.$route.params.place.geometry.location.lat(),
        lng: this.$route.params.place.geometry.location.lng(),
      }).then((result) => {
        this.submitting = false;
        this.id = result.data.id;
      });
    }
  },
  methods: {
    submitSubscription(event) {
      event.preventDefault();
      this.submitting_subscription = true;
      this.$http.post(`${process.env.VUE_APP_API_DOMAIN}api/venues/addNotification`, {
        id: this.id,
        email: this.subscription_email,
      }).then((result) => {
        this.submited = true;
        this.submitting_subscription = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/rfs.scss';

.onboarding ::v-deep .onboarding__title {
  @include rfs($font-size-21);
  margin-top: auto;
  text-transform: uppercase;
}
.onboarding__description {
  @include rfs($font-size-16);
  font-weight: bold;
  line-height: calc(22/16);
  color: var(--color-background);
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
