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
.onboarding__permissions-image {
  display: block;
  margin: 0 auto var(--spacer-lg);
}
.text-center {
  max-width: 70vw;
  margin-left: auto;
  margin-right: auto;
}
</style>
