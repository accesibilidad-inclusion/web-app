<script setup lang="ts">
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import InputSearch from '@/components/InputSearch.vue'
import TextToSpeech from '@/components/TextToSpeech.vue'
import IconInternetTasks from '@/assets/img/app-icons/instructions/internet.svg?component'
import IconPresentialTasks from '@/assets/img/app-icons/instructions/presencial.svg?component'

const router = useRouter()

const filterSelected = ref<string | null>(null)
const query = ref('')

const doSearch = () => {
  if (query.value === '') {
    return
  }
  router.push({
    path: 'busqueda',
    query: {
      s: query.value,
      t: filterSelected.value
    }
  })
}
</script>

<template>
  <div class="main-search">
    <label class="main-search__label" for="s">
      <span>{{ $t('mainSearch.findHelp') }}</span>
      <TextToSpeech :text-audio="$t('mainSearch.findHelp')" />
    </label>
    <div class="main-search__types">
      <div
        :class="
          filterSelected == 'online'
            ? 'main-search__type main-search__type--online main-search__type--active'
            : 'main-search__type main-search__type--online'
        "
        @click="filterSelected = 'online'">
        <TextToSpeech :text-audio="$t('mainSearch.searchOnline')" />
        <span class="main-search__type-icon">
          <IconInternetTasks></IconInternetTasks>
        </span>
        {{ $t('mainSearch.searchOnline') }}
      </div>
      <div
        :class="
          filterSelected == 'presential'
            ? 'main-search__type main-search__type--presential main-search__type--active'
            : 'main-search__type main-search__type--presential'
        "
        @click="filterSelected = 'presential'">
        <TextToSpeech :text-audio="$t('mainSearch.searchPresential')" />
        <span class="main-search__type-icon">
          <IconPresentialTasks></IconPresentialTasks>
        </span>
        {{ $t('mainSearch.searchPresential') }}
      </div>
    </div>
    <Transition>
      <div v-if="filterSelected">
        <InputSearch :type="filterSelected" v-model="query" @search="doSearch" />
        <button
          v-bind:class="
            'btn btn--large btn--block main-search__button' +
            ' main-search__button--' +
            filterSelected
          "
          :disabled="query.trim() == ''"
          @click="doSearch">
          {{ $t('mainSearch.showResults') }}
        </button>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/rfs.scss';
.main-search {
  position: relative;
  padding: calc(var(--spacer--400) * 3) var(--spacer--400);
  background: var(--color--blue);
  color: var(--color--white);
}
.main-search__label {
  display: flex;
  flex-flow: column-reverse;
  gap: var(--spacer--300);
  > span {
    font-weight: 700;
    @include rfs($font-size-18);
    margin: 0 0 calc(var(--spacer--700) * 0.5);
    display: block;
    text-align: center;
  }
  .tts :deep(path) {
    fill: var(--color--white);
  }
}
.main-search__types {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacer--300);
}
.main-search__type {
  @include rfs($font-size-16);
  background: var(--color--white);
  font-weight: 700;
  color: var(--color--blue-dark);
  padding: var(--spacer--400);
  border-radius: var(--spacer--500);
  border: 1px solid var(--color--blue-dark);
  line-height: 125%;
  display: flex;
  flex-flow: column;
  align-items: center;
  text-align: center;
  gap: var(--spacer--300);
  cursor: pointer;
  .tts {
    path {
      fill: var(--color--blue-dark);
    }
  }
}
.main-search__type--online.main-search__type--active {
  background: var(--color--yellow-light);
}
.main-search__type--presential.main-search__type--active {
  background: var(--color--skyblue-light);
}
.main-search__type-icon {
  display: flex;
  background: var(--color--yellow);
  width: 45px;
  height: 45px;
  border: 1px solid var(--color--blue);
  border-radius: var(--spacer--300);
  align-items: center;
  justify-content: center;
  svg {
    width: 27px;
    height: 28px;
  }
}
.main-search__button {
  font-weight: 700;
}
.main-search__button--presential {
  background: var(--color--skyblue-light);
  color: var(--color--blue-dark);
  border-color: currentColor;
  &:hover {
    background: var(--color--skyblue);
  }
  &:disabled {
    background: transparent;
    color: var(--color--skyblue-light);
    border: 1px solid var(--color--skyblue-light);
  }
}
.main-search__button--online {
  background: var(--color--yellow-light);
  color: var(--color--blue-dark);
  border-color: currentColor;
  &:hover {
    background: var(--color--yellow);
  }
  &:disabled {
    background: transparent;
    color: var(--color--yellow-light);
    border: 1px solid var(--color--yellow-light);
  }
}
</style>
