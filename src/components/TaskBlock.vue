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
      v-if="preview && task instanceof PresentialTask && task.preview"
      class="task-block__preview"
      :layers="task.preview" />
    <div class="task-block__content">
      <p class="task-block__title">{{ task.title }}</p>
      <p v-if="task.count_steps > 0" class="task-block__steps">{{ task.count_steps }} pasos</p>
      <p v-if="showParents" class="task-block__service">
      {{ task.service.name }} / {{ task.venue.name }}
      </p>
      <TextToSpeech :text-audio="`${task.title}.\n\n`" />
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/rfs.scss';

.task-block {
  cursor: pointer;
  display: grid;
  border: 1px solid var(--color--blue);
  background: var(--color--white);
  position: relative;
  border-radius: var(--spacer--500);
  margin-top: var(--spacer--300);
  overflow: hidden;
  grid-template-rows: repeat(minmax(100px,1fr), 1);
  &:hover {
    cursor: pointer;
    background: var(--color-brand-lightest);
  }
  .pictogram__layer {
    height: auto;
    min-height: 9rem;
    max-height: 18rem;
  }
}
.task-block__preview {
  border-top-right-radius: var(--spacer--500);
  border-top-left-radius: var(--spacer--500);
  max-height: 18vh;
  min-height: 100px;
  overflow: hidden;
  align-items: center;
}
.task-block__content {
  padding: var(--spacer--500) var(--spacer--400);
  border-top: 1px solid var(--color--blue);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--spacer--200);
  .tts {
    position: absolute;
    top: var(--spacer--500);
    right: var(--spacer--400);
  }
}
.task-block__title {
  @include rfs($font-size-16);
  font-weight: 700;
  line-height: 1.25;
  color: var(--color--blue-dark);
}
.task-block__steps {
  @include rfs($font-size-14);
  font-weight: 600;
}
.task-block__service {
  @include rfs($font-size-14);
  font-weight: 600;
  color: var(--color--blue-light);
}
</style>
