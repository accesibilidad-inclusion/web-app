<!-- eslint-disable max-len -->
<template>
  <div class="page">
    <div class="container">
      <h1 class="page__title">
        ¿Qué es PICTOS?
        <text-to-speech :text-audio="
          '¿Qué es PICTOS?\n\n\n\n\n\n'
          + 'PICTOS es una aplicación para hacer el mundo inclusivo y accesible.\n\n\n\n\n'
          + 'PICTOS es una aplicación de uso gratuito.\n\n\n\n\n'
          + 'Todos pueden aportar en PICTOS.\n\n\n\n\n'
          + 'identical to box height\n\n\n\n\n'
          + 'Tú participación es importante, ayuda a construir PICTOS.\n\n\n\n\n'
          + 'Para hacer esta app, trabajó mucha gente. Investigadores, diseñadores y desarrolladores con y sin discapacidad.\n\n\n\n\n'
          + 'Este es un proyecto del Núcleo de Accesibilidad e Inclusión de la Pontificia Universidad Católica de Valparaíso.\n\n\n\n\n'
          + 'Este proyecto fue financiado por SENADIS.\n\n\n\n\n'
        " />
      </h1>
      <p>PICTOS es una aplicación para hacer el mundo inclusivo y accesible.</p>
      <p>PICTOS es una aplicación de uso gratuito.</p>
      <p>Todos pueden aportar en PICTOS.</p>
      <p>identical to box height</p>
      <p>Tú participación es importante, ayuda a construir PICTOS.</p>
      <p>Para hacer esta app, trabajó mucha gente. Investigadores, diseñadores y desarrolladores con y sin discapacidad.</p>
      <p>Este es un proyecto del Núcleo de Accesibilidad e Inclusión de la Pontificia Universidad Católica de Valparaíso.</p>
      <p>Este proyecto fue financiado por SENADIS.</p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'about',
};
</script>

<style lang="scss">
@import '@/assets/scss/rfs.scss';
.page .container {
  padding: var(--spacer);
  @media screen and ( min-width: 640px ) {
    padding: var(--spacer-lg);
  }
  @media screen and ( min-width: 1288px ) {
    padding: var(--spacer-xl);
  }
}
.page__title {
  @include rfs($font-size-21);
  margin-bottom: var(--spacer);
  @media screen and ( min-width: 640px ) {
    margin-bottom: var(--spacer-lg);
  }
}
.page p {
  @include rfs($font-size-16);
  margin-bottom: var(--spacer);
  line-height: 1.5;
}
</style>
