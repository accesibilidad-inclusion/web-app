<template>
  <a href="javascript:history.go(-1)" class="btn-prev">
    <IconChevronLeft /> Volver
  </a>
</template>

<script>
import IconChevronLeft from '../../public/img/app-icons/chevron-left.svg';

export default {
  name: 'BackButton',
  components: {
    IconChevronLeft,
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
