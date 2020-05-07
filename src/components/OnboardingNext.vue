<template>
  <router-link :to="linkTo" :class="classes()">Siguiente</router-link>
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
      return ['btn btn--large btn--block', (this.isDisabled ? 'btn--ghost' : 'btn--primary')].join(' ');
    },
  },
};
</script>
