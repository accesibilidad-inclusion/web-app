<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Category } from '@/model/category'
import { useAppDataStore } from '@/stores/app-data'
import TextToSpeech from '@/components/TextToSpeech.vue'
import IconFormalities from '@/assets/img/app-icons/formalities.svg?component'
import IconHealth from '@/assets/img/app-icons/health.svg?component'
import IconTransport from '@/assets/img/app-icons/transport.svg?component'
import IconLeisure from '@/assets/img/app-icons/leisure.svg?component'

const appData = useAppDataStore()
const router = useRouter()

const setCategory = (category: Category) => {
  router.push(`/${category.slug}`)
}
</script>

<template>
  <section class="main-categories container">
    <div class="main-categories__header">
      <h2 class="main-categories__title">Facilitamos tu vida en pasos simples</h2>
      <p class="main-categories__description">Encuentra ayuda por categoría</p>
      <TextToSpeech
        :text-audio="'Facilitamos tu vida en pasos simples. Encuentra ayuda por categoría'"
      />
    </div>
    <ul class="main-categories__list">
      <li class="category" v-for="category in appData.categories" :key="category.id">
        <a @click="setCategory(category)">
          <span class="category__icon">
            <IconTransport v-if="category.slug == 'transporte'" />
            <IconHealth v-if="category.slug == 'salud'" />
            <IconLeisure v-if="category.slug == 'ocio'" />
            <IconFormalities v-if="category.slug == 'tramites'" />
          </span>
          <h3 class="category__name">
            {{ category.name }}
          </h3>
          <div class="category__description">
            {{ category.description }}
          </div>
        </a>
      </li>
    </ul>
  </section>
</template>

<style lang="scss">
@import '@/assets/scss/rfs.scss';
// .your-location {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding-left: calc(var(--spacer-lg) / 3);
//   border-radius: 5px;
//   background-color: var(--color-illustration-bg);
//   margin-bottom: var(--spacer);
//   color: #1a4571;
//   .your-location__change {
//     @include rfs($font-size-14);
//     font-weight: 700;
//     color: var(--color-brand-dark);
//     padding: calc(var(--spacer-lg) / 3);
//   }
//   .your-location__content {
//     display: flex;
//     align-items: center;
//     width: 100%;
//     gap: var(--spacer-sm);
//     padding-right: var(--spacer-sm);
//     border-right: 1px solid var(--color-brand-lighter);
//     span {
//       @include rfs($font-size-14);
//     }
//     svg {
//       width: 11px;
//       height: 15px;
//       @media screen and (min-width: 640px) {
//         width: var(--spacer);
//         height: var(--spacer);
//       }
//       path {
//         fill: var(--color-brand-dark);
//       }
//     }
//   }
// }

#app-wrap {
  background: var(--color--skyblue);
}
.main-categories {
  padding: var(--spacer--600) var(--spacer--400) var(--spacer--500);
  position: relative;
  .tts {
    float: none;
    position: absolute;
    top: var(--spacer--300);
    right: var(--spacer--500);
  }
}
.main-categories__title {
  font-size: var(--font-size--800);
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
      background: white;
      border-radius: var(--spacer--500);
      color: var(--color--blue-dark);
      display: grid;
      grid-template-areas: 'icon name' 'icon description';
      grid-template-columns: 55px auto;
      grid-template-rows: auto 1fr;
      gap: var(--spacer--200) var(--spacer--300);
      &:hover {
        background: var(--color--skyblue);
        cursor: pointer;
      }
    }
  }
}
.main-categories__description {
  font-size: var(--font-size--600);
  font-weight: 700;
  line-height: 1.11;
  margin: var(--spacer--600) 0 calc(var(--spacer--700) * 0.5);
  color: var(--color--blue-dark);
}
.category__icon {
  grid-area: icon;
  background: var(--color--yellow);
  border: 1px solid var(--color--blue);
  border-radius: var(--spacer--300);
  width: 55px;
  height: 55px;
  display: grid;
  align-items: center;
  justify-content: center;
}
.category__name {
  grid-area: name;
  display: block;
  font-size: var(--font-size--500);
  font-weight: 700;
}
.category__description {
  grid-area: description;
  font-size: var(--font-size--400);
}
</style>
