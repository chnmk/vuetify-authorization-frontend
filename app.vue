<template>
  <v-app id="app">
    <v-card class="mx-auto my-auto" width="300">
      <v-tabs class="ma-4" v-model="tab" align-tabs="center">
        <v-tab value="signin">Sign In</v-tab>
        <v-tab value="signup">Sign Up</v-tab>
      </v-tabs>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="signin">
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

            <v-btn class="my-2" type="submit" block @click="submitSignin">Submit</v-btn>
          </v-form>
        </v-tabs-window-item>

        <v-tabs-window-item value="signup">
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

            <v-select
              label="Select group"
              :rules="groupRules"
              :items="['Group A', 'Group B']"
            ></v-select>

            <v-btn class="my-2" type="submit" block @click="submitSignup">Submit</v-btn>
          </v-form>
        </v-tabs-window-item>
      </v-tabs-window>
      <v-divider class="my-4" />
      <v-card class="ma-4" color="primary">
        <div class="d-flex justify-center">
          <v-btn class="ma-2" width="150" @click="anyone">
            Anyone
          </v-btn>
        </div>
        <div class="d-flex justify-center">
          <v-btn class="ma-2" width="150" @click="groupA">
            Group A
          </v-btn>
        </div>
        <div class="d-flex justify-center">
          <v-btn class="ma-2" width="150" @click="groupB">
            Group B
          </v-btn>
        </div>
        <div class="d-flex justify-center">
          <v-btn class="ma-2" width="150" @click="secret">
            Secret
          </v-btn>
        </div>
      </v-card>
    </v-card>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios';

const tab = ref(null)

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

const groupRules = [
value => {
  if (value) return true
  return 'Please select a group.'
}
]

function submitSignin() {
  console.log("signin placeholder")
}

function submitSignup() {
  axios.post('http://localhost:8080/signup', {
    username: username.value,
    password: password.value
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

function anyone() {
  console.log("anyone placeholder")
}

function groupA() {
  console.log("groupA placeholder")
}

function groupB() {
  console.log("groupB placeholder")
}

function secret() {
  console.log("secret placeholder")
}
</script>
