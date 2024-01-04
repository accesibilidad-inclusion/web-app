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
    <p v-if="task.count_steps > 0" class="task-block__steps">{{ task.count_steps }} pasos</p>
    <p v-if="showParents" class="task-block__service">
      {{ task.service.name }} / {{ task.venue.name }}
    </p>
    <TextToSpeech :text-audio="`${task.title}.\n\n`" />
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/rfs.scss';

.task-block {
  cursor: pointer;
  display: grid;
  border: 1px solid var(--color--blue);
  background: var(--color--white);
  padding: var(--spacer--400) var(--spacer--500);
  position: relative;
  border-radius: var(--spacer--500);
  margin-top: var(--spacer--300);
  grid-template-columns: 1fr auto;
  grid-template-areas: 'title tts' 'meta meta';
  gap: var(--spacer--300);
  &:hover {
    cursor: pointer;
    background: var(--color-brand-lightest);
  }
  .tts {
    grid-area: tts;
  }
}
.task-block__title {
  @include rfs($font-size-16);
  font-weight: 700;
  line-height: 1.25;
  color: var(--color--blue-dark);
  grid-area: title;
}
.task-block__service {
  grid-area: meta;
  line-height: 1.2;
  @include rfs($font-size-14);
  display: flex;
  flex-flow: column;
  gap: var(--spacer--200);
}

// .task-block__aids {
//   @include rfs($font-size-13);
//   display: flex;
//   align-items: center;
//   grid-column: 1/3;
//   border-top: 1px solid #a1c9ff;
//   padding: calc(var(--spacer) / 2) calc(var(--spacer) * 0.75);
//   flex-flow: row nowrap;
//   color: var(--color-neutral);
//   font-weight: 600;
//   line-height: calc(16 / 12);
// }
// .task-block__aids-list {
//   display: flex;
//   flex-flow: row nowrap;
//   li {
//     list-style: none;
//     margin-left: calc(var(--spacer) / 2);
//   }
// }
</style>
