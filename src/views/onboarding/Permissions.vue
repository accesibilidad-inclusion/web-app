<template>
  <div class="onboarding">
    <header class="onboarding__navbar">
      <a href="javascript:history.go(-1)" class="btn-prev">
        <IconChevronLeft /> Volver
      </a>
    </header>
    <div class="container">
      <IconPermissions class="onboarding__permissions-image" />
      <!-- eslint-disable-next-line max-len -->
      <p class="text-center">Necesitamos que nos permitas acceder a la cámara y ubicación de tu dispositivo.</p>
      <footer class="onboarding__footer">
        <OnboardingNext :linkTo="'permissions'" />
      </footer>
    </div>
  </div>
</template>

<script>
import OnboardingNext from '@/components/OnboardingNext.vue';

import IconPermissions from '../../../public/img/app-icons/permissions.svg';

import IconChevronLeft from '../../../public/img/app-icons/chevron-left.svg';

export default {
  name: 'Welcome',
  components: {
    OnboardingNext,
    IconChevronLeft,
    IconPermissions,
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/global.scss';

.onboarding__permissions-image {
  display: block;
  width: 40vw;
  height: auto;
  min-width: 200px;
  max-width: 300px;
  margin: auto auto var(--spacer-lg);
}

.text-center {
  width: 70vw;
  max-width: 350px;
  margin-left: auto;
  margin-right: auto;
}
</style>
