form.vue
<script setup>
import axios from 'axios'

const emit = defineEmits(['sayfayenile'])

const product = defineModel()
const kategoriler = ref([])

onMounted(async () => {
  await KategorileriGetir()
})

async function KategorileriGetir() {
  try {
    const response = await axios.get('https://localhost:44324/api/Listele')
    kategoriler.value = response.data
  }
  catch (error) {
    console.error('Hata:', error)
  }
}

async function ProductKaydet() {
  try {
    const response = await axios.post('https://localhost:44324/api/ProductKaydet', product.value)
    emit('sayfayenile')
    console.log('response:', response)
  }
  catch (error) {
    console.error('Hata:', error)
  }
}
</script>

<template>
  <div class="text-[dark fuchsia] mx-auto max-w-md w-full rounded-md bg-pink-200 p-6">
    <div class="mb-5">
      <label for="productName" class="mb-3 block text-base text-[#07074D] font-medium">
        Product Name
      </label>
      <input
        id="productName" v-model="product.productName"
        type="text" placeholder="Product Name"
        class="w-full border border-[#e0e0e0] rounded-md bg-white px-4 py-2 text-base text-pink-500 font-bold outline-none focus:border-[#6A64F1] focus:shadow-md"
      >
    </div>

    <div class="mb-5">
      <label for="productColor" class="mb-3 block text-base text-[#07074D] font-medium">
        Product Color
      </label>
      <input
        id="productColor" v-model="product.productColor"
        type="text" placeholder="Product Color"
        class="w-full border border-[#e0e0e0] rounded-md bg-white px-4 py-2 text-base text-pink-500 font-bold outline-none focus:border-[#6A64F1] focus:shadow-md"
      >
    </div>

    <div class="mb-5">
      <label for="productPrice" class="mb-3 block text-base text-[#07074D] font-medium">
        Product Price
      </label>
      <input
        id="productPrice" v-model="product.productPrice"
        type="number" placeholder="Product Price"
        class="w-full border border-[#e0e0e0] rounded-md bg-white px-4 py-2 text-base text-pink-500 font-bold outline-none focus:border-[#6A64F1] focus:shadow-md"
      >
    </div>

    <div class="mb-5">
      <label for="productBrand" class="mb-3 block text-base text-[#07074D] font-medium">
        Product Brand
      </label>
      <input
        id="productBrand" v-model="product.productBrand"
        type="text" placeholder="Product Brand"
        class="w-full border border-[#e0e0e0] rounded-md bg-white px-4 py-2 text-base text-pink-500 font-bold outline-none focus:border-[#6A64F1] focus:shadow-md"
      >
    </div>

    <div class="mb-5">
      <label for="productCategory" class="mb-3 block text-base text-[#07074D] font-medium">
        Product Category
      </label>

      <select
        id="productCategory" v-model="product.categoryId"
        class="w-full border border-[#e0e0e0] rounded-md bg-white px-4 py-2 text-base text-pink-500 font-bold outline-none focus:border-[#6A64F1] focus:shadow-md"
      >
        <option v-for="kategori in kategoriler" :value="kategori.categoryId">
          {{ kategori.categoryName }}
        </option>
      </select>
    </div>

    <button class="hover:shadow-form rounded-md bg-[#6A64F1] px-8 py-3 text-center text-base text-white font-semibold outline-none" @click="ProductKaydet">
      Kaydet
    </button>
  </div>
</template>
