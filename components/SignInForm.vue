<template>
  <v-form fast-fail @submit.prevent="submitSignIn">
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
</template>

<script setup>
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { useDefaultStore } from '#imports';

const store = useDefaultStore()

const usernameSignin = ref('')
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

async function submitSignIn(promise) {
  const { valid } = await promise
  if (!valid) {
    return
  }

  const password_secret = 'password_changeme'

  const data = { password: passwordSignin.value }
  const data_string = JSON.stringify(data)

  const token = jwt.sign(data_string, password_secret)
  const header = 'Bearer' + ' ' + token

  let success = false

  axios.post('http://localhost:8080/signin', 
  {
    username: usernameSignin.value, 
  }, 
  {
    headers: {
    'Authorization': header
    }
  })
  .then(function(response) {
    const authorization_secret = 'authorization_changeme'

    jwt.verify(response.data, authorization_secret, (err) => {
      if (err) {
        console.log(err)
      } else {
        alert('Success!')
        success = true

        store.switchTempSignedFlag()
        store.setStoredJwtValue(response.data)
        store.setUsername(usernameSignin.value)

        const decoded = jwt.decode(response.data)
        store.setGroup(decoded.group)
      }
    })
    // console.log(response.data)
  })
  .catch(function(error) {
    if (!success) {
      alert('Invalid username or password.')
    }
    console.log(error);
  });
}
</script>