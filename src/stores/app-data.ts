import { defineStore } from 'pinia'
import type { Location } from '@/types/location'
import type { Category } from '@/types/category'
import type { Region } from '@/types/region'

export const useAppDataStore = defineStore('appData',{
  state: () => {
    return {
      initialized: false,
      regions: [] as Array<Region>,
      categories: [] as Array<Category>,
      questions: [],
      location: null as Location | null
    }
  },
  actions: {
    async initiation() {
      await fetch(`${import.meta.env.VITE_APP_API_DOMAIN}api/init`)
      .then(async (response) => {
        const data = await response.json()
        this.regions = data.regions
        this.categories = data.categories
        this.questions = data.questions
        this.initialized = true
      })
      .catch((error) => {
        return error
      })
    },
  },
  persist: true,
})
