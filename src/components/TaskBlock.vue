<script setup lang="ts">
import TextToSpeech from '@/components/TextToSpeech.vue'
import DrawPictogram from '@/components/DrawPictogram.vue'
import {useRoute, useRouter} from 'vue-router'
import {PresentialTask} from '@/model/presential_task'
import {OnlineTask} from '@/model/online_task'

const props = defineProps<{
  task: PresentialTask | OnlineTask
  preview?: boolean
  showParents?: boolean
}>()

const router = useRouter()
const route = useRoute()

const selectTask = () => {
  if (route.params.categorySlug) {
    router.push(
      `/${route.params.categorySlug}/${route.params.serviceSlug}/${route.params.venueSlug}/${props.task.slug}`
    )
  } else {
    router.push(
      `/${props.task.category.slug}/${props.task.service.slug}/${props.task.venue.slug}/${props.task.slug}`
    )
  }
}
</script>

<template>
  <div class="task task-block" tag="article" @click="selectTask()">
    <DrawPictogram
      v-if="preview && task instanceof PresentialTask"
      class="task-block__preview"
      :layers="task.preview" />
    <p class="task-block__title">{{ task.title }}</p>
    <p v-if="task.count_steps > 0" class="task-block__service">{{ task.count_steps }} pasos</p>
    <p v-if="showParents" class="task-block__service">
      {{ task.service.name }} / {{ task.venue.name }}
    </p>
    <TextToSpeech :text-audio="`${task.title}.\n\n`" />
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/rfs.scss';

.task-block {
  position: relative;
  margin: var(--spacer) 0;
  padding: calc(var(--spacer) * 0.65) var(--spacer-xl) calc(var(--spacer) * 0.65)
    calc(var(--spacer) * 0.75);
  border: 2px solid var(--color-brand-lighter);
  border-radius: var(--border-radius);
  box-shadow: 0px 1px 5px rgba(148, 148, 148, 0.25);
  transition: var(--transition-base);
  @media screen and (min-width: 640px) {
    padding: var(--spacer);
  }
  @media screen and (min-width: 1280px) {
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
  margin-top: -0.5rem;
  @media screen and (min-width: 640px) {
    right: var(--spacer);
  }
  @media screen and (min-width: 1280px) {
    right: var(--spacer-lg);
  }
}
.task-block__aids {
  @include rfs($font-size-13);
  display: flex;
  align-items: center;
  grid-column: 1/3;
  border-top: 1px solid #a1c9ff;
  padding: calc(var(--spacer) / 2) calc(var(--spacer) * 0.75);
  flex-flow: row nowrap;
  color: var(--color-neutral);
  font-weight: 600;
  line-height: calc(16 / 12);
}
.task-block__aids-list {
  display: flex;
  flex-flow: row nowrap;
  li {
    list-style: none;
    margin-left: calc(var(--spacer) / 2);
  }
}
</style>
