import { defineStore } from 'pinia'
import { login } from '@/apis/login'

export const useUser = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    cancelMap: new Map<string, AbortController['abort']>()
  }),
  actions: {
    setToeken(token: string) {
      this.token = token
      localStorage.setItem('token', token)
    },
    removeToken() {
      this.token = ''
      localStorage.removeItem('token')
    }
  }
})
