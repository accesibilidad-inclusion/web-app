<script setup lang="ts">
import {ref} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {useEventBus, useFetch} from '@vueuse/core'

import PresentialPlaceIcon from '@/assets/img/app-icons/support/lugar.svg?component'
import InternetPlaceIcon from '@/assets/img/app-icons/support/lugares-internet.svg?component'
import ItemClickable from '@/components/ItemClickable.vue'
import BlockHeader from '@/components/BlockHeader.vue'
import TextToSpeech from '@/components/TextToSpeech.vue'
import CategoryIcon from '@/components/CategoryIcon.vue'
import {Category} from '@/model/category'
import {Service} from '@/model/service'
import {useAppDataStore} from '@/stores/app-data.js'
import {useAppNavStore} from '@/stores/app-nav.js'
import {useI18n} from 'vue-i18n'

const router = useRouter()
const route = useRoute()

const appData = useAppDataStore()
const appNav = useAppNavStore()
const category = ref<Category>()
const services = ref<Array<Service>>([])

const setService = (service: Service) => {
  router.push(`/${route.params.categorySlug}/${service.slug}`)
}

const {data} = await useFetch(
  `${import.meta.env.VITE_APP_API_DOMAIN}api/categories/nearServices?category=${
    route.params.categorySlug
  }&lat=${appData.location.getCoordinates().lat}&lng=${appData.location.getCoordinates().lng}&
  commune_id=${appData.location.commune?.id}&country_id=${appData.country?.id}`
)
  .get()
  .json()

services.value = data.value.services.map((s: Service) => new Service(s))
category.value = new Category(data.value.category)
appNav.setSelecteds(category.value)

const { t } = useI18n({ useScope: 'global' })
document.title = `${t('titles.servicesOf', {
  category: t('categoriesList.list.names.' + data.value.category.slug)
})} | Pictos`

const bus = useEventBus('back')
const listener = () => {
  router.push('/inicio')
}
bus.on(listener)
</script>

<template>
  <div class="category">
    <template v-if="category">
      <BlockHeader :title="$t('categoriesList.list.names.' + category.slug)" :description="$t('category.servicesNear')" location>
        <template #icon>
          <CategoryIcon v-bind:category="category.slug"></CategoryIcon>
        </template>
      </BlockHeader>
      <main class="category__items category__items--services">
        <template v-for="service in services" :key="service.id">
          <ItemClickable :title="service.name" @click="setService(service)">
            <template #meta>
              <div v-if="service.count_presential > 0">
                <PresentialPlaceIcon />
                {{
                  $t('category.numberOfPresentialVenues', {
                    count: service.count_presential
                  }, service.count_presential)
                }}
              </div>
              <div v-if="service.count_online_available > 0">
                <InternetPlaceIcon />
                {{
                  $t('category.numberOfOnlineVenues', {
                    count: service.count_online_available
                  }, service.count_online_available)
                }}
              </div>
            </template>
          </ItemClickable>
        </template>
      </main>
      <aside class="actions actions--category">
        <text-to-speech :text-audio="$t('category.cantFind')" />
        <p class="actions__title">
          {{ $t('category.cantFind') }}
        </p>
        <router-link to="/sugerir-lugar" class="btn btn--primary btn--large btn--block">
          {{ $t('category.addNew') }}
        </router-link>
      </aside>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/rfs.scss';
.category {
  display: flex;
  flex-flow: column nowrap;
  background-color: var(--color--skyblue);
  padding-top: calc(var(--spacer--200) + 50px);
  height: 100%;
  min-height: 100dvh;
  @media screen and (min-width: 540px) {
    padding-top: calc(var(--spacer--200) + 62px);
  }
  .block-header {
    padding-top: var(--spacer--600);
    @media screen and (min-width: 1280px) {
      padding-left: var(--spacer--700);
      padding-right: var(--spacer--700);
    }
    .category-icon {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .tts {
      top: calc(var(--spacer--600) + 4px);
    }
  }
}
.category__items {
  flex-grow: 1;
}
.category__items {
  margin: calc(var(--spacer--700) * 0.5) var(--spacer--400);
}
.actions--category {
  display: flex;
  flex-flow: column;
  gap: var(--spacer--300);
  text-align: center;
  .btn {
    margin: var(--spacer--200) 0 var(--spacer--500);
  }
}
.actions--category .actions__title {
  margin: 0;
  .tts {
    position: relative;
  }
}
</style>
