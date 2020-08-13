<!-- eslint-disable max-len -->
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
    };
  },
  beforeMount() {
    if (!this.$route.params.place) {
      this.$router.push('/home');
    } else {
      this.$http.post(`${process.env.VUE_APP_API_DOMAIN}api/venues/store_by_user`, {
        name: this.$route.params.place.name,
        lat: this.$route.params.place.geometry.location.lat(),
        lng: this.$route.params.place.geometry.location.lng(),
      }).then((result) => {
        this.submitting = false;
      });
    }
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
  max-width: 15rem;
}
.onboarding__link {
  @include rfs($font-size-16);
  font-weight: bold;
  color: var(--color-highlight);
}
</style>
