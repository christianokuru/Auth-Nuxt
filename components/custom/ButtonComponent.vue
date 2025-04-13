<script setup>
const props = defineProps({
    text: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        default: null,
    },
})
</script>
<template>
    <button class="flex items-center space-x-[8px] bg-[#783EAD] py-[12px] px-[24px] rounded-[10px]">
        <span class="text-[#FFFFFF] font-[400] text-[16px] leading-[100%]">{{text}}</span>
        <img v-if="icon" :src="icon" class="w-1 h-1"/>
    </button>
</template>