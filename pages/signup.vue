<script setup>
import { reactive } from "vue";

const data = reactive({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});
</script>

<template>
  <div class="w-1/2 mx-auto flex flex-col mt-[110px]">
    <div class="mb-[15px]">
      <h1 class="text-3xl">Create an Account</h1>
    </div>
    <div>
      <form @submit="submitForm">
        <div class="grid gap-7 border">
          <div class="grid gap-3">
            <p>Email Address</p>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="youremail@gmail.com"
              v-model="data.email"
              class="border h-[50px] px-3 cursor-pointer"
            />
          </div>

          <div class="grid gap-3">
            <p>Username</p>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              v-model="data.username"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
