<template>
  <!--
    <div> 
      <NuxtRouteAnnouncer />
      <NuxtWelcome /> 
    </div>
  -->
  <v-app id="app">
    <v-sheet class="mx-auto my-auto" width="300">
      <v-form fast-fail @submit.prevent>
        <v-text-field
          v-model="username"
          :rules="usernameRules"
          label="Username"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Password"
        ></v-text-field>

        <v-btn class="mt-2" type="submit" block @click="submit">Submit</v-btn>
      </v-form>
    </v-sheet>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios';

const username = ref('')
const usernameRules = [
  value => {
    if (value?.length >= 5) return true
    return 'Username must be at least 5 characters.'
  },
  value => {
    if (/^[a-zA-Z0-9\-_]+$/.test(value)) return true
    return 'Invalid characters.'
  },
  value => {
    if (/[a-zA-Z]/.test(value)) return true
    return 'Must contain at least one latin character.'
  },
]

const password = ref('')
const passwordRules = [
value => {
    if (value?.length >= 5) return true
    return 'Password must be at least 5 characters.'
  },
  value => {
    if (/^[a-zA-Z0-9\-_]+$/.test(value)) return true
    return 'Invalid characters.'
  },
  value => {
    if (/[a-zA-Z]/.test(value)) return true
    return 'Must contain at least one latin character.'
  },
]

function submit() {
  axios.post('http://localhost:8080/signup', {
    username: username,
    password: password
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}
</script>
