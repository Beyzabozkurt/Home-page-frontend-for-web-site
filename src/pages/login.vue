<script setup>
import axios from 'axios'
import { useAuthStore } from '~/stores/auth.store'

const router = useRouter()
const userStore = useAuthStore()
const Username = ref('Beyza')
const Password = ref('Beyza001.')

async function LoginClick() {
  await userStore
    .login({ Username: Username.value, Password: Password.value })
    .then((result) => {
      console.log('login result', result)
      router.push({ path: '/' })
    })
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="relative max-w-md w-full rounded-3xl bg-gray-100 p-6 shadow-md">
      <label for="" class="mt-3 block text-center text-sm text-black font-semibold">
        Login
      </label>

      <div>
        <input v-model="Username" type="Username" placeholder="UserName" class="mt-1 block h-11 w-full rounded-xl border-none bg-gray-100 text-black shadow-lg focus:bg-blue-100 hover:bg-blue-100 focus:ring-0">
      </div>

      <div class="mt-7">
        <input v-model="Password" type="password" placeholder="Şifre" class="mt-1 block h-11 w-full rounded-xl border-none bg-gray-100 text-black shadow-lg focus:bg-blue-100 hover:bg-blue-100 focus:ring-0">
      </div>

      <div class="mt-7">
        <button class="hover:-translate-x w-full transform rounded-xl bg-blue-500 py-3 text-white shadow-xl transition duration-500 ease-in-out hover:scale-105 hover:shadow-inner focus:outline-none" @click="LoginClick">
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  /* Custom styles for the card effect */
}
</style>

<route lang="yaml">
  name: Login
  meta:
    auth: false
  </route>