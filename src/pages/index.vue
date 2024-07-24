<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import Form from '../components/form.vue'
// import Login from '../components/login.vue' // login componentini içe aktarıyoruz

const sonuc = ref([])
const sonucUrun = ref([])
const SelectedProduct = ref({})
const showSaveChangesModal = ref(false)
const showForm = ref(false)
const showLogin = ref(false) // Login modalını göstermek için yeni bir ref
const AktifKategoriId = ref(0)
const router = useRouter()

async function Listele() {
  try {
    const response = await axios.get('https://localhost:44324/api/Listele')
    sonuc.value = response.data
  }
  catch (error) {
    console.error('Hata:', error)
  }
}

async function SayfaYenile() {
  await UrunListele(AktifKategoriId.value)
}

async function UrunListele(Id) {
  try {
    AktifKategoriId.value = Id
    SelectedProduct.value = {}
    showForm.value = false
    const response = await axios.get(`https://localhost:44324/api/UrunListele/${Id}`)

    sonucUrun.value = response.data
  }
  catch (error) {
    console.error('Hata:', error)
  }
}

async function ProductSec(product) {
  SelectedProduct.value = product
  showForm.value = true
}

function cancelSaveChanges() {
  showSaveChangesModal.value = false
}

async function confirmSaveChanges() {
  try {
    await axios.post('https://localhost:44324/api/ProductKaydet', SelectedProduct.value)
    // eslint-disable-next-line no-console
    console.log('Değişiklikler kaydedildi')
    showForm.value = false
  }
  catch (error) {
    console.error('Hata:', error)
  }
  finally {
    showSaveChangesModal.value = false
  }
}
function openLoginModal() {
  showLogin.value = true
}

function closeLoginModal() {
  showLogin.value = false
}
async function logout() {
  // await axios.post('https://localhost:44324/api/logout')
  localStorage.removeItem('user')
  router.push('/login')
}

onMounted(async () => {
  await Listele()
})
</script>



<template>
  <div class="h-screen flex bg-gray-100">
    <div
      id="sidebar"
      class="left-0 h-screen w-1/3 overflow-x-hidden bg-white px-3 shadow-xl transition-transform duration-300 ease-in-out md:block lg:w-48 md:w-48"

      x-data="{ sidenav: true }"
      @click.away="sidenav = false"
    >
      <div class="mt-10 space-y-6 md:space-y-10">
        <h1 class="text-center text-4xl font-bold md:hidden">
          D<span class="text-teal-600">.</span>
        </h1>
        <p class="500 text-center text-sm text-gray-700">
          ÜRÜNLER KATEGORİSİ
        </p>
        <div id="profile" class="space-y-3">
          <img
            src="https://w7.pngwing.com/pngs/713/936/png-transparent-online-shopping-shopping-cart-logo-e-commerce-market-blue-angle-company.png"
            class="mx-auto w-10 rounded-full md:w-16"
          >
          <div>
            <h2 class="text-center text-xs text-teal-500 font-medium md:text-sm">
              Beyza Bozkurt
            </h2>
            <p class="text-center text-xs text-gray-500">
              eMutfak Yazılım Stajyeri
            </p>
          </div>
        </div>

        <div id="menu" class="mt-4 flex flex-col space-y-2">
          <a
            v-for="(item, index) in sonuc"
            :key="index"
            class="cursor-pointer rounded-md px-2 py-2 text-left text-gray-700 font-medium transition duration-150 ease-in-out hover:bg-teal-500 hover:text-base hover:text-white"
            @click="UrunListele(item.categoryId)"
          >
            <svg
              class="inline-block h-6 w-6 fill-current"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
            <span>{{ item.categoryName }}</span>
          </a>
        </div>
      </div>
    </div>

    <div class="w-3/4 flex justify-center">
      <div
        class="<div class=" relative w-full style="background-image: url('https://i.pinimg.com/originals/03/1c/d2/031cd24239b94b0e49226d9a4a20e81b.png');>
        "
      >
        <h3
          v-if="sonucUrun && sonucUrun.length > 0"
          class="mb-4 mt-8 text-center text-lg font-semibold"
        >
          <h1 class="text-3xl text-red-600 font-bold">
            Ürünler Listesi
          </h1>
        </h3>
        <table
          v-if="sonucUrun && sonucUrun.length > 0"
          class="l-full w-full divide-y divide-gray-500"
        >
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-3 py-3 text-center text-xs text-gray-500 font-medium tracking-wider uppercase"
              >
                <b> Ürün Adı:</b>
              </th>
              <th
                scope="col"
                class="px-3 py-3 text-center text-xs text-gray-500 font-medium tracking-wider uppercase"
              >
                <b> Renk:</b>
              </th>
              <th
                scope="col"
                class="px-3 py-3 text-center text-xs text-gray-500 font-medium tracking-wider uppercase"
              >
                <b> Fiyat:</b>
              </th>
              <th
                scope="col"
                class="px-3 py-3 text-center text-xs text-gray-500 font-medium tracking-wider uppercase"
              >
                <b> Marka:</b>
              </th>
              <th
                scope="col"
                class="px-3 py-3 text-center text-xs text-gray-500 font-medium tracking-wider uppercase"
              >
                <b> İŞLEMLER</b>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(item, index) in sonucUrun" :key="index">
              <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {{ item.productName }}
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {{ item.productColor }}
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {{ item.productPrice }}
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {{ item.productBrand }}
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-sm">
                <button class="text-white-500 block w-full rounded bg-blue-700 px-2 py-2 text-center hover:text-blue-700" @click="ProductSec(item)">
                  Düzenle
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-else class="h-64 flex items-center justify-center">
          <p class="text-3xl text-blue-500 font-bold">
            Kategori menüsünden ürün seçiniz!!!
          </p>
        </div>
      </div>
    </div>
    <div v-if="showForm" id="modal" class="fixed left-0 top-0 h-screen w-screen flex items-center justify-center bg-blue-500 bg-opacity-50 transition-transform duration-300">
      <div class="mx-auto max-w-md w-full rounded-md">
        <button class="absolute right-2 top-2" @click="showForm = false">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div v-if="showSaveChangesModal">
          <SaveChangesModal @cancel="cancelSaveChanges" @confirm="confirmSaveChanges" />
        </div>

        <Form
          v-if="showForm"
          v-model="SelectedProduct" class="mr-8 mt-8 w-1/4 flex flex-col items-end"
          :model="SelectedProduct" @sayfayenile="SayfaYenile"
        />

        <Login v-if="showLogin" @close="closeLoginModal" /> <!-- Login componentini ekledik -->
      </div>
    </div>
  </div>
  <!-- Logout butonu -->
  <div>
    <button class="absolute bottom-179 right-0 m-4 rounded bg-red-500 px-11.5 py-4 text-white" @click="logout">
      Çıkış Yap
    </button>
  </div>
</template>

<route lang="yaml">
  name: Index
  meta:
    auth: true
  </route>
