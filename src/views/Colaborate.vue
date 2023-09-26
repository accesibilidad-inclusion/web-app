<template>
  <div class="colaborate">
    <div class="container">
      <page-image alt="Persona indicando una señalética de servicio a otra persona" class="onboarding__welcome-image"></page-image>
      <h1 class="colaborate__title">
        ¡Qué bueno que quieras colaborar!
        <text-to-speech :text-audio="
          '¡Qué bueno que quieras colaborar!\n\n\n\n\n\n'
          + 'Tu ayuda es muy importante para hacer entre todos una ciudad más fácil y amigable.\n\n\n\n\n'
          + 'Las ayudas que puedes darnos son:\n\n\n\n\n'
          + '1\n\n Si falta un lugar, lo puedes agregar.\n\n\n\n\n'
          + '2\n\n Si falta una tarea de un lugar, la puedes agregar.\n\n\n\n\n'
          + '3\n\n Si no hay pictogramas, los puedes crear.\n\n\n\n\n'
        " />
      </h1>
      <p>Tu ayuda es muy importante para hacer entre todos una ciudad más fácil y amigable.</p>
      <p>Las ayudas que puedes darnos son:</p>
      <ol class="colaborate__list">
        <li class="colaborate__list-item">Si falta un lugar, lo puedes agregar.</li>
        <li class="colaborate__list-item">Si falta una tarea de un lugar, la puedes agregar.</li>
        <li class="colaborate__list-item">Si no hay pictogramas, los puedes crear.</li>
      </ol>
      <colaborate-image alt="Persona con un icono de lugar y un listado de tareas" class="colaborate__image"></colaborate-image>
    </div>
  </div>
</template>

<script lang="ts">
import TextToSpeech from '@/components/TextToSpeech.vue';
import PageImage from '../../public/img/illustrations/colabora-con-nosotros-servicios.svg?inline';
import ColaborateImage from '../../public/img/illustrations/colabora-con-nosotros-tareas.svg?inline';

export default {
  name: 'Colaborate',
  components: {
    TextToSpeech,
    PageImage,
    ColaborateImage,
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/rfs.scss';
.colaborate .container {
  padding: var(--spacer);
  @media screen and ( min-width: 640px ) {
    padding: var(--spacer-lg);
  }
  @media screen and ( min-width: 1288px ) {
    padding: var(--spacer-xl);
  }
}
.colaborate__title {
  @include rfs($font-size-21);
  color: var(--color-brand-darkest);
  margin-bottom: var(--spacer);
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: var(--spacer);
  @media screen and ( min-width: 640px ) {
    margin-bottom: var(--spacer-lg);
  }
}
.colaborate p {
  @include rfs($font-size-16);
  margin-bottom: var(--spacer);
  line-height: 1.5;
}
.colaborate__list {
  @include rfs($font-size-16);
  margin-bottom: var(--spacer);
  line-height: 1.5;
  list-style: none;
  counter-reset: list-item;
}
.colaborate__list-item {
    counter-increment: list-item;
    margin-bottom: var(--spacer-sm);
    padding-left: var(--spacer);
    position: relative;
    @media screen and ( min-width: 640px ) {
      padding-left: calc(var(--spacer) + var(--spacer-xs));
    }
    @media screen and ( min-width: 1288px ) {
      padding-left: calc(var(--spacer) + var(--spacer-xs));
    }
    &:before {
      content: counter(list-item) ". ";
      color: var(--color-brand-darkest);
      font-weight: bold;
      position: absolute;
      left: 0;
    }
  }
.colaborate__image {
  width: calc(100% + var(--spacer-lg) * 2);
  margin: var(--spacer) calc( var(--spacer-lg) * -1) calc( var(--spacer-lg) * -1);
  height: auto;
  max-height: 45vh;
  -o-object-fit: cover;
  object-fit: cover;
  background-color: var(--color-illustration-bg);
  @media screen and ( min-width: 640px ) {
    width: calc(100% + var(--spacer-lg) * 2);
    margin: var(--spacer-lg) calc( var(--spacer-lg) * -1 ) calc( var(--spacer-lg) * -1);
  }
  @media screen and ( min-width: 1288px ) {
    width: calc(100% + var(--spacer-xl) * 2);
    margin: var(--spacer-xl) calc( var(--spacer-xl) * -1 ) calc( var(--spacer-lg) * -1.5);
  }
  [class^="main-path"] {
    position: relative;
    transform-origin: center;
    transform-box: fill-box;
    animation: quickScaleUp 2.75s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards;
    &.main-path-2 {
      animation-duration: 3s;
    }
    &.main-path-3 {
      animation-duration: 3.25s;
    }
  }
}
</style>
