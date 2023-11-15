import {defineStore} from 'pinia'
import type {Category} from '@/types/category'
import type {Service} from '@/types/service'
import type {PresentialVenue} from '@/model/presential_venue'
import type {OnlineVenue} from '@/model/online_venue'
import type {Task} from '@/types/task'

export const useAppNavStore = defineStore('appNav', {
  state: () => {
    return {
      redirectTo: '/inicio' as string,
      selected: {
        category: null as Category | null,
        service: null as Service | null,
        venue: null as PresentialVenue | OnlineVenue | null,
        task: null as Task | null
      },
      onboarding: {
        welcome: true,
        presentialEvaluation: true,
        onlineEvaluation: true,
        venue: true,
        task: true,
        pictogram: true
      } as {[key: string]: boolean}
    }
  },
  actions: {
    cleanTutorials() {
      this.onboarding = {
        welcome: true,
        evaluation: true,
        venue: true,
        task: true,
        pictogram: true
      }
    }
  },
  persist: true
})
