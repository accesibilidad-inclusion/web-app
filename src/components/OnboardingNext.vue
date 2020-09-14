<!-- eslint-disable max-len -->
<template>
  <router-link :tag="'button'" :to="linkTo" :class="classes()" :disabled="this.isDisabled">Siguiente</router-link>
</template>

<script>
export default {
  name: 'OnboardingNext',
  props: {
    linkTo: null,
    isDisabled: Boolean,
  },
  data() {
    return {
      isActive: true,
    };
  },
  methods: {
    classes() {
      return ['btn btn--large btn--block', (this.isDisabled ? 'btn--ghost-neutral' : 'btn--primary')].join(' ');
    },
  },
};
</script>
