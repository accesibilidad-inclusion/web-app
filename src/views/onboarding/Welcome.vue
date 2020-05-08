<template>
  <div class="onboarding">
    <div class="container">
      <img src="@/assets/photos/onboarding-welcome.jpg" class="onboarding__welcome-image">
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
@import '@/assets/scss/global.scss';

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
  background-color: var(--color-neutral-lightest);
  z-index: 100000;

  .container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    padding: var(--spacer);
    background-color: #fff;
    overflow-x: hidden;
    overflow-y: auto;

    @media screen and ( min-width: 768px ) {
      max-width: 640px;
      margin-left: auto;
      margin-right: auto;
      padding: var(--spacer-lg);
    }
    @media screen and ( min-width: 1288px ) {
      max-width: 750px;
      padding: var(--spacer-xl);
    }
  }
}

.onboarding__welcome-image {
  margin: calc( var(--spacer) * -1 );
  margin-bottom: var(--spacer);
  width: calc(100% + var(--spacer) * 2);
  height: auto;
  max-height: 45vh;
  object-fit: cover;
  @media screen and ( min-width: 768px ) {
    width: calc(100% + var(--spacer-lg) * 2);
    margin: calc( var(--spacer-lg) * -1 );
    margin-bottom: var(--spacer-lg);
  }
  @media screen and ( min-width: 1288px ) {
    width: calc(100% + var(--spacer-xl) * 2);
    margin: calc( var(--spacer-xl) * -1 );
    margin-bottom: var(--spacer-xl);
  }
}

.onboarding__navbar {
  @include rfs( $font-size-15 );
  width: 100%;
  padding: var(--spacer-sm) var(--spacer);
  position: sticky;
  top: 0;
  background-color: #fff;
  @media screen and ( min-width: 768px ) {
    max-width: 640px;
    margin-left: auto;
    margin-right: auto;
    padding: var(--spacer) var(--spacer-lg);
  }
  @media screen and ( min-width: 1288px ) {
    max-width: 750px;
    padding: var(--spacer) var(--spacer-xl);
  }

  a {
    text-decoration: none;
    color: var(--color-text);
  }

  svg {
    width: .4rem;
    height: .75rem;
    margin-right: .25rem;
    fill: var(--color-text);
  }
}

.onboarding__title {
  @include rfs( $font-size-18 );
  margin-bottom: var(--spacer);
  line-height: var(--subtitle-line-height);
}

.onboarding p {
  @include rfs( $font-size-15 );
  margin-bottom: var(--spacer);
  line-height: calc(25/15);
}

.onboarding__footer {
  width: 100%;
  margin-top: auto;
}

</style>
