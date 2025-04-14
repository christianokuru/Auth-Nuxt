<script setup>
import { reactive } from 'vue';

const data = reactive({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
})
</script>

<template>
    <div>
        <h1>Signup Page</h1>
    </div>
    <div>
        <form @submit.prevent=submitForm>

        </form>
    </div>
</template>