import { defineStore } from 'pinia'

import axios from 'axios'

interface IUser {
  fullname: string
  name: string
  isAuth: boolean
  roles: any
  permissions: any
  exp: any
  sec: any
}
interface IUserState {
  user: null | IUser
  returnUrl: string
  pageLogin: boolean
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: (): IUserState => ({
    // initialize state from local storage to enable user to stay logged in
    user: JSON.parse(localStorage.getItem('user') || '{}'),
    returnUrl: '',
    pageLogin: false,
  }),
  actions: {

    async login(credentials: any) {
      const user = await axios.post('https://localhost:44324/User/Login', credentials)

      // update pinia state
      this.user = user.data

      await this.store(user.data)
      // store user details and jwt in local storage to keep user logged in between page refreshes
      // localStorage.setItem('user', JSON.stringify(user.data))

      // redirect to previous url or default to home page
      return (this.returnUrl || user.data.defaultPage)
    },
    async store(data: any) {
      localStorage.setItem('user', JSON.stringify(data))
    },
    async logout() {
      this.user = null
      localStorage.removeItem('user')
      // return ('/login')
    },
  },
})
