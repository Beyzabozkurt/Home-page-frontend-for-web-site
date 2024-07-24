import type { UserModule } from '~/types'
import { useAuthStore } from '~/stores/auth.store'

export const install: UserModule = ({ isClient, router }) => {
  if (isClient) {
    router.beforeEach(async (to, _from) => {
      const authStore = useAuthStore()
      const isLoggedIn = authStore?.user?.isAuth

      const authRequired = to.meta.auth

      if (authRequired && !isLoggedIn)
        return { path: 'login' }

      // console.log("router",to.meta.permission,authStore.GrantedList()?.includes(to.meta.permission))
      // console.log(authStore.GrantedList())

      // if (authRequired) {
      // console.log('auth fullPath', to.fullPath)
      // authStore.returnUrl = to.fullPath
      // }
    })
  }
}
