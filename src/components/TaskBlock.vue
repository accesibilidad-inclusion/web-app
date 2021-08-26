<template>
  <div class="task task-block" tag="article" @click="selectTask(task)">
    <p class="task-block__title">{{ task.title }}</p>
    <p class="task-block__service" v-if="task.service && task.venue">
      {{ task.venue.name }}, {{ task.service.name }}
    </p>
    <text-to-speech :text-audio="`${task.title}.\n\n`" />
    <div class="task-block__aids" v-if="task.aids">
      <span>Apoyo:</span>
      <ul class="task-block__aids-list">
        <template v-for="aid in task.aids">
          <li v-if="aid.enabled" v-bind:key="aid.type">
            {{ aid.name }}
          </li>
        </template>
      </ul>
    </div>
  </div>
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
  methods: {
    selectTask(task) {
      if (this.$route.params.categorySlug) {
        this.$router.push(`/${this.$route.params.categorySlug}/${this.$route.params.serviceSlug}/${this.$route.params.venueSlug}/${task.slug}`);
      } else {
        this.$router.push(`/${this.task.category.slug}/${this.task.service.slug}/${this.task.venue.slug}/${task.slug}`);
      }
    },
  },
};
</script>

<style lang="scss">
  @import '@/assets/scss/rfs.scss';

  .task-block {
    position: relative;
    margin: var(--spacer) 0;
    padding: calc(var(--spacer) * .65) var(--spacer-xl)
      calc(var(--spacer) * .65) calc(var(--spacer) * .75);
    border: 2px solid var(--color-brand-lighter);
    border-radius: var( --border-radius );
    box-shadow: 0px 1px 5px rgba(148, 148, 148, 0.25);
    transition: var(--transition-base);
    @media screen and ( min-width: 640px ) {
      padding: var(--spacer);
    }
    @media screen and ( min-width: 1280px ) {
      padding: var(--spacer-lg);
    }
    &:hover {
      cursor: pointer;
      border-color: var(--color-brand-light);
      box-shadow: 0px 1px 5px rgba(148, 148, 148, 0.5);
    }
  }
  .task-block__title {
    @include rfs($font-size-16);
    font-weight: bold;
    line-height: 1.375;
    color: var(--color-brand-darkest);
    & + .task-block__service {
      margin-top: var(--spacer-sm);
    }
  }
  .task-block__service {
    @include rfs($font-size-14);
    color: var(--color-neutral);
  }
  .task-block .tts {
    position: absolute;
    top: 50%;
    right: var(--spacer);
    margin-top: -.5rem;
    @media screen and ( min-width: 640px ) {
      right: var(--spacer);
    }
    @media screen and ( min-width: 1280px ) {
      right: var(--spacer-lg);
    }
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
