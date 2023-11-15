import {defineStore} from 'pinia'
import {User} from '@/model/user'

export const useAppSessionStore = defineStore('appSession', {
  state: () => {
    return {
      user: new User() as User
    }
  },
  persist: true
})
