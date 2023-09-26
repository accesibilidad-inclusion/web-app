<template>
  <div class="home">
    <Location />
    <Categories />
    <MainSearch />
    <RecommendedTasks />
  </div>
</template>

<script>
import Location from '@/components/Location.vue';
import MainSearch from '@/components/MainSearch.vue';
import RecommendedTasks from '@/components/RecommendedTasks.vue';
import Categories from '@/components/Categories.vue';

export default {
  name: 'Home',
  components: {
    Location,
    MainSearch,
    RecommendedTasks,
    Categories
},
  data() {
    return {
    };
  },
  methods: {
    setCategory(category) {
      this.$router.push(`/${category.slug}`);
    },
  },
};
</script>

<style lang="scss">
  @import '@/assets/scss/rfs.scss';
  .home {
    padding-left: var(--spacer);
    padding-right: var(--spacer);
    @media screen and ( min-width: 640px ) {
      padding-left: var(--spacer-lg);
      padding-right: var(--spacer-lg);
    }
    @media screen and ( min-width: 1280px ) {
      padding-left: var(--spacer-xl);
      padding-right: var(--spacer-xl);
    }
  }
</style>
