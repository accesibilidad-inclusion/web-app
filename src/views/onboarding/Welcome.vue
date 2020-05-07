<template>
  <div class="onboarding">
    <!-- <img src="../public/img/photos/onboarding-welcome.jpg" class="onboarding-image"> -->
    <img src="@/assets/photos/onboarding-welcome.jpg" class="onboarding-image">
    <div class="container">
      <h2 class="onboarding__title">¿De qué se trata?</h2>
      <!-- eslint-disable-next-line max-len -->
      <p>Pictos es un <strong>sistema de navegación espacial y evaluación</strong> de <a href="#">accesibilidad cognitiva(?)</a> que apunta a mejorar los servicios de tu ciudad para que <strong>sean accesibles por todos.</strong></p>
      <footer class="onboarding__footer">
        <OnboardingNext :linkTo="'permissions'" />
      </footer>
    </div>
  </div>
</template>

<script>
import OnboardingNext from '@/components/OnboardingNext.vue';

export default {
  name: 'Welcome',
  components: {
    OnboardingNext,
  },
};
</script>

<style lang="scss">
@import 'rfs/scss';
.onboarding {
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 100000;

  p {
    @include rfs(15px);
    // font-size: clamp(1rem, 1.15vw, 1.15rem);
    line-height: calc(25/15);
  }
  .container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
    padding: var(--spacer);

    @media screen and ( min-width: 768px ) {
      max-width: 740px;
      margin-left: auto;
      margin-right: auto;
      padding: var(--spacer-lg);
    }
    @media screen and ( min-width: 1288px ) {
      max-width: 850px;
      padding: var(--spacer-xl);
    }
  }
}

.onboarding-image {
  margin: calc( var(--spacer) * -1 );
  margin-bottom: var(--spacer);
  width: calc(100% + var(--spacer) * 2);
  height: auto;
  max-height: 45vh;
  object-fit: cover;
}

.onboarding__navbar {
  @include rfs(14px);
  margin-bottom: var(--spacer);
  padding: var(--spacer-sm) var(--spacer);
  position: sticky;
  top: 0;
  a {
    text-decoration: none;
    color: var(--color-text);
  }
  svg {
    fill: var(--color-text);
  }
}

.onboarding__footer {
  width: 100%;
  margin-top: auto;
}

.onboarding__title {
  @include rfs( var(--subtitle-font-size) );
  margin-bottom: var(--spacer);
  // font-size: clamp(1.5rem, 1.75vw, 1.75rem);
  line-height: var(--subtitle-line-height);
}

</style>
