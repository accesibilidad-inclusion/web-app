<template>
<div class="onboarding">
    <div class="container">
        <IconPermissions class="onboarding__permissions-image" />
        <p class="text-center">Necesitamos que nos permitas acceder a la ubicación de tu teléfono para ofrecerte apoyos que estén cerca tuyo</p>
        <footer class="onboarding__footer">
            <OnboardingNext :linkTo="'/onboarding/registration'" />
        </footer>
    </div>
</div>
</template>

<script lang="ts">
import OnboardingNext from '@/components/OnboardingNext.vue';
import IconPermissions from '../../../public/img/app-icons/location-permissions.svg?inline';

export default {
  name: 'Welcome',
  components: {
    OnboardingNext,
    IconPermissions,
  },
};
</script>

<style lang="scss" scoped>
.onboarding__permissions-image {
    display: block;
    width: 40vw;
    height: auto;
    min-width: 110px;
    max-width: 200px;
    margin: auto auto var(--spacer-lg);
}

.text-center {
    width: 70vw;
    max-width: 350px;
    margin-left: auto;
    margin-right: auto;
}
</style>
