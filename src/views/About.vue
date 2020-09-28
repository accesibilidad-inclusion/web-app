<!-- eslint-disable max-len -->
<template>
  <div class="page">
    <div class="container">
      <LogoPictos class="page__logo" />
      <h1 class="page__title">
        ¿Qué es PICTOS?
        <text-to-speech :text-audio="
          '¿Qué es PICTOS?\n\n\n\n\n\n'
          + 'PICTOS es una aplicación para hacer el mundo inclusivo y accesible.\n\n\n\n\n'
          + 'PICTOS es una aplicación de uso gratuito.\n\n\n\n\n'
          + 'Todos pueden aportar en PICTOS.\n\n\n\n\n'
          + 'Tú participación es importante, ayuda a construir PICTOS.\n\n\n\n\n'
          + 'Para hacer esta app, trabajó mucha gente. Investigadores, diseñadores y desarrolladores con y sin discapacidad.\n\n\n\n\n'
          + 'Este es un proyecto del Núcleo de Accesibilidad e Inclusión de la Pontificia Universidad Católica de Valparaíso.\n\n\n\n\n'
          + 'Este proyecto fue financiado por SENADIS.\n\n\n\n\n'
        " />
      </h1>
      <p>PICTOS es una aplicación para hacer el mundo inclusivo y accesible.</p>
      <p>PICTOS es una aplicación de uso gratuito.</p>
      <p>Todos pueden aportar en PICTOS.</p>
      <p>Tú participación es importante, ayuda a construir PICTOS.</p>
      <p>Para hacer esta app, trabajó mucha gente. Investigadores, diseñadores y desarrolladores con y sin discapacidad.</p>
      <p>Este es un proyecto del Núcleo de Accesibilidad e Inclusión de la Pontificia Universidad Católica de Valparaíso.</p>
      <p>Este proyecto fue financiado por SENADIS.</p>
      <div class="page__sponsors">
        <LogoAccesibilidad class="page__sponsor-logo" />
        <LogoPucv class="page__sponsor-logo--pucv" />
        <LogoSenadis class="page__sponsor-logo" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import TextToSpeech from '@/components/TextToSpeech.vue';
import LogoPictos from '../../public/img/app-icons/logo-pictos-color.svg?inline';
import LogoAccesibilidad from '../../public/img/app-icons/logo-accesibilidad-inclusion.svg?inline';
import LogoPucv from '../../public/img/app-icons/logo-pucv.svg?inline';
import LogoSenadis from '../../public/img/app-icons/logo-senadis.svg?inline';

export default {
  name: 'about',
  components: {
    TextToSpeech,
    LogoPictos,
    LogoAccesibilidad,
    LogoPucv,
    LogoSenadis,
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/rfs.scss';

.page__logo {
  width: 40vw;
  height: auto;
  min-width: 170px;
  max-width: 250px;
  display: block;
  margin-top: var(--spacer);
  margin-bottom: calc(var(--spacer-lg) + var(--spacer-sm));
  margin-right: auto;
  margin-left: auto;
}
.page p {
  margin-bottom: var(--spacer);
  line-height: 1.5;
}
.page__sponsors {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: var(--spacer) 0;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
  padding-top: var(--spacer-sm);
}
.page__sponsor-logo {
  display: block;
  width: 19vw;
  min-width: 60px;
  max-width: 75px;
  height: auto;
  margin-top: var(--spacer-sm);
  margin-right: auto;
  margin-left: auto;
}
.page__sponsor-logo--pucv {
  display: block;
  width: 48vw;
  min-width: 150px;
  max-width: 190px;
  height: auto;
  margin-right: auto;
  margin-left: auto;
}
</style>
