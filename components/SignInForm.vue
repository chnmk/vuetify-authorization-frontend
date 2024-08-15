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

  const data = { password: passwordSignin.value }
  const secret = 'password_changeme'

  const token = jwt.sign(data, secret, { expiresIn: '10m' })
  const header = 'Bearer' + ' ' + token

  axios.post('http://localhost:8080/signup', 
  {
    username: usernameSignin.value, 
  }, 
  {
    headers: {
    'Authorization': header
    }
  })
  .then(function(response) {
    console.log(response);
    if (response.status == 400) {
      alert("Invalid username or password.")
    } else if (response.status == 200) {
      alert("Success!")
      tempSignedFlag.value = true
    }
  })
  .catch(function(error) {
    console.log(error);
  });
}
</script>