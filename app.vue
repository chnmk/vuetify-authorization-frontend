<template>
  <v-app id="app">
    <v-card class="mx-auto my-auto" width="300" v-if="!tempSignedFlag">
      <v-tabs class="ma-4" v-model="tab" align-tabs="center">
        <v-tab value="signin">Sign In</v-tab>
        <v-tab value="signup">Sign Up</v-tab>
      </v-tabs>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="signin">
          <v-form fast-fail @submit.prevent="submitSignin">
            <v-text-field
              v-model="usernameSignin"
              :rules="usernameRules"
              label="Username"
            ></v-text-field>
            <v-text-field
              v-model="passwordSignin"
              :rules="passwordRules"
              label="Password"
              type="password"
            ></v-text-field>
            <v-btn class="mt-2" type="submit" block>Submit</v-btn>
          </v-form>
        </v-tabs-window-item>
        <v-tabs-window-item value="signup">
          <v-form fast-fail @submit.prevent="submitSignup">
            <v-text-field
              v-model="usernameSignup"
              :rules="usernameRules"
              label="Username"
            ></v-text-field>
            <v-text-field
              v-model="passwordSignup"
              :rules="passwordRules"
              label="Password"
              type="password"
            ></v-text-field>
            <v-text-field
              v-model="repeat"
              :rules="repeatRules"
              type="password"
              label="Repeat Password"
            ></v-text-field>
            <v-select
              label="Select group"
              :rules="groupRules"
              :items="['Group A', 'Group B']"
              v-model="group"
            ></v-select>
            <v-btn class="mt-2" type="submit" block>Submit</v-btn>
          </v-form>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card>
    <v-card class="mx-auto my-auto" width="300" v-if="tempSignedFlag">
      <h2 class="d-flex justify-center mt-2">
        username
      </h2>
      <h3 class="d-flex justify-center mb-2">
        anyone
      </h3>
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
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import jwt from 'jsonwebtoken';

const tab = ref(null)
const tempSignedFlag = ref(false)

const usernameSignin = ref('')
const usernameSignup = ref('')
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

const passwordSignin = ref('')
const passwordSignup = ref('')
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

const repeat = ref('')
const repeatRules = [
value => {
  if (value === passwordSignup.value) return true
  return 'Passwords do not match.'
}
]

const group = ref('')
const groupRules = [
value => {
  if (value) return true
  return 'Please select a group.'
}
]

async function submitSignin(promise) {
  const { valid } = await promise
  if (!valid) {
    return
  }
  console.log('signin placeholder')
  tempSignedFlag.value = true
}

async function submitSignup(promise) {
  const { valid } = await promise
  if (!valid) {
    return
  }

  const data = { password: passwordSignup.value }
  const secret = 'changeme'

  const token = jwt.sign(data, secret, { expiresIn: '10m' })
  const header = 'Bearer' + ' ' + token

  axios.post('http://localhost:8080/signup', 
  {
    username: usernameSignup.value, 
    group: group.value
  }, 
  {
    headers: {
    'Authorization': header
    }
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
