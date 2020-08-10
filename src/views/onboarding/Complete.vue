<!-- eslint-disable max-len -->
<template>
  <div class="onboarding onboarding--dark">
    <header class="onboarding__navbar">
    </header>
    <div class="container">
      <template v-if="state.submitting_user">
        <clip-loader :loading="state.submitting_user" :color="'#fff'" :size="'1rem'" class="mt-auto mb-auto"></clip-loader>
      </template>
      <template v-else>
        <h2 class="onboarding__title">Gracias por tu información</h2>
        <footer class="onboarding__footer">
          <button @click="goHome()" class="btn btn--large btn--block btn--light">
            Empezar a usar PICTOS
          </button>
        </footer>
      </template>
    </div>
  </div>
</template>

<script>
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';

export default {
  name: 'Disability',
  components: {
    ClipLoader,
  },
  data() {
    return {
      state: {
        submitting_user: false,
        user_submitted: false,
      },
    };
  },
  methods: {
    goHome() {
      this.$router.push('/');
    },
  },
  created() {
    this.$data.state.submitting_user = true;
    this.$http.post(process.env.VUE_APP_API_DOMAIN + 'api/app_users/store', {
        birthday: this.$store.state.user.birthday,
        sex: this.$store.state.user.gender,
        impairments: JSON.stringify(this.$store.state.user.disabilities)
      }).then( result => {
        this.$store.dispatch("setUserId", result.data.id)
        this.$data.state.user_submitted = true;
        this.$data.state.submitting_user = false;
        localStorage.onboarding = true;
      });
  },
};
</script>

<style lang="scss" scoped>
.onboarding ::v-deep .onboarding__title {
  justify-content: center;
  align-items: center;
  max-width: 15rem;
  margin-top: auto;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
</style>
