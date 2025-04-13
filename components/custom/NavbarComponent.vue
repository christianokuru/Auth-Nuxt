<script setup>
import ButtonComponent from '@/components/custom/ButtonComponent.vue'

const navLinks = [
  { name: 'Discover', route: '/' },
  { name: 'About Us', route: '/' },
  { name: 'FAQ', route: '/' },
  { name: 'Contact Us', route: '/' }
]

</script>
<template>
    <nav class="z-20 bg-[#ffffff99] mx-[64px] mt-[40px] py-[12px] rounded-[20px]">
      <div class=" flex items-center justify-between mx-[24px] space-x-[258.5px]">
        <div>
           <nuxt-link to="/">
            <div class="font-[400] text-[32px] leading-[100%] text-[#432361]">rendezvous</div>
           </nuxt-link>
        </div>
        <!-- Center: Nav Links -->
        <ul class="flex space-x-[16px] items-center">
          <li v-for="(link, index) in navLinks" :key="index">
            <nuxt-link
              :to="link.route"
              class="text-[#432361] hover:text-[#43236186] font-[400] text-[16px] leading-[100%]"
            >
              {{ link.name }}
          </nuxt-link>
          </li>
        </ul>
  
        <!-- Right: Auth Buttons -->
        <div class="flex items-center">
          <nuxt-link to="/login" class="text-[#432361] font-[400] text-[16px] leading-[100%] hover:text-[#6b389b] p-[8px] mr-[24px]">
            LogIn
          </nuxt-link>
          <nuxt-link to="/signup">
            <button-component text="Sign up" />
          </nuxt-link>
        </div>
        
      </div>
    </nav>
  </template>