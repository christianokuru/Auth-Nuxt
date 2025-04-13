<script setup>
import { ref } from "vue";

const products = ref([
  {
    id: 1,
    name: "Product 1",
    image: "https://picsum.photos/200/300",
    price: 19.99,
  },
  {
    id: 2,
    name: "Product 1",
    image: "https://picsum.photos/200/300",
    price: 19.99,
  },
  {
    id: 3,
    name: "Product 1",
    image: "https://picsum.photos/200/300",
    price: 19.99,
  },
  {
    id: 4,
    name: "Product 1",
    image: "https://picsum.photos/200/300",
    price: 19.99,
  },
]);
</script>

<template>
  <div class="h-screen bg-gray-100">
    <div class="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
      <div class="hero mb-12">
        <h1 class="text-5xl font-bold mb-4">Welcome to [Brand Name]</h1>
        <p class="text-lg mb-8">
          Explore our latest collection of stylish clothing
        </p>
        <button
          class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        >
          Shop Now
        </button>
      </div>
      <section class="featured-products">
        <h2 class="text-3xl font-bold mb-4">Featured Products</h2>
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <div
            class="bg-white rounded shadow-md p-4"
            v-for="product in products"
            :key="product.id"
          >
            <img
              :src="product.image"
              alt="Product Image"
              class="w-full h-48 object-cover mb-4"
            />
            <h3 class="text-lg font-bold mb-2">{{ product.name }}</h3>
            <p class="text-gray-600 mb-4">${{ product.price }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
