<template>
  <div class="place">
    <header class="place__header">
      <span class="place__service">Metro de Valparaíso</span>
      <h1 class="place__name">Estación Viña del Mar</h1>
      <a href="#" class="place__map-link">Abrir en mapa</a>
      <text-to-speech/>
    </header>
    <main class="place__tasks">
      <p>Selecciona lo que necesites hacer en este lugar</p>
      <task-block v-for="task in tasks"
        v-bind:key="task.id" v-bind:task="task"/>
    </main>
    <aside class="actions actions--place">
      <p class="actions__title">¿No encuentras lo que estabas buscando?</p>
      <p class="actions__description">Agrega otra cosa que puedas hacer en este lugar
        <text-to-speech/></p>
      <router-link to="/tareas/nueva" class="btn btn--primary btn--large btn--block" tag="button">
        &plus; Agregar una tarea nueva
      </router-link>
    </aside>
    <footer class="place__footer place__evaluation">
      <div class="place__evaluation-label">Excelente</div>
      <div class="place__evaluation-grade" v-bind:data-grade="5">5</div>
      <p class="place__evaluation-description">Nivel de accesibilidad de la Estación
        Viña del Mar</p>
      <p class="place__evaluation-title">¿Quieres colaborar con nosotros?</p>
      <router-link tag="button" to="/lugar/1/evaluar" class="btn btn--ghost btn--large btn--block">
        Evaluar este lugar
      </router-link>
    </footer>
  </div>
</template>

<script>
import TaskBlock from '@/components/TaskBlock.vue';
import TextToSpeech from '@/components/TextToSpeech.vue';

export default {
  name: 'placeSingle',
  components: {
    TaskBlock,
    TextToSpeech,
  },
  data() {
    return {
      tasks: [
        // objetos de tipo "tarea"
        {
          id: 1,
          title: 'Viajar de un punto a otro',
          place: 'Estación Metro Miramar',
          service: 'Metro de Valparaíso',
          aids: [
            {
              type: 'graphic',
              enabled: true,
            },
            {
              type: 'written',
              enabled: true,
            },
            {
              type: 'aural',
              enabled: true,
            },
          ],
        },
        {
          id: 2,
          title: 'Ir de un punto a otro',
          place: 'Terminal de buses de Viña del Mar',
          service: 'Terminal de buses Rodoviario',
          aids: [
            {
              type: 'graphic',
              enabled: false,
            },
            {
              type: 'written',
              enabled: false,
            },
            {
              type: 'aural',
              enabled: true,
            },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="scss">
  @import 'rfs/scss';
  .place__header {
    background: var( --color-brand-darkest );
    padding: var( --spacer );
    color: var( --color-background );
    line-height: calc( 22 / 16 );
    text-align: center;
    position: relative;
  }
  .place__service {
    @include rfs( 12px );
    display: block;
  }
  .place__name {
    @include rfs( 18px );
    font-weight: bold;
    line-height: calc( 25 / 18 );
    margin: calc( var( --spacer ) * .25 ) 0 calc( var( --spacer ) * .75 );
  }
  .place__map-link {
    color: var( --color-background );
    @include rfs( 12px );
    font-weight: bold;
  }
  .place__header .tts {
    position: absolute;
    top: var( --spacer );
    right: var( --spacer );
  }
  .place__tasks {
    padding: var( --spacer );
    padding-bottom: calc( var( --spacer ) * 2 );
  }
  .actions--place {
    background-color: var( --color-brand-lighter );
  }
  .place__evaluation {
    background: var( --color-brand-darkest );
    color: var( --color-background );
    padding: var( --spacer );
    margin-top: calc( var( --spacer ) * 1.5 );
    text-align: center;
  }
  .place__evaluation-label {
    @include rfs( 18px );
    text-transform: uppercase;
    line-height: calc( 25/18 );
    font-weight: bold;
  }
  .place__evaluation-grade {
    .place__footer & {
      color: var( --color-text );
      @include rfs( 36px );
      line-height: 3.125rem;
      height: 3.125rem;
      width: 3.125rem;
      margin: calc( var( --spacer ) / 2 ) auto;
    }
  }
  .place__evaluation-description {
    @include rfs( 14px );
    max-width: 15rem;
    font-weight: 600;
    line-height: calc( 19/14 );
    margin: calc( var( --spacer ) / 2 ) auto calc( var( --spacer ) * 1.5 );
  }
  .place__evaluation-title {
    font-weight: bold;
    margin: calc( var( --spacer ) * 1.5 ) auto calc( var( --spacer ) * .75 );
    line-height: 1.33333;
  }
  .btn--large {
    display: block;
  }
</style>
