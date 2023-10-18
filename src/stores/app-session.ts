import { defineStore } from 'pinia'
import type { User } from '@/types/user'

export const useAppSessionStore = defineStore('appSession',{
  state: () => {
    return {
      user: null as User | null
    }
  },
  persist: true,
})
