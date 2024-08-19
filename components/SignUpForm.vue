<template>
  <v-form fast-fail @submit.prevent="submitSignUp">
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
</template>

<script setup>
import axios from 'axios';
import jwt from 'jsonwebtoken';

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

async function submitSignUp(promise) {
  // Wait for input validation
  const { valid } = await promise
  if (!valid) {
    return
  }

  // Create payload for JWT
  const data = { password: passwordSignup.value }

  // Convert the payload to string format
  // to avoid getting iat data when token is signed
  const data_string = JSON.stringify(data)

  // Create JWT token
  const secret = 'password_changeme'
  const token = jwt.sign(data_string, secret)

  // Post request header string
  const header = 'Bearer' + ' ' + token

  // Post password token in header and other data in body
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
  .then(function(response) {
    alert("Success! Sign in with your credentials.")
    // console.log(response)
  })
  .catch(function(error) {
    alert("User already exists!")
    // console.log(error);
  });
}
</script>