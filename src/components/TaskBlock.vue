<template>
  <router-link class="task task-block" tag="article" v-bind:to="'/tareas/' + task.id">
    <p class="task-block__title">{{ outputTitle }}</p>
    <text-to-speech :text-audio="`${outputTitle}.\n\n ${outputAids}`" />
    <div class="task-block__aids">
      <span>Apoyo:</span>
      <ul class="task-block__aids-list">
        <template v-for="aid in task.aids">
          <li v-if="aid.enabled" v-bind:key="aid.type">
            {{ aid.name }}
          </li>
        </template>
      </ul>
    </div>
  </router-link>
</template>

<script>
import TextToSpeech from './TextToSpeech.vue';

export default {
  props: ['task', 'title'],
  components: {
    TextToSpeech,
  },
  data() {
    return {
    };
  },
  computed: {
    outputTitle() {
      return this.title ? this.title : this.task.title;
    },
    outputAids() {
      const aids = [];
      const keys = Object.keys(this.task.aids);
      // eslint-disable-next-line no-restricted-syntax
      for (const key of keys) {
        if (this.task.aids[key].enabled) {
          aids.push(this.task.aids[key].name);
        }
      }
      return aids.length > 0 ? ` Apoyos: ${aids.join(', ')}` : '';
    },
  },
};
</script>

<style lang="scss">
  @import '@/assets/scss/rfs.scss';

  .task-block {
    display: grid;
    grid-template-columns: 1fr auto;
    margin: var(--spacer) 0;
    border: 2px solid var(--color-brand-lighter);
    border-radius: var( --border-radius );
    box-shadow: 0px 1px 5px rgba(148, 148, 148, 0.25);
    transition: var(--transition-base);
    &:hover {
      cursor: pointer;
      border-color: var(--color-brand-light);
      box-shadow: 0px 1px 5px rgba(148, 148, 148, 0.5);
    }
  }
  .task-block__title {
    @include rfs($font-size-16);
    line-height: 1.375;
    color: var( --color-brand-darkest );
    font-weight: bold;
    padding: calc( var(--spacer) / 2 ) calc( var(--spacer) * .75 );
    grid-column: 1/2;
  }
  .task-block .tts {
    grid-column: 2/3;
    padding: calc( var(--spacer) / 2 ) calc( var(--spacer) * .75 );
  }
  .task-block__aids {
    @include rfs($font-size-13);
    display: flex;
    align-items: center;
    grid-column: 1/3;
    border-top: 1px solid #a1c9ff;
    padding: calc( var(--spacer) / 2 ) calc( var(--spacer) * .75 );
    flex-flow: row nowrap;
    color: var(--color-neutral);
    font-weight: 600;
    line-height: calc( 16 / 12 );
  }
  .task-block__aids-list {
    display: flex;
    flex-flow: row nowrap;
    li {
      list-style: none;
      margin-left: calc( var(--spacer) / 2 );
    }
  }
</style>
