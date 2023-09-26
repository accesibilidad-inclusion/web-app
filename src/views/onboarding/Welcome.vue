<template>
    <div class="onboarding">
        <div class="container">
            <page-image alt="Persona activando el audio en la aplicación" class="onboarding__welcome-image"></page-image>
            <h2 class="onboarding__title">
                Puedes activar el audio
                <text-to-speech :text-audio="
            'Puedes activar el audio.\n\n\n'
            + 'Si tienes dificultad o no quieres leer, no te preocupes. Puedes activar la opción de sonido, pulsando el ícono de altavoz.'
            " />
            </h2>
            <p>Si tienes dificultad o no quieres leer, no te preocupes.</p>
            <p>Puedes <strong>activar</strong> la opción de sonido, <strong>pulsando el ícono de altavoz.</strong></p>
            <footer class="onboarding__footer">
                <OnboardingNext :linkTo="'/onboarding/about'" />
            </footer>
        </div>
    </div>
</template>

<script>
import OnboardingNext from '@/components/OnboardingNext.vue';
import TextToSpeech from '@/components/TextToSpeech.vue';
import PageImage from '../../../public/img/illustrations/onboarding-activar-audio.svg?inline';

export default {
  name: 'Welcome',
  components: {
    OnboardingNext,
    TextToSpeech,
    PageImage,
  },
  mounted() {
    localStorage.removeItem('app_user');
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/rfs.scss';

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
    background-color: var(--color-brand-lightest);
    z-index: 100000;

    .container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 100%;
        height: 100%;
        padding: var(--spacer-lg) var(--spacer) var(--spacer);
        background-color: #fff;
        overflow-x: hidden;
        overflow-y: auto;

        @media screen and (min-width: 640px) {
            max-width: 640px;
            margin-left: auto;
            margin-right: auto;
            padding: var(--spacer-lg);
        }

        @media screen and (min-width: 1288px) {
            max-width: 750px;
            padding: var(--spacer-xl);
        }
    }
}

.onboarding__welcome-image {
    width: calc(100% + var(--spacer) * 2);
    height: auto;
    max-height: 45vh;
    margin: calc(var(--spacer-lg) * -1) calc(var(--spacer) * -1) var(--spacer);
    object-fit: cover;
    background-color: var(--color-illustration-bg);

    @media screen and (min-width: 640px) {
        width: calc(100% + var(--spacer-lg) * 2);
        margin: calc(var(--spacer-lg) * -1) calc(var(--spacer-lg) * -1) var(--spacer-lg);
    }

    @media screen and (min-width: 1288px) {
        width: calc(100% + var(--spacer-xl) * 2);
        margin: calc(var(--spacer-xl) * -1) calc(var(--spacer-xl) * -1) var(--spacer-xl);
    }
}

[class^="main-path"] {
    position: relative;
    transform-origin: center;
    transform-box: fill-box;
    animation: quickScaleUp .75s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards;

    &.main-path-2 {
        animation-duration: 1s;
    }

    &.main-path-3 {
        animation-duration: 1.25s;
    }
}

.onboarding__navbar {
    @include rfs($font-size-15);
    width: 100%;
    padding: var(--spacer-sm) var(--spacer);
    position: sticky;
    top: 0;
    background-color: #fff;

    @media screen and (min-width: 640px) {
        max-width: 640px;
        margin-left: auto;
        margin-right: auto;
        padding: var(--spacer) var(--spacer-lg);
    }

    @media screen and (min-width: 1288px) {
        max-width: 750px;
        padding: var(--spacer) var(--spacer-xl);
    }
}

.onboarding__title {
    @include rfs($font-size-18);
    display: flex;
    align-items: flex-start;
    margin-bottom: 1.5rem;
    line-height: var(--subtitle-line-height);
    color: var(--color-brand-darkest);

    .onboarding--dark & {
        color: var(--color-highlight);
    }

    .tts {
        margin-top: .45rem;
        margin-left: auto;
    }

    @media screen and (min-width: 640px) {
        margin-bottom: var(--spacer-lg);

        .tts {
            margin-top: .75rem;
        }
    }
}

.onboarding p {
    @include rfs($font-size-15);
    margin-bottom: var(--spacer);
    line-height: calc(25/15);
}

.onboarding__footer {
    width: 100%;
    margin-top: auto;
}

.onboarding--dark .container,
.onboarding--dark .onboarding__navbar {
    color: var(--color-highlight);
    background-color: var(--color-brand-darkest);
}
</style>
