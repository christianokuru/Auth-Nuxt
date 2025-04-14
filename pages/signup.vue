<script setup>
import { reactive } from "vue";

const data = reactive({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

/**
 * Handles form submission by logging the current state of the form data.
 */

const submit = () => {
    console.log(data)
}
</script>

<template>
  <div class="w-1/2 mx-auto flex flex-col mt-[110px] mb-[130px]">
    <div class="mb-[15px]">
      <h1 class="text-3xl">Create an Account</h1>
    </div>
    <div>
      <form @submit="submitForm">
        <div class="grid gap-7 border">
          <div class="grid">
            <p>Email Address</p>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="youremail@gmail.com"
              v-model="data.email"
              class="border h-[50px] px-3 cursor-pointer rounded-md placeholder:text-lg outline-gray-300"
            />
          </div>

          <div class="grid">
            <p>Username</p>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              v-model="data.username"
              class="border h-[50px] px-3 cursor-pointer rounded-md placeholder:text-lg outline-gray-300"
            />
          </div>

          <div class="grid">
            <p>Password</p>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Your Password must be more than 6 characters"
              v-model="data.password"
              class="border h-[50px] px-3 cursor-pointer rounded-md placeholder:text-lg outline-gray-300"
            />
          </div>

          <div class="grid">
            <p>Confirm Password</p>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Re-type your password"
              v-model="data.confirmPassword"
              class="border h-[50px] px-3 cursor-pointer rounded-md placeholder:text-lg outline-gray-300"
            />
          </div>
          <button class="mt-7 bg-black text-white h-12 rounded-md font-semibold hover:bg-gray-800">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>
