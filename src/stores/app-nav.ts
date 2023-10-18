import { defineStore } from 'pinia'
import type { Category } from '@/types/category'

export const useAppNavStore = defineStore('appNav',{
  state: () => {
    return {
      redirectTo: '/inicio' as string,
      selected: {
        category: null as Category | null,
        service: null,
        venue: null,
        task: null,
      },
      onboarding: {
        welcome: true,
        evaluation: true,
        place: true,
        task: true,
        pictogram: true,
      } as { [key: string]: boolean; }
    }
  },
  actions: {
    cleanTutorials() {
      this.onboarding = {
        welcome: true,
        evaluation: true,
        place: true,
        task: true,
        pictogram: true,
      }
    },
  },
  persist: true,
})
