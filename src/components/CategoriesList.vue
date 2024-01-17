<script setup lang="ts">
import {useRouter} from 'vue-router'
import {Category} from '@/model/category'
import {useAppDataStore} from '@/stores/app-data'
import TextToSpeech from '@/components/TextToSpeech.vue'
import CategoryIcon from './CategoryIcon.vue'

const appData = useAppDataStore()
const router = useRouter()

const setCategory = (category: Category) => {
  router.push(`/${category.slug}`)
}
</script>

<template>
  <section class="main-categories container">
    <div class="main-categories__header">
      <h2 class="main-categories__title">{{ $t('categoriesList.header.title') }}</h2>
      <p class="main-categories__description">{{ $t('categoriesList.header.description') }}</p>
      <TextToSpeech
        :text-audio="
          $t('categoriesList.header.title') + '. ' + $t('categoriesList.header.description')
        " />
    </div>
    <ul class="main-categories__list">
      <li class="category" v-for="category in appData.categories" :key="category.id">
        <a @click="setCategory(category)">
          <TextToSpeech
            :text-audio="
              category.name + '. ' + $t('categoriesList.list.descriptions.' + category.slug)
            " />
          <CategoryIcon class="category__icon" v-bind:category="category.slug"></CategoryIcon>
          <h3 class="category__name">
            {{ category.name }}
          </h3>
          <div class="category__description">
            {{ $t('categoriesList.list.descriptions.' + category.slug) }}
          </div>
        </a>
      </li>
    </ul>
  </section>
</template>
<style lang="scss" scoped>
@import '@/assets/scss/rfs.scss';

.main-categories {
  padding: var(--spacer--700) var(--spacer--400) var(--spacer--500);
  position: relative;
  .tts {
    position: absolute;
    top: var(--spacer--500);
    right: var(--spacer--400);
    @media screen and (min-width: 640px) {
      right: var(--spacer--500);
    }
  }
}
.main-categories__title {
  @include rfs($font-size-38);
  color: var(--color--blue-dark);
  font-weight: 800;
  line-height: 105.263%;
}
.main-categories__list {
  margin: 0;
  padding: 0;
  > li {
    list-style: none;
    margin: var(--spacer--300) 0;
    a {
      border: 1px solid var(--color--blue-dark);
      padding: var(--spacer--500) var(--spacer--400);
      background: var(--color--white);
      border-radius: var(--spacer--500);
      color: var(--color--blue-dark);
      display: grid;
      grid-template-areas: 'icon name' 'icon description';
      grid-template-columns: 55px auto;
      grid-template-rows: auto 1fr;
      gap: var(--spacer--200) var(--spacer--300);
      position: relative;
      &:hover {
        background: var(--color--skyblue);
        cursor: pointer;
      }
    }
  }
}
.main-categories__description {
  @include rfs($font-size-18);
  font-weight: 700;
  line-height: 1.11;
  margin: var(--spacer--600) 0 calc(var(--spacer--700) * 0.5);
  color: var(--color--blue-dark);
}
.category__icon {
  grid-area: icon;
}
.category__name {
  @include rfs($font-size-16);
  grid-area: name;
  display: block;
  font-weight: 700;
  padding-right: var(--spacer--600)
}
.category__description {
  @include rfs($font-size-14);
  grid-area: description;
}
</style>
