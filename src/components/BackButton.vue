<template>
  <a @click="comeback" class="btn-prev">
    <IconChevronLeft /> Volver
  </a>
</template>

<script>
import IconChevronLeft from '../../public/img/app-icons/chevron-left.svg?inline';

export default {
  name: 'BackButton',
  components: {
    IconChevronLeft,
  },
  methods: {
    comeback() {
      if (this.$route.name === 'place-evaluation') {
        this.$emit('comeback');
      } else {
        this.$router.go(-1);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: var(--color-text);
}
svg {
  width: .4rem;
  height: .75rem;
  margin-right: .25rem;
  fill: var(--color-text);
}
</style>
