<template>
  <router-link class="task task-block" tag="article" v-bind:to="'/tareas/' + task.id">
    <p class="task-block__title">{{ title ? title : task.title }}</p>
    <text-to-speech/>
    <div class="task-block__aids">
      <span>Apoyo:</span>
      <ul class="task-block__aids-list">
        <template v-for="aid in task.aids">
          <li v-if="aid.enabled" v-bind:key="aid.type">
            {{ aid.type }}
          </li>
        </template>
      </ul>
    </div>
  </router-link>
</template>

<script lang="js">
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
};
</script>

<style lang="scss">
  @import "rfs/scss";
  .task-block {
    border-radius: var( --border-radius );
    border: 2px solid #A1C9FF;
    box-shadow: 0 1px 5px rgba( 148, 148, 148, 0.25 );
    margin: var( --spacer ) 0;
    display: grid;
    grid-template-columns: 1fr auto;
    transition: all .35s linear;
    &:hover {
      cursor: pointer;
      background: var( --color-brand-lightest );
      box-shadow: 0 1px 5px rgba( 148, 148, 148, 0.5 );
    }
  }
  .task-block__title {
    @include rfs( 16px );
    line-height: 1.375;
    color: var( --color-brand-darkest );
    font-weight: bold;
    padding: calc( var( --spacer ) / 2 ) calc( var( --spacer ) * .75 );
    grid-column: 1/2;
  }
  .task-block .tts {
    grid-column: 2/3;
    padding: calc( var( --spacer ) / 2 ) calc( var( --spacer ) * .75 );
  }
  .task-block__aids {
    display: flex;
    align-items: center;
    grid-column: 1/3;
    border-top: 1px solid #a1c9ff;
    padding: calc( var( --spacer ) / 2 ) calc( var( --spacer ) * .75 );
    flex-flow: row nowrap;
    color: var( --color-neutral );
    font-weight: 600;
    @include rfs( 12px );
    line-height: calc( 16 / 12 );
  }
  .task-block__aids-list {
    display: flex;
    flex-flow: row nowrap;
    li {
      list-style: none;
      margin-left: calc( var( --spacer ) / 2 );
    }
  }
</style>
