import {defineStore} from 'pinia'
import type {Category} from '@/model/category'
import type {Service} from '@/model/service'
import type {PresentialVenue} from '@/model/presential_venue'
import type {OnlineVenue} from '@/model/online_venue'
import type {PresentialTask} from '@/model/presential_task'
import type {OnlineTask} from '@/model/online_task'

export const useAppNavStore = defineStore('appNav', {
  state: () => {
    return {
      theme: 'presential' as 'online'|'presential',
      redirectTo: '/inicio' as string,
      selected: {
        category: null as Category | null,
        service: null as Service | null,
        venue: null as PresentialVenue | OnlineVenue | null,
        task: null as PresentialTask | OnlineTask | null
      },
      onboarding: {
        welcome: true,
        presentialEvaluation: true,
        onlineEvaluation: true,
        suggestVenue: true,
        newTask: true,
        pictogram: true
      } as {[key: string]: boolean}
    }
  },
  actions: {
    cleanTutorials() {
      this.onboarding = {
        welcome: true,
        presentialEvaluation: true,
        onlineEvaluation: true,
        suggestVenue: true,
        newTask: true,
        pictogram: true
      }
    },
    setSelecteds(category: Category|null = null,
      service: Service|null = null,
      venue: PresentialVenue|OnlineVenue|null = null,
      task: PresentialTask|OnlineTask|null = null) {
      this.selected = {
        category: category,
        service: service,
        venue: venue,
        task: task,
      }

    }
  },
  persist: true
})
